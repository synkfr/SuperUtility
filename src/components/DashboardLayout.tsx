"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";

interface NavigationItem {
  id: string;
  href: string;
  name: string;
  icon: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      id: "password-generator",
      href: "/tools/password-generator",
      name: "Password Generator",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "qr-generator",
      href: "/tools/qr-generator",
      name: "QR Code Generator",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2"></rect>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2"></rect>
          <path d="M14 14h2v2h-2zm4 4h2v2h-2zm2-2h-2v2h2zm-2-2h2v2h-2zm-2 4h2v-2h-2zm0 2v2h2v-2z" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "uuid-generator",
      href: "/tools/uuid-generator",
      name: "UUID Generator",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"></rect>
          <path d="M21 16H3M8 12H3m10 0H8m3-4H8m13 0h-7" strokeWidth="2"></path>
        </svg>
      ),
    },
    {
      id: "hash-generator",
      href: "/tools/hash-generator",
      name: "Hash Generator",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
    },
    {
      id: "random-picker",
      href: "/tools/random-picker",
      name: "Random Picker",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      ),
    },
    {
      id: "random-number",
      href: "/tools/random-number",
      name: "Number Generator",
      icon: (
        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
    },
  ];

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  const renderNavList = () => {
    return (
      <>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={`${styles.navBtn} ${pathname === "/" ? styles.navBtnActive : ""}`}
        >
          <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard Home</span>
        </Link>
        <div style={{ height: "1px", background: "var(--border)", margin: "8px 0" }} />
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={handleLinkClick}
            className={`${styles.navBtn} ${pathname === item.href ? styles.navBtnActive : ""}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      {/* 1. Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </Link>

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
        <Link href="/" className={styles.brand}>
          <img src="/logo.png" alt="SuperUtility Logo" className={styles.logo} />
          <span className={styles.brandName}>SuperUtility</span>
        </Link>
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
              <div className={styles.brand}>
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
        <div className={styles.mainScrollContent}>
          {children}
        </div>

        {/* Global Page Footer */}
        <footer className={styles.footer} id="global-page-footer">
          <div className={styles.footerBrand}>
            <span>&copy; {new Date().getFullYear()} SuperUtility. All Rights Reserved.</span>
            <span className={styles.footerSeparator}>&bull;</span>
            <span className={styles.footerShield}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: "4px", display: "inline-block", verticalAlign: "middle" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              100% Client-Side Sandbox
            </span>
          </div>
          <div className={styles.footerLinks}>
            <Link 
              href="/terms-of-service" 
              className={`${styles.footerLink} ${pathname === "/terms-of-service" ? styles.footerLinkActive : ""}`}
              id="tos-footer-link"
            >
              Terms & Privacy
            </Link>
            <span className={styles.footerSeparator}>&bull;</span>
            <Link 
              href="/" 
              className={`${styles.footerLink} ${pathname === "/" ? styles.footerLinkActive : ""}`}
              id="home-footer-link"
            >
              Dashboard
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
