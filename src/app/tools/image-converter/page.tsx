"use client";

import React from "react";
import ImageEditor from "@/components/ImageEditor";
import pageStyles from "@/app/page.module.css";

export default function ImageConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Image Converter (PNG ↔ JPG ↔ WEBP)</h1>
      <p className={pageStyles.headerSubtitle}>Convert images instantly between standard PNG, JPEG, and WEBP formats completely offline in-browser.</p>
      
      <ImageEditor defaultFocusSection="convert" />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Client-Side Format Transformations
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a highly efficient <strong>Image Format Converter</strong> designed for changing graphical extensions. Different extensions serve different performance targets: PNG handles transparent backgrounds beautifully; JPEG offers rich colors for photographic assets; WEBP integrates modern, highly-optimized compression ratios.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our converter loads the source graphic into memory, draws it onto an offline canvas, and outputs it in your target extension. Since all code execution happens client-side, your confidential design files never touch external servers, preventing leaks.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are the differences between extensions?</h3>
            <p className={pageStyles.seoCardText}>
              - <strong>PNG</strong>: Lossless compression, supports background transparency. Excellent for logos and vector icons.
              - <strong>JPEG</strong>: Lossy compression. Excellent for photos and color-dense screens.
              - <strong>WEBP</strong>: Next-generation web format. Merges transparency and rich colors with up to 30% smaller file sizes than JPEGs.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my graphics data stored?</h3>
            <p className={pageStyles.seoCardText}>
              No. SuperUtility does not own or maintain any servers for processing graphics. Your image conversions are entirely managed locally inside your own browser window, ensuring total visual confidentiality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
