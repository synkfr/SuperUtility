"use client";

import React from "react";
import SpeedConverter from "@/components/SpeedConverter";
import pageStyles from "@/app/page.module.css";

export default function SpeedConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Speed & Velocity Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert speed values instantly between meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots, and Mach.
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

      <SpeedConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Speed & Velocity Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a beautiful, local <strong>Speed Converter</strong> designed to translate velocity measurements in real-time. Everything happens in your browser, keeping your calculations safe and private.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Convert speed values between metric meters per second (m/s), kilometers per hour (km/h), standard miles per hour (mph), marine knots (kt), and supersonic Mach numbers. Ideal for aviation, physics formulas, travel conversions, shipping logs, and automotive calculations.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a marine knot?</h3>
            <p className={pageStyles.seoCardText}>
              A knot is a unit of speed equal to one nautical mile per hour, which is exactly 1.852 kilometers per hour or approximately 1.1508 miles per hour.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is Mach 1?</h3>
            <p className={pageStyles.seoCardText}>
              Mach 1 represents the local speed of sound. At standard conditions (15 °C at sea level), this is approximately 340.3 meters per second or 1,225 kilometers per hour.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
