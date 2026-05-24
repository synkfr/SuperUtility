"use client";

import React from "react";
import WeightConverter from "@/components/WeightConverter";
import pageStyles from "@/app/page.module.css";

export default function WeightConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Weight & Mass Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert weights in real-time between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones.
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

      <WeightConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Weight & Mass Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an interactive, local <strong>Weight & Mass Converter</strong> designed to convert weights instantly. Our client-side architecture guarantees that all weight entries are calculated entirely in browser memory.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          This converter supports standard international units, including kilograms, grams, metric tonnes, as well as traditional US/UK systems like pounds (lbs), ounces (oz), and stones (st). Perfect for recipes, scientific calculations, parcel shipping, or fitness tracking.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are the conversion rate standards?</h3>
            <p className={pageStyles.seoCardText}>
              We use NIST (National Institute of Standards and Technology) standard mass constants, including the exact international pound definition of 0.45359237 kilograms, to ensure highly accurate conversions.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does this tool process data on a server?</h3>
            <p className={pageStyles.seoCardText}>
              No, all weight and mass conversions execute locally inside your browser. No files, values, or metrics ever leave your machine, ensuring complete privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
