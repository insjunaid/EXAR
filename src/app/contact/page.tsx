import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Send us your requirement list and we'll respond with a competitive quotation. Available 24×7 via phone, email, and WhatsApp. Offices in Dammam, Jubail, and Khobar.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
