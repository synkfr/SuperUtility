"use client";

import React, { useState } from "react";
import styles from "./SharedStyles.module.css";

export default function RandomString() {
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [customChars, setCustomChars] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const generateStrings = () => {
    let pool = "";
    if (uppercase) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) pool += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) pool += "0123456789";
    if (symbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (customChars) pool += customChars;

    if (excludeSimilar) {
      // Remove similar character glyphs: o, 0, O, i, l, 1, I
      pool = pool.replace(/[o0Oi1lI]/g, "");
    }

    if (!pool) {
      setResults(["Please select at least one character set or provide custom characters."]);
      return;
    }

    const generated: string[] = [];
    const randomArray = new Uint32Array(length);

    for (let c = 0; c < count; c++) {
      let str = "";
      window.crypto.getRandomValues(randomArray);
      for (let i = 0; i < length; i++) {
        str += pool[randomArray[i] % pool.length];
      }
      generated.push(str);
    }

    setResults(generated);
  };

  const handleCopyAll = () => {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join("\n"));
    }
  };

  const handleCopySingle = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Settings Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Generator Configuration</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className={styles.grid2}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Number of Strings ({count})
                </span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  String Length ({length})
                </span>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className={styles.configGroup}>
              <span className={styles.fieldLabel}>Character Sets</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                  />
                  <span>Uppercase (A-Z)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={lowercase}
                    onChange={(e) => setLowercase(e.target.checked)}
                  />
                  <span>Lowercase (a-z)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={numbers}
                    onChange={(e) => setNumbers(e.target.checked)}
                  />
                  <span>Numbers (0-9)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={symbols}
                    onChange={(e) => setSymbols(e.target.checked)}
                  />
                  <span>Symbols (!@#$...)</span>
                </label>
              </div>

              <label className={styles.checkboxLabel} style={{ marginTop: "8px" }}>
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                />
                <span>Exclude Similar Characters (e.g. o, 0, O, i, l, 1, I)</span>
              </label>
            </div>

            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Additional Custom Characters
              </span>
              <input
                type="text"
                value={customChars}
                onChange={(e) => setCustomChars(e.target.value)}
                placeholder="e.g. #_=[]"
                className={styles.input}
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>
          </div>

          <button onClick={generateStrings} className={styles.btnPrimary} style={{ marginTop: "8px" }}>
            Generate Random Strings
          </button>
        </div>

        {/* Results Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Generated Output Strings</span>
            {results.length > 0 && results[0].length > 6 && (
              <button onClick={handleCopyAll} className={styles.copyBtn}>
                Copy All Strings
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxHeight: "350px",
                overflowY: "auto",
                border: "1.5px solid var(--border-dark)",
                borderRadius: "var(--radius-md)",
                padding: "12px",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              {results.map((str, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: "var(--bg-surface)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-dark)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      wordBreak: "break-all",
                      color: "var(--text-primary)",
                      paddingRight: "12px",
                    }}
                  >
                    {str}
                  </span>
                  <button
                    onClick={() => handleCopySingle(str)}
                    className={styles.sampleBtn}
                    style={{ flexShrink: 0 }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Configure your parameters and click "Generate" to construct secure random strings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
