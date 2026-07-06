"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnchorLink } from "./anchor-link";
import styles from "./IntroSequence.module.css";

const INTRO_DURATION_MS = 5200;
const INTRO_HOLD_MS = 650;

// Photos hard-cut in sequence. The first few land while the small window grows;
// the window then reaches its intermediate "paused" size and holds,
// while the remaining photos keep cutting through at that readable size. The
// last cycle photo cuts at CYCLE_END. The final portrait cuts in at END_CUT,
// holds for about a second, then expands to full screen. Fractions of the
// duration.
const CYCLE_START = 0.302;
const CYCLE_END = 0.56;
const END_CUT = 0.6;

const cyclePhotos = [
  "/portfolio/coastal-california/03-dscf1789.jpg",
  "/portfolio/iceland-aurora/06-dsf5321.jpg",
  "/portfolio/garden-city-light/01-dscf1634.jpg",
  "/portfolio/yosemite-valley/01-dscf1941.jpg",
  "/portfolio/floral-editorials/08-dsf5043.jpg",
];

const endPhoto = "/portraits/anjali-hero-end.jpg";

const cutDelayMs = (index: number, total: number) => {
  const frac = CYCLE_START + (CYCLE_END - CYCLE_START) * (index / (total - 1));
  return Math.round(frac * INTRO_DURATION_MS);
};

export function PortfolioNav() {
  return (
    <header className={styles.heroNav} aria-label="Hero navigation">
      <AnchorLink className={styles.heroLogo} href="#gallery" aria-label="Gallery">
        <Image
          src="/brand/anjali-logo.png"
          alt=""
          height={1024}
          priority
          width={1536}
        />
      </AnchorLink>
      <nav className={styles.heroLinks} aria-label="Page sections">
        <AnchorLink href="#gallery">Gallery</AnchorLink>
        <AnchorLink href="#about">About</AnchorLink>
        <AnchorLink href="#contact">Contact</AnchorLink>
      </nav>
    </header>
  );
}

