"use client";

import React, { useState, useEffect } from "react";
import styles from "./SlugGenerator.module.css";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", 
  "into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the", 
  "their", "then", "there", "these", "they", "this", "to", "was", "will", "with"
]);

export default function SlugGenerator() {
  const [inputTitle, setInputTitle] = useState("");
  const [slugOutput, setSlugOutput] = useState("");
  
  // Customization states
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [separator, setSeparator] = useState<"-" | "_">("-");

  const generateSlug = () => {
    if (!inputTitle.trim()) {
      setSlugOutput("");
      return;
    }

    let processed = inputTitle;

    if (lowercase) {
      processed = processed.toLowerCase();
    }

    // Strip out non-alphanumeric characters, leaving spaces and separators
    processed = processed.replace(/[^a-zA-Z0-9\s-_]/g, "");

    // Split words by whitespace
    let words = processed.split(/\s+/).filter(Boolean);

    // Remove stop words if toggled
    if (removeStopWords) {
      words = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
    }

    // Combine using separator
    const result = words.join(separator);
    setSlugOutput(result);
  };

  useEffect(() => {
    generateSlug();
  }, [inputTitle, lowercase, removeStopWords, separator]);

  const handleCopy = () => {
    if (slugOutput) {
      navigator.clipboard.writeText(slugOutput);
    }
  };

  const handleLoadSample = () => {
    setInputTitle("High-Impact SEO & Content Optimization for 2026!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Input Title / Text</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Load Sample Text
            </button>
          </div>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Type your article title or page header..."
            className={styles.input}
          />

          {/* Config options */}
          <div className={styles.configGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              <span>Convert to Lowercase</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={(e) => setRemoveStopWords(e.target.checked)}
              />
              <span>Remove Common Stop Words (e.g., "the", "and")</span>
            </label>

            {/* Separator type */}
            <div className={styles.radioGroup}>
              <span className={styles.fieldLabel}>Word Separator</span>
              <div className={styles.radioRow}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="separator"
                    checked={separator === "-"}
                    onChange={() => setSeparator("-")}
                  />
                  <span>Hyphen (-)</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="separator"
                    checked={separator === "_"}
                    onChange={() => setSeparator("_")}
                  />
                  <span>Underscore (_)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Output box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Generated Slug Link</span>
            {slugOutput && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Slug URL
              </button>
            )}
          </div>
          <input
            type="text"
            value={slugOutput}
            readOnly
            className={styles.slugDisplay}
            placeholder="slug-will-appear-here"
          />
        </div>
      </div>
    </div>
  );
}
