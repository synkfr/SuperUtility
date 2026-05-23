"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";

interface NavigationItem {
  id: string;
  href: string;
  name: string;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: NavigationItem[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Categories and their tools
  const categories: Category[] = [
    {
      id: "randomizers",
      name: "Randomizers",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3M3 12a48.884 48.884 0 0 1 .138-3.662M3 12h18M3 12l3 3m-3-3-3 3M21 12a48.756 48.756 0 0 1-.138 3.662 4.006 4.006 0 0 1-3.7 3.7 48.656 48.656 0 0 1-7.324 0 4.006 4.006 0 0 1-3.7-3.7C6.047 14.453 6 13.232 6 12m15.5 0-3 3m3-3 3 3" />
        </svg>
      ),
      items: [
        {
          id: "password-generator",
          href: "/tools/password-generator",
          name: "Password Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"></path>
            </svg>
          ),
        },
        {
          id: "random-picker",
          href: "/tools/random-picker",
          name: "Random Picker",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          ),
        },
        {
          id: "random-number",
          href: "/tools/random-number",
          name: "Number Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          ),
        },
      ],
    },
    {
      id: "security",
      name: "Security & Identifiers",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      items: [
        {
          id: "qr-generator",
          href: "/tools/qr-generator",
          name: "QR Code Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2"></rect>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2"></rect>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2"></rect>
              <path d="M14 14h2v2h-2zm4 4h2v2h-2zm2-2h-2v2h2zm-2-2h2v2h-2zm-2 4h2v-2h-2zm0 2v2h2v-2z" strokeWidth="2"></path>
            </svg>
          ),
        },
        {
          id: "uuid-generator",
          href: "/tools/uuid-generator",
          name: "UUID Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"></rect>
              <path d="M21 16H3M8 12H3m10 0H8m3-4H8m13 0h-7" strokeWidth="2"></path>
            </svg>
          ),
        },
        {
          id: "hash-generator",
          href: "/tools/hash-generator",
          name: "Hash Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          ),
        },
        {
          id: "password-strength",
          href: "/tools/password-strength",
          name: "Password Strength",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
        {
          id: "bcrypt-generator",
          href: "/tools/bcrypt-generator",
          name: "Bcrypt Hash & Verify",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        },
        {
          id: "hmac-generator",
          href: "/tools/hmac-generator",
          name: "HMAC Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "random-string",
          href: "/tools/random-string",
          name: "Random String",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "text",
      name: "Text Tools",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v5.78Z" />
        </svg>
      ),
      items: [
        {
          id: "word-counter",
          href: "/tools/word-counter",
          name: "Word Counter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          ),
        },
        {
          id: "case-converter",
          href: "/tools/case-converter",
          name: "Case Converter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          ),
        },
        {
          id: "text-repeater",
          href: "/tools/text-repeater",
          name: "Text Line Tools",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          ),
        },
        {
          id: "url-base64-converter",
          href: "/tools/url-base64-converter",
          name: "URL & Base64 Encoder",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          ),
        },
        {
          id: "json-formatter",
          href: "/tools/json-formatter",
          name: "JSON Formatter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          ),
        },
        {
          id: "text-diff",
          href: "/tools/text-diff",
          name: "Text Diff Checker",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "developer",
      name: "Developer Tools",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      ),
      items: [
        {
          id: "jwt-decoder",
          href: "/tools/jwt-decoder",
          name: "JWT Decoder",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 103-3H9a3 3 0 00-3 3v1a3 3 0 003 3h3" />
            </svg>
          ),
        },
        {
          id: "timestamp-converter",
          href: "/tools/timestamp-converter",
          name: "Unix Timestamp",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
        },
        {
          id: "regex-tester",
          href: "/tools/regex-tester",
          name: "Regex Tester",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
        },
        {
          id: "html-converter",
          href: "/tools/html-converter",
          name: "HTML Converter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          ),
        },
        {
          id: "url-parser",
          href: "/tools/url-parser",
          name: "URL Parser",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          ),
        },
        {
          id: "color-converter",
          href: "/tools/color-converter",
          name: "Color Converter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          ),
        },
        {
          id: "lorem-ipsum",
          href: "/tools/lorem-ipsum",
          name: "Lorem Ipsum",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          ),
        },
        {
          id: "slug-generator",
          href: "/tools/slug-generator",
          name: "Slug Generator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          id: "css-minifier",
          href: "/tools/css-minifier",
          name: "CSS Minifier",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 01.707-.293l14.586 14.586a1 1 0 01-.707 1.707H4.707A1 1 0 014 20V5z"></path>
            </svg>
          ),
        },
        {
          id: "js-minifier",
          href: "/tools/js-minifier",
          name: "JavaScript Minifier",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          ),
        },
      ],
    },
    {
      id: "calculators",
      name: "Calculators",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        {
          id: "percentage-calculator",
          href: "/tools/percentage-calculator",
          name: "Percentage Calc",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h.01M15 17h.01M19 5L5 19" />
            </svg>
          ),
        },
        {
          id: "age-calculator",
          href: "/tools/age-calculator",
          name: "Age Calculator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "loan-calculator",
          href: "/tools/loan-calculator",
          name: "EMI & Loan Calc",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
        {
          id: "gst-calculator",
          href: "/tools/gst-calculator",
          name: "GST Calculator",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l2-2 4 4m5-7a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          id: "profit-calculator",
          href: "/tools/profit-calculator",
          name: "Discount & Profit",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "currency-converter",
          href: "/tools/currency-converter",
          name: "Currency Converter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "images",
      name: "Image Tools",
      icon: (
        <svg className={styles.folderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      items: [
        {
          id: "image-to-base64",
          href: "/tools/image-to-base64",
          name: "Image to Base64",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "image-compressor",
          href: "/tools/image-compressor",
          name: "Image Compressor",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          ),
        },
        {
          id: "image-resizer",
          href: "/tools/image-resizer",
          name: "Image Resizer",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          ),
        },
        {
          id: "image-converter",
          href: "/tools/image-converter",
          name: "Image Converter",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          ),
        },
        {
          id: "color-picker-image",
          href: "/tools/color-picker-image",
          name: "Color Picker",
          icon: (
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          ),
        },
      ],
    },
  ];

  // Accordion folder state logic
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => {
    // Expand by default if URL matches one of the items inside
    const initial: Record<string, boolean> = {
      randomizers: true,
      security: true,
      text: true,
      developer: true,
      calculators: true,
      images: true,
    };
    return initial;
  });

  // Global keybind registration for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  // Filter categories and items dynamically based on search
  const filteredCategories = categories
    .map((category) => {
      const matchingItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, items: matchingItems };
    })
    .filter((category) => category.items.length > 0);

  // Expand folders automatically when a search query is active
  const isSearchActive = searchQuery.trim().length > 0;

  const renderNavList = () => {
    return (
      <div className={styles.navWrapper}>
        {/* Search bar inside the sidebar */}
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchQuery("");
              }
            }}
            className={styles.searchInput}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className={styles.clearSearchBtn}
              title="Clear search"
              aria-label="Clear search"
            >
              &times;
            </button>
          ) : (
            <span className={styles.shortcutBadge}>Ctrl K</span>
          )}
        </div>

        <Link
          href="/"
          onClick={handleLinkClick}
          className={`${styles.navBtn} ${pathname === "/" ? styles.navBtnActive : ""}`}
        >
          <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard Home</span>
        </Link>

        {/* Expand / Collapse All Folders Fast Toggle Row */}
        <div className={styles.toggleFoldersRow}>
          <button 
            onClick={() => {
              setExpandedFolders({
                randomizers: true,
                security: true,
                text: true,
                developer: true,
                calculators: true,
                images: true,
              });
            }}
            className={styles.toggleFoldersBtn}
          >
            Expand All
          </button>
          <span className={styles.toggleSeparator}>&bull;</span>
          <button 
            onClick={() => {
              setExpandedFolders({
                randomizers: false,
                security: false,
                text: false,
                developer: false,
                calculators: false,
                images: false,
              });
            }}
            className={styles.toggleFoldersBtn}
          >
            Collapse All
          </button>
        </div>

        <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
 
        {/* Accordions */}
        <div className={styles.categoriesList}>
          {filteredCategories.map((category) => {
            const isExpanded = isSearchActive || expandedFolders[category.id];
            // Resolve original count
            const originalCategory = categories.find((c) => c.id === category.id);
            const totalCount = originalCategory ? originalCategory.items.length : category.items.length;

            return (
              <div key={category.id} className={styles.categorySection}>
                <button
                  onClick={() => toggleFolder(category.id)}
                  className={styles.categoryHeader}
                  disabled={isSearchActive}
                >
                  {category.icon}
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryBadge}>{totalCount}</span>
                  {!isSearchActive && (
                    <svg
                      className={`${styles.caretIcon} ${isExpanded ? styles.caretIconRotated : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </button>
                {isExpanded && (
                  <div className={styles.categoryItems}>
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`${styles.navBtn} ${pathname === item.href ? styles.navBtnActive : ""}`}
                        style={{ paddingLeft: "32px", fontSize: "0.9rem" }}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* 1. Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </Link>

        <nav className={styles.nav}>{renderNavList()}</nav>

        <div className={styles.sandboxBadge}>
          <div className={styles.pulseCircle}></div>
          <div className={styles.sandboxText}>
            <span className={styles.sandboxTitle}>100% Client-Side</span>
            <span className={styles.sandboxDesc}>Data processing occurs locally. No files or inputs ever touch the cloud.</span>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Sticky Header */}
      <header className={styles.mobileHeader}>
        <Link href="/" className={styles.brand}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className={styles.menuBtn}
          title="Open Drawer Menu"
          aria-label="Open Drawer Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* 3. Mobile Overlay Drawer */}
      {drawerOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)} />
          <div className={styles.drawerSheet}>
            <div className={styles.drawerHeader}>
              <div className={styles.brand}>
                <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
                <span className={styles.brandName}>SuperUtility</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className={styles.drawerCloseBtn}
                title="Close Drawer Menu"
                aria-label="Close Drawer Menu"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav className={styles.nav} style={{ gap: "6px" }}>
              {renderNavList()}
            </nav>

            <div className={styles.sandboxBadge} style={{ marginTop: "auto" }}>
              <div className={styles.pulseCircle}></div>
              <div className={styles.sandboxText}>
                <span className={styles.sandboxTitle}>100% Safe & Offline</span>
                <span className={styles.sandboxDesc}>Calculations run locally inside your browser sandbox. Complete privacy guaranteed.</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Main App Area */}
      <main className={styles.main}>
        <div className={styles.mainScrollContent}>
          {children}
        </div>

        {/* Global Page Footer */}
        <footer className={styles.footer} id="global-page-footer">
          <div className={styles.footerBrand}>
            <span>&copy; {new Date().getFullYear()} SuperUtility. All Rights Reserved.</span>
            <span className={styles.footerSeparator}>&bull;</span>
            <span className={styles.footerShield}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: "4px", display: "inline-block", verticalAlign: "middle" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              100% Client-Side Sandbox
            </span>
          </div>
          <div className={styles.footerLinks}>
            <Link 
              href="/terms-of-service" 
              className={`${styles.footerLink} ${pathname === "/terms-of-service" ? styles.footerLinkActive : ""}`}
              id="tos-footer-link"
            >
              Terms & Privacy
            </Link>
            <span className={styles.footerSeparator}>&bull;</span>
            <Link 
              href="/" 
              className={`${styles.footerLink} ${pathname === "/" ? styles.footerLinkActive : ""}`}
              id="home-footer-link"
            >
              Dashboard
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
