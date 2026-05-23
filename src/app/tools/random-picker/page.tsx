"use client";

import React from "react";
import RandomPicker from "@/components/RandomPicker";
import pageStyles from "@/app/page.module.css";

export default function RandomPickerPage() {
  return (
    <div className={pageStyles.contentWrapper}>
      <h1 className={pageStyles.headerTitle}>Random Picker</h1>
      <p className={pageStyles.headerSubtitle}>Pick winners, choices, or items from custom lists completely unbiased in-browser.</p>
      
      {/* 1. Interactive Tool Module */}
      <RandomPicker />

      {/* 2. Deep Semantic Tool Description */}
      <section className={pageStyles.seoSection} aria-label="Detailed Description">
        <h2 className={pageStyles.seoTitle}>
          About SuperUtility Random Picker
        </h2>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          SuperUtility provides a fun, interactive, and completely fair **Random List Picker** (or raffle sweep spinner). Perfect for teacher classroom draws, giveaway raffle sweeps, picking a restaurant for lunch, or resolving daily choices. 
        </p>
        <p className={pageStyles.seoCardText} style={{ fontSize: "1rem" }}>
          Simply paste or type your list of choices, and SuperUtility will instantly extract one or more items completely at random. You can configure options to pull multiple winners at once, prevent duplicates, and view your rolling history. Best of all, everything runs locally on your browser using pure math algorithms, ensuring no choice bias or predictable repeat patterns.
        </p>
      </section>

      {/* 3. Tool-Specific FAQ Grid */}
      <section className={pageStyles.seoSection} aria-label="Tool Frequently Asked Questions">
        <h2 className={pageStyles.seoTitle}>
          Frequently Asked Questions
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>How can I be sure the selections are completely fair?</h3>
            <p className={pageStyles.seoCardText}>
              We implement the standard **Fisher-Yates (Knuth) shuffling algorithm** to randomize the list. This mathematically guarantees that every single item on your list has an exactly equal probability of being chosen in every sweep, eliminating the bias found in simpler software shuffles.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>What is a software sorting bias?</h3>
            <p className={pageStyles.seoCardText}>
              Many basic websites implement random lists using a shortcut: <code className={pageStyles.seoCode}>list.sort(() =&gt; Math.random() - 0.5)</code>. This method is statistically broken! It does not provide uniform distributions because sorting comparisons are highly dependent on the browser's engine (e.g. Chrome's V8), resulting in certain items being selected significantly more often than others.
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Can I load default list presets?</h3>
            <p className={pageStyles.seoCardText}>
              Yes! We provide quick-roll presets for common draws:
              <br />
              • **Dice Roll**: Simulates a standard 6-sided die draw.
              <br />
              • **Coin Flip**: Classic Head or Tail selection.
              <br />
              • **Weekdays**: Picks a day from Monday through Sunday.
              <br />
              • **Meal Picker**: Picks from common food options (Pizza, Burger, Pasta).
            </p>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Is my list uploaded or saved anywhere?</h3>
            <p className={pageStyles.seoCardText}>
              No, never. Your list is kept strictly in your local browser memory state. As soon as you refresh or close the page, the data is wiped completely. Your draw lists remain absolutely private to you.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Usage Examples */}
      <section className={pageStyles.seoSection} aria-label="Usage Examples">
        <h2 className={pageStyles.seoTitle}>
          Random List Picker Examples
        </h2>
        <div className={pageStyles.seoGrid}>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Classroom Student Draw</h3>
            <p className={pageStyles.seoCardText}>Paste a list of names to fairly pick a student to answer the next question:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Input Names:
Alice
Bob
Charlie
Diana
Ethan

// Picked Winner:
Winner: Diana`}
            </pre>
          </div>
          <div className={pageStyles.seoCard}>
            <h3 className={pageStyles.seoCardTitle}>Giveaway Raffle Draw</h3>
            <p className={pageStyles.seoCardText}>Draw 3 distinct winners from a ticket list without repeats:</p>
            <pre className={pageStyles.seoCode} style={{ display: "block", whiteSpace: "pre-wrap", padding: "12px", fontSize: "0.85rem" }}>
{`// Draw Settings:
Batch Size: 3 Winners
Allow Duplicates: Disabled

// Output Results:
1st Place: Charlie
2nd Place: Alice
3rd Place: Ethan`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
