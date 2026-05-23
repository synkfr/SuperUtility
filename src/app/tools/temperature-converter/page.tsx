"use client";

import React from "react";
import TemperatureConverter from "@/components/TemperatureConverter";
import pageStyles from "@/app/page.module.css";

export default function TemperatureConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Temperature Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert temperature readings instantly between Celsius (°C), Fahrenheit (°F), and Kelvin (K).
      </p>

      {/* Free & Privacy Banner */}
      <div 
        style={{
          background: "var(--lime-50)",
          border: "1.5px solid var(--lime-200)",
          borderRadius: "var(--radius-md)",
          padding: "12px 18px",
          color: "var(--lime-800)",
          fontSize: "0.85rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "24px"
        }}
      >
        ✨ 100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
      </div>

      <TemperatureConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Temperature Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a high-precision, client-side **Temperature Converter** designed to translate values between Celsius, Fahrenheit, and Kelvin. The tool runs 100% locally in your web browser.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Temperature formulas use distinct offsets rather than basic multiplication constants. Our converter implements these exact mathematical offsets (e.g. Celsius to Fahrenheit: `(C * 9/5) + 32`, and Celsius to Kelvin: `C + 273.15`) for perfect mathematical conversions.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are the formulas used?</h3>
            <p className={pageStyles.seoCardText}>
              Celsius to Fahrenheit is `(C × 9/5) + 32`. Celsius to Kelvin is `C + 273.15`. Kelvin is an absolute thermodynamic temperature scale with the same magnitude increments as Celsius.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my private data secure?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, all calculations run in your local browser. No values ever touch the cloud, making it completely secure and privacy-friendly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
