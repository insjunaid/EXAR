"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import { divisions } from "@/data/products";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasMega: true },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-navy-900/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
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
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-copper-400 via-copper-500 to-copper-400 bg-clip-text text-transparent group-hover:from-copper-300 group-hover:to-copper-400 transition-all">
                    XAR
                  </span>
                </div>
                <span className="text-copper-400 text-[0.6rem] sm:text-[0.65rem] tracking-[0.22em] uppercase font-sans font-semibold leading-none mt-1 group-hover:text-copper-300 transition-colors">
                  International
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
                  onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-cream/80 hover:text-cream text-sm font-sans font-medium tracking-wide transition-colors"
                  >
                    {link.label}
                    {link.hasMega && (
                      <svg className="inline-block ml-1 w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMega && isMegaOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                    >
                      <div className="bg-navy-900/98 backdrop-blur-xl border border-white/5 shadow-2xl p-6 min-w-[640px] grid grid-cols-2 gap-4">
                        {divisions.map((div) => (
                          <Link
                            key={div.slug}
                            href={`/products?division=${div.slug}`}
                            className="group p-3 hover:bg-white/5 transition-colors"
                          >
                            <span className="text-copper-400 text-xs font-mono tracking-wide">
                              {String(divisions.indexOf(div) + 1).padStart(2, "0")}
                            </span>
                            <h4 className="text-cream text-sm font-sans font-semibold mt-1 group-hover:text-copper-400 transition-colors">
                              {div.name}
                            </h4>
                            <p className="text-steel-400 text-xs mt-1 line-clamp-2">
                              {div.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
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
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-900 transition-all duration-500 lg:hidden flex flex-col ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 4rem)" }}
      >
        <nav className="flex-1 flex flex-col justify-center px-8" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-4 border-b border-white/5"
            >
              <span className="text-copper-400 font-mono text-xs mr-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-cream text-2xl sm:text-3xl">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="px-8 pb-8" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)" }}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <a
              href={`tel:${company.contact.phoneClean}`}
              className="flex flex-col items-center gap-2 py-3 bg-white/5 text-cream text-xs font-sans"
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
              className="flex flex-col items-center gap-2 py-3 bg-white/5 text-cream text-xs font-sans"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
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
