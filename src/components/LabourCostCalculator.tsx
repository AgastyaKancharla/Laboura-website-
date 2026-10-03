import React, { useState } from "react";
import { Calculator, Users, Clock, Zap, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface TradeOption {
  id: string;
  name: string;
  hourlyRate: number;
  description: string;
}

const TRADES: TradeOption[] = [
  { id: "demolition", name: "Heavy Demolition & Cleanout", hourlyRate: 34, description: "Sledgehammer, jackhammer, drywall tearout, concrete disposal." },
  { id: "concrete", name: "Concrete & Rebar Muscle", hourlyRate: 38, description: "Form setup, slab pouring, rebar placement, troweling assistance." },
  { id: "warehouse", name: "Warehouse & Freight Rigging", hourlyRate: 29, description: "Pallet unstacking, container de-stuffing, heavy freight loading." },
  { id: "carpentry", name: "Rough Framing & Site Carpentry", hourlyRate: 36, description: "Lumber handling, truss setting, framing labor, backing install." },
  { id: "general", name: "General Heavy Laborer", hourlyRate: 26, description: "Material staging, site clean-up, trench digging, manual transport." },
  { id: "equipment", name: "Equipment & Forklift Operator", hourlyRate: 42, description: "OSHA certified telehandler, skid steer, high-bay forklift." },
];

interface LabourCostCalculatorProps {
  onBookWithConfig?: (config: { trade: string; crewSize: number; hours: number; isEmergency: boolean; totalCost: number }) => void;
}

export function LabourCostCalculator({ onBookWithConfig }: LabourCostCalculatorProps) {
  const [selectedTrade, setSelectedTrade] = useState<string>("demolition");
  const [crewSize, setCrewSize] = useState<number>(4);
  const [shiftHours, setShiftHours] = useState<number>(8);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  const currentTrade = TRADES.find((t) => t.id === selectedTrade) || TRADES[0];
  const emergencySurcharge = isEmergency ? 1.25 : 1.0;
  const effectiveRate = Math.round(currentTrade.hourlyRate * emergencySurcharge);
  const totalCost = effectiveRate * crewSize * shiftHours;
  const workerCompSavings = Math.round(totalCost * 0.18);

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm font-['Montserrat'] relative overflow-hidden text-gray-900">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 mr-1 text-[#0066FF]" /> REAL-TIME RATE ESTIMATOR
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Transparent Crew Dispatch Pricing
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Direct, transparent pricing. Complete W-2, general liability, and worker's comp included.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsEmergency(false)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              !isEmergency
                ? "bg-[#0066FF] text-white shadow-md shadow-blue-600/20"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Scheduled Dispatch
          </button>
          <button
            type="button"
            onClick={() => setIsEmergency(true)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
              isEmergency
                ? "bg-[#FF8A00] text-white shadow-md shadow-orange-600/20"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Zap className="w-3 h-3 text-white" />
            Rush Under 60m (+25%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Trade Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              1. Select Trade Specialty
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRADES.map((trade) => {
                const isSelected = selectedTrade === trade.id;
                return (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => setSelectedTrade(trade.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-[#0066FF] bg-blue-50 shadow-sm ring-1 ring-[#0066FF]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm font-bold ${isSelected ? "text-gray-900" : "text-gray-700"}`}>{trade.name}</span>
                      <span className="text-xs font-bold text-[#0066FF]">
                        ${trade.hourlyRate}/hr
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                      {trade.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crew Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0066FF]" />
                2. Crew Size: <span className="text-gray-900 font-extrabold">{crewSize} Hard Laborers</span>
              </label>
              <span className="text-xs font-bold text-[#0066FF]">{crewSize <= 2 ? "Spot Crew" : crewSize <= 6 ? "Standard Squad" : "Full Industrial Division"}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={crewSize}
              onChange={(e) => setCrewSize(parseInt(e.target.value))}
              className="w-full accent-[#0066FF] h-2.5 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1">
              <span>1 Worker</span>
              <span>5 Workers</span>
              <span>10 Workers</span>
              <span>20+ Workers</span>
            </div>
          </div>

          {/* Shift Hours Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                3. Shift Length: <span className="text-gray-900 font-extrabold">{shiftHours} Hours</span>
              </label>
              <span className="text-xs font-semibold text-gray-500">Total Man-Hours: {crewSize * shiftHours} hrs</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[4, 8, 10, 12].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setShiftHours(hours)}
                  className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                    shiftHours === hours
                      ? "border-[#0066FF] bg-[#0066FF] text-white shadow-md shadow-blue-600/20"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {hours} Hours {hours === 4 ? "(Half)" : hours === 8 ? "(Full)" : "(Heavy)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Total Summary Card */}
        <div className="lg:col-span-5 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col justify-between text-gray-900 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Estimated Total</span>
              <span className="text-xs text-[#0066FF] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> GUARANTEED ARRIVAL
              </span>
            </div>

            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                ${totalCost.toLocaleString()}
                <span className="text-sm font-semibold text-gray-500 ml-2">USD</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                ${effectiveRate}/hr per worker × {crewSize} workers × {shiftHours} hours
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Statutory Workers' Comp:</span>
                <span className="text-[#0066FF] font-bold">100% INCLUDED ($0)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">$5M General Liability:</span>
                <span className="text-[#0066FF] font-bold">100% INCLUDED ($0)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">OSHA Safety Gear (Hard Hat/Vest):</span>
                <span className="text-amber-500 font-bold">100% INCLUDED ($0)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">2-Hour Fit Guarantee:</span>
                <span className="text-orange-500 font-bold">FREE REPLACEMENT</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white border border-gray-100 text-[11px] text-gray-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#0066FF] mt-0.5" />
              <span>
                By using Laboura, you save an estimated <strong className="text-amber-500">${workerCompSavings}</strong> in employer payroll overhead, insurance binders, and temp agency gouging.
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              style={{
                backgroundImage: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
              }}
              onClick={() => {
                if (onBookWithConfig) {
                  onBookWithConfig({
                    trade: currentTrade.name,
                    crewSize,
                    hours: shiftHours,
                    isEmergency,
                    totalCost,
                  });
                }
              }}
            >
              Dispatch This {crewSize}-Person Crew
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-gray-400 font-medium mt-2">
              No credit card required to request • Verified dispatch confirmation in 8 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabourCostCalculator;
