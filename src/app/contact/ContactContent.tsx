"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { company } from "@/data/company";
import { sceneImages } from "@/data/images";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const inputClass =
  "peer block w-full px-0 py-3 bg-transparent border-0 border-b border-steel-300 text-navy-900 font-sans text-sm placeholder:text-steel-400 focus:outline-none focus:border-transparent min-h-[48px] transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group block relative">
      <span className="label text-steel-500 text-[0.6rem] block mb-1 uppercase tracking-[0.18em] font-semibold group-focus-within:text-copper-600 transition-colors">
        {label}
      </span>
      {children}
      {/* Copper focus line */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-copper-600 to-copper-300 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
    </label>
  );
}

const WhatsAppPath =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

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
      <PageHero
        eyebrow="Contact"
        title="Request a Quote"
        image={sceneImages.siteTeam}
        watermark="RFQ"
        description={
          <>
            Send us your requirement list and we&apos;ll respond with a competitive quotation.
            Our team is available 24×7.
          </>
        }
      />

      <section className="bg-cream section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="up">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 lg:p-14 border border-copper-500/30 bg-white text-center shadow-lift blueprint-corners"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <span className="absolute inset-0 rounded-full bg-copper-500/20 ring-pulse" />
                      <div className="relative w-16 h-16 rounded-full bg-copper-50 border border-copper-500/30 text-copper-600 flex items-center justify-center">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="font-serif text-h2 text-navy-900 block">Thank you</span>
                    <p className="text-steel-600 text-sm mt-4 max-w-md mx-auto leading-relaxed">
                      Your enquiry has been received. Our procurement specialists will review your requirements and respond within 24 hours.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="btn-outline mt-8 text-xs">
                      Send Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="relative space-y-8 bg-white p-6 sm:p-10 lg:p-12 border border-steel-200/80 shadow-lift blueprint-corners"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-600 via-copper-400 to-copper-600" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <Field label="Name *">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                          placeholder="Your full name"
                        />
                      </Field>
                      <Field label="Company">
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputClass}
                          placeholder="Company / Organization"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <Field label="Email *">
                        <input
                          type="email"
                          inputMode="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                          placeholder="procurement@company.com"
                        />
                      </Field>
                      <Field label="Phone">
                        <input
                          type="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass}
                          placeholder="+966 ..."
                        />
                      </Field>
                    </div>

                    <Field label="Subject *">
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClass}
                        placeholder="RFQ: Flanges, Valves, Piping Specs..."
                      />
                    </Field>

                    <Field label="Requirements / Message *">
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="List the items, quantities, specifications, pressure ratings, ASTM/ASME standards, or delivery timelines..."
                        className={`${inputClass} resize-y`}
                      />
                    </Field>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button type="submit" className="btn-primary magnetic">
                        Send Enquiry
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="btn-outline magnetic text-xs flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d={WhatsAppPath} />
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
                <div className="bg-navy-950 p-6 lg:p-8 relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(181,96,43,0.22), transparent 60%)" }}
                  />
                  <h3 className="relative label text-copper-400 mb-6 tracking-wider uppercase font-mono text-xs eyebrow">Direct Contact</h3>
                  <div className="relative divide-y divide-white/[0.07]">
                    {[
                      {
                        href: `tel:${company.contact.phoneClean}`,
                        kicker: "Telephone",
                        value: company.contact.phone,
                        icon: (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                          </svg>
                        ),
                      },
                      {
                        href: `mailto:${company.contact.emailRfq}`,
                        kicker: "Email RFQ",
                        value: company.contact.emailRfq,
                        icon: (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        ),
                      },
                      {
                        href: company.contact.whatsappUrl,
                        kicker: "WhatsApp 24/7",
                        value: "Quick Response",
                        external: true,
                        icon: (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d={WhatsAppPath} />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <a
                        key={item.kicker}
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 text-cream hover:text-copper-300 transition-colors group"
                      >
                        <div className="w-11 h-11 bg-navy-800 border border-navy-700 flex items-center justify-center text-copper-400 group-hover:bg-copper-500 group-hover:text-white group-hover:border-copper-500 transition-colors duration-300">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <span className="block text-[0.7rem] text-cream/50 uppercase font-mono tracking-wider">{item.kicker}</span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </div>
                        <svg className="w-4 h-4 text-cream/30 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Locations */}
              <ScrollReveal animation="up">
                <div className="space-y-3">
                  {company.locations.map((loc, i) => (
                    <div key={loc.name} className="group spotlight spotlight-light border border-steel-200 p-5 bg-white blueprint-corners flex gap-4">
                      <span className="font-mono text-[0.65rem] text-copper-500 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-serif text-navy-900 text-lg font-semibold">{loc.name}</span>
                          <span className="label text-copper-500 text-[0.55rem] font-mono uppercase">{loc.type}</span>
                        </div>
                        <p className="text-steel-600 text-xs leading-relaxed">{loc.description}</p>
                      </div>
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
