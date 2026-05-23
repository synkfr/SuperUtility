"use client";

import React, { useState, useRef } from "react";
import styles from "./PdfEditor.module.css"; // Reuse PDF Editor panel styles for consistency
import sharedStyles from "./SharedStyles.module.css";

interface SecurityScanReport {
  fileName: string;
  fileSize: number;
  hasJavaScript: boolean;
  hasAutoActions: boolean;
  hasLaunch: boolean;
  hasAttachments: boolean;
  hasUrlLinks: boolean;
  isEncrypted: boolean;
  severity: "safe" | "warning" | "suspicious";
  details: string[];
}

export default function PdfSecurityScanner() {
  const [report, setReport] = useState<SecurityScanReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await scanPdfFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await scanPdfFile(e.target.files[0]);
    }
  };

  const scanPdfFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Invalid format: Please upload a standard PDF document.");
      return;
    }

    setIsScanning(true);
    setReport(null);

    // Dynamic timeout to simulate scanning process aesthetics
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      // Convert array buffer safely to binary string representation
      let text = "";
      const chunkSize = 65536;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        text += String.fromCharCode.apply(null, chunk as any);
      }

      // Scanner checks
      const hasJavaScript = /\/JS\b|\/JavaScript\b/i.test(text);
      const hasAutoActions = /\/AA\b|\/OpenAction\b/i.test(text);
      const hasLaunch = /\/Launch\b/i.test(text);
      const hasAttachments = /\/EmbeddedFiles\b|\/FileAttachment\b/i.test(text);
      const hasUrlLinks = /\/URI\b/i.test(text);
      const isEncrypted = /\/Encrypt\b/i.test(text);

      const details: string[] = [];
      let severity: "safe" | "warning" | "suspicious" = "safe";

      if (hasJavaScript) {
        severity = "suspicious";
        details.push("CRITICAL: Embedded JavaScript execution nodes found inside PDF document parameters.");
      }
      if (hasAutoActions) {
        severity = "suspicious";
        details.push("CRITICAL: Suspicious Auto-execution triggers (/OpenAction or /AA) found, which can run scripts immediately upon document open.");
      }
      if (hasLaunch) {
        severity = "suspicious";
        details.push("CRITICAL: External system program invocation flags (/Launch) detected.");
      }
      if (hasAttachments) {
        severity = "suspicious";
        details.push("HIGH: Embedded attachments or external files (/EmbeddedFiles) detected within the PDF structure.");
      }
      if (isEncrypted) {
        if (severity !== "suspicious") severity = "warning";
        details.push("NOTICE: PDF is password-protected or uses strong cryptographic permissions (/Encrypt dictionary active).");
      }
      if (hasUrlLinks) {
        if (severity === "safe") severity = "warning";
        details.push("NOTICE: Active hyperlinks (/URI hyperlinks) discovered in page contexts.");
      }

      if (severity === "safe") {
        details.push("Document clean: Zero embedded scripts, suspicious actions, or attachments detected.");
      }

      setReport({
        fileName: file.name,
        fileSize: file.size,
        hasJavaScript,
        hasAutoActions,
        hasLaunch,
        hasAttachments,
        hasUrlLinks,
        isEncrypted,
        severity,
        details,
      });
    } catch (err) {
      console.error("PDF Scan error", err);
      alert("Error scanning PDF file. The document structure may be corrupt.");
    }

    setIsScanning(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Dynamic scan picker container */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFilePicker}
        className={styles.uploadContainer}
        style={{ padding: "48px 24px" }}
      >
        <svg className={styles.uploadIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--lime-500)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
        <div className={styles.uploadTitle}>Drag & Drop PDF File to Scan</div>
        <div className={styles.uploadDesc}>
          Instantly check PDF files locally in your browser to detect hidden payloads, malicious scripts, suspicious launch triggers, or attachments.
        </div>
        <button className={sharedStyles.btnPrimary} style={{ padding: "10px 20px" }}>Select PDF Document</button>
      </div>

      {isScanning && (
        <div style={{ textAlign: "center", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div className={styles.spinner}></div>
          <div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Analyzing PDF Binary Object Tree...</div>
        </div>
      )}

      {/* Reports Display Card */}
      {report && (
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Security Analysis Report
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0 0 0", fontFamily: "var(--font-mono)" }}>
                File: {report.fileName} ({(report.fileSize / 1024).toFixed(0)} KB)
              </p>
            </div>

            {/* Risk Badge state */}
            {report.severity === "safe" ? (
              <span
                style={{
                  background: "var(--lime-50)",
                  border: "1.5px solid var(--lime-200)",
                  color: "var(--lime-700)",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Safe 🟢
              </span>
            ) : report.severity === "warning" ? (
              <span
                style={{
                  background: "#fef3c7",
                  border: "1.5px solid #fcd34d",
                  color: "#b45309",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Warning 🟡
              </span>
            ) : (
              <span
                style={{
                  background: "#fee2e2",
                  border: "1.5px solid #fca5a5",
                  color: "#b91c1c",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Suspicious 🔴
              </span>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "12px",
            }}
          >
            {[
              { label: "Embedded Scripts", value: report.hasJavaScript ? "Detected 🔴" : "Clean 🟢" },
              { label: "Auto Execution", value: report.hasAutoActions ? "Detected 🔴" : "Clean 🟢" },
              { label: "Program Launch", value: report.hasLaunch ? "Detected 🔴" : "Clean 🟢" },
              { label: "Embedded Attachments", value: report.hasAttachments ? "Detected 🔴" : "Clean 🟢" },
              { label: "Hyperlinks / Links", value: report.hasUrlLinks ? "Found 🟡" : "None 🟢" },
              { label: "Password Encryption", value: report.isEncrypted ? "Enabled 🟡" : "Disabled 🟢" },
            ].map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-dark)",
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Details checklist log */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-secondary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Scan Checklist & Bulletins
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {report.details.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--bg-base)",
                    borderLeft: `4px solid ${
                      report.severity === "safe"
                        ? "var(--lime-500)"
                        : report.severity === "warning"
                        ? "#f59e0b"
                        : "var(--red-600)"
                    }`,
                    padding: "10px 14px",
                    borderRadius: "0 4px 4px 0",
                    fontSize: "0.75rem",
                    lineHeight: "1.4",
                    color: "var(--text-primary)",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
