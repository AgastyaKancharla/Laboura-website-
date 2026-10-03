import React from "react";
import { PageId } from "../components/Navbar";
import {
  Heart,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Flame,
  PhoneCall,
  CheckCircle2,
  Phone,
  Sparkles,
  MapPin,
  TrendingUp,
  Compass,
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function AboutPage({ onNavigate, onOpenCallModal }: AboutPageProps) {
  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans'] min-h-screen">
      
      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 1: THE SPARK (5:00 AM ON THE CORNER)
          Full-width visual story opening
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 border-b border-gray-100 bg-white w-full">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]">
              <Flame className="w-4 h-4 text-[#0066FF]" />
              <span>The Story of Laboura</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#0A1628] font-['Montserrat']">
              Born at 5:00 AM on a Freezing Street Corner.
            </h1>

            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Every city in America runs on physical labor. But the way workers find work, and the way stores find help, has been broken for 50 years.
            </p>
          </div>

          {/* Side-by-side Visual Tale: The Old Corner vs The Laboura Way */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 w-full items-center">
            
            {/* The Old Reality */}
            <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm p-6 sm:p-10 space-y-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80"
                  alt="Cold morning street corner"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-6">
                  <span className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-black tracking-wider uppercase">
                    The Problem: 2023 & Before
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                  Hardworking hands waiting in the cold.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                  At 5:00 AM across every industrial corridor, honest men and women gathered on street corners hoping for an unmarked pickup truck to offer a shift. Meanwhile, three blocks away, a supermarket manager was panicking with empty aisles and closed checkout lines because three workers couldn't make it.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Uncertainty for workers • Shuttered doors for local businesses
                </div>
              </div>
            </div>

            {/* The Laboura Realization */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 border-2 border-blue-200 shadow-lg p-6 sm:p-10 space-y-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
                  alt="Dignified handshake and placement"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent flex items-end p-6">
                  <span className="px-3 py-1.5 rounded-lg bg-[#0066FF] text-white text-xs font-black tracking-wider uppercase">
                    The Conviction: The Laboura Way
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                  Physical work is the foundation of civilization.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                  We refused to accept that software was built for tech workers while frontline labor was left behind. We set out to create a verified bridge: where workers get fair, dignified shifts within 2 miles of home, and businesses get dependable staff in minutes.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Direct neighborhood matching • Dignified, steady livelihoods
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 2: OUR 3 CORE BELIEFS (VISUAL STORY PILLARS)
          Picture-driven so anyone can understand immediately
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100 w-full">
        <div className="w-full space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0A1628] font-['Montserrat']">
              Three Convictions That Drive Every Decision
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              We did not build Laboura to be another corporate staffing broker. We built a permanent home for frontline workforce dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            {/* Pillar 1 */}
            <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0066FF] flex items-center justify-center font-bold text-2xl shadow-inner">
                  01
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80"
                    alt="Construction and craft labor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold">Hands That Build</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                    Hands Over Headaches
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                    The grocery restocker, the line cook, the fuel attendant, the forklift operator—these people keep our world alive. They deserve the easiest, fastest access to good work.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                Bedrock of Society
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                  02
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=700&q=80"
                    alt="Storefront cashier and counter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold">Local Storefronts</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                    Neighborhood-First Economy
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                    When shifts are staffed locally, workers commute less than 2 miles, spend their earnings at local shops, and store owners get neighbors they know and trust.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Hyper-Local Impact
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl shadow-inner">
                  03
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=700&q=80"
                    alt="Mutual handshake"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold">Honest Alignment</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                    Success-Based Partnership
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                    We only succeed when both sides win: the worker gains confirmed earnings, and the business secures a reliable teammate. Both sides invest a fair fee upon confirmed placement.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 text-xs font-bold text-amber-700 uppercase tracking-wider">
                Fair & Aligned Incentives
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 3: THE COMMUNITY WE ARE BUILDING
          Visual gallery showing workers and real store businesses
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100 w-full">
        <div className="w-full space-y-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Real Faces, Real Trades
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0A1628] font-['Montserrat']">
              Every Shift Tells a Story of Hard Work.
            </h2>
            <p className="text-base text-gray-600 font-medium max-w-2xl mx-auto">
              From dawn bakery deliveries to midnight warehouse unloads, our community is active 24/7 across 10 vital frontline industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
            <div className="rounded-3xl overflow-hidden relative group h-56 sm:h-72 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80"
                alt="Logistics team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-sm sm:text-base">Freight Logistics</div>
                <div className="text-xs text-blue-300">Fast morning staging</div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden relative group h-56 sm:h-72 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80"
                alt="Commercial Kitchen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-sm sm:text-base">Kitchen & Dining</div>
                <div className="text-xs text-blue-300">Dinner rush coverage</div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden relative group h-56 sm:h-72 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=700&q=80"
                alt="Supermarket restock"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-sm sm:text-base">Retail Grocery</div>
                <div className="text-xs text-blue-300">Overnight inventory</div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden relative group h-56 sm:h-72 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=700&q=80"
                alt="Sanitation & Facility"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-sm sm:text-base">Facility Hygiene</div>
                <div className="text-xs text-blue-300">Hospital-grade clean</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 4: DIRECT HUMAN DISPATCH (1-TAP ACTION)
          No forms required, immediate phone dialer
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white text-center w-full relative overflow-hidden">
        <div className="w-full space-y-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-blue-600/30 text-[#00D4FF] flex items-center justify-center mx-auto border border-blue-400/40">
            <PhoneCall className="w-8 h-8 animate-pulse" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat']">
              Be Part of the Laboura Movement.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
              Whether you need dependable hands to keep your business running or you're ready to take on verified local shifts, our coordinators are here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="tel:18005226872"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span>Call 1 (800) 522-6872</span>
            </a>

            <button
              onClick={() => onOpenCallModal("general")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all"
            >
              Request Free Dispatch Callback
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
