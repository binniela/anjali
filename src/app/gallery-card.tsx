"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "./data";

export function GalleryCard({
  categoryId,
  project,
}: {
  categoryId: string;
  project: Project;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Default visible: content must never be gated on JS or the observer firing.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Only cards that start below the fold get the entrance animation. Anything
    // already on (or above) the screen stays painted, so the hero/LCP card is
    // visible on first paint instead of fading in from nothing.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      return;
    }

    setHidden(true);

    let done = false;
    const reveal = () => {
      if (done) {
        return;
      }
      done = true;
      setHidden(false);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    observer.observe(node);

    // Safety net for anchor jumps, find-in-page, scroll restoration and fast
    // flings, where the observer can skip a target without ever reporting it as
    // intersecting. A passive, self-removing listener guarantees nothing stays
    // permanently hidden. It only flips a boolean, it does not drive animation.
    const onScroll = () => {
      if (node.getBoundingClientRect().top < window.innerHeight) {
        reveal();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link
      className={`project-card ${hidden ? "is-hidden" : ""}`}
      href={project.href ?? `/Project/${project.slug}`}
      id={categoryId}
      ref={ref}
    >
      <span className="project-image">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 980px) calc(100vw - 48px), 72vw"
          style={
            project.coverPosition
              ? { objectPosition: project.coverPosition }
              : undefined
          }
        />
      </span>
      <span className="project-meta">
        <span>
          <span className="eyebrow">{project.date}</span>
          <h2>{project.title}</h2>
          <p>{project.location}</p>
        </span>
        <span className="pill" aria-hidden="true">
          View
        </span>
      </span>
    </Link>
  );
}
