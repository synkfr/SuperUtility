"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import CryptoJS from "crypto-js";
import styles from "./HashGenerator.module.css";

export default function HashGenerator() {
  const [tab, setTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("Hello, SuperUtility!");
  const [file, setFile] = useState<File | null>(null);
  const [hashingFile, setHashingFile] = useState(false);
  const [fileHashes, setFileHashes] = useState({ md5: "", sha1: "", sha256: "", sha512: "" });
  
  const [upperCase, setUpperCase] = useState(false);
  const [encoding, setEncoding] = useState<"hex" | "base64">("hex");
  const [compareInput, setCompareInput] = useState("");
  
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute text hashes in real-time
  const textHashes = useMemo(() => {
    if (tab === "file") return { md5: "", sha1: "", sha256: "", sha512: "" };
    if (!text) return { md5: "", sha1: "", sha256: "", sha512: "" };

    try {
      const md5Raw = CryptoJS.MD5(text);
      const sha1Raw = CryptoJS.SHA1(text);
      const sha256Raw = CryptoJS.SHA256(text);
      const sha512Raw = CryptoJS.SHA512(text);

      const format = (raw: CryptoJS.lib.WordArray) => {
        const result = encoding === "base64" ? raw.toString(CryptoJS.enc.Base64) : raw.toString(CryptoJS.enc.Hex);
        return upperCase ? result.toUpperCase() : result.toLowerCase();
      };

      return {
        md5: format(md5Raw),
        sha1: format(sha1Raw),
        sha256: format(sha256Raw),
        sha512: format(sha512Raw),
      };
    } catch (e) {
      console.error(e);
      return { md5: "", sha1: "", sha256: "", sha512: "" };
    }
  }, [text, tab, upperCase, encoding]);

  // Compute file hashes asynchronously
  useEffect(() => {
    if (tab !== "file" || !file) {
      setFileHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }

    setHashingFile(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) {
        setHashingFile(false);
        return;
      }

      try {
        const buffer = e.target.result as ArrayBuffer;
        const wordArray = CryptoJS.lib.WordArray.create(buffer);

        const md5Raw = CryptoJS.MD5(wordArray);
        const sha1Raw = CryptoJS.SHA1(wordArray);
        const sha256Raw = CryptoJS.SHA256(wordArray);
        const sha512Raw = CryptoJS.SHA512(wordArray);

        const format = (raw: CryptoJS.lib.WordArray) => {
          const result = encoding === "base64" ? raw.toString(CryptoJS.enc.Base64) : raw.toString(CryptoJS.enc.Hex);
          return upperCase ? result.toUpperCase() : result.toLowerCase();
        };

        setFileHashes({
          md5: format(md5Raw),
          sha1: format(sha1Raw),
          sha256: format(sha256Raw),
          sha512: format(sha512Raw),
        });
      } catch (err) {
        console.error("File hashing error:", err);
      } finally {
        setHashingFile(false);
      }
    };

    reader.onerror = () => {
      setHashingFile(false);
      console.error("File read failed");
    };

    const timer = setTimeout(() => {
      reader.readAsArrayBuffer(file);
    }, 120);

    return () => clearTimeout(timer);
  }, [file, tab, upperCase, encoding]);

  const activeHashes = tab === "text" ? textHashes : fileHashes;

  const handleCopy = async (algo: string, val: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      setCopiedAlgo(algo);
      setTimeout(() => setCopiedAlgo(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setFileHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const comparatorMatch = useMemo(() => {
    if (!compareInput) return null;
    const cleanedCompare = compareInput.trim().toLowerCase();
    
    for (const [algo, val] of Object.entries(activeHashes)) {
      if (val && val.toLowerCase() === cleanedCompare) {
        return { matched: true, algorithm: algo.toUpperCase() };
      }
    }
    return { matched: false, algorithm: "" };
  }, [compareInput, activeHashes]);

  return (
    <div className={`${styles.container} animate-fade-in`}>
      {/* Segmented sliding-style tab toggle */}
      <div className={styles.tabToggle}>
        <button
          onClick={() => { setTab("text"); setFile(null); }}
          className={`${styles.tabBtn} ${tab === "text" ? styles.tabBtnActive : ""}`}
        >
          Text Data
        </button>
        <button
          onClick={() => setTab("file")}
          className={`${styles.tabBtn} ${tab === "file" ? styles.tabBtnActive : ""}`}
        >
          File Binary
        </button>
      </div>

      {/* Main Configurations & Inputs */}
      <div className={styles.settingsPanel}>
        <span className={styles.sectionTitle}>Options & Inputs</span>

        <div className={styles.controlsRow}>
          <div className={styles.radioGroup}>
            <span className={styles.controlLabel}>Digest Output:</span>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="encoding"
                checked={encoding === "hex"}
                onChange={() => setEncoding("hex")}
              />
              <span>Hexadecimal</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="encoding"
                checked={encoding === "base64"}
                onChange={() => setEncoding("base64")}
              />
              <span>Base64</span>
            </label>
          </div>

          {encoding === "hex" && (
            <label className={styles.checkboxLabel} style={{ marginLeft: "auto" }}>
              <input
                type="checkbox"
                checked={upperCase}
                onChange={(e) => setUpperCase(e.target.checked)}
              />
              <span>Uppercase Hex</span>
            </label>
          )}
        </div>

        {tab === "text" ? (
          <div className={styles.controlGroup} style={{ marginTop: "8px" }}>
            <label className={styles.controlLabel} htmlFor="text-to-hash">Enter Text to Compute</label>
            <textarea
              id="text-to-hash"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to hash here..."
            />
          </div>
        ) : (
          <div className={styles.controlGroup} style={{ marginTop: "8px" }}>
            <span className={styles.controlLabel}>Local File Selection</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            
            {file ? (
              <div className={styles.fileInfo}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{formatBytes(file.size)}</span>
                </div>
                <button onClick={removeFile} className={styles.removeFileBtn} title="Remove File" aria-label="Remove File">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <div
                className={styles.fileDropzone}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className={styles.fileIcon} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                </svg>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Drag & Drop file here</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>or click to browse local storage</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Computed Digests Stack - Elegant list rows without outlines */}
      <div className={styles.settingsPanel}>
        <span className={styles.sectionTitle}>Computed Digests</span>
        
        {hashingFile ? (
          <div className={styles.loaderZone}>
            <span className={styles.loaderTitle}>Hashing local file data...</span>
            <span className={styles.loaderDesc}>Computations execute 100% offline inside your sandbox.</span>
          </div>
        ) : (
          <div className={styles.digestStack}>
            {[
              { id: "md5", label: "MD5", value: activeHashes.md5 },
              { id: "sha1", label: "SHA-1", value: activeHashes.sha1 },
              { id: "sha256", label: "SHA-256", value: activeHashes.sha256 },
              { id: "sha512", label: "SHA-512", value: activeHashes.sha512 },
            ].map((row) => (
              <div key={row.id} className={styles.hashRow}>
                <div className={styles.hashMeta}>
                  <span className={styles.hashLabel}>{row.label}</span>
                </div>
                <div className={styles.hashValueContainer}>
                  {row.value ? (
                    <span className={styles.hashValue}>{row.value}</span>
                  ) : (
                    <span className={styles.hashEmpty}>
                      {tab === "file" ? "No file loaded" : "No text input"}
                    </span>
                  )}
                  {row.value && (
                    <button
                      className={`${styles.copyBtn} ${copiedAlgo === row.id ? styles.copyBtnActive : ""}`}
                      onClick={() => handleCopy(row.id, row.value)}
                      title={`Copy ${row.label}`}
                    >
                      {copiedAlgo === row.id ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Comparator - Borderless organic status banner */}
      {(activeHashes.md5 || activeHashes.sha256) && (
        <div className={styles.comparatorSection}>
          <span className={styles.sectionTitle}>Checksum Matcher</span>
          <div className={styles.comparatorRow} style={{ marginTop: "8px" }}>
            <input
              type="text"
              className={styles.comparatorInput}
              value={compareInput}
              onChange={(e) => setCompareInput(e.target.value)}
              placeholder="Paste checksum digest here to run match verification..."
            />
          </div>

          {compareInput && comparatorMatch && (
            <div
              className={`${styles.resultBanner} ${
                comparatorMatch.matched ? styles.bannerMatch : styles.bannerMismatch
              }`}
            >
              {comparatorMatch.matched ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Verified Match! Pasted checksum is identical to the computed {comparatorMatch.algorithm} signature.</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Signature Mismatch! The pasted value does not match any computed digests.</span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
