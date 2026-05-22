import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://superutility.pages.dev"),
  title: "SuperUtility — Secure, Minimalist & Modern Developer Tools",
  description: "A gorgeous suite of 100% offline-first utility tools including a Secure Password Generator, vector QR Code Generator, bulk UUID v1/v4 Generator, cryptographic Hash Generator (MD5, SHA-256), list Random Picker, and custom range Number Generator. Free, fast, and secure.",
  keywords: [
    "superutility",
    "offline developer tools",
    "secure password generator",
    "qr code generator vector svg",
    "uuid generator bulk v4",
    "hash generator md5 sha256 sha512",
    "random list picker",
    "cryptographically secure random number generator",
    "csprng online",
    "client side utilities",
    "developer toolbox",
    "privacy focused tools"
  ],
  authors: [{ name: "SuperUtility", url: "https://superutility.pages.dev" }],
  creator: "SuperUtility",
  publisher: "SuperUtility",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://superutility.pages.dev",
    title: "SuperUtility — Secure, Minimalist & Modern Developer Tools",
    description: "A gorgeous, privacy-first suite of offline-first utility tools for developers. Password gen, QR code vector exporter, UUID bulk gen, file hashing, and randomizers. 100% local browser execution.",
    siteName: "SuperUtility",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "SuperUtility Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperUtility — Secure, Minimalist & Modern Developer Tools",
    description: "Privacy-focused developer utilities compiled to run entirely on your hardware. Zero data ever leaves your device.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SuperUtility",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "browserRequirements": "Requires HTML5, Web Cryptography API",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      },
      "description": "A secure offline-first suite of minimalist developer tools including a secure Password Generator, vector QR Code Generator, UUID v1/v4 Generator, cryptographic Hash Generator (MD5, SHA-256), list Random Picker, and custom range Number Generator.",
      "featureList": [
        "100% client-side execution for total data privacy",
        "Secure offline password and memorable passphrase generator with entropy assessment",
        "High-resolution PNG and vector SVG QR Code Generator with custom color grids",
        "RFC 4122 v1 (time-based) and v4 (CSPRNG) UUID generators",
        "Drag-and-drop client-side file checksum and text Hash Generator (MD5, SHA-1, SHA-256, SHA-512)",
        "Tactile Random Picker raffle draws with list history presets",
        "Cryptographically secure custom range Random Number Generator using window.crypto"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is my data secure on SuperUtility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. SuperUtility operates entirely client-side. None of your data, passwords, file streams, or text strings are ever transmitted to any external server. All computations happen locally on your hardware, inside your browser's security sandbox."
          }
        },
        {
          "@type": "Question",
          "name": "How does the offline-first mode work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Once SuperUtility is loaded, all application code runs locally. You can disconnect your internet connection entirely, and every generator and hashing algorithm will continue working flawlessly."
          }
        },
        {
          "@type": "Question",
          "name": "Does SuperUtility use cryptographically secure random values?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Instead of standard pseudo-random number generators (like Math.random) which are predictable, SuperUtility leverages the browser's native Web Cryptography API (window.crypto.getRandomValues) to tap into hardware-level entropy for high-security key and password generation."
          }
        }
      ]
    }
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

