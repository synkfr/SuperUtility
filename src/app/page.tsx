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
