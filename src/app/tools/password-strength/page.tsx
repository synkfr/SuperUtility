"use client";

import React from "react";
import PasswordStrength from "@/components/PasswordStrength";
import pageStyles from "@/app/page.module.css";

export default function PasswordStrengthPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Password Strength Checker</h1>
      <p className={pageStyles.headerSubtitle}>Analyze password complexity, calculate cryptographic entropy, and estimate brute-force cracking resistance instantly.</p>
      
      <PasswordStrength />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Cryptographic Password Entropy
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a secure <strong>Password Strength Checker</strong> that relies on mathematical formulas to evaluate security rather than arbitrary scoring rules. Cryptographic entropy (measured in bits) defines the total search space a hacker must traverse to guess a password using brute-force algorithms.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Higher entropy indicates a password is more resistant to cracking attempts. For example, a password with 64 bits of entropy takes approximately 18 billion billion attempts to exhaustively search, providing robust security.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are bits of entropy?</h3>
            <p className={pageStyles.seoCardText}>
              Entropy (H) measures password randomness. It is calculated using the formula: `H = L * log2(R)`, where `L` is the length of the password and `R` is the size of the character pool (lowercase, uppercase, numbers, symbols). Higher bits mean superior safety.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my tested password safe?</h3>
            <p className={pageStyles.seoCardText}>
              Yes. SuperUtility computes all password assessments strictly client-side inside your browser sandbox. Unlike central rating websites, we never transmit your typing over the network, guaranteeing absolute immunity against server sniffing.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a secure entropy threshold?</h3>
            <p className={pageStyles.seoCardText}>
              - Under 40 bits: Weak (guessable in seconds).
              - 40 to 60 bits: Fair (vulnerable to fast GPU rigs).
              - 60 to 80 bits: Strong (secure for standard logins).
              - Over 80 bits: Excellent (virtually uncrackable).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
