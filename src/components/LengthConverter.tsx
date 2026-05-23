"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi";

const LENGTH_UNITS: { value: LengthUnit; label: string; rateToMeter: number }[] = [
  { value: "mm", label: "Millimeters (mm)", rateToMeter: 0.001 },
  { value: "cm", label: "Centimeters (cm)", rateToMeter: 0.01 },
  { value: "m", label: "Meters (m)", rateToMeter: 1.0 },
  { value: "km", label: "Kilometers (km)", rateToMeter: 1000.0 },
  { value: "in", label: "Inches (in)", rateToMeter: 0.0254 },
  { value: "ft", label: "Feet (ft)", rateToMeter: 0.3048 },
  { value: "yd", label: "Yards (yd)", rateToMeter: 0.9144 },
  { value: "mi", label: "Miles (mi)", rateToMeter: 1609.344 },
];

export default function LengthConverter() {
  const [fromUnit, setFromUnit] = useState<LengthUnit>("m");
  const [toUnit, setToUnit] = useState<LengthUnit>("ft");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = LENGTH_UNITS.find((u) => u.value === fromUnit)?.rateToMeter || 1;
    const toRate = LENGTH_UNITS.find((u) => u.value === toUnit)?.rateToMeter || 1;

    // Convert to meters first, then to target unit
    const meters = val * fromRate;
    const converted = meters / toRate;

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
  const currentFromRate = LENGTH_UNITS.find((u) => u.value === fromUnit)?.rateToMeter || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Length & Height Converter</span>
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
              onChange={(e) => setFromUnit(e.target.value as LengthUnit)}
              className={styles.select}
            >
              {LENGTH_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as LengthUnit)}
              className={styles.select}
            >
              {LENGTH_UNITS.map((u) => (
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
          {LENGTH_UNITS.map((u) => {
            const meters = valParsed * currentFromRate;
            const converted = meters / u.rateToMeter;
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
