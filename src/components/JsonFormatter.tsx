"use client";

import React, { useState } from "react";
import styles from "./JsonFormatter.module.css";

// Recursive JsonNode component to render interactive collapsible JSON tree
interface JsonNodeProps {
  name: string | number;
  value: any;
  isLast: boolean;
}

const JsonNode: React.FC<JsonNodeProps> = ({ name, value, isLast }) => {
  const [collapsed, setCollapsed] = useState(false);

  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  const renderValue = () => {
    if (value === null) return <span className={styles.typeNull}>null</span>;
    if (typeof value === "boolean") return <span className={styles.typeBool}>{value ? "true" : "false"}</span>;
    if (typeof value === "number") return <span className={styles.typeNumber}>{value}</span>;
    if (typeof value === "string") return <span className={styles.typeString}>"{value}"</span>;
    return null;
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed(!collapsed);
  };

  if (!isObject) {
    return (
      <div className={styles.nodeRow}>
        <span className={styles.nodeKey}>"{name}":</span>{" "}
        <span className={styles.nodeValue}>{renderValue()}</span>
        {!isLast && <span className={styles.comma}>,</span>}
      </div>
    );
  }

  const entries = isArray ? value : Object.entries(value);
  const isEmpty = entries.length === 0;
  const startChar = isArray ? "[" : "{";
  const endChar = isArray ? "]" : "}";

  return (
    <div className={styles.nodeGroup}>
      <div className={`${styles.nodeRow} ${styles.collapsibleRow}`} onClick={handleToggle}>
        <span className={`${styles.caret} ${collapsed ? styles.caretCollapsed : ""}`}>▼</span>
        <span className={styles.nodeKey}>"{name}":</span>{" "}
        <span className={styles.bracket}>{startChar}</span>
        {collapsed && (
          <>
            <span className={styles.ellipsis}>...</span>
            <span className={styles.bracket}>{endChar}</span>
            {!isLast && <span className={styles.comma}>,</span>}
          </>
        )}
      </div>

      {!collapsed && (
        <div className={styles.nestedContent}>
          {entries.map((item: any, idx: number) => {
            const childName = isArray ? idx : item[0];
            const childVal = isArray ? item : item[1];
            const isChildLast = idx === entries.length - 1;

            return (
              <JsonNode 
                key={childName} 
                name={childName} 
                value={childVal} 
                isLast={isChildLast} 
              />
            );
          })}
        </div>
      )}

      {!collapsed && (
        <div className={styles.nodeRow} style={{ paddingLeft: "12px" }}>
          <span className={styles.bracket}>{endChar}</span>
          {!isLast && <span className={styles.comma}>,</span>}
        </div>
      )}
    </div>
  );
};


export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"editor" | "tree">("editor");

  const handleFormat = (spacing = 2) => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spacing));
      setParsedJson(parsed);
      setErrorMsg("");
    } catch (e: any) {
      setErrorMsg(e.message);
      setParsedJson(null);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setParsedJson(parsed);
      setErrorMsg("");
    } catch (e: any) {
      setErrorMsg(e.message);
      setParsedJson(null);
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setErrorMsg("");
      setParsedJson(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setErrorMsg("");
    } catch (e: any) {
      setErrorMsg(e.message);
      setParsedJson(null);
    }
  };

  const handleCopy = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setErrorMsg("");
    setParsedJson(null);
    setViewMode("editor");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <div className={styles.textareaHeader}>
          <span className={styles.label}>JSON input & formatting controls</span>
          <div className={styles.headerActions}>
            {input.trim().length > 0 && (
              <>
                <button onClick={handleCopy} className={styles.actionBtn}>
                  {copySuccess ? "Copied!" : "Copy JSON"}
                </button>
                <button onClick={handleClear} className={styles.clearBtn}>
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Casing Tabs Editor vs Visual Tree */}
        <div className={styles.tabsRow}>
          <div className={styles.viewSelector}>
            <button
              onClick={() => setViewMode("editor")}
              className={`${styles.viewBtn} ${viewMode === "editor" ? styles.viewBtnActive : ""}`}
            >
              Text Editor
            </button>
            <button
              onClick={() => {
                handleValidate();
                if (parsedJson) setViewMode("tree");
              }}
              disabled={!parsedJson}
              className={`${styles.viewBtn} ${viewMode === "tree" ? styles.viewBtnActive : ""}`}
              title={!parsedJson ? "Valid JSON is required to view tree" : "Interactive collapsible tree"}
            >
              Interactive Tree Visualizer
            </button>
          </div>

          {errorMsg && (
            <div className={styles.errorAlert}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", marginTop: "-2px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
              <span className={styles.errorText}>Invalid JSON: {errorMsg}</span>
            </div>
          )}
          {!errorMsg && parsedJson && (
            <div className={styles.successAlert}>
              <span className={styles.successIcon}>✓</span>
              <span className={styles.successText}>Valid JSON</span>
            </div>
          )}
        </div>

        {viewMode === "editor" ? (
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Quick validate check
              if (!e.target.value.trim()) {
                setErrorMsg("");
                setParsedJson(null);
              }
            }}
            placeholder='Paste your raw JSON string here. e.g. {"name": "SuperUtility", "version": 1.0}'
            className={`${styles.textarea} ${errorMsg ? styles.textareaError : ""}`}
            rows={12}
          />
        ) : (
          <div className={styles.treeViewer}>
            {parsedJson !== null && (
              <div className={styles.treeRoot}>
                <span className={styles.bracket}>{"{"}</span>
                <div className={styles.nestedContent}>
                  {Array.isArray(parsedJson) ? (
                    parsedJson.map((item, idx) => (
                      <JsonNode 
                        key={idx} 
                        name={idx} 
                        value={item} 
                        isLast={idx === parsedJson.length - 1} 
                      />
                    ))
                  ) : (
                    Object.entries(parsedJson).map((item, idx, arr) => (
                      <JsonNode 
                        key={item[0]} 
                        name={item[0]} 
                        value={item[1]} 
                        isLast={idx === arr.length - 1} 
                      />
                    ))
                  )}
                </div>
                <span className={styles.bracket}>{"}"}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons row */}
      {viewMode === "editor" && (
        <div className={styles.buttonGrid}>
          <button 
            onClick={() => handleFormat(2)} 
            disabled={!input.trim()} 
            className={styles.ctrlBtn}
            title="Beautify JSON with 2-spaces indentation"
          >
            Format (2 Spaces)
          </button>
          <button 
            onClick={() => handleFormat(4)} 
            disabled={!input.trim()} 
            className={styles.ctrlBtn}
            title="Beautify JSON with 4-spaces indentation"
          >
            Format (4 Spaces)
          </button>
          <button 
            onClick={handleMinify} 
            disabled={!input.trim()} 
            className={styles.ctrlBtn}
            title="Strip all newlines and spaces to compress JSON"
          >
            Minify JSON
          </button>
          <button 
            onClick={handleValidate} 
            disabled={!input.trim()} 
            className={styles.ctrlBtn}
            title="Check syntax and confirm format validation"
          >
            Validate Syntax
          </button>
        </div>
      )}
    </div>
  );
}
