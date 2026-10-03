import React, { useState } from "react";
import { Modal } from "./ui/modal";
import { CheckCircle2, Zap } from "lucide-react";

interface RequestCrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: {
    trade: string;
    crewSize: number;
    hours: number;
    isEmergency: boolean;
    totalCost: number;
  } | null;
}

export function RequestCrewModal({ isOpen, onClose, initialConfig }: RequestCrewModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [trade, setTrade] = useState(initialConfig?.trade || "Heavy Demolition & Cleanout");
  const [crewSize, setCrewSize] = useState(initialConfig?.crewSize || 4);
  const [startDate, setStartDate] = useState("Tomorrow 7:00 AM");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Request Workforce Crew Dispatch">
      {submitted ? (
        <div className="py-6 text-center space-y-4 font-['Montserrat'] animate-fade-in-long">
          <div className="w-16 h-16 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900">Crew Dispatch Request Broadcasted</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium">
            Our Central Dispatch Coordinator is currently assigning <strong>{crewSize} verified {trade} workers</strong> to your job site at <strong>{siteAddress || "your location"}</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-left text-xs font-semibold space-y-1.5 text-gray-500">
            <div><span className="text-gray-400">DISPATCH TICKET:</span> <span className="text-[#0066FF] font-mono">#LAB-{(Math.random() * 90000 + 10000).toFixed(0)}</span></div>
            <div><span className="text-gray-400">CONTACT PHONE:</span> {phone || "(Pending confirmation)"}</div>
            <div><span className="text-gray-400">ESTIMATED CREW CALL TIME:</span> <span className="text-emerald-600">Within 6 minutes</span></div>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-95 shadow-md shadow-blue-500/20 transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-['Montserrat']">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2.5 text-xs text-[#0066FF] font-semibold">
            <Zap className="w-4 h-4 text-[#0066FF] shrink-0" />
            <span>
              Real-time dispatch guarantee: Vetted workers on-site with full PPE & W-2 liability coverage.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company / GC Name *</label>
              <input
                required
                placeholder="Apex Commercial Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Superintendent / Contact *</label>
              <input
                required
                placeholder="Marcus Vance"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Direct Phone (For Dispatch SMS) *</label>
              <input
                required
                type="tel"
                placeholder="(555) 349-2091"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Job Site Address / Facility *</label>
              <input
                required
                placeholder="740 Commercial Blvd, Gate 3"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Trade Discipline</label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-2 text-xs text-gray-800 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              >
                <option value="Supermarket & Retail Staging">Retail Grocery Staging</option>
                <option value="Commercial Kitchen Hand">Kitchen Hand & Prep</option>
                <option value="Forecourt & Fuel Service">Forecourt & Fuel</option>
                <option value="Warehouse Freight Cross-Dock">Warehouse Freight</option>
                <option value="Facilities & Industrial Janitorial">Facilities Janitorial</option>
                <option value="Heavy Demolition & Cleanout">Heavy Demolition</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Crew Size</label>
              <select
                value={crewSize}
                onChange={(e) => setCrewSize(parseInt(e.target.value))}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-2 text-xs text-gray-800 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              >
                <option value={1}>1 Crew Member</option>
                <option value={2}>2 Crew Members</option>
                <option value={4}>4 Crew Members (Standard Squad)</option>
                <option value={8}>8 Crew Members (Full Shift)</option>
                <option value={12}>12+ Crew Members (Enterprise)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Start Time</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Tomorrow 7:00 AM"
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Specific Tools or Site Requirements</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Pallet jack needed, slip-resistant shoes required, badges checked at entrance..."
              className="w-full rounded-xl bg-white border border-gray-200 p-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-95 shadow-md shadow-blue-500/20 transition-all"
            >
              Transmit Crew Dispatch Order
            </button>
            <p className="text-[11px] text-center text-gray-400 mt-2 font-medium">
              Backed by our 2-hour worker replacement guarantee • Zero cancellation fees up to 2 hrs before shift
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default RequestCrewModal;
