"use client";

import { useState } from "react";
import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * Stylised blueprint map of the Eastern Province coast.
 * Projection: x = (lon − 49.3) × 400, y = (27.25 − lat) × 400 in a 600×560 box.
 */

type Pt = [number, number];

const coast: Pt[] = [
  [60, 0], [96, 40], [130, 78], [152, 100], [178, 120], [208, 148], [238, 176],
  [262, 202], [280, 228], [298, 240], [320, 230], [334, 228], [326, 242], [304, 260],
  [292, 280], [304, 300], [320, 318], [342, 346], [364, 376], [374, 406], [368, 442],
  [354, 482], [340, 522], [332, 560],
];

/** Catmull-Rom → cubic Bézier for a smooth coastline. */
function smoothPath(pts: Pt[]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const coastPath = smoothPath(coast);
const landPath = `${coastPath} L0,560 L0,0 Z`;

const pins: Record<string, { at: Pt; label: Pt }> = {
  Jubail: { at: [138, 104], label: [176, 96] },
  Dammam: { at: [300, 320], label: [338, 312] },
  Khobar: { at: [348, 384], label: [386, 376] },
};

const gridLat = [
  { y: 100, label: "27°N" },
  { y: 300, label: "26.5°N" },
  { y: 500, label: "26°N" },
];
const gridLon = [
  { x: 80, label: "49.5°E" },
  { x: 280, label: "50°E" },
  { x: 480, label: "50.5°E" },
];

interface MapFrame {
  id: string;
  /** viewBox as [x, y, width, height] */
  vb: [number, number, number, number];
  /** Multiplier for label sizes so text stays legible when the map renders small. */
  text: number;
  className: string;
}

/** Phones get a tighter crop with larger labels; tablets a shorter strip; laptops the full chart. */
const mapFrames: MapFrame[] = [
  { id: "sm", vb: [92, 52, 400, 392], text: 1.3, className: "block sm:hidden" },
  { id: "md", vb: [0, 36, 600, 432], text: 1, className: "hidden sm:block lg:hidden" },
  { id: "lg", vb: [0, 0, 600, 560], text: 1, className: "hidden lg:block" },
];

function OfficeMap({ active, frame }: { active: number; frame: MapFrame }) {
  const activeName = company.locations[active]?.name;
  const [vx, vy, vw, vh] = frame.vb;
  const t = frame.text;
  const dots = `land-dots-${frame.id}`;
  const glow = `pin-glow-${frame.id}`;
  return (
    <svg viewBox={frame.vb.join(" ")} className="w-full h-full" role="img" aria-label="Map of Exar offices in Jubail, Dammam and Khobar">
      <defs>
        <pattern id={dots} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill="rgba(244,241,236,0.16)" />
        </pattern>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor="rgba(212,133,74,0.55)" />
          <stop offset="100%" stopColor="rgba(212,133,74,0)" />
        </radialGradient>
      </defs>

      {/* Graticule */}
      {gridLat.map((g) => (
        <g key={g.label}>
          <line x1="0" x2="600" y1={g.y} y2={g.y} stroke="rgba(244,241,236,0.07)" strokeDasharray="2 6" />
          {/* Skip labels that would collide with the compass in tighter crops */}
          {g.y - 6 > vy + 52 + 30 * t && <text x={vx + vw - 8} y={g.y - 6} textAnchor="end" className="font-mono" fontSize={9 * t} fill="rgba(244,241,236,0.3)" letterSpacing="1">
            {g.label}
          </text>}
        </g>
      ))}
      {gridLon.map((g) => (
        <g key={g.label}>
          <line y1="0" y2="560" x1={g.x} x2={g.x} stroke="rgba(244,241,236,0.07)" strokeDasharray="2 6" />
          {/* Only label meridians whose text fits inside this crop */}
          {g.x > vx && g.x + 50 * t < vx + vw && <text x={g.x + 6} y={vy + vh - 8} className="font-mono" fontSize={9 * t} fill="rgba(244,241,236,0.3)" letterSpacing="1">
            {g.label}
          </text>}
        </g>
      ))}

      {/* Land mass */}
      <path d={landPath} fill={`url(#${dots})`} />
      <path d={landPath} fill="rgba(244,241,236,0.025)" />

      {/* Bathymetry echoes */}
      {[
        { t: "translate(16 4)", o: 0.14 },
        { t: "translate(34 9)", o: 0.08 },
        { t: "translate(56 14)", o: 0.045 },
      ].map((b) => (
        <path key={b.t} d={coastPath} transform={b.t} fill="none" stroke={`rgba(212,133,74,${b.o})`} strokeWidth="1" />
      ))}

      {/* Coastline */}
      <path
        d={coastPath}
        fill="none"
        stroke="rgba(212,133,74,0.85)"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="draw-path"
        style={{ "--len": 900 } as React.CSSProperties}
      />

      {/* Sea label */}
      <text
        x={vx + vw * 0.7}
        y="210"
        textAnchor="middle"
        fontSize={13 * t}
        fontStyle="italic"
        letterSpacing="6"
        fill="rgba(244,241,236,0.22)"
        className="font-serif"
      >
        ARABIAN GULF
      </text>

      {/* Compass */}
      <g transform={`translate(${vx + vw - 52} ${vy + 52}) scale(${t})`} opacity="0.5">
        <circle r="18" fill="none" stroke="rgba(244,241,236,0.25)" />
        <path d="M0,-14 L4,0 L0,-3 L-4,0 Z" fill="#D4854A" />
        <path d="M0,14 L4,0 L0,3 L-4,0 Z" fill="rgba(244,241,236,0.35)" />
        <text y="-24" textAnchor="middle" fontSize="9" fill="rgba(244,241,236,0.6)" className="font-mono">
          N
        </text>
      </g>

      {/* Supply routes */}
      <path
        d="M138,104 C170,190 236,262 300,320"
        fill="none"
        stroke="rgba(212,133,74,0.55)"
        strokeWidth="1.2"
        strokeDasharray="4 5"
      />
      <path
        d="M300,320 C318,340 332,360 348,384"
        fill="none"
        stroke="rgba(212,133,74,0.55)"
        strokeWidth="1.2"
        strokeDasharray="4 5"
      />

      {/* Pins */}
      {company.locations.map((loc) => {
        const pin = pins[loc.name];
        if (!pin) return null;
        const isActive = loc.name === activeName;
        const isHq = loc.type === "Head Office";
        const [x, y] = pin.at;
        const [lx, ly] = pin.label;
        return (
          <g key={loc.name}>
            <circle cx={x} cy={y} r={isActive ? 46 : 0} fill={`url(#${glow})`} style={{ transition: "r 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
            <circle cx={x} cy={y} r="7" fill="none" stroke="#D4854A" strokeWidth="1" className="pin-pulse" />
            <circle
              cx={x}
              cy={y}
              r={isActive ? 7 : isHq ? 5.5 : 4}
              fill={isActive || isHq ? "#D4854A" : "#0A1A2F"}
              stroke="#D4854A"
              strokeWidth="1.5"
              style={{ transition: "r 0.4s ease, fill 0.4s ease" }}
            />
            <line x1={x + 9} y1={y} x2={lx - 6} y2={ly + 2} stroke="rgba(244,241,236,0.25)" strokeWidth="0.8" />
            <text
              x={lx}
              y={ly + 6}
              fontSize={19 * t}
              className="font-serif"
              fill={isActive ? "#F4F1EC" : "rgba(244,241,236,0.7)"}
              style={{ transition: "fill 0.4s ease" }}
            >
              {loc.name}
            </text>
            <text x={lx} y={ly + 8 + 14 * t} fontSize={8.5 * t} letterSpacing="2" className="font-mono" fill="#D4854A">
              {loc.type.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function OfficesShowcase({ eyebrow, bordered = false }: { eyebrow?: string; bordered?: boolean }) {
  const hqIndex = Math.max(0, company.locations.findIndex((l) => l.type === "Head Office"));
  const [active, setActive] = useState(hqIndex);

  return (
    <section className={`bg-cream section-padding ${bordered ? "border-t border-steel-200" : ""}`}>
      <div className="container-main">
        <div className="mb-12 lg:mb-16">
          {eyebrow && (
            <ScrollReveal>
              <span className="section-number eyebrow">{eyebrow}</span>
            </ScrollReveal>
          )}
          <ScrollReveal animation="lines">
            <h2 className="text-h1 text-navy-900 mt-4 font-serif">
              <span className="rise-line">
                <span>
                  Our <em className="italic font-light text-copper-500">Offices</em>
                </span>
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Map */}
          <ScrollReveal animation="none" className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-28">
            <div className="relative bg-navy-950 border border-navy-800 overflow-hidden shadow-lift">
              <div aria-hidden="true" className="absolute inset-0 blueprint-grid opacity-[0.05]" />
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-copper-500/70 z-10" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-copper-500/70 z-10" />
              {mapFrames.map((frame) => (
                <div key={frame.id} className={frame.className} style={{ aspectRatio: `${frame.vb[2]} / ${frame.vb[3]}` }}>
                  <OfficeMap active={active} frame={frame} />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Office list */}
          <div className="lg:col-span-6 xl:col-span-6 border-b border-steel-200">
            {company.locations.map((loc, i) => (
              <ScrollReveal key={loc.name} delay={i + 1}>
                <div
                  className="group relative border-t border-steel-200 py-8 lg:py-10 cursor-default"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -top-px h-px bg-copper-500 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: active === i ? "100%" : "0%" }}
                  />
                  <div className="flex items-start gap-5 lg:gap-8">
                    <span className={`font-mono text-xs pt-3 transition-colors ${active === i ? "text-copper-500" : "text-steel-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3
                          className={`font-serif text-h2 transition-colors duration-500 ${
                            active === i ? "text-navy-900" : "text-navy-900/55"
                          }`}
                        >
                          {loc.name}
                        </h3>
                        <span className="label text-copper-500 text-[0.6rem]">{loc.type}</span>
                      </div>
                      <p className="text-steel-600 text-sm leading-relaxed mt-3 max-w-md">{loc.description}</p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        <a
                          href={`tel:${company.contact.phoneClean}`}
                          className="inline-flex items-center gap-2 h-11 px-4 border border-steel-300 text-navy-900 text-xs font-semibold tracking-wide hover:border-copper-500 hover:text-copper-600 hover:bg-white transition-colors"
                        >
                          <PhoneIcon />
                          Call
                        </a>
                        <a
                          href={company.contact.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 h-11 px-4 border border-steel-300 text-navy-900 text-xs font-semibold tracking-wide hover:border-[#25D366] hover:text-[#128C7E] hover:bg-white transition-colors"
                        >
                          <WhatsAppIcon />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
