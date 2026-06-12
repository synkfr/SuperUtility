"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import styles from "./QrCodeGenerator.module.css";
import pageStyles from "@/app/page.module.css";

const PRESET_FG_COLORS = ["#000000", "#1e3a8a", "#115e59", "#4c1d95", "#854d0e", "#9f1239"];
const PRESET_BG_COLORS = ["#ffffff", "#f8fafc", "#f0fdf4", "#fef2f2", "#fffbeb", "#fcf7ff"];

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://superutility.xyz");
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("H"); // Default to H to support logos by default

  // Custom QR Styles State
  const [dotStyle, setDotStyle] = useState<"square" | "circle" | "rounded" | "diamond" | "fluid">("square");
  const [finderOuterStyle, setFinderOuterStyle] = useState<"square" | "rounded" | "circle">("square");
  const [finderInnerStyle, setFinderInnerStyle] = useState<"square" | "rounded" | "circle" | "diamond">("square");

  // Custom Colors & Gradients State
  const [fgType, setFgType] = useState<"solid" | "linear" | "radial">("solid");
  const [fgColor, setFgColor] = useState("#000000");
  const [fgColorEnd, setFgColorEnd] = useState("#2563eb");
  const [gradientDirection, setGradientDirection] = useState<"horizontal" | "vertical" | "diagonal" | "radial">("diagonal");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [hasCustomFinders, setHasCustomFinders] = useState(false);
  const [finderOuterColor, setFinderOuterColor] = useState("#000000");
  const [finderInnerColor, setFinderInnerColor] = useState("#000000");

  // Logo Customization State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoImageSrc, setLogoImageSrc] = useState<string | null>(null);
  const [logoWidthHeight, setLogoWidthHeight] = useState<{ width: number; height: number } | null>(null);
  const [logoSize, setLogoSize] = useState(20);
  const [clearLogoBg, setClearLogoBg] = useState(true);
  const [logoShape, setLogoShape] = useState<"none" | "rounded" | "circle">("none");
  const [logoBgShape, setLogoBgShape] = useState<"none" | "square" | "rounded" | "circle">("none");
  const [logoBgColor, setLogoBgColor] = useState("#ffffff");
  const [logoBorderWidth, setLogoBorderWidth] = useState(2);
  const [logoBorderColor, setLogoBorderColor] = useState("#ffffff");

  // Accordion Expand States
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    styles: false,
    colors: false,
    logo: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoImageEl, setLogoImageEl] = useState<HTMLImageElement | null>(null);

  // Load logo image asynchronously
  useEffect(() => {
    if (!logoImageSrc) {
      setLogoImageEl(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoImageSrc;
    img.onload = () => {
      setLogoImageEl(img);
    };
    img.onerror = () => {
      console.error("Failed to load logo image source");
      setLogoImageEl(null);
    };
  }, [logoImageSrc]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!text || !canvasRef.current) return;

    drawCustomQRCode(canvasRef.current, text, {
      size,
      margin,
      bgColor,
      fgColor,
      fgColorEnd,
      fgType,
      gradientDirection,
      dotStyle,
      finderOuterStyle,
      finderInnerStyle,
      hasCustomFinders,
      finderOuterColor,
      finderInnerColor,
      level,
      logoImageEl,
      logoSize,
      clearLogoBg,
      logoShape,
      logoBgShape,
      logoBgColor,
      logoBorderWidth,
      logoBorderColor,
    });
  }, [
    text,
    size,
    margin,
    bgColor,
    fgColor,
    fgColorEnd,
    fgType,
    gradientDirection,
    dotStyle,
    finderOuterStyle,
    finderInnerStyle,
    hasCustomFinders,
    finderOuterColor,
    finderInnerColor,
    level,
    logoImageEl,
    logoSize,
    clearLogoBg,
    logoShape,
    logoBgShape,
    logoBgColor,
    logoBorderWidth,
    logoBorderColor,
  ]);

  // Handle file logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoImageSrc(dataUrl);

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setLogoWidthHeight({ width: img.width, height: img.height });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoImageSrc(null);
    setLogoWidthHeight(null);
    setLogoImageEl(null);
  };

  // PNG Downloader
  const handleDownloadPng = () => {
    if (!canvasRef.current || !text) return;
    try {
      const url = canvasRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "superutility-qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("Failed to download PNG:", e);
    }
  };

  // Styled Vector SVG Downloader
  const handleDownloadSvg = () => {
    if (!text) return;
    try {
      const svgString = generateCustomSVG(text, {
        size,
        margin,
        bgColor,
        fgColor,
        fgColorEnd,
        fgType,
        gradientDirection,
        dotStyle,
        finderOuterStyle,
        finderInnerStyle,
        hasCustomFinders,
        finderOuterColor,
        finderInnerColor,
        level,
        logoImageSrc,
        logoWidthHeight,
        logoSize,
        clearLogoBg,
        logoShape,
        logoBgShape,
        logoBgColor,
        logoBorderWidth,
        logoBorderColor,
      });

      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "superutility-qrcode.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download SVG:", e);
    }
  };

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <div className={styles.workspace}>
        {/* Left Side: Customize Form Accordions */}
        <div className={styles.settingsPanel}>
          
          {/* 1. Content & Standard Section */}
          <div className={styles.accordionSection}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection("content")}
              aria-expanded={expandedSections.content}
            >
              <div className={styles.accordionTitleGroup}>
                <svg className={styles.accordionIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className={styles.accordionLabel}>Content & QR Settings</span>
              </div>
              <svg className={`${styles.chevron} ${expandedSections.content ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {expandedSections.content && (
              <div className={styles.accordionContent}>
                <div className={styles.controlGroup}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <label className={styles.controlLabel} htmlFor="qr-text">Text or URL content</label>
                    <span className={styles.charCount}>{text.length} characters</span>
                  </div>
                  <textarea
                    id="qr-text"
                    className={styles.textInput}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste link/text to encode here..."
                  />
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                  <span className={styles.controlLabel}>Error Correction Standard</span>
                  <div className={styles.chipGroup}>
                    {(["L", "M", "Q", "H"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        className={`${styles.chip} ${level === lvl ? styles.chipActive : ""}`}
                        onClick={() => setLevel(lvl)}
                      >
                        {lvl === "L" && "Low (7%)"}
                        {lvl === "M" && "Medium (15%)"}
                        {lvl === "Q" && "Quartile (25%)"}
                        {lvl === "H" && "High (30%)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                  <span className={styles.controlLabel}>Dimensions (Width/Height)</span>
                  <div className={styles.sliderContainer}>
                    <input
                      type="range"
                      min="128"
                      max="512"
                      step="32"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      aria-label="QR Code Size Slider"
                      style={{ flex: 1 }}
                    />
                    <span className={styles.sliderValue}>{size}px</span>
                  </div>
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                  <span className={styles.controlLabel}>Border Padding (Margin)</span>
                  <div className={styles.sliderContainer}>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={margin}
                      onChange={(e) => setMargin(parseInt(e.target.value))}
                      aria-label="QR Code Margin Slider"
                      style={{ flex: 1 }}
                    />
                    <span className={styles.sliderValue}>{margin}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Style & Design Section */}
          <div className={styles.accordionSection}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection("styles")}
              aria-expanded={expandedSections.styles}
            >
              <div className={styles.accordionTitleGroup}>
                <svg className={styles.accordionIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.445a3.25 3.25 0 014.597 4.597l-9.37 9.446a6 6 0 01-2.227 1.433l-3.541 1.108a.75.75 0 01-.93-.93l1.11-3.541a6 6 0 011.433-2.227z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.144 7.613l1.96-1.957a3 3 0 114.243 4.243l-1.96 1.957m-4.243-4.243a3 3 0 114.243 4.243m-4.243-4.243L8.53 16.122" />
                </svg>
              <span className={styles.accordionLabel}>Body & Finder Shapes</span>
              </div>
              <svg className={`${styles.chevron} ${expandedSections.styles ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {expandedSections.styles && (
              <div className={styles.accordionContent}>
                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>QR Body Pattern (Dots)</span>
                  <div className={styles.gridSelector}>
                    {[
                      { id: "square", label: "Square" },
                      { id: "circle", label: "Circles" },
                      { id: "rounded", label: "Rounded" },
                      { id: "diamond", label: "Diamonds" },
                      { id: "fluid", label: "Fluid Connected" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.gridItem} ${dotStyle === item.id ? styles.gridItemActive : ""}`}
                        onClick={() => setDotStyle(item.id as any)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "18px" }}>
                  <span className={styles.controlLabel}>Finder Outer Frame Shape</span>
                  <div className={styles.gridSelector}>
                    {[
                      { id: "square", label: "Square Ring" },
                      { id: "rounded", label: "Rounded Ring" },
                      { id: "circle", label: "Circular Ring" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.gridItem} ${finderOuterStyle === item.id ? styles.gridItemActive : ""}`}
                        onClick={() => setFinderOuterStyle(item.id as any)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "18px" }}>
                  <span className={styles.controlLabel}>Finder Center Dot Shape</span>
                  <div className={styles.gridSelector}>
                    {[
                      { id: "square", label: "Square Dot" },
                      { id: "rounded", label: "Rounded Dot" },
                      { id: "circle", label: "Circular Dot" },
                      { id: "diamond", label: "Diamond Dot" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.gridItem} ${finderInnerStyle === item.id ? styles.gridItemActive : ""}`}
                        onClick={() => setFinderInnerStyle(item.id as any)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Color & Gradients Section */}
          <div className={styles.accordionSection}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection("colors")}
              aria-expanded={expandedSections.colors}
            >
              <div className={styles.accordionTitleGroup}>
                <svg className={styles.accordionIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.445a3.25 3.25 0 014.597 4.597l-9.37 9.446a6 6 0 01-2.227 1.433l-3.541 1.108a.75.75 0 01-.93-.93l1.11-3.541a6 6 0 011.433-2.227z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={styles.accordionLabel}>Colors & Gradients</span>
              </div>
              <svg className={`${styles.chevron} ${expandedSections.colors ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {expandedSections.colors && (
              <div className={styles.accordionContent}>
                <div className={styles.controlGroup}>
                  <span className={styles.controlLabel}>Foreground Coloring</span>
                  <div className={styles.chipGroup}>
                    {[
                      { id: "solid", label: "Solid Color" },
                      { id: "linear", label: "Linear Gradient" },
                      { id: "radial", label: "Radial Gradient" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.chip} ${fgType === item.id ? styles.chipActive : ""}`}
                        onClick={() => setFgType(item.id as any)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.colorPickerRow} style={{ marginTop: "16px" }}>
                  <div className={styles.controlGroup} style={{ flex: 1 }}>
                    <span className={styles.controlLabel}>
                      {fgType === "solid" ? "Foreground Color" : "Gradient Start"}
                    </span>
                    <div className={styles.colorPickerWrapper}>
                      <div className={styles.colorIndicator} style={{ backgroundColor: fgColor }}>
                        <input
                          type="color"
                          className={styles.colorInput}
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          aria-label="Start Color"
                        />
                      </div>
                      <span className={styles.colorLabel}>{fgColor.toUpperCase()}</span>
                    </div>
                  </div>

                  {fgType !== "solid" && (
                    <div className={styles.controlGroup} style={{ flex: 1 }}>
                      <span className={styles.controlLabel}>Gradient End</span>
                      <div className={styles.colorPickerWrapper}>
                        <div className={styles.colorIndicator} style={{ backgroundColor: fgColorEnd }}>
                          <input
                            type="color"
                            className={styles.colorInput}
                            value={fgColorEnd}
                            onChange={(e) => setFgColorEnd(e.target.value)}
                            aria-label="End Color"
                          />
                        </div>
                        <span className={styles.colorLabel}>{fgColorEnd.toUpperCase()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {fgType === "linear" && (
                  <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                    <span className={styles.controlLabel}>Gradient Direction</span>
                    <div className={styles.chipGroup}>
                      {[
                        { id: "horizontal", label: "Horizontal" },
                        { id: "vertical", label: "Vertical" },
                        { id: "diagonal", label: "Diagonal" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          className={`${styles.chip} ${gradientDirection === item.id ? styles.chipActive : ""}`}
                          onClick={() => setGradientDirection(item.id as any)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.presetContainer} style={{ marginTop: "8px" }}>
                  {PRESET_FG_COLORS.map((c) => (
                    <button
                      key={c}
                      className={styles.presetChip}
                      style={{ backgroundColor: c }}
                      onClick={() => setFgColor(c)}
                      title={`Use ${c}`}
                      aria-label={`Use foreground color ${c}`}
                    />
                  ))}
                </div>

                <div className={styles.controlGroup} style={{ marginTop: "20px" }}>
                  <span className={styles.controlLabel}>Background Color</span>
                  <div className={styles.colorPickerWrapper}>
                    <div className={styles.colorIndicator} style={{ backgroundColor: bgColor }}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        aria-label="Background Color Picker"
                      />
                    </div>
                    <span className={styles.colorLabel}>{bgColor.toUpperCase()}</span>
                  </div>
                  <div className={styles.presetContainer}>
                    {PRESET_BG_COLORS.map((c) => (
                      <button
                        key={c}
                        className={styles.presetChip}
                        style={{ backgroundColor: c }}
                        onClick={() => setBgColor(c)}
                        title={`Use ${c}`}
                        aria-label={`Use background color ${c}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Finder Colors Toggle */}
                <div className={styles.toggleGroup} style={{ marginTop: "20px" }}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      className={styles.toggleInput}
                      checked={hasCustomFinders}
                      onChange={(e) => setHasCustomFinders(e.target.checked)}
                    />
                    <span className={styles.toggleLabelText}>Use Custom Colors for Corner Finders</span>
                  </label>
                </div>

                {hasCustomFinders && (
                  <div className={styles.colorPickerRow} style={{ marginTop: "14px" }}>
                    <div className={styles.controlGroup} style={{ flex: 1 }}>
                      <span className={styles.controlLabel}>Finder Outer Frame</span>
                      <div className={styles.colorPickerWrapper}>
                        <div className={styles.colorIndicator} style={{ backgroundColor: finderOuterColor }}>
                          <input
                            type="color"
                            className={styles.colorInput}
                            value={finderOuterColor}
                            onChange={(e) => setFinderOuterColor(e.target.value)}
                          />
                        </div>
                        <span className={styles.colorLabel}>{finderOuterColor.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className={styles.controlGroup} style={{ flex: 1 }}>
                      <span className={styles.controlLabel}>Finder Inner Dot</span>
                      <div className={styles.colorPickerWrapper}>
                        <div className={styles.colorIndicator} style={{ backgroundColor: finderInnerColor }}>
                          <input
                            type="color"
                            className={styles.colorInput}
                            value={finderInnerColor}
                            onChange={(e) => setFinderInnerColor(e.target.value)}
                          />
                        </div>
                        <span className={styles.colorLabel}>{finderInnerColor.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Logo Customization Section */}
          <div className={styles.accordionSection}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection("logo")}
              aria-expanded={expandedSections.logo}
            >
              <div className={styles.accordionTitleGroup}>
                <svg className={styles.accordionIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className={styles.accordionLabel}>Logo & Center Badge</span>
              </div>
              <svg className={`${styles.chevron} ${expandedSections.logo ? styles.chevronOpen : ""}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {expandedSections.logo && (
              <div className={styles.accordionContent}>
                
                {/* File Dropzone */}
                {!logoImageSrc ? (
                  <div className={styles.dropzone}>
                    <input
                      type="file"
                      id="logo-upload-input"
                      className={styles.fileInput}
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload-input" className={styles.dropzoneLabel}>
                      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0016.5 4.5H6.75a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 006.75 19.5z" />
                      </svg>
                      <span>Upload Logo Image</span>
                      <span className={styles.dropzoneSub}>PNG, JPG, SVG or WebP</span>
                    </label>
                  </div>
                ) : (
                  <div className={styles.uploadedPreviewCard}>
                    <img src={logoImageSrc} alt="Logo Preview" className={styles.logoBadgePreview} />
                    <div className={styles.uploadedMeta}>
                      <span className={styles.uploadedName}>
                        {logoFile ? logoFile.name : "Custom Logo"}
                      </span>
                      <button className={styles.removeLogoBtn} onClick={handleRemoveLogo}>
                        Remove Logo
                      </button>
                    </div>
                  </div>
                )}

                {logoImageSrc && (
                  <>
                    <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                      <span className={styles.controlLabel}>Logo Center Size</span>
                      <div className={styles.sliderContainer}>
                        <input
                          type="range"
                          min="10"
                          max="30"
                          value={logoSize}
                          onChange={(e) => setLogoSize(parseInt(e.target.value))}
                          style={{ flex: 1 }}
                        />
                        <span className={styles.sliderValue}>{logoSize}%</span>
                      </div>
                    </div>

                    <div className={styles.toggleGroup} style={{ marginTop: "14px" }}>
                      <label className={styles.toggleLabel}>
                        <input
                          type="checkbox"
                          className={styles.toggleInput}
                          checked={clearLogoBg}
                          onChange={(e) => setClearLogoBg(e.target.checked)}
                        />
                        <span className={styles.toggleLabelText}>Clear QR Modules behind logo</span>
                      </label>
                    </div>

                    <div className={styles.controlGroup} style={{ marginTop: "14px" }}>
                      <span className={styles.controlLabel}>Logo Crop/Clipping Shape</span>
                      <div className={styles.chipGroup}>
                        {[
                          { id: "none", label: "Original" },
                          { id: "rounded", label: "Rounded Rect" },
                          { id: "circle", label: "Circle" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            className={`${styles.chip} ${logoShape === item.id ? styles.chipActive : ""}`}
                            onClick={() => setLogoShape(item.id as any)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.controlGroup} style={{ marginTop: "16px" }}>
                      <span className={styles.controlLabel}>Logo Background Base</span>
                      <div className={styles.chipGroup}>
                        {[
                          { id: "none", label: "None" },
                          { id: "square", label: "Square" },
                          { id: "rounded", label: "Rounded" },
                          { id: "circle", label: "Circle" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            className={`${styles.chip} ${logoBgShape === item.id ? styles.chipActive : ""}`}
                            onClick={() => setLogoBgShape(item.id as any)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {logoBgShape !== "none" && (
                      <>
                        <div className={styles.colorPickerRow} style={{ marginTop: "16px" }}>
                          <div className={styles.controlGroup} style={{ flex: 1 }}>
                            <span className={styles.controlLabel}>Background Base Color</span>
                            <div className={styles.colorPickerWrapper}>
                              <div className={styles.colorIndicator} style={{ backgroundColor: logoBgColor }}>
                                <input
                                  type="color"
                                  className={styles.colorInput}
                                  value={logoBgColor}
                                  onChange={(e) => setLogoBgColor(e.target.value)}
                                />
                              </div>
                              <span className={styles.colorLabel}>{logoBgColor.toUpperCase()}</span>
                            </div>
                          </div>

                          <div className={styles.controlGroup} style={{ flex: 1 }}>
                            <span className={styles.controlLabel}>Border Color</span>
                            <div className={styles.colorPickerWrapper}>
                              <div className={styles.colorIndicator} style={{ backgroundColor: logoBorderColor }}>
                                <input
                                  type="color"
                                  className={styles.colorInput}
                                  value={logoBorderColor}
                                  onChange={(e) => setLogoBorderColor(e.target.value)}
                                />
                              </div>
                              <span className={styles.colorLabel}>{logoBorderColor.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.controlGroup} style={{ marginTop: "14px" }}>
                          <span className={styles.controlLabel}>Border Stroke Width</span>
                          <div className={styles.sliderContainer}>
                            <input
                              type="range"
                              min="0"
                              max="8"
                              value={logoBorderWidth}
                              onChange={(e) => setLogoBorderWidth(parseInt(e.target.value))}
                              style={{ flex: 1 }}
                            />
                            <span className={styles.sliderValue}>{logoBorderWidth}px</span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Live Render Preview Panel */}
        <div className={styles.previewPanel}>
          {text ? (
            <>
              <div className={`${styles.qrWrapper} checkered-bg`}>
                <canvas ref={canvasRef} className={styles.canvas} />
              </div>
              <div className={styles.btnRow}>
                <button onClick={handleDownloadPng} className={styles.btn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  PNG Image
                </button>
                <button onClick={handleDownloadSvg} className={`${styles.btn} ${styles.btnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  SVG Vector
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="3"></rect>
                <rect x="14" y="7" width="3" height="3"></rect>
                <rect x="7" y="14" width="3" height="3"></rect>
                <rect x="14" y="14" width="3" height="3"></rect>
              </svg>
              <span>Provide text to render a QR Code</span>
            </div>
          )}
        </div>
      </div>

      {/* SEO Technical Footer */}
      <section className={pageStyles.seoSection} style={{ marginTop: "40px" }} aria-label="QR Code Generator Scannability Science">
        <h2 className={pageStyles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h.008v.008H15V15Zm0 3h.008v.008H15V18Zm-3-3h.008v.008H12V15Zm0 3h.008v.008H12V18Zm-3 3h.008v.008H9V21Zm3 0h.008v.008H12V21ZM15 21h.008v.008H15V21Zm3-6h.008v.008H18V15Zm0 3h.008v.008H18V18Zm0 3h.008v.008H18V21ZM16.5 12h.008v.008H16.5V12Zm-1.5-1.5h.008v.008H15v-.008Zm1.5-.008h.008v.008H16.5v-.008Zm-1.5 3h.008v.008H15V13.5Z" />
          </svg>
          QR Code Vector Math & Scannability
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does Reed-Solomon Error Correction work?</h3>
            <p className={pageStyles.seoCardText}>
              QR codes utilize Reed-Solomon error correction to restore data if the code is dirty, scratched, or partially obstructed. There are four error correction levels: <code className={pageStyles.seoCode}>L (7%)</code>, <code className={pageStyles.seoCode}>M (15%)</code>, <code className={pageStyles.seoCode}>Q (25%)</code>, and <code className={pageStyles.seoCode}>H (30%)</code>. A higher correction level increases data density and redundancy, adding more pixels but ensuring robust scannability in rugged environments.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why choose SVG vector graphics over standard PNG?</h3>
            <p className={pageStyles.seoCardText}>
              Standard raster graphics (like PNG) can become pixelated or blurry when scaled, causing scanning failures. Vector graphics (SVG) are rendered mathematically as XML coordinates, allowing infinite scaling with crisp borders and perfect pixel alignments. SVGs are ideal for large-scale print advertisements, architectural billboards, and premium user interface elements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// Custom drawing functions & vector serializing
// ==========================================

interface DrawOptions {
  size: number;
  margin: number;
  bgColor: string;
  fgColor: string;
  fgColorEnd: string;
  fgType: "solid" | "linear" | "radial";
  gradientDirection: "horizontal" | "vertical" | "diagonal" | "radial";
  dotStyle: "square" | "circle" | "rounded" | "diamond" | "fluid";
  finderOuterStyle: "square" | "rounded" | "circle";
  finderInnerStyle: "square" | "rounded" | "circle" | "diamond";
  hasCustomFinders: boolean;
  finderOuterColor: string;
  finderInnerColor: string;
  level: "L" | "M" | "Q" | "H";
  logoImageEl: HTMLImageElement | null;
  logoSize: number;
  clearLogoBg: boolean;
  logoShape: "none" | "rounded" | "circle";
  logoBgShape: "none" | "square" | "rounded" | "circle";
  logoBgColor: string;
  logoBorderWidth: number;
  logoBorderColor: string;
}

function drawCustomQRCode(canvas: HTMLCanvasElement, text: string, options: DrawOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let qr;
  try {
    qr = QRCode.create(text, { errorCorrectionLevel: options.level });
  } catch (err) {
    console.error("QR creation failure:", err);
    return;
  }

  const matrixSize = qr.modules.size;
  const cellSize = options.size / (matrixSize + 2 * options.margin);
  const marginPx = options.margin * cellSize;

  canvas.width = options.size;
  canvas.height = options.size;

  // Background
  ctx.fillStyle = options.bgColor;
  ctx.fillRect(0, 0, options.size, options.size);

  const qrStartX = marginPx;
  const qrStartY = marginPx;
  const qrWidth = matrixSize * cellSize;
  const qrHeight = matrixSize * cellSize;

  // Foreground setup
  let fgStyle: string | CanvasGradient = options.fgColor;
  if (options.fgType === "linear") {
    let grad;
    if (options.gradientDirection === "horizontal") {
      grad = ctx.createLinearGradient(qrStartX, qrStartY, qrStartX + qrWidth, qrStartY);
    } else if (options.gradientDirection === "vertical") {
      grad = ctx.createLinearGradient(qrStartX, qrStartY, qrStartX, qrStartY + qrHeight);
    } else {
      grad = ctx.createLinearGradient(qrStartX, qrStartY, qrStartX + qrWidth, qrStartY + qrHeight);
    }
    grad.addColorStop(0, options.fgColor);
    grad.addColorStop(1, options.fgColorEnd);
    fgStyle = grad;
  } else if (options.fgType === "radial") {
    const cx = qrStartX + qrWidth / 2;
    const cy = qrStartY + qrHeight / 2;
    const r = qrWidth / Math.sqrt(2);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, options.fgColor);
    grad.addColorStop(1, options.fgColorEnd);
    fgStyle = grad;
  }

  // Draw Helpers
  const drawRoundedRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  };

  const drawCustomRoundedRect = (
    c: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    rTL: number,
    rTR: number,
    rBL: number,
    rBR: number
  ) => {
    c.beginPath();
    c.moveTo(x + rTL, y);
    c.lineTo(x + w - rTR, y);
    c.arcTo(x + w, y, x + w, y + rTR, rTR);
    c.lineTo(x + w, y + h - rBR);
    c.arcTo(x + w, y + h, x + w - rBR, y + h, rBR);
    c.lineTo(x + rBL, y + h);
    c.arcTo(x, y + h, x, y + h - rBL, rBL);
    c.lineTo(x, y + rTL);
    c.arcTo(x, y, x + rTL, y, rTL);
    c.closePath();
  };

  const isFinder = (r: number, c: number) => {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= matrixSize - 7) return true;
    if (r >= matrixSize - 7 && c < 7) return true;
    return false;
  };

  const logoModules = Math.ceil(matrixSize * (options.logoSize / 100));
  const logoStart = Math.floor((matrixSize - logoModules) / 2);
  const logoEnd = logoStart + logoModules;

  const isLogoCleared = (r: number, c: number) => {
    if (!options.logoImageEl || !options.clearLogoBg) return false;
    return r >= logoStart && r < logoEnd && c >= logoStart && c < logoEnd;
  };

  const isActive = (r: number, c: number) => {
    if (r < 0 || r >= matrixSize || c < 0 || c >= matrixSize) return false;
    if (isFinder(r, c)) return false;
    if (isLogoCleared(r, c)) return false;
    return qr.modules.get(r, c) === 1;
  };

  // Draw Data Modules
  ctx.fillStyle = fgStyle;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isFinder(r, c)) continue;
      if (isLogoCleared(r, c)) continue;

      if (qr.modules.get(r, c) === 1) {
        const x = marginPx + c * cellSize;
        const y = marginPx + r * cellSize;

        if (options.dotStyle === "square") {
          ctx.fillRect(x, y, cellSize, cellSize);
        } else if (options.dotStyle === "circle") {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.45, 0, 2 * Math.PI);
          ctx.fill();
        } else if (options.dotStyle === "rounded") {
          drawRoundedRect(ctx, x + cellSize * 0.05, y + cellSize * 0.05, cellSize * 0.9, cellSize * 0.9, cellSize * 0.35);
          ctx.fill();
        } else if (options.dotStyle === "diamond") {
          ctx.beginPath();
          ctx.moveTo(x + cellSize / 2, y);
          ctx.lineTo(x + cellSize, y + cellSize / 2);
          ctx.lineTo(x + cellSize / 2, y + cellSize);
          ctx.lineTo(x, y + cellSize / 2);
          ctx.closePath();
          ctx.fill();
        } else if (options.dotStyle === "fluid") {
          const hasTop = isActive(r - 1, c);
          const hasBottom = isActive(r + 1, c);
          const hasLeft = isActive(r, c - 1);
          const hasRight = isActive(r, c + 1);

          const radius = cellSize * 0.5;
          const rTL = hasTop || hasLeft ? 0 : radius;
          const rTR = hasTop || hasRight ? 0 : radius;
          const rBL = hasBottom || hasLeft ? 0 : radius;
          const rBR = hasBottom || hasRight ? 0 : radius;

          drawCustomRoundedRect(ctx, x, y, cellSize, cellSize, rTL, rTR, rBL, rBR);
          ctx.fill();
        }
      }
    }
  }

  // Draw Corner Finders
  const outerColor = options.hasCustomFinders ? options.finderOuterColor : fgStyle;
  const innerColor = options.hasCustomFinders ? options.finderInnerColor : fgStyle;

  const drawFinderPattern = (rOffset: number, cOffset: number) => {
    const fx = marginPx + cOffset * cellSize;
    const fy = marginPx + rOffset * cellSize;
    const fSize = 7 * cellSize;

    const strokeX = fx + cellSize / 2;
    const strokeY = fy + cellSize / 2;
    const strokeSize = 6 * cellSize;

    ctx.strokeStyle = outerColor;
    ctx.lineWidth = cellSize;

    // Outer frame
    if (options.finderOuterStyle === "square") {
      ctx.beginPath();
      ctx.rect(strokeX, strokeY, strokeSize, strokeSize);
      ctx.stroke();
    } else if (options.finderOuterStyle === "rounded") {
      ctx.beginPath();
      drawRoundedRect(ctx, strokeX, strokeY, strokeSize, strokeSize, cellSize * 1.5);
      ctx.stroke();
    } else if (options.finderOuterStyle === "circle") {
      ctx.beginPath();
      ctx.arc(fx + 3.5 * cellSize, fy + 3.5 * cellSize, 3 * cellSize, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Inner Dot
    const dotX = fx + 2 * cellSize;
    const dotY = fy + 2 * cellSize;
    const dotSize = 3 * cellSize;

    ctx.fillStyle = innerColor;

    if (options.finderInnerStyle === "square") {
      ctx.fillRect(dotX, dotY, dotSize, dotSize);
    } else if (options.finderInnerStyle === "rounded") {
      ctx.beginPath();
      drawRoundedRect(ctx, dotX, dotY, dotSize, dotSize, cellSize * 0.8);
      ctx.fill();
    } else if (options.finderInnerStyle === "circle") {
      ctx.beginPath();
      ctx.arc(fx + 3.5 * cellSize, fy + 3.5 * cellSize, 1.5 * cellSize, 0, 2 * Math.PI);
      ctx.fill();
    } else if (options.finderInnerStyle === "diamond") {
      ctx.beginPath();
      ctx.moveTo(fx + 3.5 * cellSize, dotY);
      ctx.lineTo(fx + 5 * cellSize, fy + 3.5 * cellSize);
      ctx.lineTo(fx + 3.5 * cellSize, fy + 5 * cellSize);
      ctx.lineTo(dotX, fy + 3.5 * cellSize);
      ctx.closePath();
      ctx.fill();
    }
  };

  drawFinderPattern(0, 0); // TL
  drawFinderPattern(0, matrixSize - 7); // TR
  drawFinderPattern(matrixSize - 7, 0); // BL

  // Draw Center Logo
  if (options.logoImageEl) {
    const cx = options.size / 2;
    const cy = options.size / 2;
    const logoPx = options.size * (options.logoSize / 100);

    let drawW = logoPx;
    let drawH = logoPx;
    if (options.logoImageEl.width > options.logoImageEl.height) {
      drawH = logoPx * (options.logoImageEl.height / options.logoImageEl.width);
    } else {
      drawW = logoPx * (options.logoImageEl.width / options.logoImageEl.height);
    }

    const lx = cx - drawW / 2;
    const ly = cy - drawH / 2;
    const padding = 6;

    // Background shapes behind logo
    if (options.logoBgShape !== "none") {
      ctx.fillStyle = options.logoBgColor;
      const bgX = cx - drawW / 2 - padding;
      const bgY = cy - drawH / 2 - padding;
      const bgW = drawW + 2 * padding;
      const bgH = drawH + 2 * padding;

      if (options.logoBgShape === "circle") {
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(drawW, drawH) / 2 + padding, 0, 2 * Math.PI);
        ctx.fill();
      } else if (options.logoBgShape === "rounded") {
        ctx.beginPath();
        drawRoundedRect(ctx, bgX, bgY, bgW, bgH, 8);
        ctx.fill();
      } else if (options.logoBgShape === "square") {
        ctx.fillRect(bgX, bgY, bgW, bgH);
      }

      // Border stroke
      if (options.logoBorderWidth > 0) {
        ctx.strokeStyle = options.logoBorderColor;
        ctx.lineWidth = options.logoBorderWidth;

        if (options.logoBgShape === "circle") {
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(drawW, drawH) / 2 + padding, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (options.logoBgShape === "rounded") {
          ctx.beginPath();
          drawRoundedRect(ctx, bgX, bgY, bgW, bgH, 8);
          ctx.stroke();
        } else if (options.logoBgShape === "square") {
          ctx.beginPath();
          ctx.rect(bgX, bgY, bgW, bgH);
          ctx.stroke();
        }
      }
    }

    // Logo image rendering with clip path
    ctx.save();
    if (options.logoShape === "circle") {
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(drawW, drawH) / 2, 0, 2 * Math.PI);
      ctx.clip();
    } else if (options.logoShape === "rounded") {
      ctx.beginPath();
      drawRoundedRect(ctx, lx, ly, drawW, drawH, 6);
      ctx.clip();
    }

    ctx.drawImage(options.logoImageEl, lx, ly, drawW, drawH);
    ctx.restore();
  }
}

interface SvgOptions {
  size: number;
  margin: number;
  bgColor: string;
  fgColor: string;
  fgColorEnd: string;
  fgType: "solid" | "linear" | "radial";
  gradientDirection: "horizontal" | "vertical" | "diagonal" | "radial";
  dotStyle: "square" | "circle" | "rounded" | "diamond" | "fluid";
  finderOuterStyle: "square" | "rounded" | "circle";
  finderInnerStyle: "square" | "rounded" | "circle" | "diamond";
  hasCustomFinders: boolean;
  finderOuterColor: string;
  finderInnerColor: string;
  level: "L" | "M" | "Q" | "H";
  logoImageSrc: string | null;
  logoWidthHeight: { width: number; height: number } | null;
  logoSize: number;
  clearLogoBg: boolean;
  logoShape: "none" | "rounded" | "circle";
  logoBgShape: "none" | "square" | "rounded" | "circle";
  logoBgColor: string;
  logoBorderWidth: number;
  logoBorderColor: string;
}

function generateCustomSVG(text: string, options: SvgOptions): string {
  let qr;
  try {
    qr = QRCode.create(text, { errorCorrectionLevel: options.level });
  } catch (err) {
    console.error("QR SVG creation failure:", err);
    return "";
  }

  const matrixSize = qr.modules.size;
  const cellSize = options.size / (matrixSize + 2 * options.margin);
  const marginPx = options.margin * cellSize;

  const qrStartX = marginPx;
  const qrStartY = marginPx;
  const qrWidth = matrixSize * cellSize;
  const qrHeight = matrixSize * cellSize;

  let defs = "";
  let fillAttr = options.fgColor;

  if (options.fgType !== "solid") {
    fillAttr = "url(#qr-grad)";
    if (options.fgType === "linear") {
      let x1 = "0%", y1 = "0%", x2 = "100%", y2 = "0%";
      if (options.gradientDirection === "vertical") {
        x1 = "0%"; y1 = "0%"; x2 = "0%"; y2 = "100%";
      } else if (options.gradientDirection === "diagonal") {
        x1 = "0%"; y1 = "0%"; x2 = "100%"; y2 = "100%";
      }
      defs += `  <linearGradient id="qr-grad" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
    <stop offset="0%" stop-color="${options.fgColor}" />
    <stop offset="100%" stop-color="${options.fgColorEnd}" />
  </linearGradient>\n`;
    } else if (options.fgType === "radial") {
      defs += `  <radialGradient id="qr-grad" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="${options.fgColor}" />
    <stop offset="100%" stop-color="${options.fgColorEnd}" />
  </radialGradient>\n`;
    }
  }

  const outerColor = options.hasCustomFinders ? options.finderOuterColor : fillAttr;
  const innerColor = options.hasCustomFinders ? options.finderInnerColor : fillAttr;

  if (options.logoImageSrc && options.logoWidthHeight) {
    const cx = options.size / 2;
    const cy = options.size / 2;
    const logoPx = options.size * (options.logoSize / 100);

    let drawW = logoPx;
    let drawH = logoPx;
    if (options.logoWidthHeight.width > options.logoWidthHeight.height) {
      drawH = logoPx * (options.logoWidthHeight.height / options.logoWidthHeight.width);
    } else {
      drawW = logoPx * (options.logoWidthHeight.width / options.logoWidthHeight.height);
    }

    const lx = cx - drawW / 2;
    const ly = cy - drawH / 2;

    if (options.logoShape === "circle") {
      defs += `  <clipPath id="logo-clip">
    <circle cx="${cx}" cy="${cy}" r="${Math.min(drawW, drawH) / 2}" />
  </clipPath>\n`;
    } else if (options.logoShape === "rounded") {
      defs += `  <clipPath id="logo-clip">
    <rect x="${lx}" y="${ly}" width="${drawW}" height="${drawH}" rx="6" ry="6" />
  </clipPath>\n`;
    }
  }

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${options.size} ${options.size}" width="${options.size}" height="${options.size}">\n`;
  if (defs) {
    svgContent += `<defs>\n${defs}</defs>\n`;
  }

  // Background
  svgContent += `  <rect width="100%" height="100%" fill="${options.bgColor}" />\n`;

  // Finder check helpers
  const isFinder = (r: number, c: number) => {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= matrixSize - 7) return true;
    if (r >= matrixSize - 7 && c < 7) return true;
    return false;
  };

  const logoModules = Math.ceil(matrixSize * (options.logoSize / 100));
  const logoStart = Math.floor((matrixSize - logoModules) / 2);
  const logoEnd = logoStart + logoModules;

  const isLogoCleared = (r: number, c: number) => {
    if (!options.logoImageSrc || !options.clearLogoBg) return false;
    return r >= logoStart && r < logoEnd && c >= logoStart && c < logoEnd;
  };

  const isActive = (r: number, c: number) => {
    if (r < 0 || r >= matrixSize || c < 0 || c >= matrixSize) return false;
    if (isFinder(r, c)) return false;
    if (isLogoCleared(r, c)) return false;
    return qr.modules.get(r, c) === 1;
  };

  // Draw data modules
  svgContent += `  <g fill="${fillAttr}">\n`;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isFinder(r, c)) continue;
      if (isLogoCleared(r, c)) continue;

      if (qr.modules.get(r, c) === 1) {
        const x = marginPx + c * cellSize;
        const y = marginPx + r * cellSize;

        if (options.dotStyle === "square") {
          svgContent += `    <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" />\n`;
        } else if (options.dotStyle === "circle") {
          svgContent += `    <circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${cellSize * 0.45}" />\n`;
        } else if (options.dotStyle === "rounded") {
          svgContent += `    <rect x="${x + cellSize * 0.05}" y="${y + cellSize * 0.05}" width="${cellSize * 0.9}" height="${cellSize * 0.9}" rx="${cellSize * 0.35}" ry="${cellSize * 0.35}" />\n`;
        } else if (options.dotStyle === "diamond") {
          const points = `${x + cellSize / 2},${y} ${x + cellSize},${y + cellSize / 2} ${x + cellSize / 2},${y + cellSize} ${x},${y + cellSize / 2}`;
          svgContent += `    <polygon points="${points}" />\n`;
        } else if (options.dotStyle === "fluid") {
          const hasTop = isActive(r - 1, c);
          const hasBottom = isActive(r + 1, c);
          const hasLeft = isActive(r, c - 1);
          const hasRight = isActive(r, c + 1);

          const radius = cellSize * 0.5;
          const rTL = hasTop || hasLeft ? 0 : radius;
          const rTR = hasTop || hasRight ? 0 : radius;
          const rBL = hasBottom || hasLeft ? 0 : radius;
          const rBR = hasBottom || hasRight ? 0 : radius;

          const path = `M ${x + rTL} ${y} ` +
                       `L ${x + cellSize - rTR} ${y} ` +
                       `A ${rTR} ${rTR} 0 0 1 ${x + cellSize} ${y + rTR} ` +
                       `L ${x + cellSize} ${y + cellSize - rBR} ` +
                       `A ${rBR} ${rBR} 0 0 1 ${x + cellSize - rBR} ${y + cellSize} ` +
                       `L ${x + rBL} ${y + cellSize} ` +
                       `A ${rBL} ${rBL} 0 0 1 ${x} ${y + cellSize - rBL} ` +
                       `L ${x} ${y + rTL} ` +
                       `A ${rTL} ${rTL} 0 0 1 ${x + rTL} ${y} Z`;
          svgContent += `    <path d="${path}" />\n`;
        }
      }
    }
  }
  svgContent += `  </g>\n`;

  // Draw Finders
  const writeFinderPattern = (rOffset: number, cOffset: number) => {
    const fx = marginPx + cOffset * cellSize;
    const fy = marginPx + rOffset * cellSize;
    const fSize = 7 * cellSize;

    const strokeX = fx + cellSize / 2;
    const strokeY = fy + cellSize / 2;
    const strokeSize = 6 * cellSize;

    let finderOuterPath = "";
    if (options.finderOuterStyle === "square") {
      finderOuterPath = `<rect x="${strokeX}" y="${strokeY}" width="${strokeSize}" height="${strokeSize}" stroke="${outerColor}" stroke-width="${cellSize}" fill="none" />`;
    } else if (options.finderOuterStyle === "rounded") {
      finderOuterPath = `<rect x="${strokeX}" y="${strokeY}" width="${strokeSize}" height="${strokeSize}" rx="${cellSize * 1.5}" ry="${cellSize * 1.5}" stroke="${outerColor}" stroke-width="${cellSize}" fill="none" />`;
    } else if (options.finderOuterStyle === "circle") {
      finderOuterPath = `<circle cx="${fx + 3.5 * cellSize}" cy="${fy + 3.5 * cellSize}" r="${3 * cellSize}" stroke="${outerColor}" stroke-width="${cellSize}" fill="none" />`;
    }

    const dotX = fx + 2 * cellSize;
    const dotY = fy + 2 * cellSize;
    const dotSize = 3 * cellSize;

    let finderInnerPath = "";
    if (options.finderInnerStyle === "square") {
      finderInnerPath = `<rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" fill="${innerColor}" />`;
    } else if (options.finderInnerStyle === "rounded") {
      finderInnerPath = `<rect x="${dotX}" y="${dotY}" width="${dotSize}" height="${dotSize}" rx="${cellSize * 0.8}" ry="${cellSize * 0.8}" fill="${innerColor}" />`;
    } else if (options.finderInnerStyle === "circle") {
      finderInnerPath = `<circle cx="${fx + 3.5 * cellSize}" cy="${fy + 3.5 * cellSize}" r="${1.5 * cellSize}" fill="${innerColor}" />`;
    } else if (options.finderInnerStyle === "diamond") {
      const points = `${fx + 3.5 * cellSize},${dotY} ${fx + 5 * cellSize},${fy + 3.5 * cellSize} ${fx + 3.5 * cellSize},${fy + 5 * cellSize} ${dotX},${fy + 3.5 * cellSize}`;
      finderInnerPath = `<polygon points="${points}" fill="${innerColor}" />`;
    }

    return `  <!-- Finder -->\n  <g>\n    ${finderOuterPath}\n    ${finderInnerPath}\n  </g>\n`;
  };

  svgContent += writeFinderPattern(0, 0);
  svgContent += writeFinderPattern(0, matrixSize - 7);
  svgContent += writeFinderPattern(matrixSize - 7, 0);

  // Logo in SVG
  if (options.logoImageSrc && options.logoWidthHeight) {
    const cx = options.size / 2;
    const cy = options.size / 2;
    const logoPx = options.size * (options.logoSize / 100);

    let drawW = logoPx;
    let drawH = logoPx;
    if (options.logoWidthHeight.width > options.logoWidthHeight.height) {
      drawH = logoPx * (options.logoWidthHeight.height / options.logoWidthHeight.width);
    } else {
      drawW = logoPx * (options.logoWidthHeight.width / options.logoWidthHeight.height);
    }

    const lx = cx - drawW / 2;
    const ly = cy - drawH / 2;
    const padding = 6;

    if (options.logoBgShape !== "none") {
      const bgX = cx - drawW / 2 - padding;
      const bgY = cy - drawH / 2 - padding;
      const bgW = drawW + 2 * padding;
      const bgH = drawH + 2 * padding;

      let borderAttr = "";
      if (options.logoBorderWidth > 0) {
        borderAttr = ` stroke="${options.logoBorderColor}" stroke-width="${options.logoBorderWidth}"`;
      }

      if (options.logoBgShape === "circle") {
        svgContent += `  <circle cx="${cx}" cy="${cy}" r="${Math.max(drawW, drawH) / 2 + padding}" fill="${options.logoBgColor}"${borderAttr} />\n`;
      } else if (options.logoBgShape === "rounded") {
        svgContent += `  <rect x="${bgX}" y="${bgY}" width="${bgW}" height="${bgH}" rx="8" ry="8" fill="${options.logoBgColor}"${borderAttr} />\n`;
      } else if (options.logoBgShape === "square") {
        svgContent += `  <rect x="${bgX}" y="${bgY}" width="${bgW}" height="${bgH}" fill="${options.logoBgColor}"${borderAttr} />\n`;
      }
    }

    const clipAttr = (options.logoShape !== "none") ? ` clip-path="url(#logo-clip)"` : "";
    svgContent += `  <image href="${options.logoImageSrc}" x="${lx}" y="${ly}" width="${drawW}" height="${drawH}"${clipAttr} />\n`;
  }

  svgContent += `</svg>`;
  return svgContent;
}
