"use client";

import React, { useState } from "react";
import styles from "./UrlBase64Converter.module.css";

type ConvertMode = "url-encode" | "url-decode" | "base64-encode" | "base64-decode";

export default function UrlBase64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ConvertMode>("url-encode");
  
  const [copySuccess, setCopySuccess] = useState(false);

  // Safe UTF-8 Base64 conversion helpers (prevents Unicode crashes in btoa/atob)
  const utf8ToBase64 = (str: string) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      return "Error: Invalid character encoding.";
    }
  };

  const base64ToUtf8 = (str: string) => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      return "Error: Invalid Base64 structure.";
    }
  };

  const handleConvert = (textToConvert = input, activeMode = mode) => {
    if (!textToConvert) {
      setOutput("");
      return;
    }

    let result = "";
    if (activeMode === "url-encode") {
      result = encodeURIComponent(textToConvert);
    } else if (activeMode === "url-decode") {
      try {
        result = decodeURIComponent(textToConvert);
      } catch (e) {
        result = "Error: Invalid URI encoding.";
      }
    } else if (activeMode === "base64-encode") {
      result = utf8ToBase64(textToConvert);
    } else if (activeMode === "base64-decode") {
      result = base64ToUtf8(textToConvert);
    }

    setOutput(result);
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    handleConvert(val, mode);
  };

  const handleModeChange = (newMode: ConvertMode) => {
    setMode(newMode);
    handleConvert(input, newMode);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleSwap = () => {
    if (!output) return;
    const oldOutput = output;
    setInput(oldOutput);
    setOutput("");
    
    // Switch encode <-> decode modes automatically on swap!
    let newMode = mode;
    if (mode === "url-encode") newMode = "url-decode";
    else if (mode === "url-decode") newMode = "url-encode";
    else if (mode === "base64-encode") newMode = "base64-decode";
    else if (mode === "base64-decode") newMode = "base64-encode";
    
    setMode(newMode);
    handleConvert(oldOutput, newMode);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className={styles.container}>
      {/* Selector Pills */}
      <div className={styles.modeTabs}>
        <button
          onClick={() => handleModeChange("url-encode")}
          className={`${styles.tabBtn} ${mode === "url-encode" ? styles.tabBtnActive : ""}`}
        >
          URL Encode
        </button>
        <button
          onClick={() => handleModeChange("url-decode")}
          className={`${styles.tabBtn} ${mode === "url-decode" ? styles.tabBtnActive : ""}`}
        >
          URL Decode
        </button>
        <button
          onClick={() => handleModeChange("base64-encode")}
          className={`${styles.tabBtn} ${mode === "base64-encode" ? styles.tabBtnActive : ""}`}
        >
          Base64 Encode
        </button>
        <button
          onClick={() => handleModeChange("base64-decode")}
          className={`${styles.tabBtn} ${mode === "base64-decode" ? styles.tabBtnActive : ""}`}
        >
          Base64 Decode
        </button>
      </div>

      {/* Side-by-side Editors */}
      <div className={styles.editorSplit}>
        {/* Input Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.label}>Input Text</span>
            {input.length > 0 && (
              <button onClick={handleClear} className={styles.clearBtn}>
                Clear
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type or paste your source text here..."
            className={styles.textarea}
            rows={10}
          />
        </div>

        {/* Action Column for Swap/Transforms */}
        {output.length > 0 && (
          <div className={styles.middleActions}>
            <button 
              onClick={handleSwap} 
              className={styles.swapBtn}
              title="Copy output to input and swap modes"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              Swap Panels
            </button>
          </div>
        )}

        {/* Output Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.label}>Converted Output</span>
            {output.length > 0 && !output.startsWith("Error:") && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Your converted output will appear here in real-time..."
            className={`${styles.textarea} ${styles.textareaReadOnly} ${output.startsWith("Error:") ? styles.textareaError : ""}`}
            rows={10}
          />
        </div>
      </div>
    </div>
  );
}
