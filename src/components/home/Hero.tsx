"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { company } from "@/data/company";
import { bgImage, sceneImages } from "@/data/images";
import { smoothScrollTo } from "@/components/SmoothScroll";

/* ──────────────────────────────────────────────
   HERO — scroll-driven chapters (desktop),
   swipe / auto-advance carousel (mobile)
   ────────────────────────────────────────────── */

interface HeroSlide {
  index: string;
  title: string;
  subtitle: string;
  bg: string;
  showVendors?: boolean;
}

const heroSlides: HeroSlide[] = [
  {
    index: "01",
    title: "Exar International\nTrading Est",
    subtitle: company.tagline,
    bg: sceneImages.refinery,
    showVendors: true,
  },
  {
    index: "02",
    title: "Power Tools, Hand Tools\n& Machinery",
    subtitle: "DeWalt · Bosch · Makita · Hilti · Metabo · Stanley",
    bg: sceneImages.powerTools,
  },
  {
    index: "03",
    title: "Precision\nMeasurement",
    subtitle: "Mitutoyo instruments. 75+ years of Japanese engineering excellence.",
    bg: sceneImages.precision,
  },
  {
    index: "04",
    title: "Welding, Abrasive\nand Non-Sparking Tools",
    subtitle: "Complete solutions for MIG, TIG, arc welding, abrasives, and non-sparking safety tools.",
    bg: sceneImages.welding,
  },
  {
    index: "05",
    title: "Safety, Lifting\n& Construction",
    subtitle: "PPE, rigging equipment, and building materials for the Gulf's largest projects.",
    bg: sceneImages.construction,
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.03 } },
};
const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.1, ease: EASE_OUT } },
  exit: { y: "-110%", transition: { duration: 0.45, ease: EASE_IN_OUT } },
};
const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

const SLIDE_MS = 6000;

