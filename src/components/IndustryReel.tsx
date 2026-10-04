import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Pause, Play, Plus } from "lucide-react";
import type { PageId } from "./Navbar";
import { INDUSTRIES } from "../data/industries";

const FEATURED_IDS = ["supermarket", "restaurant", "warehouse", "cleaning", "security"];
const FEATURED = FEATURED_IDS.map((id) => INDUSTRIES.find((i) => i.id === id)!);
const MORE = INDUSTRIES.filter((i) => !FEATURED_IDS.includes(i.id));
const SLIDE_MS = 5500;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const pad = (n: number) => String(n).padStart(2, "0");

interface IndustryReelProps {
  onNavigate: (page: PageId) => void;
}

export function IndustryReel({ onNavigate }: IndustryReelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const playing = seen && inView && !hovered && !focused && !paused && !reducedMotion;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Background numeral drifts against the scroll for a sense of depth.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const numeral = numeralRef.current;
      if (!section || !numeral) return;
      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      numeral.style.transform = `translate3d(0, ${((0.5 - progress) * 160).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const curtain = (i: number): React.CSSProperties =>
    reducedMotion
      ? {}
      : {
          clipPath: seen ? "inset(0% 0% 0% 0% round 28px)" : "inset(100% 0% 0% 0% round 28px)",
          transition: `clip-path 1.1s ${EASE} ${i * 90}ms`,
        };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="industry-reel-heading"
      className="relative py-16 sm:py-24 bg-[#FAFAFC] w-full border-b border-gray-100 overflow-hidden"
    >
      <div className="relative w-full px-5 sm:px-8 md:px-14 lg:px-20">
        <span
          ref={numeralRef}
          aria-hidden
          className="pointer-events-none select-none absolute -top-14 right-2 lg:right-16 text-[10rem] sm:text-[14rem] lg:text-[19rem] leading-none font-black font-['Montserrat'] text-transparent [-webkit-text-stroke:2px_rgba(0,102,255,0.13)] will-change-transform"
        >
          10
        </span>

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className={`reveal-on-scroll ${seen ? "revealed" : ""} max-w-2xl`}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
              Frontline Trade Coverage
            </span>
            <h2
              id="industry-reel-heading"
              className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.05]"
            >
              Every essential trade.
              <br />
              <span className="text-gradient-blue">One local network.</span>
            </h2>
            <p className="mt-4 text-base text-gray-500 font-medium max-w-xl">
              Tap an industry to see the roles we staff and the work they cover. All 10 industries are on the Roles page.
            </p>
          </div>

          <div className={`reveal-on-scroll delay-1 ${seen ? "revealed" : ""} flex items-center gap-3`}>
            {!reducedMotion && (
              <div className="flex items-center gap-3 pr-1">
                <button
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play industry reel" : "Pause industry reel"}
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#0A1628] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                >
                  {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
                <div className="font-mono text-sm font-bold text-[#0A1628] whitespace-nowrap">
                  {pad(active + 1)}
                  <span className="text-gray-400"> / {pad(FEATURED.length)}</span>
                </div>
              </div>
            )}
            <button
              onClick={() => onNavigate("roles")}
              className="hidden lg:inline-flex whitespace-nowrap group px-6 py-3.5 rounded-full bg-[#0A1628] text-white text-sm font-bold items-center gap-2 shadow-lg shadow-[#0A1628]/15 hover:bg-[#0066FF] transition-colors"
            >
              <span>Explore all 10 industries</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Ticker: all ten industries at a glance */}
      <div
        className={`reveal-on-scroll delay-2 ${seen ? "revealed" : ""} relative mt-8 sm:mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]`}
      >
        <div className="flex w-max animate-marquee py-1">
          {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => {
            const duplicate = i >= INDUSTRIES.length;
            return (
              <button
                key={`${ind.id}-${i}`}
                onClick={() => onNavigate("roles")}
                tabIndex={duplicate ? -1 : 0}
                aria-hidden={duplicate || undefined}
                className="shrink-0 mr-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-xs hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
              >
                <ind.icon className="w-4 h-4 text-[#0066FF]" />
                <span>{ind.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The reel */}
      <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20 mt-6 sm:mt-8">
        <div
          className="flex flex-col lg:flex-row gap-1.5 lg:gap-3 h-[680px] lg:h-[560px]"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setFocused(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          {FEATURED.map((ind, i) => {
            const isActive = i === active;
            return (
              <div
                key={ind.id}
                className={`relative min-w-0 min-h-0 transition-[flex] duration-700 ${
                  isActive ? "flex-[1_1_0%] lg:flex-[8_1_0%] xl:flex-[6_1_0%]" : "flex-[0_0_56px] lg:flex-[1_1_0%]"
                }`}
                style={{ transitionTimingFunction: EASE }}
              >
                <div
                  className="group relative h-full w-full overflow-hidden rounded-[22px] lg:rounded-[28px] bg-[#0A1628]"
                  style={curtain(i)}
                >
                  <img
                    key={isActive ? `on-${seen}` : "off"}
                    src={ind.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`absolute inset-0 h-full w-full object-cover ${
                      isActive
                        ? "animate-ken-burns"
                        : "scale-[1.04] transition-transform duration-700 group-hover:scale-110"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 transition-opacity duration-700 bg-[#0A1628]/65 group-hover:bg-[#0A1628]/50 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Collapsed: vertical spine on desktop, slim row on mobile */}
                  <div
                    aria-hidden
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive ? "opacity-0" : "opacity-100 delay-200"
                    }`}
                  >
                    <div className="hidden lg:flex h-full flex-col items-center justify-between py-6">
                      <span className="font-mono text-xs font-bold text-white/60">{pad(i + 1)}</span>
                      <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-white font-bold text-base tracking-wide">
                        {ind.title}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ind.icon className="w-[18px] h-[18px] text-white" />
                      </span>
                    </div>
                    <div className="lg:hidden flex h-full items-center gap-3 px-4">
                      <span className="font-mono text-xs font-bold text-white/60">{pad(i + 1)}</span>
                      <ind.icon className="w-[18px] h-[18px] text-[#00D4FF] shrink-0" />
                      <span className="text-white font-bold text-sm truncate">{ind.title}</span>
                      <Plus className="w-4 h-4 text-white/70 ml-auto shrink-0" />
                    </div>
                  </div>

                  {/* Expanded: replays its entrance every time it opens */}
                  {isActive && (
                    <div
                      key={`${active}-${seen}`}
                      id={`industry-panel-${ind.id}`}
                      className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7 lg:p-9"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="animate-text-reveal inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-wider text-white"
                          style={{ animationFillMode: "both", animationDelay: "80ms" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                          {ind.badge}
                        </span>
                        <span className="font-mono text-xs font-bold text-white/70">
                          {pad(i + 1)} / {pad(FEATURED.length)}
                        </span>
                      </div>

                      <div className="max-w-2xl">
                        <div
                          className="animate-text-reveal flex items-center gap-2.5"
                          style={{ animationFillMode: "both", animationDelay: "150ms" }}
                        >
                          <span className="shrink-0 w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-white flex items-center justify-center shadow-md">
                            <ind.icon className="w-5 h-5 text-[#0066FF]" />
                          </span>
                          <h3 className="min-w-0 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white font-['Montserrat'] leading-[1.05]">
                            {ind.title}
                          </h3>
                        </div>
                        <p
                          className="animate-text-reveal mt-2.5 text-sm lg:text-lg text-white/80 font-medium"
                          style={{ animationFillMode: "both", animationDelay: "240ms" }}
                        >
                          {ind.roles}
                        </p>
                        <ul className="mt-3.5 lg:mt-5 flex flex-wrap gap-1.5 lg:gap-2">
                          {ind.tasks.map((task, t) => (
                            <li
                              key={task}
                              className="animate-text-reveal inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] lg:text-xs font-semibold text-white"
                              style={{ animationFillMode: "both", animationDelay: `${330 + t * 90}ms` }}
                            >
                              <Check className="w-3 h-3 text-[#00D4FF] stroke-[3]" />
                              {task}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => onNavigate("roles")}
                          className="animate-text-reveal group/cta mt-4 lg:mt-6 inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-white text-[#0A1628] text-sm font-bold shadow-lg hover:bg-[#00D4FF] transition-colors"
                          style={{ animationFillMode: "both", animationDelay: "620ms" }}
                        >
                          <span>See roles &amp; duties</span>
                          <span className="w-8 h-8 rounded-full bg-[#0A1628] text-white flex items-center justify-center transition-transform group-hover/cta:rotate-45">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setActive(i)}
                    tabIndex={isActive ? -1 : 0}
                    aria-expanded={isActive}
                    aria-label={`Show ${ind.title}`}
                    className={`absolute inset-0 z-20 rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#00D4FF] ${
                      isActive ? "pointer-events-none" : "cursor-pointer"
                    }`}
                  />

                  {isActive && !reducedMotion && (
                    <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/15">
                      <div
                        key={active}
                        className="h-full bg-gradient-to-r from-[#00D4FF] to-[#0066FF] animate-reel-progress"
                        style={{
                          animationDuration: `${SLIDE_MS}ms`,
                          animationPlayState: playing ? "running" : "paused",
                        }}
                        onAnimationEnd={() => setActive((a) => (a + 1) % FEATURED.length)}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* The other five, one click away */}
          <div className="relative min-w-0 min-h-0 flex-[0_0_60px] lg:flex-[0_0_184px] xl:flex-[0_0_232px] transition-[flex] duration-700" style={{ transitionTimingFunction: EASE }}>
            <button
              onClick={() => onNavigate("roles")}
              aria-label={`See ${MORE.length} more industries on the Roles page`}
              className="group h-full w-full overflow-hidden rounded-[22px] lg:rounded-[28px] bg-[#0A1628] text-left relative"
              style={curtain(FEATURED.length)}
            >
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#0066FF]/40 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <div className="relative hidden lg:flex h-full flex-col justify-between p-6">
                <span className="text-6xl font-black font-['Montserrat'] text-gradient-blue leading-none">+{MORE.length}</span>
                <ul className="space-y-2">
                  {MORE.map((m) => (
                    <li key={m.id} className="flex items-center gap-2 text-[13px] font-semibold text-white/75">
                      <m.icon className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                      <span className="truncate">{m.title}</span>
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  All 10 industries
                  <span className="w-8 h-8 rounded-full bg-white text-[#0A1628] flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </div>
              <div className="relative lg:hidden flex h-full items-center gap-3 px-4">
                <span className="text-lg font-black font-['Montserrat'] text-gradient-blue">+{MORE.length}</span>
                <span className="text-white/80 text-xs font-semibold truncate">
                  {MORE.map((m) => m.title).join(" · ")}
                </span>
                <ArrowRight className="w-4 h-4 text-white ml-auto shrink-0" />
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={() => onNavigate("roles")}
          className="lg:hidden mt-6 w-full py-4 rounded-full bg-[#0A1628] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0A1628]/15 active:scale-95 transition-transform"
        >
          <span>Explore all 10 industries</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

export default IndustryReel;
