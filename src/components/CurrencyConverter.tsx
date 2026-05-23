"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

const DEFAULT_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.3,
  JPY: 156.4,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.91,
  CNY: 7.24,
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar ($)",
  EUR: "Euro (€)",
  GBP: "British Pound (£)",
  INR: "Indian Rupee (₹)",
  JPY: "Japanese Yen (¥)",
  CAD: "Canadian Dollar ($)",
  AUD: "Australian Dollar ($)",
  CHF: "Swiss Franc (CHF)",
  CNY: "Chinese Yuan (¥)",
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
  const [customRate, setCustomRate] = useState("");
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [result, setResult] = useState(0);

  const calculateConversion = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setResult(0);
      return;
    }

    if (useCustomRate) {
      const cRate = parseFloat(customRate);
      if (!isNaN(cRate) && cRate > 0) {
        setResult(amt * cRate);
        return;
      }
    }

    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];

    if (rateFrom && rateTo) {
      // Convert to USD base first, then to target currency
      const amtInUSD = amt / rateFrom;
      const converted = amtInUSD * rateTo;
      setResult(converted);
    }
  };

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency, rates, customRate, useCustomRate]);

  // Update custom rate helper text when currencies change
  useEffect(() => {
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    if (rateFrom && rateTo) {
      const standardRate = rateTo / rateFrom;
      setCustomRate(standardRate.toFixed(4));
    }
  }, [fromCurrency, toCurrency]);

  const handleRateChange = (currency: string, value: string) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0) {
      setRates((prev) => ({
        ...prev,
        [currency]: parsed,
      }));
    }
  };

  const handleResetRates = () => {
    setRates(DEFAULT_RATES);
    setUseCustomRate(false);
  };

  const activeRate = useCustomRate
    ? parseFloat(customRate) || 0
    : rates[toCurrency] / rates[fromCurrency];

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Converter Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Conversion Settings</span>
            <button onClick={handleResetRates} className={styles.sampleBtn}>
              Reset Custom Rates
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Amount to Convert
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 100"
                className={styles.input}
                style={{ fontSize: "1.1rem", fontWeight: "700" }}
              />
            </div>

            <div className={styles.grid2}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  From Currency
                </span>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className={styles.select}
                >
                  {Object.keys(rates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} - {CURRENCY_NAMES[cur]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  To Currency
                </span>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className={styles.select}
                >
                  {Object.keys(rates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} - {CURRENCY_NAMES[cur]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={useCustomRate}
                  onChange={(e) => setUseCustomRate(e.target.checked)}
                />
                <span>Use Custom Conversion Rate</span>
              </label>
              {useCustomRate && (
                <div style={{ marginTop: "10px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    1 {fromCurrency} equals how many {toCurrency}?
                  </span>
                  <input
                    type="number"
                    step="0.0001"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    className={styles.input}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Conversion Result</span>
          </div>

          {result > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "20px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                  {amount} {fromCurrency} is equal to
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--lime-700)", wordBreak: "break-all" }}>
                  {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {toCurrency}
                </div>
              </div>

              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600, display: "flex", justifyContent: "space-between", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
                <span>Applied Conversion Rate:</span>
                <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  1 {fromCurrency} = {activeRate.toFixed(6)} {toCurrency}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Conversion amounts will appear here after setting a valid quantity.
            </div>
          )}
        </div>
      </div>

      {/* Manual Rates Table Card */}
      {!useCustomRate && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Configure Offline Base Exchange Rates (Relative to 1.00 USD)</span>
          </div>
          <div className={styles.grid2} style={{ gap: "16px" }}>
            {Object.keys(rates).map((cur) => (
              <div key={cur} style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  {cur} ({CURRENCY_NAMES[cur].split(" ")[0]})
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={rates[cur]}
                  onChange={(e) => handleRateChange(cur, e.target.value)}
                  className={styles.input}
                  style={{ width: "120px", padding: "6px 10px", fontSize: "0.85rem", textAlign: "right" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
