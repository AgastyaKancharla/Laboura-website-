import React, { useEffect, useRef, useState } from "react";
import { PageId } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCheck,
  Clock,
  HeartHandshake,
  MapPin,
  MessagesSquare,
  Phone,
  RefreshCw,
  ShieldCheck,
  Store,
  Users,
  Wrench,
  X,
  IndianRupee,
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Saffron, white and green: a quiet nod to where Laboura was born. */
function Tricolour({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex h-1 overflow-hidden rounded-full ${className}`}>
      <span className="flex-1 bg-[#FF9933]" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-[#138808]" />
    </span>
  );
}

/* ── Chapter 1: the conversation he kept hearing ─────────────── */

type Message = { from: string; text: string; time: string; mine?: boolean };

const THREAD: Message[] = [
  { from: "Restaurant owner", text: "Two of my kitchen staff didn't turn up. Lunch rush starts in an hour.", time: "10:42 AM" },
  { from: "Supermarket manager", text: "Same here. The stock truck came at 7 and there was nobody to unload it.", time: "10:44 AM" },
  { from: "Warehouse supervisor", text: "The agency sent someone yesterday. He had never worked a warehouse floor.", time: "10:47 AM" },
  { from: "Salon owner", text: "Festival season starts next week and I still need two more hands.", time: "10:51 AM" },
  { from: "Restaurant owner", text: "Good workers are out there. We just can't find them when we need them.", time: "10:53 AM" },
  { from: "Our founder", text: "I'm facing the exact same thing in my own business. There has to be a better way.", time: "10:58 AM", mine: true },
];

function ConversationThread() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced] = useState(prefersReducedMotion);
  const [started, setStarted] = useState(false);
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? THREAD.length + 1 : 0));
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // One message at a time, each preceded by a short "typing" beat.
  useEffect(() => {
    if (!started || reduced || shown > THREAD.length) return;
    setTyping(shown < THREAD.length);
    const t = window.setTimeout(() => {
      setTyping(false);
      setShown((s) => s + 1);
    }, shown === 0 ? 450 : shown === THREAD.length ? 900 : 1150);
    return () => window.clearTimeout(t);
  }, [started, shown, reduced]);

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto lg:mx-0">
      <div className="absolute -inset-6 bg-gradient-to-br from-[#0066FF]/15 via-transparent to-[#FF9933]/15 blur-3xl rounded-[48px]" aria-hidden />
      <div className="relative rounded-[32px] bg-white border border-gray-200 shadow-[0_30px_80px_-30px_rgba(10,22,40,0.35)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-[#0A1628] text-white">
          <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <MessagesSquare className="w-5 h-5 text-[#00D4FF]" />
          </span>
          <div className="min-w-0">
            <div className="font-bold text-sm">Local business owners</div>
            <div className="text-[11px] text-slate-400 truncate">
              {typing ? "typing…" : "The same conversation, every week"}
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-3 bg-[#F4F7FB]">
          {THREAD.map((m, i) => {
            const visible = i < shown;
            const isNext = i === shown && typing;
            return (
              <div key={i} className={`relative flex ${m.mine ? "justify-end" : "justify-start"}`}>
                {isNext && (
                  <div
                    className={`absolute top-0 ${m.mine ? "right-0" : "left-0"} px-4 py-3 rounded-2xl bg-white border border-gray-200 flex gap-1`}
                    aria-hidden
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${d * 140}ms` }}
                      />
                    ))}
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 shadow-sm ${visible ? "animate-bubble-in" : "opacity-0"} ${
                    m.mine
                      ? "rounded-2xl rounded-br-md bg-[#0066FF] text-white"
                      : "rounded-2xl rounded-bl-md bg-white text-gray-800 border border-gray-100"
                  }`}
                >
                  {!m.mine && (
                    <div className="text-[11px] font-bold text-[#0066FF] mb-0.5">{m.from}</div>
                  )}
                  <p className="text-[13.5px] leading-snug">{m.text}</p>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${m.mine ? "text-white/70" : "text-gray-400"}`}>
                    {m.time}
                    {m.mine && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}

          <div className={`flex justify-center pt-2 ${shown > THREAD.length ? "animate-bubble-in" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1628] text-white text-xs font-bold shadow-md">
              <Tricolour className="w-6" />
              That's how Laboura was born.
            </span>
          </div>
        </div>
      </div>
      <p className="relative mt-4 text-center lg:text-left text-[11px] text-gray-400">
        Illustrative conversation, based on what business owners shared with our founder.
      </p>
    </div>
  );
}

/* ── Chapter 2: heard it, lived it, built it ─────────────────── */

const STEPS = [
  {
    num: "01",
    title: "He heard it.",
    icon: MessagesSquare,
    body: "It started as other people's problem. Restaurant owners, shopkeepers, warehouse supervisors: every conversation came back to staff. Who didn't show up. Who left without notice. Who the agency sent that couldn't do the job.",
  },
  {
    num: "02",
    title: "He lived it.",
    icon: Store,
    body: "Then it became his problem. In his own business he faced the same empty shifts, the same late-night calls to contacts, the same middlemen taking a cut for help that might never arrive. That's when he saw it clearly: this wasn't bad luck. It was a broken system.",
  },
  {
    num: "03",
    title: "He built Laboura.",
    icon: Wrench,
    body: "The answer was hiding in plain sight. The workers businesses needed often lived just a few streets away; they simply had no reliable way to find each other. Laboura was built to be that connection: verified local workers, matched to nearby businesses, fast.",
  },
];

function StoryTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // The line fills as the reader moves through the story.
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height));
      fill.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative">
      <div className="absolute left-[23px] sm:left-[27px] top-2 bottom-2 w-[2px] bg-gray-200 rounded-full" aria-hidden>
        <div ref={fillRef} className="h-full w-full origin-top bg-gradient-to-b from-[#FF9933] via-[#0066FF] to-[#138808] rounded-full" style={{ transform: "scaleY(0)" }} />
      </div>

      <ol className="space-y-12 sm:space-y-16">
        {STEPS.map((step, i) => (
          <li key={step.num}>
            <Reveal delay={`delay-${i}`} className="relative pl-16 sm:pl-20">
              <span className="absolute left-0 top-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-gray-200 shadow-md flex items-center justify-center">
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF]" />
              </span>
              <span className="font-mono text-xs font-bold text-[#0066FF] tracking-widest">{step.num}</span>
              <h3 className="mt-1 text-2xl sm:text-4xl font-black text-[#0A1628] font-['Montserrat'] tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

const BELIEFS = [
  {
    num: "01",
    title: "Labour deserves respect.",
    body: "The people who stock shelves, cook meals, clean floors and guard doors keep India's businesses running. They deserve steady, dignified work and fair treatment.",
    icon: HeartHandshake,
    tint: "from-[#FF9933]/15",
  },
  {
    num: "02",
    title: "Local is stronger.",
    body: "When staff live close to work, they arrive on time and stay longer. Businesses get neighbours they can trust, and earnings stay in the community.",
    icon: MapPin,
    tint: "from-[#0066FF]/15",
  },
  {
    num: "03",
    title: "Trust must be verified.",
    body: "Every worker is ID-verified and background-checked before a placement, so a business owner never has to simply hope for the best.",
    icon: ShieldCheck,
    tint: "from-[#138808]/15",
  },
];

const PROMISES = [
  { icon: ShieldCheck, title: "Verified", body: "ID and background checks before every placement." },
  { icon: MapPin, title: "Local", body: "Workers matched from your own neighbourhood." },
  { icon: RefreshCw, title: "Replaced free", body: "For businesses: if a worker leaves within 30 days of the day we fill the position, we replace them at no cost." },
  { icon: IndianRupee, title: "Job or refund", body: "For job seekers: get placed in a job, or get your money back in full." },
];

const BUSINESS_PAIN = [
  "Shutters open late, or not at all",
  "Owners leave the counter to cover the floor",
  "Rush hours turn customers away",
  "Middlemen charge for help that may not arrive",
];

const WORKER_PAIN = [
  "The next job depends on word of mouth",
  "Long commutes for short shifts",
  "Middlemen take a cut of hard-earned pay",
  "Good work goes unseen by the next employer",
];

export function AboutPage({ onNavigate, onOpenCallModal }: AboutPageProps) {
  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans']">

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0A1628] text-white min-h-[92svh] flex items-center">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-[#FF9933]/20 blur-[120px] animate-aura" />
          <div className="absolute -bottom-48 -right-24 w-[40rem] h-[40rem] rounded-full bg-[#0066FF]/30 blur-[130px] animate-aura-pulse" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="relative w-full px-5 sm:px-8 md:px-14 lg:px-20 pt-32 pb-20">
          <div className="max-w-5xl">
            <div
              className="animate-text-reveal inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-[0.2em]"
              style={{ animationFillMode: "both", animationDelay: "100ms" }}
            >
              <span className="text-[#00D4FF]">Our story</span>
              <Tricolour className="w-8" />
              <span className="text-white/90">Born in India</span>
            </div>

            <h1
              className="animate-text-reveal mt-7 text-[2.6rem] leading-[1.03] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white font-['Montserrat']"
              style={{ animationFillMode: "both", animationDelay: "250ms" }}
            >
              Born from a problem{" "}
              <span className="text-gradient-warm">every business owner</span> knows.
            </h1>

            <p
              className="animate-text-reveal mt-7 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl"
              style={{ animationFillMode: "both", animationDelay: "450ms" }}
            >
              Staff who don't turn up. Agencies that send the wrong person. Busy days with too few hands.
              Our founder heard it from business owners again and again, then faced it in his own business.
              Laboura is what he built so no one has to keep living it.
            </p>

            <a
              href="#about-story"
              className="animate-text-reveal mt-10 inline-flex items-center gap-3 text-sm font-bold text-white/80 hover:text-white transition-colors group"
              style={{ animationFillMode: "both", animationDelay: "650ms" }}
            >
              <span className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center group-hover:border-[#00D4FF] transition-colors">
                <ArrowDown className="w-4 h-4 animate-float-slow" />
              </span>
              Read the story
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 1: WHAT HE KEPT HEARING ═══ */}
      <section id="about-story" className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Chapter one · What he kept hearing</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.08]">
              Every business owner had the same story.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Over chai, at trade meetings, in phone calls late at night. Different businesses, different
              neighbourhoods, the same problem: when you need people the most, you can't find them.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {[
                { icon: Users, label: "Staff no-shows" },
                { icon: Clock, label: "Last-minute gaps" },
                { icon: X, label: "Wrong-fit hires" },
              ].map((p) => (
                <div key={p.label} className="rounded-2xl bg-[#FAFAFC] border border-gray-200 p-3 text-center">
                  <p.icon className="w-5 h-5 mx-auto text-rose-500" />
                  <div className="mt-1.5 text-[11px] sm:text-xs font-bold text-gray-700">{p.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <ConversationThread />
        </div>
      </section>

      {/* ═══ CHAPTER 2: HEARD IT, LIVED IT, BUILT IT ═══ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 self-start">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Chapter two · How Laboura was born</span>
              <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.02]">
                Heard it.
                <br />
                Lived it.
                <br />
                <span className="text-gradient-blue">Built it.</span>
              </h2>
              <p className="mt-5 text-base text-gray-500 max-w-sm leading-relaxed">
                Laboura wasn't dreamt up in a boardroom. It came from a business owner who knew the problem
                from both sides of the counter.
              </p>
            </Reveal>
          </div>

          <StoryTimeline />
        </div>
      </section>

      {/* ═══ CHAPTER 3: TWO SIDES OF THE SAME STREET ═══ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Chapter three · The real gap</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.08]">
            One gap. Two sides of the same street.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            The business owner and the worker are often neighbours. Both lose when they can't find each other.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-stretch">
          <Reveal delay="delay-0">
            <div className="h-full rounded-[28px] bg-[#FAFAFC] border border-gray-200 p-7 sm:p-9 hover-card-rise">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                <Store className="w-3.5 h-3.5" /> The business owner
              </span>
              <h3 className="mt-5 text-2xl sm:text-3xl font-black text-[#0A1628] font-['Montserrat'] leading-tight">
                For them, it's an empty shift.
              </h3>
              <ul className="mt-6 space-y-3">
                {BUSINESS_PAIN.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-rose-600 stroke-[3]" />
                    </span>
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay="delay-1" className="flex flex-col items-center justify-center gap-3">
            <span className="w-px h-10 lg:h-16 bg-gradient-to-b from-transparent to-[#0066FF]" />
            <span className="relative w-20 h-20 rounded-full bg-[#0A1628] flex items-center justify-center shadow-xl shadow-[#0066FF]/25">
              <span className="absolute inset-0 rounded-full animate-pulse-beacon" />
              <span className="font-['Montserrat'] font-black text-white text-[11px] tracking-wider text-center leading-tight">
                LABOURA
                <br />
                <span className="text-[#00D4FF]">BRIDGES IT</span>
              </span>
            </span>
            <span className="w-px h-10 lg:h-16 bg-gradient-to-t from-transparent to-[#138808]" />
          </Reveal>

          <Reveal delay="delay-2">
            <div className="h-full rounded-[28px] bg-[#FAFAFC] border border-gray-200 p-7 sm:p-9 hover-card-rise">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                <Users className="w-3.5 h-3.5" /> The worker
              </span>
              <h3 className="mt-5 text-2xl sm:text-3xl font-black text-[#0A1628] font-['Montserrat'] leading-tight">
                For them, it's a missed day's wages.
              </h3>
              <ul className="mt-6 space-y-3">
                {WORKER_PAIN.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-rose-600 stroke-[3]" />
                    </span>
                    <span className="text-[15px]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BELIEFS ═══ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">What we stand for</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.08]">
            Three beliefs behind every placement.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.num} delay={`delay-${i}`}>
              <div className={`group relative h-full overflow-hidden rounded-[28px] bg-gradient-to-br ${b.tint} to-white border border-gray-200 p-8 hover-card-rise`}>
                <span className="absolute -right-3 -top-8 text-[8rem] font-black font-['Montserrat'] leading-none text-[#0A1628]/[0.05] select-none transition-transform duration-700 group-hover:-translate-y-2" aria-hidden>
                  {b.num}
                </span>
                <span className="relative w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-[#0A1628]" />
                </span>
                <h3 className="relative mt-6 text-2xl font-black text-[#0A1628] font-['Montserrat'] tracking-tight">{b.title}</h3>
                <p className="relative mt-3 text-[15px] text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ LABOURA TODAY ═══ */}
      <section className="py-20 sm:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Our promise</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat'] leading-[1.08]">
              The fix he wished he'd had.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Everything we do comes back to that first problem: the right person, close by, when you need them.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("businesses")}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A1628] text-white text-sm font-bold hover:bg-[#0066FF] transition-colors"
              >
                For businesses
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate("workers")}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-300 text-[#0A1628] text-sm font-bold hover:border-emerald-600 hover:text-emerald-700 transition-colors"
              >
                For workers
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={`delay-${i}`}>
                <div className="h-full rounded-3xl bg-[#FAFAFC] border border-gray-200 p-6 flex gap-4 hover-card-rise">
                  <span className="w-11 h-11 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0066FF]/25">
                    <p.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-black text-lg text-[#0A1628] font-['Montserrat'] flex items-center gap-1.5">
                      {p.title}
                      <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    </div>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white">
        <div aria-hidden className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] rounded-full bg-[#0066FF]/25 blur-[140px]" />
        <Reveal className="relative max-w-4xl mx-auto text-center">
          <div className="mx-auto w-40 h-1 flex rounded-full overflow-hidden animate-draw-across" aria-hidden>
            <span className="flex-1 bg-[#FF9933]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#138808]" />
          </div>
          <h2 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-['Montserrat'] leading-[1.03]">
            Born in India.
            <br />
            <span className="text-gradient-blue">Built for the people who keep it running.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you need dependable hands for your business or steady work close to home, our team is a phone call away.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:18005226872"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-base shadow-xl shadow-[#0066FF]/30 hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-5 h-5" />
              Call 1 (800) 522-6872
            </a>
            <button
              onClick={() => onOpenCallModal("general")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base transition-colors"
            >
              Request a callback
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default AboutPage;
