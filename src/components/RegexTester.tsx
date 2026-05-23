"use client";

import React, { useState, useEffect } from "react";
import styles from "./RegexTester.module.css";

interface MatchResult {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [testText, setTestText] = useState("Hello! You can reach us at contact@superutility.xyz or support@superutility.xyz.");
  
  // Flags
  const [globalFlag, setGlobalFlag] = useState(true);
  const [ignoreCaseFlag, setIgnoreCaseFlag] = useState(false);
  const [multilineFlag, setMultilineFlag] = useState(false);

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [highlightedHtml, setHighlightedHtml] = useState<React.ReactNode[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern.trim()) {
      setMatches([]);
      setHighlightedHtml([testText]);
      setRegexError(null);
      return;
    }

    try {
      let flags = "";
      if (globalFlag) flags += "g";
      if (ignoreCaseFlag) flags += "i";
      if (multilineFlag) flags += "m";

      const regex = new RegExp(pattern, flags);
      setRegexError(null);

      // Perform matches
      const results: MatchResult[] = [];
      let tempMatches: RegExpExecArray | null;

      if (globalFlag) {
        // Reset lastIndex just in case
        regex.lastIndex = 0;
        let guard = 0; // prevent infinite loops on zero-width matches
        while ((tempMatches = regex.exec(testText)) !== null && guard < 1000) {
          guard++;
          results.push({
            text: tempMatches[0],
            index: tempMatches.index,
            groups: tempMatches.slice(1),
          });
          if (tempMatches[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        tempMatches = regex.exec(testText);
        if (tempMatches) {
          results.push({
            text: tempMatches[0],
            index: tempMatches.index,
            groups: tempMatches.slice(1),
          });
        }
      }

      setMatches(results);

      // Build highlighted preview
      if (results.length === 0) {
        setHighlightedHtml([testText]);
      } else {
        const nodes: React.ReactNode[] = [];
        let lastIdx = 0;

        results.forEach((match, idx) => {
          // Add text before match
          if (match.index > lastIdx) {
            nodes.push(testText.substring(lastIdx, match.index));
          }
          // Add highlighted match
          nodes.push(
            <mark key={`m-${idx}`} className={styles.highlight}>
              {match.text}
            </mark>
          );
          lastIdx = match.index + match.text.length;
        });

        // Add remaining text
        if (lastIdx < testText.length) {
          nodes.push(testText.substring(lastIdx));
        }

        setHighlightedHtml(nodes);
      }
    } catch (e: any) {
      setRegexError(e.message || "Invalid regular expression pattern");
      setMatches([]);
      setHighlightedHtml([testText]);
    }
  }, [pattern, testText, globalFlag, ignoreCaseFlag, multilineFlag]);

  const handleLoadEmailSample = () => {
    setPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
    setTestText("Hello! You can reach us at contact@superutility.xyz or support@superutility.xyz.");
    setGlobalFlag(true);
    setIgnoreCaseFlag(false);
    setMultilineFlag(false);
  };

  const handleLoadPhoneSample = () => {
    setPattern("\\+?\\d{1,4}[-\\s]?\\(?\\d{1,3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}");
    setTestText("Call us at +1 (555) 019-2834 or dial 555-019-5832 directly.");
    setGlobalFlag(true);
    setIgnoreCaseFlag(false);
    setMultilineFlag(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlGrid}>
        {/* Pattern input card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Regular Expression Pattern</span>
            <div className={styles.sampleRow}>
              <button onClick={handleLoadEmailSample} className={styles.sampleBtn}>Email Pattern</button>
              <button onClick={handleLoadPhoneSample} className={styles.sampleBtn}>Phone Pattern</button>
            </div>
          </div>

          <div className={styles.patternInputRow}>
            <span className={styles.regexDelimiter}>/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className={styles.patternInput}
            />
            <span className={styles.regexDelimiter}>/</span>
            
            {/* Flags */}
            <div className={styles.flagToggles}>
              <label className={styles.flagLabel} title="Global search">
                <input
                  type="checkbox"
                  checked={globalFlag}
                  onChange={(e) => setGlobalFlag(e.target.checked)}
                />
                <span>g</span>
              </label>
              <label className={styles.flagLabel} title="Ignore case">
                <input
                  type="checkbox"
                  checked={ignoreCaseFlag}
                  onChange={(e) => setIgnoreCaseFlag(e.target.checked)}
                />
                <span>i</span>
              </label>
              <label className={styles.flagLabel} title="Multiline search">
                <input
                  type="checkbox"
                  checked={multilineFlag}
                  onChange={(e) => setMultilineFlag(e.target.checked)}
                />
                <span>m</span>
              </label>
            </div>
          </div>

          {regexError && (
            <div className={styles.errorText}>
              Syntax Error: {regexError}
            </div>
          )}
        </div>

        {/* Text area card */}
        <div className={styles.card}>
          <span className={styles.label}>Test Text Block</span>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter test text here..."
            className={styles.textarea}
            rows={5}
          />
        </div>
      </div>

      {/* Matching Results Preview */}
      <div className={styles.resultsGrid}>
        {/* Highlighted text preview */}
        <div className={styles.card}>
          <span className={styles.label}>Matches Highlighted Output</span>
          <div className={styles.highlightBox}>
            {highlightedHtml.length > 0 ? highlightedHtml : <span style={{ color: "var(--text-muted)" }}>Preview will show here...</span>}
          </div>
        </div>

        {/* Matches statistics list */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Matched Groups ({matches.length})</span>
          </div>

          {matches.length === 0 ? (
            <div className={styles.noMatches}>
              No regex matches found in test string.
            </div>
          ) : (
            <div className={styles.matchesList}>
              {matches.map((match, idx) => (
                <div key={idx} className={styles.matchItem}>
                  <div className={styles.matchMeta}>
                    <span className={styles.matchBadge}>Match #{idx + 1}</span>
                    <span className={styles.matchIndex}>Char Index: {match.index}</span>
                  </div>
                  <div className={styles.matchTextVal}>{match.text}</div>
                  
                  {match.groups.length > 0 && (
                    <div className={styles.groupsSection}>
                      <span className={styles.groupsLabel}>Capture Groups:</span>
                      <div className={styles.groupsGrid}>
                        {match.groups.map((grp, gidx) => (
                          <div key={gidx} className={styles.groupSubItem}>
                            <span className={styles.groupIndex}>${gidx + 1}:</span>
                            <span className={styles.groupVal}>{grp || "null"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
