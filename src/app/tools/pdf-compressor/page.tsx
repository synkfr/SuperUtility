"use client";

import React from "react";
import PdfEditor from "@/components/PdfEditor";
import pageStyles from "@/app/page.module.css";

export default function PdfCompressorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Online PDF Compressor</h1>
      <p className={pageStyles.headerSubtitle}>
        Compress and reduce the file size of PDF documents client-side without compromising structural layout fidelity.
      </p>

      <PdfEditor defaultFocusSection="compress" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Client-Side Size Optimization Methods</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility PDF Compressor copies the active pages into a fresh document index structure, automatically discarding unreferenced fonts, metadata bloating, and redundant index keys. The compressor executes locally in the browser sandbox memory, keeping your documents highly optimized for emails and standard file portal loads.
        </p>
      </section>
    </div>
  );
}
