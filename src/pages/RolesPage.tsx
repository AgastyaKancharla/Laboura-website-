import React, { useState } from "react";
import { PageId } from "../components/Navbar";
import {
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Layers,
  Phone,
} from "lucide-react";
import { INDUSTRIES } from "../data/industries";

interface RolesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function RolesPage({ onNavigate, onOpenCallModal }: RolesPageProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const verticals = INDUSTRIES;

  const filterTabs = [
    { id: "all", label: "All 10 Industries" },
    { id: "retail", label: "Retail & Stores" },
    { id: "food", label: "Food & Dining" },
    { id: "logistics", label: "Logistics & Freight" },
    { id: "maintenance", label: "Maintenance & Clean" },
    { id: "security", label: "Security & Guard" },
    { id: "services", label: "Salons & Events" },
  ];

  const filtered = selectedFilter === "all" 
    ? verticals 
    : verticals.filter(v => v.category === selectedFilter);

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans'] min-h-screen">
      
      {/* ── Visual Hero Banner ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 border-b border-gray-100 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]">
            <Layers className="w-4 h-4" />
            <span>Essential Frontline Coverage</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
            10 Physical Trades. Zero Flakes.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Browse our full catalog of physical trades with verified local workers ready for immediate dispatch.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs (Horizontal Swipeable HUD) ── */}
      <section className="py-4 bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-20 z-30 px-5 sm:px-8 md:px-14 lg:px-20">
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Visual Role Picture Cards Grid ── */}
      <section className="py-16 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[10px] font-bold text-gray-900 shadow-sm backdrop-blur-md">
                  {item.badge}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white font-['Montserrat'] leading-tight">{item.title}</h3>
                    <p className="text-xs text-gray-200 mt-0.5">{item.roles}</p>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <ul className="space-y-2 mb-6">
                  {item.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onOpenCallModal("contractor")}
                  className="w-full py-3 rounded-xl bg-gray-50 hover:bg-[#0066FF] hover:text-white border border-gray-200 hover:border-[#0066FF] text-gray-800 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Request This Crew Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Direct Dispatch Call CTA ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-blue-600/30 text-[#00D4FF] flex items-center justify-center mx-auto border border-blue-400/40">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat']">
            Need a Specialized Frontline Trade?
          </h2>
          <p className="text-base text-slate-300">
            Our placement coordinators manage customized shift requests for all 10 physical industries 24 hours a day.
          </p>
          <div className="pt-2">
            <a
              href="tel:18005226872"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span>Call 1 (800) 522-6872</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default RolesPage;
