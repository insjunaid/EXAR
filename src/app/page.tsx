"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { company } from "@/data/company";
import { divisions, categories } from "@/data/products";
import { brands } from "@/data/brands";
import { bgImage, divisionImages, sceneImages } from "@/data/images";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/home/Hero";
import StatsGrid from "@/components/sections/StatsGrid";
import VendorPlates from "@/components/sections/VendorPlates";
import WhyExar from "@/components/sections/WhyExar";
import VisionMission from "@/components/sections/VisionMission";
import OfficesShowcase from "@/components/sections/OfficesShowcase";

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ──────────────────────────────────────────────
   INTRO / ABOUT SECTION
   ────────────────────────────────────────────── */

function IntroSection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="bg-cream section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="section-number eyebrow">01 / About</span>
            </ScrollReveal>
            <ScrollReveal animation="lines">
              <h2 className="text-h1 text-navy-900 mt-5 font-serif leading-[1.05]">
                <span className="rise-line">
                  <span>A trusted industrial</span>
                </span>
                <span className="rise-line">
                  <span style={{ "--d": "0.1s" } as React.CSSProperties}>
                    partner <em className="italic font-light text-copper-500">since 2015</em>
                  </span>
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-steel-600 text-body mt-8 leading-relaxed max-w-xl first-letter:float-left first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-copper-500">
                {company.aboutExtended}
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <StatsGrid />
          </div>
        </div>

        {/* Cinematic band */}
        <ScrollReveal animation="clip" className="mt-16 lg:mt-24">
          <div ref={bandRef} className="relative h-[42vh] min-h-[260px] lg:h-[56vh] overflow-hidden bg-navy-900">
            <motion.div
              aria-hidden="true"
              style={{ y, ...bgImage(sceneImages.warehouseRacks) }}
              className="absolute -inset-y-[12%] inset-x-0 bg-cover bg-center bg-responsive"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent" />
            <div className="absolute left-0 bottom-0 p-6 lg:p-10 flex items-end gap-4">
              <span className="w-10 h-10 border border-copper-400/60 flex items-center justify-center text-copper-400 shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              </span>
              <div>
                <span className="block font-mono text-copper-300 text-[0.7rem] tracking-[0.22em] uppercase">
                  {company.locations.map((l) => l.name).join(" · ")}
                </span>
                <span className="block font-serif text-cream text-2xl lg:text-4xl mt-1">{company.region}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-copper-400/70" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-copper-400/70" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   VENDOR STRIP
   ────────────────────────────────────────────── */

