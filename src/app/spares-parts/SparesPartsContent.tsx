"use client";

import { useState, useMemo } from "react";
import { categories } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

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
      <section className="bg-navy-900 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container-main">
          <ScrollReveal>
            <span className="section-number text-copper-400">Spare Parts</span>
            <h1 className="text-h1 text-cream mt-4 font-serif">Accessories & Spare Parts</h1>
            <p className="text-cream/60 text-body mt-3 max-w-xl">
              {sparesCategory?.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream section-padding">
        <div className="container-main">
          {/* Search & Filter */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1 max-w-md">
                <input
                  type="search"
                  placeholder="Search spare parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveBrand(null)}
                  className={`px-4 py-2.5 text-xs font-mono min-h-[44px] ${
                    !activeBrand ? "bg-navy-900 text-cream" : "bg-white border border-steel-200 text-steel-600"
                  }`}
                >
                  All Brands
                </button>
                {spareBrands.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setActiveBrand(b.name)}
                    className={`px-4 py-2.5 text-xs font-mono min-h-[44px] ${
                      activeBrand === b.name ? "bg-navy-900 text-cream" : "bg-white border border-steel-200 text-steel-600"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Brands */}
          {filteredBrands.map((brand, bi) => (
            <ScrollReveal key={brand.name} delay={Math.min(bi, 3)}>
              <div className="mb-10 last:mb-0">
                <h2 className="font-serif text-navy-900 text-h3 mb-4">{brand.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {brand.families.map((family) => (
                    <div
                      key={family}
                      className="flex items-center gap-3 p-4 border border-steel-200 bg-white hover:border-copper-500/30 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-copper-500 shrink-0" />
                      <span className="text-navy-900 text-sm font-sans">
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
