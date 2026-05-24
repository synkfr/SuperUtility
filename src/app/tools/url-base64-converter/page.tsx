"use client";

import React from "react";
import UrlBase64Converter from "@/components/UrlBase64Converter";
import pageStyles from "@/app/page.module.css";

export default function UrlBase64ConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>URL & Base64 Encoder/Decoder</h1>
      <p className={pageStyles.headerSubtitle}>Encode and decode web URLs and Base64 format strings safely and instantly in-browser.</p>
      
      {/* 1. Interactive Tool Module */}
      <UrlBase64Converter />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility URL & Base64 Converter
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers a highly robust, developer-grade <strong>URL & Base64 Encoder / Decoder</strong>. Translating, sanitizing, and encoding strings are fundamental daily tasks in web development, database management, and network request formatting.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our dual-utility panel allows you to perform <strong>URL Percent-Encoding</strong> (to sanitize query parameter keys, pathnames, and search parameters for API requests) and <strong>Base64 Encoding</strong> (to convert plain text strings into binary-to-text representations safe for data storage, basic authentication headers, or embedded media streams). With built-in UTF-8 safety checks, our converter is completely protected against Unicode character crashes.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is URL Encoding (Percent-Encoding) and why is it needed?</h3>
            <p className={pageStyles.seoCardText}>
              URLs can only contain standard ASCII alphanumeric characters. Punctuation or special symbols (like spaces, ampersands, or slashes) have reserved functional meanings in URLs. URL encoding converts these non-ASCII or reserved characters into a safe percent sign followed by their hexadecimal code (e.g. spaces become <code className={pageStyles.seoCode}>%20</code>), preventing broken API routes.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is Base64 Encoding?</h3>
            <p className={pageStyles.seoCardText}>
              Base64 is a binary-to-text encoding scheme that translates raw data into a safe set of 64 standard ASCII characters (containing uppercase and lowercase letters, numbers, and the symbols <code className={pageStyles.seoCode}>+</code>, <code className={pageStyles.seoCode}>/</code>, and <code className={pageStyles.seoCode}>=</code> for padding). It is commonly used to safely embed images in HTML documents or transmit credentials in Basic Auth headers.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why do other Base64 generators fail on special characters?</h3>
            <p className={pageStyles.seoCardText}>
              Standard browser JavaScript functions like <code className={pageStyles.seoCode}>btoa()</code> and <code className={pageStyles.seoCode}>atob()</code> only support 8-bit ASCII characters. If you enter non-ASCII Unicode characters (such as emojis or accented characters like á, ö, or Chinese letters), they throw a fatal exception. SuperUtility fixes this by wrapping conversions in a safe UTF-8 binary mapper.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my input data secure and offline-capable?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, entirely. The conversion functions execute instantly in local browser memory. None of the text strings or encoded keys are ever sent across the network, making it completely secure for API tokens, secret keys, or confidential parameters.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Converter Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          URL & Base64 Conversion Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>URL Percent-Encoding Examples</h3>
            <p className={pageStyles.seoCardText}>Observe how query parameter spaces and ampersands are encoded safely:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Plain URL Parameter:
"John Doe & Sons"

// URL Encoded:
"John%20Doe%20%26%20Sons"

// Input Complete Route:
"https://superutility.xyz/tools/password-generator?length=16"

// URL Encoded (Full sanitization):
"https%3A%2F%2Fsuperutility.xyz%2Ftools%2Fpassword-generator%3Flength%3D16"`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Base64 Unicode Encoding Examples</h3>
            <p className={pageStyles.seoCardText}>Convert complex multi-byte characters and strings cleanly:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Text:
"SuperUtility"

// Base64 Encoded Output:
"U3VwZXJVdGlsaXR5"

// Input Unicode string (Standard btoa fails, but SuperUtility succeeds):
"Hello 🚀"

// Base64 Encoded Output:
"SGVsbG8g8J+Zig=="`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
