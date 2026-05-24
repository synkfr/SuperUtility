"use client";

import React from "react";
import CaseConverter from "@/components/CaseConverter";
import pageStyles from "@/app/page.module.css";

export default function CaseConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Case Converter</h1>
      <p className={pageStyles.headerSubtitle}>Convert text casing instantly between uppercase, lowercase, sentence, and title formats locally.</p>
      
      {/* 1. Interactive Tool Module */}
      <CaseConverter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Case Converter
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a highly versatile, real-time <strong>Case Converter</strong> tool designed to format strings, text articles, or code comments instantly. When copy-pasting documents from different sources, text formatting and letter casing are often inconsistent or completely broken (such as accidental CAPS LOCK text or uncapitalized titles). 
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Instead of manually editing characters line-by-line, SuperUtility allows you to convert massive blocks of text into six different standard casing conventions in a single click. Everything runs inside your local browser memory sandbox, keeping your documents 100% private.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is Title Case and how does it convert?</h3>
            <p className={pageStyles.seoCardText}>
              Title Case capitalizes the first letter of principal words. SuperUtility implements standard editorial rules: it capitalizes every word *except* common minor articles, conjunctions, and prepositions (like <code className={pageStyles.seoCode}>a, an, the, and, or, but, on, at, to, in, of</code>), unless they appear as the very first word in the sentence.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is Sentence Case?</h3>
            <p className={pageStyles.seoCardText}>
              Sentence case formats text to resemble a standard paragraph structure. It forces all text to lowercase, and then capitalizes only the very first letter of each sentence (detecting transitions after periods, exclamation marks, or question marks followed by spaces).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the Invert Case mode work?</h3>
            <p className={pageStyles.seoCardText}>
              Invert Case analyzes every character in your text: if a letter is currently uppercase, it converts it to lowercase; if it is lowercase, it becomes uppercase. This is incredibly useful for instantly repairing text typed with an accidental CAPS LOCK key.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is there a character length limit for conversions?</h3>
            <p className={pageStyles.seoCardText}>
              No. Since all operations run locally in-browser on your computer's CPU rather than round-tripping to a remote server, you can convert massive articles, text documents, or code sequences containing hundreds of thousands of words in a few milliseconds.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Casing Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Letter Casing Conversion Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Casing Formats Comparison</h3>
            <p className={pageStyles.seoCardText}>Observe how the same input string maps to different casing structures:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Text:
"essential developer tools for modern web pages"

// UPPERCASE:
"ESSENTIAL DEVELOPER TOOLS FOR MODERN WEB PAGES"

// Title Case (keeps "for" lowercase):
"Essential Developer Tools for Modern Web Pages"

// Sentence case:
"Essential developer tools for modern web pages"

// Capitalize Word:
"Essential Developer Tools For Modern Web Pages"`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Invert Case Correction Example</h3>
            <p className={pageStyles.seoCardText}>Repair CAPS LOCK errors instantly without re-typing:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input CAPS LOCK error:
"tHE sUPERuTILITY wEBSITE IS AMAZING."

// Inverted Output:
"The SuperUtility Website Is Amazing."`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
