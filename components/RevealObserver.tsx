"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR =
  "[data-reveal]:not([data-revealed]), [data-reveal-stagger]:not([data-revealed])";

/**
 * Scroll-triggered reveal coordinator. Watches every element matching
 * [data-reveal] / [data-reveal-stagger], adds [data-revealed] when it
 * enters the viewport, and re-scans on route changes and DOM mutations
 * (so filter-driven re-mounts pick up the new children).
 *
 * - Respects prefers-reduced-motion (reveals immediately)
 * - Disconnects per-element once revealed
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      document
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    function observeAll() {
      const els = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const alreadyInView = rect.top < window.innerHeight * 0.92;
        if (alreadyInView) {
          el.setAttribute("data-revealed", "");
        } else {
          io.observe(el);
        }
      }
    }

    observeAll();

    // Pick up nodes added later (filter re-mounts, etc.)
    const mo = new MutationObserver((records) => {
      let needsScan = false;
      for (const r of records) {
        for (const node of r.addedNodes) {
          if (
            node instanceof HTMLElement &&
            (node.hasAttribute("data-reveal") ||
              node.hasAttribute("data-reveal-stagger") ||
              node.querySelector?.(REVEAL_SELECTOR))
          ) {
            needsScan = true;
            break;
          }
        }
        if (needsScan) break;
      }
      if (needsScan) observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
