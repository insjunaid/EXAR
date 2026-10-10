"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * Animation type: 'up' (slide up), 'fade', 'scale', 'clip' (wipe down),
   * 'lines' (child `.rise-line` spans slide up out of a mask), 'none'
   * (only toggles `revealed`, for children that animate themselves).
   */
  animation?: "up" | "fade" | "scale" | "clip" | "lines" | "none";
  /** Delay index for staggered reveals (0-6) */
  delay?: number;
  /**
   * IntersectionObserver threshold (0 to 1). Defaults to 0: the reveal fires
   * when the element's top crosses ~88% of the viewport, which works for
   * elements of any height (a ratio threshold can never be met by elements
   * much taller than the screen, e.g. long lists on phones).
   */
  threshold?: number;
  /** Additional tag to render as */
  as?: ElementType;
}

const animClasses = {
  up: "reveal-up",
  fade: "reveal-fade",
  scale: "reveal-scale",
  clip: "reveal-clip",
  lines: "reveal-lines",
  none: "",
} as const;

export default function ScrollReveal({
  children,
  className = "",
  animation = "up",
  delay = 0,
  threshold = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`${animClasses[animation]} ${delayClass} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits text on "\n" into masked lines for `rise-line` animations.
 * Works inside `<ScrollReveal animation="lines">` or standalone (plays on load).
 */
export function Lines({
  text,
  delay = 0,
  step = 0.09,
}: {
  text: string;
  delay?: number;
  step?: number;
}) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="rise-line">
          <span style={{ "--d": `${delay + i * step}s` } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </>
  );
}
