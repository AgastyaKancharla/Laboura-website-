import React from "react";
import { PageId } from "../components/Navbar";
import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Store,
  UtensilsCrossed,
  Fuel,
  Sparkles,
  Scissors,
  ArrowRight,
  BadgeCheck,
  DollarSign,
  Check,
  Heart,
  Phone,
  Truck,
} from "lucide-react";

interface ForWorkersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function ForWorkersPage({ onNavigate, onOpenCallModal }: ForWorkersPageProps) {
  const visualJobs = [
    {
      title: "Supermarket & Retail",
      role: "Shelf Stockers, Cashiers & Cart Handlers",
      img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=700&q=80",
      icon: Store,
      badge: "Local Storefronts",
    },
    {
      title: "Commercial Kitchens",
      role: "Line Cooks, Dishwashers & Food Runners",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
      icon: UtensilsCrossed,
      badge: "Regular Kitchen Shifts",
    },
    {
      title: "Petrol Stations",
      role: "Pump Attendants & Shift Staff",
      img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=700&q=80",
      icon: Fuel,
      badge: "Flexible Schedules",
    },
    {
      title: "Warehouses & Freight",
      role: "Freight Handlers, Forklift & Unloaders",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
      icon: Truck,
      badge: "Steady Hours",
    },
    {
      title: "Facilities & Sanitation",
      role: "Commercial Cleaners & Sanitizers",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
      icon: Sparkles,
      badge: "Evening & Day Shifts",
    },
    {
      title: "Salons & Grooming",
      role: "Barbers, Stylists & Assistants",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80",
      icon: Scissors,
      badge: "Licensed Trades",
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans'] min-h-screen">
      
      {/* ── Visual Hero Banner ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 border-b border-gray-100 bg-white">
        <div className="w-full text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>For Verified Local Job Seekers • Success-Based Placement</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#0A1628] font-['Montserrat']">
            Real Local Work. Direct Store Payroll. Fair Placement.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Find steady frontline shifts at supermarkets, dining establishments, and warehouses in your neighborhood. You are paid directly by the employer on agreed payroll terms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenCallModal("worker")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Placement Line</span>
            </button>
            <button
              onClick={() => onNavigate("roles")}
              className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>View Open Roles</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3 Visual Worker Promises (Picture First) ── */}
      <section className="py-16 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="rounded-3xl bg-emerald-50/70 border border-emerald-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">Direct Store Payroll</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Direct employer pay. No hidden check-cashing markups or predatory middleman cuts. You receive full agreed wages directly from the store.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Direct Employer Pay
            </div>
          </div>

          <div className="rounded-3xl bg-blue-50/70 border border-blue-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">Work Near Your Home</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                We match you with storefronts within your local neighborhood. Short travel times, sleep in your own bed, zero long commutes.
              </p>
            </div>
            <div className="text-xs font-bold text-[#0066FF] uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Neighborhood Geofencing
            </div>
          </div>

          <div className="rounded-3xl bg-purple-50/70 border border-purple-200 p-8 flex flex-col justify-between space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A1628] font-['Montserrat']">Job or Your Money Back</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                We stand behind every job seeker we take on. If we can't place you in a job, we refund your money in full.
              </p>
            </div>
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Placement Guarantee
            </div>
          </div>

        </div>
      </section>

      {/* ── Visual Job Categories (Pictures First) ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Local Opportunities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A1628] font-['Montserrat']">
              Open Positions in Your Neighborhood
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {visualJobs.map((job) => (
              <div key={job.title} className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={job.img}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold text-gray-900 shadow-sm backdrop-blur-md">
                    {job.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-2">
                    <job.icon className="w-5 h-5 text-white shrink-0" />
                    <span className="font-bold text-base text-white">{job.title}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <p className="text-sm font-semibold text-gray-800">{job.role}</p>
                  <button
                    onClick={() => onOpenCallModal("worker")}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gray-50 hover:bg-emerald-600 hover:text-white border border-gray-200 hover:border-emerald-600 text-gray-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply for Shifts (Free)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct Worker Dial CTA ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat']">
            Ready to Work? Call Placement Directly
          </h2>
          <p className="text-base text-slate-300">
            No long applications. Our coordinators verify your ID and right-to-work, then match you with shifts starting this week.
          </p>
          <div className="pt-2">
            <a
              href="tel:18005226872"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span>Call 1 (800) 522-6872 (Press 2)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ForWorkersPage;
