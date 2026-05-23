"use client";

import React, { useState, useEffect } from "react";
import styles from "./TimestampConverter.module.css";

export default function TimestampConverter() {
  // Live ticking state
  const [now, setNow] = useState(new Date());
  
  // Epoch to Date conversion states
  const [inputEpoch, setInputEpoch] = useState("");
  const [epochResult, setEpochResult] = useState<{
    local: string;
    utc: string;
    relative: string;
  } | null>(null);

  // Date to Epoch conversion states
  const [inputDate, setInputDate] = useState("");
  const [dateResult, setDateResult] = useState<{
    seconds: number;
    millis: number;
  } | null>(null);

  // Tick current time
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Epoch to Date conversion
  useEffect(() => {
    if (!inputEpoch.trim()) {
      setEpochResult(null);
      return;
    }

    const num = Number(inputEpoch.trim());
    if (isNaN(num)) {
      setEpochResult({
        local: "Invalid Number",
        utc: "Invalid Number",
        relative: "Invalid Number",
      });
      return;
    }

    // Auto-detect seconds vs milliseconds
    // Milliseconds are usually >= 13 digits (current epoch in ms is ~1.7e12)
    const isMs = inputEpoch.trim().length >= 13;
    const dateObj = new Date(isMs ? num : num * 1000);

    if (isNaN(dateObj.getTime())) {
      setEpochResult({
        local: "Invalid Date Range",
        utc: "Invalid Date Range",
        relative: "Invalid Date Range",
      });
      return;
    }

    // Relative relative time formatting
    const relativeTime = getRelativeTimeString(dateObj);

    setEpochResult({
      local: dateObj.toString(),
      utc: dateObj.toUTCString(),
      relative: relativeTime,
    });
  }, [inputEpoch]);

  // Handle Date to Epoch conversion
  useEffect(() => {
    if (!inputDate) {
      setDateResult(null);
      return;
    }

    const dateObj = new Date(inputDate);
    if (isNaN(dateObj.getTime())) {
      setDateResult(null);
      return;
    }

    const ms = dateObj.getTime();
    setDateResult({
      seconds: Math.floor(ms / 1000),
      millis: ms,
    });
  }, [inputDate]);

  // Set default values on mount
  useEffect(() => {
    setInputEpoch(Math.floor(Date.now() / 1000).toString());
    
    // Format local date for input datetime-local format: YYYY-MM-DDTHH:mm
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzOffset).toISOString().slice(0, 16);
    setInputDate(localISOTime);
  }, []);

  const getRelativeTimeString = (date: Date) => {
    const delta = date.getTime() - Date.now();
    const sec = Math.floor(Math.abs(delta) / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    const suffix = delta >= 0 ? "from now" : "ago";
    
    if (sec < 60) return `${sec} second${sec === 1 ? "" : "s"} ${suffix}`;
    if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ${suffix}`;
    if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ${suffix}`;
    return `${day} day${day === 1 ? "" : "s"} ${suffix}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSetToCurrent = () => {
    setInputEpoch(Math.floor(Date.now() / 1000).toString());
  };

  const currentSeconds = Math.floor(now.getTime() / 1000);
  const currentMillis = now.getTime();

  return (
    <div className={styles.container}>
      {/* Live Ticker panel */}
      <div className={styles.tickerCard}>
        <div className={styles.tickerGroup}>
          <span className={styles.tickerLabel}>Current Unix Timestamp (Seconds)</span>
          <div className={styles.tickerRow}>
            <span className={styles.tickerVal}>{currentSeconds}</span>
            <button
              onClick={() => handleCopy(currentSeconds.toString())}
              className={styles.copyIconBtn}
              title="Copy Timestamp"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.tickerGroup} style={{ borderLeft: "1px solid var(--border-dark)", paddingLeft: "24px" }}>
          <span className={styles.tickerLabel}>Current Milliseconds Epoch</span>
          <div className={styles.tickerRow}>
            <span className={styles.tickerVal} style={{ color: "var(--lime-600)" }}>{currentMillis}</span>
            <button
              onClick={() => handleCopy(currentMillis.toString())}
              className={styles.copyIconBtn}
              title="Copy Millisecond Timestamp"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.converterGrid}>
        {/* Epoch to Date */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Convert Epoch to Date</h3>
            <button onClick={handleSetToCurrent} className={styles.actionBtn}>
              Use Current Time
            </button>
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.fieldLabel}>Enter Unix Timestamp (Secs or Ms)</span>
            <input
              type="text"
              value={inputEpoch}
              onChange={(e) => setInputEpoch(e.target.value)}
              className={styles.input}
              placeholder="e.g. 1779455422"
            />
          </div>

          {epochResult && (
            <div className={styles.resultsList}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Local Time Zone</span>
                <span className={styles.resultVal}>{epochResult.local}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>UTC Time Zone</span>
                <span className={styles.resultVal}>{epochResult.utc}</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Relative Time</span>
                <span className={styles.resultVal} style={{ color: "var(--lime-600)", fontWeight: "600" }}>{epochResult.relative}</span>
              </div>
            </div>
          )}
        </div>

        {/* Date to Epoch */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Convert Date to Epoch</h3>
          </div>

          <div className={styles.inputWrapper}>
            <span className={styles.fieldLabel}>Select Date & Time</span>
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className={styles.input}
            />
          </div>

          {dateResult && (
            <div className={styles.resultsList}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Unix Timestamp (Seconds)</span>
                <div className={styles.resultCopyRow}>
                  <span className={styles.resultVal} style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{dateResult.seconds}</span>
                  <button onClick={() => handleCopy(dateResult.seconds.toString())} className={styles.copyBtn}>Copy</button>
                </div>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Milliseconds Epoch</span>
                <div className={styles.resultCopyRow}>
                  <span className={styles.resultVal} style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{dateResult.millis}</span>
                  <button onClick={() => handleCopy(dateResult.millis.toString())} className={styles.copyBtn}>Copy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
