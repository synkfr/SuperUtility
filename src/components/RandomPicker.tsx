"use client";

import React, { useState, useMemo } from "react";
import styles from "./RandomPicker.module.css";

const PRESETS = {
  yesNo: "Yes\nNo",
  coinFlip: "Heads\nTails",
  diceRoll: "1\n2\n3\n4\n5\n6",
  weekdays: "Monday\nTuesday\nWednesday\nThursday\nFriday\nSaturday\nSunday",
  meals: "Pizza\nBurgers\nTacos\nSushi\nSalad\nPasta\nSandwiches",
};

export default function RandomPicker() {
  const [rawItems, setRawItems] = useState("Burgers\nPizza\nTacos\nSushi\nSalad");
  const [pickCount, setPickCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [shuffleFirst, setShuffleFirst] = useState(true);
  
  const [picking, setPicking] = useState(false);
  const [tempItem, setTempItem] = useState("");
  const [winners, setWinners] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ id: string; winners: string[]; timestamp: string }>>([]);

  const parsedItems = useMemo(() => {
    return rawItems
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }, [rawItems]);

  const handlePreset = (presetKey: keyof typeof PRESETS) => {
    setRawItems(PRESETS[presetKey]);
    setWinners([]);
    setPickCount(1);
  };

  const handlePick = () => {
    if (parsedItems.length === 0) return;

    setPicking(true);
    setWinners([]);
    
    let cycles = 0;
    const maxCycles = 25;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * parsedItems.length);
      setTempItem(parsedItems[randomIdx]);
      cycles++;
      
      if (cycles >= maxCycles) {
        clearInterval(interval);
        finalizePick();
      }
    }, 60);
  };

  const finalizePick = () => {
    if (parsedItems.length === 0) {
      setPicking(false);
      return;
    }

    let itemsPool = [...parsedItems];
    
    if (shuffleFirst) {
      itemsPool = itemsPool.sort(() => Math.random() - 0.5);
    }

    const selected: string[] = [];
    const count = Math.min(pickCount, allowDuplicates ? 100 : itemsPool.length);

    for (let i = 0; i < count; i++) {
      if (itemsPool.length === 0) break;
      const idx = Math.floor(Math.random() * itemsPool.length);
      selected.push(itemsPool[idx]);
      
      if (!allowDuplicates) {
        itemsPool.splice(idx, 1);
      }
    }

    setWinners(selected);
    
    const date = new Date();
    const timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory(prev => [
      { id: Math.random().toString(), winners: selected, timestamp },
      ...prev.slice(0, 19)
    ]);
    
    setPicking(false);
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.workspace}>
        {/* Left Side: Custom Setup Panel */}
        <div className={styles.settingsPanel}>
          {/* Section: Templates */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Templates</span>
            <div className={styles.presetsRow}>
              <button onClick={() => handlePreset("yesNo")} className={styles.presetChipBtn}>Yes/No</button>
              <button onClick={() => handlePreset("coinFlip")} className={styles.presetChipBtn}>Coin Flip</button>
              <button onClick={() => handlePreset("diceRoll")} className={styles.presetChipBtn}>Dice Roll</button>
              <button onClick={() => handlePreset("weekdays")} className={styles.presetChipBtn}>Weekdays</button>
              <button onClick={() => handlePreset("meals")} className={styles.presetChipBtn}>Meals</button>
            </div>
          </div>

          {/* Section: Choices List */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Custom Choices</span>
            <div className={styles.controlGroup}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label className={styles.controlLabel} htmlFor="picker-items">List Choices (one per line)</label>
                <span className={styles.parsedCount}>{parsedItems.length} options parsed</span>
              </div>
              <textarea
                id="picker-items"
                className={styles.textInput}
                value={rawItems}
                onChange={(e) => {
                  setRawItems(e.target.value);
                  setWinners([]);
                }}
                placeholder="Enter list choices here..."
              />
            </div>
          </div>

          {/* Section: Draw Parameters */}
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Draw Parameters</span>
            <div className={styles.controlGroup}>
              <span className={styles.controlLabel}>Items to Pick</span>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="1"
                  max={allowDuplicates ? 20 : Math.max(1, parsedItems.length)}
                  value={pickCount}
                  onChange={(e) => setPickCount(parseInt(e.target.value))}
                  aria-label="Pick Count Slider"
                  style={{ flex: 1 }}
                />
                <span className={styles.sliderValue}>{pickCount}</span>
              </div>
            </div>

            <div className={styles.optionsList} style={{ marginTop: "8px" }}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => {
                    setAllowDuplicates(e.target.checked);
                    setPickCount(1);
                  }}
                />
                <span>Allow Duplicates (multiple selection)</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={shuffleFirst}
                  onChange={(e) => setShuffleFirst(e.target.checked)}
                />
                <span>Pre-shuffle items before rolling</span>
              </label>
            </div>
          </div>

          <button
            onClick={handlePick}
            disabled={picking || parsedItems.length === 0}
            className={`${styles.btn} ${styles.btnPrimary}`}
            style={{ width: "100%", marginTop: "12px" }}
          >
            {picking ? "Raffling..." : "Pick Random Item"}
          </button>
        </div>

        {/* Right Side: Animated Reveals and Raffle Logs */}
        <div className={styles.displayPanel}>
          <div className={styles.revealCard}>
            {picking && (
              <div className={styles.pickingAnimationBox}>
                🎲 {tempItem}
              </div>
            )}

            {!picking && winners.length > 0 && (
              <div className={styles.winnerBox}>
                <span className={styles.winnerTitle}>Selected Winner{winners.length > 1 ? "s" : ""}</span>
                <div className={styles.winnersList}>
                  {winners.map((winner, idx) => (
                    <div key={idx} className={styles.winnerChip}>
                      {winner}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!picking && winners.length === 0 && (
              <div className={styles.emptyState}>
                <svg width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" style={{ opacity: 0.4 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.982m-9 9l3.018-3.018m-3.018 3.018H3.621m13.018-12.018l1.414-1.414a2 2 0 10-2.828-2.828L13 5.5M2 3l7.813 7.813m0 0L21 21M9.813 10.813L15 15.904"></path>
                </svg>
                <p style={{ marginTop: "12px", fontSize: "0.95rem" }}>Configure items and pull the sweep lever to pick a winner</p>
              </div>
            )}
          </div>

          {/* Sweep History */}
          {history.length > 0 && (
            <div className={styles.historyCard}>
              <span className={styles.sectionTitle}>Sweep History</span>
              <div className={styles.historyList}>
                {history.map((h) => (
                  <div key={h.id} className={styles.historyItem}>
                    <span className={styles.historyVal}>{h.winners.join(", ")}</span>
                    <span className={styles.historyTime}>{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
