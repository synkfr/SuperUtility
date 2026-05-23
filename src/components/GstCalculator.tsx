"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function GstCalculator() {
  const [amount, setAmount] = useState("10000");
  const [gstRate, setGstRate] = useState("18");
  const [customRate, setCustomRate] = useState("");
  const [isInclusive, setIsInclusive] = useState(false); // Exclusive by default

  const [netAmount, setNetAmount] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);

  const calculateGst = () => {
    const amt = parseFloat(amount);
    let rate = parseFloat(gstRate === "custom" ? customRate : gstRate);

    if (isNaN(amt) || isNaN(rate) || amt <= 0 || rate < 0) {
      setNetAmount(0);
      setGstAmount(0);
      setGrossAmount(0);
      return;
    }

    let calculatedNet = 0;
    let calculatedGst = 0;
    let calculatedGross = 0;

    if (isInclusive) {
      // Inclusive: Gross = amt, Net = amt / (1 + rate/100)
      calculatedGross = amt;
      calculatedNet = amt / (1 + rate / 100);
      calculatedGst = calculatedGross - calculatedNet;
    } else {
      // Exclusive: Net = amt, Gross = amt * (1 + rate/100)
      calculatedNet = amt;
      calculatedGst = (amt * rate) / 100;
      calculatedGross = calculatedNet + calculatedGst;
    }

    setNetAmount(calculatedNet);
    setGstAmount(calculatedGst);
    setGrossAmount(calculatedGross);
  };

  useEffect(() => {
    calculateGst();
  }, [amount, gstRate, customRate, isInclusive]);

  const handleCopy = (val: number) => {
    navigator.clipboard.writeText(Math.round(val).toString());
  };

  const handleLoadSample = () => {
    setAmount("50000");
    setGstRate("18");
    setIsInclusive(false);
  };

  const activeRate = gstRate === "custom" ? parseFloat(customRate) || 0 : parseFloat(gstRate);

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Settings Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>GST Calculation Parameters</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Load Sample Amount
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Base Amount (₹)
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10000"
                className={styles.input}
              />
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                GST Tax Slab Slabs
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {["3", "5", "12", "18", "28", "custom"].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={styles.sampleBtn}
                    style={{
                      backgroundColor: gstRate === rate ? "var(--lime-200)" : "transparent",
                      borderColor: gstRate === rate ? "var(--lime-400)" : "var(--border-dark)",
                      fontSize: "0.8rem",
                      padding: "8px 0",
                    }}
                  >
                    {rate === "custom" ? "Custom" : `${rate}%`}
                  </button>
                ))}
              </div>
            </div>

            {gstRate === "custom" && (
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Custom Tax Rate (%)
                </span>
                <input
                  type="number"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="e.g. 15"
                  className={styles.input}
                />
              </div>
            )}

            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Calculation Direction Mode
              </span>
              <div style={{ display: "flex", gap: "16px" }}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="direction"
                    checked={!isInclusive}
                    onChange={() => setIsInclusive(false)}
                  />
                  <span>Add GST (Exclusive)</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="direction"
                    checked={isInclusive}
                    onChange={() => setIsInclusive(true)}
                  />
                  <span>Remove GST (Inclusive)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Tax Breakdown Details</span>
          </div>

          {grossAmount > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Net Amount (Exclusive)
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>₹{Math.round(netAmount).toLocaleString()}</span>
                    <button onClick={() => handleCopy(netAmount)} className={styles.sampleBtn} style={{ fontSize: "0.65rem", padding: "2px 4px" }}>Copy</button>
                  </div>
                </div>

                <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Total GST Tax ({activeRate}%)
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>₹{Math.round(gstAmount).toLocaleString()}</span>
                    <button onClick={() => handleCopy(gstAmount)} className={styles.sampleBtn} style={{ fontSize: "0.65rem", padding: "2px 4px" }}>Copy</button>
                  </div>
                </div>
              </div>

              {/* CGST / SGST split details (crucial for India tax context) */}
              <div style={{ borderTop: "1px dashed var(--border-dark)", borderBottom: "1px dashed var(--border-dark)", padding: "10px 0" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Intra-State GST Splits (CGST + SGST)
                </span>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  <span>CGST ({activeRate / 2}%)</span>
                  <span>₹{Math.round(gstAmount / 2).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "4px" }}>
                  <span>SGST ({activeRate / 2}%)</span>
                  <span>₹{Math.round(gstAmount / 2).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "10px", borderTop: "1px solid var(--border)", paddingTop: "6px" }}>
                  <span>Inter-State IGST ({activeRate}%)</span>
                  <span>₹{Math.round(gstAmount).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ padding: "16px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Total Gross Amount (Inclusive)
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--lime-700)", marginTop: "4px" }}>
                    ₹{Math.round(grossAmount).toLocaleString()}
                  </div>
                </div>
                <button onClick={() => handleCopy(grossAmount)} className={styles.copyBtn}>Copy Total</button>
              </div>
            </div>
          ) : (
            <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Calculation details will update as soon as base values are declared.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
