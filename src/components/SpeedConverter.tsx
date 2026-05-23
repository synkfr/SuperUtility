"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type SpeedUnit = "m_s" | "km_h" | "mph" | "knots" | "mach";

const SPEED_UNITS: { value: SpeedUnit; label: string; rateToMs: number }[] = [
  { value: "m_s", label: "Meters per second (m/s)", rateToMs: 1.0 },
  { value: "km_h", label: "Kilometers per hour (km/h)", rateToMs: 0.27777777777778 },
  { value: "mph", label: "Miles per hour (mph)", rateToMs: 0.44704 },
  { value: "knots", label: "Knots (kt)", rateToMs: 0.51444444444444 },
  { value: "mach", label: "Mach (speed of sound)", rateToMs: 340.29 },
];

export default function SpeedConverter() {
  const [fromUnit, setFromUnit] = useState<SpeedUnit>("km_h");
  const [toUnit, setToUnit] = useState<SpeedUnit>("mph");
  const [inputValue, setInputValue] = useState("100");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = SPEED_UNITS.find((u) => u.value === fromUnit)?.rateToMs || 1;
    const toRate = SPEED_UNITS.find((u) => u.value === toUnit)?.rateToMs || 1;

    const ms = val * fromRate;
    const converted = ms / toRate;

    setResult(
      converted.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      })
    );
  };

  useEffect(() => {
    handleConvert();
  }, [fromUnit, toUnit, inputValue]);

  const valParsed = parseFloat(inputValue) || 0;
  const currentFromRate = SPEED_UNITS.find((u) => u.value === fromUnit)?.rateToMs || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Speed & Velocity Converter</span>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>Offline & Free</span>
        </div>

        <div className={styles.grid3}>
          <div>
            <label className={styles.inputLabel}>Value to Convert</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 100"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.inputLabel}>From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as SpeedUnit)}
              className={styles.select}
            >
              {SPEED_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as SpeedUnit)}
              className={styles.select}
            >
              {SPEED_UNITS.map((u) => (
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
              {inputValue} {fromUnit.replace("_", "/")} = <span style={{ color: "var(--lime-700)" }}>{result}</span> {toUnit.replace("_", "/")}
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
          {SPEED_UNITS.map((u) => {
            const ms = valParsed * currentFromRate;
            const converted = ms / u.rateToMs;
            const formatted = isNaN(converted)
              ? "0"
              : converted.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 4,
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
