"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import styles from "./QrCodeGenerator.module.css";
import pageStyles from "@/app/page.module.css";

const PRESET_FG_COLORS = ["#000000", "#1e3a8a", "#115e59", "#4c1d95", "#854d0e", "#9f1239"];
const PRESET_BG_COLORS = ["#ffffff", "#f8fafc", "#f0fdf4", "#fef2f2", "#fffbeb", "#fcf7ff"];

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://superutility.xyz");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [margin, setMargin] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text || !canvasRef.current) return;
    
    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: level,
      },
      (error) => {
        if (error) {
          console.error("QR Code generation error:", error);
        }
      }
    );
  }, [text, size, fgColor, bgColor, level, margin]);

  const handleDownloadPng = () => {
    if (!canvasRef.current || !text) return;
    try {
      const url = canvasRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "superutility-qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("Failed to download PNG:", e);
    }
  };

  const handleDownloadSvg = () => {
    if (!text) return;
    QRCode.toString(
      text,
      {
        type: "svg",
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: level,
      },
      (err, svgString) => {
        if (err) {
          console.error("SVG generation failed:", err);
          return;
        }
        try {
          const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
           a.download = "superutility-qrcode.svg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error("Failed to download SVG:", e);
        }
      }
    );
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.workspace}>
        {/* Left Side: Customize Form Panel */}
        <div className={styles.settingsPanel}>
          {/* Section: Content */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Content to Encode</span>
            <div className={styles.controlGroup}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label className={styles.controlLabel} htmlFor="qr-text">Text or URL content</label>
                <span className={styles.charCount}>{text.length} characters</span>
              </div>
              <textarea
                id="qr-text"
                className={styles.textInput}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste link/text to encode here..."
              />
            </div>
          </div>

          {/* Section: Colors */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Color Palette</span>
            <div className={styles.colorPickerRow}>
              {/* Foreground color */}
              <div className={styles.controlGroup} style={{ flex: 1 }}>
                <span className={styles.controlLabel}>Foreground</span>
                <div className={styles.colorPickerWrapper}>
                  <div className={styles.colorIndicator} style={{ backgroundColor: fgColor }}>
                    <input
                      type="color"
                      className={styles.colorInput}
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      aria-label="Foreground Color Picker"
                    />
                  </div>
                  <span className={styles.colorLabel}>{fgColor.toUpperCase()}</span>
                </div>
                <div className={styles.presetContainer}>
                  {PRESET_FG_COLORS.map((c) => (
                    <button
                      key={c}
                      className={styles.presetChip}
                      style={{ backgroundColor: c }}
                      onClick={() => setFgColor(c)}
                      title={`Use ${c}`}
                      aria-label={`Use foreground color ${c}`}
                    />
                  ))}
                </div>
              </div>

              {/* Background color */}
              <div className={styles.controlGroup} style={{ flex: 1 }}>
                <span className={styles.controlLabel}>Background</span>
                <div className={styles.colorPickerWrapper}>
                  <div className={styles.colorIndicator} style={{ backgroundColor: bgColor }}>
                    <input
                      type="color"
                      className={styles.colorInput}
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      aria-label="Background Color Picker"
                    />
                  </div>
                  <span className={styles.colorLabel}>{bgColor.toUpperCase()}</span>
                </div>
                <div className={styles.presetContainer}>
                  {PRESET_BG_COLORS.map((c) => (
                    <button
                      key={c}
                      className={styles.presetChip}
                      style={{ backgroundColor: c }}
                      onClick={() => setBgColor(c)}
                      title={`Use ${c}`}
                      aria-label={`Use background color ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Size & Margins */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Dimensions & Margins</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Dimensions (Width/Height)</span>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  aria-label="QR Code Size Slider"
                  style={{ flex: 1 }}
                />
                <span className={styles.sliderValue}>{size}px</span>
              </div>
            </div>

            <div className={styles.controlGroup} style={{ marginTop: "8px" }}>
              <span className={styles.controlLabel}>Border Padding (Margin)</span>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  aria-label="QR Code Margin Slider"
                  style={{ flex: 1 }}
                />
                <span className={styles.sliderValue}>{margin}</span>
              </div>
            </div>
          </div>

          {/* Section: Standard */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Error Correction Standard</span>
            <div className={styles.chipGroup}>
              {(["L", "M", "Q", "H"] as const).map((lvl) => (
                <button
                  key={lvl}
                  className={`${styles.chip} ${level === lvl ? styles.chipActive : ""}`}
                  onClick={() => setLevel(lvl)}
                >
                  {lvl === "L" && "Low (7%)"}
                  {lvl === "M" && "Medium (15%)"}
                  {lvl === "Q" && "Quartile (25%)"}
                  {lvl === "H" && "High (30%)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Live Render Preview Panel */}
        <div className={styles.previewPanel}>
          {text ? (
            <>
              <div className={`${styles.qrWrapper} checkered-bg`}>
                <canvas ref={canvasRef} className={styles.canvas} />
              </div>
              <div className={styles.btnRow}>
                <button onClick={handleDownloadPng} className={styles.btn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  PNG
                </button>
                <button onClick={handleDownloadSvg} className={`${styles.btn} ${styles.btnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  SVG Vector
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="3"></rect>
                <rect x="14" y="7" width="3" height="3"></rect>
                <rect x="7" y="14" width="3" height="3"></rect>
                <rect x="14" y="14" width="3" height="3"></rect>
              </svg>
              <span>Provide text to render a QR Code</span>
            </div>
          )}
        </div>
      </div>

      {/* SEO Technical Footer */}
      <section className={pageStyles.seoSection} style={{ marginTop: "40px" }} aria-label="QR Code Generator Scannability Science">
        <h2 className={pageStyles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h.008v.008H15V15Zm0 3h.008v.008H15V18Zm-3-3h.008v.008H12V15Zm0 3h.008v.008H12V18Zm-3 3h.008v.008H9V21Zm3 0h.008v.008H12V21ZM15 21h.008v.008H15V21Zm3-6h.008v.008H18V15Zm0 3h.008v.008H18V18Zm0 3h.008v.008H18V21ZM16.5 12h.008v.008H16.5V12Zm-1.5-1.5h.008v.008H15v-.008Zm1.5-.008h.008v.008H16.5v-.008Zm-1.5 3h.008v.008H15V13.5Z" />
          </svg>
          QR Code Vector Math & Scannability
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does Reed-Solomon Error Correction work?</h3>
            <p className={pageStyles.seoCardText}>
              QR codes utilize Reed-Solomon error correction to restore data if the code is dirty, scratched, or partially obstructed. There are four error correction levels: <code className={pageStyles.seoCode}>L (7%)</code>, <code className={pageStyles.seoCode}>M (15%)</code>, <code className={pageStyles.seoCode}>Q (25%)</code>, and <code className={pageStyles.seoCode}>H (30%)</code>. A higher correction level increases data density and redundancy, adding more pixels but ensuring robust scannability in rugged environments.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why choose SVG vector graphics over standard PNG?</h3>
            <p className={pageStyles.seoCardText}>
              Standard raster graphics (like PNG) can become pixelated or blurry when scaled, causing scanning failures. Vector graphics (SVG) are rendered mathematically as XML coordinates, allowing infinite scaling with crisp borders and perfect pixel alignments. SVGs are ideal for large-scale print advertisements, architectural billboards, and premium user interface elements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
