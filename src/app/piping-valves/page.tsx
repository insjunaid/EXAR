import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PipingValvesContent from "./PipingValvesContent";

export const metadata: Metadata = {
  title: "Piping & Valve Specifications",
  description:
    "Complete technical reference for industrial pipes, fittings, and valves. All products manufactured to ASME, ASTM, BS, and DIN standards. Stainless steel, carbon steel, alloy, duplex, nickel alloys.",
};

export default function PipingValvesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PipingValvesContent />
      </main>
      <Footer />
    </>
  );
}

