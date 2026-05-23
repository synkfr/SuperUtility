"use client";

import React from "react";
import WordCounter from "@/components/WordCounter";
import pageStyles from "@/app/page.module.css";

export default function WordCounterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Word Counter</h1>
      <p className={pageStyles.headerSubtitle}>Analyze word counts, character length, and estimated reading speeds locally in real-time.</p>
      
      {/* 1. Interactive Tool Module */}
      <WordCounter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Word Counter
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first, highly private **Word & Character Counter** designed for copywriters, students, editors, and developers. Whether you are drafting essay manuscripts, optimizing keywords for blog posts, checking length limits for social media updates, or reviewing technical reports, our analyzer provides instant, accurate, and completely private results.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          In addition to basic word and character counts (including options with or without spaces), SuperUtility calculates the exact number of sentences, standard paragraphs, and estimated times for both silent reading and spoken presentations. It also features a gorgeous alphanumeric character frequency breakdown to analyze letter usage distributions.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my pasted text secure and private?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. SuperUtility operates entirely client-side. None of the text you type, paste, or analyze is ever transmitted across the network or stored in any database. Everything is kept inside your browser's temporary runtime memory state, ensuring absolute privacy.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How is the estimated reading time calculated?</h3>
            <p className={pageStyles.seoCardText}>
              We use a standard industry-wide formula based on average reading speeds. Silent reading time is calculated using an average benchmark speed of **200 words per minute (WPM)**, which is the standard speed for normal adults.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How is the speaking time calculated?</h3>
            <p className={pageStyles.seoCardText}>
              Verbal presentation speeds are significantly slower than silent reading speeds. Speaking time is calculated using a standard benchmark of **130 words per minute (WPM)**, helping public speakers and video creators pace their scripts.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it count emojis and special punctuation?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! Emojis and standard punctuation marks are counted as valid characters. However, when performing character frequency analysis, we filter out special symbols and whitespaces to display only clean alphanumeric letter distributions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Text Statistics & Readability Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Social Media Character Limits</h3>
            <p className={pageStyles.seoCardText}>Easily check character parameters for major social networks:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Twitter / X Post Limit: 280 Characters
• LinkedIn Post Limit: 3,000 Characters
• Instagram Caption Limit: 2,200 Characters
• Meta / Facebook Post Limit: 63,206 Characters`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Sample Text Analysis Log</h3>
            <p className={pageStyles.seoCardText}>Observe the structured calculations for a sample sentence structure:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Text:
"Hello! Welcome to SuperUtility. Private and secure daily tools."

// Output Calculations:
• Words: 9
• Characters: 61
• Sentences: 3
• Paragraphs: 1
• Est. Reading Time: 1 min`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
