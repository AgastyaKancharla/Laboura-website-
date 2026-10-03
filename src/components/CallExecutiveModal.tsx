import React, { useState } from "react";
import { PhoneCall, X, ShieldCheck, Clock, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface CallExecutiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  callerRole?: "general" | "contractor" | "worker" | "investor";
}

export function CallExecutiveModal({ isOpen, onClose, callerRole = "general" }: CallExecutiveModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: callerRole === "contractor" ? "General Contractor / Builder" : callerRole === "worker" ? "Tradesperson / Laborer" : callerRole === "investor" ? "Institutional Investor / Partner" : "General Inquiry",
    urgency: "Same-Day Priority Response",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-2xl overflow-hidden font-['Montserrat']">
        {/* Glowing Top Edge */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-[#FF8A00]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-blue-50 text-[#0066FF] rounded-full border border-blue-200">
                Direct Line • No Bot Routing
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                Speak Directly with Leadership
              </h3>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Laboura operates on direct human accountability. Whether you need an emergency 10-man demolition squad on site tomorrow, wish to join as a verified tradesman, or are reviewing our investment thesis:
          </p>

          {/* Primary Instant Dial Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Toll-Free 24/7 Operations & Executive Line
              </div>
              <a
                href="tel:18005226872"
                className="text-xl sm:text-2xl font-black text-gray-900 hover:text-[#0066FF] transition-colors tracking-tight flex items-center gap-2"
              >
                <span>Connect With Executive Dispatch</span>
              </a>
              <div className="text-[11px] text-[#0066FF] font-medium mt-1">
                Extension: 1 for Jobsite Dispatch • 2 for Workers • 3 for Investors
              </div>
            </div>

            <a
              href="tel:18005226872"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all text-center whitespace-nowrap"
            >
              Call Now
            </a>
          </div>

          {/* Instant Callback Alternative */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-gray-100">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center justify-between">
                <span>Or Request an Immediate Callback</span>
                <span className="text-[#0066FF] text-[11px] font-normal">Average callback: 4 mins</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 focus:border-[#0066FF] rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 font-medium">Direct Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 focus:border-[#0066FF] rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 font-medium">You Are A</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 focus:border-[#0066FF] rounded-lg text-sm text-gray-900 outline-none"
                  >
                    <option value="General Contractor / Builder">General Contractor / Builder</option>
                    <option value="Tradesperson / Laborer">Tradesperson / Laborer</option>
                    <option value="Institutional Investor / Partner">Institutional Investor / Partner</option>
                    <option value="Subcontractor / Project Mgr">Subcontractor / Project Mgr</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 font-medium">Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 focus:border-[#0066FF] rounded-lg text-sm text-gray-900 outline-none"
                  >
                    <option value="Same-Day Priority Response">Same-Day Priority Response</option>
                    <option value="Today (Within 2 hours)">Today (Within 2 hours)</option>
                    <option value="Tomorrow Morning">Tomorrow Morning</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:from-[#0052CC] hover:to-[#00B4D8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Request Immediate Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="py-6 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-gray-900">Callback Request Confirmed</h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. An executive dispatch superintendent has been notified and will call you directly at <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-100 text-center text-[10px] text-gray-500 font-medium">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>24/7/365 On-Duty</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Senior Staff Only</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Direct Action</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
