"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function ImageToPdfPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Image to PDF Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert JPG, PNG, WEBP, and GIF graphics into optimized, standard PDF sheets locally in your browser.
      </p>

      <PdfEditor defaultFocusSection="merge" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Client-Side Image to PDF Compilation</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Convert multiple digital images and photo files into a single, cohesive PDF document with no artificial file limits. You can drag, drop, reorder pages, and apply text or image watermark stamps globally before compilation. Everything runs in-browser, maintaining absolute file privacy.
        </p>
      </section>
    </div>
  );
}
