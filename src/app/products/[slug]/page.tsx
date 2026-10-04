import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
import { company } from "@/data/company";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.name} | ${category.division}`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

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
              <div className="flex items-center gap-2 text-cream/50 text-xs font-mono mb-4">
                <Link href="/products" className="hover:text-copper-400 transition-colors">
                  Products
                </Link>
                <span>/</span>
                <Link
                  href={`/products?division=${category.divisionSlug}`}
                  className="hover:text-copper-400 transition-colors"
                >
                  {category.division}
                </Link>
              </div>
              <h1 className="text-h1 text-cream font-serif">{category.name}</h1>
              <p className="text-cream/70 text-body mt-3 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-cream section-padding">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main content */}
              <div className="lg:col-span-8">
                {category.items && category.items.length > 0 && (
                  <ScrollReveal animation="up">
                    <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-steel-200">
                      <h2 className="text-h3 text-navy-900 font-serif">Products & Specifications Available</h2>
                      <span className="text-xs font-mono text-steel-500">
                        {category.items.length} {category.items.length === 1 ? "Specification" : "Specifications"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {category.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3.5 p-4 border border-steel-200/90 hover:border-copper-500/50 hover:shadow-subtle transition-all duration-200 bg-white group"
                        >
                          <span className="w-2 h-2 bg-copper-500 rounded-none shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="text-navy-900 text-sm font-sans font-medium group-hover:text-copper-600 transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}

                <ScrollReveal animation="fade" delay={1}>
                  <div className="mt-12 p-8 bg-navy-900 text-cream blueprint-corners flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                      <span className="label text-copper-400 text-[0.6rem] font-mono uppercase tracking-wider block mb-1">
                        Procurement & Quotation
                      </span>
                      <h3 className="font-serif text-xl">Need specific dimensions or test certificates?</h3>
                      <p className="text-cream/60 text-xs mt-1 max-w-md">
                        We supply with MTR (Mill Test Reports), EN 10204 3.1 certification, and compliance documentation.
                      </p>
                    </div>
                    <Link href="/contact" className="btn-primary shrink-0 whitespace-nowrap">
                      Request a Quote
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-4">
                {/* Category info */}
                <ScrollReveal animation="fade">
                  <div className="border border-steel-200 p-6 bg-white blueprint-corners">
                    <h3 className="label text-copper-500 mb-4 font-mono text-xs uppercase tracking-wider">
                      Technical Overview
                    </h3>
                    <div className="space-y-3.5 divide-y divide-steel-100">
                      <div className="pt-2 first:pt-0">
                        <span className="text-steel-500 text-xs font-mono uppercase">Division</span>
                        <p className="text-navy-900 text-sm font-sans font-semibold mt-0.5">{category.division}</p>
                      </div>
                      <div className="pt-3">
                        <span className="text-steel-500 text-xs font-mono uppercase">Catalog Reference</span>
                        <p className="font-mono text-navy-900 text-sm font-semibold mt-0.5">Page {category.catalogPage}</p>
                      </div>
                      {category.items && (
                        <div className="pt-3">
                          <span className="text-steel-500 text-xs font-mono uppercase">Scope of Supply</span>
                          <p className="font-mono text-navy-900 text-sm font-semibold mt-0.5">{category.items.length} Product Lines</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>

                {/* Brands */}
                {category.brands && category.brands.length > 0 && (
                  <ScrollReveal animation="up">
                    <div className="border border-steel-200 p-6 bg-white blueprint-corners">
                      <h3 className="label text-copper-500 mb-3 font-mono text-xs uppercase tracking-wider">
                        Associated Brands
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.brands.map((b) => (
                          <span key={b} className="px-3 py-1 bg-steel-100 text-navy-900 text-xs font-mono font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {/* Fast Contact */}
                <ScrollReveal animation="up">
                  <div className="p-6 bg-steel-100 border border-steel-200 blueprint-corners">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-semibold mb-2">
                      Need Immediate Assistance?
                    </h4>
                    <p className="text-steel-600 text-xs leading-relaxed mb-4">
                      Our technical sales team in Dammam is available 24/7 to discuss project BOMs.
                    </p>
                    <a
                      href={company.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline w-full justify-center text-xs flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Quick WhatsApp Chat
                    </a>
                  </div>
                </ScrollReveal>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
