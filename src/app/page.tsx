import { ContactFooter } from "./components";
import { EditorialGallery } from "./editorial-gallery";
import { IntroSequence, PortfolioNav } from "./IntroSequence";
import { AboutSection } from "./sections";

export default function Home() {
  return (
    <>
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
