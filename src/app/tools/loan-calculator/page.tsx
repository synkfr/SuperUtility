"use client";

import React from "react";
import LoanCalculator from "@/components/LoanCalculator";
import pageStyles from "@/app/page.module.css";

export default function LoanCalculatorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>EMI & Loan Calculator</h1>
      <p className={pageStyles.headerSubtitle}>Calculate monthly loan EMI payments, total interest costs, and inspect detailed yearly amortization schedules.</p>
      
      <LoanCalculator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Loan Amortization & EMI Payments
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an <strong>EMI & Loan Calculator</strong> built to let you evaluate credit offers without sharing financial figures with bank servers. EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          The math relies on a standard reducing balance interest rate formula. With each monthly payment, a portion goes toward reducing the principal loan balance, and the remainder goes toward interest charges. Over time, the principal reduction increases, and interest costs shrink.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the mathematical formula for EMI?</h3>
            <p className={pageStyles.seoCardText}>
              EMI is computed using: `EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)`, where `P` is the principal amount, `r` is the monthly interest rate (annual rate / 12 / 100), and `n` is the tenure in months.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is an amortization schedule?</h3>
            <p className={pageStyles.seoCardText}>
              An amortization schedule is an exhaustive table showing exactly how much of your monthly payments go toward interest vs reducing your core principal balance, detailing the remaining outstanding balances over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
