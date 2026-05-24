"use client";

import React from "react";
import HmacGenerator from "@/components/HmacGenerator";
import pageStyles from "@/app/page.module.css";

export default function HmacGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>HMAC Generator</h1>
      <p className={pageStyles.headerSubtitle}>Calculate secure Keyed-Hash Message Authentication Codes (HMAC) in-browser with customizable security keys.</p>
      
      <HmacGenerator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Keyed-Hash Message Authentication Codes
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a <strong>Keyed-HMAC Generator</strong> tool. HMAC is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It simultaneously verifies both the data integrity and the authenticity of a message.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Any cryptographic hash function, such as MD5, SHA-1, SHA-256, or SHA-512, may be used in the calculation of an HMAC. The cryptographic strength of the HMAC depends upon the cryptographic strength of the underlying hash function, the size of its hash output, and the size and quality of the key.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What makes HMAC different from normal hashes?</h3>
            <p className={pageStyles.seoCardText}>
              A normal hash (like SHA-256) takes only a message as input. An attacker could tamper with a message and re-calculate the hash. An HMAC requires a secret key. Without knowing the secret key, it is impossible to calculate a matching hash, ensuring authenticity.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How secure is the secret key in SuperUtility?</h3>
            <p className={pageStyles.seoCardText}>
              Your secret key is completely secure. Because SuperUtility is an offline-first app running 100% locally in your browser sandbox, your secret keys and payload messages are never transmitted over the network or saved anywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
