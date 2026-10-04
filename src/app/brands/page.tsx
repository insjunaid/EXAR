import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brands } from "@/data/brands";
import { divisions } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";
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
              <span className="section-number text-copper-400">Partners</span>
              <h1 className="text-h1 text-cream mt-4 font-serif">Our Brands</h1>
              <p className="text-cream/60 text-body mt-3 max-w-xl">
                We partner with {brands.length}+ industry-leading manufacturers to deliver
                products that meet the highest quality and performance standards.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-cream section-padding">
          <div className="container-main">
            {divisions.map((div, divIndex) => {
              const divBrands = brandsByDivision[div.slug];
              if (!divBrands || divBrands.length === 0) return null;
              return (
                <ScrollReveal
                  key={div.slug}
                  animation="up"
                  delay={(divIndex % 3) as 0 | 1 | 2}
                  className="mb-14 last:mb-0"
                >
                  <div className="flex items-baseline gap-3 mb-6 pb-2 border-b border-steel-200">
                    <span className="font-mono text-copper-500 text-xs font-semibold">
                      {String(divisions.indexOf(div) + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-navy-900 text-h3">{div.name}</h2>
                    <span className="text-xs font-mono text-steel-400 ml-auto">
                      {divBrands.length} {divBrands.length === 1 ? "Brand" : "Brands"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {divBrands.map((brand) => (
                      <div
                        key={brand.slug}
                        className="group flex flex-col items-center justify-center p-5 border border-steel-200 bg-white hover:border-copper-500/50 hover:shadow-subtle transition-all duration-300 min-h-[90px] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-copper-500 transition-colors" />
                        <span className="font-sans font-bold text-navy-900 text-sm text-center group-hover:text-copper-600 transition-colors">
                          {brand.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}

            <ScrollReveal animation="fade">
              <div className="mt-12 p-6 bg-steel-100 border border-steel-200 blueprint-corners">
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
