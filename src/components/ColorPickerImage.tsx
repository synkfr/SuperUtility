"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function ColorPickerImage() {
  const [imageSrc, setImageSrc] = useState("");
  const [hoverColor, setHoverColor] = useState("rgba(0,0,0,0)");
  const [selectedColor, setSelectedColor] = useState("#84cc16");
  const [colorHistory, setColorHistory] = useState<string[]>(["#84cc16", "#10b981", "#3b82f6"]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert RGB array to Hex
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Convert RGB array to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Limit canvas sizes to prevent layout overflow while keeping high details
      const maxW = 500;
      const scale = Math.min(1, maxW / img.naturalWidth);
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imageSrc]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      setHoverColor(hex);
    } catch (err) {
      // Cross-origin checks if image wasn't fully offline
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      setSelectedColor(hex);
      if (!colorHistory.includes(hex)) {
        setColorHistory((prev) => [hex, ...prev.slice(0, 7)]);
      }
    } catch (err) {}
  };

  const getRgbString = () => {
    const hex = selectedColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getHslString = () => {
    const hex = selectedColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return rgbToHsl(r, g, b);
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
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
        {/* Selector panel */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Select Image Source</span>
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
            onClick={() => document.getElementById("img-picker-input")?.click()}
          >
            <input
              type="file"
              id="img-picker-input"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>
              Drag or Upload Image File
            </div>
          </div>

          {imageSrc && (
            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block" }}>
                Hover & click on the image below to sample color pixels:
              </span>
              <div
                ref={containerRef}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-secondary)",
                  padding: "12px",
                  border: "1px solid var(--border-dark)",
                  cursor: "crosshair",
                  position: "relative",
                }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseMove={handleMouseMove}
                  onClick={handleCanvasClick}
                  style={{
                    maxWidth: "100%",
                    display: "block",
                    boxShadow: "var(--shadow-sm)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Color Results Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Sampled Target details</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--border-dark)",
                  boxShadow: "var(--shadow-md)",
                  backgroundColor: selectedColor,
                }}
              />
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Active Color
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {selectedColor.toUpperCase()}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>HEX:</span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>{selectedColor.toUpperCase()}</span>
                  <button onClick={() => handleCopy(selectedColor.toUpperCase())} className={styles.sampleBtn} style={{ fontSize: "0.65rem", padding: "2px 6px" }}>Copy</button>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>RGB:</span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>{getRgbString()}</span>
                  <button onClick={() => handleCopy(getRgbString())} className={styles.sampleBtn} style={{ fontSize: "0.65rem", padding: "2px 6px" }}>Copy</button>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>HSL:</span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>{getHslString()}</span>
                  <button onClick={() => handleCopy(getHslString())} className={styles.sampleBtn} style={{ fontSize: "0.65rem", padding: "2px 6px" }}>Copy</button>
                </span>
              </div>
            </div>

            {/* Colors history */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Sampled Colors Palette History
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {colorHistory.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: col,
                      border: selectedColor === col ? "3px solid var(--text-primary)" : "1px solid var(--border-dark)",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    title={col}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
