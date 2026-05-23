"use client";

import React from "react";
import TimestampConverter from "@/components/TimestampConverter";
import pageStyles from "@/app/page.module.css";

export default function TimestampConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Unix Timestamp Converter</h1>
      <p className={pageStyles.headerSubtitle}>Convert between standard human-readable calendar dates and Unix epoch timestamps in real-time.</p>
      
      {/* 1. Interactive Tool Module */}
      <TimestampConverter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          Understanding Unix Epoch Time
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a high-performance **Unix Timestamp Converter** running 100% locally in your browser. Unix time (also known as Epoch time or POSIX time) is a standard system for tracking time, defined as the total number of seconds that have elapsed since **January 1, 1970, at 00:00:00 UTC** (excluding leap seconds).
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Because computer operating systems and databases represent timestamps as simple integers, developers constantly need to translate numbers like `1779455422` into human-readable calendar dates. Our converter instantly detects whether you entered values in seconds or milliseconds, displaying local time-zone dates, UTC strings, and active relative intervals.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between Unix seconds and milliseconds?</h3>
            <p className={pageStyles.seoCardText}>
              Unix timestamps in seconds are standard 10-digit integers (e.g. representing the current era). JavaScript and other high-resolution languages often track epoch time in milliseconds, which are 13-digit integers. Our tool automatically detects the digit length and resolves either format instantly.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does this tool handle timezone offsets?</h3>
            <p className={pageStyles.seoCardText}>
              All calculations run inside your browser engine. The **Local Time** conversion uses the exact timezone settings configured on your physical computer/operating system, while the **UTC Time** displays dates relative to the standard Zero meridian.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the Year 2038 Problem?</h3>
            <p className={pageStyles.seoCardText}>
              Systems representing Unix seconds as signed 32-bit integers will overflow on **January 19, 2038**, when the elapsed seconds exceed 2,147,483,647. Modern 64-bit systems are unaffected, allowing dates to be resolved billions of years into the future.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Does this tool query external clock servers?</h3>
            <p className={pageStyles.seoCardText}>
              No. The live-ticking timer and calendar conversions are calculated using the native `Date` object API of your web browser. No server queries are ever executed, ensuring full performance offline.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Unix Epoch Conversion Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Key Epoch Benchmarks</h3>
            <p className={pageStyles.seoCardText}>Historical and future calendar date parameters:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• 0 = Jan 1, 1970 (Epoch Start)
• 1,000,000,000 = Sep 9, 2001 (1 Billion Secs)
• 2,000,000,000 = May 18, 2033 (2 Billion Secs)
• 2,147,483,647 = Jan 19, 2038 (signed 32-bit overflow)`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Programming Language Snippets</h3>
            <p className={pageStyles.seoCardText}>Get the current epoch seconds in major backends:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`• JavaScript: Math.floor(Date.now() / 1000)
• Python:     import time; int(time.time())
• PHP:        time()
• Go:         time.Now().Unix()
• Ruby:       Time.now.to_i`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
