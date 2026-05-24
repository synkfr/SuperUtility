"use client";

import React from "react";
import CssMinifier from "@/components/CssMinifier";
import pageStyles from "@/app/page.module.css";

export default function CssMinifierPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>CSS Minifier</h1>
      <p className={pageStyles.headerSubtitle}>Compress CSS styling sheets by stripping comments, collapsing whitespaces, and optimizing selectors instantly and locally.</p>
      
      {/* 1. Interactive Tool Module */}
      <CssMinifier />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About CSS Minification
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first <strong>CSS Minifier</strong> designed for front-end developers, UI engineers, and performance optimizers. CSS styles written during development are packed with descriptive comments, clean nesting indentations, and empty line breaks to keep stylesheets readable for humans.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          However, these whitespaces and comments add extra bytes that web browsers must download when loading your website. Minification strips these unnecessary formatting bytes without altering visual styles, drastically reducing file sizes and improving your site's Largest Contentful Paint (LCP) performance score.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does CSS minification do?</h3>
            <p className={pageStyles.seoCardText}>
              Minification removes standard comments, redundant spaces, empty lines, and trailing semicolons from your CSS code, compacting the entire stylesheet into a dense text block.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Will minification break my visual layout?</h3>
            <p className={pageStyles.seoCardText}>
              No. Standard minification only targets superficial formatting (like spaces, tabs, and comments) that are completely ignored by browser layout engines, leaving functional style declarations fully intact.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my proprietary style code kept private?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, 100%. SuperUtility executes all compression regular expressions directly in your browser sandbox using secure client-side Javascript. No files or text ever reach the cloud.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it display compression performance ratios?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! Our tool computes exactly how many bytes were saved during minification, showing your original size, compressed size, and the percentage reduction in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical CSS Minification Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          CSS Compression Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Raw Stylesheet Input</h3>
            <p className={pageStyles.seoCardText}>A standard styled selector block with comments and spaces:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`/* Centered Container block */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Minified Compacted Output</h3>
            <p className={pageStyles.seoCardText}>The same style declarations compressed into a single line:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`.container{display:flex;justify-content:center;align-items:center;margin:0 auto}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
