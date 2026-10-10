import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brands } from "@/data/brands";
import { divisions } from "@/data/products";
import { sceneImages } from "@/data/images";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands & Manufacturing Partners",
  description:
    "Authorized distributor and stockist for 40+ leading industrial tool, equipment, and materials manufacturers including DeWalt, Makita, Bosch, Hilti, Mitutoyo, 3M, and more.",
};

export default function BrandsPage() {
  // Group brands by division
  const brandsByDivision: Record<string, typeof brands> = {};
  divisions.forEach((d) => {
    brandsByDivision[d.slug] = brands.filter((b) => b.divisions.includes(d.slug));
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Partners"
          title="Our Brands"
          image={sceneImages.warehouse}
          watermark={`${brands.length}+`}
          description={
            <>
              We partner with {brands.length}+ industry-leading manufacturers to deliver products that meet the highest
              quality and performance standards.
            </>
          }
        />

        <section className="bg-cream section-padding">
          <div className="container-main">
            {divisions.map((div, divIndex) => {
              const divBrands = brandsByDivision[div.slug];
              if (!divBrands || divBrands.length === 0) return null;
              return (
                <div key={div.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 lg:mb-24 last:mb-0">
                  {/* Division heading */}
                  <ScrollReveal animation="up" className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28 border-t border-copper-500/60 pt-5">
                      <span className="font-mono text-copper-500 text-xs font-semibold">
                        {String(divisions.indexOf(div) + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-serif text-navy-900 text-h2 mt-2 leading-[1.1]">{div.name}</h2>
                      <span className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-steel-500">
                        <span className="w-6 h-px bg-copper-500" />
                        {divBrands.length} {divBrands.length === 1 ? "Brand" : "Brands"}
                      </span>
                    </div>
                  </ScrollReveal>

                  {/* Brand tiles */}
                  <ScrollReveal animation="up" delay={(divIndex % 3) as 0 | 1 | 2} className="lg:col-span-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 hairline-grid">
                      {divBrands.map((brand) => (
                        <div
                          key={brand.slug}
                          className="group spotlight spotlight-light relative flex flex-col items-center justify-center p-6 bg-white hover:bg-cream transition-colors duration-500 min-h-[120px] lg:min-h-[140px] overflow-hidden"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute -right-2 -bottom-6 font-serif font-light text-[6rem] leading-none text-outline text-steel-200 group-hover:text-copper-300/60 transition-colors duration-500 select-none"
                          >
                            {brand.name.charAt(0)}
                          </span>
                          <span className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-copper-500 opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-500" />
                          <span className="relative font-sans font-bold text-navy-900 text-sm lg:text-base text-center tracking-wide group-hover:text-copper-600 group-hover:-translate-y-0.5 transition-all duration-500">
                            {brand.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}

            <ScrollReveal animation="fade">
              <div className="mt-16 p-6 bg-steel-100 border border-steel-200 blueprint-corners">
                <p className="text-steel-600 text-xs font-mono leading-relaxed">
                  * Distributor / authorized stockist status confirmed with manufacturers.
                  Brand logos and trademarks are properties of their respective owners.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
