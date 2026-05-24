"use client";

import React from "react";
import UrlParser from "@/components/UrlParser";
import pageStyles from "@/app/page.module.css";

export default function UrlParserPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>URL Parser</h1>
      <p className={pageStyles.headerSubtitle}>Break down complete URL strings into hosts, paths, anchors, and search query parameters instantly completely client-side.</p>
      
      {/* 1. Interactive Tool Module */}
      <UrlParser />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About URL Structure Parsing
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first <strong>URL Parser</strong> designed for developers, SEO professionals, and marketing analysts. A Uniform Resource Locator (URL) represents the specific address of a resource on the web. A standard URL is composed of multiple distinct parameters, including a transfer protocol (like HTTP or HTTPS), authority hostname domains, port numbers, exact route pathnames, query strings, and hash fragment anchors.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Analyzing URLs manually to inspect UTM trackers or find key API parameters is time-consuming. Our parser separates these components instantly, showing them in structured grids and automatically decoding percent-encoded query parameter strings (like `%20` translating back to standard spaces) completely inside your web browser.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does URL parsing mean?</h3>
            <p className={pageStyles.seoCardText}>
              URL parsing is the programmatic decomposition of a complete web link string into its structured component parts, allowing software or developers to easily read specific keys like hostnames or query values.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a percent-encoded query parameter?</h3>
            <p className={pageStyles.seoCardText}>
              Because certain symbols (like spaces, hashes, or question marks) have unique meanings inside URL strings, browsers convert them into safe numeric representations (e.g. `foo%20bar` for `foo bar`). Our tool decodes these automatically for readability.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Are the parsed URLs stored anywhere online?</h3>
            <p className={pageStyles.seoCardText}>
              Never. The URL string is parsed locally using the browser's built-in `URL` object constructor API inside your device's Javascript engine. None of your URLs or query values ever traverse the web.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it support relative URLs?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! If you enter a relative path or domain name without a protocol (e.g. `superutility.xyz/tools`), our parser automatically handles it by prefixing a standard `https://` schema to ensure successful parsing.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Standard URL Component Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Parsed Link Breakdown</h3>
            <p className={pageStyles.seoCardText}>Observe how a standard web address is decomposed:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• URL: https://example.com:8080/path/to/page?id=100#section-3

• Protocol:  https:
• Hostname:  example.com
• Port:      8080
• Pathname:  /path/to/page
• Query:     ?id=100
• Hash:      #section-3`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Query Parameters Grid</h3>
            <p className={pageStyles.seoCardText}>Structured key-value parameters from the query string:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Query:
"?utm_source=google&utm_medium=cpc&term=code"

// Parsed Output Parameters:
1. utm_source = "google"
2. utm_medium = "cpc"
3. term       = "code"`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
