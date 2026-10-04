"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation type: 'up' (slide up), 'fade', 'scale' */
  animation?: "up" | "fade" | "scale";
  /** Delay index for staggered reveals (0-6) */
  delay?: number;
  /** IntersectionObserver threshold (0 to 1) */
  threshold?: number;
  /** Additional tag to render as */
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "up",
  delay = 0,
  threshold = 0.15,
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
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass =
    animation === "up"
      ? "reveal-up"
      : animation === "fade"
      ? "reveal-fade"
      : "reveal-scale";

  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`${animClass} ${delayClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
