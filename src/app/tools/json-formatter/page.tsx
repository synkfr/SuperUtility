"use client";

import React from "react";
import JsonFormatter from "@/components/JsonFormatter";
import pageStyles from "@/app/page.module.css";

export default function JsonFormatterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>JSON Formatter</h1>
      <p className={pageStyles.headerSubtitle}>Beautify, validate, minify, and inspect JSON syntax structures locally in-browser.</p>
      
      {/* 1. Interactive Tool Module */}
      <JsonFormatter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility JSON Formatter & Inspector
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a modern, fully-featured **JSON Formatter & Validator** to inspect and format nested data structures. JSON (JavaScript Object Notation) is the standard format for API data exchanges, configuration files, and state storage. However, unformatted, minified, or raw API outputs are completely unreadable for humans.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility lets you beautify raw strings instantly with custom 2-space or 4-space tab selections, minify JSON configurations into single lines, validate syntax correctness with precise error line alerts, and parse keys into a **recursive, collapsible visual tree layout** with full syntax color-highlighting. Everything runs entirely client-side on your computer, ensuring absolute privacy.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What does the Interactive Tree Visualizer do?</h3>
            <p className={pageStyles.seoCardText}>
              If your JSON payload is structurally valid, SuperUtility parses it into a visual tree layout. Each key is clickable: clicking on a key will dynamically collapse or expand nested arrays and child object grids, helping you explore huge JSON objects and trace deep keys in seconds.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are syntax errors validated?</h3>
            <p className={pageStyles.seoCardText}>
              We run a client-side parsing try-catch block using browser-native JSON engines. If a syntax error is present (such as missing commas, unclosed brackets, or trailing comments), the browser’s parsing engine catches the exact location and displays a detailed syntax warning alert.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my sensitive JSON data safe here?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. When debugging APIs, configurations, or secret environment files, your data must stay secure. SuperUtility does not run any backend servers, meaning your JSON values never leave your browser sandbox.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does it support trailing commas or comments?</h3>
            <p className={pageStyles.seoCardText}>
              No. Standard RFC 8259 JSON specifications prohibit trailing commas, comments, or single quotes. If your data contains these, our validator will flag them as invalid syntax, helping you sanitize your configurations for production systems.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical JSON Formatting Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          JSON Formatting & Minification Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Raw vs Beautified JSON</h3>
            <p className={pageStyles.seoCardText}>Beautify complex nested rows instantly to inspect the data keys cleanly:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Raw Input:
{"app":"SuperUtility","specs":{"active":true,"pages":11}}

// Formatted Output (2-Spaces Indent):
{
  "app": "SuperUtility",
  "specs": {
    "active": true,
    "pages": 11
  }
}`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>JSON Minification (Compressed)</h3>
            <p className={pageStyles.seoCardText}>Minify JSON to minimize database storage space or reduce request payload size:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Formatted Input:
{
  "name": "Jane",
  "hobbies": ["reading", "coding"]
}

// Minified Output (Single row, stripped whitespace):
{"name":"Jane","hobbies":["reading","coding"]}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
