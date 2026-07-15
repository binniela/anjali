import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Inter_Tight,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import {
  absoluteUrl,
  photographerName,
  sharedOpenGraph,
  siteDescription,
  siteTitle,
  siteUrl,
} from "./metadata";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

// Serif display for the editorial gallery section headings (uppercase,
// letter-spaced) and their italic subtitles.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${photographerName}`,
  },
  description: siteDescription,
  applicationName: photographerName,
  authors: [{ name: photographerName, url: siteUrl }],
  creator: photographerName,
  publisher: photographerName,
  alternates: {
    canonical: siteUrl,
  },
  category: "photography",
  keywords: [
    "editorial photography",
    "landscape photography",
    "portrait photography",
    "graduation photography",
    "travel photography",
    "San Mateo photographer",
    "California photographer",
  ],
  openGraph: sharedOpenGraph(),
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [absoluteUrl("/og/anjali-lata-editorial-cover.jpg")],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
