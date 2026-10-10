"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { sceneImages } from "@/data/images";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { useCenterActive } from "@/components/useCenterActive";

// Get the spare parts category data
const sparesCategory = categories.find((c) => c.slug === "accessories-spare-parts");

const spareBrands = [
  {
    name: "DeWalt",
    families: [
      "Accessories", "Attachments", "Caulk Gun", "Compressors", "Cordless Drills",
      "Drills", "Fastening", "Hammers", "Impacts", "Lasers", "Leg Stands",
      "Metal Working", "Outdoor", "Saws", "Screwdriving", "Storage", "Vacuum Extractors",
      "Wood Working"
    ],
  },
  {
    name: "Makita",
    families: [
      "Cordless Tools", "Dust Extraction", "Masonry & Concrete Tools", "Metal Working Tools",
      "Outdoor Power Equipment", "Rotary & Demolition Hammers", "Rotary & Percussion Drills",
      "Sanders", "Saws", "Screwdrivers & Fasteners", "Woodworking"
    ],
  },
  {
    name: "Bosch",
    families: [
      "Air Tools", "Attachments", "Bench Top", "DIY Cordless Tools", "DIY Tools",
      "Garden", "Garden Cordless", "High Frequency", "Orbital Sanders", "Planers",
      "Pneumatic", "Professional", "Professional Cordless"
    ],
  },
  {
    name: "Metabo",
    families: [
      "Accessories", "Belt Sanders", "Compressors & Air Tools", "Corded Tools",
      "Cordless Tools", "Hand-held & Magnum", "Motors", "Orbital Sanders",
      "Planers", "Stationary (Elektra Beckum)"
    ],
  },
];

export default function SparesPartsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  useCenterActive(chipsRef, activeBrand);

  const filteredBrands = useMemo(() => {
    let result = spareBrands;
    if (activeBrand) {
      result = result.filter((b) => b.name === activeBrand);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.map((b) => ({
        ...b,
        families: b.families.filter((f) => f.toLowerCase().includes(q)),
      })).filter((b) => b.families.length > 0 || b.name.toLowerCase().includes(q));
    }
    return result;
  }, [activeBrand, searchQuery]);

  return (
    <>
      <PageHero
        eyebrow="Spare Parts"
        title="Accessories & Spare Parts"
        image={sceneImages.hammer}
        watermark="Spares"
        description={sparesCategory?.description}
      />

      <section className="bg-cream section-padding">
        <div className="container-main">
          {/* Search & Filter */}
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-12">
              <div className="relative flex-1 max-w-md group">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400 group-focus-within:text-copper-500 transition-colors pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  placeholder="Search spare parts..."
                  aria-label="Search spare parts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 focus:shadow-[0_0_0_4px_rgba(181,96,43,0.1)] min-h-[48px] transition-all"
                />
              </div>
              <div className="min-w-0 p-1 bg-white border border-steel-200">
                <div ref={chipsRef} className="relative flex overflow-x-auto gap-1 pr-6 scrollbar-hide scroll-fade-x">
                  {[null, ...spareBrands.map((b) => b.name)].map((name) => {
                    const isActive = activeBrand === name;
                    return (
                      <button
                        key={name ?? "all"}
                        onClick={() => setActiveBrand(name)}
                        data-active={isActive}
                        aria-pressed={isActive}
                        className={`relative px-4 py-2.5 text-xs font-mono min-h-[44px] whitespace-nowrap transition-colors cursor-pointer ${
                          isActive ? "text-cream" : "text-steel-600 hover:text-navy-900"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="spares-pill"
                            className="absolute inset-0 bg-navy-900"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        <span className="relative">{name ?? "All Brands"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Brands */}
          {filteredBrands.map((brand, bi) => (
            <ScrollReveal key={brand.name} delay={Math.min(bi, 3)}>
              <div className="mb-14 last:mb-0">
                <div className="flex items-baseline gap-4 mb-5 pb-3 border-b border-steel-200">
                  <span className="font-mono text-xs text-copper-500">{String(bi + 1).padStart(2, "0")}</span>
                  <h2 className="font-serif text-navy-900 text-h2">{brand.name}</h2>
                  <span className="ml-auto font-mono text-xs text-steel-400">{brand.families.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 hairline-grid">
                  {brand.families.map((family) => (
                    <div
                      key={family}
                      className="group spotlight spotlight-light flex items-center gap-3 p-5 bg-white hover:bg-cream transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-copper-500 shrink-0 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-navy-900 text-sm font-sans group-hover:text-copper-600 transition-colors">
                        {brand.name} {family} Spares & Parts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
