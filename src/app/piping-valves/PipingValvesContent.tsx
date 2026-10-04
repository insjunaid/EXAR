"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { pipingSpecs } from "@/data/piping-specs";
import ScrollReveal from "@/components/ScrollReveal";

export default function PipingValvesContent() {
  const [activeTab, setActiveTab] = useState(0);
  const spec = pipingSpecs[activeTab];

  return (
    <>
      <section className="bg-navy-900 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="container-main">
          <ScrollReveal>
            <span className="section-number text-copper-400">Technical Reference</span>
            <h1 className="text-h1 text-cream mt-4 font-serif">
              Piping & Valve Specifications
            </h1>
            <p className="text-cream/60 text-body mt-3 max-w-2xl">
              Complete technical reference for industrial pipes, fittings, and valves.
              All products manufactured and quality-controlled to ASME, ASTM, BS, and DIN standards.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-navy-950 section-padding">
        <div className="container-main">
          {/* Tab bar */}
          <ScrollReveal>
            <div className="flex overflow-x-auto gap-1 pb-3 scrollbar-hide -mx-1 px-1 mb-8">
              {pipingSpecs.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-3 text-xs font-mono whitespace-nowrap transition-all shrink-0 min-h-[48px] ${
                    i === activeTab
                      ? "bg-copper-500 text-white"
                      : "bg-white/5 text-cream/60 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  {s.title}
                </button>
              ))}
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
              className="border border-white/10 bg-navy-900/50 p-6 lg:p-10"
            >
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
              <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/15">
                      <th className="text-left label text-copper-400 text-[0.6rem] py-3 pr-6 w-1/4">
                        Material Category
                      </th>
                      <th className="text-left label text-copper-400 text-[0.6rem] py-3">
                        Available Grades
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {spec.materials.map((mat, i) => (
                      <tr
                        key={mat.category}
                        className={`border-b border-white/5 ${
                          i % 2 === 0 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <td className="py-4 pr-6 text-cream/90 text-sm font-sans font-medium align-top">
                          {mat.category}
                        </td>
                        <td className="py-4">
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
                <Link href="/contact" className="btn-primary text-xs">
                  Request Pricing
                </Link>
                <a href="/exar-catalog.pdf" download className="btn-outline-light text-xs">
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
