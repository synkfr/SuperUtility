"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type AreaUnit = "sq_mm" | "sq_cm" | "sq_m" | "sq_km" | "sq_in" | "sq_ft" | "sq_yd" | "sq_mi" | "acre" | "hectare";

const AREA_UNITS: { value: AreaUnit; label: string; rateToSqMeter: number }[] = [
  { value: "sq_mm", label: "Square Millimeters (mm²)", rateToSqMeter: 0.000001 },
  { value: "sq_cm", label: "Square Centimeters (cm²)", rateToSqMeter: 0.0001 },
  { value: "sq_m", label: "Square Meters (m²)", rateToSqMeter: 1.0 },
  { value: "sq_km", label: "Square Kilometers (km²)", rateToSqMeter: 1000000.0 },
  { value: "sq_in", label: "Square Inches (in²)", rateToSqMeter: 0.00064516 },
  { value: "sq_ft", label: "Square Feet (ft²)", rateToSqMeter: 0.09290304 },
  { value: "sq_yd", label: "Square Yards (yd²)", rateToSqMeter: 0.83612736 },
  { value: "sq_mi", label: "Square Miles (mi²)", rateToSqMeter: 2589988.110336 },
  { value: "acre", label: "Acres (ac)", rateToSqMeter: 4046.8564224 },
  { value: "hectare", label: "Hectares (ha)", rateToSqMeter: 10000.0 },
];

export default function AreaConverter() {
  const [fromUnit, setFromUnit] = useState<AreaUnit>("sq_m");
  const [toUnit, setToUnit] = useState<AreaUnit>("sq_ft");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = AREA_UNITS.find((u) => u.value === fromUnit)?.rateToSqMeter || 1;
    const toRate = AREA_UNITS.find((u) => u.value === toUnit)?.rateToSqMeter || 1;

    const sqMeters = val * fromRate;
    const converted = sqMeters / toRate;

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
  const currentFromRate = AREA_UNITS.find((u) => u.value === fromUnit)?.rateToSqMeter || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Area Converter</span>
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
              onChange={(e) => setFromUnit(e.target.value as AreaUnit)}
              className={styles.select}
            >
              {AREA_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as AreaUnit)}
              className={styles.select}
            >
              {AREA_UNITS.map((u) => (
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
              {inputValue} {fromUnit.replace("_", " ")} = <span style={{ color: "var(--lime-700)" }}>{result}</span> {toUnit.replace("_", " ")}
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
          {AREA_UNITS.map((u) => {
            const sqMeters = valParsed * currentFromRate;
            const converted = sqMeters / u.rateToSqMeter;
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
