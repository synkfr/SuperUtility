"use client";

import React from "react";
import ImageToBase64 from "@/components/ImageToBase64";
import pageStyles from "@/app/page.module.css";

export default function ImageToBase64Page() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Image to Base64 Encoder</h1>
      <p className={pageStyles.headerSubtitle}>Encode local PNG, JPG, or WEBP graphics into base64 data URI embed strings safely completely offline.</p>
      
      <ImageToBase64 />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Base64 Graphics Embeds
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Image to Base64 Encoder** built for web developers, designers, and email marketers. Base64 encoding represents binary image data as a safe ASCII text string, allowing you to embed images directly inside HTML, CSS, or JSON documents.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          This technique eliminates external HTTP requests when loading small graphic icons, custom CSS cursor maps, or HTML email newsletters, resulting in faster asset delivery. Since all file processing executes locally, your corporate graphics never touch any cloud databases.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a Data URI base64 scheme?</h3>
            <p className={pageStyles.seoCardText}>
              A Data URI allows you to inline files directly inside web layouts. It takes the form: `data:image/[format];base64,[hash]`. Browsers parse this schema natively, rendering the graphic without needing external downloads.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my uploaded image sent to a server?</h3>
            <p className={pageStyles.seoCardText}>
              No. Unlike central converters that upload your assets to third-party servers, SuperUtility reads files locally using standard browser `FileReader` modules. No network packets are transmitted, protecting your intellectual property.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
