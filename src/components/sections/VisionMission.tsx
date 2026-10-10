"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  {
    title: "Our Vision",
    text: company.vision,
    icon: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Our Mission",
    text: company.mission,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
];

export default function VisionMission({ eyebrow }: { eyebrow?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <section ref={ref} className="bg-navy-900 section-padding relative overflow-hidden film-grain">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 10% 0%, rgba(181,96,43,0.16), transparent 50%)" }}
      />
      <motion.div
        aria-hidden="true"
        style={{ x }}
        className="absolute bottom-[-0.18em] left-0 font-serif font-light leading-none whitespace-nowrap text-[clamp(8rem,22vw,22rem)] text-outline text-white/[0.06] select-none pointer-events-none"
      >
        Vision · Mission · Exar
      </motion.div>

      <div className="container-main relative z-10">
        {eyebrow && (
          <ScrollReveal>
            <span className="section-number eyebrow text-copper-400">{eyebrow}</span>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 lg:mt-14 border-t border-white/10">
          {pillars.map((p, i) => (
            <ScrollReveal
              key={p.title}
              delay={i + 1}
              className={`pt-10 lg:pt-14 pb-4 ${i === 0 ? "lg:pr-16 lg:border-r lg:border-white/10" : "lg:pl-16 mt-10 lg:mt-0 border-t border-white/10 lg:border-t-0"}`}
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full border border-copper-500/40 flex items-center justify-center text-copper-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    {p.icon}
                  </svg>
                </span>
                <span className="font-mono text-cream/30 text-xs tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-serif text-cream text-h2 mt-8">{p.title}</h3>
              <div className="hairline-copper w-16 mt-5 mb-7" />
              <p className="text-cream/70 text-body lg:text-lg leading-relaxed max-w-xl">{p.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
