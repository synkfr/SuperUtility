"use client";

import React, { useState } from "react";
import styles from "./TextRepeater.module.css";

export default function TextRepeater() {
  const [text, setText] = useState("");
  const [repeatCount, setRepeatCount] = useState(5);
  const [separator, setSeparator] = useState("newline");
  const [customSep, setCustomSep] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleClear = () => {
    setText("");
  };

  // Text repetition
  const handleRepeat = () => {
    if (!text) return;
    let sepChar = "";
    if (separator === "newline") sepChar = "\n";
    else if (separator === "space") sepChar = " ";
    else if (separator === "comma") sepChar = ", ";
    else if (separator === "custom") sepChar = customSep;

    const repeated = Array(repeatCount).fill(text).join(sepChar);
    setText(repeated);
  };

  // Remove duplicate lines
  const handleRemoveDuplicates = () => {
    if (!text) return;
    const lines = text.split("\n");
    const uniqueLines = Array.from(new Set(lines));
    setText(uniqueLines.join("\n"));
  };

  // Sort lines
  const handleSortLines = () => {
    if (!text) return;
    const lines = text.split("\n");
    
    let sorted = [...lines];
    if (sortOrder === "az") {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === "za") {
      sorted.sort((a, b) => b.localeCompare(a));
    } else if (sortOrder === "len-asc") {
      sorted.sort((a, b) => a.length - b.length);
    } else if (sortOrder === "len-desc") {
      sorted.sort((a, b) => b.length - a.length);
    }

    setText(sorted.join("\n"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.textareaHeader}>
          <span className={styles.label}>Input / Output Text Panel</span>
          <div className={styles.headerActions}>
            {text.length > 0 && (
              <>
                <button onClick={handleCopy} className={styles.actionBtn}>
                  {copySuccess ? "Copied!" : "Copy Output"}
                </button>
                <button onClick={handleClear} className={styles.clearBtn}>
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your lines of text here..."
          className={styles.textarea}
          rows={10}
        />
      </div>

      {/* Line Tools Panel Container */}
      <div className={styles.toolsPanel}>
        {/* Repeating Module */}
        <div className={styles.toolCard}>
          <h3 className={styles.toolTitle}>Text Repeater</h3>
          <div className={styles.settingRow}>
            <div className={styles.inputGroup}>
              <label className={styles.settingLabel}>Times to Repeat</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={repeatCount}
                onChange={(e) => setRepeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                className={styles.numInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.settingLabel}>Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className={styles.select}
              >
                <option value="newline">New Line (\n)</option>
                <option value="space">Space</option>
                <option value="comma">Comma (,)</option>
                <option value="custom">Custom Character</option>
              </select>
            </div>
            {separator === "custom" && (
              <div className={styles.inputGroup}>
                <label className={styles.settingLabel}>Custom text</label>
                <input
                  type="text"
                  value={customSep}
                  onChange={(e) => setCustomSep(e.target.value)}
                  placeholder="e.g. -_-"
                  className={styles.textInput}
                />
              </div>
            )}
          </div>
          <button onClick={handleRepeat} disabled={!text} className={styles.btnPrimary}>
            Repeat Text Sequence
          </button>
        </div>

        {/* Sorting & Duplicates Module */}
        <div className={styles.toolCard}>
          <h3 className={styles.toolTitle}>Sort & Filter Lines</h3>
          <div className={styles.settingRow}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <label className={styles.settingLabel}>Sort Direction</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={styles.select}
              >
                <option value="az">Alphabetical A to Z</option>
                <option value="za">Alphabetical Z to A</option>
                <option value="len-asc">Shortest to Longest</option>
                <option value="len-desc">Longest to Shortest</option>
              </select>
            </div>
          </div>
          
          <div className={styles.actionGrid}>
            <button onClick={handleSortLines} disabled={!text} className={styles.btnSecondary}>
              Sort Text Lines
            </button>
            <button onClick={handleRemoveDuplicates} disabled={!text} className={styles.btnSecondary}>
              Remove Duplicate Lines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
