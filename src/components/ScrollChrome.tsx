import React, { useEffect, useRef, useState } from "react";

type SectionInfo = { el: HTMLElement; label: string };

const labelFor = (el: HTMLElement, i: number) => {
  const own = el.getAttribute("aria-label");
  if (own) return own;
  const heading = el.querySelector("h1, h2");
  const text = heading?.textContent?.replace(/\s+/g, " ").trim();
  if (!text) return `Section ${i + 1}`;
  return text.length > 38 ? `${text.slice(0, 36)}…` : text;
};

/**
 * Page-level scroll effects: marks the section on screen with `.in-view`
 * (drives the heading/paragraph entrances in index.css), draws a progress line
 * under the navbar, and offers section dots for jumping between sections.
 * Mount with `key={page}` so it rescans when the page changes.
 */
export function ScrollChrome() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("main > div > section")).filter((el) => el.offsetHeight > 0);
      setSections(els.map((el, i) => ({ el, label: labelFor(el, i) })));

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const visible = e.intersectionRect.height;
            const shown = e.isIntersecting && (e.intersectionRatio >= 0.3 || visible >= window.innerHeight * 0.45);
            if (shown) e.target.classList.add("in-view");
            else if (!e.isIntersecting) e.target.classList.remove("in-view");
          }
        },
        { threshold: [0, 0.15, 0.3, 0.5, 0.75] }
      );
      els.forEach((el) => io!.observe(el));
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;

      const mid = window.innerHeight * 0.5;
      const els = Array.from(document.querySelectorAll<HTMLElement>("main > div > section")).filter((el) => el.offsetHeight > 0);
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) setActive(i);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="fixed top-20 inset-x-0 z-40 h-[2px] pointer-events-none">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-[#FF8A00]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {sections.length > 1 && (
        <nav aria-label="Page sections" className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2.5">
          {sections.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => s.el.scrollIntoView({ behavior: "smooth", block: "start" })}
                aria-label={`Go to: ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center justify-end h-5"
              >
                <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-lg bg-[#0A1628] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100">
                  {s.label}
                </span>
                <span
                  className={`block rounded-full ring-1 ring-black/15 shadow-sm transition-all duration-300 ${
                    isActive ? "w-2.5 h-5 bg-[#0066FF]" : "w-2.5 h-2.5 bg-white/80 group-hover:bg-[#00D4FF]"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}

export default ScrollChrome;
