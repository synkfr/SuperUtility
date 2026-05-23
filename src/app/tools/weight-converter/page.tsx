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
        ✨ 100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
      </div>

      <WeightConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Weight & Mass Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an interactive, local **Weight & Mass Converter** designed to convert weights instantly. Our client-side architecture guarantees that all weight entries are calculated entirely in browser memory.
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
