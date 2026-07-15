import type { Metadata } from "next";

export const photographerName = "Anjali Lata";
export const siteTitle = "Anjali Lata - Editorial & Landscape Photography";
export const siteDescription =
  "Cinematic portrait, landscape, travel, and graduation photography shaped by quiet light, natural settings, and an editorial eye.";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anjalilata.com";
export const ogImage = "/og/anjali-lata-editorial-cover.jpg";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function sharedOpenGraph(
  overrides: Partial<NonNullable<Metadata["openGraph"]>> = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: photographerName,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: absoluteUrl(ogImage),
        width: 1200,
        height: 630,
        alt: "Editorial landscape photograph by Anjali Lata",
      },
    ],
    ...overrides,
  };
}
