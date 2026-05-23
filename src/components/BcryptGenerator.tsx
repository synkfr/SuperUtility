"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import styles from "./SharedStyles.module.css";

export default function BcryptGenerator() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"hash" | "verify">("hash");

  // Hash Tab state
  const [inputString, setInputString] = useState("");
  const [saltRounds, setSaltRounds] = useState(10);
  const [hashedOutput, setHashedOutput] = useState("");
  const [isHashing, setIsHashing] = useState(false);

  // Verify Tab state
  const [verifyString, setVerifyString] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const handleGenerateHash = () => {
    if (!inputString) return;
    setIsHashing(true);
    // Use setTimeout to allow UI thread to update to showing "Hashing..."
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(inputString, salt);
        setHashedOutput(hash);
      } catch (err) {
        console.error(err);
      } finally {
        setIsHashing(false);
      }
    }, 50);
  };

  const handleVerifyHash = () => {
    if (!verifyString || !verifyHash) return;
    try {
      const match = bcrypt.compareSync(verifyString, verifyHash);
      setVerificationResult(match);
    } catch (err) {
      console.error(err);
      setVerificationResult(false);
    }
  };

  const handleCopy = () => {
    if (hashedOutput) {
      navigator.clipboard.writeText(hashedOutput);
    }
  };

  const handleLoadSample = () => {
    if (activeTab === "hash") {
      setInputString("SuperUtilitySecurePass123!");
    } else {
      setVerifyString("SuperUtilitySecurePass123!");
      setVerifyHash("$2a$10$7zB35K6x013V7XQeZfH5NulFzNqVv3r3v.Yn3u7C6s2j5K4D8g9S."); // dummy valid length hash format
    }
  };

  return (
    <div className={styles.container}>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1.5px solid var(--border-dark)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveTab("hash")}
          className={styles.sampleBtn}
          style={{
            backgroundColor: activeTab === "hash" ? "var(--lime-200)" : "transparent",
            borderColor: activeTab === "hash" ? "var(--lime-400)" : "var(--border-dark)",
            fontSize: "0.85rem",
            padding: "8px 16px",
          }}
        >
          Bcrypt Hash Generator
        </button>
        <button
          onClick={() => setActiveTab("verify")}
          className={styles.sampleBtn}
          style={{
            backgroundColor: activeTab === "verify" ? "var(--lime-200)" : "transparent",
            borderColor: activeTab === "verify" ? "var(--lime-400)" : "var(--border-dark)",
            fontSize: "0.85rem",
            padding: "8px 16px",
          }}
        >
          Bcrypt Hash Verifier
        </button>
      </div>

      <div className={styles.workspace}>
        {activeTab === "hash" ? (
          <>
            {/* Hash Input & Slider Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Plain Text Input</span>
                <button onClick={handleLoadSample} className={styles.sampleBtn}>
                  Load Sample Text
                </button>
              </div>
              <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Enter string to hash..."
                className={styles.input}
                style={{ fontFamily: "var(--font-mono)" }}
              />

              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem", fontWeight: "700" }}>
                  <span>Salt Rounds (Work Factor): <span style={{ color: "var(--lime-700)" }}>{saltRounds}</span></span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="15"
                  value={saltRounds}
                  onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                  style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  <span>4 (Fastest)</span>
                  <span>10 (Default)</span>
                  <span>15 (Slow / High Security)</span>
                </div>
              </div>

              <button
                onClick={handleGenerateHash}
                disabled={!inputString || isHashing}
                className={styles.btnPrimary}
                style={{ marginTop: "12px" }}
              >
                {isHashing ? "Hashing..." : "Generate Bcrypt Hash"}
              </button>
            </div>

            {/* Hash Output Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Generated Bcrypt Hash</span>
                {hashedOutput && (
                  <button onClick={handleCopy} className={styles.copyBtn}>
                    Copy Hash
                  </button>
                )}
              </div>
              {hashedOutput ? (
                <div className={styles.resultContainer} style={{ fontSize: "0.95rem" }}>
                  {hashedOutput}
                </div>
              ) : (
                <div style={{ padding: "16px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Hash will appear here...
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Verify Form Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Verification Credentials</span>
                <button onClick={handleLoadSample} className={styles.sampleBtn}>
                  Load Sample Credentials
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Plain Text Password
                  </span>
                  <input
                    type="text"
                    value={verifyString}
                    onChange={(e) => setVerifyString(e.target.value)}
                    placeholder="Enter plain text password..."
                    className={styles.input}
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Bcrypt Hash to Compare
                  </span>
                  <input
                    type="text"
                    value={verifyHash}
                    onChange={(e) => setVerifyHash(e.target.value)}
                    placeholder="e.g. $2a$10$..."
                    className={styles.input}
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>

              <button
                onClick={handleVerifyHash}
                disabled={!verifyString || !verifyHash}
                className={styles.btnPrimary}
                style={{ marginTop: "12px" }}
              >
                Verify Passwords Match
              </button>
            </div>

            {/* Verify Status Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Verification Status</span>
              </div>

              {verificationResult !== null ? (
                <div
                  style={{
                    padding: "24px",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    border: `1.5px solid ${verificationResult ? "var(--lime-400)" : "#ef4444"}`,
                    backgroundColor: verificationResult ? "var(--lime-50)" : "#fef2f2",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2.2rem",
                      lineHeight: 1,
                      color: verificationResult ? "var(--lime-600)" : "#ef4444",
                    }}
                  >
                    {verificationResult ? "✓" : "✗"}
                  </span>
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: verificationResult ? "var(--lime-700)" : "#ef4444",
                    }}
                  >
                    {verificationResult ? "Passwords Match!" : "Passwords Do Not Match"}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textAlign: "center" }}>
                    {verificationResult
                      ? "The plain text passwords correctly matches the Bcrypt Work Factor hash structure."
                      : "The plain text password does not correspond to the provided hash representation."}
                  </span>
                </div>
              ) : (
                <div style={{ padding: "32px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Verification results will appear here after calculation.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
