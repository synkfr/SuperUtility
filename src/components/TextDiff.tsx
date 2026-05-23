"use client";

import React, { useState } from "react";
import styles from "./SharedStyles.module.css";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  lineNum1?: number;
  lineNum2?: number;
}

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [viewMode, setViewMode] = useState<"side" | "inline">("side");
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleLoadSample = () => {
    setText1("SuperUtility is a collection of essential helper tools.\nEverything runs offline inside your browser.\nYour data is 100% secure.");
    setText2("SuperUtility is a suite of premium utility tools!\nEverything runs offline inside your secure browser sandbox.\nYour data is 100% private and protected.");
  };

  const calculateDiff = () => {
    const lines1 = text1.split(/\r?\n/);
    const lines2 = text2.split(/\r?\n/);

    const m = lines1.length;
    const n = lines2.length;

    // DP Table for LCS
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (lines1[i - 1] === lines2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtracking to find LCS path and diffs
    let i = m;
    let j = n;
    const result: DiffLine[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
        result.unshift({
          type: "unchanged",
          text: lines1[i - 1],
          lineNum1: i,
          lineNum2: j,
        });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.unshift({
          type: "added",
          text: lines2[j - 1],
          lineNum2: j,
        });
        j--;
      } else {
        result.unshift({
          type: "removed",
          text: lines1[i - 1],
          lineNum1: i,
        });
        i--;
      }
    }

    setDiffResult(result);
    setHasCalculated(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input Text A */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Original Text (A)</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Load Sample Text
            </button>
          </div>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste your original text block here..."
            className={styles.textarea}
          />
        </div>

        {/* Input Text B */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Modified Text (B)</span>
          </div>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste your modified text block here to compare..."
            className={styles.textarea}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <button onClick={calculateDiff} className={styles.btnPrimary}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Compare Text Blocks
        </button>
      </div>

      {hasCalculated && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Difference Output</span>
            <div className={styles.flexRow}>
              <button
                onClick={() => setViewMode("side")}
                className={styles.sampleBtn}
                style={{
                  backgroundColor: viewMode === "side" ? "var(--lime-200)" : "transparent",
                  borderColor: viewMode === "side" ? "var(--lime-400)" : "var(--border-dark)",
                }}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setViewMode("inline")}
                className={styles.sampleBtn}
                style={{
                  backgroundColor: viewMode === "inline" ? "var(--lime-200)" : "transparent",
                  borderColor: viewMode === "inline" ? "var(--lime-400)" : "var(--border-dark)",
                }}
              >
                Inline View
              </button>
            </div>
          </div>

          <div
            style={{
              maxHeight: "450px",
              overflowY: "auto",
              border: "1.5px solid var(--border-dark)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              backgroundColor: "#1e1e2e",
              color: "#cdd6f4",
              padding: "16px",
            }}
          >
            {viewMode === "inline" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {diffResult.map((line, idx) => {
                  let bgColor = "transparent";
                  let color = "#cdd6f4";
                  let prefix = " ";
                  if (line.type === "added") {
                    bgColor = "rgba(166, 227, 161, 0.15)";
                    color = "#a6e3a1";
                    prefix = "+";
                  } else if (line.type === "removed") {
                    bgColor = "rgba(243, 139, 168, 0.15)";
                    color = "#f38ba8";
                    prefix = "-";
                  }
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: bgColor,
                        color: color,
                        whiteSpace: "pre-wrap",
                        padding: "2px 8px",
                        borderLeft: `3px solid ${line.type === "added" ? "#a6e3a1" : line.type === "removed" ? "#f38ba8" : "transparent"}`,
                      }}
                    >
                      <span style={{ opacity: 0.4, marginRight: "12px", userSelect: "none" }}>
                        {prefix}
                      </span>
                      {line.text || " "}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Side by Side comparison grid
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Left (Original) */}
                <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid rgba(255, 255, 255, 0.1)", paddingRight: "16px" }}>
                  <div style={{ fontWeight: 800, paddingBottom: "8px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", marginBottom: "8px", color: "#b4befe", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Original</div>
                  {diffResult.map((line, idx) => {
                    if (line.type === "added") {
                      // Empty line filler on left side
                      return <div key={idx} style={{ height: "1.35rem", backgroundColor: "rgba(255, 255, 255, 0.03)", opacity: 0.1 }} />;
                    }
                    const bgColor = line.type === "removed" ? "rgba(243, 139, 168, 0.15)" : "transparent";
                    const color = line.type === "removed" ? "#f38ba8" : "#cdd6f4";
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: bgColor,
                          color: color,
                          whiteSpace: "pre-wrap",
                          padding: "2px 4px",
                          borderLeft: `2px solid ${line.type === "removed" ? "#f38ba8" : "transparent"}`,
                        }}
                      >
                        <span style={{ opacity: 0.3, display: "inline-block", width: "24px", userSelect: "none" }}>{line.lineNum1}</span>
                        {line.text || " "}
                      </div>
                    );
                  })}
                </div>

                {/* Right (Modified) */}
                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "4px" }}>
                  <div style={{ fontWeight: 800, paddingBottom: "8px", borderBottom: "1px dashed rgba(255, 255, 255, 0.2)", marginBottom: "8px", color: "#a6e3a1", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Modified</div>
                  {diffResult.map((line, idx) => {
                    if (line.type === "removed") {
                      // Empty line filler on right side
                      return <div key={idx} style={{ height: "1.35rem", backgroundColor: "rgba(255, 255, 255, 0.03)", opacity: 0.1 }} />;
                    }
                    const bgColor = line.type === "added" ? "rgba(166, 227, 161, 0.15)" : "transparent";
                    const color = line.type === "added" ? "#a6e3a1" : "#cdd6f4";
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: bgColor,
                          color: color,
                          whiteSpace: "pre-wrap",
                          padding: "2px 4px",
                          borderLeft: `2px solid ${line.type === "added" ? "#a6e3a1" : "transparent"}`,
                        }}
                      >
                        <span style={{ opacity: 0.3, display: "inline-block", width: "24px", userSelect: "none" }}>{line.lineNum2}</span>
                        {line.text || " "}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
