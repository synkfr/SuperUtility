"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfEditorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>All-in-One PDF Editor & Suite</h1>
      <p className={pageStyles.headerSubtitle}>
        Merge, split, rotate, watermark, encrypt, and extract text from PDF files locally. 100% free, browser-based, and private.
      </p>

      <PdfEditor defaultFocusSection="merge" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>About the All-in-One Client-Side PDF Suite</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility PDF Suite runs entirely inside your browser's local sandbox memory using the Web Cryptography API and HTML5 canvas renderings. Unlike standard online PDF editors, your confidential documents are never uploaded to any remote server or processed in cloud systems, providing bulletproof privacy compliance for corporate contracts, medical bills, and personal records.
        </p>
      </section>
    </div>
  );
}
