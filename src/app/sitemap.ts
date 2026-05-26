import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Uses the environment variable if configured, otherwise defaults to superutility.xyz
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://superutility.xyz";

  // List of all 50+ utility tool routes
  const tools = [
    "age-calculator",
    "area-converter",
    "background-remover",
    "bcrypt-generator",
    "case-converter",
    "color-converter",
    "color-picker-image",
    "css-minifier",
    "currency-converter",
    "data-converter",
    "document-scanner",
    "gst-calculator",
    "hash-generator",
    "hmac-generator",
    "html-converter",
    "image-compressor",
    "image-converter",
    "image-editor",
    "image-resizer",
    "image-to-base64",
    "image-to-pdf",
    "js-minifier",
    "json-formatter",
    "jwt-decoder",
    "length-converter",
    "loan-calculator",
    "lorem-ipsum",
    "password-generator",
    "password-strength",
    "pdf-compressor",
    "pdf-editor",
    "pdf-merger",
    "pdf-ocr",
    "pdf-security-scanner",
    "pdf-splitter",
    "pdf-tools",
    "percentage-calculator",
    "profit-calculator",
    "qr-generator",
    "random-number",
    "random-picker",
    "random-string",
    "regex-tester",
    "slug-generator",
    "speed-converter",
    "temperature-converter",
    "text-diff",
    "text-repeater",
    "timestamp-converter",
    "url-base64-converter",
    "url-parser",
    "uuid-generator",
    "volume-converter",
    "weight-converter",
    "word-counter"
  ];

  // Core static pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }
  ];

  // Map tool routes into sitemap format
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...corePages, ...toolPages];
}
