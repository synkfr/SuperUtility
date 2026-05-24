"use client";

import React from "react";
import ProfitCalculator from "@/components/ProfitCalculator";
import pageStyles from "@/app/page.module.css";

export default function ProfitCalculatorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Discount & Profit Margin Calculator</h1>
      <p className={pageStyles.headerSubtitle}>Calculate consumer retail discounts and track business profit margins, markups, and dollar savings instantly.</p>
      
      <ProfitCalculator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Profit Margins, Markups, & Retail Discounts
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a <strong>Discount & Profit Margin Calculator</strong> built for retail business operators, marketing agents, and smart consumers. Understanding the mathematical difference between margin and markup is crucial for setting sustainable sale prices.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          <strong>Gross Margin</strong> represents the percentage of selling price that is profit: `((Price - Cost) / Price) * 100`. <strong>Markup</strong> represents the percentage rate added to cost price to establish the selling price: `((Price - Cost) / Cost) * 100`.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between margin and markup?</h3>
            <p className={pageStyles.seoCardText}>
              Markup is the percentage of cost price added to the cost to find selling price. Margin is the percentage of selling price that represents profit. Margin can never equal or exceed 100%, whereas markup can grow infinitely.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How secure is my financial profiling?</h3>
            <p className={pageStyles.seoCardText}>
              Your business numbers and product costing are 100% private. SuperUtility executes all formulas locally inside your browser, leaving zero trail of proprietary margins on external cloud databases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
