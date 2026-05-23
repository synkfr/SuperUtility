"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

interface AmortizationRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);

  const calculateLoan = () => {
    const P = parseFloat(principal);
    const annualR = parseFloat(interestRate);
    let N = parseFloat(tenure);

    if (isNaN(P) || isNaN(annualR) || isNaN(N) || P <= 0 || annualR < 0 || N <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setSchedule([]);
      return;
    }

    // Monthly interest rate
    const r = annualR / 12 / 100;
    // Total months
    const n = tenureType === "years" ? N * 12 : N;

    let calculatedEmi = 0;
    if (r === 0) {
      calculatedEmi = P / n;
    } else {
      calculatedEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const calculatedTotalPayment = calculatedEmi * n;
    const calculatedTotalInterest = calculatedTotalPayment - P;

    setEmi(calculatedEmi);
    setTotalPayment(calculatedTotalPayment);
    setTotalInterest(calculatedTotalInterest);

    // Amortization Schedule (Yearly breakdown)
    const yearlySchedule: AmortizationRow[] = [];
    let balance = P;
    let accumulatedPrincipalPaid = 0;
    let accumulatedInterestPaid = 0;
    let monthCounter = 0;
    let yearCounter = 1;

    for (let i = 1; i <= n; i++) {
      const interestForMonth = balance * r;
      const principalForMonth = calculatedEmi - interestForMonth;
      balance -= principalForMonth;

      accumulatedPrincipalPaid += principalForMonth;
      accumulatedInterestPaid += interestForMonth;
      monthCounter++;

      if (monthCounter === 12 || i === n) {
        yearlySchedule.push({
          year: yearCounter,
          principalPaid: Math.round(accumulatedPrincipalPaid),
          interestPaid: Math.round(accumulatedInterestPaid),
          remainingBalance: Math.max(0, Math.round(balance)),
        });
        accumulatedPrincipalPaid = 0;
        accumulatedInterestPaid = 0;
        monthCounter = 0;
        yearCounter++;
      }
    }

    setSchedule(yearlySchedule);
  };

  useEffect(() => {
    calculateLoan();
  }, [principal, interestRate, tenure, tenureType]);

  const handleLoadSample = () => {
    setPrincipal("250000");
    setInterestRate("7.2");
    setTenure("10");
    setTenureType("years");
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Input Parameters Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Loan details</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Load Sample Loan
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Loan Amount (Principal)
              </span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g. 100000"
                className={styles.input}
              />
            </div>

            <div className={styles.grid2}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Annual Interest Rate (%)
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g. 8.5"
                  className={styles.input}
                />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Tenure
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="e.g. 5"
                    className={styles.input}
                    style={{ flex: 1 }}
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as any)}
                    className={styles.select}
                    style={{ width: "110px" }}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Repayment Summary</span>
          </div>

          {emi > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "16px", backgroundColor: "var(--lime-50)", border: "1.5px solid var(--lime-200)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--lime-700)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Monthly EMI Payment
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--lime-700)" }}>
                  ${Math.round(emi).toLocaleString()}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Total Principal</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    ${parseFloat(principal).toLocaleString()}
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Total Interest</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    ${Math.round(totalInterest).toLocaleString()}
                  </div>
                </div>
                <div style={{ padding: "12px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", gridColumn: "span 2" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Total Payment Amount</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    ${Math.round(totalPayment).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Input valid loan principal, interest rate, and tenure values to calculate EMI estimates.
            </div>
          )}
        </div>
      </div>

      {schedule.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Yearly Amortization Schedule</span>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal Paid</th>
                  <th>Interest Paid</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.year}>
                    <td>Year {row.year}</td>
                    <td>${row.principalPaid.toLocaleString()}</td>
                    <td>${row.interestPaid.toLocaleString()}</td>
                    <td>${row.remainingBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
