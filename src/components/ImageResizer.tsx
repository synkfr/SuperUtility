"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState("");
  const [resizedSrc, setResizedSrc] = useState("");
  const [fileName, setFileName] = useState("");

  // Dimensions
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockRatio, setLockRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);

      const img = new Image();
      img.src = src;
      img.onload = () => {
        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);
        setWidth(img.naturalWidth.toString());
        setHeight(img.naturalHeight.toString());
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    const parsedWidth = parseFloat(val);
    if (lockRatio && !isNaN(parsedWidth) && aspectRatio > 0) {
      setHeight(Math.round(parsedWidth / aspectRatio).toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    const parsedHeight = parseFloat(val);
    if (lockRatio && !isNaN(parsedHeight) && aspectRatio > 0) {
      setWidth(Math.round(parsedHeight * aspectRatio).toString());
    }
  };

  const handleResize = () => {
    if (!imageSrc) return;
    const w = parseInt(width);
    const h = parseInt(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      setResizedSrc(canvas.toDataURL("image/png"));
    };
  };

  useEffect(() => {
    handleResize();
  }, [width, height, imageSrc]);

  const handleDownload = () => {
    if (!resizedSrc) return;
    const link = document.createElement("a");
    link.href = resizedSrc;
    link.download = `${fileName || "resized"}_${width}x${height}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Settings Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Resize Settings</span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed var(--border-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "var(--bg-secondary)",
              transition: "all var(--transition-fast)",
            }}
            onClick={() => document.getElementById("img-resize-input")?.click()}
          >
            <input
              type="file"
              id="img-resize-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <svg
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--text-muted)", marginBottom: "8px" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>
              Choose or Drag Image
            </div>
          </div>

          {imageSrc && (
            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                <span>Original Dimensions:</span>
                <span>{originalWidth}px × {originalHeight}px</span>
              </div>

              <div className={styles.grid2}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Width (pixels)
                  </span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Height (pixels)
                  </span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <label className={styles.checkboxLabel} style={{ marginTop: "4px" }}>
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(e) => setLockRatio(e.target.checked)}
                />
                <span>Lock Aspect Ratio ({aspectRatio.toFixed(2)}:1)</span>
              </label>

              <button onClick={handleDownload} className={styles.btnPrimary} style={{ marginTop: "8px" }}>
                Download Resized Image
              </button>
            </div>
          )}
        </div>

        {/* Preview Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Preview (Resized bounds)</span>
          </div>

          {resizedSrc ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "300px",
                overflow: "hidden",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-secondary)",
                padding: "16px",
                border: "1px solid var(--border-dark)",
              }}
            >
              <img
                src={resizedSrc}
                alt="Resized Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "260px",
                  objectFit: "contain",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "var(--shadow-sm)",
                }}
              />
            </div>
          ) : (
            <div style={{ padding: "80px 20px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Upload any image file to configure custom sizes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
