"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type WeightUnit = "mg" | "g" | "kg" | "t" | "oz" | "lb" | "st";

const WEIGHT_UNITS: { value: WeightUnit; label: string; rateToGram: number }[] = [
  { value: "mg", label: "Milligrams (mg)", rateToGram: 0.001 },
  { value: "g", label: "Grams (g)", rateToGram: 1.0 },
  { value: "kg", label: "Kilograms (kg)", rateToGram: 1000.0 },
  { value: "t", label: "Metric Tonnes (t)", rateToGram: 1000000.0 },
  { value: "oz", label: "Ounces (oz)", rateToGram: 28.349523125 },
  { value: "lb", label: "Pounds (lb)", rateToGram: 453.59237 },
  { value: "st", label: "Stones (st)", rateToGram: 6350.29318 },
];

export default function WeightConverter() {
  const [fromUnit, setFromUnit] = useState<WeightUnit>("kg");
  const [toUnit, setToUnit] = useState<WeightUnit>("lb");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = WEIGHT_UNITS.find((u) => u.value === fromUnit)?.rateToGram || 1;
    const toRate = WEIGHT_UNITS.find((u) => u.value === toUnit)?.rateToGram || 1;

    // Convert to grams first, then to target unit
    const grams = val * fromRate;
    const converted = grams / toRate;

    setResult(
      converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      })
    );
  };

  useEffect(() => {
    handleConvert();
  }, [fromUnit, toUnit, inputValue]);

  const valParsed = parseFloat(inputValue) || 0;
  const currentFromRate = WEIGHT_UNITS.find((u) => u.value === fromUnit)?.rateToGram || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Weight & Mass Converter</span>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>Offline & Free</span>
        </div>

        <div className={styles.grid3}>
          <div>
            <label className={styles.inputLabel}>Value to Convert</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 1"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.inputLabel}>From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as WeightUnit)}
              className={styles.select}
            >
              {WEIGHT_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.inputLabel}>To Unit</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as WeightUnit)}
              className={styles.select}
            >
              {WEIGHT_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {result && (
          <div className={styles.resultContainer} style={{ marginTop: "8px" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
              Converted Value
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              {inputValue} {fromUnit} = <span style={{ color: "var(--lime-700)" }}>{result}</span> {toUnit}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>All Equivalent Measurements</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {WEIGHT_UNITS.map((u) => {
            const grams = valParsed * currentFromRate;
            const converted = grams / u.rateToGram;
            const formatted = isNaN(converted)
              ? "0"
              : converted.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 6,
                });
            return (
              <div
                key={u.value}
                style={{
                  background: "var(--bg-secondary)",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--border-dark)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                  {u.label}
                </span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  {formatted}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
