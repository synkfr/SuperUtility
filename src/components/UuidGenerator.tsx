"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./UuidGenerator.module.css";
import pageStyles from "@/app/page.module.css";

// RFC 4122 UUID v4 Cryptographically Secure Generator
const generateUuidV4 = (): string => {
  if (typeof window !== "undefined" && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    
    // Set version to 4 (0100)
    array[6] = (array[6] & 0x0f) | 0x40;
    // Set variant to RFC 4122 (10xx)
    array[8] = (array[8] & 0x3f) | 0x80;
    
    const hex: string[] = [];
    for (let i = 0; i < 16; i++) {
      hex.push(array[i].toString(16).padStart(2, "0"));
    }
    
    return [
      hex.slice(0, 4).join(""),
      hex.slice(4, 6).join(""),
      hex.slice(6, 8).join(""),
      hex.slice(8, 10).join(""),
      hex.slice(10, 16).join("")
    ].join("-");
  }
  
  // Math.random fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// RFC 4122 UUID v1 Time-Based Generator
let clockSeq = Math.floor(Math.random() * 0x3fff);
let lastTime = 0;

const generateUuidV1 = (): string => {
  const GREGORIAN_OFFSET = 122192928000000000;
  
  let timeMs = Date.now();
  let timeNanos = timeMs * 10000 + GREGORIAN_OFFSET;
  
  if (timeNanos <= lastTime) {
    timeNanos = lastTime + 1;
  }
  lastTime = timeNanos;
  
  const timeHex = timeNanos.toString(16).padStart(15, "0");
  
  const timeLow = timeHex.slice(7, 15);
  const timeMid = timeHex.slice(3, 7);
  const timeHi = "1" + timeHex.slice(0, 3);
  
  const clockSeqHex = ((clockSeq & 0x3fff) | 0x8000).toString(16).padStart(4, "0");
  
  const node = Array.from({ length: 6 }, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
  ).join("");
  
  return `${timeLow}-${timeMid}-${timeHi}-${clockSeqHex}-${node}`;
};

export default function UuidGenerator() {
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let uuid = version === "v4" ? generateUuidV4() : generateUuidV1();
      if (!hyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      } else {
        uuid = uuid.toLowerCase();
      }
      list.push(uuid);
    }
    setUuidList(list);
  }, [version, quantity, uppercase, hyphens]);

  useEffect(() => {
    generateUuids();
  }, [generateUuids]);

  const handleCopy = async () => {
    if (uuidList.length === 0) return;
    try {
      const text = uuidList.join("\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy to clipboard failed", err);
    }
  };

  const handleDownload = () => {
    if (uuidList.length === 0) return;
    try {
      const text = uuidList.join("\n");
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `superutility-uuids-${version}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download UUIDs:", e);
    }
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.workspace}>
        {/* Left Side: Generator Configuration Panel */}
        <div className={styles.settingsPanel}>
          {/* Section: Version Specification */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Specification</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>UUID Standard Version</span>
              <div className={styles.chipGroup}>
                <button
                  className={`${styles.chip} ${version === "v4" ? styles.chipActive : ""}`}
                  onClick={() => setVersion("v4")}
                >
                  v4 (Cryptographically Random)
                </button>
                <button
                  className={`${styles.chip} ${version === "v1" ? styles.chipActive : ""}`}
                  onClick={() => setVersion("v1")}
                >
                  v1 (Timestamp & Node Network)
                </button>
              </div>
            </div>
          </div>

          {/* Section: Quantity Parameter */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Quantity Parameters</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Batch Size (Identifiers to Generate)</span>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  aria-label="UUID Quantity Slider"
                  style={{ flex: 1 }}
                />
                <span className={styles.sliderValue}>{quantity}</span>
              </div>
            </div>
          </div>

          {/* Section: Visual Formatting */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Visual Formatting</span>
            <div className={styles.optionsList}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                />
                <span>Capitalize Hex Letters (A-F)</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                />
                <span>Include Hyphen Separators (-)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generateUuids}
            className={`${styles.btn} ${styles.btnPrimary}`}
            style={{ width: "100%", marginTop: "12px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
            Generate New Set
          </button>
        </div>

        {/* Right Side: Showcase Monospace Panel */}
        <div className={styles.outputPanel}>
          <div className={styles.outputHeader}>
            <span className={styles.sectionTitle}>Generated Batch</span>
            <span className={styles.outputInfo}>{uuidList.length} identifiers ready</span>
          </div>
          <textarea
            readOnly
            className={styles.outputArea}
            value={uuidList.join("\n")}
            aria-label="UUID output textarea"
          />

          <div className={styles.actionRow}>
            <button
              onClick={handleCopy}
              className={`${styles.btn} ${copied ? styles.btnPrimary : ""}`}
            >
              {copied ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy All
                </>
              )}
            </button>
            <button onClick={handleDownload} className={styles.btn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download TXT
            </button>
          </div>
        </div>
      </div>

      {/* SEO Technical Footer */}
      <section className={pageStyles.seoSection} style={{ marginTop: "40px" }} aria-label="UUID Generator Specifications">
        <h2 className={pageStyles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>
          UUID Specifications & Collision Math
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between UUID v1 and v4?</h3>
            <p className={pageStyles.seoCardText}>
              UUID <code className={pageStyles.seoCode}>v1</code> is a time-based identifier that merges a high-resolution 60-bit Gregorian timestamp, clock sequence, and a 48-bit spatial node identifier (usually the network hardware MAC address or random equivalent). UUID <code className={pageStyles.seoCode}>v4</code> is a fully random identifier that uses cryptographically secure hardware entropy to populate 122 bits of random state. v4 is widely preferred for database primary keys because it leaks zero network or temporal metadata.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the probability of a UUID v4 collision?</h3>
            <p className={pageStyles.seoCardText}>
              UUID v4 yields 2¹²² (or approximately 5.3 × 10³⁶) possible unique states. The collision math is governed by the Birthday Paradox. To have a 50% probability of a single duplicate collision, you would need to generate **125 billion billion** (or 2.7 × 10¹⁸) identifiers. It is mathematically virtually impossible to encounter a duplicate in production systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
