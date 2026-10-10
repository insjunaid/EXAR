import { company } from "@/data/company";
import ScrollReveal from "@/components/ScrollReveal";
import Odometer from "@/components/Odometer";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-px bg-steel-200 border border-steel-200 shadow-subtle">
      {company.stats.map((stat, i) => (
        <ScrollReveal key={stat.label} delay={i + 1} animation="fade" className="h-full">
          <div className="group spotlight spotlight-light bg-cream hover:bg-white transition-colors duration-500 p-5 sm:p-6 lg:p-7 h-full">
            <span className="font-mono text-[0.65rem] text-copper-500 tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Odometer value={stat.value} className="font-serif text-h3 text-navy-900 block mt-6 sm:mt-8" />
            <div className="rule-grow mt-4" />
            <span className="label text-steel-500 mt-3 block">{stat.label}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
