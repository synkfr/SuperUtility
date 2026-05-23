"use client";

import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import styles from "./SharedStyles.module.css";

export default function HmacGenerator() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState<"sha256" | "sha512" | "sha1" | "md5">("sha256");
  const [hmacOutput, setHmacOutput] = useState("");

  const calculateHmac = () => {
    if (!message || !key) {
      setHmacOutput("");
      return;
    }

    try {
      let hash;
      if (algo === "sha256") {
        hash = CryptoJS.HmacSHA256(message, key);
      } else if (algo === "sha512") {
        hash = CryptoJS.HmacSHA512(message, key);
      } else if (algo === "sha1") {
        hash = CryptoJS.HmacSHA1(message, key);
      } else {
        hash = CryptoJS.HmacMD5(message, key);
      }
      setHmacOutput(hash.toString(CryptoJS.enc.Hex));
    } catch (err) {
      console.error(err);
      setHmacOutput("Error calculating HMAC");
    }
  };

  useEffect(() => {
    calculateHmac();
  }, [message, key, algo]);

  const handleCopy = () => {
    if (hmacOutput) {
      navigator.clipboard.writeText(hmacOutput);
    }
  };

  const handleLoadSample = () => {
    setMessage("SuperUtility keyed HMAC verification message payload.");
    setKey("secure_hmac_secret_key_2026");
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Message & Key Inputs</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Load Sample Data
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Secret Key
              </span>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter secret security key..."
                className={styles.input}
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Select Algorithm
              </span>
              <select
                value={algo}
                onChange={(e) => setAlgo(e.target.value as any)}
                className={styles.select}
              >
                <option value="sha256">HMAC-SHA256 (Recommended)</option>
                <option value="sha512">HMAC-SHA512 (High Entropy)</option>
                <option value="sha1">HMAC-SHA1 (Legacy)</option>
                <option value="md5">HMAC-MD5 (Fast / Basic)</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Input Message Payload
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message or string payload here..."
                className={styles.textarea}
              />
            </div>
          </div>
        </div>

        {/* Output box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Calculated Keyed-HMAC Digest</span>
            {hmacOutput && hmacOutput !== "Error calculating HMAC" && (
              <button onClick={handleCopy} className={styles.copyBtn}>
                Copy Hex Digest
              </button>
            )}
          </div>

          {hmacOutput ? (
            <div className={styles.resultContainer} style={{ fontSize: "0.95rem" }}>
              {hmacOutput}
            </div>
          ) : (
            <div style={{ padding: "32px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              HMAC output digest will appear here once message and key are provided.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
