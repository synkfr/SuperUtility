"use client";

import React, { useState } from "react";
import styles from "./CaseConverter.module.css";

export default function CaseConverter() {
  const [text, setText] = useState("");
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

  // Case Conversion Functions
  const toUppercase = () => {
    setText(text.toUpperCase());
  };

  const toLowercase = () => {
    setText(text.toLowerCase());
  };

  const toTitleCase = () => {
    // Capitalize first letter of each word except common minor words, unless it's first
    const minorWords = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "for", "in", "of"];
    const converted = text
      .toLowerCase()
      .split(/(\s+)/)
      .map((word, index, arr) => {
        if (word.trim().length === 0) return word; // preserve whitespace
        
        const isFirstWord = index === 0;
        const isMinor = minorWords.includes(word);
        
        if (isMinor && !isFirstWord) {
          return word;
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
    
    setText(converted);
  };

  const toSentenceCase = () => {
    // Capitalize the first letter of each sentence
    const converted = text
      .toLowerCase()
      .split(/([.!?]\s+)/)
      .map((item, index, arr) => {
        // If it's a separator, just return it
        if (index % 2 === 1) return item;
        if (item.trim().length === 0) return item;
        
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join("");
    
    setText(converted);
  };

  const toCapitalizedCase = () => {
    // Capitalize the first letter of every single word
    const converted = text
      .toLowerCase()
      .split(/(\s+)/)
      .map((word) => {
        if (word.trim().length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
    
    setText(converted);
  };

  const invertCase = () => {
    const converted = text
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        }
        return char.toUpperCase();
      })
      .join("");
    
    setText(converted);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.textareaHeader}>
          <span className={styles.label}>Enter your text to convert</span>
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
          placeholder="Type or paste your text here..."
          className={styles.textarea}
          rows={10}
        />
      </div>

      {/* Button Grid of Converters */}
      <div className={styles.buttonGrid}>
        <button 
          onClick={toUppercase} 
          disabled={!text} 
          className={styles.convBtn}
          title="Convert all text to UPPERCASE"
        >
          UPPERCASE
        </button>
        <button 
          onClick={toLowercase} 
          disabled={!text} 
          className={styles.convBtn}
          title="Convert all text to lowercase"
        >
          lowercase
        </button>
        <button 
          onClick={toSentenceCase} 
          disabled={!text} 
          className={styles.convBtn}
          title="Capitalize the first letter of each sentence"
        >
          Sentence case
        </button>
        <button 
          onClick={toTitleCase} 
          disabled={!text} 
          className={styles.convBtn}
          title="Capitalize principal words (Title Case)"
        >
          Title Case
        </button>
        <button 
          onClick={toCapitalizedCase} 
          disabled={!text} 
          className={styles.convBtn}
          title="Capitalize Every Word"
        >
          Capitalize Word
        </button>
        <button 
          onClick={invertCase} 
          disabled={!text} 
          className={styles.convBtn}
          title="iNVERT tHE cASE oF eACH lETTER"
        >
          Invert Case
        </button>
      </div>
    </div>
  );
}
