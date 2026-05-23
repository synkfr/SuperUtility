"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [entropy, setEntropy] = useState(0);
  const [strengthScore, setStrengthScore] = useState(0); // 0 to 4
  const [crackTime, setCrackTime] = useState("");
  const [checks, setChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false,
  });

  const analyzePassword = () => {
    if (!password) {
      setEntropy(0);
      setStrengthScore(0);
      setCrackTime("");
      setChecks({ length: false, upper: false, lower: false, number: false, symbol: false });
      return;
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const isLong = password.length >= 12;

    const currentChecks = {
      length: isLong,
      upper: hasUpper,
      lower: hasLower,
      number: hasNumber,
      symbol: hasSymbol,
    };
    setChecks(currentChecks);

    // Calculate pool size
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 33; // Approx standard symbols count

    if (poolSize === 0) poolSize = 1;

    // Calculate Shannon entropy (H = L * log2(R))
    const bits = Math.floor(password.length * Math.log2(poolSize));
    setEntropy(bits);

    // Compute Strength Score (0 to 4)
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if ((hasLower && hasUpper) || (hasLower && hasNumber) || (hasUpper && hasNumber)) score += 1;
    if (hasSymbol) score += 1;
    setStrengthScore(Math.min(score, 4));

    // Crack time estimation based on 10 billion guesses/second (offline attack benchmark)
    const guesses = Math.pow(poolSize, password.length);
    const rate = 1e10; // 10 billion guesses per second
    const seconds = guesses / rate;

    if (seconds < 1) {
      setCrackTime("Instantaneous");
    } else if (seconds < 60) {
      setCrackTime(`${Math.round(seconds)} seconds`);
    } else if (seconds < 3600) {
      setCrackTime(`${Math.round(seconds / 60)} minutes`);
    } else if (seconds < 86400) {
      setCrackTime(`${Math.round(seconds / 3600)} hours`);
    } else if (seconds < 31536000) {
      setCrackTime(`${Math.round(seconds / 86400)} days`);
    } else if (seconds < 3153600000) {
      setCrackTime(`${Math.round(seconds / 31536000)} years`);
    } else if (seconds < 3.154e15) {
      setCrackTime(`${Math.round(seconds / 3.1536e10)} centuries`);
    } else {
      setCrackTime("Trillions of centuries");
    }
  };

  useEffect(() => {
    analyzePassword();
  }, [password]);

  const generateSuggestion = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let generated = "";
    const arr = new Uint32Array(16);
    window.crypto.getRandomValues(arr);
    for (let i = 0; i < 16; i++) {
      generated += chars[arr[i] % chars.length];
    }
    setPassword(generated);
  };

  const getStrengthLabel = () => {
    switch (strengthScore) {
      case 0: return { label: "Very Weak", color: "#ef4444" };
      case 1: return { label: "Weak", color: "#f97316" };
      case 2: return { label: "Fair", color: "#eab308" };
      case 3: return { label: "Strong", color: "#84cc16" };
      case 4: return { label: "Secure", color: "#22c55e" };
      default: return { label: "N/A", color: "var(--text-muted)" };
    }
  };

  const strength = getStrengthLabel();

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input box */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Enter Password to Test</span>
            <button onClick={generateSuggestion} className={styles.sampleBtn}>
              Suggest Strong Password
            </button>
          </div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            className={styles.input}
            style={{ fontSize: "1.1rem", fontFamily: "var(--font-mono)" }}
          />

          {password && (
            <div style={{ marginTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem", fontWeight: "700" }}>
                <span>Strength: <span style={{ color: strength.color }}>{strength.label}</span></span>
                <span>{entropy} bits of entropy</span>
              </div>
              <div style={{ width: "100%", height: "8px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${password ? (strengthScore + 1) * 20 : 0}%`,
                    backgroundColor: strength.color,
                    transition: "all var(--transition-normal)",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Breakdown criteria and metrics */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Complexity Indicators</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "18px", height: "18px", borderRadius: "50%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: checks.length ? "var(--lime-500)" : "#d1d5db" }}>
                  ✓
                </span>
                At least 12 characters long
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "18px", height: "18px", borderRadius: "50%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: checks.upper ? "var(--lime-500)" : "#d1d5db" }}>
                  ✓
                </span>
                Contains uppercase letters (A-Z)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "18px", height: "18px", borderRadius: "50%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: checks.lower ? "var(--lime-500)" : "#d1d5db" }}>
                  ✓
                </span>
                Contains lowercase letters (a-z)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "18px", height: "18px", borderRadius: "50%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: checks.number ? "var(--lime-500)" : "#d1d5db" }}>
                  ✓
                </span>
                Contains numerical digits (0-9)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "18px", height: "18px", borderRadius: "50%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: checks.symbol ? "var(--lime-500)" : "#d1d5db" }}>
                  ✓
                </span>
                Contains special symbols (!@#$%^&*)
              </span>
            </div>
          </div>

          {password && (
            <div style={{ marginTop: "12px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Estimated Offline Crack Time
              </div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--lime-700)" }}>
                {crackTime}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Calculated based on an offline attack rate of 10 billion guesses/second.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
