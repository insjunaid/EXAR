import type { CSSProperties } from "react";

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

/**
 * Inline style for a `.bg-responsive` element: phones load an 800px rendition,
 * tablets and up load the full-size file. Browsers only fetch the one applied.
 */
export function bgImage(src: string): CSSProperties {
  const small = src.includes("images.unsplash.com") ? src.replace(/w=\d+/, "w=800") : src;
  return { "--bg-sm": `url(${small})`, "--bg-lg": `url(${src})` } as CSSProperties;
}

/** Cover imagery per product division. */
export const divisionImages: Record<string, string> = {
  "tools-machinery": unsplash("1530124566582-a618bc2615dc", 1400),
  "measurement-instrumentation": unsplash("1581092335397-9583eb92d232", 1000),
  "welding-fabrication": unsplash("1504328345606-18bbc8c9d7d1", 1000),
  "safety-lifting": unsplash("1504307651254-35680f356dfd", 1000),
  "electrical-lighting": unsplash("1544724569-5f546fd6f2b5", 1000),
  "building-materials": unsplash("1503387762-592deb58ef4e", 1000),
};

/** Backdrops for page heroes and feature sections. */
export const sceneImages = {
  refinery: "/images/hero-refinery.jpg",
  powerTools: unsplash("1513467535987-fd81bc7d62f8", 1920),
  precision: unsplash("1581092335397-9583eb92d232", 1920),
  welding: unsplash("1504328345606-18bbc8c9d7d1", 1920),
  construction: unsplash("1504307651254-35680f356dfd", 1920),
  sparks: unsplash("1504917595217-d4dc5ebe6122", 1920),
  warehouse: unsplash("1553413077-190dd305871c", 1920),
  warehouseRacks: unsplash("1587293852726-70cdb56c2866", 1920),
  siteTeam: unsplash("1541888946425-d81bb19240f5", 1920),
  pipework: unsplash("1513828583688-c52646db42da", 1920),
  hammer: unsplash("1586864387967-d02ef85d93e8", 1920),
};
