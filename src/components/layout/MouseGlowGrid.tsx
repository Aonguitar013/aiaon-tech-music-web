"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * MouseGlowGrid
 * ---------------------------------------------------------------------------
 * Renders the animated grid background for the Hero section.
 * Tracks mouse/touch position and updates --mouse-x / --mouse-y on the
 * element so the CSS radial-gradient in `.hero-grid::after` follows the cursor.
 *
 * Performance notes:
 *  - Uses requestAnimationFrame to throttle DOM writes.
 *  - `pointer-events: none` (set in CSS) keeps it invisible to click events.
 *  - The element never causes reflow — only custom property changes (cheap).
 */
export function MouseGlowGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current !== null) return; // already scheduled
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) { rafId.current = null; return; }
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      ref.current.style.setProperty("--mouse-x", `${x}%`);
      ref.current.style.setProperty("--mouse-y", `${y}%`);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Listen on the element itself so we only track while cursor is over the hero
    el.parentElement?.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      el.parentElement?.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return <div ref={ref} className="hero-grid" aria-hidden="true" />;
}
