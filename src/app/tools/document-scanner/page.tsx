"use client";

import React from "react";
import DocumentScanner from "@/components/DocumentScanner";
import pageStyles from "@/app/page.module.css";

export default function DocumentScannerPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Online Document Scanner</h1>
      <p className={pageStyles.headerSubtitle}>
        Capture document snaps via camera, apply high-contrast print enhancements, and compile clean multi-page PDFs.
      </p>

      <DocumentScanner />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Local Camera-Based Document Capture</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility Document Scanner accesses your device's camera stream locally via the secure browser MediaDevices API. Capture sequential paper snaps, apply monochrome grayscale threshold filters, and calibrate contrast balances directly inside your browser sandbox. All processing occurs locally, ensuring secure documents exports with zero cloud transmission.
        </p>
      </section>
    </div>
  );
}
