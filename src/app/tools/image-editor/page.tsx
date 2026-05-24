"use client";

import React from "react";
import ImageEditor from "@/components/ImageEditor";
import pageStyles from "@/app/page.module.css";

export default function ImageEditorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>All-in-One Image Editor & Batch Processor</h1>
      <p className={pageStyles.headerSubtitle}>
        Compress, resize, crop, rotate, flip, and convert multiple images at once. 100% free, private, and secure browser-level processing.
      </p>
      
      {/* 1. All-in-One Component */}
      <ImageEditor defaultFocusSection="resize" />

      {/* 2. SEO-Enriched Information Sections */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About the All-in-One Browser Image Editor
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a premium, local, browser-based <strong>All-in-One Image Editor</strong> designed to streamline your design workflows. Instead of bouncing between separate pages to crop, rotate, resize, and compress your image files, this single unified interface allows you to execute complex transformations in a single transaction.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Perform operations globally on dozens of files at once or override edit configurations for individual files independently. Our processing engine executes 100% on your device, leveraging HTML5 Canvas and asynchronous sequentially structured queue computations to handle heavy batches without crashing your browser tab.
        </p>
      </section>

      {/* 3. FAQ Section */}
      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How do I resize images online for free?</h3>
            <p className={pageStyles.seoCardText}>
              Simply drag and drop your photos into the editor above. Under the "Resize" section on the right panel, input your target widths and heights (or scale by percentage) and click "Apply to All" or "Download".
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How do I compress multiple images at once?</h3>
            <p className={pageStyles.seoCardText}>
              Upload your files, adjust the quality compression slider to your preferred presets (e.g. 75% Quality), select your target format, and click "Download All as ZIP" to bundle all optimized files in a single click.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I crop and resize images without installing software?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! SuperUtility provides native, responsive draggable crop overlays and aspect ratio padlock constraints directly inside your browser. No installs, signups, or accounts are ever required.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my data completely secure?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely. Our tools are built on an offline-first privacy standard. Your images are loaded, transformed, and exported entirely within your local browser sandbox memory, ensuring zero data is ever uploaded to external servers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
