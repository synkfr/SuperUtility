"use client";

import React, { useState } from "react";
import styles from "./SharedStyles.module.css";

export default function ImageToBase64() {
  const [imagePreview, setImagePreview] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setFileType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      // Strip target headers if raw is needed, but we keep full data url by default
      setBase64Output(result);
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

  const getRawBase64 = () => {
    return base64Output.split(",")[1] || "";
  };

  const handleCopy = (format: "dataUrl" | "raw" | "html" | "css") => {
    let copyText = "";
    if (format === "dataUrl") {
      copyText = base64Output;
    } else if (format === "raw") {
      copyText = getRawBase64();
    } else if (format === "html") {
      copyText = `<img src="${base64Output}" alt="${fileName}" />`;
    } else if (format === "css") {
      copyText = `background-image: url("${base64Output}");`;
    }

    if (copyText) {
      navigator.clipboard.writeText(copyText);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Upload Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Upload or Drag Image</span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: "2px dashed var(--border-dark)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "var(--bg-secondary)",
              transition: "all var(--transition-fast)",
            }}
            onClick={() => document.getElementById("img-upload-input")?.click()}
          >
            <input
              type="file"
              id="img-upload-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ color: "var(--text-muted)", marginBottom: "12px" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)" }}>
              Drag & Drop Image Here
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
              or click to browse local files
            </div>
          </div>

          {fileName && (
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              File: <span style={{ color: "var(--text-primary)" }}>{fileName}</span> ({Math.round(fileSize / 1024)} KB, {fileType})
            </div>
          )}
        </div>

        {/* Preview and Diffs Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Image Preview</span>
          </div>

          {imagePreview ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "260px",
                overflow: "hidden",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--bg-secondary)",
                padding: "16px",
                border: "1px solid var(--border-dark)",
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "220px",
                  objectFit: "contain",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "var(--shadow-sm)",
                }}
              />
            </div>
          ) : (
            <div style={{ padding: "80px 20px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              No image uploaded. Preview will appear here.
            </div>
          )}
        </div>
      </div>

      {base64Output && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Base64 Embed Outputs</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  Data URL Schema (e.g. for HTML src / CSS background)
                </span>
                <button onClick={() => handleCopy("dataUrl")} className={styles.copyBtn}>
                  Copy Data URL
                </button>
              </div>
              <textarea
                readOnly
                value={base64Output.slice(0, 150) + "..."}
                className={styles.textarea}
                style={{ minHeight: "60px", color: "var(--text-muted)" }}
              />
            </div>

            <div className={styles.grid2}>
              <div>
                <button
                  onClick={() => handleCopy("html")}
                  className={styles.btnPrimary}
                  style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}
                >
                  Copy HTML &lt;img&gt; Embed Code
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleCopy("css")}
                  className={styles.btnPrimary}
                  style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}
                >
                  Copy CSS Background URL
                </button>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  Raw Base64 Hash (excluding metadata headers)
                </span>
                <button onClick={() => handleCopy("raw")} className={styles.copyBtn}>
                  Copy Raw String
                </button>
              </div>
              <textarea
                readOnly
                value={getRawBase64().slice(0, 150) + "..."}
                className={styles.textarea}
                style={{ minHeight: "60px", color: "var(--text-muted)" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
