"use client";

import React, { useState } from "react";
import styles from "./SharedStyles.module.css";

export default function ProfitCalculator() {
  const [activeTab, setActiveTab] = useState<"discount" | "profit">("discount");

  // Discount states
  const [originalPrice, setOriginalPrice] = useState("120");
  const [discountPercent, setDiscountPercent] = useState("20");

  // Profit Margin states
  const [cost, setCost] = useState("100");
  const [revenue, setRevenue] = useState("150");

  // Discount calculations
  const pOriginal = parseFloat(originalPrice);
  const pDiscount = parseFloat(discountPercent);
  let salePrice = 0;
  let savings = 0;

  if (!isNaN(pOriginal) && !isNaN(pDiscount) && pOriginal >= 0 && pDiscount >= 0) {
    savings = (pOriginal * pDiscount) / 100;
    salePrice = pOriginal - savings;
  }

  // Profit Margin calculations
  const pCost = parseFloat(cost);
  const pRevenue = parseFloat(revenue);
  let grossProfit = 0;
  let markupPercent = 0;
  let marginPercent = 0;

  if (!isNaN(pCost) && !isNaN(pRevenue) && pCost >= 0 && pRevenue >= 0) {
    grossProfit = pRevenue - pCost;
    if (pCost > 0) {
      markupPercent = (grossProfit / pCost) * 100;
    }
    if (pRevenue > 0) {
      marginPercent = (grossProfit / pRevenue) * 100;
    }
  }

  const handleLoadSample = () => {
    if (activeTab === "discount") {
      setOriginalPrice("249");
      setDiscountPercent("35");
    } else {
      setCost("75");
      setRevenue("120");
    }
  };

  return (
    <div className={styles.container}>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1.5px solid var(--border-dark)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveTab("discount")}
          className={styles.sampleBtn}
          style={{
            backgroundColor: activeTab === "discount" ? "var(--lime-200)" : "transparent",
            borderColor: activeTab === "discount" ? "var(--lime-400)" : "var(--border-dark)",
            fontSize: "0.85rem",
            padding: "8px 16px",
          }}
        >
          Discount Calculator
        </button>
        <button
          onClick={() => setActiveTab("profit")}
          className={styles.sampleBtn}
          style={{
            backgroundColor: activeTab === "profit" ? "var(--lime-200)" : "transparent",
            borderColor: activeTab === "profit" ? "var(--lime-400)" : "var(--border-dark)",
            fontSize: "0.85rem",
            padding: "8px 16px",
          }}
        >
          Profit Margin & Markup
        </button>
      </div>

      <div className={styles.workspace}>
        {activeTab === "discount" ? (
          <>
            {/* Input Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Discount Details</span>
                <button onClick={handleLoadSample} className={styles.sampleBtn}>
                  Load Sample Values
                </button>
              </div>

              <div className={styles.grid2}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Original Price ($)
                  </span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 120"
                    className={styles.input}
                  />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Discount Percentage (%)
                  </span>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    placeholder="e.g. 20"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Output Summary Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Savings Summary</span>
              </div>

              {salePrice > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ padding: "16px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                      Final Sale Price
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--lime-700)" }}>
                      ${salePrice.toFixed(2).replace(/\.00$/, "")}
                    </div>
                  </div>

                  <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Total Money Saved</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "4px" }}>
                      ${savings.toFixed(2).replace(/\.00$/, "")} ({discountPercent}%)
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Enter original price and discount percentage to calculate final costs.
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Input Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Cost & Selling Price Inputs</span>
                <button onClick={handleLoadSample} className={styles.sampleBtn}>
                  Load Sample Values
                </button>
              </div>

              <div className={styles.grid2}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Cost Price ($)
                  </span>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="e.g. 100"
                    className={styles.input}
                  />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Selling Price / Revenue ($)
                  </span>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="e.g. 150"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Margins breakdown Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>Business Profitability Metrics</span>
              </div>

              {pRevenue > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ padding: "16px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                      Gross Profit Dollars
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--lime-700)" }}>
                      ${grossProfit.toFixed(2).replace(/\.00$/, "")}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Gross Margin (%)
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "4px" }}>
                        {marginPercent.toFixed(2).replace(/\.00$/, "")}%
                      </div>
                    </div>
                    <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Markup Ratio (%)
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "4px" }}>
                        {markupPercent.toFixed(2).replace(/\.00$/, "")}%
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  Provide business parameters to evaluate profit ratios.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
