"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfMergerPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Online PDF Merger</h1>
      <p className={pageStyles.headerSubtitle}>
        Combine multiple PDF files and images in your preferred sequence into a single, cohesive document.
      </p>

      <PdfEditor defaultFocusSection="merge" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Client-Side Multi-File Merger Capabilities</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility PDF Merger loads your binary documents, lets you drag page thumbnails to establish custom sequencing, and merges page dictionaries entirely in-browser. Zero file data is uploaded, ensuring complete privacy while combining personal reports, contracts, or tax returns.
        </p>
      </section>
    </div>
  );
}
