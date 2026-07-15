import Image from "next/image";
import type { ReactNode } from "react";
import { AnchorLink } from "./anchor-link";
import { projects, type Project } from "./data";
import { GalleryCard } from "./gallery-card";
import { PortfolioNav } from "./IntroSequence";

export function Sidebar() {
  return null;
}

export function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm8.78 2.15a1.32 1.32 0 1 1 0 2.64 1.32 1.32 0 0 1 0-2.64ZM12 7.15A4.85 4.85 0 1 1 12 16.85 4.85 4.85 0 0 1 12 7.15Zm0 2A2.85 2.85 0 1 0 12 14.85 2.85 2.85 0 0 0 12 9.15Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Shell({
  children,
}: {
  children: ReactNode;
  back?: boolean;
}) {
  return (
    <>
      <PortfolioNav staticBar />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© Copyright 2026</p>
      <p>Portfolio by Anjali Lata</p>
    </footer>
  );
}

type ContactFooterVariant = "home" | "project";

// Light editorial contact footer. Carries id="contact" so the top nav
// "Contact" anchor still lands here.
export function ContactFooter({
  variant = "home",
}: {
  variant?: ContactFooterVariant;
}) {
  const className =
    variant === "project"
      ? "contact-footer contact-footer-project"
      : "contact-footer";

  return (
    <footer id="contact" className={className} aria-label="Contact">
      <div className="cf-decor" aria-hidden="true">
        <Image
          src="/portraits/footer-bridge.jpg"
          alt=""
          width={1200}
          height={800}
          sizes="(max-width: 680px) 66vw, 53vw"
        />
      </div>

      <div className="cf-lead">
        <span className="eyebrow">Let&apos;s create something timeless</span>
        <a className="cf-email" href="mailto:anjali@example.com">
          anjali@example.com
        </a>
        <p className="cf-avail">Available for commissions worldwide.</p>
      </div>

      <div className="cf-foot">
        <a
          className="cf-ig"
          href="https://www.instagram.com/khaanakoma/"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">&rarr;</span> Instagram
        </a>

        <div className="cf-base">
          <p className="cf-copy">© 2026 Anjali Lata. All rights reserved.</p>
          <nav className="cf-nav" aria-label="Footer">
            <AnchorLink href="#gallery">Gallery</AnchorLink>
            <AnchorLink href="#about">About</AnchorLink>
            <a href="mailto:anjali@example.com">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function WorkStatus() {
  return (
    <section className="status">
      <h2>Available for work</h2>
      <AnchorLink href="#contact">
        Reach Out <span aria-hidden="true">&rarr;</span>
      </AnchorLink>
    </section>
  );
}

export function ProjectList() {
  const categoryIds = ["landscape", "portrait", "landscape-2", "graduation", "portrait-2"];

  return (
    <section className="gallery-list" aria-label="Photo projects">
      {projects.map((project, index) => (
        <GalleryCard
          categoryId={categoryIds[index]}
          key={project.slug}
          project={project}
        />
      ))}
    </section>
  );
}

export function StatList({ project }: { project: Project }) {
  return (
    <dl className="stats">
      <div>
        <dt>Location</dt>
        <dd>{project.location}</dd>
      </div>
      <div>
        <dt>Date</dt>
        <dd>{project.date}</dd>
      </div>
      <div>
        <dt>Camera</dt>
        <dd>{project.camera}</dd>
      </div>
      <div>
        <dt>Lens</dt>
        <dd>{project.lens}</dd>
      </div>
    </dl>
  );
}
