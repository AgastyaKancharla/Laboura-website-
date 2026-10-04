import React, { useEffect, useState } from "react";
import { PageId } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { FAQ, FaqItem } from "../components/FAQ";
import { INDUSTRIES } from "../data/industries";
import {
  ArrowRight,
  Building2,
  Check,
  CircleCheck,
  Loader2,
  MapPin,
  Minus,
  Phone,
  PhoneCall,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";

interface ForBusinessesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

const inr = new Intl.NumberFormat("en-IN");

/* ── Hero walkthrough: how a request becomes a filled shift ──── */

const DEMO_ROLES = ["Store helper", "Cashier", "Kitchen helper", "Warehouse loader", "Cleaner", "Security guard"];
const DEMO_SHIFTS = ["Morning", "Evening", "Night"];

function RequestWalkthrough({ onRequest }: { onRequest: () => void }) {
  const [role, setRole] = useState(DEMO_ROLES[0]);
  const [count, setCount] = useState(2);
  const [shift, setShift] = useState(DEMO_SHIFTS[0]);
  const [stage, setStage] = useState(-1);

  const steps = [
    { title: "Request received", detail: `${count} × ${role}, ${shift.toLowerCase()} shift` },
    { title: "Matching workers near you", detail: "Searching your neighbourhood first" },
    { title: "ID & background checked", detail: "Before anyone is sent to you" },
    { title: "Workers confirmed", detail: "Joining your team for the shift" },
  ];

  useEffect(() => {
    if (stage < 0 || stage >= steps.length) return;
    const t = window.setTimeout(() => setStage((s) => s + 1), stage === 0 ? 500 : 850);
    return () => window.clearTimeout(t);
  }, [stage, steps.length]);

  const running = stage >= 0;
  const done = stage >= steps.length;

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-8 bg-gradient-to-tr from-[#0066FF]/20 via-[#00D4FF]/10 to-transparent blur-3xl rounded-[48px]" />
      <div className="relative rounded-[28px] bg-white border border-gray-200 shadow-[0_40px_80px_-30px_rgba(10,22,40,0.35)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse-beacon" />
            <span className="text-sm font-bold text-[#0A1628]">Build a staff request</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Walkthrough</span>
        </div>

        {!running ? (
          <div className="p-6 space-y-5">
            <div>
              <div className="text-xs font-bold text-gray-500 mb-2">Who do you need?</div>
              <div className="flex flex-wrap gap-2">
                {DEMO_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    aria-pressed={role === r}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${
                      role === r
                        ? "bg-[#0A1628] border-[#0A1628] text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#0066FF]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2">How many?</div>
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-1.5">
                  <button
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    aria-label="Fewer workers"
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-xl text-[#0A1628] tabular-nums" aria-live="polite">{count}</span>
                  <button
                    onClick={() => setCount((c) => Math.min(10, c + 1))}
                    aria-label="More workers"
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2">Which shift?</div>
                <div className="flex rounded-2xl border border-gray-200 p-1.5 gap-1">
                  {DEMO_SHIFTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setShift(s)}
                      aria-pressed={shift === s}
                      className={`flex-1 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-colors ${
                        shift === s ? "bg-[#0066FF] text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStage(0)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00B4FF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-[#0066FF]/50 transition-shadow"
            >
              See how we'd fill it
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-6">
            <ol className="space-y-1">
              {steps.map((s, i) => {
                const state = i < stage ? "done" : i === stage ? "active" : "waiting";
                return (
                  <li key={s.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          state === "done"
                            ? "bg-emerald-500 text-white"
                            : state === "active"
                            ? "bg-blue-50 text-[#0066FF]"
                            : "bg-gray-100 text-gray-300"
                        }`}
                      >
                        {state === "done" ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : state === "active" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      {i < steps.length - 1 && (
                        <span className={`w-px flex-1 min-h-[18px] my-1 ${i < stage ? "bg-emerald-300" : "bg-gray-200"}`} />
                      )}
                    </div>
                    <div className={`pb-4 transition-opacity duration-300 ${state === "waiting" ? "opacity-40" : "opacity-100"}`}>
                      <div className="text-sm font-bold text-[#0A1628]">{s.title}</div>
                      <div className="text-xs text-gray-500">{s.detail}</div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className={`transition-all duration-500 ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
              <div className="mt-1 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-emerald-800">
                  Covered by our free replacement for 30 days from the day the position is filled.
                </span>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                <button
                  onClick={onRequest}
                  className="py-3.5 rounded-2xl bg-[#0A1628] hover:bg-[#0066FF] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  Make this request for real
                </button>
                <button
                  onClick={() => setStage(-1)}
                  aria-label="Start the walkthrough again"
                  className="w-12 rounded-2xl border border-gray-200 text-gray-600 hover:border-[#0066FF] hover:text-[#0066FF] flex items-center justify-center transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Cost of an empty shift ──────────────────────────────────── */

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        <span className="font-mono text-lg font-bold text-white tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-2 rounded-full appearance-none cursor-pointer accent-[#00D4FF]"
        style={{ background: `linear-gradient(90deg, #00D4FF ${pct}%, rgba(255,255,255,0.12) ${pct}%)` }}
      />
    </label>
  );
}

function EmptyShiftCost() {
  const [shifts, setShifts] = useState(6);
  const [sales, setSales] = useState(15000);
  const [loss, setLoss] = useState(25);

  const monthly = Math.round((shifts * sales * loss) / 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      <div className="rounded-[28px] bg-white/[0.04] border border-white/10 p-5 sm:p-8 space-y-5 sm:space-y-7">
        <Slider
          label="Shifts you run short-staffed each month"
          value={shifts}
          min={1}
          max={30}
          step={1}
          display={`${shifts}`}
          onChange={setShifts}
        />
        <Slider
          label="Sales on a fully staffed shift"
          value={sales}
          min={2000}
          max={100000}
          step={1000}
          display={`₹${inr.format(sales)}`}
          onChange={setSales}
        />
        <Slider
          label="Sales you lose when short-staffed"
          value={loss}
          min={5}
          max={60}
          step={5}
          display={`${loss}%`}
          onChange={setLoss}
        />
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0066FF] to-[#00B4FF] p-6 sm:p-8 flex flex-col justify-between md:min-h-[280px]">
        <div aria-hidden className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/15 blur-2xl" />
        <div className="relative">
          <div className="text-xs font-bold uppercase tracking-widest text-white/80">Sales at risk every month</div>
          <div className="mt-2 font-black font-['Montserrat'] text-4xl sm:text-6xl text-white tabular-nums break-all" aria-live="polite">
            ₹{inr.format(monthly)}
          </div>
          <div className="mt-2 text-white/85 font-semibold">
            That's about ₹{inr.format(monthly * 12)} a year.
          </div>
        </div>
        <p className="relative mt-6 text-xs text-white/75 leading-relaxed">
          A rough estimate from the numbers you enter. It doesn't include your own time spent covering the floor.
        </p>
      </div>
    </div>
  );
}

/* ── 30-day replacement explainer ────────────────────────────── */

const WINDOW_MAX = 45;

function ReplacementWindow() {
  const [day, setDay] = useState(12);
  const covered = day <= 30;
  const pct = (day / WINDOW_MAX) * 100;
  const coverPct = (30 / WINDOW_MAX) * 100;

  return (
    <div className="rounded-[28px] bg-white border border-gray-200 p-6 sm:p-10 shadow-sm">
      <div className="relative pt-10">
        <div className="relative h-4 rounded-full bg-gray-100 overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: `${coverPct}%` }} />
          <div
            className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(255,255,255,0.35)_6px_12px)]"
            style={{ width: `${coverPct}%` }}
          />
        </div>
        <div className="absolute top-0 -translate-x-1/2 transition-[left] duration-150" style={{ left: `${pct}%` }} aria-hidden>
          <span className={`block px-2.5 py-1 rounded-lg text-[11px] font-bold text-white whitespace-nowrap ${covered ? "bg-emerald-600" : "bg-rose-500"}`}>
            Day {day}
          </span>
          <span className={`block mx-auto w-0.5 h-6 ${covered ? "bg-emerald-600" : "bg-rose-500"}`} />
        </div>
        <div className="relative mt-3 h-4 text-[11px] font-bold">
          <span className="absolute left-0 text-gray-500">Day 0 · Position filled</span>
          <span className="absolute -translate-x-1/2 text-emerald-700" style={{ left: `${coverPct}%` }}>Day 30</span>
        </div>
      </div>

      <label className="block mt-8">
        <span className="text-sm font-semibold text-gray-600">Drag to the day a worker leaves</span>
        <input
          type="range"
          min={1}
          max={WINDOW_MAX}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="mt-3 w-full cursor-pointer accent-[#0066FF]"
        />
      </label>

      <div
        className={`mt-6 rounded-2xl px-5 py-4 flex items-start gap-3 transition-colors ${
          covered ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"
        }`}
        aria-live="polite"
      >
        {covered ? (
          <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        )}
        <div>
          <div className={`font-bold ${covered ? "text-emerald-800" : "text-rose-800"}`}>
            {covered ? "Covered: free replacement." : "Outside the 30-day window."}
          </div>
          <div className={`text-sm ${covered ? "text-emerald-700" : "text-rose-700"}`}>
            {covered
              ? `Your worker left on day ${day}. We find you a replacement at no extra cost.`
              : `Day ${day} is past the 30-day promise. Talk to us and we'll help you fill the position again.`}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

const STEPS = [
  { icon: PhoneCall, title: "Tell us", body: "Call or request a callback. Share the role, how many people, the shift and your address." },
  { icon: MapPin, title: "We match locally", body: "We look for workers who live near your business, so they arrive on time and stay." },
  { icon: ShieldCheck, title: "We verify", body: "Every worker's ID and background are checked before they're sent to you." },
  { icon: UserCheck, title: "You hire", body: "The worker joins your team on your payroll, backed by our 30-day promise." },
];

const COMPARISON = [
  { topic: "Who turns up", usual: "Whoever is free, often unknown to you", laboura: "ID- and background-verified workers" },
  { topic: "Where they come from", usual: "Anywhere, with long and unreliable commutes", laboura: "Your own neighbourhood" },
  { topic: "If they leave early", usual: "You start searching all over again", laboura: "Free replacement within 30 days" },
  { topic: "Who you deal with", usual: "Chains of middlemen and contacts", laboura: "One team, one phone call" },
];

const FAQS: FaqItem[] = [
  {
    q: "How quickly can you send someone?",
    a: "Tell us as early as you can. For urgent gaps, call us directly and we'll work to fill the shift the same day.",
  },
  {
    q: "What exactly does the 30-day replacement cover?",
    a: "If a worker we placed leaves, or isn't the right fit, within 30 days of the day we filled the position, we find you a replacement at no extra cost.",
  },
  {
    q: "How are workers verified?",
    a: "Before anyone is sent to you, we check their government ID and run a background check.",
  },
  {
    q: "Who pays the worker?",
    a: "The worker joins your team and is paid by your business directly, just like any other staff member.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the role and how many positions you need filled. Call us and we'll give you a clear quote before anything starts.",
  },
];

export function ForBusinessesPage({ onNavigate, onOpenCallModal }: ForBusinessesPageProps) {
  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans']">

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div aria-hidden className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(0,102,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
        <div className="relative px-5 sm:px-8 md:px-14 lg:px-20 pt-28 pb-12 lg:pt-36 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
          <div>
            <div
              className="animate-text-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]"
              style={{ animationFillMode: "both", animationDelay: "80ms" }}
            >
              <Building2 className="w-4 h-4" />
              For business owners
            </div>
            <h1
              className="animate-text-reveal mt-6 text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat']"
              style={{ animationFillMode: "both", animationDelay: "200ms" }}
            >
              Never open
              <br />
              <span className="text-gradient-blue">short-staffed</span> again.
            </h1>
            <p
              className="animate-text-reveal mt-6 text-lg text-gray-600 leading-relaxed max-w-xl"
              style={{ animationFillMode: "both", animationDelay: "350ms" }}
            >
              Tell us the role, the shift and the place. Laboura sends verified workers from your own neighbourhood,
              and if a placement doesn't work out in the first 30 days, we replace them free.
            </p>
            <div
              className="animate-text-reveal mt-8 flex flex-col sm:flex-row gap-3"
              style={{ animationFillMode: "both", animationDelay: "500ms" }}
            >
              <button
                onClick={() => onOpenCallModal("contractor")}
                className="group px-7 py-4 rounded-full bg-[#0A1628] hover:bg-[#0066FF] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0A1628]/15 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Request staff
              </button>
              <button
                onClick={() => onNavigate("roles")}
                className="group px-7 py-4 rounded-full bg-white border border-gray-300 hover:border-[#0066FF] text-[#0A1628] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                See the roles we fill
                <ArrowRight className="w-4 h-4 text-[#0066FF] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <ul
              className="animate-text-reveal mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-gray-700"
              style={{ animationFillMode: "both", animationDelay: "650ms" }}
            >
              {["ID & background-verified", "Workers from your area", "30-day free replacement"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block animate-text-reveal" style={{ animationFillMode: "both", animationDelay: "450ms" }}>
            <RequestWalkthrough onRequest={() => onOpenCallModal("contractor")} />
          </div>
        </div>
      </section>

      {/* ═══ WALKTHROUGH (phones: its own screen) ═══ */}
      <section aria-label="Build a staff request" className="lg:hidden px-5 sm:px-8 md:px-14 py-12 bg-white border-b border-gray-100">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Try it</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">Build a staff request.</h2>
        </Reveal>
        <Reveal className="mt-6" delay="delay-1">
          <RequestWalkthrough onRequest={() => onOpenCallModal("contractor")} />
        </Reveal>
      </section>

      {/* ═══ COST OF AN EMPTY SHIFT ═══ */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white">
        <div aria-hidden className="absolute -top-40 right-0 w-[40rem] h-[40rem] rounded-full bg-[#0066FF]/20 blur-[140px]" />
        <Reveal className="relative max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00D4FF]">The real cost</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08] text-white">
            What is an empty shift costing you?
          </h2>
          <p className="hidden md:block mt-4 text-base sm:text-lg text-slate-300">
            Move the sliders to match your business. Missing staff rarely shows up on a bill, but it always shows up in your sales.
          </p>
        </Reveal>
        <Reveal className="relative mt-8 md:mt-12" delay="delay-1">
          <EmptyShiftCost />
        </Reveal>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
            From one phone call to a filled shift.
          </h2>
        </Reveal>

        <Reveal className="relative mt-8 md:mt-14">
          <div aria-hidden className="hidden lg:block absolute top-7 left-7 right-7 h-[2px] bg-gray-200">
            <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] animate-draw-across" />
          </div>
          <ol className="rail relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative max-md:rounded-3xl max-md:bg-[#FAFAFC] max-md:border max-md:border-gray-200 max-md:p-6">
                <span className="relative z-10 w-14 h-14 rounded-2xl bg-white border-2 border-[#0066FF] text-[#0066FF] flex items-center justify-center shadow-md">
                  <s.icon className="w-6 h-6" />
                </span>
                <div className="mt-5 font-mono text-xs font-bold text-gray-400">0{i + 1}</div>
                <h3 className="mt-1 text-xl font-black font-['Montserrat']">{s.title}</h3>
                <p className="mt-2 text-[15px] text-gray-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ═══ 30-DAY PROMISE ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              <RefreshCw className="w-3.5 h-3.5" /> Our promise to you
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              30 days of cover, from the day we fill the position.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              If a worker we placed leaves, or simply isn't the right fit, within 30 days, we find you a replacement at no
              extra cost. No arguments, no fine print to dig through.
            </p>
          </Reveal>
          <Reveal delay="delay-1">
            <ReplacementWindow />
          </Reveal>
        </div>
      </section>

      {/* ═══ INDUSTRY INDEX ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Who we staff</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              Ten industries. The roles that keep them open.
            </h2>
          </Reveal>
          <Reveal delay="delay-1">
            <button
              onClick={() => onNavigate("roles")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A1628] hover:bg-[#0066FF] text-white text-sm font-bold transition-colors"
            >
              Every role and duty
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-2 gap-x-3 md:gap-x-10 md:border-t md:border-gray-200">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={`delay-${i % 2}`}>
              <button
                onClick={() => onNavigate("roles")}
                className="group w-full flex items-center gap-2.5 md:gap-4 py-2.5 md:py-5 border-b border-gray-200 text-left"
              >
                <span className="hidden md:inline font-mono text-xs font-bold text-gray-300 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#0066FF] group-hover:text-white">
                  <ind.icon className="w-5 h-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] md:text-base font-bold text-[#0A1628] leading-tight">{ind.title}</span>
                  <span className="hidden md:block text-sm text-gray-500 truncate">{ind.roles}</span>
                </span>
                <ArrowRight className="hidden md:block w-4 h-4 text-gray-300 shrink-0 transition-all group-hover:text-[#0066FF] group-hover:translate-x-1" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ THE USUAL WAY VS LABOURA ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Why switch</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
            The usual way vs the Laboura way.
          </h2>
        </Reveal>

        <Reveal className="mt-8 md:mt-12 max-w-5xl mx-auto">
          <div className="hidden md:grid grid-cols-[0.8fr_1fr_1fr] gap-4 px-6 pb-3 text-xs font-bold uppercase tracking-wider">
            <span />
            <span className="text-gray-500">The usual way</span>
            <span className="text-[#0066FF]">With Laboura</span>
          </div>
          <div className="rail md:space-y-3">
            {COMPARISON.map((row) => (
              <div
                key={row.topic}
                className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr_1fr] gap-3 md:gap-4 items-center rounded-3xl bg-white border border-gray-200 p-5 md:px-6 hover-card-rise"
              >
                <div className="font-black font-['Montserrat'] text-lg">{row.topic}</div>
                <div className="flex items-start gap-2.5 text-gray-500">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-gray-500 stroke-[3]" />
                  </span>
                  <span className="text-[15px]">
                    <span className="md:hidden font-bold text-gray-400">Usually: </span>
                    {row.usual}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[#0A1628] font-semibold">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </span>
                  <span className="text-[15px]">{row.laboura}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Questions</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              What business owners ask us.
            </h2>
            <p className="hidden md:block mt-4 text-gray-600">Something else on your mind? Our team is one call away.</p>
          </Reveal>
          <Reveal delay="delay-1">
            <FAQ items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden py-20 sm:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-gradient-to-br from-[#0066FF] to-[#0047B3] text-white">
        <div aria-hidden className="absolute -right-24 -bottom-24 w-[30rem] h-[30rem] rounded-full bg-[#00D4FF]/30 blur-[100px]" />
        <Reveal className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.05] text-white">
              Have a shift to fill?
            </h2>
            <p className="mt-3 text-lg text-white/85">Tell us the role, the shift and the place. We'll take it from there.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:18005226872"
              className="px-7 py-4 rounded-full bg-white text-[#0A1628] font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4 text-[#0066FF]" />
              Call 1 (800) 522-6872
            </a>
            <button
              onClick={() => onOpenCallModal("contractor")}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm transition-colors"
            >
              Request a callback
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default ForBusinessesPage;
