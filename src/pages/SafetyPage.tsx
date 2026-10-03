import React from "react";
import { Button } from "../components/ui/button";
import {
  ShieldCheck,
  HardHat,
  AlertTriangle,
  FileCheck,
  HeartPulse,
  Flame,
  CheckCircle2,
  PhoneCall,
  Lock,
} from "lucide-react";

export function SafetyPage() {
  const ppeItems = [
    {
      gear: "Safety Footwear",
      spec: "ASTM F2413-18 Rated Steel-Toe or Composite-Toe",
      req: "Mandatory for 100% of job sites before entry.",
    },
    {
      gear: "Head Protection",
      spec: "ANSI/ISEA Z89.1 Type 1 Class E / G Hard Hats",
      req: "Inspected for shell integrity and suspension clearance.",
    },
    {
      gear: "High-Visibility Attire",
      spec: "ANSI/ISEA 107-2020 Class 2 or Class 3 Reflective Vests",
      req: "Required around mobile machinery, traffic, and cranes.",
    },
    {
      gear: "Eye & Face Shielding",
      spec: "ANSI Z87.1+ Impact-Rated Safety Glasses",
      req: "Side-shield protection required during grinding, demo, and chipping.",
    },
    {
      gear: "Hand Protection",
      spec: "ANSI/ISEA 105 Cut Level A4+ Heavy Duty Work Gloves",
      req: "Matched to specific hazard (chemical, cut, thermal, or vibration).",
    },
    {
      gear: "Hearing Protection",
      spec: "NRR 28+ dB Earplugs or Earmuffs",
      req: "Mandatory when working adjacent to jackhammers, saws, or heavy diesel.",
    },
  ];

  return (
    <div className="w-full bg-[#F4F7FB] text-[#0A1B3D] font-['Montserrat'] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            SAFETY SHIELD & COMPLIANCE PROTOCOL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0A1B3D]">
            Every Worker Comes Home Safe. Zero Compromises.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Hard labor demands intense respect for safety. From mandatory OSHA-10 certifications to our $5,000,000 commercial liability umbrella, Laboura sets the industry benchmark for worksite protection.
          </p>
        </div>

        {/* 3 Main Pillars of Safety */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
              <FileCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#0A1B3D]">Verified OSHA Credentials</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We verify Department of Labor OSHA-10 and OSHA-30 cards directly against national databases. No counterfeit cards. All trade certifications are digitally timestamped and renewed annually.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/15 flex items-center justify-center text-[#0066FF]">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#0A1B3D]">$5,000,000 Insurance Policy</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Every dispatched crew member is covered under Laboura's statutory Workers' Compensation insurance policy and our $5M General Liability umbrella underwritten by A-rated national carriers.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF8A00]/15 flex items-center justify-center text-[#FF8A00]">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#0A1B3D]">Heat Stress & Hydration Rule</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Strict compliance with OSHA heat illness prevention standards. Dispatched squads on outdoor sites are guaranteed mandatory hydration intervals and shade access during high-heat advisories.
            </p>
          </div>
        </div>

        {/* PPE Checklist Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/15 text-[#FF8A00] text-xs font-bold uppercase tracking-wider mb-2">
              MANDATORY STANDARD
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A1B3D]">
              Laboura PPE & Hazard Protection Matrix
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Laborers dispatched through Laboura must arrive with these certified items or dispatch supplies them on-site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ppeItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-[#F4F7FB] space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                  <span className="text-sm font-bold text-[#0A1B3D]">{item.gear}</span>
                </div>
                <div className="text-xs font-bold text-[#0066FF]">{item.spec}</div>
                <p className="text-xs text-slate-600 font-medium">{item.req}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Incident Response in Dark Navy */}
        <div className="p-8 rounded-2xl bg-[#0A1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#0066FF]/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFC107] text-xs uppercase font-bold tracking-wider">
              <AlertTriangle className="w-4 h-4 text-[#FF8A00]" />
              24/7 Rapid Safety Incident Dispatch Line
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Immediate Safety Officer Intervention
            </h3>
            <p className="text-xs text-slate-300 max-w-xl font-medium">
              If an unsafe condition exists or an accident occurs on any affiliated job site, call our emergency safety hotline immediately for immediate coordinator dispatch.
            </p>
          </div>
          <a
            href="tel:18005555227"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF8A00] hover:bg-[#ff9d24] text-white font-bold text-sm shadow-md transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            (800) 555-5227 EXT 9
          </a>
        </div>
      </div>
    </div>
  );
}

export default SafetyPage;
