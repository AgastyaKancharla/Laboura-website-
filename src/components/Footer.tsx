import React from "react";
import { ArrowRight, IndianRupee, Mail, PhoneCall, RefreshCw, ShieldCheck } from "lucide-react";
import { PageId } from "./Navbar";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

const PAGES: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "businesses", label: "For Businesses" },
  { id: "workers", label: "For Workers" },
  { id: "roles", label: "Roles" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const PROMISES = [
  { icon: ShieldCheck, color: "text-emerald-500", text: "ID & background-verified workers" },
  { icon: RefreshCw, color: "text-amber-500", text: "30-day free replacement for businesses" },
  { icon: IndianRupee, color: "text-[#0066FF]", text: "Job or full refund for job seekers" },
];

function ColumnTitle({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs flex items-center font-['Montserrat']">
      <span className={`w-2 h-2 rounded-full mr-2.5 ${dot}`} />
      {children}
    </h3>
  );
}

export function Footer({ onNavigate, onOpenCallModal }: FooterProps) {
  return (
    <footer className="relative bg-[#F8F9FB] text-gray-700 font-['Plus_Jakarta_Sans'] border-t border-gray-200">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-blue-600" />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-12 pb-8">
        {/* Brand + actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <button onClick={() => onNavigate("home")} aria-label="Laboura home" className="w-fit">
              <BrandLogo darkVariant={false} />
            </button>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Verified local workers for the businesses that keep India running.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onOpenCallModal("contractor")}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors"
            >
              Hire staff
            </button>
            <button
              onClick={() => onOpenCallModal("worker")}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-colors"
            >
              Find work
            </button>
          </div>
        </div>

        {/* Three short columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr] gap-8 sm:gap-10 py-8 sm:py-10">
          <nav aria-label="Footer">
            <ColumnTitle dot="bg-[#0066FF]">Explore</ColumnTitle>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {PAGES.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate(p.id)}
                    className="group flex items-center text-gray-600 hover:text-[#0066FF] transition-colors"
                  >
                    <ArrowRight
                      size={13}
                      className="opacity-0 -ml-4 mr-1.5 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#0066FF]"
                    />
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle dot="bg-emerald-500">Our promise</ColumnTitle>
            <ul className="mt-5 space-y-3.5">
              {PROMISES.map((p) => (
                <li key={p.text} className="flex items-center gap-3 text-sm text-gray-600">
                  <p.icon size={18} className={`${p.color} shrink-0`} />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle dot="bg-amber-500">Talk to us</ColumnTitle>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="tel:18005226872" className="group flex items-center gap-3 hover:text-[#0066FF] transition-colors">
                  <span className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#0066FF] transition-colors">
                    <PhoneCall size={16} className="text-[#0066FF]" />
                  </span>
                  <span className="font-semibold text-gray-800">1 (800) 522-6872</span>
                </a>
              </li>
              <li>
                <a href="mailto:dispatch@laboura.com" className="group flex items-center gap-3 hover:text-[#0066FF] transition-colors">
                  <span className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#0066FF] transition-colors">
                    <Mail size={16} className="text-[#0066FF]" />
                  </span>
                  <span className="text-gray-600">dispatch@laboura.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Laboura. All rights reserved.</span>
          <span className="flex items-center gap-2 font-semibold text-gray-600">
            Born in India
            <span aria-hidden className="inline-flex h-1 w-6 rounded-full overflow-hidden">
              <span className="flex-1 bg-[#FF9933]" />
              <span className="flex-1 bg-gray-300" />
              <span className="flex-1 bg-[#138808]" />
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
