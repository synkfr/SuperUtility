"use client";

import React from "react";
import ImageEditor from "@/components/ImageEditor";
import pageStyles from "@/app/page.module.css";

export default function ImageResizerPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Image Resizer</h1>
      <p className={pageStyles.headerSubtitle}>Resize PNG, JPG, or WEBP image dimensions by customized pixels or maintain locked aspect ratios locally.</p>
      
      <ImageEditor defaultFocusSection="resize" />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Proportional Image Scaling
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a local, offline-first <strong>Image Resizer</strong> designed for resizing marketing assets, photos, or avatars. Resizing images before uploading them online saves storage margins and significantly optimizes website rendering performance.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our resizing tool allows you to specify custom target widths and heights in pixels, with a responsive aspect-ratio lock option to keep graphics perfectly proportional. Everything runs securely in-browser without sending your files over internet connections.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I lock the aspect ratio?</h3>
            <p className={pageStyles.seoCardText}>
              Locking the aspect ratio ensures your image does not stretch, compress, or look distorted when you alter one dimension. The height scales automatically based on changes to the width (and vice-versa).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my photo completely secure?</h3>
            <p className={pageStyles.seoCardText}>
              Yes. SuperUtility reads and draws image pixels locally inside your local browser memory space. Your private photos never leave your device, ensuring absolute privacy compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
