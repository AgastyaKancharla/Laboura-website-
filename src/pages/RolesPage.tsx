import React, { useMemo, useState } from "react";
import { PageId } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { INDUSTRIES, Industry } from "../data/industries";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  PhoneCall,
  Search,
  UserPlus,
  X,
} from "lucide-react";

interface RolesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

const CATEGORIES = [
  { id: "all", label: "All industries" },
  { id: "retail", label: "Retail & stores" },
  { id: "food", label: "Food & dining" },
  { id: "logistics", label: "Logistics" },
  { id: "maintenance", label: "Maintenance & cleaning" },
  { id: "security", label: "Security" },
  { id: "services", label: "Salons & events" },
];

const splitRoles = (roles: string) => roles.split(/,\s*|\s*&\s*/).filter(Boolean);
const ROLE_COUNT = INDUSTRIES.reduce((n, i) => n + splitRoles(i.roles).length, 0);

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#00D4FF]/30 text-inherit rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function IndustryDetail({
  ind,
  query,
  onHire,
  onApply,
}: {
  ind: Industry;
  query: string;
  onHire: () => void;
  onApply: () => void;
}) {
  return (
    <div key={ind.id} className="rounded-[28px] overflow-hidden bg-white border border-gray-200 shadow-[0_30px_60px_-30px_rgba(10,22,40,0.3)]">
      <div className="relative h-56 sm:h-72 overflow-hidden bg-[#0A1628]">
        <img src={ind.img} alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
          <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0">
            <ind.icon className="w-7 h-7 text-[#0066FF]" />
          </span>
          <div className="min-w-0">
            <span className="inline-flex px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
              {ind.badge}
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight animate-text-reveal" style={{ animationFillMode: "both" }}>
              <Highlight text={ind.title} query={query} />
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Roles we fill</div>
          <ul className="mt-4 space-y-2">
            {splitRoles(ind.roles).map((r, i) => (
              <li
                key={r}
                className="animate-bubble-in flex items-center gap-3 rounded-xl bg-[#FAFAFC] border border-gray-200 px-4 py-3 text-[15px] font-bold text-[#0A1628]"
                style={{ animationDelay: `${100 + i * 70}ms` }}
              >
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#0066FF] to-[#00D4FF]" />
                <Highlight text={r} query={query} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">What the work involves</div>
          <ul className="mt-4 space-y-3">
            {ind.tasks.map((t, i) => (
              <li
                key={t}
                className="animate-bubble-in flex items-start gap-3 text-[15px] text-gray-700"
                style={{ animationDelay: `${250 + i * 80}ms` }}
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                </span>
                <Highlight text={t} query={query} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onHire}
          className="py-4 rounded-2xl bg-[#0A1628] hover:bg-[#0066FF] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Building2 className="w-4 h-4" />
          Hire for this
        </button>
        <button
          onClick={onApply}
          className="py-4 rounded-2xl bg-white border border-gray-300 hover:border-emerald-500 hover:text-emerald-700 text-[#0A1628] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Apply for this work
        </button>
      </div>
    </div>
  );
}

export function RolesPage({ onNavigate, onOpenCallModal }: RolesPageProps) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(INDUSTRIES[0].id);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDUSTRIES.filter((ind) => {
      if (category !== "all" && ind.category !== category) return false;
      if (!q) return true;
      return [ind.title, ind.roles, ind.badge, ...ind.tasks].some((s) => s.toLowerCase().includes(q));
    });
  }, [category, query]);

  const selected = results.find((r) => r.id === selectedId) ?? results[0];
  const hire = () => onOpenCallModal("contractor");
  const apply = () => onOpenCallModal("worker");

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans']">

      {/* ═══ HERO + SEARCH ═══ */}
      <section className="relative overflow-hidden bg-[#0A1628] text-white">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-32 left-1/4 w-[34rem] h-[34rem] rounded-full bg-[#0066FF]/30 blur-[130px] animate-aura" />
          <div className="absolute -bottom-40 right-0 w-[30rem] h-[30rem] rounded-full bg-[#00D4FF]/15 blur-[120px] animate-aura-pulse" />
        </div>
        <div className="relative px-5 sm:px-8 md:px-14 lg:px-20 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <div
            className="animate-text-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-[0.18em] text-[#00D4FF]"
            style={{ animationFillMode: "both", animationDelay: "80ms" }}
          >
            The role directory
          </div>
          <h1
            className="animate-text-reveal mt-6 text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat'] text-white max-w-4xl mx-auto"
            style={{ animationFillMode: "both", animationDelay: "200ms" }}
          >
            Find the role. <span className="text-gradient-blue">See the work.</span>
          </h1>
          <p
            className="animate-text-reveal mt-5 text-lg text-slate-300 max-w-2xl mx-auto"
            style={{ animationFillMode: "both", animationDelay: "330ms" }}
          >
            {INDUSTRIES.length} industries and {ROLE_COUNT} frontline roles, with exactly what each job involves.
          </p>

          <div
            className="animate-text-reveal mt-9 max-w-2xl mx-auto"
            style={{ animationFillMode: "both", animationDelay: "460ms" }}
          >
            <label className="relative block">
              <span className="sr-only">Search roles and duties</span>
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a role or task, e.g. cashier, barber, painting"
                className="w-full pl-14 pr-12 py-5 rounded-2xl bg-white text-[#0A1628] text-base font-medium placeholder-gray-400 shadow-[0_20px_60px_-20px_rgba(0,102,255,0.6)] outline-none focus:ring-4 focus:ring-[#00D4FF]/40"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </label>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Cashier", "Dishwasher", "Security", "Painting", "Barber"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white/90 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="px-5 sm:px-8 md:px-14 lg:px-20 py-3 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                category === c.id ? "bg-[#0A1628] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {c.label}
            </button>
          ))}
          <span className="ml-auto pl-4 text-xs font-bold text-gray-400 whitespace-nowrap" aria-live="polite">
            {results.length} {results.length === 1 ? "industry" : "industries"}
          </span>
        </div>
      </div>

      {/* ═══ DIRECTORY ═══ */}
      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-12 lg:py-16 border-b border-gray-100">
        {results.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <span className="w-16 h-16 mx-auto rounded-2xl bg-white border border-gray-200 flex items-center justify-center">
              <Search className="w-7 h-7 text-gray-400" />
            </span>
            <h2 className="mt-6 text-2xl font-black font-['Montserrat']">No roles match "{query}"</h2>
            <p className="mt-2 text-gray-600">
              We may still be able to help. Tell us the role you need and we'll see what we can do.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={hire} className="px-6 py-3.5 rounded-full bg-[#0A1628] text-white text-sm font-bold">
                Ask about this role
              </button>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="px-6 py-3.5 rounded-full bg-white border border-gray-300 text-sm font-bold"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-start">
            <ul className="space-y-2.5">
              {results.map((ind) => {
                const active = selected?.id === ind.id;
                return (
                  <li key={ind.id}>
                    <button
                      onClick={() => setSelectedId(ind.id)}
                      aria-expanded={active}
                      className={`group w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                        active
                          ? "bg-white border-[#0066FF] shadow-[0_10px_30px_-12px_rgba(0,102,255,0.4)]"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          active ? "bg-[#0066FF] text-white" : "bg-blue-50 text-[#0066FF]"
                        }`}
                      >
                        <ind.icon className="w-6 h-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-[#0A1628]">
                          <Highlight text={ind.title} query={query} />
                        </span>
                        <span className="block text-sm text-gray-500 truncate">
                          <Highlight text={ind.roles} query={query} />
                        </span>
                      </span>
                      <ArrowRight
                        className={`hidden lg:block w-4 h-4 shrink-0 transition-all ${
                          active ? "text-[#0066FF] translate-x-1" : "text-gray-300 group-hover:text-gray-500"
                        }`}
                      />
                      <ChevronDown
                        className={`lg:hidden w-5 h-5 shrink-0 transition-transform ${active ? "rotate-180 text-[#0066FF]" : "text-gray-400"}`}
                      />
                    </button>
                    {active && (
                      <div className="lg:hidden mt-3">
                        <IndustryDetail ind={ind} query={query} onHire={hire} onApply={apply} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {selected && (
              <div className="hidden lg:block lg:sticky lg:top-40">
                <IndustryDetail ind={selected} query={query} onHire={hire} onApply={apply} />
              </div>
            )}
          </div>
        )}
      </section>

      {/* ═══ TWO DOORS ═══ */}
      <section className="px-5 sm:px-8 md:px-14 lg:px-20 py-20 sm:py-24 bg-white">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
            Found what you were looking for?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">Pick your side and we'll take it from here.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal delay="delay-0">
            <button
              onClick={hire}
              className="group relative w-full h-full overflow-hidden rounded-[28px] bg-[#0A1628] p-8 sm:p-10 text-left text-white"
            >
              <span aria-hidden className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#0066FF]/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <Building2 className="relative w-10 h-10 text-[#00D4FF]" />
              <span className="relative mt-6 block text-3xl font-black font-['Montserrat']">I'm hiring</span>
              <span className="relative mt-2 block text-slate-300">
                Verified local workers, with a free replacement for 30 days from the day we fill the position.
              </span>
              <span className="relative mt-8 inline-flex items-center gap-2 font-bold text-[#00D4FF]">
                Request staff
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Reveal>
          <Reveal delay="delay-1">
            <button
              onClick={apply}
              className="group relative w-full h-full overflow-hidden rounded-[28px] bg-emerald-600 p-8 sm:p-10 text-left text-white"
            >
              <span aria-hidden className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <UserPlus className="relative w-10 h-10 text-white" />
              <span className="relative mt-6 block text-3xl font-black font-['Montserrat']">I'm looking for work</span>
              <span className="relative mt-2 block text-emerald-50">
                Jobs close to home. If we can't place you, you get your money back in full.
              </span>
              <span className="relative mt-8 inline-flex items-center gap-2 font-bold text-white">
                Apply now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Reveal>
        </div>
        <Reveal className="mt-10 text-center">
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#0066FF] transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            Need something specific? Talk to our team
          </button>
        </Reveal>
      </section>
    </div>
  );
}

export default RolesPage;
