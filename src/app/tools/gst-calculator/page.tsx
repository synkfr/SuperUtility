"use client";

import React from "react";
import GstCalculator from "@/components/GstCalculator";
import pageStyles from "@/app/page.module.css";

export default function GstCalculatorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>GST Calculator</h1>
      <p className={pageStyles.headerSubtitle}>Calculate Goods & Services Tax (GST) in or out, and evaluate CGST, SGST, and IGST breakdowns instantly.</p>
      
      <GstCalculator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Indian Goods & Services Tax (GST)
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first <strong>GST Calculator</strong> tailored for business invoicing, billing, and retail pricing. GST is a consolidated destination-based tax levied on the manufacture, sale, and consumption of goods and services.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          In India's tax regime, intra-state transactions split the GST equally into Central GST (CGST) and State GST (SGST), whereas inter-state trade maps the full tax amount to Integrated GST (IGST).
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is inclusive vs exclusive GST?</h3>
            <p className={pageStyles.seoCardText}>
              - <strong>Exclusive (Add GST)</strong>: Base price excludes tax. Total = `Base * (1 + rate/100)`.
              - <strong>Inclusive (Remove GST)</strong>: Base price already contains tax. Net Price = `Base / (1 + rate/100)`, with the remainder being tax.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are CGST, SGST, and IGST components calculated?</h3>
            <p className={pageStyles.seoCardText}>
              For intra-state sales, the total tax is divided equally (50% each) into Central and State government coffers (CGST and SGST). For inter-state sales, the entire tax value goes directly to IGST.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
