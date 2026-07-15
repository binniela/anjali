import Image from "next/image";
import { AnchorLink } from "./anchor-link";

export function GlassNav() {
  return (
    // Blur is inline because the CSS minifier rewrites backdrop-filter into a
    // -webkit- only form that some Chromium builds ignore.
    <header
      className="glass-nav"
      style={{
        backdropFilter: "blur(16px) saturate(1.6)",
        WebkitBackdropFilter: "blur(16px) saturate(1.6)",
      }}
    >
      <AnchorLink className="glass-brand" href="#gallery" aria-label="Anjali Lata">
        <Image
          src="/brand/anjali-logo.png"
          alt=""
          height={1024}
          width={1536}
        />
      </AnchorLink>
      <nav aria-label="Page sections">
        <AnchorLink href="#gallery">Gallery</AnchorLink>
        <AnchorLink href="#about">About</AnchorLink>
        <AnchorLink href="#contact">Contact</AnchorLink>
      </nav>
    </header>
  );
}

const aboutParagraphs = [
  "Welcome to a quiet photographic journal shaped by winter, distance, and the kind of light that rewards patience. I make images for travel stories, editorial features, and independent brands that want atmosphere without noise.",
  "From dense city mornings to remote alpine roads, my lens looks for small moments that carry the weight of a place. The work is restrained, textural, and tuned toward the feeling of standing there.",
  "My practice began as a way to document movement through unfamiliar landscapes. Over time it became a language for collaboration: building visual narratives with clients who care about tone as much as subject.",
  "Photography, for me, is less about spectacle and more about attention. Each frame is an attempt to hold weather, silence, scale, and human presence in a balanced way.",
  "As you move through the galleries, you will find snow fields, coastlines, forests, mountains, and pauses between them. The thread is a consistent search for clarity.",
  "Thank you for visiting. If a story, location, or campaign is beginning to take shape, I would be glad to hear where it might go.",
];

const services = ["Portraits", "Graduation", "Landscapes", "Travel"];

export function AboutSection() {
  return (
    <section id="about" className="about-editorial" aria-label="About Anjali Lata">
      <div className="about-photo">
        <Image
          src="/portraits/anjali-generated-portrait.webp"
          alt="Anjali Lata"
          fill
          sizes="(max-width: 860px) 100vw, 50vw"
        />
      </div>

      <div className="about-text">
        <div className="about-text-inner">
          <span className="eyebrow">About</span>
          <h2 className="about-name">
            <span>Anjali</span>
            <span>Lata</span>
          </h2>
          <p className="about-tagline">
            Photographer and visual storyteller &middot; San Mateo, California
          </p>

          <div className="about-body">
            {[aboutParagraphs[0], aboutParagraphs[3]].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-services">
            <span className="eyebrow">Available for</span>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <AnchorLink className="about-contact" href="#contact">
            Contact <span aria-hidden="true">&rarr;</span>
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
