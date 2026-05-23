"use client";

import React, { useState } from "react";
import styles from "./HtmlConverter.module.css";

export default function HtmlConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleEncode = () => {
    if (!inputText) {
      setOutputText("");
      return;
    }
    // Encode HTML Entities
    const div = document.createElement("div");
    div.textContent = inputText;
    setOutputText(div.innerHTML);
  };

  const handleDecode = () => {
    if (!inputText) {
      setOutputText("");
      return;
    }
    // Decode HTML Entities
    const div = document.createElement("div");
    div.innerHTML = inputText;
    setOutputText(div.textContent || "");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  const handleLoadSample = () => {
    setInputText(`<h1>Welcome to SuperUtility & Co.</h1>\n<p>Use code "SAVE20" & get a discount!</p>`);
    setOutputText("");
  };

  const commonEntities = [
    { char: "<", name: "Less Than", entity: "&lt;" },
    { char: ">", name: "Greater Than", entity: "&gt;" },
    { char: "&", name: "Ampersand", entity: "&amp;" },
    { char: '"', name: "Double Quote", entity: "&quot;" },
    { char: "'", name: "Single Quote", entity: "&apos;" },
    { char: "©", name: "Copyright", entity: "&copy;" },
    { char: "™", name: "Trademark", entity: "&trade;" },
    { char: " ", name: "Non-breaking Space", entity: "&nbsp;" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Input String</span>
            <div className={styles.sampleRow}>
              <button onClick={handleLoadSample} className={styles.sampleBtn}>Load HTML Sample</button>
              {inputText && <button onClick={handleClear} className={styles.clearBtn}>Clear</button>}
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className={styles.textarea}
            rows={6}
          />
          <div className={styles.actions}>
            <button onClick={handleEncode} className={styles.encodeBtn}>
              Encode to Entities
            </button>
            <button onClick={handleDecode} className={styles.decodeBtn}>
              Decode to Plain Text
            </button>
          </div>
        </div>

        {/* Output box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Converted Output</span>
            {outputText && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Output
              </button>
            )}
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder="Converted output will appear here..."
            className={styles.textarea}
            style={{ backgroundColor: "#fafafa" }}
            rows={6}
          />
        </div>
      </div>

      {/* HTML Entity reference guides */}
      <div className={styles.referenceCard}>
        <h3 className={styles.refTitle}>Standard HTML Entities Reference</h3>
        <div className={styles.grid}>
          {commonEntities.map((ent) => (
            <div key={ent.entity} className={styles.refItem}>
              <div className={styles.refCharBox}>{ent.char}</div>
              <div className={styles.refInfo}>
                <span className={styles.refName}>{ent.name}</span>
                <span className={styles.refEntity}>{ent.entity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
