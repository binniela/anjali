import { ContactFooter } from "./components";
import { EditorialGallery } from "./editorial-gallery";
import { IntroSequence, PortfolioNav } from "./IntroSequence";
import { absoluteUrl, photographerName, siteDescription, siteUrl } from "./metadata";
import { AboutSection } from "./sections";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: photographerName,
    url: siteUrl,
    image: absoluteUrl("/portraits/anjali-generated-portrait.webp"),
    jobTitle: "Editorial photographer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Mateo",
      addressRegion: "CA",
      addressCountry: "US",
    },
    description: siteDescription,
    sameAs: ["https://www.instagram.com/khaanakoma/"],
    knowsAbout: [
      "Editorial photography",
      "Landscape photography",
      "Portrait photography",
      "Graduation photography",
      "Travel photography",
    ],
    makesOffer: [
      "Portrait photography",
      "Graduation photography",
      "Landscape photography",
      "Travel photography",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioNav />
      <IntroSequence />
      {/* The hero stays pinned; this sheet slides up over it on scroll. */}
      <div className="cover-over">
        <main className="content one-page">
          <section id="gallery" aria-label="Gallery">
            <EditorialGallery />
          </section>
          <AboutSection />
        </main>
        <ContactFooter />
      </div>
    </>
  );
}
