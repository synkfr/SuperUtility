"use client";

import React from "react";
import RandomString from "@/components/RandomString";
import pageStyles from "@/app/page.module.css";

export default function RandomStringPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Random String Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate multiple bulk cryptographically-secure random strings with custom lengths and character lists.</p>
      
      <RandomString />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Cryptographically-Secure Random Generation
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Random String Generator** built using the browser's built-in Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) interface. Traditional generators rely on math libraries (like `Math.random`) which generate predictable values, making them vulnerable to attack.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our generator taps directly into `window.crypto.getRandomValues`, capturing entropy from operating system seed states. This makes it perfect for generating API tokens, database keys, salt values, temp passwords, or secure identifiers.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a CSPRNG?</h3>
            <p className={pageStyles.seoCardText}>
              A Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) is a random generator with properties that make it secure for cryptography. It ensures generated outputs cannot be predicted based on previous outputs.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I exclude similar characters?</h3>
            <p className={pageStyles.seoCardText}>
              Excluding characters that look identical (like uppercase `I`, lowercase `l`, and digit `1`, or uppercase `O` and digit `0`) prevents readability confusion when humans need to manually write down or type token codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
