"use client";

import { useEffect, useRef, useState } from "react";

const STRIP = Array.from({ length: 20 }, (_, n) => n % 10);

/**
 * Renders a value like "Since 2015" or "40+" with each digit rolling into
 * place, odometer-style, the first time it scrolls into view.
 */
export default function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion is handled globally in CSS (transitions collapse to ~0ms).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let digitIndex = 0;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {value.split("").map((char, i) => {
          if (!/\d/.test(char)) {
            return (
              <span key={i} className="odo-digit" style={{ whiteSpace: "pre" }}>
                {char}
              </span>
            );
          }
          const k = digitIndex++;
          const target = 10 + Number(char);
          return (
            <span key={i} className="odo-digit relative">
              {/* Sizes the cell to the final digit (proportional figures) */}
              <span className="invisible">{char}</span>
              <span
                className="odo-strip"
                style={
                  {
                    transform: `translateY(${run ? -target * 1.15 : 0}em)`,
                    "--d": `${k * 0.12}s`,
                  } as React.CSSProperties
                }
              >
                {STRIP.map((n, j) => (
                  <span key={j}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
