import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperUtility — Minimalist & Modern Developer Tools",
  description: "A gorgeous suite of offline-first utility tools including Password Generator, QR Code Generator, UUID Generator, Hash Generator, Random Picker, and Random Number Generator. Free, secure, and fast.",
  keywords: "superutility, password generator, qr code generator, uuid generator, hash generator, md5 sha256, random picker, random number generator, minimalist developer tools",
  authors: [{ name: "SuperUtility" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
