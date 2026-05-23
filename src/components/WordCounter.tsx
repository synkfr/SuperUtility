"use client";

import React, { useState } from "react";
import styles from "./WordCounter.module.css";

export default function WordCounter() {
  const [text, setText] = useState("");

  // Statistics calculations
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, "").length;

  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = wordsArray.length;

  const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  const paragraphCount = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;

  // Reading & Speaking Time estimates
  const readingTime = Math.ceil(wordCount / 200);
  const speakingTime = Math.ceil(wordCount / 130);

  // Character frequency analysis
  const getCharFrequency = () => {
    const freq: Record<string, number> = {};
    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, ""); // count alphanumeric letters only
    
    for (const char of cleanText) {
      freq[char] = (freq[char] || 0) + 1;
    }

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // top 5
  };

  const topChars = getCharFrequency();
  const maxFreq = topChars.length > 0 ? topChars[0][1] : 1;

  const handleClear = () => {
    setText("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.textareaHeader}>
          <span className={styles.label}>Type or paste your text</span>
          {text.length > 0 && (
            <button onClick={handleClear} className={styles.clearBtn}>
              Clear Text
            </button>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your text here..."
          className={styles.textarea}
          rows={10}
        />
      </div>

      {/* Stats Cards Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Words</span>
          <span className={styles.statVal}>{wordCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Characters</span>
          <span className={styles.statVal}>{charCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Char (No Spaces)</span>
          <span className={styles.statVal}>{charNoSpacesCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Sentences</span>
          <span className={styles.statVal}>{sentenceCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Paragraphs</span>
          <span className={styles.statVal}>{paragraphCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Est. Reading Time</span>
          <span className={styles.statVal}>{readingTime} {readingTime === 1 ? "min" : "mins"}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Est. Speaking Time</span>
          <span className={styles.statVal}>{speakingTime} {speakingTime === 1 ? "min" : "mins"}</span>
        </div>
      </div>

      {/* Letter Frequency Visualization */}
      {text.length > 0 && topChars.length > 0 && (
        <div className={styles.frequencyPanel}>
          <h3 className={styles.frequencyTitle}>Top Letter Frequency</h3>
          <div className={styles.barList}>
            {topChars.map(([char, count]) => {
              const pct = (count / maxFreq) * 100;
              return (
                <div key={char} className={styles.barRow}>
                  <span className={styles.barChar}>{char.toUpperCase()}</span>
                  <div className={styles.barContainer}>
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={styles.barCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
