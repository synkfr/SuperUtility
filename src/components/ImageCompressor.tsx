"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function ImageCompressor() {
  const [imageSrc, setImageSrc] = useState("");
  const [compressedSrc, setCompressedSrc] = useState("");
  const [quality, setQuality] = useState(0.7); // 70% quality default
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
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

  const compressImage = () => {
    if (!imageSrc) return;
    setIsCompressing(true);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Compress to JPEG format with quality slider (0.1 to 1.0)
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      setCompressedSrc(dataUrl);

      // Compute compressed size by converting dataURL to Blob
      const head = "data:image/jpeg;base64,";
      const fileLength = dataUrl.length - head.length;
      const sizeInBytes = Math.round(fileLength * 0.75); // approx size
      setCompressedSize(sizeInBytes);

      setIsCompressing(false);
    };
  };

  // Auto compress when quality or image source changes
  useEffect(() => {
    compressImage();
  }, [imageSrc, quality]);

  const handleDownload = () => {
    if (!compressedSrc) return;
    const link = document.createElement("a");
    link.href = compressedSrc;
    link.download = `${fileName || "compressed"}_optimized.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const savedPercentage = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Upload and settings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Upload File</span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed var(--border-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "var(--bg-secondary)",
              transition: "all var(--transition-fast)",
            }}
            onClick={() => document.getElementById("img-compress-input")?.click()}
          >
            <input
              type="file"
              id="img-compress-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <svg
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--text-muted)", marginBottom: "8px" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--text-primary)" }}>
              Drag & Drop Image Here
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              PNG, JPG, or WEBP formats supported
            </div>
          </div>

          {imageSrc && (
            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "700" }}>
                <span>Compression Quality: <span style={{ color: "var(--lime-700)" }}>{Math.round(quality * 100)}%</span></span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>

        {/* Compression Statistics Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Compression Summary</span>
          </div>

          {originalSize > 0 && compressedSize > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "10px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Original Size</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {(originalSize / 1024).toFixed(1)} KB
                  </div>
                </div>
                <div style={{ padding: "10px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Compressed Size</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--lime-700)" }}>
                    {(compressedSize / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>

              {savedPercentage > 0 ? (
                <div style={{ padding: "14px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Space Savings
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--lime-700)", marginTop: "4px" }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px", marginTop: "-4px" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    Saved {savedPercentage}% of file size!
                  </div>
                </div>
              ) : (
                <div style={{ padding: "14px", backgroundColor: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 700, textTransform: "uppercase" }}>
                    No savings detected
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Try reducing compression quality slightly to see improvements.
                  </div>
                </div>
              )}

              <button onClick={handleDownload} className={styles.btnPrimary} style={{ marginTop: "4px" }}>
                Download Compressed JPEG Image
              </button>
            </div>
          ) : (
            <div style={{ padding: "54px 20px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Upload any image file to view real-time compression metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
