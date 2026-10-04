"use client";

import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden film-grain">
        <div className="container-main relative z-10">
          <ScrollReveal>
            <span className="section-number text-copper-400">About</span>
            <h1 className="text-h1 text-cream mt-4 font-serif max-w-3xl">
              Building Saudi Arabia&apos;s industrial supply chain since 2015
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* About content */}
      <section className="bg-cream section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="text-h3 text-navy-900 font-serif">Our Story</h2>
                <div className="hairline-copper w-12 mt-3 mb-6" />
                <p className="text-steel-600 text-body leading-relaxed mb-6">
                  {company.aboutExtended}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {company.stats.map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={i + 1} animation="scale">
                    <div className="p-5 border border-steel-200 blueprint-corners">
                      <span className="font-serif text-h3 text-navy-900 block">{stat.value}</span>
                      <span className="label text-steel-500 mt-1 block">{stat.label}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* Vendor credentials */}
              <ScrollReveal delay={1}>
                <div className="bg-navy-900 p-6 lg:p-8 mb-6">
                  <h3 className="label text-copper-400 mb-4">Approved Vendor Credentials</h3>
                  {company.vendors.map((v) => (
                    <div key={v.name} className="py-3 border-b border-white/5 last:border-none">
                      <span className="text-cream/60 text-xs font-sans block">{v.label}</span>
                      <span className="font-mono text-cream text-lg mt-0.5 block tracking-wide">
                        {v.prefix} {v.id}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-navy-900 section-padding film-grain relative">
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal>
              <div>
                <h3 className="font-serif text-cream text-h3">Our Vision</h3>
                <div className="hairline-copper w-12 mt-4 mb-6" />
                <p className="text-cream/70 text-body leading-relaxed">{company.vision}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div>
                <h3 className="font-serif text-cream text-h3">Our Mission</h3>
                <div className="hairline-copper w-12 mt-4 mb-6" />
                <p className="text-cream/70 text-body leading-relaxed">{company.mission}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream section-padding">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-h2 text-navy-900 font-serif mb-10">Why Exar</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-steel-200">
            {company.benefits.map((b, i) => (
              <ScrollReveal key={b.number} delay={Math.min(i + 1, 4)}>
                <div className="bg-cream p-8 lg:p-10">
                  <span className="font-mono text-copper-500 text-3xl font-light">{b.number}</span>
                  <div className="hairline-copper w-12 mt-4 mb-4" />
                  <h3 className="font-serif text-navy-900 text-h4">{b.title}</h3>
                  <p className="text-steel-600 text-sm mt-3 leading-relaxed max-w-sm">{b.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-cream section-padding border-t border-steel-200">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="text-h2 text-navy-900 font-serif mb-10">Our Offices</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.locations.map((loc, i) => (
              <ScrollReveal key={loc.name} delay={i + 1} animation="scale">
                <div className="border border-steel-200 p-6 lg:p-8 blueprint-corners">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-serif text-navy-900 text-h4">{loc.name}</span>
                    <span className="label text-copper-500 text-[0.6rem]">{loc.type}</span>
                  </div>
                  <p className="text-steel-600 text-sm leading-relaxed">{loc.description}</p>
                  <div className="hairline mt-5 mb-4" />
                  <div className="flex gap-3">
                    <a href={`tel:${company.contact.phoneClean}`} className="text-copper-500 text-xs font-sans font-semibold min-h-[44px] flex items-center">
                      Call
                    </a>
                    <a href={company.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-copper-500 text-xs font-sans font-semibold min-h-[44px] flex items-center">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
