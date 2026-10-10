import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

const icons = [
  // Quality Control
  <>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </>,
  // Wide Range
  <>
    <rect x="3.5" y="3.5" width="7" height="7" />
    <rect x="13.5" y="3.5" width="7" height="7" />
    <rect x="3.5" y="13.5" width="7" height="7" />
    <rect x="13.5" y="13.5" width="7" height="7" />
  </>,
  // Exceptional Support
  <>
    <path d="M4 14v-2a8 8 0 0116 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="1" />
    <rect x="17" y="14" width="4" height="6" rx="1" />
  </>,
  // Reliable Partnerships
  <>
    <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5" />
  </>,
];

export default function WhyExar({ eyebrow }: { eyebrow?: string }) {
  return (
    <section className="bg-cream section-padding">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            {eyebrow && (
              <ScrollReveal>
                <span className="section-number eyebrow">{eyebrow}</span>
              </ScrollReveal>
            )}
            <ScrollReveal animation="lines">
              <h2 className="text-h1 text-navy-900 mt-4 font-serif">
                <span className="rise-line">
                  <span>
                    Why <em className="italic font-light text-copper-500">Exar</em>
                  </span>
                </span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-steel-200 border border-steel-200">
          {company.benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.number} delay={Math.min(i + 1, 4)} animation="fade" className="h-full">
              <div className="group relative overflow-hidden bg-cream p-8 lg:p-12 h-full min-h-[300px] lg:min-h-[340px] flex flex-col">
                {/* Navy fill rising on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-900 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle at 85% 15%, rgba(212,133,74,0.22), transparent 55%)" }}
                />

                <span className="absolute right-6 lg:right-10 top-4 lg:top-6 font-serif font-light leading-none text-[6.5rem] lg:text-[9rem] text-outline text-steel-300 group-hover:text-copper-400/60 transition-colors duration-700 select-none">
                  {benefit.number}
                </span>

                <div className="relative mt-auto">
                  <div className="w-12 h-12 border border-copper-500/40 flex items-center justify-center text-copper-500 group-hover:text-copper-300 group-hover:border-copper-400/70 transition-colors duration-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      {icons[i % icons.length]}
                    </svg>
                  </div>
                  <div className="rule-grow mt-8 mb-5" />
                  <h3 className="font-serif text-navy-900 text-h3 group-hover:text-cream transition-colors duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-steel-600 text-sm lg:text-base mt-3 leading-relaxed max-w-md group-hover:text-cream/70 transition-colors duration-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
