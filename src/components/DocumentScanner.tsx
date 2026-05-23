"use client";

import React, { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import styles from "./PdfEditor.module.css";
import sharedStyles from "./SharedStyles.module.css";

interface ScannedSnap {
  id: string;
  originalDataUrl: string;
  processedDataUrl: string;
  filter: "none" | "bw" | "vibrant" | "grayscale";
  brightness: number;
  contrast: number;
}

export default function DocumentScanner() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [snaps, setSnaps] = useState<ScannedSnap[]>([]);
  const [activeSnapId, setActiveSnapId] = useState<string | null>(null);

  // Enhancements settings for active snap
  const [activeFilter, setActiveFilter] = useState<"none" | "bw" | "vibrant" | "grayscale">("none");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const [isProcessing, setIsProcessing] = useState(false);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize and request camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access failed", err);
      alert("Camera access denied or unavailable. Please upload pre-captured images instead.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Capture frame snap trigger
  const captureSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = video.videoWidth || 800;
      canvas.height = video.videoHeight || 600;

      // Draw active frame onto canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/jpeg", 0.95);

      const snapId = Math.random().toString(36).substring(2, 9);
      const newSnap: ScannedSnap = {
        id: snapId,
        originalDataUrl: url,
        processedDataUrl: url,
        filter: "none",
        brightness: 100,
        contrast: 100,
      };

      setSnaps((prev) => [...prev, newSnap]);
      setActiveSnapId(snapId);
      setActiveFilter("none");
      setBrightness(100);
      setContrast(100);
    }
  };

  // Canvas Enhancement Filter computations
  const applyEnhancements = (
    snap: ScannedSnap,
    filterType: "none" | "bw" | "vibrant" | "grayscale",
    bVal: number,
    cVal: number
  ) => {
    const tempImg = new Image();
    tempImg.onload = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = tempImg.width;
      canvas.height = tempImg.height;
      ctx.drawImage(tempImg, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Apply brightness & contrast factors
      const bFactor = (bVal - 100) * 2.55; // convert range
      const cFactor = (cVal / 100) ** 2;

      for (let i = 0; i < data.length; i += 4) {
        // Red, Green, Blue
        for (let c = 0; c < 3; c++) {
          let pixelVal = data[i + c];
          
          // Contrast adjust
          pixelVal = ((pixelVal / 255 - 0.5) * cFactor + 0.5) * 255;
          // Brightness adjust
          pixelVal += bFactor;

          data[i + c] = Math.min(255, Math.max(0, pixelVal));
        }

        // Apply filters
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (filterType === "grayscale") {
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        } else if (filterType === "bw") {
          // Dynamic print-like binary thresholding
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          const binary = gray > 120 ? 255 : 0;
          data[i] = binary;
          data[i + 1] = binary;
          data[i + 2] = binary;
        } else if (filterType === "vibrant") {
          // Boost saturation
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          data[i] = Math.min(255, Math.max(0, gray + (r - gray) * 1.4));
          data[i + 1] = Math.min(255, Math.max(0, gray + (g - gray) * 1.4));
          data[i + 2] = Math.min(255, Math.max(0, gray + (b - gray) * 1.4));
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const outputUrl = canvas.toDataURL("image/jpeg", 0.9);

      setSnaps((prev) =>
        prev.map((s) =>
          s.id === snap.id
            ? {
                ...s,
                processedDataUrl: outputUrl,
                filter: filterType,
                brightness: bVal,
                contrast: cVal,
              }
            : s
        )
      );
    };
    tempImg.src = snap.originalDataUrl;
  };

  const handleFilterChange = (filter: "none" | "bw" | "vibrant" | "grayscale") => {
    setActiveFilter(filter);
    const active = snaps.find((s) => s.id === activeSnapId);
    if (active) applyEnhancements(active, filter, brightness, contrast);
  };

  const handleBrightnessChange = (val: number) => {
    setBrightness(val);
    const active = snaps.find((s) => s.id === activeSnapId);
    if (active) applyEnhancements(active, activeFilter, val, contrast);
  };

  const handleContrastChange = (val: number) => {
    setContrast(val);
    const active = snaps.find((s) => s.id === activeSnapId);
    if (active) applyEnhancements(active, activeFilter, brightness, val);
  };

  const deleteSnap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = snaps.filter((s) => s.id !== id);
    setSnaps(remaining);
    if (activeSnapId === id) {
      setActiveSnapId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Compile active document snaps to multi-page PDF
  const exportScansToPdf = async () => {
    if (snaps.length === 0) {
      alert("Capture at least one document page first!");
      return;
    }

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < snaps.length; i++) {
        const snap = snaps[i];
        
        // Fetch raw image bytes from processed data URL
        const base64Data = snap.processedDataUrl.split(",")[1];
        const binaryStr = window.atob(base64Data);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let j = 0; j < len; j++) {
          bytes[j] = binaryStr.charCodeAt(j);
        }

        const page = pdfDoc.addPage([595.28, 841.89]); // A4 bounds
        const img = await pdfDoc.embedJpg(bytes);
        const { width, height } = page.getSize();
        const imgDims = img.scaleToFit(width - 20, height - 20);

        page.drawImage(img, {
          x: width / 2 - imgDims.width / 2,
          y: height / 2 - imgDims.height / 2,
          width: imgDims.width,
          height: imgDims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `scanned_document_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("PDF Scan export failed", err);
    }

    setIsProcessing(false);
  };

  const activeSnap = snaps.find((s) => s.id === activeSnapId) || null;

  return (
    <div className={styles.container}>
      {/* Hidden processing canvas buffer */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* LEFT PANEL: Camera stream preview / Snaps gallery */}
      <aside className={styles.leftPanel}>
        <div className={styles.leftPanelTitle}>Camera Scanner Feed</div>
        
        <div style={{ position: "relative", width: "100%", borderRadius: "var(--radius-md)", overflow: "hidden", background: "#000", aspectRatio: "4/3" }}>
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "#fff", fontSize: "0.8rem", width: "80%" }}>
              Camera stream inactive. Grant permissions or click Start.
            </div>
          )}

          {stream && (
            <button
              onClick={captureSnap}
              className={styles.toolbarBtnPrimary}
              style={{
                position: "absolute",
                bottom: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "4px solid #fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
              }}
              title="Capture Document Page"
            >
              <div style={{ width: "18px", height: "18px", background: "#fff", borderRadius: "50%" }}></div>
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "6px", width: "100%" }}>
          <button onClick={startCamera} className={styles.galleryControlBtn} style={{ flex: 1 }}>Start Camera</button>
          <button onClick={stopCamera} className={styles.galleryControlBtn} style={{ flex: 1 }}>Stop Camera</button>
        </div>

        <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />

        <div className={styles.leftPanelTitle}>Scanned Snaps ({snaps.length})</div>
        <div className={styles.scrollArea}>
          <div className={styles.filesList}>
            {snaps.map((s, idx) => {
              const isActive = activeSnapId === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveSnapId(s.id);
                    setActiveFilter(s.filter);
                    setBrightness(s.brightness);
                    setContrast(s.contrast);
                  }}
                  className={`${styles.fileCard} ${isActive ? styles.fileCardActive : ""}`}
                >
                  <span className={styles.fileName}>Document Page {idx + 1}</span>
                  <button onClick={(e) => deleteSnap(s.id, e)} className={styles.removeBtn}>&times;</button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* CENTER PANEL: Enhanced page viewport */}
      <section className={styles.centerPanel}>
        <div className={styles.previewHeader}>
          <div className={styles.previewTitle}>Scan Enhancement Workspace</div>
        </div>

        <div className={styles.workspace} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {activeSnap ? (
            <div style={{ maxWidth: "100%", maxHeight: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <img
                src={activeSnap.processedDataUrl}
                alt="Active scan frame"
                style={{ maxWidth: "100%", maxHeight: "50vh", display: "block", objectFit: "contain" }}
              />
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", padding: "40px", textAlign: "center" }}>
              Please capture a snap or select one from the gallery snaps collection to start correcting perspective / filters.
            </div>
          )}
        </div>
      </section>

      {/* RIGHT PANEL: Filter enhancements controls */}
      <aside className={styles.rightPanel}>
        <div className={styles.controlsScrollArea}>
          
          <div className={styles.controlSection}>
            <div className={styles.controlHeader} style={{ cursor: "default" }}>
              <span className={styles.controlTitle}>Enhancement Filters</span>
            </div>
            
            <div className={styles.controlContent}>
              <div className={styles.presetGrid}>
                {[
                  { id: "none", label: "Original" },
                  { id: "bw", label: "Clean Print (B&W)" },
                  { id: "grayscale", label: "Grayscale" },
                  { id: "vibrant", label: "Vibrant Colors" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFilterChange(f.id as any)}
                    className={`${styles.presetBtn} ${activeFilter === f.id ? styles.presetBtnActive : ""}`}
                    disabled={!activeSnapId}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.controlSection}>
            <div className={styles.controlHeader} style={{ cursor: "default" }}>
              <span className={styles.controlTitle}>Custom Tuners</span>
            </div>

            <div className={styles.controlContent}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label className={styles.inputLabel}>Brightness</label>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="2"
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                  disabled={!activeSnapId}
                  style={{ width: "100%", accentColor: "var(--lime-500)" }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label className={styles.inputLabel}>Contrast</label>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="2"
                  value={contrast}
                  onChange={(e) => handleContrastChange(parseInt(e.target.value))}
                  disabled={!activeSnapId}
                  style={{ width: "100%", accentColor: "var(--lime-500)" }}
                />
              </div>
            </div>
          </div>

        </div>

        {snaps.length > 0 && (
          <div className={styles.actionCard}>
            <button
              onClick={exportScansToPdf}
              className={sharedStyles.btnPrimary}
              style={{
                width: "100%",
                padding: "10px",
                background: "var(--lime-500)",
                borderColor: "var(--lime-600)",
                fontSize: "0.85rem",
                fontWeight: 800
              }}
            >
              Export All snaps as PDF ({snaps.length})
            </button>
          </div>
        )}
      </aside>

      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.spinner}></div>
          <div style={{ fontWeight: 700 }}>Compiling scanned document PDF pages...</div>
        </div>
      )}
    </div>
  );
}
