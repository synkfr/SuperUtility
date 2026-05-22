"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./PasswordGenerator.module.css";

const WORD_LIST = [
  "apple", "banana", "cherry", "dragon", "eagle", "forest", "gravity", "harbor", "island", "jungle",
  "knight", "lemon", "mountain", "ocean", "planet", "river", "shadow", "tiger", "valley", "winter",
  "wizard", "alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india",
  "juliet", "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", "romeo", "sierra",
  "tango", "uniform", "victor", "whiskey", "xray", "yankee", "zulu", "anchor", "beacon", "canyon",
  "desert", "emerald", "feather", "glacier", "horizon", "ivory", "journey", "keyhole", "lantern",
  "meadow", "nomad", "oasis", "pebble", "quartz", "runway", "safari", "timber", "utopia", "vortex",
  "wildlife", "xenon", "yacht", "zephyr", "breeze", "crystal", "dome", "flame", "galaxy", "haven",
  "index", "jolt", "lunar", "matrix", "nebula", "orbit", "pulse", "quantum", "radar", "solar",
  "tundra", "vertex", "warp", "zenith"
];

export default function PasswordGenerator() {
  const [mode, setMode] = useState<"password" | "passphrase">("password");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Password Settings
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  // Passphrase Settings
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);

  // Strong random picker helper
  const getRandomSecureIndex = (max: number): number => {
    if (typeof window !== "undefined" && window.crypto) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  const generatePassword = useCallback(() => {
    if (mode === "passphrase") {
      const selectedWords: string[] = [];
      for (let i = 0; i < wordCount; i++) {
        const idx = getRandomSecureIndex(WORD_LIST.length);
        let word = WORD_LIST[idx];
        if (capitalize) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        selectedWords.push(word);
      }
      setPassword(selectedWords.join(separator));
      return;
    }

    // Standard Password Generation
    let lowercasePool = "abcdefghijklmnopqrstuvwxyz";
    let uppercasePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbersPool = "0123456789";
    let symbolsPool = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

    if (excludeSimilar) {
      const similar = ["i", "l", "1", "L", "o", "0", "O", "I"];
      lowercasePool = lowercasePool.split("").filter(c => !similar.includes(c)).join("");
      uppercasePool = uppercasePool.split("").filter(c => !similar.includes(c)).join("");
      numbersPool = numbersPool.split("").filter(c => !similar.includes(c)).join("");
      symbolsPool = symbolsPool.split("").filter(c => !similar.includes(c)).join("");
    }

    if (excludeAmbiguous) {
      const ambiguous = ["{", "}", "[", "]", "(", ")", "/", "\\", "'", "\"", "~", ",", ";", ":", ".", "<", ">"];
      symbolsPool = symbolsPool.split("").filter(c => !ambiguous.includes(c)).join("");
    }

    let charPool = "";
    if (includeLowercase) charPool += lowercasePool;
    if (includeUppercase) charPool += uppercasePool;
    if (includeNumbers) charPool += numbersPool;
    if (includeSymbols) charPool += symbolsPool;

    if (!charPool) {
      setPassword("");
      return;
    }

    // Cryptographically secure generation
    let generated = "";
    if (typeof window !== "undefined" && window.crypto) {
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        generated += charPool[array[i] % charPool.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        generated += charPool[Math.floor(Math.random() * charPool.length)];
      }
    }
    setPassword(generated);
  }, [
    mode,
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    excludeAmbiguous,
    wordCount,
    separator,
    capitalize,
  ]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const getStrengthMetrics = () => {
    if (!password) return { score: 0, label: "Empty", class: "" };

    let entropy = 0;
    if (mode === "passphrase") {
      entropy = wordCount * Math.log2(WORD_LIST.length);
    } else {
      let poolSize = 0;
      if (includeLowercase) poolSize += 26;
      if (includeUppercase) poolSize += 26;
      if (includeNumbers) poolSize += 10;
      if (includeSymbols) poolSize += 30;

      if (excludeSimilar) poolSize -= 8;
      if (excludeAmbiguous) poolSize -= 10;

      if (poolSize > 0) {
        entropy = length * Math.log2(poolSize);
      }
    }

    if (entropy < 32) {
      return { score: 1, label: "Weak", class: styles.strengthWeak };
    } else if (entropy < 56) {
      return { score: 2, label: "Medium", class: styles.strengthMedium };
    } else if (entropy < 80) {
      return { score: 3, label: "Strong", class: styles.strengthStrong };
    } else {
      return { score: 4, label: "Excellent", class: styles.strengthExcellent };
    }
  };

  const strength = getStrengthMetrics();

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.modeToggle}>
        <button
          onClick={() => setMode("password")}
          className={`${styles.modeBtn} ${mode === "password" ? styles.modeBtnActive : ""}`}
        >
          Password
        </button>
        <button
          onClick={() => setMode("passphrase")}
          className={`${styles.modeBtn} ${mode === "passphrase" ? styles.modeBtnActive : ""}`}
        >
          Passphrase
        </button>
      </div>

      {/* Output Display */}
      <div className={styles.outputSection}>
        {password ? (
          <span className={styles.passwordText}>{password}</span>
        ) : (
          <span className={styles.passwordPlaceholder}>Please select at least one character type</span>
        )}
        <div className={styles.actionButtons}>
          <button
            onClick={handleCopy}
            className={`${styles.iconBtn} ${copied ? styles.iconBtnActive : ""}`}
            title="Copy Password"
            aria-label="Copy Password"
          >
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
          <button
            onClick={generatePassword}
            className={styles.iconBtn}
            title="Regenerate"
            aria-label="Regenerate Password"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className={styles.strengthContainer}>
        <div className={styles.strengthHeader}>
          <span>Security Rating</span>
          <span className={styles.strengthLabel}>{strength.label}</span>
        </div>
        <div className={styles.strengthBarContainer}>
          {[1, 2, 3, 4].map((seg) => (
            <div
              key={seg}
              className={`${styles.strengthSegment} ${
                strength.score >= seg ? strength.class : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Settings Panel - Elegantly unified, no blocky box cards */}
      <div className={styles.settingsPanel}>
        {mode === "password" ? (
          <div className={styles.settingsLayout}>
            {/* Section 1: Length */}
            <div className={styles.section}>
              <span className={styles.sectionTitle}>Password Length</span>
              <div className={styles.controlGroup}>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="6"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    aria-label="Password Length Slider"
                    style={{ flex: 1 }}
                  />
                  <span className={styles.sliderValue}>{length}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Character Pool Options */}
            <div className={styles.section}>
              <span className={styles.sectionTitle}>Include Characters</span>
              <div className={styles.optionsList}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />
                  <span>Lowercase (a-z)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                  <span>Uppercase (A-Z)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />
                  <span>Numbers (0-9)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />
                  <span>Symbols (!@#$%^&*)</span>
                </label>
              </div>
            </div>

            {/* Section 3: Cleanliness & Exclusion Filters */}
            <div className={styles.sectionFull}>
              <span className={styles.sectionTitle}>Exclusions & Cleanliness</span>
              <div className={styles.exclusionsGrid}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                  />
                  <span>Exclude Similar Characters (e.g. i, l, 1, L, o, 0, O)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  />
                  <span>Exclude Ambiguous Symbols (e.g. &#123; &#125; [ ] ( ) / \ &quot; ~ , ; :)</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.settingsLayout}>
            {/* Section 1: Size & Separators */}
            <div className={styles.section}>
              <span className={styles.sectionTitle}>Word Count</span>
              <div className={styles.controlGroup}>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                    aria-label="Passphrase Word Count Slider"
                    style={{ flex: 1 }}
                  />
                  <span className={styles.sliderValue}>{wordCount}</span>
                </div>
              </div>

              <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                <label className={styles.selectLabel} htmlFor="separator-select">Separator Symbol</label>
                <select
                  id="separator-select"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="-">Dash (-)</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Dot (.)</option>
                  <option value=" ">Space ( )</option>
                  <option value="">None (Concatenated)</option>
                </select>
              </div>
            </div>

            {/* Section 2: Formatting */}
            <div className={styles.section}>
              <span className={styles.sectionTitle}>Formatting</span>
              <div className={styles.optionsList}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={capitalize}
                    onChange={(e) => setCapitalize(e.target.checked)}
                  />
                  <span>Capitalize Each Word</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
