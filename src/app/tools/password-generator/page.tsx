"use client";

import React from "react";
import PasswordGenerator from "@/components/PasswordGenerator";
import pageStyles from "@/app/page.module.css";

export default function PasswordGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Password Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate secure random passwords and memorable passphrases locally in-browser.</p>
      
      {/* 1. Interactive Tool Module */}
      <PasswordGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Password Generator
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a highly secure and completely private environment to generate random passwords and memorable passphrases. Unlike other online password checkers and generators that stream your generated text to remote databases, every operation on SuperUtility runs completely locally on your hardware using client-side JavaScript. 
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          You can toggle between a **Random Password** (ideal for database keys, system logins, and absolute security) and a **Memorable Passphrase** (ideal for master passwords and daily logins, using standard English dictionary words joined by custom separators).
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is it safe to generate passwords on this website?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, 100%. All computations occur locally in your browser sandbox. No strings, parameters, or choices are ever transmitted across the network, making it completely immune to server leaks, database breaches, or network interception.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the secure random generation work?</h3>
            <p className={pageStyles.seoCardText}>
              We utilize your browser's native Web Cryptography API (<code className={pageStyles.seoCode}>window.crypto.getRandomValues</code>) to query the operating system's hardware entropy pool. This produces cryptographically secure pseudo-random numbers (CSPRNG) that are mathematically unbiased and impossible to predict.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a passphrase and why is it better?</h3>
            <p className={pageStyles.seoCardText}>
              A passphrase consists of multiple dictionary words combined together (e.g. <code className={pageStyles.seoCode}>correct-horse-battery-staple</code>). Passphrases provide exceptionally high mathematical entropy while remaining incredibly easy for humans to visualize and memorize compared to random strings of symbols.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does the Entropy progress bar represent?</h3>
            <p className={pageStyles.seoCardText}>
              Entropy measures a password's statistical resistance to brute-force cracking, calculated in bits ($E = L \times \log_2 R$, where $L$ is length and $R$ is the size of the character pool). A score above 80 bits is considered mathematically "Excellent" and practically uncrackable.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Format Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Password and Passphrase Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Secure Random Passwords</h3>
            <p className={pageStyles.seoCardText}>Ideal for system root passwords, configuration files, and API tokens:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// 16 Characters with Symbols, Upper, Lower, Numbers
r#8K$mpW9a!Qd5vX  (Excellent Entropy: 96 bits)

// 24 Characters (Highly Complex system key)
z&mQ9$vW2#pX7!rK4@tN8*sL  (Maximum Security: 144 bits)`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Memorable Dictionary Passphrases</h3>
            <p className={pageStyles.seoCardText}>Perfect for master keys, password managers, and device unlock PINs:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// 4-Word Passphrase with hyphen separators
galaxy-vintage-crystal-pocket  (Strong Entropy: 52 bits)

// 5-Word Passphrase with custom separators and capitalization
Timber_Plaza_Echo_Garden_Frost  (Excellent Entropy: 65 bits)`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
