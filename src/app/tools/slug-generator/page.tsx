"use client";

import React from "react";
import SlugGenerator from "@/components/SlugGenerator";
import pageStyles from "@/app/page.module.css";

export default function SlugGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Slug Generator</h1>
      <p className={pageStyles.headerSubtitle}>Convert article titles or headings into clean, lowercase, SEO-friendly URL slug strings instantly.</p>
      
      {/* 1. Interactive Tool Module */}
      <SlugGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About URL Slug Optimization
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **SEO Slug Generator** designed for bloggers, content marketers, and web developers. A URL Slug represents the specific user-readable path component at the very end of a web address (e.g. `slug-generator` in our own URL).
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Search engines index pages higher when the URL contains clean, descriptive, hyphen-separated keywords rather than complex database IDs or special symbols. Our generator strips non-alphanumeric characters, replaces whitespaces with clean separators, and filters out common english stop-words (such as "the", "a", or "is") that dilute keyword index density.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is an SEO-friendly slug?</h3>
            <p className={pageStyles.seoCardText}>
              An SEO-friendly slug is a short, descriptive URL component containing pure lowercase letters, numbers, and hyphens. It makes the page content easily recognizable to both human readers and search engine crawlers.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are stop words?</h3>
            <p className={pageStyles.seoCardText}>
              Stop words are common connective words (like "the", "and", "or", "in") that search engine indexers ignore. Filtering them keeps your URL slugs short and maximizes the impact of core keyword terms.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my title input shared with indexers?</h3>
            <p className={pageStyles.seoCardText}>
              No. SuperUtility runs 100% locally using standard regular expressions inside your web browser. No cloud lookups occur, ensuring absolute privacy when planning unpublished marketing titles.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I prefer hyphens over underscores?</h3>
            <p className={pageStyles.seoCardText}>
              Major search engines (like Google) explicitly recommend using hyphens `-` instead of underscores `_` in URLs. Google treats hyphens as word separators, whereas underscores combine words into a single complex term.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Slug Generation Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Standard Article Title</h3>
            <p className={pageStyles.seoCardText}>A typical heading converted with default parameters:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Input Title:
"Essential Developer tools, meticulously crafted for 2026!"

• Output Slug:
"essential-developer-tools-meticulously-crafted-for-2026"`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Stop Words Removed</h3>
            <p className={pageStyles.seoCardText}>A condensed URL output focusing strictly on keywords:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• Input Title:
"How to optimize a website for Google search indexing"

• Output Slug (Stop Words Off):
"how-optimize-website-google-search-indexing"`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
