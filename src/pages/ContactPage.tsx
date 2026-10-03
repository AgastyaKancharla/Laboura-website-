import React, { useState } from "react";
import { PageId } from "../components/Navbar";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Send,
  Sparkles,
  Phone,
} from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function ContactPage({ onNavigate, onOpenCallModal }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [roleType, setRoleType] = useState("business");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans'] min-h-screen">
      
      {/* ── Visual Hero Banner ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 border-b border-gray-100 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]">
            <PhoneCall className="w-4 h-4" />
            <span>24/7 Universal Dispatch Line</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#0A1628] font-['Montserrat']">
            Talk to a Human Coordinator in 60 Seconds.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            No endless email tickets or chatbots. Every inquiry is answered directly over the phone by dedicated placement staff.
          </p>

          <div className="pt-2">
            <a
              href="tel:18005226872"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span>Call Now: 1 (800) 522-6872</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2 Direct Channels (Business vs Worker) ── */}
      <section className="py-16 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Business Channel */}
          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/70 border-2 border-blue-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                Press 1: I Need Staff
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                For supermarket managers, restaurant operators, warehouse supervisors, and facility managers who need same-day frontline crews.
              </p>
            </div>

            <button
              onClick={() => onOpenCallModal("contractor")}
              className="w-full py-4 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connect with Business Staffing</span>
            </button>
          </div>

          {/* Worker Channel */}
          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-50/70 border-2 border-emerald-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-[#0A1628] font-['Montserrat']">
                Press 2: I Need Work
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                For job seekers looking for verified shifts in their local neighborhood. Direct employer payroll, verified shifts, fair placement terms.
              </p>
            </div>

            <button
              onClick={() => onOpenCallModal("worker")}
              className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connect with Placement Coordinator</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── Quick Callback Form ── */}
      <section className="py-20 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Fast Dispatch Callback</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A1628] font-['Montserrat']">
              Request a Quick Return Call
            </h2>
            <p className="text-sm text-gray-500">
              Leave your phone number and a coordinator will call you back immediately.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-emerald-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-base">Callback Request Dispatched!</div>
              <p className="text-xs text-emerald-700">A coordinator is dialing your number now.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRoleType("business")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    roleType === "business"
                      ? "bg-[#0066FF] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  I'm a Store Owner
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType("worker")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    roleType === "worker"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  I'm Looking for Work
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Direct Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0A1628] hover:bg-[#0066FF] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Immediate Callback</span>
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

export default ContactPage;
