import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://superutility.xyz"),
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
  authors: [{ name: "SuperUtility", url: "https://superutility.xyz" }],
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
    url: "https://superutility.xyz",
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
          "name": "Is my private information safe here?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely! SuperUtility runs entirely inside your web browser. None of your passwords, files, or text inputs are ever sent to a server, saved online, or shared with anyone. Everything stays 100% private on your own device."
          }
        },
        {
          "@type": "Question",
          "name": "How are passwords and random keys generated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use highly secure, device-level random generation (using your browser's built-in cryptographic engine). This ensures that every password or unique key (UUID) you generate is completely random, fair, and virtually impossible to guess."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this app without an internet connection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Once you open the website, the tools are saved directly in your browser. You can turn off your internet or Wi-Fi completely, and all the tools (like the password, QR, and hash generators) will still work perfectly offline."
          }
        },
        {
          "@type": "Question",
          "name": "Are the random picks and numbers truly fair?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, they are 100% fair. We use advanced, balanced mathematical algorithms (like the Fisher-Yates shuffle) to make sure every random picker item or random number has an exactly equal chance of being chosen, with zero bias or repeating patterns."
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
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}

