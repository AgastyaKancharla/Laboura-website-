import React, { useState } from "react";
import { Modal } from "./ui/modal";
import { CheckCircle2, Clock, MapPin, ShieldAlert } from "lucide-react";

export interface ShiftItem {
  id: string;
  title: string;
  trade: string;
  location: string;
  payRate: string;
  startTime: string;
  duration: string;
  spotsLeft: number;
  contractor: string;
  ppeRequired: string[];
}

interface ClaimShiftModalProps {
  shift: ShiftItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClaimShiftModal({ shift, isOpen, onClose }: ClaimShiftModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [workerName, setWorkerName] = useState("");
  const [phone, setPhone] = useState("");

  if (!shift) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title={`Claim Shift: ${shift.title}`}>
      {submitted ? (
        <div className="py-6 text-center space-y-4 font-['Montserrat'] animate-fade-in-long">
          <div className="w-16 h-16 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900">Shift Confirmed, {workerName}!</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium">
            You are locked in for <strong>{shift.title}</strong> at <strong>{shift.location}</strong> on <strong>{shift.startTime}</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-left text-xs font-semibold space-y-1.5 text-gray-500">
            <div><span className="text-gray-400">PAYOUT:</span> <strong className="text-[#0066FF]">{shift.payRate}</strong> (Direct Employer Pay)</div>
            <div><span className="text-gray-400">SUPERINTENDENT SMS:</span> Sent to {phone}</div>
            <div><span className="text-gray-400">REQUIRED GEAR:</span> {shift.ppeRequired.join(", ")}</div>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-95 shadow-md shadow-blue-500/20 transition-all"
          >
            Back to Shift Board
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-['Montserrat']">
          {/* Shift Snapshot Card */}
          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-100">
                {shift.trade}
              </span>
              <span className="text-sm font-black text-[#0066FF]">
                {shift.payRate}
              </span>
            </div>
            <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{shift.startTime} ({shift.duration})</span>
            </div>
            <div className="text-xs text-gray-400 font-medium flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{shift.location} • Employer: {shift.contractor}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
              <input
                required
                placeholder="Marcus Henderson"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone (For Site Dispatch SMS) *</label>
              <input
                required
                type="tel"
                placeholder="(555) 234-8899"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 rounded-xl bg-white border border-gray-200 px-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              By claiming, you commit to arriving on-time with required gear ({shift.ppeRequired.join(", ")}).
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:opacity-95 shadow-md shadow-blue-500/20 transition-all"
            >
              Lock In Shift ({shift.spotsLeft} spots remaining)
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default ClaimShiftModal;
