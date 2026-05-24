"use client";

import React from "react";
import LengthConverter from "@/components/LengthConverter";
import pageStyles from "@/app/page.module.css";

export default function LengthConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Height & Length Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert values instantly between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.
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
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", marginTop: "-2px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
      </div>

      <LengthConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Height and Distance Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a powerful and secure <strong>Length and Distance Converter</strong> designed to handle all your height, distance, and dimensions calculations instantly inside your browser. By carrying out the calculations client-side using JavaScript, the conversion results are computed on your device, keeping your inputs private.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Whether you need to convert your height from feet and inches to centimeters for a form, calculate distances in miles and kilometers, or scale detailed dimensions in yards and meters, our tool provides extremely high precision.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How accurate are the height conversions?</h3>
            <p className={pageStyles.seoCardText}>
              Our length converter utilizes standard IEEE 754 floating-point mathematics for metric and imperial scaling. Conversions are accurate to up to 6 decimal places, ensuring highly precise height calculations.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Are there any fees or limitations?</h3>
            <p className={pageStyles.seoCardText}>
              No, absolutely not. All length and measurement tools on SuperUtility are 100% free to use. There are no paid upgrades, no subscription requirements, and no daily conversion limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
