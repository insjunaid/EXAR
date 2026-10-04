import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-navy-900 relative overflow-hidden film-grain">
        <div className="container-main relative z-10 text-center py-24">
          <span className="font-mono text-copper-400 text-xs tracking-widest">
            ERROR 404
          </span>
          <h1 className="font-serif text-cream text-h1 mt-4">
            Page Not Found
          </h1>
          <p className="text-cream/60 text-body mt-4 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/products" className="btn-outline-light text-xs">
              Browse Products
            </Link>
          </div>

          {/* Decorative blueprint grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid404"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid404)" />
            </svg>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
