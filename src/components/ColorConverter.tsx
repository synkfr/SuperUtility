"use client";

import React, { useState, useEffect } from "react";
import styles from "./ColorConverter.module.css";

export default function ColorConverter() {
  const [hex, setHex] = useState("#84cc16");
  const [r, setR] = useState(132);
  const [g, setG] = useState(204);
  const [b, setB] = useState(22);
  const [h, setH] = useState(84);
  const [s, setS] = useState(81);
  const [l, setL] = useState(44);

  // Helper to convert hex to rgb
  const hexToRgb = (hexStr: string) => {
    const cleanHex = hexStr.replace(/^#/, "");
    if (cleanHex.length !== 3 && cleanHex.length !== 6) return null;
    
    let rVal, gVal, bVal;
    if (cleanHex.length === 3) {
      rVal = parseInt(cleanHex[0] + cleanHex[0], 16);
      gVal = parseInt(cleanHex[1] + cleanHex[1], 16);
      bVal = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      rVal = parseInt(cleanHex.substring(0, 2), 16);
      gVal = parseInt(cleanHex.substring(2, 4), 16);
      bVal = parseInt(cleanHex.substring(4, 6), 16);
    }
    
    if (isNaN(rVal) || isNaN(gVal) || isNaN(bVal)) return null;
    return { r: rVal, g: gVal, b: bVal };
  };

  // Helper to convert rgb to hex
  const rgbToHex = (rVal: number, gVal: number, bVal: number) => {
    const clamp = (val: number) => Math.max(0, Math.min(255, val));
    const compHex = (c: number) => {
      const hexComp = clamp(c).toString(16);
      return hexComp.length === 1 ? "0" + hexComp : hexComp;
    };
    return "#" + compHex(rVal) + compHex(gVal) + compHex(bVal);
  };

  // Helper to convert rgb to hsl
  const rgbToHsl = (rVal: number, gVal: number, bVal: number) => {
    const rd = rVal / 255;
    const gd = gVal / 255;
    const bd = bVal / 255;
    
    const max = Math.max(rd, gd, bd);
    const min = Math.min(rd, gd, bd);
    
    let hVal = 0;
    let sVal = 0;
    let lVal = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      sVal = lVal > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case rd:
          hVal = (gd - bd) / d + (gd < bd ? 6 : 0);
          break;
        case gd:
          hVal = (bd - rd) / d + 2;
          break;
        case bd:
          hVal = (rd - gd) / d + 4;
          break;
      }
      hVal /= 6;
    }

    return {
      h: Math.round(hVal * 360),
      s: Math.round(sVal * 100),
      l: Math.round(lVal * 100),
    };
  };

  // Helper to convert hsl to rgb
  const hslToRgb = (hVal: number, sVal: number, lVal: number) => {
    const hd = hVal / 360;
    const sd = sVal / 100;
    const ld = lVal / 100;

    let rVal, gVal, bVal;

    if (sd === 0) {
      rVal = gVal = bVal = ld; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        let tc = t;
        if (tc < 0) tc += 1;
        if (tc > 1) tc -= 1;
        if (tc < 1/6) return p + (q - p) * 6 * tc;
        if (tc < 1/2) return q;
        if (tc < 2/3) return p + (q - p) * (2/3 - tc) * 6;
        return p;
      };

      const q = ld < 0.5 ? ld * (1 + sd) : ld + sd - ld * sd;
      const p = 2 * ld - q;

      rVal = hue2rgb(p, q, hd + 1/3);
      gVal = hue2rgb(p, q, hd);
      bVal = hue2rgb(p, q, hd - 1/3);
    }

    return {
      r: Math.round(rVal * 255),
      g: Math.round(gVal * 255),
      b: Math.round(bVal * 255),
    };
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val) || /^#[0-9a-fA-F]{3}$/.test(val)) {
      const rgbObj = hexToRgb(val);
      if (rgbObj) {
        setR(rgbObj.r);
        setG(rgbObj.g);
        setB(rgbObj.b);
        const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
        setH(hslObj.h);
        setS(hslObj.s);
        setL(hslObj.l);
      }
    }
  };

  const handleRgbChange = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
    const newHex = rgbToHex(newR, newG, newB);
    setHex(newHex);
    const hslObj = rgbToHsl(newR, newG, newB);
    setH(hslObj.h);
    setS(hslObj.s);
    setL(hslObj.l);
  };

  const handleHslChange = (newH: number, newS: number, newL: number) => {
    setH(newH);
    setS(newS);
    setL(newL);
    const rgbObj = hslToRgb(newH, newS, newL);
    setR(rgbObj.r);
    setG(rgbObj.g);
    setB(rgbObj.b);
    const newHex = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
    setHex(newHex);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.colorPanel}>
        {/* Dynamic Color Preview Box */}
        <div 
          className={styles.colorPreview} 
          style={{ backgroundColor: hex }}
        >
          <span className={styles.previewLabel} style={{
            color: l > 50 ? "#000000" : "#ffffff"
          }}>
            {hex.toUpperCase()}
          </span>
        </div>

        {/* Inputs list */}
        <div className={styles.inputsColumn}>
          {/* HEX */}
          <div className={styles.inputGroup}>
            <span className={styles.fieldLabel}>HEX Code</span>
            <div className={styles.inputCopyRow}>
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className={styles.textInput}
              />
              <button onClick={() => handleCopy(hex.toUpperCase())} className={styles.copyBtn}>Copy</button>
            </div>
          </div>

          {/* RGB */}
          <div className={styles.inputGroup}>
            <span className={styles.fieldLabel}>RGB Format</span>
            <div className={styles.inputCopyRow}>
              <input
                type="text"
                value={`rgb(${r}, ${g}, ${b})`}
                readOnly
                className={styles.textInput}
                style={{ backgroundColor: "#fafafa" }}
              />
              <button onClick={() => handleCopy(`rgb(${r}, ${g}, ${b})`)} className={styles.copyBtn}>Copy</button>
            </div>
          </div>

          {/* HSL */}
          <div className={styles.inputGroup}>
            <span className={styles.fieldLabel}>HSL Format</span>
            <div className={styles.inputCopyRow}>
              <input
                type="text"
                value={`hsl(${h}, ${s}%, ${l}%)`}
                readOnly
                className={styles.textInput}
                style={{ backgroundColor: "#fafafa" }}
              />
              <button onClick={() => handleCopy(`hsl(${h}, ${s}%, ${l}%)`)} className={styles.copyBtn}>Copy</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.slidersGrid}>
        {/* RGB Sliders Card */}
        <div className={styles.sliderCard}>
          <h3 className={styles.cardTitle}>RGB Color Channels</h3>
          <div className={styles.sliderList}>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Red ({r})</span>
              <input
                type="range"
                min="0"
                max="255"
                value={r}
                onChange={(e) => handleRgbChange(Number(e.target.value), g, b)}
                className={styles.rangeInput}
              />
            </div>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Green ({g})</span>
              <input
                type="range"
                min="0"
                max="255"
                value={g}
                onChange={(e) => handleRgbChange(r, Number(e.target.value), b)}
                className={styles.rangeInput}
              />
            </div>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Blue ({b})</span>
              <input
                type="range"
                min="0"
                max="255"
                value={b}
                onChange={(e) => handleRgbChange(r, g, Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>

        {/* HSL Sliders Card */}
        <div className={styles.sliderCard}>
          <h3 className={styles.cardTitle}>HSL Color Parameters</h3>
          <div className={styles.sliderList}>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Hue ({h}°)</span>
              <input
                type="range"
                min="0"
                max="360"
                value={h}
                onChange={(e) => handleHslChange(Number(e.target.value), s, l)}
                className={styles.rangeInput}
              />
            </div>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Saturation ({s}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={s}
                onChange={(e) => handleHslChange(h, Number(e.target.value), l)}
                className={styles.rangeInput}
              />
            </div>
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Lightness ({l}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={l}
                onChange={(e) => handleHslChange(h, s, Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
