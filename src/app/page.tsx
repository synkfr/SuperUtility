"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

// Import custom components
import PasswordGenerator from "@/components/PasswordGenerator";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import UuidGenerator from "@/components/UuidGenerator";
import HashGenerator from "@/components/HashGenerator";
import RandomPicker from "@/components/RandomPicker";
import RandomNumberGenerator from "@/components/RandomNumberGenerator";

type ToolType = 
  | "home"
  | "password-generator" 
  | "qr-generator" 
  | "uuid-generator" 
  | "hash-generator" 
  | "random-picker" 
  | "random-number";

interface ToolItem {
  id: ToolType;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolType>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tools: ToolItem[] = [
    {
      id: "password-generator",
      name: "Password Generator",
      subtitle: "Secure random strings and memorable passphrases.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"></path>
        </svg>
      ),
      component: <PasswordGenerator />,
    },
    {
      id: "qr-generator",
      name: "QR Code Generator",
      subtitle: "Generate high-resolution PNG and vector QR graphics.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2"></rect>
          <path d="M14 14h2v2h-2zm4 4h2v2h-2zm2-2h-2v2h2zm-2-2h2v2h-2zm-2 4h2v-2h-2zm0 2v2h2v-2z" strokeWidth="2"></path>
        </svg>
      ),
      component: <QrCodeGenerator />,
    },
    {
      id: "uuid-generator",
      name: "UUID Generator",
      subtitle: "RFC 4122 v1 and v4 compliant unique bulk identifiers.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"></rect>
          <path d="M21 16H3M8 12H3m10 0H8m3-4H8m13 0h-7" strokeWidth="2"></path>
        </svg>
      ),
      component: <UuidGenerator />,
    },
    {
      id: "hash-generator",
      name: "Hash Generator",
      subtitle: "MD5, SHA-1, SHA-256 and SHA-512 browser digest hashes.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      component: <HashGenerator />,
    },
    {
      id: "random-picker",
      name: "Random Picker",
      subtitle: "Raffle sweeps to pick winners from customizable lists.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      ),
      component: <RandomPicker />,
    },
    {
      id: "random-number",
      name: "Number Generator",
      subtitle: "Sortable, secure ranges for integer or decimal values.",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      component: <RandomNumberGenerator />,
    },
  ];

  const currentTool = tools.find((t) => t.id === activeTool);

  const handleToolChange = (id: ToolType) => {
    setActiveTool(id);
    setDrawerOpen(false);
  };

  const renderNavList = () => {
    return (
      <>
        <button
          onClick={() => handleToolChange("home")}
          className={`${styles.navBtn} ${activeTool === "home" ? styles.navBtnActive : ""}`}
        >
          <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard Home</span>
        </button>
        <div style={{ height: "1px", background: "var(--border)", margin: "8px 0" }} />
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolChange(tool.id)}
            className={`${styles.navBtn} ${activeTool === tool.id ? styles.navBtnActive : ""}`}
          >
            {tool.icon}
            <span>{tool.name}</span>
          </button>
        ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      {/* 1. Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand} onClick={() => handleToolChange("home")}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </div>

        <nav className={styles.nav}>{renderNavList()}</nav>

        <div className={styles.sandboxBadge}>
          <div className={styles.pulseCircle}></div>
          <div className={styles.sandboxText}>
            <span className={styles.sandboxTitle}>100% Client-Side</span>
            <span className={styles.sandboxDesc}>Data processing occurs locally. No files or inputs ever touch the cloud.</span>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Sticky Header */}
      <header className={styles.mobileHeader}>
        <div className={styles.brand} style={{ marginBottom: 0 }} onClick={() => handleToolChange("home")}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className={styles.menuBtn}
          title="Open Drawer Menu"
          aria-label="Open Drawer Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* 3. Mobile Overlay Drawer */}
      {drawerOpen && (
        <>
          <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)} />
          <div className={styles.drawerSheet}>
            <div className={styles.drawerHeader}>
              <div className={styles.brand} style={{ marginBottom: 0 }}>
                <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
                <span className={styles.brandName}>SuperUtility</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className={styles.drawerCloseBtn}
                title="Close Drawer Menu"
                aria-label="Close Drawer Menu"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav className={styles.nav} style={{ gap: "6px" }}>
              {renderNavList()}
            </nav>

            <div className={styles.sandboxBadge} style={{ marginTop: "auto" }}>
              <div className={styles.pulseCircle}></div>
              <div className={styles.sandboxText}>
                <span className={styles.sandboxTitle}>100% Safe & Offline</span>
                <span className={styles.sandboxDesc}>Calculations run locally inside your browser sandbox. Complete privacy guaranteed.</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. Main App Area */}
      <main className={styles.main}>
        {activeTool === "home" ? (
          <div className={styles.homeContainer}>
            <div className={styles.heroCard}>
              <span className={styles.heroLabel}>Private Local Toolbox</span>
              <h2 className={styles.heroTitle}>Essential utilities.<br />Meticulously designed.</h2>
              <p className={styles.heroDesc}>
                SuperUtility offers a curated collection of secure, real-time developer instruments. Everything is compiled to execute in-browser entirely on your hardware. Zero network trackers, zero server handshakes, and absolute data privacy.
              </p>
              
              <div className={styles.heroFeatures}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>100% Offline Capable</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>No Registration / Free</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Hardware Entropy Cryptography</span>
                </div>
              </div>
            </div>

            <div className={styles.landingGrid}>
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className={styles.toolCard}
                  onClick={() => handleToolChange(tool.id)}
                >
                  <div className={styles.toolCardIcon}>
                    {tool.icon}
                  </div>
                  <div className={styles.toolCardContent}>
                    <h3 className={styles.toolCardName}>{tool.name}</h3>
                    <p className={styles.toolCardDesc}>{tool.subtitle}</p>
                  </div>
                  <span className={styles.toolCardArrow}>
                    Launch Utility
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.contentWrapper} key={currentTool?.id}>
            <h1 className={styles.headerTitle}>{currentTool?.name}</h1>
            <p className={styles.headerSubtitle}>{currentTool?.subtitle}</p>
            {currentTool?.component}
          </div>
        )}
      </main>
    </div>
  );
}
