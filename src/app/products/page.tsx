import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Industrial Products & Materials Catalog",
  description:
    "Explore Exar's comprehensive industrial catalog across 6 divisions: Power & Hand Tools, Measurement & Instrumentation, Welding, Abrasive and Non-Sparking Tools, Safety & Lifting, Electrical, and Building Materials.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] bg-cream flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-copper-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
