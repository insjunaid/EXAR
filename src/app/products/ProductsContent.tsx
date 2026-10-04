"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { divisions, categories } from "@/data/products";
import { useSearchParams } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

const categoryImages: Record<string, string> = {
  "tools-machinery": "https://images.unsplash.com/photo-1581147036324-c1a5960f0089?w=600&q=80",
  "measurement-instrumentation": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  "welding-fabrication": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  "safety-lifting": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  "electrical-lighting": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  "building-materials": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",

};

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const divisionParam = searchParams.get("division");
  const [activeDivision, setActiveDivision] = useState<string | null>(divisionParam);
  const [searchQuery, setSearchQuery] = useState("");

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
      <section className="bg-navy-900 pt-28 pb-12 lg:pt-36 lg:pb-16 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(var(--color-cream) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container-main relative z-10">
          <ScrollReveal animation="fade">
            <span className="section-number text-copper-400">Catalog</span>
            <h1 className="text-h1 text-cream mt-4 font-serif">Products & Materials</h1>
            <p className="text-cream/60 text-body mt-3 max-w-xl">
              Over 20 product categories across 6 industrial divisions. Tools, machinery, measurement instruments, welding supplies, abrasives & non-sparking tools, safety gear, and building materials.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream section-padding">
        <div className="container-main">
          {/* Filters */}
          <ScrollReveal animation="fade">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="search"
                  placeholder="Search products, brands, specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                />
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              {/* Division filter */}
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                <button
                  onClick={() => setActiveDivision(null)}
                  className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap shrink-0 min-h-[44px] transition-all cursor-pointer ${
                    !activeDivision
                      ? "bg-navy-900 text-cream shadow-sm"
                      : "bg-white border border-steel-200 text-steel-600 hover:border-copper-500 hover:text-navy-900"
                  }`}
                >
                  All Divisions
                </button>
                {divisions.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => setActiveDivision(d.slug)}
                    className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap shrink-0 min-h-[44px] transition-all cursor-pointer ${
                      activeDivision === d.slug
                        ? "bg-navy-900 text-cream shadow-sm"
                        : "bg-white border border-steel-200 text-steel-600 hover:border-copper-500 hover:text-navy-900"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count & active query tag */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-steel-500 text-xs font-mono">
                Showing <strong className="text-navy-900">{filteredCategories.length}</strong> {filteredCategories.length === 1 ? "category" : "categories"}
                {activeDivision && ` in ${divisions.find((d) => d.slug === activeDivision)?.name}`}
              </p>
              {(searchQuery || activeDivision) && (
                <button
                  onClick={() => {
                    setActiveDivision(null);
                    setSearchQuery("");
                  }}
                  className="text-xs font-mono text-copper-600 hover:text-copper-700 underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, index) => (
              <ScrollReveal
                key={cat.slug}
                animation="up"
                delay={(index % 3) as 0 | 1 | 2}
                className="h-full"
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="group block border border-steel-200 hover:border-copper-500/40 hover:shadow-subtle transition-all duration-300 bg-white blueprint-corners h-full flex flex-col"
                >
                  {/* Image */}
                  <div
                    className="h-44 bg-cover bg-center relative overflow-hidden bg-steel-100"
                    style={{
                      backgroundImage: `url(${categoryImages[cat.divisionSlug] || ""})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors duration-300" />
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-copper-500/60" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-copper-500/60" />
                    <span className="absolute bottom-3 left-3 text-cream font-mono text-[0.65rem] bg-navy-900/80 px-2 py-0.5 tracking-wider uppercase">
                      Catalog p.{cat.catalogPage}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="label text-copper-500 text-[0.6rem] font-mono uppercase">{cat.division}</span>
                      <h3 className="font-serif text-navy-900 text-h4 mt-1 group-hover:text-copper-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-steel-600 text-xs mt-2 line-clamp-2 leading-relaxed">{cat.description}</p>

                      {cat.brands && cat.brands.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {cat.brands.slice(0, 4).map((b) => (
                            <span key={b} className="px-2 py-0.5 bg-steel-100 text-steel-600 text-[0.65rem] font-mono">
                              {b}
                            </span>
                          ))}
                          {cat.brands.length > 4 && (
                            <span className="px-2 py-0.5 text-steel-400 text-[0.65rem] font-mono">
                              +{cat.brands.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-steel-100 text-copper-500 text-xs font-semibold">
                      <span>View Specifications</span>
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

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
