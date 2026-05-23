"use client";

import React from "react";
import AgeCalculator from "@/components/AgeCalculator";
import pageStyles from "@/app/page.module.css";

export default function AgeCalculatorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Age Calculator</h1>
      <p className={pageStyles.headerSubtitle}>Calculate your exact age in years, months, and days, discover your zodiac sign, and track birthday countdowns.</p>
      
      <AgeCalculator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Precise Age & Milestone Calculations
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Age Calculator** that computes exact time elapsed between any two calendar dates. Calculating birth differences involves more than simple day counts, since different months have different day totals, and leap years add custom leap days.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our calendar engine resolves all date math and outputs precise years, months, and days alongside totals in weeks, days, and hours to give you a complete picture of your life milestones.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are year and month boundaries resolved?</h3>
            <p className={pageStyles.seoCardText}>
              We track precise boundaries. If your birthday is on a day later than today's calendar day, our system borrows the exact number of days from the previous month and adjusts month and year counters dynamically to prevent calendar offset errors.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my birthdate kept secure?</h3>
            <p className={pageStyles.seoCardText}>
              Yes. Your birthdate represents sensitive personal identifiable information (PII). SuperUtility processes all dates 100% locally. Your birth date is never uploaded, stored, or processed online, guaranteeing absolute compliance with privacy values.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
