"use client";

import React from "react";
import VolumeConverter from "@/components/VolumeConverter";
import pageStyles from "@/app/page.module.css";

export default function VolumeConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Volume Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert liquid and solid volumes instantly between milliliters, liters, cubic meters, cups, pints, and gallons.
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

      <VolumeConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Volume Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a complete, client-side <strong>Volume Converter</strong> designed to convert capacity measurements in real-time. Everything happens in your browser, keeping your calculations secure and private.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Convert liquid capacity between metric milliliters, liters, cubic meters, and standard US/Imperial units like teaspoons (tsp), tablespoons (tbsp), fluid ounces (fl oz), cups, pints (pt), quarts (qt), and gallons (gal). Ideal for cooking, home brewing, shipping, chemistry experiments, and packaging design.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What standard is used for fluid measurements?</h3>
            <p className={pageStyles.seoCardText}>
              We use standard US Liquid measurements for cups, fluid ounces, pints, quarts, and gallons, which is the most widely referenced system for online culinary and capacity tracking.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it cost anything to convert large values?</h3>
            <p className={pageStyles.seoCardText}>
              No, absolutely not. All converters on SuperUtility are 100% free with no premium locks, paywalls, limits, or signup requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