export function IntroSequence() {
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The fixed rail nav hides while the pinned hero is on screen and fades
    // in once the content sheet covers it. This applies even under reduced
    // motion — it is visibility logic, not decoration.
    document.body.classList.add("has-hero");
    document.body.classList.remove("intro-nav-ready");
    const updateRail = () => {
      const heroHeight = heroRef.current?.offsetHeight || 1;
      document.body.classList.toggle(
        "past-hero",
        window.scrollY > heroHeight * 0.55
      );
    };
    window.addEventListener("scroll", updateRail, { passive: true });
    updateRail();
    const cleanupRail = () => {
      window.removeEventListener("scroll", updateRail);
      document.body.classList.remove("has-hero", "past-hero");
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return cleanupRail;

    // Finite intro animations (everything except the infinite cue bob).
    const introAnims = () =>
      (heroRef.current?.getAnimations({ subtree: true }) ?? []).filter(
        (animation) => animation.effect?.getTiming().iterations !== Infinity
      );

    // The intro no longer auto-plays. On a fresh landing we let the name pop
    // in, then hold on it and wait for a scroll intent before playing the rest.
    // On a mid-page reload we skip straight to the finished composition.
    let unlockTimer: number | undefined;
    const cleanupFns: Array<() => void> = [];

    if (window.scrollY === 0) {
      document.documentElement.classList.add("intro-scroll-lock");
      heroRef.current?.classList.add(styles.idle);
      const holdAt = INTRO_HOLD_MS;

      // Let the pop-in play up to the hold point, then pause every finite intro
      // animation together. A timer is steadier than relying on animation order,
      // because delayed photo layers can appear before the name animations.
      const holdTimer = window.setTimeout(() => {
        introAnims().forEach((a) => {
          const duration = Number(a.effect?.getTiming().duration ?? 0);
          if (duration > 1000) {
            a.currentTime = holdAt;
          }
          a.pause();
        });
      }, holdAt);

      let started = false;
      const startIntro = () => {
        if (started) return;
        started = true;
        window.clearTimeout(holdTimer);
        heroRef.current?.classList.remove(styles.idle);
        introAnims().forEach((a) => a.play());
        // Keep the page pinned until the sequence finishes, then release.
        unlockTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("intro-scroll-lock");
          document.body.classList.add("intro-nav-ready");
        }, INTRO_DURATION_MS - holdAt + 150);
        removeIntent();
      };
      const onKey = (event: KeyboardEvent) => {
        if (["ArrowDown", "PageDown", "End", " ", "Spacebar"].includes(event.key)) {
          startIntro();
        }
      };
      const removeIntent = () => {
        window.removeEventListener("wheel", startIntro);
        window.removeEventListener("touchmove", startIntro);
        window.removeEventListener("keydown", onKey);
      };
      window.addEventListener("wheel", startIntro, { passive: true });
      window.addEventListener("touchmove", startIntro, { passive: true });
      window.addEventListener("keydown", onKey);
      cleanupFns.push(() => {
        window.clearTimeout(holdTimer);
        removeIntent();
      });
    } else {
      introAnims().forEach((animation) => animation.finish());
      document.body.classList.add("intro-nav-ready");
    }

    // Parallax: the hero photo drifts down at a fraction of scroll speed and
    // gently zooms, so the page feels like it lifts off an independent layer.
    // A lerp toward the scroll position keeps the motion weighted and smooth.
    let raf = 0;
    let current = 0;
    let running = false;

    const step = () => {
      const hero = heroRef.current;
      const layer = parallaxRef.current;
      if (!hero || !layer) {
        running = false;
        return;
      }
      const heroHeight = hero.offsetHeight || 1;
      const target = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      current += (target - current) * 0.14;
      const settled = Math.abs(target - current) < 0.0005;
      if (settled) current = target;
      const shift = current * heroHeight * 0.14;
      const zoom = 1 + current * 0.3;
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${zoom.toFixed(4)})`;
      if (cueRef.current) {
        // The scroll cue has served its purpose once scrolling starts.
        cueRef.current.style.opacity = (
          1 - Math.min(current * 5, 1)
        ).toFixed(3);
      }
      if (settled) {
        running = false;
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    const onScroll = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Sync immediately in case the browser restored a scroll position.
    onScroll();

    return () => {
      cleanupRail();
      cleanupFns.forEach((fn) => fn());
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (unlockTimer !== undefined) window.clearTimeout(unlockTimer);
      document.body.classList.remove("intro-nav-ready");
      document.documentElement.classList.remove("intro-scroll-lock");
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.landing}
      aria-label="Anjali Lata portfolio"
    >
      <div className={styles.imageWindow} aria-hidden="true">
        <div ref={parallaxRef} className={styles.parallax}>
          {cyclePhotos.map((src, i) => (
            <span
              key={src}
              className={styles.imageLayer}
              style={{
                backgroundImage: `url(${src})`,
                animationDelay: `${cutDelayMs(i, cyclePhotos.length)}ms`,
              }}
            />
          ))}
          {/* Final portrait: cuts in last and is what expands to full screen. */}
          <span
            className={`${styles.imageLayer} ${styles.imageEnd}`}
            style={{
              backgroundImage: `url(${endPhoto})`,
              animationDelay: `${Math.round(END_CUT * INTRO_DURATION_MS)}ms`,
            }}
          />
        </div>
      </div>
      <h1 className={styles.nameLockup} aria-label="Anjali Lata">
        <span className={styles.firstName} aria-hidden="true">
          Anjali
        </span>
        <span className={styles.lastName} aria-hidden="true">
          Lata
        </span>
      </h1>
      <div className={styles.heroCopy}>
        <p>Fine Art &amp; Portrait Photography</p>
      </div>
      <div ref={cueRef} className={styles.scrollCueShell} aria-hidden="true">
        <p className={styles.scrollCue}>
          <span className={styles.scrollCueLabel}>Scroll to begin</span>
          <span className={styles.scrollCueArrow}>&darr;</span>
        </p>
      </div>
    </section>
  );
}