export default function Hero() {
  const n = heroSlides.length;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hold the headline until the brand intro lifts.
  useEffect(() => {
    const introRunning =
      !document.documentElement.classList.contains("intro-seen") && !!document.querySelector(".preloader");
    const go = () => setReady(true);
    if (!introRunning) {
      const frame = requestAnimationFrame(go);
      return () => cancelAnimationFrame(frame);
    }
    window.addEventListener("exar:intro-leave", go);
    const fallback = setTimeout(go, 2600);
    return () => {
      window.removeEventListener("exar:intro-leave", go);
      clearTimeout(fallback);
    };
  }, []);

  // Mobile: auto-advance; any manual change restarts the timer.
  useEffect(() => {
    if (!isMobile) return;
    stageRef.current?.style.setProperty("--hp", String((active + 1) / n));
    const t = setTimeout(() => setActive((p) => (p + 1) % n), SLIDE_MS);
    return () => clearTimeout(t);
  }, [isMobile, active, n]);

  // Desktop: scroll position drives the chapter.
  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      stageRef.current?.style.setProperty("--hp", p.toFixed(4));
      setActive(Math.min(n - 1, Math.floor(p * n)));
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
  }, [isMobile, n]);

  const goTo = useCallback(
    (i: number) => {
      if (isMobile) {
        setActive(i);
        return;
      }
      const el = sectionRef.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      smoothScrollTo(i === 0 ? el.offsetTop : el.offsetTop + ((i + 0.5) / n) * span);
    },
    [isMobile, n]
  );

  const slide = heroSlides[active];

  return (
    <section ref={sectionRef} className="relative bg-navy-950 md:h-[500vh]" aria-label="Introduction">
      <div
        ref={stageRef}
        className="relative md:sticky md:top-0 h-[100svh] md:h-[100dvh] w-full overflow-hidden"
        onTouchStart={(e) => {
          if (isMobile) touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!isMobile || touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 48) setActive((p) => (p + (dx < 0 ? 1 : n - 1)) % n);
          touchX.current = null;
        }}
      >
        {/* Backdrops */}
        {heroSlides.map((s, i) => (
          <div
            key={s.index}
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-responsive will-change-transform"
              style={{
                ...bgImage(s.bg),
                transform: i === active ? "scale(1.12)" : "scale(1.02)",
                transition: "transform 9s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        ))}

        {/* Grading */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/65 to-navy-950/15" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-navy-950/60" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 85% 15%, rgba(181,96,43,0.22), transparent 55%)" }}
        />

        {/* Architectural column lines */}
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block pointer-events-none">
          <div className="container-main h-full grid grid-cols-4">
            {[0, 1, 2, 3].map((c) => (
              <div key={c} className="border-l border-white/[0.05] h-full last:border-r" />
            ))}
          </div>
        </div>

        {/* Oversized chapter numeral */}
        <div aria-hidden="true" className="absolute right-[3vw] bottom-[9vh] hidden md:block pointer-events-none select-none overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={slide.index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="block font-serif font-light leading-[0.8] text-[clamp(9rem,20vw,22rem)] text-outline text-white/[0.13]"
            >
              {slide.index}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Copy */}
        <div className="relative z-10 h-full container-main flex flex-col justify-end pb-28 md:pb-32">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={groupVariants}
                initial="hidden"
                animate={ready ? "show" : "hidden"}
                exit="exit"
              >
                <motion.div
                  variants={fadeVariants}
                  className="flex items-center gap-3 font-mono text-copper-400 text-xs md:text-sm tracking-[0.2em]"
                >
                  <span className="w-8 h-px bg-copper-400" />
                  {slide.index} / {String(n).padStart(2, "0")}
                </motion.div>

                <h1 className="font-serif text-cream mt-5 text-[clamp(2.15rem,10.5vw,3.75rem)] md:text-display leading-[1.04] tracking-[-0.03em]">
                  {slide.title.split("\n").map((line, li) => (
                    <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                      <motion.span
                        variants={lineVariants}
                        className={`block ${li > 0 ? "italic font-light text-copper-300" : ""}`}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p variants={fadeVariants} className="text-cream/70 text-base md:text-lg mt-6 max-w-lg font-sans">
                  {slide.subtitle}
                </motion.p>

                {slide.showVendors && (
                  <motion.div variants={fadeVariants} className="mt-8 flex flex-wrap gap-2 md:gap-3">
                    {company.vendors.map((v) => (
                      <span
                        key={v.name}
                        className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-white/[0.04] border border-white/10 text-cream/75 font-mono text-[0.65rem] md:text-xs backdrop-blur-md"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-copper-400 shadow-[0_0_8px_rgba(212,133,74,0.9)]" />
                        {v.name} {v.prefix} {v.id}
                      </span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Chapter rail */}
        <nav
          aria-label="Hero chapters"
          className="hidden lg:flex absolute z-20 right-[clamp(1rem,3vw,2.5rem)] top-32 flex-col items-end"
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.index}
              onClick={() => goTo(i)}
              className="group flex items-center justify-end gap-4 py-2.5 cursor-pointer"
              aria-current={i === active ? "step" : undefined}
            >
              <span
                className={`font-sans text-xs tracking-wide whitespace-nowrap transition-all duration-500 ${
                  i === active
                    ? "text-cream opacity-100 translate-x-0"
                    : "text-cream/50 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.title.split("\n")[0].replace(/,$/, "")}
              </span>
              <span
                className={`font-mono text-[0.7rem] transition-colors ${
                  i === active ? "text-copper-400" : "text-cream/35 group-hover:text-cream/70"
                }`}
              >
                {s.index}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === active ? "w-10 bg-copper-400" : "w-4 bg-white/25 group-hover:w-6"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Progress */}
        <div
          className="absolute bottom-0 inset-x-0 z-20"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
        >
          <div className="container-main flex items-center gap-6">
            <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.index}
                  onClick={() => goTo(i)}
                  className="group h-11 flex items-center cursor-pointer"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span className="block w-full h-px bg-white/15 group-hover:bg-white/30 relative overflow-hidden transition-colors">
                    <span
                      className="absolute inset-0 bg-copper-400 origin-left transition-transform duration-700 md:transition-none"
                      style={{ transform: `scaleX(clamp(0, calc(var(--hp, 0) * ${n} - ${i}), 1))` }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3 shrink-0 text-cream/45 font-mono text-[0.68rem] tracking-[0.2em] uppercase">
              <span className="scroll-cue relative block w-px h-8 bg-white/10 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-copper-400 block" />
              </span>
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
