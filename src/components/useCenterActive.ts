import { useEffect, type RefObject } from "react";

/**
 * Keeps the `[data-active="true"]` item of a horizontal scroller centred, so a
 * selected chip or tab never sits off-screen on phones. Only the scroller moves;
 * the page itself is never scrolled. The scroller must be `position: relative`.
 */
export function useCenterActive(ref: RefObject<HTMLElement | null>, activeKey: unknown) {
  useEffect(() => {
    const row = ref.current;
    const item = row?.querySelector<HTMLElement>('[data-active="true"]');
    if (!row || !item || row.scrollWidth <= row.clientWidth) return;
    const left = item.offsetLeft - (row.clientWidth - item.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [ref, activeKey]);
}
