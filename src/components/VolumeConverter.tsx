"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type VolumeUnit = "ml" | "l" | "cubic_m" | "tsp" | "tbsp" | "fl_oz" | "cup" | "pint" | "quart" | "gallon";

const VOLUME_UNITS: { value: VolumeUnit; label: string; rateToLiter: number }[] = [
  { value: "ml", label: "Milliliters (ml)", rateToLiter: 0.001 },
  { value: "l", label: "Liters (L)", rateToLiter: 1.0 },
  { value: "cubic_m", label: "Cubic Meters (m³)", rateToLiter: 1000.0 },
  { value: "tsp", label: "US Teaspoons (tsp)", rateToLiter: 0.00492892159375 },
  { value: "tbsp", label: "US Tablespoons (tbsp)", rateToLiter: 0.01478676478125 },
  { value: "fl_oz", label: "US Fluid Ounces (fl oz)", rateToLiter: 0.0295735295625 },
  { value: "cup", label: "US Cups", rateToLiter: 0.2365882365 },
  { value: "pint", label: "US Pints (pt)", rateToLiter: 0.473176473 },
  { value: "quart", label: "US Quarts (qt)", rateToLiter: 0.946352946 },
  { value: "gallon", label: "US Gallons (gal)", rateToLiter: 3.785411784 },
];

export default function VolumeConverter() {
  const [fromUnit, setFromUnit] = useState<VolumeUnit>("l");
  const [toUnit, setToUnit] = useState<VolumeUnit>("gallon");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = VOLUME_UNITS.find((u) => u.value === fromUnit)?.rateToLiter || 1;
    const toRate = VOLUME_UNITS.find((u) => u.value === toUnit)?.rateToLiter || 1;

    const liters = val * fromRate;
    const converted = liters / toRate;

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
  const currentFromRate = VOLUME_UNITS.find((u) => u.value === fromUnit)?.rateToLiter || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Volume Converter</span>
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
              onChange={(e) => setFromUnit(e.target.value as VolumeUnit)}
              className={styles.select}
            >
              {VOLUME_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as VolumeUnit)}
              className={styles.select}
            >
              {VOLUME_UNITS.map((u) => (
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
          {VOLUME_UNITS.map((u) => {
            const liters = valParsed * currentFromRate;
            const converted = liters / u.rateToLiter;
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
