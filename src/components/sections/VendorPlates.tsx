import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

function SealIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2.5l2.2 1.6 2.7-.2.9 2.6 2.3 1.4-.6 2.7.6 2.7-2.3 1.4-.9 2.6-2.7-.2L12 21.5l-2.2-1.6-2.7.2-.9-2.6-2.3-1.4.6-2.7-.6-2.7 2.3-1.4.9-2.6 2.7.2z" />
      <path d="M8.5 12l2.3 2.3 4.7-4.6" />
    </svg>
  );
}

/** Approved-vendor registrations rendered as engraved metal plates. */
export default function VendorPlates({ columns = 3 }: { columns?: 1 | 3 }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
      {company.vendors.map((v, i) => (
        <ScrollReveal
          key={v.name}
          delay={i + 1}
          animation="up"
          // Tablet: two plates side by side, the odd one out spans the row.
          className={i === company.vendors.length - 1 && company.vendors.length % 2 === 1 ? "sm:col-span-2 lg:col-span-1" : ""}
        >
          <div
            className="metal-plate px-6 py-7 lg:px-8 lg:py-9 h-full"
            data-tilt="5"
            style={{ "--sweep-delay": `${i * 1.4}s` } as React.CSSProperties}
          >
            <div className="plate-sheen" />
            <div className="plate-sweep" />
            <span className="rivet top-3.5 left-3.5" />
            <span className="rivet top-3.5 right-3.5" />
            <span className="rivet bottom-3.5 left-3.5" />
            <span className="rivet bottom-3.5 right-3.5" />

            <div className="relative z-[3] px-2">
              <div className="flex items-center justify-between gap-4">
                <span className="label text-copper-400 tracking-[0.18em] text-[0.65rem]">{v.label}</span>
                <span className="text-copper-400/80 shrink-0">
                  <SealIcon />
                </span>
              </div>
              <div className="font-mono engraved text-2xl lg:text-[1.7rem] tracking-[0.14em] mt-7">
                <span className="text-copper-400/70 mr-2">{v.prefix}</span>
                {v.id}
              </div>
              <div className="mt-7 h-px bg-gradient-to-r from-copper-500/50 via-white/10 to-transparent" />
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