function VendorStrip() {
  return (
    <section className="bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(181,96,43,0.18), transparent 60%)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.04]" />
      <div className="container-main relative">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-14">
            <span className="section-number eyebrow">02 / Credentials</span>
            <h3 className="text-h2 text-cream mt-4 font-serif">
              Approved <em className="italic font-light text-copper-300">Vendor</em>
            </h3>
          </div>
        </ScrollReveal>
        <VendorPlates />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PRODUCT CATEGORIES
   ────────────────────────────────────────────── */

function CategoriesSection() {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <ScrollReveal>
              <span className="section-number eyebrow">03 / Products</span>
            </ScrollReveal>
            <ScrollReveal animation="lines">
              <h2 className="text-h1 text-navy-900 mt-4 font-serif">
                <span className="rise-line">
                  <span>
                    Product <em className="italic font-light text-copper-500">Divisions</em>
                  </span>
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={2}>
            <Link href="/products" className="btn-outline magnetic text-xs self-start sm:self-auto">
              View All Products
              <ArrowIcon />
            </Link>
          </ScrollReveal>
        </div>

        {/* Responsive editorial bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {divisions.map((div, i) => {
            const catCount = categories.filter((c) => c.divisionSlug === div.slug).length;

            // Mobile: 1 col stack · Tablet: 2 cols · Desktop (12 cols):
            //   Tier 1: card 0 (7 cols, 2 rows) + cards 1 & 2 (5 cols each)
            //   Tier 2: cards 3, 4, 5 (4 cols each)
            //   Tier 3: card 6 (12 cols full width)
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
              <ScrollReveal key={div.slug} delay={Math.min(i, 5)} animation="up" className={`${gridSpan} flex flex-col`}>
                <Link
                  href={`/products?division=${div.slug}`}
                  data-tilt="3"
                  className={`group spotlight relative overflow-hidden flex flex-col justify-end w-full h-full bg-navy-900 shadow-subtle hover:shadow-lift transition-shadow duration-700 ${
                    isLarge
                      ? "min-h-[360px] sm:min-h-[400px] lg:min-h-[540px]"
                      : isBanner
                      ? "min-h-[260px] sm:min-h-[220px] lg:min-h-[240px]"
                      : i >= 3
                      ? "min-h-[280px] sm:min-h-[300px] lg:min-h-[320px]"
                      : "min-h-[260px] sm:min-h-[280px] lg:min-h-[258px]"
                  }`}
                >
                  {/* Background image with slow hover zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-responsive transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    style={bgImage(divisionImages[div.slug] || "")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-navy-950/15 transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-copper-400/50 transition-[box-shadow] duration-700 z-[3]" />

                  {/* Blueprint corners */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-copper-400/50 group-hover:w-7 group-hover:h-7 group-hover:border-copper-300 transition-all duration-500 z-[3]" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-copper-400/50 group-hover:w-7 group-hover:h-7 group-hover:border-copper-300 transition-all duration-500 z-[3]" />

                  {/* Oversized index */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-3 right-5 font-serif font-light leading-none text-outline text-white/15 group-hover:text-copper-300/50 transition-colors duration-700 z-[3] ${
                      isLarge ? "text-[7rem] lg:text-[9rem]" : "text-[4.5rem] lg:text-[5.5rem]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div
                    className={`relative z-10 p-6 sm:p-7 lg:p-8 flex flex-col justify-end h-full ${
                      isBanner ? "md:flex-row md:items-end md:justify-between gap-6" : ""
                    }`}
                  >
                    <div className={isBanner ? "max-w-2xl" : ""}>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-copper-400 text-xs tracking-wider">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {isBanner && (
                          <span className="label text-copper-300 text-[0.6rem] tracking-[0.2em] bg-copper-500/15 px-2 py-0.5 border border-copper-500/30">
                            Flagship Division
                          </span>
                        )}
                        {isLarge && (
                          <span className="label text-copper-300 text-[0.6rem] tracking-[0.2em] bg-copper-500/15 px-2 py-0.5 border border-copper-500/30">
                            Core Supply
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-serif text-cream mt-3 tracking-tight transition-colors duration-500 group-hover:text-copper-200 ${
                          isLarge
                            ? "text-3xl sm:text-4xl lg:text-5xl"
                            : isBanner
                            ? "text-xl sm:text-2xl lg:text-3xl"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        {div.name}
                      </h3>

                      <p
                        className={`text-cream/65 text-sm mt-3 leading-relaxed ${
                          isBanner ? "line-clamp-2 max-w-xl" : isLarge ? "line-clamp-3 max-w-md" : "line-clamp-2"
                        }`}
                      >
                        {div.description}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between gap-3 shrink-0 ${isBanner ? "mt-4 md:mt-0" : "mt-5"}`}>
                      <span className="text-copper-300 text-xs font-mono bg-navy-950/60 backdrop-blur-sm px-2.5 py-1 border border-copper-500/25">
                        {catCount} {catCount === 1 ? "category" : "categories"}
                      </span>
                      <span className="inline-flex items-center gap-3 text-cream text-xs font-sans font-semibold tracking-wide">
                        <span className="opacity-80 group-hover:opacity-100 transition-opacity">Explore</span>
                        <span className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-copper-500 group-hover:border-copper-500 transition-all duration-500">
                          <ArrowIcon className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </span>
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

function Spark() {
  return (
    <svg className="w-3 h-3 text-copper-500 shrink-0" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 0l1.2 4.8L12 6 7.2 7.2 6 12 4.8 7.2 0 6l4.8-1.2z" />
    </svg>
  );
}

function BrandMarquee() {
  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="bg-cream py-20 lg:py-28 overflow-hidden border-t border-steel-200/70">
      <div className="container-main mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7">
          <ScrollReveal>
            <span className="section-number eyebrow">04 / Partners</span>
          </ScrollReveal>
          <ScrollReveal animation="lines">
            <h2 className="text-h1 text-navy-900 mt-4 font-serif">
              <span className="rise-line">
                <span>
                  Trusted <em className="italic font-light text-copper-500">Brands</em>
                </span>
              </span>
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={2} className="lg:col-span-5">
          <p className="text-steel-500 text-sm lg:text-base max-w-md lg:ml-auto leading-relaxed">
            Authorized distributor and stockist for leading industrial tool, equipment, and materials manufacturers.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee rows */}
      <div className="mask-fade-x space-y-2 lg:space-y-4">
        {[row1, row2].map((row, rowIdx) => (
          <div key={rowIdx} className="marquee-row relative overflow-hidden py-3 border-y border-steel-200/60">
            <div
              className="flex w-max items-center animate-marquee"
              style={{
                animationDirection: rowIdx % 2 === 0 ? "normal" : "reverse",
                animationDuration: rowIdx % 2 === 0 ? "60s" : "70s",
              }}
            >
              {[...row, ...row].map((brand, i) => (
                <div key={`${brand.slug}-${i}`} className="flex items-center gap-8 lg:gap-12 pr-8 lg:pr-12 shrink-0">
                  <span
                    className={`whitespace-nowrap text-navy-900/70 hover:text-copper-600 transition-colors duration-300 cursor-default ${
                      i % 2 === 0
                        ? "font-serif text-3xl lg:text-5xl tracking-tight"
                        : "font-sans font-semibold uppercase text-lg lg:text-2xl tracking-[0.18em]"
                    }`}
                  >
                    {brand.name}
                  </span>
                  <Spark />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container-main mt-8">
        <p className="text-steel-400 text-xs font-mono">
          * Distributor / stockist status to be confirmed with client before launch.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="bg-navy-950 py-28 lg:py-40 relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ y, ...bgImage(sceneImages.warehouse) }}
        className="absolute -inset-y-[14%] inset-x-0 bg-cover bg-center bg-responsive opacity-30"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/70 to-navy-950" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(181,96,43,0.25), transparent 60%)" }}
      />
      <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.05]" />

      <div className="container-main relative z-10 text-center">
        <ScrollReveal>
          <span className="section-number eyebrow text-copper-400">08 / Enquire</span>
        </ScrollReveal>
        <ScrollReveal animation="lines">
          <h2 className="font-serif text-cream text-h1 lg:text-[clamp(3rem,5vw,5.5rem)] mt-6 max-w-5xl mx-auto leading-[1.05]">
            <span className="rise-line">
              <span>Send us your requirement list.</span>
            </span>
            <span className="rise-line">
              <span className="italic font-light text-copper-shimmer" style={{ "--d": "0.12s" } as React.CSSProperties}>
                We&apos;ll respond with a quotation.
              </span>
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link href="/contact" className="btn-primary magnetic">
              Request a Quote
              <ArrowIcon />
            </Link>
            <a href="/exar-catalog.pdf" download className="btn-outline-light magnetic">
              Download Catalog
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
              </svg>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-cream/45 text-xs font-mono">
            <a href={`tel:${company.contact.phoneClean}`} className="link-underline inline-flex items-center min-h-[44px] hover:text-cream transition-colors">
              {company.contact.phone}
            </a>
            <span className="w-1 h-1 bg-copper-500/60 rounded-full" />
            <a href={`mailto:${company.contact.email}`} className="link-underline inline-flex items-center min-h-[44px] hover:text-cream transition-colors">
              {company.contact.email}
            </a>
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
    handleScroll();
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
        pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed z-50 w-14 h-14 bg-[#25D366] rounded-full hidden lg:flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)]"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
        right: "1.5rem",
      }}
      aria-label="Chat on WhatsApp"
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] ring-pulse" />
      <span
        aria-hidden="true"
        className="hidden md:block absolute right-full mr-3 px-3 py-1.5 bg-navy-900 text-cream text-xs font-sans whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
      >
        Chat on WhatsApp
      </span>
      <svg className="relative w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
        <Hero />
        <IntroSection />
        <VendorStrip />
        <CategoriesSection />
        <BrandMarquee />
        <WhyExar eyebrow="05 / Advantage" />
        <VisionMission eyebrow="06 / Purpose" />
        <OfficesShowcase eyebrow="07 / Locations" />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
