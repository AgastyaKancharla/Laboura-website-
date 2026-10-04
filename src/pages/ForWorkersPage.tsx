import React, { useState } from "react";
import { PageId } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { FAQ, FaqItem } from "../components/FAQ";
import { INDUSTRIES } from "../data/industries";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  FileText,
  Home,
  IndianRupee,
  MapPin,
  Phone,
  PhoneCall,
  Smartphone,
  UserPlus,
  Wallet,
} from "lucide-react";

interface ForWorkersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

/* ── Rotating guarantee seal ─────────────────────────────────── */

function GuaranteeSeal() {
  const ring = "JOB OR YOUR MONEY BACK • JOB OR YOUR MONEY BACK • ";
  return (
    <div className="relative w-[170px] h-[170px] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] mx-auto">
      <div aria-hidden className="absolute inset-0 rounded-full bg-emerald-400/30 blur-3xl" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none" aria-hidden>
        <defs>
          <path id="seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="#064E3B" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 4" />
        <text className="fill-emerald-200" style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 2.2 }}>
          <textPath href="#seal-ring">{ring}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex flex-col items-center justify-center text-center shadow-[inset_0_2px_12px_rgba(255,255,255,0.35)]">
        <IndianRupee className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
        <span className="mt-1 text-white font-black font-['Montserrat'] text-sm sm:text-base leading-tight">
          Full refund
        </span>
        <span className="hidden sm:block text-[11px] font-semibold text-emerald-50 leading-tight px-4">
          if we can't place you
        </span>
      </div>
    </div>
  );
}

/* ── Industry picker ─────────────────────────────────────────── */

