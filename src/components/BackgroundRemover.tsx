"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./BackgroundRemover.module.css";
import sharedStyles from "./SharedStyles.module.css";
import pageStyles from "@/app/page.module.css";

interface ImageFile {
  name: string;
  size: number;
  previewUrl: string;
  width: number;
  height: number;
}

export default function BackgroundRemover() {
  const [activeImage, setActiveImage] = useState<ImageFile | null>(null);
  const [bgMask, setBgMask] = useState<{ blob: Blob; previewUrl: string } | null>(null);
  
  // Custom Controls State
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"transparent" | "blur" | "color">("transparent");
  const [color, setColor] = useState("#ffffff");
  const [blurRadius, setBlurRadius] = useState(15);
  const [bloomRadius, setBloomRadius] = useState(10);
  const [bloomIntensity, setBloomIntensity] = useState(30);
  const [alphaThreshold, setAlphaThreshold] = useState(15);
  
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<"processed" | "original">("processed");
  const [format, setFormat] = useState<"PNG" | "WEBP" | "JPG">("PNG");
  const [bgRemovalProgress, setBgRemovalProgress] = useState<{ status: string; progress: number } | null>(null);
  
  // Output compilation values
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [processedPreviewUrl, setProcessedPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean preview object URLs to prevent memory leaks
  const cleanActiveImage = () => {
    if (activeImage) {
      URL.revokeObjectURL(activeImage.previewUrl);
      setActiveImage(null);
    }
    if (bgMask) {
      URL.revokeObjectURL(bgMask.previewUrl);
      setBgMask(null);
    }
    if (processedPreviewUrl) {
      URL.revokeObjectURL(processedPreviewUrl);
      setProcessedPreviewUrl(null);
      setProcessedBlob(null);
    }
    setEnabled(false);
    setMode("transparent");
    setAlphaThreshold(15);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadFile(e.target.files[0]);
    }
  };

  const loadFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Invalid format: Please upload a standard image file (PNG, JPG, WEBP).");
      return;
    }

    cleanActiveImage();

    const previewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setActiveImage({
        name: file.name,
        size: file.size,
        previewUrl,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      alert("Failed loading image dimensions.");
    };
    img.src = previewUrl;
  };

  // Heavy local AI Background removal execution
  const handleRemoveBackground = async () => {
    if (!activeImage) return;

    setBgRemovalProgress({ status: "Initializing background removal engine...", progress: 0 });

    try {
      // Dynamic ESM Named Import to avoid Next.js server bundling failures
      const { removeBackground } = await import("@imgly/background-removal");
      
      setBgRemovalProgress({ status: "Downloading local AI models (first execution might take a moment to fetch and cache)...", progress: 15 });

      const blob = await removeBackground(activeImage.previewUrl, {
        progress: (key, current, total) => {
          const percentage = Math.round((current / total) * 100);
          setBgRemovalProgress({
            status: `Downloading AI assets (${key.replace("-", " ")})...`,
            progress: percentage,
          });
        }
      });

      const previewUrl = URL.createObjectURL(blob);
      setBgMask({ blob, previewUrl });
      setEnabled(true);
      setBgRemovalProgress(null);
    } catch (err) {
      console.error("Local background removal error", err);
      alert("Could not isolate background. Your device may lack WebGL support or resources failed to download.");
      setBgRemovalProgress(null);
    }
  };

  // Real-time canvas layered compositing
  useEffect(() => {
    if (!activeImage) {
      if (processedPreviewUrl) {
        URL.revokeObjectURL(processedPreviewUrl);
        setProcessedPreviewUrl(null);
        setProcessedBlob(null);
      }
      return;
    }

    const img = new Image();
    const maskImg = new Image();
    
    let loadedCount = 0;
    const hasBgRemoval = enabled && bgMask;
    const totalToLoad = hasBgRemoval ? 2 : 1;

    const drawAll = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = activeImage.width;
      const h = activeImage.height;
      canvas.width = w;
      canvas.height = h;

      const drawLayer = (layerImg: HTMLImageElement | HTMLCanvasElement, filterStr?: string) => {
        ctx.save();
        if (filterStr) {
          ctx.filter = filterStr;
        }
        ctx.drawImage(layerImg, 0, 0, w, h);
        ctx.restore();
      };

      if (!hasBgRemoval) {
        // Standard original
        drawLayer(img);
      } else {
        // Background replacement Layer
        if (mode === "transparent") {
          ctx.clearRect(0, 0, w, h);
        } else if (mode === "color") {
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, w, h);
        } else if (mode === "blur") {
          drawLayer(img, `blur(${blurRadius}px)`);
        }

        // Pre-process foreground subject with alpha threshold if > 0
        let subjectLayer: HTMLImageElement | HTMLCanvasElement = maskImg;
        if (alphaThreshold > 0) {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = w;
          tempCanvas.height = h;
          const tempCtx = tempCanvas.getContext("2d");
          if (tempCtx) {
            tempCtx.drawImage(maskImg, 0, 0, w, h);
            const imgData = tempCtx.getImageData(0, 0, w, h);
            const data = imgData.data;
            const thresholdLimit = (100 - alphaThreshold) * 2.55;
            
            for (let i = 3; i < data.length; i += 4) {
              const a = data[i];
              if (a > 0) {
                if (a >= thresholdLimit) {
                  data[i] = 255;
                } else if (thresholdLimit > 0) {
                  data[i] = Math.min(255, Math.round(a * (255 / thresholdLimit)));
                }
              }
            }
            tempCtx.putImageData(imgData, 0, 0);
            subjectLayer = tempCanvas;
          }
        }

        // Bloom glowing screen Layer
        if (bloomRadius > 0 && bloomIntensity > 0) {
          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.globalAlpha = bloomIntensity / 100;
          drawLayer(subjectLayer, `blur(${bloomRadius}px)`);
          ctx.restore();
        }

        // Foreground subject Layer
        drawLayer(subjectLayer);
      }

      let mimeType = "image/png";
      if (format === "JPG") mimeType = "image/jpeg";
      else if (format === "WEBP") mimeType = "image/webp";

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setProcessedBlob(blob);
            const url = URL.createObjectURL(blob);
            setProcessedPreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return url;
            });
          }
        },
        mimeType,
        0.92
      );
    };

    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalToLoad) drawAll();
    };
    img.src = activeImage.previewUrl;

    if (hasBgRemoval && bgMask) {
      maskImg.onload = () => {
        loadedCount++;
        if (loadedCount === totalToLoad) drawAll();
      };
      maskImg.src = bgMask.previewUrl;
    }
  }, [activeImage, bgMask, enabled, mode, color, blurRadius, bloomRadius, bloomIntensity, format, alphaThreshold]);

  // Clean URLs on unmount
  useEffect(() => {
    return () => {
      if (activeImage) URL.revokeObjectURL(activeImage.previewUrl);
      if (bgMask) URL.revokeObjectURL(bgMask.previewUrl);
      if (processedPreviewUrl) URL.revokeObjectURL(processedPreviewUrl);
    };
  }, []);

  const handleDownload = () => {
    if (!processedBlob) return;
    const extension = format.toLowerCase();
    const link = document.createElement("a");
    link.href = processedPreviewUrl || "";
    link.download = activeImage ? `${activeImage.name.replace(/\.[^/.]+$/, "")}_no_bg.${extension}` : `no_background.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      {/* Upload Zone */}
      {!activeImage && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFilePicker}
          className={styles.uploadContainer}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <svg className={styles.uploadIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <div className={styles.uploadTitle}>Drag & Drop Portrait / Image to Clean</div>
          <div className={styles.uploadDesc}>
            Uses neural networks completely locally in your browser. Isolates hair details, adjusts backgrounds, and composites glowing rims with 100% offline safety.
          </div>
          <button className={sharedStyles.btnPrimary} style={{ padding: "10px 24px" }}>Select Local Image</button>
        </div>
      )}

      {/* Main Workspace */}
      {activeImage && (
        <div className={styles.workspace}>
          
          {/* Left Panel: Preview */}
          <div className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <div className={styles.previewTitle}>Image Viewport</div>
              <div className={styles.tabGroup}>
                <button
                  onClick={() => setActiveTab("processed")}
                  className={`${styles.tabBtn} ${activeTab === "processed" ? styles.tabBtnActive : ""}`}
                >
                  Processed Preview
                </button>
                <button
                  onClick={() => setActiveTab("original")}
                  className={`${styles.tabBtn} ${activeTab === "original" ? styles.tabBtnActive : ""}`}
                >
                  Original
                </button>
              </div>
            </div>

            <div className={`${styles.previewArea} ${mode === "transparent" ? styles.checkerboard : ""}`}>
              <img
                src={activeTab === "processed" && processedPreviewUrl ? processedPreviewUrl : activeImage.previewUrl}
                alt="Workspace preview"
                className={`${styles.previewImg} ${activeTab === "processed" && enabled && bgMask && mode === "transparent" ? styles.previewImgTransparent : ""}`}
                style={{ transform: `scale(${zoom / 100})` }}
              />
              
              {/* Zoom control bar overlay */}
              <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", background: "var(--bg-surface)", padding: "4px 8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                <button onClick={() => setZoom(z => Math.max(10, z - 10))} style={{ border: "none", background: "none", cursor: "pointer", fontWeight: 700, padding: "2px 6px" }}>-</button>
                <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, minWidth: "36px", textAlign: "center" }}>{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(400, z + 10))} style={{ border: "none", background: "none", cursor: "pointer", fontWeight: 700, padding: "2px 6px" }}>+</button>
              </div>
            </div>

            {/* Preview Footer Metrics */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Resolution: {activeImage.width} × {activeImage.height}px
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Output: {processedBlob ? `${(processedBlob.size / 1024).toFixed(0)} KB` : "Calculating..."}
              </span>
            </div>
          </div>

          {/* Right Panel: Controls */}
          <div className={styles.controlsPanel}>
            <div className={styles.controlsHeader}>
              <h3 className={styles.controlsTitle}>Adjustments</h3>
            </div>

            <div className={styles.controlsScroll}>
              
              {/* If no AI mask generated, show trigger panel */}
              {!bgMask ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {bgRemovalProgress ? (
                    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", padding: "16px", borderRadius: "var(--radius-md)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-secondary)" }}>Loading Engine...</span>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--lime-700)" }}>{bgRemovalProgress.progress}%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "var(--border-dark)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${bgRemovalProgress.progress}%`, height: "100%", background: "var(--lime-500)", transition: "width 0.2s ease" }} />
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "8px", lineHeight: "1.3" }}>
                        {bgRemovalProgress.status}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "14px", padding: "12px 0" }}>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                        Run the browser-side neural network segmentation engine. This downloads and executes the **RMBG model** completely offline.
                      </p>
                      <button
                        onClick={handleRemoveBackground}
                        className={styles.btnPrimary}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                        Isolate Subject Edge
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Background Mode Tab Buttons */}
                  <div className={styles.controlGroup}>
                    <span className={styles.controlLabel}>Background Mode</span>
                    <div className={styles.presetsRow}>
                      <button
                        onClick={() => { setEnabled(true); setMode("transparent"); }}
                        className={`${styles.presetChipBtn} ${enabled && mode === "transparent" ? styles.presetChipBtnActive : ""}`}
                      >
                        Transparent
                      </button>
                      <button
                        onClick={() => { setEnabled(true); setMode("blur"); }}
                        className={`${styles.presetChipBtn} ${enabled && mode === "blur" ? styles.presetChipBtnActive : ""}`}
                      >
                        Blur Original
                      </button>
                      <button
                        onClick={() => { setEnabled(true); setMode("color"); }}
                        className={`${styles.presetChipBtn} ${enabled && mode === "color" ? styles.presetChipBtnActive : ""}`}
                      >
                        Solid Color
                      </button>
                    </div>
                  </div>

                  {/* Mode specific parameters */}
                  {mode === "blur" && enabled && (
                    <div className={styles.controlGroup}>
                      <div className={styles.sliderHeader}>
                        <span className={styles.controlLabel}>Depth of Field Blur</span>
                        <span className={styles.sliderValue}>{blurRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={blurRadius}
                        onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                        className={styles.sliderInput}
                        aria-label="Blur radius"
                      />
                    </div>
                  )}

                  {mode === "color" && enabled && (
                    <div className={styles.controlGroup}>
                      <div className={styles.sliderHeader}>
                        <span className={styles.controlLabel}>Solid Color Fill</span>
                        <span className={styles.sliderValue} style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>{color}</span>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          style={{ width: "48px", height: "36px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", background: "none", padding: 0 }}
                          aria-label="Solid background color picker"
                        />
                        <input
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className={styles.textInput}
                          style={{ flex: 1, height: "36px", padding: "8px" }}
                          aria-label="Solid background color hex code"
                        />
                      </div>
                    </div>
                  )}

                  <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "4px 0" }} />

                  {/* Subject Extraction Threshold / Hole Fill Slider */}
                  <div className={styles.controlGroup}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.controlLabel}>Subject Edge Sensitivity (Hole-Fill)</span>
                      <span className={styles.sliderValue}>{alphaThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={alphaThreshold}
                      onChange={(e) => setAlphaThreshold(parseInt(e.target.value))}
                      className={styles.sliderInput}
                      aria-label="Subject extraction threshold slider"
                    />
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "-2px", lineHeight: "1.3" }}>
                      Increase to restore and solidify low-probability interior subject parts (e.g. skin or clothing matching background tones) in real-time.
                    </span>
                  </div>

                  <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "4px 0" }} />

                  {/* Bloom effects sliders */}
                  <div className={styles.controlGroup}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.controlLabel}>Bloom Glow Radius</span>
                      <span className={styles.sliderValue}>{bloomRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={bloomRadius}
                      onChange={(e) => setBloomRadius(parseInt(e.target.value))}
                      className={styles.sliderInput}
                      aria-label="Bloom glow radius"
                    />
                  </div>

                  <div className={styles.controlGroup}>
                    <div className={styles.sliderHeader}>
                      <span className={styles.controlLabel}>Bloom Intensity</span>
                      <span className={styles.sliderValue}>{bloomIntensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bloomIntensity}
                      onChange={(e) => setBloomIntensity(parseInt(e.target.value))}
                      className={styles.sliderInput}
                      aria-label="Bloom intensity"
                    />
                  </div>

                  {/* Output Image Format Selection */}
                  <div className={styles.controlGroup}>
                    <label className={styles.controlLabel}>Download Format</label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value as any)}
                      className={sharedStyles.select}
                      style={{ padding: "8px 12px" }}
                    >
                      <option value="PNG">PNG Image (Lossless Transparency)</option>
                      <option value="WEBP">WEBP Image (Highly Optimized)</option>
                      <option value="JPG">JPG Image (Standard Studio)</option>
                    </select>
                  </div>

                  {/* Toggle Background Removal State */}
                  <button
                    onClick={() => setEnabled(e => !e)}
                    className={styles.btnSecondary}
                  >
                    {enabled ? "Revert to Original Background" : "Apply Edge Mask"}
                  </button>
                </>
              )}

              {/* Upload Another / Clear */}
              <button
                onClick={cleanActiveImage}
                className={styles.btnSecondary}
                style={{ borderStyle: "dashed", borderColor: "var(--border-dark)", color: "var(--text-muted)" }}
              >
                Clear Current Canvas
              </button>

            </div>

            {/* Bottom Actions Card */}
            <div className={styles.applyBar}>
              <button
                disabled={!processedBlob}
                onClick={handleDownload}
                className={styles.btnPrimary}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Isolated Subject
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Contextual SEO Technical specifications */}
      <section className={pageStyles.seoSection} style={{ marginTop: "40px" }} aria-label="AI Matting Specifications">
        <h2 className={pageStyles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          Local Neural Edge Matting & Optical Bleed Specifications
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Trimap & Grayscale Alpha Matting</h3>
            <p className={pageStyles.seoCardText}>
              Unlike simple binary semantic segmentation which makes jaggy cuts along edges, local portrait matting separates an image into three zones (Trimap): solid foreground (α = 1), solid background (α = 0), and transition/translucent boundaries (0 &lt; α &lt; 1). The local neural model predicts a continuous alpha value for every pixel in the transition zone, successfully isolating single hair strands, veil transparencies, and soft edge curves.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Edge Color Decontamination</h3>
            <p className={pageStyles.seoCardText}>
              A common visual defect in background removal is the "color spill halo" where the original background color remains baked into the translucent edge blurs of the subject. SuperUtility isolates translucent edge pixels (0.05 &lt; α &lt; 0.95) and replaces their color values with the nearest solid foreground color (α &gt; 0.98), maintaining the original transparency mask while completely removing background bleed.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Composited Depth-of-Field & Light Wraps</h3>
            <p className={pageStyles.seoCardText}>
              By isolating the background and foreground matte layers separately, the tool can composite them using specialized shaders:
              1. **Bokeh DOF**: Blurs the background layer while keeping the foreground solid, preventing boundary smudge artifacts.
              2. **Rim Light Bloom**: Blurs a copy of the foreground subject behind its own layer under a <code className={pageStyles.seoCode}>screen</code> composite operation, wrapping the background light naturally around soft hair details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
