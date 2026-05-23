"use client";

import React from "react";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import pageStyles from "@/app/page.module.css";

export default function QrCodeGeneratorPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>QR Code Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate high-resolution PNG and vector SVG QR Codes instantly and securely.</p>
      
      {/* 1. Interactive Tool Module */}
      <QrCodeGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility QR Code Generator
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a modern, pixel-perfect tool to design and export standard QR (Quick Response) codes. It allows you to enter any text, URL, email address, or contact detail and generates matching high-density graphics instantly in real-time. 
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          You can customize the QR Code's color palette (selecting from gorgeous premium presets or defining custom CSS hex colors), adjust outer margin paddings, and control error correction density. Best of all, SuperUtility supports exporting in both raster **PNG** graphics and scale-independent **vector SVG** formats—allowing you to scale your QR graphics infinitely for digital layouts or print media without losing clarity.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my QR Code content sent to any external server?</h3>
            <p className={pageStyles.seoCardText}>
              Absolutely not. Unlike many free online QR generators that track your URL hits or route links through their own tracking servers, SuperUtility processes everything locally on your device. Your data never leaves your browser, ensuring absolute security.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are QR Error Correction levels (L, M, Q, H)?</h3>
            <p className={pageStyles.seoCardText}>
              QR codes use the mathematical Reed-Solomon algorithm to recover data if the code is scratched, dirty, or partially covered. The levels represent data restoration capacities:
              <br />
              • **Level L**: Restores up to 7% of data (best for clean digital URLs).
              <br />
              • **Level M**: Restores up to 15% (standard fallback default).
              <br />
              • **Level Q**: Restores up to 25% (great for harsh environments).
              <br />
              • **Level H**: Restores up to 30% (perfect if you want to place a custom logo in the center).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I generate QR codes without the Internet?</h3>
            <p className={pageStyles.seoCardText}>
              Yes, entirely! The encoding calculations and SVG generation occur entirely inside your browser's local sandbox. You can disconnect your network connection completely, and the QR builder will continue working flawlessly.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why should I export in SVG format?</h3>
            <p className={pageStyles.seoCardText}>
              PNG files consist of fixed pixel grids that become blurry when scaled up. SVG (Scalable Vector Graphics) defines the QR pixels as mathematical vectors, allowing you to print them onto business cards, posters, or billboards at infinite resolutions with perfect sharpness.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Payload Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Structured QR Code Payload Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Wi-Fi Network Configuration</h3>
            <p className={pageStyles.seoCardText}>Scan this payload to connect automatically to a local router without typing the password:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Format: WIFI:T:[WPA|WEP|nopass];S:[SSID];P:[PASSWORD];;
WIFI:T:WPA;S:HomeNetwork;P:SuperSecret123;;`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Contact Details (vCard)</h3>
            <p className={pageStyles.seoCardText}>Scan this payload to add a new contact card straight to your mobile device's address book:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Standard Contact Card layout
BEGIN:VCARD
VERSION:3.0
N:Doe;John
FN:John Doe
ORG:SuperUtility
TEL;CELL:+15550199
URL:https://superutility.xyz
END:VCARD`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
