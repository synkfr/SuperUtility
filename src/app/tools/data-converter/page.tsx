"use client";

import React from "react";
import DataConverter from "@/components/DataConverter";
import pageStyles from "@/app/page.module.css";

export default function DataConverterPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Data & Storage Converter</h1>
      <p className={pageStyles.headerSubtitle}>
        Convert storage and size values in real-time between bits, Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, and Petabytes (decimal and binary).
      </p>

      {/* Free & Privacy Banner */}
      <div 
        style={{
          background: "var(--lime-50)",
          border: "1.5px solid var(--lime-200)",
          borderRadius: "var(--radius-md)",
          padding: "12px 18px",
          color: "var(--lime-800)",
          fontSize: "0.85rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "24px"
        }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", marginTop: "-2px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
      </div>

      <DataConverter />

      {/* SEO Section */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>Free Browser-Based Data & Storage Size Converter</h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility includes a high-fidelity <strong>Data and Storage Converter</strong> designed to translate values between digital storage scales. Everything happens locally in your browser memory, keeping your specifications private.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          This converter supports both standard decimal SI units (base 10, e.g. KB, MB, GB, TB) and standard binary IEC units (base 2, e.g. KiB, MiB, GiB, TiB) which are commonly used in system memory calculations. Ideal for software engineers, database admins, hardware technicians, and content creators.
        </p>
      </section>

      <section className={pageStyles.seoSection} aria-label="Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>Frequently Asked Questions</h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is the difference between GB and GiB?</h3>
            <p className={pageStyles.seoCardText}>
              Gigabyte (GB) uses the standard decimal prefix where 1 GB = 10⁹ bytes (1,000,000,000 bytes). Gibibyte (GiB) uses the binary prefix where 1 GiB = 2³⁰ bytes (1,073,741,824 bytes), which is about 7.37% larger.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is it completely free with no limits?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, absolutely! All developer and data tools on SuperUtility are completely free with zero restrictions, subscriptions, limits, or paywalls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
