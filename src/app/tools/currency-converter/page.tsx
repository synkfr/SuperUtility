"use client";

import React from "react";
import CurrencyConverter from "@/components/CurrencyConverter";
import pageStyles from "@/app/page.module.css";

export default function CurrencyConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Currency Converter</h1>
      <p className={pageStyles.headerSubtitle}>Convert globally traded currencies offline with preloaded standard base rates or custom exchange ratios.</p>
      
      <CurrencyConverter />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Offline-First Currency Conversions
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a completely **Offline Currency Converter** designed for private budgeting, corporate accounting calculations, or travel cost estimations. Rather than forcing you to sync your internal financials or invoices with external tracking systems, everything executes locally in-browser.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          We preload standard, representative exchange rates relative to the US Dollar (USD). Since global currency rates fluctuate constantly, we provide a complete manual rate editor so you can easily override the exchange values, assuring 100% accurate conversion margins for your custom trade transactions.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I convert currencies without internet?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! SuperUtility loads representative base exchange rates directly in the client bundle. Once the site is opened, you can completely disconnect from the web and calculate precise conversions on your local device.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are custom exchange rates specified?</h3>
            <p className={pageStyles.seoCardText}>
              Simply check the "Use Custom Conversion Rate" checkbox to input your precise rate multiplier. Additionally, you can edit the global table of rates below to customize how rates map relatively to the USD.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
