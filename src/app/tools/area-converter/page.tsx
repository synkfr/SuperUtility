"use client";

import React from "react";
import AreaConverter from "@/components/AreaConverter";
import pageStyles from "@/app/page.module.css";

export default function AreaConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Area Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert area values between square meters, square feet, square kilometers, square miles, acres, and hectares.
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

      <AreaConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Area Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a beautiful, local <strong>Area Converter</strong> that helps you translate land, property, or construction dimensions instantly. 100% of the conversions are calculated client-side in the browser, providing instantaneous results with complete privacy.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Supports essential units: square meters, square centimeters, square feet, square yards, square miles, acres, and hectares. Excellent for real estate agents, landscape architects, home renovators, or engineering students.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How is land area calculated?</h3>
            <p className={pageStyles.seoCardText}>
              We use precise mathematical conversion factors for land measurement (e.g. 1 acre is exactly 4,046.8564224 square meters, and 1 hectare is exactly 10,000 square meters) to guarantee conversion accuracy.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is it completely free to use?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, all calculator and conversion tools on SuperUtility are completely free with absolutely no paywalls, premium tiers, or registration requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
