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
        ✨ 100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
      </div>

      <VolumeConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Volume Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a complete, client-side **Volume Converter** designed to convert capacity measurements in real-time. Everything happens in your browser, keeping your calculations secure and private.
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
