"use client";

import Link from "next/link";
import { company } from "@/data/company";
import { divisions } from "@/data/products";
import { useState } from "react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Brands", href: "/brands" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: divisions.map((d) => ({
      label: d.name,
      href: `/products?division=${d.slug}`,
    })),
  },
  {
    title: "Resources",
    links: [
      { label: "Request a Quote", href: "/contact" },
      { label: "Download Catalog", href: "/exar-catalog.pdf" },
      { label: "Spare Parts", href: "/spares-parts" },
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="bg-navy-900 text-cream relative">
      {/* Hairline top */}
      <div className="hairline-copper" />

      <div className="container-main py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <div className="flex items-baseline leading-none font-serif mb-1">
                <span className="text-2xl font-bold tracking-tight text-cream">
                  E
                </span>
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-copper-400 to-copper-500 bg-clip-text text-transparent">
                  XAR
                </span>
                <span className="text-xl text-cream/90 ml-2 font-medium tracking-tight">
                  International
                </span>
              </div>
              <p className="text-copper-400 text-xs tracking-[0.15em] uppercase font-sans font-semibold mt-1">
                Trading Est
              </p>
            </div>
            <p className="text-steel-400 text-sm leading-relaxed max-w-sm">
              {company.tagline}. Established {company.established}, Saudi Arabia.
            </p>

            {/* Vendor IDs */}
            <div className="mt-6 space-y-2">
              {company.vendors.map((v) => (
                <div key={v.name} className="flex items-baseline gap-2">
                  <span className="text-copper-500 text-xs font-mono">{v.name}</span>
                  <span className="flex-1 border-b border-dotted border-white/10" />
                  <span className="text-cream/60 text-xs font-mono">{v.prefix} {v.id}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-8 space-y-2">
              <a
                href={`tel:${company.contact.phoneClean}`}
                className="flex items-center gap-2 text-cream/80 hover:text-copper-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {company.contact.phone}
              </a>
              <a
                href={`tel:${company.contact.phoneSecondaryClean}`}
                className="flex items-center gap-2 text-cream/80 hover:text-copper-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {company.contact.phoneSecondary}
              </a>
              <a
                href={`mailto:${company.contact.email}`}
                className="flex items-center gap-2 text-cream/80 hover:text-copper-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {company.contact.email}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2 first:lg:col-start-6">
              {/* Mobile accordion header */}
              <button
                className="flex items-center justify-between w-full lg:pointer-events-none py-3 lg:py-0 border-b border-white/10 lg:border-none"
                onClick={() => toggleSection(section.title)}
                aria-expanded={openSection === section.title}
              >
                <span className="label text-copper-400">{section.title}</span>
                <svg
                  className={`w-4 h-4 text-steel-400 lg:hidden transition-transform ${
                    openSection === section.title ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <ul
                className={`mt-3 space-y-2 overflow-hidden transition-all duration-300 lg:max-h-none lg:opacity-100 ${
                  openSection === section.title
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
                }`}
              >
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/60 hover:text-cream text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="hairline-dark mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel-500 text-xs font-mono">
            © {new Date().getFullYear()} Exar International Trading Est. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-steel-500 text-xs">Dammam</span>
            <span className="w-1 h-1 bg-copper-500 rounded-full" />
            <span className="text-steel-500 text-xs">Jubail</span>
            <span className="w-1 h-1 bg-copper-500 rounded-full" />
            <span className="text-steel-500 text-xs">Khobar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
