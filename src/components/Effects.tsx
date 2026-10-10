"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide interaction layer, mounted once in the root layout:
 * - copper scroll-progress hairline
 * - cursor ring + dot (fine pointers only)
 * - pointer-tracked spotlight on `.spotlight` / `.metal-plate` surfaces
 * - subtle 3D tilt on `[data-tilt]` and magnetic pull on `.magnetic`
 * Everything is event-delegated so server components can opt in with a class.
 */
export default function Effects() {
  const progressRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Scroll progress
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Pointer effects
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let tiltEl: HTMLElement | null = null;
    let magnetEl: HTMLElement | null = null;

    const follow = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1 ? requestAnimationFrame(follow) : 0;
    };

    const resetTilt = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.classList.add("is-visible");
      dot.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(follow);

      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      const surface = target.closest<HTMLElement>(".spotlight, .metal-plate");
      if (surface) {
        const r = surface.getBoundingClientRect();
        surface.style.setProperty("--mx", `${e.clientX - r.left}px`);
        surface.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      ring.classList.toggle(
        "is-hover",
        !!target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor]")
      );

      if (reducedMotion) return;

      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tiltEl !== tilt) resetTilt(tiltEl);
      tiltEl = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const max = Number(tilt.dataset.tilt) || 4;
        tilt.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
      }

      const magnet = target.closest<HTMLElement>(".magnetic");
      if (magnetEl && magnetEl !== magnet) magnetEl.style.transform = "";
      magnetEl = magnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.transform = `translate(${(dx * 0.16).toFixed(1)}px, ${(dy * 0.26).toFixed(1)}px)`;
      }
    };

    const onLeave = () => {
      ring.classList.remove("is-visible");
      dot.classList.remove("is-visible");
      resetTilt(tiltEl);
      if (magnetEl) magnetEl.style.transform = "";
      tiltEl = null;
      magnetEl = null;
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div className="page-grain" aria-hidden="true" />
    </>
  );
}
