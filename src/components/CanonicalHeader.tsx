"use client";

import { usePathname } from "next/navigation";

export default function CanonicalHeader() {
  const pathname = usePathname();
  const baseUrl = "https://superutility.xyz";
  
  // Construct the absolute canonical URL, ensuring trailing slash consistency or cleaning
  const path = pathname === "/" ? "" : pathname;
  const canonicalUrl = `${baseUrl}${path}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
