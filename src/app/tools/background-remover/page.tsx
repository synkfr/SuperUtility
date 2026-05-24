"use client";

import React from "react";
import BackgroundRemover from "@/components/BackgroundRemover";
import pageStyles from "@/app/page.module.css";

export default function BackgroundRemoverPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>AI Background Remover</h1>
      <p className={pageStyles.headerSubtitle}>
        Erase, fill, or blur image backgrounds, isolate fine hair details offline, and composite screen-blended glowing bloom effects completely in your browser.
      </p>
      
      <BackgroundRemover />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Offline AI Background Removal & Image Matting
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first <strong>AI Background Remover</strong> designed for portrait photographers, graphics designers, and developers. By utilizing local neural network processing via WebAssembly, the tool isolates subjects cleanly and performs high-end post-processing canvas effects without server-side computation.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Traditional tools create harsh outlines that cut off soft elements like hair, veils, or out-of-focus blurs. SuperUtility addresses this by predicting continuous <strong>Alpha Mattes</strong>, applying <strong>color decontamination</strong> to strip background spill, and compositing hardware-accelerated depth-of-field blurs and halo bloom layers.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my image uploaded to any server?</h3>
            <p className={pageStyles.seoCardText}>
              <strong>No.</strong> SuperUtility is completely private by design. The background removal model (RMBG-1.4) is dynamically downloaded once to your browser's local cache (IndexedDB) and executes 100% locally inside your browser sandbox. Your images never touch a server or cross the network.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How does the rim light bloom effect work?</h3>
            <p className={pageStyles.seoCardText}>
              The bloom effect duplicates the isolated transparent subject, applies a Gaussian blur, and layers it behind the subject under a <code className={pageStyles.seoCode}>screen</code> composite blending operation. This simulates natural backlighting, wrapping light bleed around fine hair strands so they blend realistically into solid color or blurred backdrops.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What format should I download the isolated subject in?</h3>
            <p className={pageStyles.seoCardText}>
              If you require a transparent background, you should download the output in <strong>PNG</strong> or <strong>WEBP</strong> format, as standard JPG / JPEG files do not support alpha transparency channels and will display a black background.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
