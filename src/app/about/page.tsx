import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/data/company";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: company.aboutExtended,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}

