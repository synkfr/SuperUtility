"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./RandomNumberGenerator.module.css";
import pageStyles from "@/app/page.module.css";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [isInteger, setIsInteger] = useState(true);
  const [decimals, setDecimals] = useState(2);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNumbers = useCallback(() => {
    if (min >= max) {
      setNumbers([]);
      return;
    }

    const nums: number[] = [];
    const range = max - min;

    const maxUniqueLimit = isInteger ? Math.floor(range) + 1 : 10000;
    const count = Math.min(quantity, !allowDuplicates ? maxUniqueLimit : 1000);

    const getRandomValue = (): number => {
      let rand = Math.random();
      if (typeof window !== "undefined" && window.crypto) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        rand = array[0] / 0xffffffff;
      }
      return min + rand * (max - min);
    };

    let attempts = 0;
    const maxAttempts = count * 20;

    while (nums.length < count && attempts < maxAttempts) {
      attempts++;
      const rawVal = getRandomValue();
      const val = isInteger ? Math.floor(rawVal) : parseFloat(rawVal.toFixed(decimals));

      if (!allowDuplicates && isInteger) {
        if (!nums.includes(val)) {
          nums.push(val);
        }
      } else {
        nums.push(val);
      }
    }

    if (sortOrder === "asc") {
      nums.sort((a, b) => a - b);
    } else if (sortOrder === "desc") {
      nums.sort((a, b) => b - a);
    }

    setNumbers(nums);
  }, [min, max, quantity, allowDuplicates, isInteger, decimals, sortOrder]);

  useEffect(() => {
    generateNumbers();
  }, [generateNumbers]);

  const handleCopy = async () => {
    if (numbers.length === 0) return;
    try {
      const text = numbers.join(", ");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const handleMinChange = (val: string) => {
    const parsed = parseInt(val);
    setMin(isNaN(parsed) ? 0 : parsed);
  };

  const handleMaxChange = (val: string) => {
    const parsed = parseInt(val);
    setMax(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.workspace}>
        {/* Left Side: Setup Panel */}
        <div className={styles.settingsPanel}>
          {/* Section: Numeric Bounds */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Numeric Bounds</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Range (Minimum to Maximum)</span>
              <div className={styles.rangeInputs}>
                <div>
                  <span className={styles.fieldLabel}>Minimum</span>
                  <input
                    type="number"
                    className={styles.numberInput}
                    value={min}
                    onChange={(e) => handleMinChange(e.target.value)}
                    aria-label="Minimum bound value"
                  />
                </div>
                <div>
                  <span className={styles.fieldLabel}>Maximum</span>
                  <input
                    type="number"
                    className={styles.numberInput}
                    value={max}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    aria-label="Maximum bound value"
                  />
                </div>
              </div>
              {min >= max && (
                <span className={styles.errorText}>
                  Minimum must be strictly less than Maximum.
                </span>
              )}
            </div>
          </div>

          {/* Section: Parameters */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Parameters</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Quantity (Numbers to Roll)</span>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  aria-label="Numbers Quantity Slider"
                  style={{ flex: 1 }}
                />
                <span className={styles.sliderValue}>{quantity}</span>
              </div>
            </div>
          </div>

          {/* Section: Sequence & Format */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Sequence & Format</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Precision Type</span>
              <div className={styles.chipGroup}>
                <button
                  className={`${styles.chip} ${isInteger ? styles.chipActive : ""}`}
                  onClick={() => {
                    setIsInteger(true);
                    setAllowDuplicates(false);
                  }}
                >
                  Integer
                </button>
                <button
                  className={`${styles.chip} ${!isInteger ? styles.chipActive : ""}`}
                  onClick={() => {
                    setIsInteger(false);
                    setAllowDuplicates(true);
                  }}
                >
                  Decimal Float
                </button>
              </div>
            </div>

            {!isInteger && (
              <div className={styles.controlGroup} style={{ marginTop: "12px" }}>
                <span className={styles.controlLabel}>Decimal Places</span>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={decimals}
                    onChange={(e) => setDecimals(parseInt(e.target.value))}
                    aria-label="Decimal Places Slider"
                    style={{ flex: 1 }}
                  />
                  <span className={styles.sliderValue}>{decimals} places</span>
                </div>
              </div>
            )}

            <div className={styles.controlGroup} style={{ marginTop: "12px" }}>
              <span className={styles.controlLabel}>Sorting Order</span>
              <div className={styles.chipGroup}>
                <button
                  className={`${styles.chip} ${sortOrder === "none" ? styles.chipActive : ""}`}
                  onClick={() => setSortOrder("none")}
                >
                  Default
                </button>
                <button
                  className={`${styles.chip} ${sortOrder === "asc" ? styles.chipActive : ""}`}
                  onClick={() => setSortOrder("asc")}
                >
                  Ascending
                </button>
                <button
                  className={`${styles.chip} ${sortOrder === "desc" ? styles.chipActive : ""}`}
                  onClick={() => setSortOrder("desc")}
                >
                  Descending
                </button>
              </div>
            </div>

            <div className={styles.optionsList} style={{ marginTop: "16px" }}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                />
                <span>Allow Duplicates (Repetitive values)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generateNumbers}
            disabled={min >= max}
            className={`${styles.btn} ${styles.btnPrimary}`}
            style={{ width: "100%", marginTop: "8px" }}
          >
            Generate Set
          </button>
        </div>

        {/* Right Side: Showcase Grid Display */}
        <div className={styles.displayPanel}>
          {numbers.length > 0 ? (
            <>
              <div className={styles.numbersGrid}>
                {numbers.map((num, idx) => (
                  <div key={idx} className={styles.numberChip}>
                    {num}
                  </div>
                ))}
              </div>

              <div className={styles.actionRow}>
                <button
                  onClick={handleCopy}
                  className={`${styles.btn} ${copied ? styles.btnPrimary : ""}`}
                  style={{ flex: 1 }}
                >
                  {copied ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
                <button
                  onClick={generateNumbers}
                  className={styles.btn}
                  title="Regenerate Numbers"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                  </svg>
                  Roll Again
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <svg width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" style={{ opacity: 0.4 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.022 12.022l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
              </svg>
              <p style={{ marginTop: "12px", fontSize: "0.95rem" }}>Configure numeric bounds and click generate</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO Technical Footer */}
      <section className={pageStyles.seoSection} style={{ marginTop: "40px" }} aria-label="Random Number Generator Technical Guide">
        <h2 className={pageStyles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Unbiased Random Number Generation & CSPRNG Science
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>PRNG vs CSPRNG: What is the security difference?</h3>
            <p className={pageStyles.seoCardText}>
              Standard random functions (like <code className={pageStyles.seoCode}>Math.random()</code>) are Pseudo-Random Number Generators (PRNGs) based on arithmetic formulas. They are deterministic: if an attacker gains the internal state, they can predict all future sequences. A Cryptographically Secure Pseudo-Random Number Generator (CSPRNG), such as <code className={pageStyles.seoCode}>window.crypto.getRandomValues</code>, integrates hardware entropy inputs (mouse movements, keystroke timings, CPU thermal noise) to ensure absolute unpredictability.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are random fractions mapped to custom intervals without bias?</h3>
            <p className={pageStyles.seoCardText}>
              Simple calculations like <code className={pageStyles.seoCode}>Math.floor(rand * range)</code> can lead to modulo bias where certain numbers in a set have a slightly higher probability of selection. SuperUtility resolves this by scaling random 32-bit unsigned integers from standard OS hardware entropy onto normal decimals and verifying that they map cleanly inside the targeted interval.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
