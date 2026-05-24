"use client";

import React from "react";
import ColorConverter from "@/components/ColorConverter";
import pageStyles from "@/app/page.module.css";

export default function ColorConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Color Converter</h1>
      <p className={pageStyles.headerSubtitle}>Convert colors dynamically between HEX, RGB, and HSL spaces completely client-side in real-time.</p>
      
      {/* 1. Interactive Tool Module */}
      <ColorConverter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Digital Color Models
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a highly responsive <strong>Color Converter</strong> designed for UI designers, web developer programmers, and content authors. Designing and styling user interfaces requires dealing with multiple technical color representations depending on whether you are working in design editors (like Figma), writing stylesheet variables (CSS), or structuring graphic layers.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our color space encoder supports instantaneous local conversions across three major standard color formats: <strong>Hexadecimal (HEX)</strong> (ideal for compact markup), <strong>Red Green Blue (RGB)</strong> (matching physical hardware display models), and <strong>Hue Saturation Lightness (HSL)</strong> (a more intuitive cylindrical coordinate model aligning with how humans perceive tone values).
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the HSL color model?</h3>
            <p className={pageStyles.seoCardText}>
              HSL stands for <strong>Hue</strong> (the type of color represented as degrees from 0 to 360), <strong>Saturation</strong> (the purity or intensity of the color from 0% to 100%), and <strong>Lightness</strong> (the brightness or white/black balance from 0% to 100%). HSL makes it incredibly easy to create harmonious light and dark variants of a single shade.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the slider panel synchronize?</h3>
            <p className={pageStyles.seoCardText}>
              Every conversion calculation runs client-side inside your browser in less than a millisecond. Adjusting RGB sliders immediately recalculates HSL percentages and updates the Hex value, and vice-versa, maintaining perfect mathematical equivalence.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my clipboard history private?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. We use standard browser `navigator.clipboard` APIs locally on your device. No telemetry or server calls are executed, making sure your copied palettes remain completely secure.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it support Alpha Transparency?</h3>
            <p className={pageStyles.seoCardText}>
              To provide a streamlined, highly focused conversion environment for standard interface components, this version specializes in core 24-bit opaque HEX, RGB, and HSL spaces.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Color Format Equivalence Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Common Color Mappings</h3>
            <p className={pageStyles.seoCardText}>Standard web color values mapped across formats:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Pure White:
  HEX: #FFFFFF
  RGB: rgb(255, 255, 255)
  HSL: hsl(0, 0%, 100%)

• Deep Black:
  HEX: #000000
  RGB: rgb(0, 0, 0)
  HSL: hsl(0, 0%, 0%)`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Harmonious Brand Tones</h3>
            <p className={pageStyles.seoCardText}>A selection of premium custom color mappings:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Lime Green (SuperUtility Accent):
  HEX: #84CC16
  RGB: rgb(132, 204, 22)
  HSL: hsl(84, 81%, 44%)

• Slate Blue (Primary UI Accent):
  HEX: #2563EB
  RGB: rgb(37, 99, 235)
  HSL: hsl(221, 83%, 53%)`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
