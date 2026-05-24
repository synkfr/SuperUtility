"use client";

import React from "react";
import RandomNumberGenerator from "@/components/RandomNumberGenerator";
import pageStyles from "@/app/page.module.css";

export default function RandomNumberPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Random Number Generator</h1>
      <p className={pageStyles.headerSubtitle}>Generate secure random integer or decimal numbers inside custom ranges using CSPRNG.</p>
      
      {/* 1. Interactive Tool Module */}
      <RandomNumberGenerator />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Random Number Generator
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a highly secure and completely unbiased <strong>Random Number Generator</strong>. Whether you need a single index integer (like a lottery draw or roll), custom float decimals (like physics coefficients), or non-repeating sets of sorted ranges, our tool handles it seamlessly in real-time.
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          You can specify the exact minimum and maximum bounds, set decimal precision from 0 to 5 places, generate lists of numbers at once, toggle duplicate prevention, and arrange outputs in ascending, descending, or shuffled layouts. Plus, with our modern layout tokens, you can copy individual numbers or export the entire list to your clipboard with a single click.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Why is CSPRNG better than typical software Math.random()?</h3>
            <p className={pageStyles.seoCardText}>
              Standard computer algorithms (like Javascript's built-in <code className={pageStyles.seoCode}>Math.random()</code>) are pseudo-random number generators (PRNG). They use fixed seed values that can be predicted after observing past sequences. SuperUtility uses your browser's native <strong>Cryptographically Secure Pseudo-Random Number Generator</strong> (<code className={pageStyles.seoCode}>CSPRNG</code>), which polls physical OS entropy noise, making it mathematically unpredictable and secure for security keys.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a modulo bias and how do you prevent it?</h3>
            <p className={pageStyles.seoCardText}>
              When mapping large random 32-bit integers onto custom ranges (like Min to Max), developers often use a standard modulo formula. This creates a statistical defect called <strong>modulo bias</strong>, where certain numbers have a slightly higher probability of selection. SuperUtility resolves this by utilizing unbiased scaling and rejection sampling to guarantee a perfectly equal distribution of choices.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I generate a sequence of non-repeating numbers?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! By turning off the <strong>"Allow Duplicates"</strong> toggle, SuperUtility uses a local rejection loop to filter out repeating values, allowing you to generate things like raffle grids or lottery pools without repeats.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is there a limit to how many numbers I can generate?</h3>
            <p className={pageStyles.seoCardText}>
              To prevent browser page crashes and memory leaks, we limit bulk generation to a high-speed batch size of <strong>100 numbers</strong> per click, executing instantly with sub-millisecond response rates.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Numeric Output Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Random Number Range Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Standard Integer Sequences</h3>
            <p className={pageStyles.seoCardText}>Ideal for board games, lottery draws, and sampling indices:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Range: 1 to 100 | Count: 5 | Allow Duplicates: No
Generated Array (Sorted Ascending):
[ 14, 27, 43, 81, 95 ]`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>High Precision Decimals (Float)</h3>
            <p className={pageStyles.seoCardText}>Perfect for statistical calculations, scientific simulations, or A/B testing splits:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Range: 0.0 to 1.0 | Decimals: 3 | Count: 3
Generated Floats:
[ 0.187, 0.543, 0.812 ]`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
