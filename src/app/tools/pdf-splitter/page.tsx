"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfSplitterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Online PDF Splitter</h1>
      <p className={pageStyles.headerSubtitle}>
        Extract target page ranges or split single PDFs into multiple standalone documents client-side.
      </p>

      <PdfEditor defaultFocusSection="split" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Draggable Page Extraction and Splitting</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility PDF Splitter reads source dictionaries locally and lists all page views. Check specific checkbox indicators on page thumbnails to extract a new consolidated file, or save individual pages instantly. All processing occurs locally, providing zero-telemetry document parsing.
        </p>
      </section>
    </div>
  );
}
