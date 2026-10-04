import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SparesPartsContent from "./SparesPartsContent";

export const metadata: Metadata = {
  title: "Accessories & Spare Parts",
  description:
    "Genuine spare parts and accessories for DeWalt, Makita, Bosch, and Metabo power tools. Drills, hammers, saws, sanders, cordless tools, compressors, and more.",
};

export default function SparesPartsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <SparesPartsContent />
      </main>
      <Footer />
    </>
  );
}
