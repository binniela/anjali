"use client";

import type { MouseEvent, ReactNode } from "react";

/* In-page anchor that scrolls itself: the app router swallows native
   fragment navigation, so plain <a href="#…"> updates the hash without
   moving the page. */
export function AnchorLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const id = href.split("#")[1];
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const navHeight =
      (
        document.querySelector(".glass-nav") ??
        document.querySelector('[aria-label="Site navigation"]')
      )?.getBoundingClientRect().height ?? 0;
    const targetTop =
      window.scrollY + target.getBoundingClientRect().top - navHeight;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
