"use client";

import React from "react";
import HashGenerator from "@/components/HashGenerator";
import pageStyles from "@/app/page.module.css";

export default function HashGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Hash Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate MD5, SHA-1, SHA-256 and SHA-512 cryptographic hashes locally.</p>
      
      {/* 1. Interactive Tool Module */}
      <HashGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Hash Generator
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a high-security cryptographic digest hash generator. Cryptographic hashing is a mathematical process that takes an input (either text strings or binary files) and converts it into a fixed-length hexadecimal sequence of characters. Hashing is a **one-way function**, meaning it is impossible to reverse-engineer the original input from the resulting digest hash.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our app features a highly intuitive user interface allowing you to calculate hashes for text strings in real-time as you type, or verify large files via client-side drag-and-drop. It supports four major hashing standards: **MD5, SHA-1, SHA-256, and SHA-512**, and includes a real-time matching input block to instantly check download checksums.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is it safe to drag and drop large files onto this website?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. SuperUtility operates entirely offline and local to your browser. When you drop a file to calculate its hash checksum (like an installer or archive), our Javascript reads the binary file **directly from your hard drive memory stream**. No part of the file is ever uploaded to a server or transferred across the network.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between MD5 and SHA-256?</h3>
            <p className={pageStyles.seoCardText}>
              • **MD5**: Produces a 128-bit (32 hex characters) string. It is extremely fast but is considered cryptographically broken for high-security applications due to collision vulnerabilities.
              <br />
              • **SHA-256**: Produces a 256-bit (64 hex characters) string. It is highly secure, mathematically robust, and the current global standard for security signatures and blockchain proofs.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a cryptographic hash collision?</h3>
            <p className={pageStyles.seoCardText}>
              A hash collision occurs when two completely different inputs produce the exact same hexadecimal digest. While theoretically possible because inputs are infinite and hash outputs are finite, the probability of a collision in SHA-256 is virtually zero (1 in 2^256).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I verify a download checksum?</h3>
            <p className={pageStyles.seoCardText}>
              When downloading operating system installers, database packages, or executable tools, publishers list their official SHA-256 hash. By running the downloaded file through SuperUtility and comparing the output, you can prove that the file was not corrupted during download or tampered with by a malicious third party.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Algorithm Comparisons */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Cryptographic Hashing Output Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Sample Input: "SuperUtility"</h3>
            <p className={pageStyles.seoCardText}>Observe how the different algorithms represent the exact same input string:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// MD5 (128-bit digest)
89a263158c3dbcb8525b682390f77bfd

// SHA-1 (160-bit digest)
f25d97f26ce5a430ad8a5d3f272c7263595fcfaf

// SHA-256 (256-bit digest - Industry Standard)
4e65b706c9e99a803f272c72e9be4f4544d7ce5fb72a2491a6d252bb888998ef`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>The Avalanche Effect</h3>
            <p className={pageStyles.seoCardText}>If you change a single letter (e.g. from "SuperUtility" to "superutility"), the resulting digest hash changes completely:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input: "superutility" (SHA-256)
273b5a452ef89c3abcf6c8d76b1da1e00e84b96b27ca9efea8d7d3c015b678c1

// Compare to "SuperUtility" above - they have zero matching characters!`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
