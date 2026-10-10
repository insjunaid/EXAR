"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/data/company";

/**
 * Brand intro shown once per browser session. An inline script in the root
 * layout adds `intro-seen` to <html> before first paint on repeat visits, which
 * hides this overlay via CSS so it never flashes.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"show" | "leaving" | "done">("show");

  useEffect(() => {
    // Repeat visit: the overlay is already hidden by CSS, nothing to run.
    if (document.documentElement.classList.contains("intro-seen")) return;
    try {
      sessionStorage.setItem("exar-intro", "1");
    } catch {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leave = setTimeout(() => setPhase("leaving"), reduced ? 150 : 1750);
    return () => clearTimeout(leave);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    window.dispatchEvent(new Event("exar:intro-leave"));
    const done = setTimeout(() => setPhase("done"), 1100);
    return () => clearTimeout(done);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "leaving" ? "is-leaving" : ""}`}
      aria-hidden="true"
      onClick={() => setPhase("leaving")}
    >
      <div className="preloader-panel top" />
      <div className="preloader-panel bottom" />
      <div className="preloader-inner">
        <Image
          src="/images/exar-logo-light.png"
          alt=""
          width={720}
          height={410}
          priority
          className="preloader-logo mx-auto"
        />
        <div className="preloader-bar">
          <span />
        </div>
        <p className="font-mono text-[0.65rem] tracking-[0.35em] text-cream/40 mt-5 uppercase">
          Est. {company.established} · {company.country}
        </p>
      </div>
    </div>
  );
}
