"use client";

import React from "react";
import JsMinifier from "@/components/JsMinifier";
import pageStyles from "@/app/page.module.css";

export default function JsMinifierPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>JavaScript Minifier</h1>
      <p className={pageStyles.headerSubtitle}>Compress JavaScript code blocks locally by stripping comments, newlines, and unnecessary whitespaces instantly.</p>
      
      {/* 1. Interactive Tool Module */}
      <JsMinifier />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About JavaScript Compaction
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a lightweight, high-speed **JavaScript Minifier** running 100% locally on your computer. During development, programmers structure scripts with single-line comments (`//`), block explanations (`/* ... */`), clear indentations, and vertical spacing to make logic easy to navigate.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          While this is great for team review, it adds bloated file sizes that prolong page download times. Minification compiles your Javascript by completely eliminating these formatting and comments elements, producing dense, lightweight script lines ready for immediate production environments without changing the execution outcome.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does a JS Minifier do?</h3>
            <p className={pageStyles.seoCardText}>
              Minification removes developer comments, extra spaces, line breaks, and tabs from your JavaScript source code, leaving only essential runtime syntax characters.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is it safe to run proprietary scripts here?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. SuperUtility operates entirely within your web browser sandbox using offline-first Javascript logic. Your proprietary code is never transmitted across the network, ensuring absolute confidentiality.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it support code obfuscation?</h3>
            <p className={pageStyles.seoCardText}>
              This utility focuses on clean, fast, and safe structural minification (whitespace and comment stripping) to ensure 100% error-free execution out-of-the-box without altering variable scopes or triggering runtime warnings.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How can I restore minified code?</h3>
            <p className={pageStyles.seoCardText}>
              Minification is a one-way process because it permanently strips comments and formatting. To restore structure for reading, you can run the code through a standard **Code Beautifier / Formatter**.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical JS Minification Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          JavaScript Compression Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Uncompressed Developer Script</h3>
            <p className={pageStyles.seoCardText}>Typical formatted function with comments and line breaks:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Calculate exponential security level
function checkSecurity(length) {
  /* Assessment logs */
  const bits = length * 4;
  console.log("Entropy Bits:", bits);
  return bits;
}`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Minified Production Script</h3>
            <p className={pageStyles.seoCardText}>The compiled compact version, optimized for network transmission speed:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`function checkSecurity(length){const bits=length*4;console.log("Entropy Bits:",bits);return bits}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
