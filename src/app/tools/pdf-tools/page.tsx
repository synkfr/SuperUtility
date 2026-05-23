"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfToolsLandingPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Free Online PDF & Document Tools</h1>
      <p className={pageStyles.headerSubtitle}>
        Sanitize metadata, encrypt, watermark, merge, or split PDF files entirely on your device with zero upload latency.
      </p>

      <PdfEditor defaultFocusSection="merge" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Why Process PDF Documents Locally?</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Traditional online tools copy your files to external databases, exposing confidential credentials. SuperUtility utilizes standard client-side compilers like `pdf-lib` and WebAssembly layers to run all modifications inside the browser, offering 100% data sanitization, zero internet bandwidth consumption, and instant offline compilation.
        </p>
      </section>
    </div>
  );
}
