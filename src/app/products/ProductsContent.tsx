"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { divisions, categories } from "@/data/products";
import { bgImage, divisionImages, sceneImages } from "@/data/images";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { useCenterActive } from "@/components/useCenterActive";

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      data-active={active}
      aria-pressed={active}
      className={`relative px-4 py-2.5 text-xs font-mono whitespace-nowrap shrink-0 min-h-[44px] transition-colors duration-300 cursor-pointer ${
        active ? "text-cream" : "text-steel-600 hover:text-navy-900"
      }`}
    >
      {active && (
        <motion.span
          layoutId="division-pill"
          className="absolute inset-0 bg-navy-900 shadow-subtle"
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const divisionParam = searchParams.get("division");
  const [activeDivision, setActiveDivision] = useState<string | null>(divisionParam);
  const [searchQuery, setSearchQuery] = useState("");
  const chipsRef = useRef<HTMLDivElement>(null);
  useCenterActive(chipsRef, activeDivision);

  const filteredCategories = useMemo(() => {
    let result = categories;
    if (activeDivision) {
      result = result.filter((c) => c.divisionSlug === activeDivision);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.items?.some((item) => item.toLowerCase().includes(q)) ||
          c.brands?.some((brand) => brand.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeDivision, searchQuery]);

  return (
    <>
      <PageHero
        eyebrow="Catalog"
        title="Products & Materials"
        image={sceneImages.sparks}
        watermark="Catalog"
        description="Over 20 product categories across 6 industrial divisions. Tools, machinery, measurement instruments, welding supplies, abrasives & non-sparking tools, safety gear, and building materials."
      />

      <section className="bg-cream section-padding !pt-12 lg:!pt-16">
        <div className="container-main">
          {/* Filters */}
          <div
            className="fade-in-up lg:sticky lg:top-[4.5rem] z-30 -mx-[clamp(1rem,3vw,2.5rem)] px-[clamp(1rem,3vw,2.5rem)] py-4 mb-8 bg-cream/85 backdrop-blur-xl border-b border-steel-200/70"
            style={{ "--d": "0.3s" } as React.CSSProperties}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
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
                  placeholder="Search products, brands, specs..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 focus:shadow-[0_0_0_4px_rgba(181,96,43,0.1)] min-h-[48px] transition-all"
                />
              </div>

              {/* Division filter */}
              <div className="min-w-0 p-1 bg-white border border-steel-200">
                <div ref={chipsRef} className="relative flex overflow-x-auto gap-1 pr-8 scrollbar-hide scroll-fade-x">
                  <FilterChip active={!activeDivision} onClick={() => setActiveDivision(null)}>
                    All Divisions
                  </FilterChip>
                  {divisions.map((d) => (
                    <FilterChip key={d.slug} active={activeDivision === d.slug} onClick={() => setActiveDivision(d.slug)}>
                      {d.name}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ScrollReveal animation="fade">
            {/* Results count & active query tag */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <p className="text-steel-500 text-xs font-mono">
                Showing <strong className="text-navy-900">{filteredCategories.length}</strong>{" "}
                {filteredCategories.length === 1 ? "category" : "categories"}
                {activeDivision && ` in ${divisions.find((d) => d.slug === activeDivision)?.name}`}
              </p>
              {(searchQuery || activeDivision) && (
                <button
                  onClick={() => {
                    setActiveDivision(null);
                    setSearchQuery("");
                  }}
                  className="text-xs font-mono text-copper-600 hover:text-copper-700 link-underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Category grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="group spotlight spotlight-light block border border-steel-200 hover:border-copper-500/40 hover:shadow-lift hover:-translate-y-1 transition-all duration-500 bg-white h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="h-52 relative overflow-hidden bg-navy-900">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-responsive transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      style={bgImage(divisionImages[cat.divisionSlug] || "")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/30 to-navy-900/10 group-hover:from-navy-950/60 transition-colors duration-500" />
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-copper-400/70 group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-copper-400/70 group-hover:w-5 group-hover:h-5 transition-all duration-500" />
                    <span className="absolute bottom-3 left-3 text-cream font-mono text-[0.7rem] bg-navy-950/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 tracking-wider uppercase">
                      Catalog p.{cat.catalogPage}
                    </span>
                    <span className="absolute top-3 right-4 font-serif font-light text-5xl leading-none text-outline text-white/30 group-hover:text-copper-300/70 transition-colors duration-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="label text-copper-500 text-[0.6rem] font-mono uppercase">{cat.division}</span>
                      <h3 className="font-serif text-navy-900 text-h4 mt-1.5 group-hover:text-copper-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-steel-600 text-xs mt-2 line-clamp-2 leading-relaxed">{cat.description}</p>

                      {cat.brands && cat.brands.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {cat.brands.slice(0, 4).map((b) => (
                            <span key={b} className="px-2 py-0.5 bg-steel-100 text-steel-600 text-[0.7rem] font-mono">
                              {b}
                            </span>
                          ))}
                          {cat.brands.length > 4 && (
                            <span className="px-2 py-0.5 text-steel-400 text-[0.7rem] font-mono">
                              +{cat.brands.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-steel-100 text-copper-500 text-xs font-semibold tracking-wide">
                      <span>View Specifications</span>
                      <span className="w-8 h-8 rounded-full border border-copper-500/30 flex items-center justify-center group-hover:bg-copper-500 group-hover:text-white group-hover:border-copper-500 transition-all duration-500">
                        <svg className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-20 bg-white border border-steel-200 blueprint-corners">
              <p className="text-navy-900 text-xl font-serif">No products found</p>
              <p className="text-steel-500 text-sm mt-2">Try adjusting your search query or clear the active division filter.</p>
              <button
                onClick={() => {
                  setActiveDivision(null);
                  setSearchQuery("");
                }}
                className="btn-outline mt-6 text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
