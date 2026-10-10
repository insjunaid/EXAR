import type { ReactNode } from "react";
import { Lines } from "@/components/ScrollReveal";
import { bgImage } from "@/data/images";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Backdrop photo, graded down behind the copy. */
  image?: string;
  /** Oversized outlined word set into the bottom-right corner. */
  watermark?: string;
  /** Rendered above the eyebrow (e.g. breadcrumbs). */
  breadcrumb?: ReactNode;
  children?: ReactNode;
}

/** Shared cinematic hero for inner pages. Animates on load with CSS only. */
export default function PageHero({ eyebrow, title, description, image, watermark, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-32 pb-16 lg:pt-48 lg:pb-28">
      {image && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-responsive kenburns opacity-45" style={bgImage(image)} />
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
      <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.06]" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 90% 0%, rgba(181,96,43,0.22), transparent 55%)" }}
      />
      {watermark && (
        <span
          aria-hidden="true"
          className="absolute right-[2vw] bottom-0 translate-y-[22%] font-serif font-light leading-none whitespace-nowrap text-[clamp(6rem,17vw,17rem)] text-outline text-white/[0.09] select-none pointer-events-none"
        >
          {watermark}
        </span>
      )}

      <div className="container-main relative z-10">
        {breadcrumb && (
          <div className="fade-in-up mb-6" style={{ "--d": "0.05s" } as React.CSSProperties}>
            {breadcrumb}
          </div>
        )}
        <span className="section-number eyebrow text-copper-400 fade-in-up" style={{ "--d": "0.1s" } as React.CSSProperties}>
          {eyebrow}
        </span>
        <h1 className="text-h1 lg:text-[clamp(3rem,5vw,5.25rem)] text-cream mt-6 font-serif max-w-4xl leading-[1.04] tracking-[-0.025em]">
          <Lines text={title} delay={0.15} />
        </h1>
        {description && (
          <div className="text-cream/65 text-body lg:text-lg mt-6 max-w-2xl leading-relaxed fade-in-up" style={{ "--d": "0.5s" } as React.CSSProperties}>
            {description}
          </div>
        )}
        {children}
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 hairline-copper opacity-50" />
    </section>
  );
}
