"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";
import { divisions, categories } from "@/data/products";
import { brands } from "@/data/brands";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

/* ──────────────────────────────────────────────
   HERO SECTION — Horizontal scroll panels
   ────────────────────────────────────────────── */

const heroSlides = [
  {
    index: "01",
    title: "Exar International\nTrading Est",
    subtitle: company.tagline,
    bg: "/images/exar-logo.png",
    showVendors: true,
    isLogoBg: true,
  },
  {
    index: "02",
    title: "Power Tools, Hand Tools\n& Machinery",
    subtitle: "DeWalt · Bosch · Makita · Hilti · Metabo · Stanley",
    bg: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=80",
  },
  {
    index: "03",
    title: "Precision\nMeasurement",
    subtitle: "Mitutoyo instruments. 75+ years of Japanese engineering excellence.",
    bg: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80",
  },
  {
    index: "04",
    title: "Welding, Abrasive\nand Non-Sparking Tools",
    subtitle: "Complete solutions for MIG, TIG, arc welding, abrasives, and non-sparking safety tools.",
    bg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80",
  },
  {
    index: "05",
    title: "Safety, Lifting\n& Construction",
    subtitle: "PPE, rigging equipment, and building materials for the Gulf's largest projects.",
    bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  },
];

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance on mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Desktop: scroll-driven slide change
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const slide = Math.min(heroSlides.length - 1, Math.floor(progress * heroSlides.length));
      setActiveSlide(slide);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const progressWidth = ((activeSlide + 1) / heroSlides.length) * 100;

  return (
    <section
      ref={scrollRef}
      className="relative"
      style={{ height: isMobile ? "auto" : `${heroSlides.length * 100}vh` }}
    >
      <div
        className={`${
          isMobile ? "relative" : "sticky top-0"
        } w-full overflow-hidden`}
        style={{ height: isMobile ? "auto" : "100dvh" }}
      >
        {/* Mobile: snap carousel */}
        {isMobile ? (
          <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide" style={{ height: "100dvh" }}>
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-full relative flex items-end"
                style={{ height: "100dvh" }}
              >
                <div
                  className={`absolute inset-0 ${(slide as any).isLogoBg ? 'bg-contain bg-center bg-no-repeat' : 'bg-cover bg-center'}`}
                  style={{ backgroundImage: `url(${slide.bg})`, ...((slide as any).isLogoBg ? { opacity: 0.08 } : {}) }}
                />
                {(slide as any).isLogoBg && <div className="absolute inset-0 bg-navy-950" style={{ zIndex: -1 }} />}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-navy-900/30" />
                <div className="relative z-10 p-6 pb-24 w-full" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6rem)" }}>

                  <span className="section-number font-mono text-copper-400 text-xs">
                    {slide.index} / {String(heroSlides.length).padStart(2, "0")}
                  </span>
                  <h1 className="font-serif text-cream mt-2 text-3xl sm:text-4xl leading-[1.1] whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-cream/70 text-sm mt-3 max-w-xs font-sans">{slide.subtitle}</p>
                  {slide.showVendors && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {company.vendors.map((v) => (
                        <span
                          key={v.name}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 text-cream/60 font-mono text-[0.65rem]"
                        >
                          {v.name} {v.prefix} {v.id}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: crossfade panels with framer-motion */
          <div className="relative w-full h-full">
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === activeSlide ? 1 : 0 }}
              >
                {(slide as any).isLogoBg && <div className="absolute inset-0 bg-navy-950" />}
                <div
                  className={`absolute inset-0 transition-transform duration-[2s] ${(slide as any).isLogoBg ? 'bg-contain bg-center bg-no-repeat' : 'bg-cover bg-center'}`}
                  style={{
                    backgroundImage: `url(${slide.bg})`,
                    transform: i === activeSlide ? "scale(1.05)" : "scale(1)",
                    ...((slide as any).isLogoBg ? { opacity: 0.08 } : {}),
                  }}
                />
                {!(slide as any).isLogoBg && <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/50 to-transparent" />}
                {!(slide as any).isLogoBg && <div className="absolute inset-0 bg-navy-950/20" />}
                {(slide as any).isLogoBg && <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-navy-950/40 to-navy-950/60" />}
              </div>
            ))}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end container-main pb-20 lg:pb-24">
              <div className="max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >

                    <span className="section-number font-mono text-copper-400 text-sm">
                      {heroSlides[activeSlide].index} / {String(heroSlides.length).padStart(2, "0")}
                    </span>
                    <h1 className="font-serif text-cream mt-3 text-display leading-[1.05] whitespace-pre-line">
                      {heroSlides[activeSlide].title}
                    </h1>
                    <p className="text-cream/70 text-lg mt-4 max-w-lg font-sans">
                      {heroSlides[activeSlide].subtitle}
                    </p>
                    {heroSlides[activeSlide].showVendors && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {company.vendors.map((v, vi) => (
                          <motion.span
                            key={v.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + vi * 0.1 }}
                            className="px-4 py-2 bg-white/5 border border-white/10 text-cream/70 font-mono text-xs backdrop-blur-sm"
                          >
                            {v.name} {v.prefix} {v.id}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-6 left-0 right-0 container-main">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-white/10 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-copper-500"
                      animate={{ width: `${progressWidth}%` }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-cream/40 font-mono text-xs shrink-0">
                    Scroll to explore
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile dot indicator */}
        {isMobile && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-20" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}>
            {heroSlides.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-6 bg-copper-500" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   INTRO / ABOUT SECTION
   ────────────────────────────────────────────── */

function IntroSection() {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="section-number">01 / About</span>
              <h2 className="text-h2 text-navy-900 mt-4 font-serif">
                A trusted industrial partner since 2015
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <p className="text-steel-600 text-body mt-6 leading-relaxed max-w-xl">
                {company.aboutExtended}
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-2 gap-4">
              {company.stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i + 1} animation="scale">
                  <div className="p-5 border border-steel-200 blueprint-corners">
                    <span className="font-serif text-h3 text-navy-900 block">{stat.value}</span>
                    <span className="label text-steel-500 mt-1 block">{stat.label}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   VENDOR STRIP
   ────────────────────────────────────────────── */

function VendorStrip() {
  return (
    <section className="bg-navy-950 py-12 lg:py-16">
      <div className="container-main">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="section-number">02 / Credentials</span>
            <h3 className="text-h4 text-cream mt-3 font-serif">Approved Vendor</h3>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {company.vendors.map((v, i) => (
            <ScrollReveal key={v.name} delay={i + 1} animation="scale">
              <div className="vendor-card text-center">
                <span className="label text-copper-400 tracking-widest text-[0.65rem]">{v.label}</span>
                <div className="font-mono text-cream text-lg mt-2 tracking-wider">
                  {v.prefix} {v.id}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PRODUCT CATEGORIES
   ────────────────────────────────────────────── */

const categoryImages: Record<string, string> = {
  "tools-machinery": "https://images.unsplash.com/photo-1581147036324-c1a5960f0089?w=600&q=75",
  "measurement-instrumentation": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=75",
  "welding-fabrication": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75",
  "safety-lifting": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75",
  "electrical-lighting": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=75",
  "building-materials": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75",

};

function CategoriesSection() {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="section-number">03 / Products</span>
              <h2 className="text-h2 text-navy-900 mt-3 font-serif">Product Divisions</h2>
            </div>
            <Link href="/products" className="btn-outline text-xs self-start sm:self-auto">
              View All Products
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Responsive editorial bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {divisions.map((div, i) => {
            const catCount = categories.filter(
              (c) => c.divisionSlug === div.slug
            ).length;

            // Responsive grid distribution:
            // Mobile (<768px): 1 col stack (grid-cols-1)
            // Tablet (768px-1023px): 2 cols (md:grid-cols-2) -> 3 rows of 2 pairs, plus 1 full-width banner
            // Desktop (>=1024px): 12 cols (lg:grid-cols-12):
            //   - Tier 1: Card 0 (7 cols, 2 rows) + Cards 1 & 2 (5 cols each) = 12 cols
            //   - Tier 2: Cards 3, 4, 5 (4 cols each) = 12 cols
            //   - Tier 3: Card 6 (12 cols full width) = 12 cols
            const gridSpan =
              i === 0
                ? "md:col-span-1 lg:col-span-7 lg:row-span-2"
                : i === 1 || i === 2
                ? "md:col-span-1 lg:col-span-5"
                : i >= 3 && i <= 5
                ? "md:col-span-1 lg:col-span-4"
                : "md:col-span-2 lg:col-span-12";

            const isLarge = i === 0;
            const isBanner = i === 6;

            return (
              <ScrollReveal
                key={div.slug}
                delay={Math.min(i, 5)}
                animation="scale"
                className={`${gridSpan} flex flex-col`}
              >
                <Link
                  href={`/products?division=${div.slug}`}
                  className={`group relative overflow-hidden flex flex-col justify-end w-full h-full border border-steel-200/80 hover:border-copper-500/50 shadow-sm hover:shadow-xl transition-all duration-500 ${
                    isLarge
                      ? "min-h-[340px] sm:min-h-[380px] lg:min-h-[520px]"
                      : isBanner
                      ? "min-h-[260px] sm:min-h-[220px] lg:min-h-[240px]"
                      : "min-h-[220px] sm:min-h-[250px] lg:min-h-[248px]"
                  }`}
                >
                  {/* Background image with hover zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${categoryImages[div.slug] || ""})`,
                    }}
                  />
                  {/* High contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/20 group-hover:via-navy-950/50 transition-colors duration-500" />

                  {/* Blueprint corners */}
                  <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-copper-500/40 group-hover:border-copper-400 transition-colors duration-300" />
                  <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-copper-500/40 group-hover:border-copper-400 transition-colors duration-300" />

                  {/* Content */}
                  <div
                    className={`relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col justify-end h-full ${
                      isBanner ? "md:flex-row md:items-end md:justify-between gap-6" : ""
                    }`}
                  >
                    <div className={isBanner ? "max-w-2xl" : ""}>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-copper-400 text-xs tracking-wider">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {isBanner && (
                          <span className="label text-copper-400/90 text-[0.65rem] tracking-widest uppercase bg-copper-500/10 px-2 py-0.5 border border-copper-500/30">
                            Flagship Division
                          </span>
                        )}
                        {isLarge && (
                          <span className="label text-copper-400/90 text-[0.65rem] tracking-widest uppercase bg-copper-500/10 px-2 py-0.5 border border-copper-500/30">
                            Core Supply
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-serif text-cream mt-2 tracking-tight transition-colors duration-300 group-hover:text-copper-300 ${
                          isLarge
                            ? "text-2xl sm:text-3xl lg:text-4xl"
                            : isBanner
                            ? "text-xl sm:text-2xl lg:text-3xl"
                            : "text-lg sm:text-xl lg:text-2xl"
                        }`}
                      >
                        {div.name}
                      </h3>

                      <p
                        className={`text-cream/70 text-sm mt-2 leading-relaxed ${
                          isBanner
                            ? "line-clamp-2 max-w-xl"
                            : isLarge
                            ? "line-clamp-3 max-w-md"
                            : "line-clamp-2"
                        }`}
                      >
                        {div.description}
                      </p>
                    </div>

                    <div className={`flex items-center gap-3 shrink-0 ${isBanner ? "mt-4 md:mt-0" : "mt-4"}`}>
                      <span className="text-copper-400 text-xs font-mono bg-navy-950/60 backdrop-blur-sm px-2.5 py-1 border border-copper-500/20">
                        {catCount} {catCount === 1 ? "category" : "categories"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cream text-xs font-sans font-medium group-hover:text-copper-400 transition-colors">
                        <span>Explore</span>
                        <svg
                          className="w-4 h-4 text-copper-400 transition-transform duration-300 group-hover:translate-x-1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}



/* ──────────────────────────────────────────────
   BRANDS MARQUEE
   ────────────────────────────────────────────── */

function BrandMarquee() {
  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="bg-cream py-16 lg:py-20 overflow-hidden">
      <div className="container-main mb-10">
        <ScrollReveal>
          <span className="section-number">04 / Partners</span>
          <h2 className="text-h2 text-navy-900 mt-3 font-serif">Trusted Brands</h2>
          <p className="text-steel-500 text-sm mt-2 max-w-lg">
            Authorized distributor and stockist for leading industrial tool, equipment, and materials manufacturers.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee rows */}
      {[row1, row2].map((row, rowIdx) => (
        <div key={rowIdx} className="relative mb-4 overflow-hidden">
          <div
            className="flex gap-8 items-center animate-marquee"
            style={{
              animationDirection: rowIdx % 2 === 0 ? "normal" : "reverse",
              animationDuration: "40s",
            }}
          >
            {[...row, ...row].map((brand, i) => (
              <div
                key={`${brand.slug}-${i}`}
                className="flex items-center justify-center px-6 py-4 min-w-[140px] shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <span className="font-sans font-bold text-navy-900 text-sm lg:text-base whitespace-nowrap tracking-wide">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="container-main mt-6">
        <p className="text-steel-400 text-xs font-mono">
          * Distributor / stockist status to be confirmed with client before launch.
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────
   WHY EXAR
   ────────────────────────────────────────────── */

function WhyExarSection() {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-number">05 / Advantage</span>
            <h2 className="text-h2 text-navy-900 mt-3 font-serif">Why Exar</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-steel-200">
          {company.benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.number} delay={Math.min(i + 1, 4)} animation="up">
              <div className="bg-cream p-8 lg:p-10">
                <span className="font-mono text-copper-500 text-3xl lg:text-4xl font-light">
                  {benefit.number}
                </span>
                <div className="hairline-copper w-12 mt-4 mb-4" />
                <h3 className="font-serif text-navy-900 text-h4">{benefit.title}</h3>
                <p className="text-steel-600 text-sm mt-3 leading-relaxed max-w-sm">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   VISION & MISSION
   ────────────────────────────────────────────── */

function VisionMissionSection() {
  return (
    <section className="bg-navy-900 section-padding relative overflow-hidden film-grain">
      <div className="container-main relative z-10">
        <ScrollReveal>
          <span className="section-number text-copper-400">06 / Purpose</span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-8">
          <ScrollReveal delay={1}>
            <div>
              <h3 className="font-serif text-cream text-h3">Our Vision</h3>
              <div className="hairline-copper w-12 mt-4 mb-6" />
              <p className="text-cream/70 text-body leading-relaxed">{company.vision}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div>
              <h3 className="font-serif text-cream text-h3">Our Mission</h3>
              <div className="hairline-copper w-12 mt-4 mb-6" />
              <p className="text-cream/70 text-body leading-relaxed">{company.mission}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   LOCATIONS
   ────────────────────────────────────────────── */

function LocationsSection() {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <ScrollReveal>
          <span className="section-number">07 / Locations</span>
          <h2 className="text-h2 text-navy-900 mt-3 font-serif mb-10">Our Offices</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {company.locations.map((loc, i) => (
            <ScrollReveal key={loc.name} delay={i + 1} animation="scale">
              <div className="border border-steel-200 p-6 lg:p-8 blueprint-corners">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-serif text-navy-900 text-h4">{loc.name}</span>
                  <span className="label text-copper-500 text-[0.6rem]">{loc.type}</span>
                </div>
                <p className="text-steel-600 text-sm leading-relaxed">
                  {loc.description}
                </p>
                <div className="hairline mt-5 mb-4" />
                <div className="flex gap-3">
                  <a
                    href={`tel:${company.contact.phoneClean}`}
                    className="flex items-center gap-1.5 text-copper-500 text-xs font-sans font-semibold hover:text-copper-600 transition-colors min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    Call
                  </a>
                  <a
                    href={company.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-copper-500 text-xs font-sans font-semibold hover:text-copper-600 transition-colors min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
      <div className="container-main relative z-10 text-center">
        <ScrollReveal>
          <span className="section-number text-copper-400">08 / Enquire</span>
          <h2 className="font-serif text-cream text-h1 mt-4 max-w-3xl mx-auto">
            Send us your requirement list.
            <br />
            <span className="text-copper-400">We&apos;ll respond with a quotation.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <a href="/exar-catalog.pdf" download className="btn-outline-light">
              Download Catalog
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-cream/40 text-xs font-mono">
            <span>{company.contact.phone}</span>
            <span className="w-1 h-1 bg-copper-500/50 rounded-full" />
            <span>{company.contact.email}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   WHATSAPP BUTTON
   ────────────────────────────────────────────── */

function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href={company.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 16,
        pointerEvents: isVisible ? "auto" as const : "none" as const,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
        right: "1.5rem",
      }}
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE
   ────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <VendorStrip />
        <CategoriesSection />

        <BrandMarquee />
        <WhyExarSection />
        <VisionMissionSection />
        <LocationsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
