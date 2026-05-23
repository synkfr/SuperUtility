"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface ToolItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function Home() {
  const tools: ToolItem[] = [
    {
      id: "password-generator",
      name: "Password Generator",
      subtitle: "Secure random strings and memorable passphrases.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "qr-generator",
      name: "QR Code Generator",
      subtitle: "Generate high-resolution PNG and vector QR graphics.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2"></rect>
          <path d="M14 14h2v2h-2zm4 4h2v2h-2zm2-2h-2v2h2zm-2-2h2v2h-2zm-2 4h2v-2h-2zm0 2v2h2v-2z" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "uuid-generator",
      name: "UUID Generator",
      subtitle: "RFC 4122 v1 and v4 compliant unique bulk identifiers.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"></rect>
          <path d="M21 16H3M8 12H3m10 0H8m3-4H8m13 0h-7" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "hash-generator",
      name: "Hash Generator",
      subtitle: "MD5, SHA-1, SHA-256 and SHA-512 browser digest hashes.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
    },
    {
      id: "random-picker",
      name: "Random Picker",
      subtitle: "Raffle sweeps to pick winners from customizable lists.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      ),
    },
    {
      id: "random-number",
      name: "Number Generator",
      subtitle: "Sortable, secure ranges for integer or decimal values.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      id: "word-counter",
      name: "Word Counter",
      subtitle: "Real-time statistics for words, characters, and reading time.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
    },
    {
      id: "case-converter",
      name: "Case Converter",
      subtitle: "Instantly switch text casing (UPPER, lower, Title Case, etc).",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
    },
    {
      id: "text-repeater",
      name: "Text Line Tools",
      subtitle: "Repeat text sequences, remove duplicates, and sort lines.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      ),
    },
    {
      id: "url-base64-converter",
      name: "URL & Base64 Encoder",
      subtitle: "Securely encode and decode web URLs and Base64 format strings.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      id: "json-formatter",
      name: "JSON Formatter",
      subtitle: "Format, minify, validate, and parse JSON syntax structure.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
    },
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      subtitle: "Decode JWT header and payload details locally in real-time.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 103-3H9a3 3 0 00-3 3v1a3 3 0 003 3h3" />
        </svg>
      ),
    },
    {
      id: "timestamp-converter",
      name: "Unix Timestamp",
      subtitle: "Convert Unix epoch timestamps to calendar dates and vice-versa.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
    {
      id: "regex-tester",
      name: "Regex Tester",
      subtitle: "Test JavaScript regular expressions with match and group captures.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: "html-converter",
      name: "HTML Converter",
      subtitle: "Convert text to HTML entities or decode them safely.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
    },
    {
      id: "url-parser",
      name: "URL Parser",
      subtitle: "Parse URL strings into query parameters and path components.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
      ),
    },
    {
      id: "color-converter",
      name: "Color Converter",
      subtitle: "Convert colors between HEX, RGB, and HSL dynamically.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      ),
    },
    {
      id: "lorem-ipsum",
      name: "Lorem Ipsum",
      subtitle: "Generate placeholder lorem ipsum text of any custom length.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
        </svg>
      ),
    },
    {
      id: "slug-generator",
      name: "Slug Generator",
      subtitle: "Instantly create clean, SEO-friendly alphanumeric URL slugs.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "css-minifier",
      name: "CSS Minifier",
      subtitle: "Compress CSS stylesheets by stripping comments and whitespace.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 01.707-.293l14.586 14.586a1 1 0 01-.707 1.707H4.707A1 1 0 014 20V5z"></path>
        </svg>
      ),
    },
    {
      id: "js-minifier",
      name: "JavaScript Minifier",
      subtitle: "Compress Javascript script blocks by stripping spaces and comments.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      ),
    },
    {
      id: "text-diff",
      name: "Text Diff Checker",
      subtitle: "Compare text blocks side-by-side or inline to spot line changes.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: "password-strength",
      name: "Password Strength",
      subtitle: "Calculate password entropy, complexity, and offline crack times.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "bcrypt-generator",
      name: "Bcrypt Hash & Verify",
      subtitle: "Generate secure Bcrypt hashes or verify matching strings locally.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: "hmac-generator",
      name: "HMAC Generator",
      subtitle: "Produce secure keyed message digests locally in real-time.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "random-string",
      name: "Random String",
      subtitle: "Generate bulk secure randomized tokens and key salts.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "percentage-calculator",
      name: "Percentage Calc",
      subtitle: "Compute ratios, target percentages, and rate differences.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h.01M15 17h.01M19 5L5 19" />
        </svg>
      ),
    },
    {
      id: "age-calculator",
      name: "Age Calculator",
      subtitle: "Calculate calendar ages, birth milestones, and zodiac signs.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "loan-calculator",
      name: "EMI & Loan Calc",
      subtitle: "Compute installment EMI costs and view amortization schedules.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: "gst-calculator",
      name: "GST Calculator",
      subtitle: "Calculate inclusive/exclusive GST and intra-state CGST/SGST splits.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l2-2 4 4m5-7a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "profit-calculator",
      name: "Discount & Profit",
      subtitle: "Track sales markup, gross margins, and markdown discount rates.",
      icon: (
        <svg className={styles.toolIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Welcome Hero Card */}
      <div className={styles.heroCard}>
        <span className={styles.heroLabel}>100% Private & Free Tools</span>
        <h1 className={styles.heroTitle}>Your daily helper tools.<br />Private. Secure. Simple.</h1>
        <p className={styles.heroDesc}>
          SuperUtility is a collection of simple, fast, and completely private tools for your everyday tasks. Generate strong passwords, create custom QR codes, pick random items, and more—all without your data ever leaving your device. Everything runs directly in your web browser, keeping you completely safe.
        </p>
        
        <div className={styles.heroFeatures}>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Works Offline (No Internet Needed)</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>100% Free & No Sign-ups</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Top-Tier Device-Level Security</span>
          </div>
        </div>
      </div>

      {/* Grid of Tools Linking to Dedicated Routes */}
      <div className={styles.landingGrid}>
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className={styles.toolCard}
          >
            <div className={styles.toolCardIcon}>
              {tool.icon}
            </div>
            <div className={styles.toolCardContent}>
              <h2 className={styles.toolCardName}>{tool.name}</h2>
              <p className={styles.toolCardDesc}>{tool.subtitle}</p>
            </div>
            <span className={styles.toolCardArrow}>
              Launch Utility
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Easy to Read Frequently Asked Questions (FAQ) */}
      <section className={styles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={styles.seoTitle}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
          Frequently Asked Questions (FAQ)
        </h2>
        <div className={styles.seoGrid}>
          <div className={styles.seoCard}>
            <h3 className={styles.seoCardTitle}>Is my private information safe here?</h3>
            <p className={styles.seoCardText}>
              Yes, absolutely! SuperUtility runs entirely inside your web browser. None of your passwords, files, or text inputs are ever sent to a server, saved online, or shared with anyone. Everything stays 100% private on your own device.
            </p>
          </div>
          <div className={styles.seoCard}>
            <h3 className={styles.seoCardTitle}>How are passwords and random keys generated?</h3>
            <p className={styles.seoCardText}>
              We use highly secure, device-level random generation (using your browser's built-in cryptographic engine). This ensures that every password or unique key (UUID) you generate is completely random, fair, and virtually impossible to guess.
            </p>
          </div>
          <div className={styles.seoCard}>
            <h3 className={styles.seoCardTitle}>Can I use this app without an internet connection?</h3>
            <p className={styles.seoCardText}>
              Yes! Once you open the website, the tools are saved directly in your browser. You can turn off your internet or Wi-Fi completely, and all the tools (like the password, QR, and hash generators) will still work perfectly offline.
            </p>
          </div>
          <div className={styles.seoCard}>
            <h3 className={styles.seoCardTitle}>Are the random picks and numbers truly fair?</h3>
            <p className={styles.seoCardText}>
              Yes, they are 100% fair. We use advanced, balanced mathematical algorithms (like the Fisher-Yates shuffle) to make sure every random picker item or random number has an exactly equal chance of being chosen, with zero bias or repeating patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
