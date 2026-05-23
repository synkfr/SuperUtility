"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function PercentageCalculator() {
  // Calc 1: What is X% of Y?
  const [x1, setX1] = useState("15");
  const [y1, setY1] = useState("200");
  const [res1, setRes1] = useState("");

  // Calc 2: X is what percent of Y?
  const [x2, setX2] = useState("30");
  const [y2, setY2] = useState("150");
  const [res2, setRes2] = useState("");

  // Calc 3: Percentage change from X to Y?
  const [x3, setX3] = useState("80");
  const [y3, setY3] = useState("120");
  const [res3, setRes3] = useState("");
  const [isIncrease, setIsIncrease] = useState<boolean | null>(null);

  useEffect(() => {
    const valX = parseFloat(x1);
    const valY = parseFloat(y1);
    if (!isNaN(valX) && !isNaN(valY)) {
      setRes1(((valX / 100) * valY).toFixed(2).replace(/\.00$/, ""));
    } else {
      setRes1("");
    }
  }, [x1, y1]);

  useEffect(() => {
    const valX = parseFloat(x2);
    const valY = parseFloat(y2);
    if (!isNaN(valX) && !isNaN(valY) && valY !== 0) {
      setRes2(((valX / valY) * 100).toFixed(2).replace(/\.00$/, ""));
    } else {
      setRes2("");
    }
  }, [x2, y2]);

  useEffect(() => {
    const valX = parseFloat(x3);
    const valY = parseFloat(y3);
    if (!isNaN(valX) && !isNaN(valY) && valX !== 0) {
      const diff = valY - valX;
      const change = (diff / valX) * 100;
      setRes3(Math.abs(change).toFixed(2).replace(/\.00$/, ""));
      setIsIncrease(change >= 0);
    } else {
      setRes3("");
      setIsIncrease(null);
    }
  }, [x3, y3]);

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Calc 1 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>What is X% of Y?</span>
          </div>
          <div className={styles.grid2}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Percentage (X)
              </span>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                placeholder="e.g. 15"
                className={styles.input}
              />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Value (Y)
              </span>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                placeholder="e.g. 200"
                className={styles.input}
              />
            </div>
          </div>
          {res1 && (
            <div style={{ marginTop: "12px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Calculation Result
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--lime-700)" }}>
                {x1}% of {y1} is <span style={{ textDecoration: "underline" }}>{res1}</span>
              </div>
            </div>
          )}
        </div>

        {/* Calc 2 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>X is what percent of Y?</span>
          </div>
          <div className={styles.grid2}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Value (X)
              </span>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="e.g. 30"
                className={styles.input}
              />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Total (Y)
              </span>
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                placeholder="e.g. 150"
                className={styles.input}
              />
            </div>
          </div>
          {res2 && (
            <div style={{ marginTop: "12px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Calculation Result
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--lime-700)" }}>
                {x2} is <span style={{ textDecoration: "underline" }}>{res2}%</span> of {y2}
              </div>
            </div>
          )}
        </div>

        {/* Calc 3 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Percentage Change (Increase/Decrease)</span>
          </div>
          <div className={styles.grid2}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Initial Value (X)
              </span>
              <input
                type="number"
                value={x3}
                onChange={(e) => setX3(e.target.value)}
                placeholder="e.g. 80"
                className={styles.input}
              />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Final Value (Y)
              </span>
              <input
                type="number"
                value={y3}
                onChange={(e) => setY3(e.target.value)}
                placeholder="e.g. 120"
                className={styles.input}
              />
            </div>
          </div>
          {res3 && (
            <div style={{ marginTop: "12px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Calculation Result
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--lime-700)" }}>
                Change from {x3} to {y3} is a{" "}
                <span style={{ color: isIncrease ? "var(--lime-600)" : "#ef4444" }}>
                  {res3}% {isIncrease ? "increase ↑" : "decrease ↓"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
