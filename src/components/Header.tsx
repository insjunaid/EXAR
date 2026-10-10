"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";
import { divisions } from "@/data/products";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasMega: true },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const lastScrollY = useRef(0);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // Hide on scroll down, show on scroll up (mobile/tablet)
      if (window.innerWidth < 1024) {
        if (currentY > lastScrollY.current && currentY > 200) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isMobileMenuOpen]);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setIsMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setIsMegaOpen(false), 200);
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-navy-950/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-main">
          <div className={`flex items-center justify-between transition-[height] duration-500 ${isScrolled ? "h-16 lg:h-[4.5rem]" : "h-16 lg:h-24"}`}>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group py-1"
              aria-label="Exar International Home"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline leading-none">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream group-hover:text-white transition-colors">
                    E
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-copper-shimmer">
                    XAR
                  </span>
                </div>
                <span className="text-copper-400 text-[0.65rem] tracking-[0.22em] uppercase font-sans font-semibold leading-none mt-1 group-hover:text-copper-300 transition-colors">
                  International
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
                  onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-sans font-medium tracking-wide transition-colors ${
                      isActive(link.href) ? "text-cream" : "text-cream/75 hover:text-cream"
                    }`}
                  >
                    <span className="link-underline" data-active={isActive(link.href) || undefined}>
                      {link.label}
                    </span>
                    {link.hasMega && (
                      <svg
                        className={`inline-block ml-1.5 w-3 h-3 transition-transform duration-300 ${isMegaOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.hasMega && isMegaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                      >
                        <div className="relative bg-navy-950/95 backdrop-blur-2xl border border-white/[0.07] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] min-w-[800px] grid grid-cols-[1fr_240px]">
                          <div className="absolute top-0 left-0 right-0 hairline-copper opacity-70" />
                          <div className="p-5 grid grid-cols-2 gap-1">
                            {divisions.map((div, di) => (
                              <Link
                                key={div.slug}
                                href={`/products?division=${div.slug}`}
                                onClick={() => setIsMegaOpen(false)}
                                className="group spotlight p-4 hover:bg-white/[0.04] transition-colors"
                              >
                                <span className="text-copper-400 text-xs font-mono tracking-wide">
                                  {String(di + 1).padStart(2, "0")}
                                </span>
                                <h4 className="text-cream text-sm font-sans font-semibold mt-1 group-hover:text-copper-300 transition-colors flex items-center gap-2">
                                  {div.name}
                                  <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </h4>
                                <p className="text-steel-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                                  {div.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                          <div className="border-l border-white/[0.07] bg-white/[0.02] p-6 flex flex-col justify-between gap-6">
                            <div>
                              <span className="label text-copper-400 text-[0.6rem]">Resources</span>
                              <a
                                href="/exar-catalog.pdf"
                                download
                                className="group mt-4 flex items-start gap-3 text-cream/80 hover:text-cream transition-colors"
                              >
                                <span className="w-9 h-9 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
                                  </svg>
                                </span>
                                <span className="text-sm font-medium leading-snug pt-1.5">Download Catalog</span>
                              </a>
                              <Link
                                href="/spares-parts"
                                onClick={() => setIsMegaOpen(false)}
                                className="group mt-3 flex items-start gap-3 text-cream/80 hover:text-cream transition-colors"
                              >
                                <span className="w-9 h-9 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0 group-hover:bg-copper-500 group-hover:text-white transition-colors">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
                                  </svg>
                                </span>
                                <span className="text-sm font-medium leading-snug pt-1.5">Spare Parts</span>
                              </Link>
                            </div>
                            <Link
                              href="/products"
                              onClick={() => setIsMegaOpen(false)}
                              className="btn-outline-light w-full whitespace-nowrap text-[0.7rem] px-3 py-2.5 min-h-0"
                            >
                              View All Products
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href={`tel:${company.contact.phoneClean}`}
                className="hidden xl:inline-flex items-center gap-2 text-cream/70 hover:text-cream text-xs font-mono tracking-wide transition-colors"
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400/70 ring-pulse" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                {company.contact.phone}
              </a>
              <Link href="/contact" className="btn-primary magnetic text-xs py-2.5 px-5 min-h-[44px]">
                Request a Quote
              </Link>
            </div>

            {/* Mobile: enquiry + menu */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${company.contact.phoneClean}`}
                className="w-10 h-10 flex items-center justify-center text-cream/70"
                aria-label="Call us"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-cream"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-5 h-4">
                  <span
                    className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        {isScrolled && <div className="absolute bottom-0 left-0 right-0 hairline-copper opacity-30" />}
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden flex flex-col overflow-hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 4rem)",
          clipPath: isMobileMenuOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.05]" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(181,96,43,0.22), transparent 55%)" }}
        />
        <nav
          className="relative flex-1 flex flex-col overflow-y-auto overscroll-contain px-8 sm:px-12"
          aria-label="Mobile navigation"
          data-lenis-prevent
        >
          <div className="my-auto py-6 w-full max-w-xl mx-auto">
            {navLinks.map((link, i) => (
              <div key={link.href} className="border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    className="group flex-1 flex items-baseline py-5 overflow-hidden"
                  >
                    <span className="text-copper-400 font-mono text-xs mr-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-cream text-4xl sm:text-5xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
                      } ${isActive(link.href) ? "italic text-copper-300" : ""}`}
                      style={{ transitionDelay: isMobileMenuOpen ? `${0.15 + i * 0.07}s` : "0s" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                  {link.hasMega && (
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((v) => !v)}
                      tabIndex={isMobileMenuOpen ? 0 : -1}
                      aria-expanded={isMobileProductsOpen}
                      aria-controls="mobile-divisions"
                      aria-label={isMobileProductsOpen ? "Hide product divisions" : "Show product divisions"}
                      className={`w-11 h-11 shrink-0 flex items-center justify-center border transition-colors duration-300 ${
                        isMobileProductsOpen ? "border-copper-500 bg-copper-500 text-white" : "border-white/15 text-cream/70"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isMobileProductsOpen ? "rotate-45" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  )}
                </div>

                {link.hasMega && (
                  <div
                    id="mobile-divisions"
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isMobileProductsOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-5 pl-9">
                        {[
                          ...divisions.map((d) => ({ href: `/products?division=${d.slug}`, label: d.name })),
                          { href: "/spares-parts", label: "Spare Parts" },
                        ].map((item, di) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              tabIndex={isMobileMenuOpen && isMobileProductsOpen ? 0 : -1}
                              className="flex items-center gap-3 min-h-[44px] text-cream/75 active:text-copper-300 text-sm font-sans"
                            >
                              <span className="font-mono text-[0.7rem] text-copper-400/80 w-5">
                                {String(di + 1).padStart(2, "0")}
                              </span>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="relative w-full max-w-xl mx-auto px-8 sm:px-12 pb-8" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)" }}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <a
              href={`tel:${company.contact.phoneClean}`}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="flex flex-col items-center gap-2 py-3 bg-white/5 border border-white/[0.06] text-cream text-xs font-sans"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call
            </a>
            <a
              href={company.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="flex flex-col items-center gap-2 py-3 bg-white/5 border border-white/[0.06] text-cream text-xs font-sans"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="flex flex-col items-center gap-2 py-3 bg-copper-500 text-white text-xs font-sans font-semibold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              RFQ
            </Link>
          </div>
          <p className="text-steel-400 text-xs text-center font-mono">
            {company.contact.email}
          </p>
        </div>
      </div>
    </>
  );
}
