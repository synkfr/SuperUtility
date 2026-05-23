"use client";

import React from "react";
import LoremIpsum from "@/components/LoremIpsum";
import pageStyles from "@/app/page.module.css";

export default function LoremIpsumPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Lorem Ipsum Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate high-fidelity, realistic pseudo-Latin placeholder text paragraphs or words for design mockups locally.</p>
      
      {/* 1. Interactive Tool Module */}
      <LoremIpsum />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Lorem Ipsum Typography
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides an offline-first **Lorem Ipsum Generator** designed for graphic designers, web developers, and layout typesetters. Lorem Ipsum represents standard scramble-Latin dummy text derived from Cicero's classic philosophical treatises in 45 BC.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          When presenting new website layout wireframes or application designs, using actual copy text draws the audience's focus away from visual proportions and structure. Using pseudo-Latin mock text ensures viewers focus purely on typography, alignment, and grid systems. Our generator creates custom paragraphs, sentences, or word counts completely client-side in a fraction of a millisecond.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the history of Lorem Ipsum?</h3>
            <p className={pageStyles.seoCardText}>
              The text dates back to Cicero's philosophical work *De Finibus Bonorum et Malorum* ("On the Limits of Good and Evil"). A typesetter in the 1500s scrambled Cicero's words to produce a specimen book of layout fonts that has survived into the digital age.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the generator randomize words?</h3>
            <p className={pageStyles.seoCardText}>
              We store the complete core vocabulary of standard Lorem Ipsum syllables. Our local algorithm randomly sequences these words into grammatically structured sentence and paragraph lengths to simulate realistic reading volumes.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Are there any network trackers active?</h3>
            <p className={pageStyles.seoCardText}>
              No. Many online dummy text generators track user IPs and data queries. SuperUtility generates all mock text blocks 100% locally inside your browser sandbox, keeping your workflows completely confidential.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I generate large volumes of text?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! You can generate up to 50 detailed paragraphs or 500 words instantly. The rendering process runs locally in microseconds with zero lag.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Sample Dummy Text Formats
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Single Paragraph Sample</h3>
            <p className={pageStyles.seoCardText}>A standard mock text block starting with Cicero's phrase:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Short Words Snippet</h3>
            <p className={pageStyles.seoCardText}>A short list of words suitable for tag headers or menu labels:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`Lorem ipsum dolor sit amet, consectetur, elit, sed, tempor, labore.`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
