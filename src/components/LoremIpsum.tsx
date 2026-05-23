"use client";

import React, { useState, useEffect } from "react";
import styles from "./LoremIpsum.module.css";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsum() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState("");

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const generateWord = () => {
    const idx = Math.floor(Math.random() * LOREM_WORDS.length);
    return LOREM_WORDS[idx];
  };

  const generateSentence = () => {
    const length = 5 + Math.floor(Math.random() * 10); // 5 to 15 words
    const words: string[] = [];
    for (let i = 0; i < length; i++) {
      words.push(generateWord());
    }
    return capitalize(words.join(" ")) + ".";
  };

  const generateParagraph = () => {
    const length = 3 + Math.floor(Math.random() * 5); // 3 to 8 sentences
    const sentences: string[] = [];
    for (let i = 0; i < length; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  };

  const handleGenerate = () => {
    const prefix = startWithLorem ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " : "";
    let result = "";

    if (type === "paragraphs") {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        let para = generateParagraph();
        if (i === 0 && startWithLorem) {
          // pre-pend and trim duplicated "lorem ipsum" if any
          para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + para;
        }
        paras.push(para);
      }
      result = paras.join("\n\n");
    } else if (type === "sentences") {
      const sents: string[] = [];
      for (let i = 0; i < count; i++) {
        let sent = generateSentence();
        if (i === 0 && startWithLorem) {
          sent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        }
        sents.push(sent);
      }
      result = sents.join(" ");
    } else {
      const words: string[] = [];
      if (startWithLorem) {
        words.push("lorem", "ipsum", "dolor", "sit", "amet");
      }
      const wordCount = Math.max(0, count - (startWithLorem ? 5 : 0));
      for (let i = 0; i < wordCount; i++) {
        words.push(generateWord());
      }
      result = words.join(" ");
    }

    setGeneratedText(result);
  };

  // Re-generate automatically when inputs change
  useEffect(() => {
    handleGenerate();
  }, [type, count, startWithLorem]);

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Controls Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Generation Parameters</h3>
          
          {/* Output type */}
          <div className={styles.controlGroup}>
            <span className={styles.fieldLabel}>Output Type</span>
            <div className={styles.tabs}>
              <button
                onClick={() => { setType("paragraphs"); setCount(3); }}
                className={`${styles.tab} ${type === "paragraphs" ? styles.tabActive : ""}`}
              >
                Paragraphs
              </button>
              <button
                onClick={() => { setType("sentences"); setCount(5); }}
                className={`${styles.tab} ${type === "sentences" ? styles.tabActive : ""}`}
              >
                Sentences
              </button>
              <button
                onClick={() => { setType("words"); setCount(50); }}
                className={`${styles.tab} ${type === "words" ? styles.tabActive : ""}`}
              >
                Words
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div className={styles.controlGroup}>
            <span className={styles.fieldLabel}>Quantity ({count})</span>
            <input
              type="range"
              min="1"
              max={type === "words" ? 500 : 50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          {/* Standard prefix toggle */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
            />
            <span>Start with standard "Lorem ipsum"</span>
          </label>
        </div>

        {/* Output Card */}
        <div className={styles.card} style={{ flex: 2 }}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Generated Text</span>
            <div className={styles.headerActions}>
              <button onClick={handleGenerate} className={styles.regenBtn} title="Regenerate random words">
                Regenerate
              </button>
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Placeholder Text
              </button>
            </div>
          </div>
          <textarea
            value={generatedText}
            readOnly
            className={styles.textarea}
            rows={10}
            placeholder="Generated lorem ipsum text will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
