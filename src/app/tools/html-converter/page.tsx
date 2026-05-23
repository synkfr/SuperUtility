"use client";

import React from "react";
import HtmlConverter from "@/components/HtmlConverter";
import pageStyles from "@/app/page.module.css";

export default function HtmlConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>HTML Encoder / Decoder</h1>
      <p className={pageStyles.headerSubtitle}>Convert text strings into safe HTML character entities or decode them back to standard characters instantly.</p>
      
      {/* 1. Interactive Tool Module */}
      <HtmlConverter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About HTML Character Entities
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides an offline-first **HTML Encoder and Decoder** designed for web developers, designers, and content managers. In HTML, special reserved characters like `{"<"}` and `{">"}` have built-in meaning to web browsers as layout tags. If you paste raw symbols directly into code blocks, the browser interprets them as HTML tags, corrupting content layouts.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          To render these symbols safely, they must be converted into **HTML Character Entities** (e.g. `{"&lt;"}` and `{"&gt;"}`). This converter parses your strings, performs translations completely client-side in your browser sandbox, and translates numeric or named entity representations back to standard readable unicode glyphs.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I encode HTML code blocks?</h3>
            <p className={pageStyles.seoCardText}>
              Encoding translates active syntax characters (like tags, quotes, and ampersands) into passive text strings. This is critical when writing programming code tutorials, formatting RSS XML parameters, or validating rich text editors.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How is data processed in this converter?</h3>
            <p className={pageStyles.seoCardText}>
              All operations are executed 100% locally in your browser's Javascript runtime environment using safe DOM node textContent structures. No inputs are ever sent to cloud services, keeping your text sandboxed.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are named vs numeric entities?</h3>
            <p className={pageStyles.seoCardText}>
              **Named entities** represent characters using friendly alphabetic strings (e.g., `&copy;` for the copyright symbol). **Numeric entities** specify the exact Unicode/ASCII position of the character (e.g., `&#169;`).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it support complex UTF-8 characters and emojis?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! Emojis and multi-byte international characters are fully preserved during standard translations, as our tool leverages your browser's native DOM translation engine.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          HTML Entity Conversion Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Raw Unencoded String</h3>
            <p className={pageStyles.seoCardText}>This text would break normal HTML rendering blocks:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`<h1>Hello & Welcome!</h1>
<a href="/shop?id=12&discount=20">Shop "Now" & Save!</a>`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Safe Encoded Output</h3>
            <p className={pageStyles.seoCardText}>The translated safe character entities ready for HTML pages:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`&lt;h1&gt;Hello &amp; Welcome!&lt;/h1&gt;
&lt;a href=&quot;/shop?id=12&amp;discount=20&quot;&gt;Shop &quot;Now&quot; &amp; Save!&lt;/a&gt;`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
