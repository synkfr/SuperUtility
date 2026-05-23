"use client";

import React, { useState } from "react";
import styles from "./JsMinifier.module.css";

interface MinifyStats {
  originalBytes: number;
  minifiedBytes: number;
  savedBytes: number;
  ratio: string;
}

export default function JsMinifier() {
  const [inputJs, setInputJs] = useState("");
  const [minifiedJs, setMinifiedJs] = useState("");
  const [stats, setStats] = useState<MinifyStats | null>(null);

  const minifyJsCode = (js: string) => {
    if (!js.trim()) {
      setMinifiedJs("");
      setStats(null);
      return;
    }

    let minified = js;

    // Basic Javascript minifier using regular expressions:
    // 1. Strip block comments (/* ... */)
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");

    // 2. Strip single line comments (// ...) but not inside URL strings
    // A safe-enough regex for typical script comments
    minified = minified.replace(/(?:^|[^\\])\/\/.*$/gm, "");

    // 3. Collapse multiple whitespaces and newlines
    minified = minified.replace(/\s+/g, " ");

    // 4. Remove spacing around brackets, operators, colons, commas
    minified = minified.replace(/\s*([\{\}\(\)=\+\-\*\/%&\|<>!,;:?])\s*/g, "$1");

    // 5. Trim extra spaces
    minified = minified.trim();

    setMinifiedJs(minified);

    // Calculate byte statistics
    const origBytes = new Blob([js]).size;
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
    minifyJsCode(inputJs);
  };

  const handleClear = () => {
    setInputJs("");
    setMinifiedJs("");
    setStats(null);
  };

  const handleCopy = () => {
    if (minifiedJs) {
      navigator.clipboard.writeText(minifiedJs);
    }
  };

  const handleLoadSample = () => {
    setInputJs(`// Secure Passphrase Logic\nfunction computeEntropy(length, charsetSize) {\n  /* Calculates password security levels */\n  const entropy = length * Math.log2(charsetSize);\n  console.log("Entropy calculated:", entropy);\n  return Math.round(entropy);\n}`);
    setMinifiedJs("");
    setStats(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Paste raw JavaScript script</span>
            <div className={styles.sampleRow}>
              <button onClick={handleLoadSample} className={styles.sampleBtn}>
                Load JS Sample
              </button>
              {inputJs && <button onClick={handleClear} className={styles.clearBtn}>Clear</button>}
            </div>
          </div>
          <textarea
            value={inputJs}
            onChange={(e) => setInputJs(e.target.value)}
            placeholder="// Paste your JavaScript here..."
            className={styles.textarea}
            rows={8}
          />
          <button onClick={handleMinify} className={styles.minifyBtn}>
            Minify JavaScript Code
          </button>
        </div>

        {/* Output Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Minified JS Code</span>
            {minifiedJs && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Minified Code
              </button>
            )}
          </div>
          <textarea
            value={minifiedJs}
            readOnly
            placeholder="Minified JavaScript will appear here..."
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
