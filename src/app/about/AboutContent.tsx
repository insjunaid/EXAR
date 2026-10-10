"use client";

import { company } from "@/data/company";
import { sceneImages } from "@/data/images";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import StatsGrid from "@/components/sections/StatsGrid";
import VendorPlates from "@/components/sections/VendorPlates";
import VisionMission from "@/components/sections/VisionMission";
import WhyExar from "@/components/sections/WhyExar";
import OfficesShowcase from "@/components/sections/OfficesShowcase";

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="About"
        title="Building Saudi Arabia's industrial supply chain since 2015"
        image={sceneImages.refinery}
        watermark="Since 2015"
      />

      {/* About content */}
      <section className="bg-cream section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal animation="lines">
                <h2 className="text-h2 text-navy-900 font-serif">
                  <span className="rise-line">
                    <span>
                      Our <em className="italic font-light text-copper-500">Story</em>
                    </span>
                  </span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <div className="hairline-copper w-16 mt-5 mb-8" />
                <p className="text-steel-600 text-body lg:text-lg leading-relaxed mb-6 first-letter:float-left first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-copper-500">
                  {company.aboutExtended}
                </p>
              </ScrollReveal>
              <div className="mt-10">
                <StatsGrid />
              </div>
            </div>

            <div className="lg:col-span-5">
              {/* Vendor credentials */}
              <div className="lg:sticky lg:top-28">
                <ScrollReveal delay={1}>
                  <div className="bg-navy-950 p-6 lg:p-8 relative overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(181,96,43,0.2), transparent 60%)" }}
                    />
                    <h3 className="relative label text-copper-400 mb-6 eyebrow">Approved Vendor Credentials</h3>
                    <div className="relative">
                      <VendorPlates columns={1} />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Benefits */}
      <WhyExar />

      {/* Locations */}
      <OfficesShowcase bordered />
    </>
  );
}
