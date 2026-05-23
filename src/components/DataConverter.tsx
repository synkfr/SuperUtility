"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

type DataUnit = "b" | "B" | "KB" | "KiB" | "MB" | "MiB" | "GB" | "GiB" | "TB" | "TiB" | "PB" | "PiB";

const DATA_UNITS: { value: DataUnit; label: string; rateToByte: number }[] = [
  { value: "b", label: "Bits (b)", rateToByte: 0.125 },
  { value: "B", label: "Bytes (B)", rateToByte: 1.0 },
  { value: "KB", label: "Kilobytes (KB, 10³)", rateToByte: 1000.0 },
  { value: "KiB", label: "Kibibytes (KiB, 2¹⁰)", rateToByte: 1024.0 },
  { value: "MB", label: "Megabytes (MB, 10⁶)", rateToByte: 1000000.0 },
  { value: "MiB", label: "Mebibytes (MiB, 2²⁰)", rateToByte: 1048576.0 },
  { value: "GB", label: "Gigabytes (GB, 10⁹)", rateToByte: 1000000000.0 },
  { value: "GiB", label: "Gibibytes (GiB, 2³⁰)", rateToByte: 1073741824.0 },
  { value: "TB", label: "Terabytes (TB, 10¹²)", rateToByte: 1000000000000.0 },
  { value: "TiB", label: "Tebibytes (TiB, 2⁴⁰)", rateToByte: 1099511627776.0 },
  { value: "PB", label: "Petabytes (PB, 10¹⁵)", rateToByte: 1000000000000000.0 },
  { value: "PiB", label: "Pebibytes (PiB, 2⁵⁰)", rateToByte: 1125899906842624.0 },
];

export default function DataConverter() {
  const [fromUnit, setFromUnit] = useState<DataUnit>("GB");
  const [toUnit, setToUnit] = useState<DataUnit>("MB");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromRate = DATA_UNITS.find((u) => u.value === fromUnit)?.rateToByte || 1;
    const toRate = DATA_UNITS.find((u) => u.value === toUnit)?.rateToByte || 1;

    const bytes = val * fromRate;
    const converted = bytes / toRate;

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
  const currentFromRate = DATA_UNITS.find((u) => u.value === fromUnit)?.rateToByte || 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Data & Storage Converter</span>
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
              onChange={(e) => setFromUnit(e.target.value as DataUnit)}
              className={styles.select}
            >
              {DATA_UNITS.map((u) => (
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
              onChange={(e) => setToUnit(e.target.value as DataUnit)}
              className={styles.select}
            >
              {DATA_UNITS.map((u) => (
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
          {DATA_UNITS.map((u) => {
            const bytes = valParsed * currentFromRate;
            const converted = bytes / u.rateToByte;
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
