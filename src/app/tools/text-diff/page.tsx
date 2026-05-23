"use client";

import React from "react";
import TextDiff from "@/components/TextDiff";
import pageStyles from "@/app/page.module.css";

export default function TextDiffPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Text Diff Checker</h1>
      <p className={pageStyles.headerSubtitle}>Compare two text blocks line-by-line and identify differences, additions, and deletions instantly.</p>
      
      <TextDiff />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Client-Side Text Comparison
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Text Diff Checker** designed for comparing configuration files, documents, scripts, or paragraphs. Our comparison tool calculates line-by-line differences completely inside your web browser.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          By using an efficient dynamic programming Longest Common Subsequence (LCS) algorithm, we compute and map differences without uploading your confidential logs, notes, or source code to third-party databases.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are differences computed?</h3>
            <p className={pageStyles.seoCardText}>
              We split both input text blocks into line arrays and run an LCS (Longest Common Subsequence) comparison. This algorithm identifies the minimal sequence of insertions and deletions necessary to transform the original text into the modified block.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my code shared or processed online?</h3>
            <p className={pageStyles.seoCardText}>
              No. Unlike other comparison sites, SuperUtility performs all mathematical processing locally. Your files, logs, or private strings never leave your device, ensuring zero leakage of proprietary code or secret assets.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does side-by-side vs inline mean?</h3>
            <p className={pageStyles.seoCardText}>
              Side-by-side view splits the layout into two columns for original and modified versions (filling gaps to keep corresponding lines aligned). Inline view displays a single continuous output highlighting additions green and deletions red.
            </p>
          </div>
        </div>
      </section>

      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Comparison Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Line Difference Highlight</h3>
            <p className={pageStyles.seoCardText}>Visualizing typical modifications in code properties:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Original (Left):
port: 3000
debug: false

• Modified (Right):
port: 3000
debug: true
ssl: true

• Visual Diffs:
- debug: false (Red)
+ debug: true (Green)
+ ssl: true (Green)`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
