"use client";

import React, { useState, useEffect } from "react";
import styles from "./UrlParser.module.css";

interface ParsedUrl {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: { key: string; value: string }[];
  isValid: boolean;
  error?: string;
}

export default function UrlParser() {
  const [urlInput, setUrlInput] = useState("");
  const [parsed, setParsed] = useState<ParsedUrl | null>(null);

  const parseUrlString = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      setParsed(null);
      return;
    }

    try {
      // If URL does not start with protocol, try adding a temporary one for parsing
      let urlToParse = trimmed;
      if (!/^https?:\/\//i.test(trimmed) && !/^ftp:\/\//i.test(trimmed)) {
        urlToParse = "https://" + trimmed;
      }

      const urlObj = new URL(urlToParse);
      
      const queryParams: { key: string; value: string }[] = [];
      urlObj.searchParams.forEach((value, key) => {
        queryParams.push({ key, value });
      });

      setParsed({
        protocol: urlObj.protocol,
        host: urlObj.host,
        hostname: urlObj.hostname,
        port: urlObj.port || "default",
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        params: queryParams,
        isValid: true,
      });
    } catch (e: any) {
      setParsed({
        protocol: "",
        host: "",
        hostname: "",
        port: "",
        pathname: "",
        search: "",
        hash: "",
        params: [],
        isValid: false,
        error: "Invalid URL structure. Please provide a valid absolute or relative URL (e.g. domain.com or https://domain.com/path).",
      });
    }
  };

  useEffect(() => {
    parseUrlString(urlInput);
  }, [urlInput]);

  const handleLoadSample = () => {
    setUrlInput("https://superutility.xyz/tools/url-parser?theme=dark&client_id=987345&ref=docs#interactive-demo");
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputCard}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Enter URL String</span>
          <button onClick={handleLoadSample} className={styles.sampleBtn}>
            Load Sample URL
          </button>
        </div>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/path?query=val#hash"
          className={styles.input}
        />
      </div>

      {parsed && (
        <div className={styles.outputArea}>
          {!parsed.isValid ? (
            <div className={styles.errorCard}>
              <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className={styles.errorTitle}>Parsing Error</h4>
                <p className={styles.errorDesc}>{parsed.error}</p>
              </div>
            </div>
          ) : (
            <div className={styles.resultsWrapper}>
              {/* Components Cards Grid */}
              <div className={styles.componentsGrid}>
                <div className={styles.componentCard}>
                  <span className={styles.compLabel}>Protocol</span>
                  <div className={styles.compValRow}>
                    <span className={styles.compVal} style={{ color: "#2563eb" }}>{parsed.protocol}</span>
                    <button onClick={() => handleCopy(parsed.protocol)} className={styles.compCopyBtn}>Copy</button>
                  </div>
                </div>

                <div className={styles.componentCard}>
                  <span className={styles.compLabel}>Hostname</span>
                  <div className={styles.compValRow}>
                    <span className={styles.compVal}>{parsed.hostname}</span>
                    <button onClick={() => handleCopy(parsed.hostname)} className={styles.compCopyBtn}>Copy</button>
                  </div>
                </div>

                <div className={styles.componentCard}>
                  <span className={styles.compLabel}>Pathname</span>
                  <div className={styles.compValRow}>
                    <span className={styles.compVal} style={{ color: "#059669" }}>{parsed.pathname}</span>
                    <button onClick={() => handleCopy(parsed.pathname)} className={styles.compCopyBtn}>Copy</button>
                  </div>
                </div>

                <div className={styles.componentCard}>
                  <span className={styles.compLabel}>Port</span>
                  <div className={styles.compValRow}>
                    <span className={styles.compVal}>{parsed.port}</span>
                    {parsed.port !== "default" && <button onClick={() => handleCopy(parsed.port)} className={styles.compCopyBtn}>Copy</button>}
                  </div>
                </div>

                <div className={styles.componentCard}>
                  <span className={styles.compLabel}>Hash / Anchor</span>
                  <div className={styles.compValRow}>
                    <span className={styles.compVal} style={{ color: "#d97706" }}>{parsed.hash || "none"}</span>
                    {parsed.hash && <button onClick={() => handleCopy(parsed.hash)} className={styles.compCopyBtn}>Copy</button>}
                  </div>
                </div>
              </div>

              {/* Query Parameters Section */}
              <div className={styles.paramsCard}>
                <h3 className={styles.paramsTitle}>Query String Parameters ({parsed.params.length})</h3>
                {parsed.params.length === 0 ? (
                  <p className={styles.noParams}>No search query parameters found in the URL.</p>
                ) : (
                  <div className={styles.paramsList}>
                    <div className={styles.paramsHeaderRow}>
                      <span>Parameter Key</span>
                      <span>Decoded Value</span>
                    </div>
                    {parsed.params.map((param, index) => (
                      <div key={index} className={styles.paramRow}>
                        <span className={styles.paramKey}>{param.key}</span>
                        <div className={styles.paramValueCell}>
                          <span className={styles.paramValue}>{param.value}</span>
                          <button
                            onClick={() => handleCopy(param.value)}
                            className={styles.paramCopyBtn}
                            title="Copy parameter value"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
