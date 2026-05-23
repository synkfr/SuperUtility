"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfOcrPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Free OCR PDF Text Extractor</h1>
      <p className={pageStyles.headerSubtitle}>
        Recognize and extract editable text contents from scanned PDF pages locally in your browser.
      </p>

      <PdfEditor defaultFocusSection="ocr" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Local WebAssembly-Based Text Recognition (OCR)</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility OCR PDF tool loads neural network text models (Tesseract.js WebAssembly) directly in your browser. This lets you select specific document canvas page viewports, extract exact printed letters locally with no cloud communication, copy text blocks, and translate image files securely.
        </p>
      </section>
    </div>
  );
}
