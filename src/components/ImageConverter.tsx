"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState("");
  const [convertedSrc, setConvertedSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const [targetFormat, setTargetFormat] = useState<"png" | "jpeg" | "webp">("png");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let mimeType = "image/png";
      if (targetFormat === "jpeg") mimeType = "image/jpeg";
      if (targetFormat === "webp") mimeType = "image/webp";

      const dataUrl = canvas.toDataURL(mimeType);
      setConvertedSrc(dataUrl);
    };
  };

  useEffect(() => {
    convertImage();
  }, [imageSrc, targetFormat]);

  const handleDownload = () => {
    if (!convertedSrc) return;
    const link = document.createElement("a");
    link.href = convertedSrc;
    link.download = `${fileName || "converted"}.${targetFormat}`;
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
            <span className={styles.label}>Convert Configuration</span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed var(--border-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "28px 20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "var(--bg-secondary)",
              transition: "all var(--transition-fast)",
            }}
            onClick={() => document.getElementById("img-convert-input")?.click()}
          >
            <input
              type="file"
              id="img-convert-input"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-primary)" }}>
              Drag or Upload Image File
            </div>
          </div>

          {imageSrc && (
            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Select Output Extension
                </span>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as any)}
                  className={styles.select}
                >
                  <option value="png">PNG (Portable Network Graphics)</option>
                  <option value="jpeg">JPG / JPEG (Joint Photographic Groups)</option>
                  <option value="webp">WEBP (Modern High-Quality Web Format)</option>
                </select>
              </div>

              <button onClick={handleDownload} className={styles.btnPrimary} style={{ marginTop: "6px" }}>
                Download Converted Image File
              </button>
            </div>
          )}
        </div>

        {/* Preview Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Output Format Preview</span>
          </div>

          {convertedSrc ? (
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
                src={convertedSrc}
                alt="Converted Preview"
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
              Upload any image to convert format formats.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
