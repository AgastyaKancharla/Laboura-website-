import React, { useState } from "react";
import { Modal } from "./ui/modal";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface WorkerApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkerApplyModal({ isOpen, onClose }: WorkerApplyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryTrade, setPrimaryTrade] = useState("Supermarkets & Retail");
  const [hasSteelToe, setHasSteelToe] = useState(true);
  const [hasSafetyGear, setHasSafetyGear] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Join the Laboura Workforce">
      {submitted ? (
        <div className="py-6 text-center space-y-4 font-['Montserrat'] animate-fade-in-long">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900">Application Received, {fullName}!</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium">
            We sent an SMS verification code to <strong>{phone}</strong>. You'll receive our first shift alert matching {primaryTrade} in zip code {zipCode} today.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-xs font-semibold text-gray-500 space-y-1">
            <div className="text-emerald-600">PLACEMENT STATUS: Verified Candidate</div>
            <div className="text-gray-400 text-[11px]">Wages paid directly by employer according to store or company payroll terms.</div>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-['Montserrat']">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2.5 text-xs text-blue-700">
            <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
            <span>
              <strong>Success-Based Placement:</strong> Connect directly with local businesses. Small placement fee only when hired.
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name *</label>
              <input
                required
                placeholder="Carlos Rodriguez"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone (For Shift SMS) *</label>
                <input
                  required
                  type="tel"
                  placeholder="(555) 781-9920"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Home Zip Code *</label>
                <input
                  required
                  placeholder="07102"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Primary Industry Interest</label>
              <select
                value={primaryTrade}
                onChange={(e) => setPrimaryTrade(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3 text-xs text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Supermarkets & Retail">Supermarkets & Retail Grocery</option>
                <option value="Restaurants & Dining">Restaurants & Commercial Dining</option>
                <option value="Petrol Stations & Forecourts">Petrol Stations & Forecourts</option>
                <option value="Warehouses & Logistics">Warehouses & Freight Logistics</option>
                <option value="Facilities & Janitorial">Facilities & Janitorial</option>
                <option value="Security & Storefront">Security & Loss Prevention</option>
                <option value="Salons & Personal Care">Salons & Personal Care</option>
                <option value="Painters & Handymen">Painters & Maintenance Handymen</option>
                <option value="Landscaping & Grounds">Landscaping & Grounds</option>
                <option value="Events & Staging">Events, Staging & Venue Operations</option>
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSteelToe}
                  onChange={(e) => setHasSteelToe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 bg-white text-emerald-500 focus:ring-emerald-500"
                />
                <span>I have reliable transportation to local shifts</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSafetyGear}
                  onChange={(e) => setHasSafetyGear(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 bg-white text-emerald-500 focus:ring-emerald-500"
                />
                <span>I am available for same-day or early morning shifts</span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm transition-all"
            >
              Submit Application & Get Shift Alerts
            </button>
            <p className="text-[11px] text-center text-gray-400 mt-2 font-medium">
              Direct employer hire • Fee only upon verified placement • We respect your hard work
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default WorkerApplyModal;
