import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-navy-950 relative overflow-hidden film-grain min-h-[80vh]">
        <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.06]" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(181,96,43,0.22), transparent 55%)" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif font-light leading-none text-[clamp(10rem,38vw,36rem)] text-outline text-white/[0.07] select-none pointer-events-none"
        >
          404
        </span>

        <div className="container-main relative z-10 text-center py-32">
          <span className="font-mono text-copper-400 text-xs tracking-[0.3em] eyebrow fade-in-up" style={{ "--d": "0.1s" } as React.CSSProperties}>
            ERROR 404
          </span>
          <h1 className="font-serif text-cream text-h1 mt-6">
            <span className="rise-line">
              <span style={{ "--d": "0.2s" } as React.CSSProperties}>
                Page <em className="italic font-light text-copper-300">Not Found</em>
              </span>
            </span>
          </h1>
          <p className="text-cream/60 text-body mt-5 max-w-md mx-auto fade-in-up" style={{ "--d": "0.45s" } as React.CSSProperties}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 fade-in-up" style={{ "--d": "0.6s" } as React.CSSProperties}>
            <Link href="/" className="btn-primary magnetic">
              Back to Home
            </Link>
            <Link href="/products" className="btn-outline-light magnetic text-xs">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