function WorkPicker({ onApply }: { onApply: () => void }) {
  const [selected, setSelected] = useState(INDUSTRIES[0].id);
  const ind = INDUSTRIES.find((i) => i.id === selected)!;
  const roles = ind.roles.split(/,\s*|\s*&\s*/).filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-start">
      <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 md:-mx-14 md:px-14 lg:mx-0 lg:px-0 flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-1 [scrollbar-width:none]" role="group" aria-label="Choose a kind of work">
        {INDUSTRIES.map((i) => {
          const active = i.id === selected;
          return (
            <button
              key={i.id}
              onClick={() => setSelected(i.id)}
              aria-pressed={active}
              className={`shrink-0 flex flex-row 2xl:flex-col items-center 2xl:items-start gap-2 lg:gap-3 px-3 py-2 lg:p-3 2xl:p-4 rounded-full lg:rounded-2xl border text-left transition-all ${
                active
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/25 -translate-y-0.5"
                  : "bg-white border-gray-200 text-[#0A1628] hover:border-emerald-400"
              }`}
            >
              <span className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full lg:rounded-xl flex items-center justify-center ${active ? "bg-white/20" : "bg-emerald-50 text-emerald-600"}`}>
                <i.icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span className="text-xs lg:text-sm font-bold leading-tight whitespace-nowrap lg:whitespace-normal">{i.title}</span>
            </button>
          );
        })}
      </div>

      <div key={ind.id} className="lg:sticky lg:top-28 rounded-[28px] overflow-hidden bg-white border border-gray-200 shadow-[0_30px_60px_-30px_rgba(10,22,40,0.3)]">
        <div className="relative h-32 sm:h-48 lg:h-32 xl:h-48 overflow-hidden">
          <img src={ind.img} alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <span className="inline-flex px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[11px] font-bold text-white uppercase tracking-wider">
              {ind.badge}
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white font-['Montserrat'] animate-text-reveal" style={{ animationFillMode: "both" }}>
              {ind.title}
            </h3>
          </div>
        </div>
        <div className="p-5 sm:p-7 lg:p-5 xl:p-7">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Jobs you can apply for</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {roles.map((r, idx) => (
              <span
                key={r}
                className="animate-bubble-in px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800"
                style={{ animationDelay: `${120 + idx * 70}ms` }}
              >
                {r}
              </span>
            ))}
          </div>
          <div className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">What the work involves</div>
          <ul className="mt-3 space-y-2 xl:space-y-2.5">
            {ind.tasks.map((t, idx) => (
              <li
                key={t}
                className="animate-bubble-in flex items-start gap-3 text-[15px] text-gray-700"
                style={{ animationDelay: `${300 + idx * 90}ms` }}
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <button
            onClick={onApply}
            className="mt-4 xl:mt-5 w-full py-3 xl:py-3.5 rounded-2xl bg-[#0A1628] hover:bg-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Apply for {ind.title.toLowerCase()} work
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

const JOURNEY = [
  { icon: UserPlus, title: "Register", body: "Call us or apply. Tell us the work you can do and where you live." },
  { icon: BadgeCheck, title: "Get verified", body: "Show a government photo ID. We check it so businesses can trust you." },
  { icon: MapPin, title: "Get matched", body: "We find you a job at a business close to your home." },
  { icon: Briefcase, title: "Start work", body: "Join the business and get paid by them directly." },
];

const CHECKLIST = [
  { icon: FileText, text: "A government photo ID, such as Aadhaar", optional: false },
  { icon: Smartphone, text: "A phone number we can reach you on", optional: false },
  { icon: Home, text: "The area where you live", optional: false },
  { icon: Briefcase, text: "Details of any past work", optional: true },
];

const FAQS: FaqItem[] = [
  { q: "What if I don't get a job?", a: "You get your money back in full. That's our promise to every job seeker we take on." },
  { q: "How far from home will I work?", a: "We look for jobs near where you live, so you spend less time and money travelling." },
  { q: "Who pays my salary?", a: "The business you work for pays you directly, just like the rest of their staff." },
  { q: "What documents do I need?", a: "A government photo ID, such as Aadhaar, and a phone number we can reach you on." },
  { q: "Do I need experience?", a: "Not always. Tell us what you've done before, and we'll match you with work that suits you." },
];

export function ForWorkersPage({ onNavigate, onOpenCallModal }: ForWorkersPageProps) {
  const apply = () => onOpenCallModal("worker");

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans']">

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white border-b border-gray-100">
        <div aria-hidden className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-emerald-200/40 blur-[120px] animate-aura" />
        <div className="relative px-5 sm:px-8 md:px-14 lg:px-20 pt-24 sm:pt-28 pb-10 lg:pt-36 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <div
              className="animate-text-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm"
              style={{ animationFillMode: "both", animationDelay: "80ms" }}
            >
              <BadgeCheck className="w-4 h-4" />
              For job seekers
            </div>
            <h1
              className="animate-text-reveal mt-6 text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat']"
              style={{ animationFillMode: "both", animationDelay: "200ms" }}
            >
              Work near home.
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                A job, or your money back.
              </span>
            </h1>
            <p
              className="animate-text-reveal mt-6 text-lg text-gray-600 leading-relaxed max-w-xl"
              style={{ animationFillMode: "both", animationDelay: "350ms" }}
            >
              Laboura finds you jobs at shops, restaurants, warehouses and more, close to where you live. If we can't
              place you in a job, we refund your money in full.
            </p>
            <div
              className="animate-text-reveal mt-8 flex flex-col sm:flex-row gap-3"
              style={{ animationFillMode: "both", animationDelay: "500ms" }}
            >
              <button
                onClick={apply}
                className="px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                Apply now
              </button>
              <a
                href="#worker-jobs"
                className="group px-7 py-4 rounded-full bg-white border border-gray-300 hover:border-emerald-500 text-[#0A1628] font-bold text-base flex items-center justify-center gap-2 transition-colors"
              >
                See the work
                <ArrowDown className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <ul
              className="animate-text-reveal mt-10 hidden sm:grid grid-cols-3 gap-3 max-w-2xl"
              style={{ animationFillMode: "both", animationDelay: "650ms" }}
            >
              {[
                { icon: MapPin, text: "Jobs near your home" },
                { icon: Wallet, text: "Paid directly by the business" },
                { icon: IndianRupee, text: "Job or full refund" },
              ].map((t) => (
                <li key={t.text} className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 px-4 py-3">
                  <t.icon className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{t.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-text-reveal" style={{ animationFillMode: "both", animationDelay: "450ms" }}>
            <GuaranteeSeal />
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY ═══ */}
      <section className="py-12 md:py-20 lg:py-24 bg-white border-b border-gray-100">
        <Reveal className="px-5 sm:px-8 md:px-14 lg:px-20 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
            Four steps from today to your first day.
          </h2>
        </Reveal>

        <div className="mt-8 md:mt-12 flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible scroll-snap-x px-5 sm:px-8 md:px-14 lg:px-20 pb-4">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.title} delay={`delay-${i}`} className="scroll-snap-center shrink-0 w-[78%] sm:w-[45%] lg:w-auto">
              <div className="relative h-full rounded-[28px] bg-[#FAFAFC] border border-gray-200 p-7 overflow-hidden hover-card-rise">
                <span aria-hidden className="absolute -right-2 -top-6 text-[7rem] font-black font-['Montserrat'] leading-none text-emerald-600/[0.08] select-none">
                  {i + 1}
                </span>
                <span className="relative w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25">
                  <step.icon className="w-7 h-7" />
                </span>
                <div className="relative mt-6 font-mono text-xs font-bold text-emerald-600">Step {i + 1}</div>
                <h3 className="relative mt-1 text-2xl font-black font-['Montserrat']">{step.title}</h3>
                <p className="relative mt-2 text-[15px] text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ HOW THE GUARANTEE WORKS ═══ */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#052E25] text-white">
        <div aria-hidden className="absolute -bottom-40 -left-20 w-[36rem] h-[36rem] rounded-full bg-emerald-500/20 blur-[140px]" />
        <Reveal className="relative text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Our promise</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08] text-white">
            Either way, you don't lose.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80">
            Once you register with Laboura, there are only two ways it ends.
          </p>
        </Reveal>

        <div className="relative mt-8 md:mt-14 max-w-4xl mx-auto">
          <Reveal className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-[#0A1628] font-bold shadow-xl">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              You register with Laboura
            </div>
          </Reveal>

          <Reveal className="relative h-16 sm:h-20">
            <div className="absolute left-1/2 top-0 h-1/2 w-px bg-emerald-300/60" />
            <div className="absolute left-1/4 right-1/4 top-1/2 h-px bg-emerald-300/60 animate-draw-across" />
            <div className="absolute left-1/4 top-1/2 h-1/2 w-px bg-emerald-300/60" />
            <div className="absolute right-1/4 top-1/2 h-1/2 w-px bg-emerald-300/60" />
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            <Reveal delay="delay-1">
              <div className="h-full rounded-[24px] bg-emerald-500 p-5 sm:p-8 text-center">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-white" />
                <div className="mt-3 text-lg sm:text-2xl font-black font-['Montserrat'] text-white">You get a job</div>
                <p className="mt-2 text-xs sm:text-sm text-emerald-50">You start work at a business near your home.</p>
              </div>
            </Reveal>
            <Reveal delay="delay-2">
              <div className="h-full rounded-[24px] bg-white/10 border border-white/20 p-5 sm:p-8 text-center">
                <IndianRupee className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-emerald-300" />
                <div className="mt-3 text-lg sm:text-2xl font-black font-['Montserrat'] text-white">Or you get a full refund</div>
                <p className="mt-2 text-xs sm:text-sm text-emerald-100/80">If we can't place you, your money comes back in full.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ WORK PICKER ═══ */}
      <section id="worker-jobs" className="py-12 md:py-16 lg:py-12 2xl:py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100 scroll-mt-20">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Find your kind of work</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
            What kind of work suits you?
          </h2>
          <p className="hidden md:block mt-4 text-base sm:text-lg text-gray-600">Tap an industry to see the jobs and what the work involves.</p>
        </Reveal>
        <Reveal className="mt-6 md:mt-8" delay="delay-1">
          <WorkPicker onApply={apply} />
        </Reveal>
      </section>

      {/* ═══ WHAT TO BRING ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Before you apply</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              All you need to get started.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              No long forms and no CV needed. Keep these ready and registering takes just a few minutes.
            </p>
          </Reveal>

          <Reveal delay="delay-1">
            <div className="relative rounded-[28px] bg-[#FAFAFC] border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-5 border-b border-dashed border-gray-300">
                <span className="font-black font-['Montserrat'] text-lg">Your checklist</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {CHECKLIST.filter((c) => !c.optional).length} must-haves
                </span>
              </div>
              <ul className="divide-y divide-gray-200">
                {CHECKLIST.map((item, i) => (
                  <li key={item.text} className="flex items-center gap-4 py-4">
                    <span className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-600" />
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-gray-800">
                      {item.text}
                      {item.optional && <span className="ml-2 text-xs font-bold text-gray-400">Optional</span>}
                    </span>
                    <Reveal delay={`delay-${i + 1}`}>
                      <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-12 md:py-20 lg:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Questions</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              What job seekers ask us.
            </h2>
            <p className="mt-4 text-gray-600">Still unsure? Call us and talk it through with a real person.</p>
          </Reveal>
          <Reveal delay="delay-1">
            <FAQ items={FAQS} accent="#059669" />
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden py-20 sm:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div aria-hidden className="absolute -left-24 -bottom-24 w-[30rem] h-[30rem] rounded-full bg-white/15 blur-[100px]" />
        <Reveal className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.05] text-white">
              Ready to start working?
            </h2>
            <p className="mt-3 text-lg text-white/90">Apply in a few minutes. A job near home, or your money back.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={apply}
              className="px-7 py-4 rounded-full bg-white text-emerald-700 font-black text-base flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <UserPlus className="w-5 h-5" />
              Apply now
            </button>
            <a
              href="tel:18005226872"
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call 1 (800) 522-6872
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default ForWorkersPage;
