"use client";

import { useState } from "react";
import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: In production, connect to SMTP or Resend
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `Hello Exar International,%0A%0AName: ${encodeURIComponent(formData.name)}%0ACompany: ${encodeURIComponent(formData.company)}%0AEmail: ${encodeURIComponent(formData.email)}%0A%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/966543796070?text=${text}`, "_blank");
  };

  return (
    <>
      <section className="bg-navy-900 pt-28 pb-12 lg:pt-36 lg:pb-16 relative overflow-hidden">
        {/* Subtle grid pattern background */}
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
            <span className="section-number text-copper-400">Contact</span>
            <h1 className="text-h1 text-cream mt-4 font-serif">Request a Quote</h1>
            <p className="text-cream/60 text-body mt-3 max-w-xl">
              Send us your requirement list and we&apos;ll respond with a competitive quotation.
              Our team is available 24×7.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-cream section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="up">
                {isSubmitted ? (
                  <div className="p-8 border border-copper-500/30 bg-white text-center shadow-subtle">
                    <div className="w-12 h-12 rounded-full bg-copper-50 text-copper-600 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-serif text-h3 text-navy-900 block">Thank you</span>
                    <p className="text-steel-600 text-sm mt-3">
                      Your enquiry has been received. Our procurement specialists will review your requirements and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-outline mt-6 text-xs"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 border border-steel-200/80 shadow-subtle blueprint-corners">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                          placeholder="Company / Organization"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">Email *</label>
                        <input
                          type="email"
                          inputMode="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                          placeholder="procurement@company.com"
                        />
                      </div>
                      <div>
                        <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">Phone</label>
                        <input
                          type="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                          placeholder="+966 ..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">Subject *</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 min-h-[48px] transition-colors"
                        placeholder="RFQ: Flanges, Valves, Piping Specs..."
                      />
                    </div>

                    <div>
                      <label className="label text-steel-600 text-[0.6rem] block mb-1.5 uppercase tracking-wider font-semibold">
                        Requirements / Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="List the items, quantities, specifications, pressure ratings, ASTM/ASME standards, or delivery timelines..."
                        className="w-full px-4 py-3 bg-white border border-steel-200 text-navy-900 font-sans text-sm focus:outline-none focus:border-copper-500 resize-y transition-colors"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button type="submit" className="btn-primary">
                        Send Enquiry
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="btn-outline text-xs flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Send via WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5 space-y-4">
              <ScrollReveal animation="fade">
                <div className="bg-navy-900 p-6 lg:p-8 blueprint-corners">
                  <h3 className="label text-copper-400 mb-4 tracking-wider uppercase font-mono text-xs">Direct Contact</h3>
                  <div className="space-y-4">
                    <a
                      href={`tel:${company.contact.phoneClean}`}
                      className="flex items-center gap-3 text-cream hover:text-copper-400 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded bg-navy-800 border border-navy-700 flex items-center justify-center text-copper-400 group-hover:border-copper-500/50 transition-colors">
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[0.65rem] text-cream/50 uppercase font-mono">Telephone</span>
                        <span className="text-sm font-medium">{company.contact.phone}</span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${company.contact.emailRfq}`}
                      className="flex items-center gap-3 text-cream hover:text-copper-400 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded bg-navy-800 border border-navy-700 flex items-center justify-center text-copper-400 group-hover:border-copper-500/50 transition-colors">
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[0.65rem] text-cream/50 uppercase font-mono">Email RFQ</span>
                        <span className="text-sm font-medium">{company.contact.emailRfq}</span>
                      </div>
                    </a>

                    <a
                      href={company.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-cream hover:text-copper-400 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded bg-navy-800 border border-navy-700 flex items-center justify-center text-copper-400 group-hover:border-copper-500/50 transition-colors">
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-[0.65rem] text-cream/50 uppercase font-mono">WhatsApp 24/7</span>
                        <span className="text-sm font-medium">Quick Response</span>
                      </div>
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Locations */}
              <ScrollReveal animation="up">
                <div className="space-y-3">
                  {company.locations.map((loc) => (
                    <div key={loc.name} className="border border-steel-200 p-5 bg-white blueprint-corners">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-serif text-navy-900 text-lg font-semibold">{loc.name}</span>
                        <span className="label text-copper-500 text-[0.55rem] font-mono uppercase">{loc.type}</span>
                      </div>
                      <p className="text-steel-600 text-xs leading-relaxed">{loc.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Vendor IDs */}
              <ScrollReveal animation="up">
                <div className="p-5 bg-steel-100 border border-steel-200">
                  <h3 className="label text-steel-500 text-[0.6rem] mb-3 uppercase tracking-wider font-mono">Approved Vendor Registrations</h3>
                  {company.vendors.map((v) => (
                    <div key={v.name} className="flex items-baseline gap-2 mb-1.5 last:mb-0">
                      <span className="text-steel-700 text-xs font-medium">{v.name}</span>
                      <span className="flex-1 border-b border-dotted border-steel-300" />
                      <span className="font-mono text-navy-900 text-xs font-semibold">{v.prefix} {v.id}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
