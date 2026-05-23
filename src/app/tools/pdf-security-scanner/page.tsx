"use client";

import React from "react";
import PdfSecurityScanner from "@/components/PdfSecurityScanner";
import pageStyles from "@/app/page.module.css";

export default function PdfSecurityScannerPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>PDF Security Scanner</h1>
      <p className={pageStyles.headerSubtitle}>
        Analyze PDF files locally to detect hidden JavaScript payloads, suspicious launch commands, and embedded files.
      </p>

      <PdfSecurityScanner />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Local Document Security Inspection</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility PDF Security Scanner inspects PDF file byte streams entirely inside your browser's local sandbox memory. The analyzer parses the document object structure, scanning for risk factors like active script flags, auto-run Additional Actions, or external system programs launch commands. This runs locally without transmitting your private contents to third-party databases.
        </p>
      </section>
    </div>
  );
}
