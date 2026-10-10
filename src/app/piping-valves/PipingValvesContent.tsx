"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { pipingSpecs } from "@/data/piping-specs";
import { sceneImages } from "@/data/images";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import { useCenterActive } from "@/components/useCenterActive";

export default function PipingValvesContent() {
  const [activeTab, setActiveTab] = useState(0);
  const spec = pipingSpecs[activeTab];
  const tabsRef = useRef<HTMLDivElement>(null);
  useCenterActive(tabsRef, activeTab);

  return (
    <>
      <PageHero
        eyebrow="Technical Reference"
        title="Piping & Valve Specifications"
        image={sceneImages.pipework}
        watermark="ASME"
        description={
          <>
            Complete technical reference for industrial pipes, fittings, and valves.
            All products manufactured and quality-controlled to ASME, ASTM, BS, and DIN standards.
          </>
        }
      />

      <section className="bg-navy-950 section-padding relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.04]" />
        <div className="container-main relative">
          {/* Tab bar */}
          <ScrollReveal>
            <div className="p-1 mb-8 bg-white/[0.03] border border-white/[0.06]">
              <div ref={tabsRef} role="tablist" aria-label="Specification sections" className="relative flex overflow-x-auto gap-1 pr-8 scrollbar-hide scroll-fade-x">
                {pipingSpecs.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(i)}
                    role="tab"
                    aria-selected={i === activeTab}
                    data-active={i === activeTab}
                    className={`relative px-5 py-3 text-xs font-mono whitespace-nowrap transition-colors shrink-0 min-h-[48px] cursor-pointer ${
                      i === activeTab ? "text-white" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {i === activeTab && (
                      <motion.span
                        layoutId="spec-tab"
                        className="absolute inset-0 bg-gradient-to-br from-copper-400 to-copper-600 shadow-[0_8px_24px_-10px_rgba(181,96,43,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Spec detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative border border-white/10 bg-navy-900/60 backdrop-blur-sm p-6 lg:p-10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-copper-400/70" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-copper-400/70" />
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                <div>
                  <span className="font-mono text-copper-400 text-xs">
                    {String(activeTab + 1).padStart(2, "0")} / {String(pipingSpecs.length).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-cream text-h2 mt-2">{spec.title}</h2>
                  {spec.subtitle && (
                    <p className="text-cream/50 text-sm mt-1">{spec.subtitle}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-6 shrink-0">
                  <div>
                    <span className="label text-copper-400 text-[0.6rem]">Standard</span>
                    <p className="mono-value text-cream/80 mt-1">{spec.standard}</p>
                  </div>
                  <div>
                    <span className="label text-copper-400 text-[0.6rem]">Sizes</span>
                    <p className="mono-value text-cream/80 mt-1">{spec.sizes}</p>
                  </div>
                </div>
              </div>

              <div className="hairline-dark mb-8" />

              {/* Materials table */}
              <h3 className="label text-cream/60 text-[0.65rem] mb-4">Material Grades</h3>
              {/* A real table from md up; rows stack into cards on phones. */}
              <div>
                <table className="w-full block md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="border-b border-white/15">
                      <th className="text-left label text-copper-400 text-[0.6rem] py-3 pr-6 w-1/4">
                        Material Category
                      </th>
                      <th className="text-left label text-copper-400 text-[0.6rem] py-3">
                        Available Grades
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {spec.materials.map((mat, i) => (
                      <tr
                        key={mat.category}
                        className={`block md:table-row border-b border-white/5 py-4 md:py-0 ${
                          i % 2 === 0 ? "md:bg-white/[0.02]" : ""
                        }`}
                      >
                        <td className="block md:table-cell pb-3 md:py-4 md:pr-6 text-cream/90 text-sm font-sans font-medium align-top">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-copper-500 md:hidden" />
                            {mat.category}
                          </span>
                        </td>
                        <td className="block md:table-cell md:py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {mat.grades.map((grade) => (
                              <span
                                key={grade}
                                className="px-2.5 py-1 bg-white/5 border border-white/8 text-cream/70 font-mono text-xs"
                              >
                                {grade}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional info */}
              {spec.additionalInfo && (
                <>
                  <div className="hairline-dark my-6" />
                  <h3 className="label text-cream/60 text-[0.65rem] mb-4">Additional Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(spec.additionalInfo).map(([key, val]) => (
                      <div key={key} className="border-l-2 border-copper-500/30 pl-4">
                        <span className="label text-copper-400 text-[0.55rem]">{key}</span>
                        <p className="mono-value text-cream/70 mt-1 text-xs leading-relaxed">{val}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-primary magnetic text-xs">
                  Request Pricing
                </Link>
                <a href="/exar-catalog.pdf" download className="btn-outline-light magnetic text-xs">
                  Download Full Catalog
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
