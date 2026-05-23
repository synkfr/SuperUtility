"use client";

import React, { useState, useEffect } from "react";
import styles from "./JwtDecoder.module.css";

interface JwtDecoded {
  header: any;
  payload: any;
  signature: string;
  isValid: boolean;
  error?: string;
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JwtDecoded | null>(null);

  const base64UrlDecode = (str: string) => {
    try {
      // Add padding
      let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      return decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (e) {
      throw new Error("Invalid base64 encoding");
    }
  };

  const decodeJwt = (jwtString: string) => {
    const trimmed = jwtString.trim();
    if (!trimmed) {
      setDecoded(null);
      return;
    }

    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      setDecoded({
        header: null,
        payload: null,
        signature: "",
        isValid: false,
        error: "A valid JWT must contain exactly 3 parts separated by dots (.)",
      });
      return;
    }

    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]));
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
      setDecoded({
        header: headerJson,
        payload: payloadJson,
        signature: parts[2],
        isValid: true,
      });
    } catch (e: any) {
      setDecoded({
        header: null,
        payload: null,
        signature: "",
        isValid: false,
        error: `Failed to decode: ${e.message || "Invalid JWT format"}`,
      });
    }
  };

  useEffect(() => {
    decodeJwt(token);
  }, [token]);

  const handleSampleToken = () => {
    // Generate a secure mock JWT for demonstration
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      sub: "1234567890",
      name: "John Doe",
      email: "john.doe@superutility.xyz",
      admin: true,
      iat: Math.floor(Date.now() / 1000) - 3600,
      exp: Math.floor(Date.now() / 1000) + 86400,
      iss: "https://superutility.xyz",
    };
    
    const encode = (obj: object) => {
      const str = JSON.stringify(obj);
      return btoa(unescape(encodeURIComponent(str)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const sample = `${encode(header)}.${encode(payload)}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    setToken(sample);
  };

  const formatTimestamp = (sec: number) => {
    try {
      const d = new Date(sec * 1000);
      return d.toLocaleString() + ` (${sec})`;
    } catch (e) {
      return String(sec);
    }
  };

  const renderFormattedJson = (obj: any) => {
    if (!obj) return null;
    return (
      <pre className={styles.jsonPre}>
        {"{\n"}
        {Object.entries(obj).map(([key, value], i, arr) => {
          const isLast = i === arr.length - 1;
          const isTimestamp = ["exp", "iat", "nbf", "auth_time"].includes(key) && typeof value === "number";
          
          let valStr = "";
          let valClass = styles.jsonValString;
          if (typeof value === "string") {
            valStr = `"${value}"`;
          } else if (typeof value === "number") {
            valStr = String(value);
            valClass = styles.jsonValNumber;
          } else if (typeof value === "boolean") {
            valStr = String(value);
            valClass = styles.jsonValBool;
          } else {
            valStr = JSON.stringify(value);
            valClass = styles.jsonValObject;
          }

          return (
            <div key={key} className={styles.jsonLine}>
              {"  "}
              <span className={styles.jsonKey}>"{key}"</span>:{" "}
              <span className={valClass}>{valStr}</span>
              {!isLast && ","}
              {isTimestamp && (
                <span className={styles.jsonComment}> // {formatTimestamp(value as number)}</span>
              )}
            </div>
          );
        })}
        {"}"}
      </pre>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputCard}>
        <div className={styles.cardHeader}>
          <span className={styles.label}>Paste encoded JWT token</span>
          <button onClick={handleSampleToken} className={styles.sampleBtn}>
            Load Sample Token
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          className={styles.textarea}
          rows={5}
        />
      </div>

      {decoded && (
        <div className={styles.outputGrid}>
          {!decoded.isValid ? (
            <div className={styles.errorCard}>
              <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className={styles.errorTitle}>Validation Error</h4>
                <p className={styles.errorDesc}>{decoded.error}</p>
              </div>
            </div>
          ) : (
            <div className={styles.decodeSection}>
              {/* Header */}
              <div className={styles.resultCard}>
                <div className={styles.resultHeader} style={{ borderLeftColor: "#38bdf8" }}>
                  <span className={styles.resultTitle}>Header (Algorithm & Token Type)</span>
                </div>
                <div className={styles.resultContent}>
                  {renderFormattedJson(decoded.header)}
                </div>
              </div>

              {/* Payload */}
              <div className={styles.resultCard}>
                <div className={styles.resultHeader} style={{ borderLeftColor: "#a3e635" }}>
                  <span className={styles.resultTitle}>Payload (Claims / Data)</span>
                </div>
                <div className={styles.resultContent}>
                  {renderFormattedJson(decoded.payload)}
                </div>
              </div>

              {/* Signature */}
              <div className={styles.resultCard}>
                <div className={styles.resultHeader} style={{ borderLeftColor: "#f43f5e" }}>
                  <span className={styles.resultTitle}>Signature Verification Status</span>
                </div>
                <div className={styles.signatureContent}>
                  <p className={styles.sigDesc}>
                    Note: Verification requires the secret key. SuperUtility decodes tokens 100% locally and does not transmit secrets.
                  </p>
                  <pre className={styles.sigPre}>{decoded.signature || "No signature found"}</pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
