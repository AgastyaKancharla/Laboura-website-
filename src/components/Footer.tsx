import React from 'react';
import { 
  ShieldCheck, PhoneCall, Mail, MapPin, Award, Scale, 
  Clock, Briefcase, Users, ArrowRight, Send, Globe,
  CheckCircle2, Sparkles
} from 'lucide-react';
import { PageId } from './Navbar';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

export function Footer({ onNavigate, onOpenCallModal }: FooterProps) {
  return (
    <footer className="relative bg-[#F8F9FB] text-gray-700 font-['Plus_Jakarta_Sans'] border-t border-gray-200">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-blue-600" />
      
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <div onClick={() => onNavigate('home')} className="cursor-pointer">
              <BrandLogo darkVariant={false} />
            </div>
            <p className="text-gray-600 leading-relaxed max-w-sm text-sm">
              The on-demand verified frontline workforce platform connecting dedicated local talent with essential businesses across retail, food, facilities, and logistics.
            </p>
            
            <div className="flex flex-col space-y-3 mt-2 text-sm">
              <a href="tel:18005226872" className="flex items-center space-x-3 group hover:text-[#0066FF] transition-colors duration-200">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#0066FF] group-hover:shadow-md transition-all">
                  <PhoneCall size={18} className="text-[#0066FF]" />
                </div>
                <span className="font-semibold text-gray-800">1 (800) 522-6872 (24/7 Dispatch)</span>
              </a>
              <a href="mailto:dispatch@laboura.com" className="flex items-center space-x-3 group hover:text-[#0066FF] transition-colors duration-200">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#0066FF] group-hover:shadow-md transition-all">
                  <Mail size={18} className="text-[#0066FF]" />
                </div>
                <span className="font-medium text-gray-600">dispatch@laboura.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <span className="text-xs">Active Across Metro Dispatch Corridors Nationwide</span>
              </div>
            </div>

            {/* Direct Quick Actions */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => onNavigate('businesses')}
                className="px-4 py-2 bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                Hire Staff
              </button>
              <button
                onClick={() => onNavigate('workers')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                Find Work
              </button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs flex items-center font-['Montserrat']">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] mr-2.5"></span>
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('businesses')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  For Businesses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workers')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  For Job Seekers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('roles')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  All 10 Verticals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  About & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#0066FF] transition-colors duration-200 flex items-center group text-gray-600">
                  <ArrowRight size={14} className="opacity-0 -ml-4 mr-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#0066FF]" />
                  Contact & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Frontline Verticals */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs flex items-center font-['Montserrat']">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5"></span>
              Verticals
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              {[
                "Supermarkets & Retail",
                "Restaurants & Dining",
                "Petrol Stations",
                "Warehouses & Freight",
                "Facilities & Janitorial",
                "Security & Guards",
                "Salons & Barbers",
                "Painters & Handymen",
                "Landscaping Grounds",
                "Events & Venues"
              ].map((vertical) => (
                <li key={vertical}>
                  <button 
                    onClick={() => onNavigate('roles')} 
                    className="hover:text-[#0066FF] transition-colors duration-200 text-left"
                  >
                    {vertical}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs flex items-center font-['Montserrat']">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2.5"></span>
              Trust & Guarantees
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <ShieldCheck size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600">100% ID & Background Vetted Candidates</span>
              </li>
              <li className="flex items-start space-x-3">
                <Award size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600">30-Day Free Replacement Guarantee</span>
              </li>
              <li className="flex items-start space-x-3">
                <Scale size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600">Direct Employer Terms (Zero Wage Cuts)</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-purple-500 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-600">Same-Day Rapid Dispatch Hotline</span>
              </li>
            </ul>

            <div className="pt-2 space-y-2">
              <button 
                onClick={() => onOpenCallModal('contractor')}
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors duration-200 shadow-sm"
              >
                <Briefcase size={15} />
                <span>Hire Staff Today</span>
              </button>
              <button 
                onClick={() => onOpenCallModal('worker')}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors duration-200 shadow-sm"
              >
                <Users size={15} />
                <span>Find Local Work</span>
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-1 font-['Montserrat']">Stay Updated on Frontline Staffing</h4>
            <p className="text-gray-500 text-sm">Receive quarterly workforce reports, local talent availability updates, and industry insights.</p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md flex relative">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#0066FF] hover:bg-blue-700 text-white px-5 rounded-lg text-xs font-bold flex items-center transition-colors">
              <Send size={14} className="mr-1.5" />
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-700">LABOURA WORKFORCE PLATFORM INC.</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            <span className="hidden md:inline px-1">·</span>
            <span>Two-Sided Frontline Staffing Infrastructure</span>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <button onClick={() => onNavigate('about')} className="hover:text-[#0066FF] transition-colors">About</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#0066FF] transition-colors">Contact</button>
            <button onClick={() => onNavigate('roles')} className="hover:text-[#0066FF] transition-colors">All Verticals</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
