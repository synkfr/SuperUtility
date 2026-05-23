"use client";

import React from "react";
import JwtDecoder from "@/components/JwtDecoder";
import pageStyles from "@/app/page.module.css";

export default function JwtDecoderPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>JWT Decoder</h1>
      <p className={pageStyles.headerSubtitle}>Decode JSON Web Token headers, payloads, and claims locally in your browser sandbox.</p>
      
      {/* 1. Interactive Tool Module */}
      <JwtDecoder />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About JSON Web Token (JWT) Decoding
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility offers an offline-first **JWT Decoder** tool designed for developers and security engineers. JSON Web Tokens (JWT) are an open, industry-standard RFC 7519 method for representing claims securely between two parties.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          A standard JWT consists of three parts separated by dots (`.`): a Header (specifying algorithm and token type), a Payload (containing claims like subject, expiration, and custom user metadata), and a Cryptographic Signature. Our tool reads this string, translates it instantly from Base64URL encoding, formats the resulting JSON structures, and auto-converts timestamp numbers (like standard claims `exp` and `iat`) into your local timezone dates.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my JWT token shared with any external servers?</h3>
            <p className={pageStyles.seoCardText}>
              Never. SuperUtility runs 100% client-side inside your web browser. The decoding logic happens locally in your device's Javascript engine. No network packets are sent, making it completely secure for decoding sensitive staging tokens.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What are standard claim keywords inside JWTs?</h3>
            <p className={pageStyles.seoCardText}>
              Common claims include: **sub** (Subject, usually user ID), **iss** (Issuer who created the token), **aud** (Audience for whom it is intended), **exp** (Expiration Unix epoch time), and **iat** (Issued-At Unix epoch time).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can this tool verify the signature of my token?</h3>
            <p className={pageStyles.seoCardText}>
              Signature validation requires providing your HMAC shared secret or RSA public key. To guarantee 100% local safety and prevent server secrets from ever traversing the web, this tool operates purely as a local structure decoder.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why does it show "Invalid base64 encoding"?</h3>
            <p className={pageStyles.seoCardText}>
              This error occurs when the JWT string contains illegal characters, is missing dot separators, or is missing correct padding characters required for standard Base64URL format conversions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          JWT Format & Claims Structure Example
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>JWT Encoded Structure</h3>
            <p className={pageStyles.seoCardText}>The raw token is a dot-separated string:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`[header_base64url].[payload_base64url].[signature_base64url]

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
.dYt5WjJrt04h256m082K_358sLh`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>JWT Decoded Claims Output</h3>
            <p className={pageStyles.seoCardText}>The result formatted as clean JSON key-values:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Decoded Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

// Decoded Payload Claims:
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
