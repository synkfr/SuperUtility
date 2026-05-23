"use client";

import React from "react";
import BcryptGenerator from "@/components/BcryptGenerator";
import pageStyles from "@/app/page.module.css";

export default function BcryptGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Bcrypt Hash Generator & Verifier</h1>
      <p className={pageStyles.headerSubtitle}>Generate secure Bcrypt hashes with customizable salt rounds or verify password matching locally.</p>
      
      <BcryptGenerator />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Adaptive Bcrypt Hashing
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a local, offline-first **Bcrypt Hashing** interface. Bcrypt is an adaptive password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. It incorporates a work factor parameter (salt rounds) that allows it to scale in computation difficulty.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          This adaptability makes it highly resistant to hardware acceleration attacks (such as custom FPGA or GPU brute-force rigs) because verifying a password remains computationally expensive, protecting backend records from leak exploitation.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are salt rounds / work factor?</h3>
            <p className={pageStyles.seoCardText}>
              The work factor (salt rounds) determines how many iterations the Blowfish cipher performs. Increments raise calculation times exponentially (`2^rounds`). Rounds of 10 or 12 strike an ideal balance between validation speed and hardware crack resistance.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is hashing conducted securely?</h3>
            <p className={pageStyles.seoCardText}>
              Yes. Everything is handled client-side in JS compiled inside your browser. No strings are sent over HTTP/HTTPS connections, making it entirely secure to test keys or prepare hashes for offline configurations.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does verification work?</h3>
            <p className={pageStyles.seoCardText}>
              Bcrypt incorporates the generated unique salt directly inside the output string. The verifier parses the salt parameters from the hash, hashes the plain text candidate with that same salt, and compares outputs to determine validity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
