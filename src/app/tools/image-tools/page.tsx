"use client";

import React from "react";
import ImageEditor from "@/components/ImageEditor";
import pageStyles from "@/app/page.module.css";

export default function ImageToolsLandingPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Free Online Image Tools</h1>
      <p className={pageStyles.headerSubtitle}>
        Compress, resize, crop, rotate, flip, and convert multiple images at once. 100% free, private, and secure browser-level processing.
      </p>

      <ImageEditor defaultFocusSection="resize" />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Client-Side Offline Image Transforms</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility Image Tools bundle advanced Canvas-based cropping and rotation pipelines inside your browser. This enables you to resize and compress multiple photo sheets simultaneously, adjust scale percentages, crop precise aspects, and export optimized image directories as a ZIP archive with zero cloud telemetry.
        </p>
      </section>
    </div>
  );
}
