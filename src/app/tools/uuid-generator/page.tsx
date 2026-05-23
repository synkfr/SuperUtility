"use client";

import React from "react";
import UuidGenerator from "@/components/UuidGenerator";
import pageStyles from "@/app/page.module.css";

export default function UuidGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>UUID Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate RFC 4122 v1 and v4 compliant unique bulk identifiers locally.</p>
      
      {/* 1. Interactive Tool Module */}
      <UuidGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility UUID Generator
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an industrial-grade bulk UUID (Universally Unique Identifier) generator. A UUID is a 128-bit label used to identify information in computer systems without relying on a central authority. SuperUtility fully complies with the **RFC 4122** specification, offering both time-based **Version 1** and fully random **Version 4** formats.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our generator features rich customization, allowing you to choose between uppercase or lowercase formatting, toggle hyphens on or off, define exact generation batch sizes (up to 50 in a single click), and instantly export your dataset into a standard flat text file for developer scripting or database seeding.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between UUID v1 and v4?</h3>
            <p className={pageStyles.seoCardText}>
              • **UUID Version 1**: Generated using a combination of the current system timestamp, clock sequence numbers, and your device's MAC address. It guarantees chronological uniqueness but exposes timestamp details in the string.
              <br />
              • **UUID Version 4**: Generated using pure, cryptographically secure pseudo-random values. It provides complete anonymity and extreme entropy, making it the industry standard for modern application keys.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the probability of a UUID v4 collision?</h3>
            <p className={pageStyles.seoCardText}>
              Extremely close to zero. A UUID v4 contains 122 bits of pure randomness, meaning there are 2^122 (or approximately 5.3 x 10^36) possible combinations. To have a 50% chance of a single collision, you would need to generate 1 billion UUIDs *every second* for 85 consecutive years.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I generate bulk identifiers without internet?</h3>
            <p className={pageStyles.seoCardText}>
              Yes. All identifier calculations occur entirely client-side using pure JavaScript browser loops. None of the generated strings are sent to our servers or stored in any database, meaning your identifiers are entirely yours and completely secure.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Are these UUIDs safe for primary keys in databases?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, absolutely! Since our random source uses the secure Web Cryptography API (<code className={pageStyles.seoCode}>window.crypto</code>), the keys are completely cryptographically sound, making them perfect for MongoDB, PostgreSQL, MySQL, or Redis primary record keys.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Format Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          UUID v1 and v4 Format Comparison Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>UUID Version 4 (Random CSPRNG)</h3>
            <p className={pageStyles.seoCardText}>The most common format for general-purpose application keys:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Standard Lowercase with hyphens
f81d4fae-7dec-11d0-a765-00a0c91e6bf6

// Uppercase Format
F81D4FAE-7DEC-11D0-A765-00A0C91E6BF6

// Hyphenless Format (32-Character Hex string)
f81d4fae7dec11d0a76500a0c91e6bf6`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>UUID Version 1 (Time-Based)</h3>
            <p className={pageStyles.seoCardText}>Ideal if you want your keys to have a built-in chronological sorting component:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Time-based sorted UUID string
1ec8f700-1c2a-11ed-b57d-31776c5bfae7`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
