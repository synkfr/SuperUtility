"use client";

import React, { useState } from "react";
import styles from "./CssMinifier.module.css";

interface MinifyStats {
  originalBytes: number;
  minifiedBytes: number;
  savedBytes: number;
  ratio: string;
}

export default function CssMinifier() {
  const [inputCss, setInputCss] = useState("");
  const [minifiedCss, setMinifiedCss] = useState("");
  const [stats, setStats] = useState<MinifyStats | null>(null);

  const minifyCssCode = (css: string) => {
    if (!css.trim()) {
      setMinifiedCss("");
      setStats(null);
      return;
    }

    // Minification regex patterns
    let minified = css;
    
    // 1. Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
    
    // 2. Collapse whitespaces
    minified = minified.replace(/\s+/g, " ");
    
    // 3. Remove spaces around braces/semicolons/colons/commas
    minified = minified.replace(/\s*([\{\};:,])\s*/g, "$1");
    
    // 4. Remove final semicolons inside selectors
    minified = minified.replace(/;}/g, "}");
    
    // 5. Trim extra spaces
    minified = minified.trim();

    setMinifiedCss(minified);

    // Calculate byte stats
    const origBytes = new Blob([css]).size;
    const minBytes = new Blob([minified]).size;
    const saved = Math.max(0, origBytes - minBytes);
    const ratioVal = origBytes > 0 ? ((saved / origBytes) * 100).toFixed(1) : "0.0";

    setStats({
      originalBytes: origBytes,
      minifiedBytes: minBytes,
      savedBytes: saved,
      ratio: ratioVal,
    });
  };

  const handleMinify = () => {
    minifyCssCode(inputCss);
  };

  const handleClear = () => {
    setInputCss("");
    setMinifiedCss("");
    setStats(null);
  };

  const handleCopy = () => {
    if (minifiedCss) {
      navigator.clipboard.writeText(minifiedCss);
    }
  };

  const handleLoadSample = () => {
    setInputCss(`/* Premium Brand Stylesheet */\n.hero-card {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  background-color: #ffffff;\n  border-radius: 20px;\n  padding: 32px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);\n}\n\n.hero-card:hover {\n  transform: translateY(-2px);\n  border-color: #84cc16;\n}`);
    setMinifiedCss("");
    setStats(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input area */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Paste raw CSS styles</span>
            <div className={styles.sampleRow}>
              <button onClick={handleLoadSample} className={styles.sampleBtn}>
                Load CSS Sample
              </button>
              {inputCss && <button onClick={handleClear} className={styles.clearBtn}>Clear</button>}
            </div>
          </div>
          <textarea
            value={inputCss}
            onChange={(e) => setInputCss(e.target.value)}
            placeholder="/* Paste your CSS here... */"
            className={styles.textarea}
            rows={8}
          />
          <button onClick={handleMinify} className={styles.minifyBtn}>
            Minify CSS Stylesheet
          </button>
        </div>

        {/* Output area */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Minified CSS Code</span>
            {minifiedCss && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Minified Code
              </button>
            )}
          </div>
          <textarea
            value={minifiedCss}
            readOnly
            placeholder="Minified stylesheet will appear here..."
            className={styles.textarea}
            style={{ backgroundColor: "#fafafa", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            rows={8}
          />

          {/* Stats indicators */}
          {stats && (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Original Size</span>
                <span className={styles.statVal}>{stats.originalBytes} B</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Minified Size</span>
                <span className={styles.statVal} style={{ color: "var(--lime-600)" }}>{stats.minifiedBytes} B</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Compression Saved</span>
                <span className={styles.statVal}>{stats.savedBytes} B</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Savings Ratio</span>
                <span className={styles.statVal} style={{ color: "var(--lime-600)" }}>{stats.ratio}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
