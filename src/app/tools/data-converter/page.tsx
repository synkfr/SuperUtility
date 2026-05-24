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
        ✨ 100% Free Tools • Zero Registration Required • Offline Privacy Protected • No Premium Paywalls
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
