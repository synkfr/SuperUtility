"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type TempUnit = "C" | "F" | "K";

const TEMP_UNITS: { value: TempUnit; label: string }[] = [
  { value: "C", label: "Celsius (°C)" },
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "K", label: "Kelvin (K)" },
];

export default function TemperatureConverter() {
  const [fromUnit, setFromUnit] = useState<TempUnit>("C");
  const [toUnit, setToUnit] = useState<TempUnit>("F");
  const [inputValue, setInputValue] = useState("0");
  const [result, setResult] = useState("");

  const convertTemp = (value: number, from: TempUnit, to: TempUnit): number => {
    // Convert to Celsius first
    let celsius = 0;
    if (from === "C") {
      celsius = value;
    } else if (from === "F") {
      celsius = ((value - 32) * 5) / 9;
    } else if (from === "K") {
      celsius = value - 273.15;
    }

    // Convert Celsius to To Unit
    if (to === "C") return celsius;
    if (to === "F") return (celsius * 9) / 5 + 32;
    if (to === "K") return celsius + 273.15;
    return celsius;
  };

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const converted = convertTemp(val, fromUnit, toUnit);
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Temperature Converter</span>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>Offline & Free</span>
        </div>

        <div className={styles.grid3}>
          <div>
            <label className={styles.inputLabel}>Value to Convert</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 0"
              className={styles.input}
            />
          </div>
          <div>
            <label className={styles.inputLabel}>From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as TempUnit)}
              className={styles.select}
            >
              {TEMP_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as TempUnit)}
              className={styles.select}
            >
              {TEMP_UNITS.map((u) => (
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
              {inputValue}°{fromUnit} = <span style={{ color: "var(--lime-700)" }}>{result}</span>
              {toUnit === "K" ? " K" : `°${toUnit}`}
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
          {TEMP_UNITS.map((u) => {
            const converted = convertTemp(valParsed, fromUnit, u.value);
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
                  {formatted} {u.value === "K" ? "" : `°${u.value}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
