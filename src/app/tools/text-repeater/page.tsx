"use client";

import React from "react";
import TextRepeater from "@/components/TextRepeater";
import pageStyles from "@/app/page.module.css";

export default function TextRepeaterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Text Line Tools</h1>
      <p className={pageStyles.headerSubtitle}>Repeat text sequences, filter out duplicate lines, and sort lists alphabetically or by character length.</p>
      
      {/* 1. Interactive Tool Module */}
      <TextRepeater />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Text Line Tools
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a powerful <strong>Text Line Tools Suite</strong> combining three essential text operations: a bulk <strong>Text Repeater</strong>, an instant <strong>Duplicate Lines Filter</strong>, and an advanced <strong>Line Sorter</strong>. Developers, designers, writers, and data entry specialists often need to manipulate large lists of items (such as emails, domain links, IDs, or database values).
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Instead of writing complex terminal scripting commands or copy-pasting data into heavy spreadsheet programs, our tools let you manage, filter, and organize text sequences instantly. Every calculation is performed locally in your browser memory state, guaranteeing that your proprietary lists are never uploaded to any external server.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the duplicate removal tool work?</h3>
            <p className={pageStyles.seoCardText}>
              We split your input text by newlines and feed the resulting list into a Javascript <code className={pageStyles.seoCode}>Set</code>. Set objects automatically reject non-unique values. We then join the remaining unique lines back together, instantly purging duplicate rows while preserving the original sequence order of the first matches.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What sorting algorithms and orders do you support?</h3>
            <p className={pageStyles.seoCardText}>
              We support four primary sorting methods:
              <br />
              • <strong>A to Z</strong>: Standard alphabetical ascending sort.
              <br />
              • <strong>Z to A</strong>: Alphabetical descending sort.
              <br />
              • <strong>Shortest to Longest</strong>: Sorts lines in ascending order of character length.
              <br />
              • <strong>Longest to Shortest</strong>: Sorts lines in descending order of character length.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I repeat text with custom separators?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! In addition to standard separators like <strong>Newlines</strong>, <strong>Spaces</strong>, and <strong>Commas</strong>, you can choose <strong>"Custom Character"</strong> and define any string of your choice (such as hyphens, backslashes, or words) to join your repeated elements.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my pasted list data secure?</h3>
            <p className={pageStyles.seoCardText}>
              Entirely. Your list data remains strictly on your device inside your browser’s local sandbox runtime. Once you clear the input box or close the tab, the text sequences are wiped completely from active RAM.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Text Line Tools Usage Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Purging Duplicate Emails</h3>
            <p className={pageStyles.seoCardText}>Clean up copy-pasted newsletter or user lists instantly:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Raw List:
alice@email.com
bob@email.com
alice@email.com
charlie@email.com

// Filtered Output (Removes duplicate row 3):
alice@email.com
bob@email.com
charlie@email.com`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Sorting Lists by Character Length</h3>
            <p className={pageStyles.seoCardText}>Sort entries by character length to organize headers or visual lists:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Raw List:
Developer Tools
Text
Security Tools

// Sorted Output (Shortest to Longest):
Text
Developer Tools
Security Tools`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
