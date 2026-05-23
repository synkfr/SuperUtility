"use client";

import React from "react";
import PercentageCalculator from "@/components/PercentageCalculator";
import pageStyles from "@/app/page.module.css";

export default function PercentageCalculatorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Percentage Calculator</h1>
      <p className={pageStyles.headerSubtitle}>Compute percentages, fractional shares, and rate changes in real-time with easy-to-use inputs.</p>
      
      <PercentageCalculator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Percentage Calculations
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a comprehensive **Percentage Calculator** containing three essential mathematical layouts that humans and developers interact with daily: finding custom ratios, determining totals proportions, and tracking percentage gains or losses.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Everything executes in-browser, preventing your confidential business statistics, marketing conversion numbers, or academic scoring from hitting any cloud servers.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is percentage change?</h3>
            <p className={pageStyles.seoCardText}>
              Percentage change calculates the proportional difference between an initial value and a final value: `((Final - Initial) / Initial) * 100`. It determines growth rates, discount percentages, or performance metrics.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How secure is my numerical input?</h3>
            <p className={pageStyles.seoCardText}>
              Your numerical inputs are 100% private. SuperUtility performs standard Javascript arithmetic calculations entirely inside your browser, leaving no digital footprint on any external network.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
