import React from "react";
import { PageId } from "../components/Navbar";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  ArrowRight,
  UserCheck,
  PhoneCall,
  Store,
  UtensilsCrossed,
  Fuel,
  Truck,
  Sparkles,
  Scissors,
  Paintbrush,
  Trees,
  Theater,
  Award,
  RefreshCw,
  Check,
  X,
  Phone,
  ThumbsUp,
} from "lucide-react";

interface ForBusinessesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function ForBusinessesPage({ onNavigate, onOpenCallModal }: ForBusinessesPageProps) {
  const visualIndustries = [
    {
      title: "Supermarket & Retail",
      role: "Shelf Restockers, Cashiers & Cart Handlers",
      img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=700&q=80",
      icon: Store,
      badge: "Immediate Dispatch",
    },
    {
      title: "Restaurants & Dining",
      role: "Line Cooks, Dishwashers & Bussers",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
      icon: UtensilsCrossed,
      badge: "Same-Day Dispatch",
    },
    {
      title: "Petrol Stations",
      role: "Pump Attendants & Station Staff",
      img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=700&q=80",
      icon: Fuel,
      badge: "Day & Night Shifts",
    },
    {
      title: "Warehouses & Freight",
      role: "Container Unloaders & Forklift Hands",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
      icon: Truck,
      badge: "Heavy Shift Hands",
    },
    {
      title: "Facilities & Sanitation",
      role: "Commercial Janitors & Sanitizers",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
      icon: Sparkles,
      badge: "Sanitization Crews",
    },
    {
      title: "Storefront Security",
      role: "Access Control & Door Guards",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=700&q=80",
      icon: ShieldCheck,
      badge: "100% Vetted",
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans'] min-h-screen">
      
      {/* ── Visual Hero Banner ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 border-b border-gray-100 bg-white">
        <div className="w-full text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]">
            <Building2 className="w-4 h-4 text-[#0066FF]" />
            <span>For Local Storefront Operators & Employers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#0A1628] font-['Montserrat']">
            Never Let An Empty Shift Cost You Revenue.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Instant frontline staff for supermarkets, dining, fuel stations, and logistics. Pre-vetted neighborhood workers on direct employer terms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenCallModal("contractor")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-white bg-[#0066FF] hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Dispatch to Staff Shift</span>
            </button>
            <button
              onClick={() => onNavigate("roles")}
              className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>Explore Roles & Duties</span>
              <ArrowRight className="w-4 h-4 text-[#0066FF]" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3 Visual Core Guarantees (Picture First) ── */}
      <section className="py-16 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="rounded-3xl bg-blue-50/70 border border-blue-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">Same-Day Staffing</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                When absences hit at opening time, our dispatch coordinates verified local workers ready for immediate arrival.
              </p>
            </div>
            <div className="text-xs font-bold text-[#0066FF] uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Immediate Placement Ready
            </div>
          </div>

          <div className="rounded-3xl bg-emerald-50/70 border border-emerald-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">100% Background Screened</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Every worker undergoes government identity verification, right-to-work checks, and criminal screening before site arrival.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Zero Security Risk
            </div>
          </div>

          <div className="rounded-3xl bg-amber-50/70 border border-amber-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <RefreshCw className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">30-Day Free Replacement</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                If any placed worker leaves or is not the right operational fit within 30 days, we dispatch an immediate replacement at zero charge.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> 100% Guaranteed Fit
            </div>
          </div>

        </div>
      </section>

      {/* ── Visual Trade Gallery (Pictures Over Text) ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Physical Storefront Sectors</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1628] font-['Montserrat']">
              Frontline Crew Ready for Dispatch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {visualIndustries.map((ind) => (
              <div key={ind.title} className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ind.img}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold text-gray-900 shadow-sm backdrop-blur-md">
                    {ind.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-2">
                    <ind.icon className="w-5 h-5 text-white shrink-0" />
                    <span className="font-bold text-base text-white">{ind.title}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <p className="text-sm font-semibold text-gray-800">{ind.role}</p>
                  <button
                    onClick={() => onOpenCallModal("contractor")}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gray-50 hover:bg-[#0066FF] hover:text-white border border-gray-200 hover:border-[#0066FF] text-gray-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request This Crew</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct Dispatch Call CTA ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-blue-600/30 text-[#00D4FF] flex items-center justify-center mx-auto border border-blue-400/40">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat']">
            Talk to a Dispatch Coordinator Now
          </h2>
          <p className="text-base text-slate-300">
            Tell us your store address, shift window, and role needed. We handle matching and verification immediately.
          </p>
          <div className="pt-2">
            <a
              href="tel:18005226872"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span>Call 1 (800) 522-6872 (24/7 Line)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ForBusinessesPage;
