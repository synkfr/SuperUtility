"use client";

import React from "react";
import RegexTester from "@/components/RegexTester";
import pageStyles from "@/app/page.module.css";

export default function RegexTesterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Regex Tester</h1>
      <p className={pageStyles.headerSubtitle}>Real-time Regular Expression testing, match highlighting, and capture group analysis completely client-side.</p>
      
      {/* 1. Interactive Tool Module */}
      <RegexTester />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About JavaScript Regular Expressions
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Regular Expression (Regex) Tester** designed for developers, systems administrators, and data analysts. Regular expressions are powerful character pattern sequences used to perform advanced search, validation, parsing, and replacing operations in text documents.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          This tester compiles standard JavaScript RegExp rules directly inside your browser engine. As you modify the search pattern or toggle flags like Global (`g`), Case-Insensitive (`i`), or Multiline (`m`), the tool highlights matching substrings instantly, compiles execution indexes, and itemizes captured groups to help you build complex patterns without guessing.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does the Global (g) flag do?</h3>
            <p className={pageStyles.seoCardText}>
              By default, a regular expression stops searching after finding the first matching substring. Toggling the Global (**g**) flag instructs the engine to scan the entire string, returning all matches.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are Capture Groups analyzed?</h3>
            <p className={pageStyles.seoCardText}>
              Any pattern wrapped in parentheses `( )` creates a capture group. When matches are found, the tester isolates the content inside each group, allowing you to debug sub-string parameters easily.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my test data completely safe here?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, 100%. Regular expression compiling and test text analysis occur strictly within your browser's memory sandbox. There are no server-side APIs involved, preventing leaks of confidential log logs.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why does the interface freeze on some patterns?</h3>
            <p className={pageStyles.seoCardText}>
              Certain patterns with nested quantifiers can trigger **Catastrophic Backtracking** (a state of infinite complexity). We've built in a standard search guard threshold to automatically interrupt evaluation loops if matches exceed safe limits.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Common Regex Patterns & Cheatsheets
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Useful Pattern Formats</h3>
            <p className={pageStyles.seoCardText}>Copy and paste these snippets to get started:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Email:  [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
• Phone:  \\+?\\d{1,4}[-\\s]?\\(?\\d{1,3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}
• URL:    https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)
• Hex:    #[a-fA-F0-9]{6}`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Basic Token Reference</h3>
            <p className={pageStyles.seoCardText}>Standard operators for regular expressions:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• \\d = any numeric digit [0-9]
• \\w = any word character [a-zA-Z0-9_]
• \\s = any whitespace, space, tab, line
• .  = any single character except newlines
• *  = zero or more repetitions
• +  = one or more repetitions
• ?  = optional character`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
