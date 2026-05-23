"use client";

import React from "react";
import ColorPickerImage from "@/components/ColorPickerImage";
import pageStyles from "@/app/page.module.css";

export default function ColorPickerImagePage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Color Picker from Image</h1>
      <p className={pageStyles.headerSubtitle}>Load any graphic image, hover to magnifying zoom pixels, and click to extract target colors in HEX, RGB, and HSL formats.</p>
      
      <ColorPickerImage />

      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About Client-Side Color Extraction
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **Color Picker from Image** designed for developers, graphic designers, and branding specialists. Selecting precise brand colors or sampling palette colors from design files is essential to keeping visuals cohesive.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Our color picker tool allows you to upload any local image file, and rendering it inside a canvas element. Simply hover or click over any section of the image to extract its exact pixel color data. Everything operates offline in-browser, preventing leakage of proprietary designs.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How are the color values extracted?</h3>
            <p className={pageStyles.seoCardText}>
              When you hover or click on the canvas, we get standard canvas coordinates and fetch the color data utilizing the browser's built-in `getImageData(x, y, 1, 1).data` API, which extracts pure red, green, blue, and alpha ratios.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my uploaded design graphic secure?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, 100% secure. Because SuperUtility runs entirely locally in your own browser's memory, your design files, graphics, or proprietary screenshot assets never touch any remote servers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
