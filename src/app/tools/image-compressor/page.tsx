"use client";

import React from "react";
import ImageCompressor from "@/components/ImageCompressor";
import pageStyles from "@/app/page.module.css";

export default function ImageCompressorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Image Compressor</h1>
      <p className={pageStyles.headerSubtitle}>Optimize image file sizes locally in your web browser by adjusting compression quality factors.</p>
      
      <ImageCompressor />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Client-Side Graphic Optimization
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a powerful **Image Compressor** designed for optimizing web graphics, layouts, and document uploads. Standard web images contain bloated header tags and uncompressed color channels that lead to high load times, dragging down Largest Contentful Paint (LCP) performance.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our compressor loads files into browser memory and redraws them onto custom HTML5 canvas buffers, utilizing adaptive DCT (Discrete Cosine Transform) compression. This process reduces file sizes by up to 90% while preserving high visual details, all done without any central cloud processing.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does canvas compression work?</h3>
            <p className={pageStyles.seoCardText}>
              We draw your image onto a hidden {"<canvas>"} and convert it back to a base64 string using `toDataURL("image/jpeg", quality)`. This leverages the browser's native image rendering engine to shrink file size dynamically.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my private image kept safe?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, absolutely! SuperUtility performs 100% of the image loading, pixel drawing, and compression actions inside your local browser memory sandbox. Your private photos never touch any external server, ensuring absolute safety.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
