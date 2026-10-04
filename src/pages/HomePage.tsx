import React, { useEffect, useState } from "react";
import { PageId } from "../components/Navbar";
import { ImageStreamHero, StreamImage, CorridorPath } from "@/components/ui/image-stream-hero";
import { IndustryReel } from "../components/IndustryReel";
import { Reveal } from "../components/Reveal";
import {
  PhoneCall,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Store,
  Briefcase,
  MapPin,
  RefreshCw,
  Zap,
  Star,
  Shield,
  Phone,
  Check,
  X,
  Navigation,
  Smartphone,
  TrendingUp,
  UserCheck,
  Building2,
  ThumbsUp,
  Heart,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

/* ── 20 COMPLETELY DISTINCT SERVICE IMAGES (10 Left, 10 Right - Zero Duplicates) ── */
const LEFT_SERVICE_IMAGES: StreamImage[] = [
  {
    src: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=85",
    alt: "Supermarket shelf restocker",
    label: "Grocery Restock Crew",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
    alt: "Commercial kitchen culinary prep",
    label: "Line Cook & Prep",
  },
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85",
    alt: "Warehouse freight handler",
    label: "Freight Logistics",
  },
  {
    src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=85",
    alt: "Storefront access security",
    label: "Storefront Security",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85",
    alt: "Barber styling hair",
    label: "Licensed Barber",
  },
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85",
    alt: "Commercial janitorial specialist",
    label: "Sanitization Crew",
  },
  {
    src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=85",
    alt: "Commercial grounds maintenance",
    label: "Turf & Grounds",
  },
  {
    src: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=85",
    alt: "Petrol station pump attendant",
    label: "Forecourt Attendant",
  },
  {
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=85",
    alt: "Commercial painter and handyman",
    label: "Drywall & Painter",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=85",
    alt: "Event staging setup crew",
    label: "Stagehand Rigging",
  },
];

const RIGHT_SERVICE_IMAGES: StreamImage[] = [
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    alt: "Bakery and kitchen food preparation",
    label: "Bakery Food Prep",
  },
  {
    src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=85",
    alt: "Forklift and inventory handler",
    label: "Forklift Operator",
  },
  {
    src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=85",
    alt: "Supermarket register checkout cashier",
    label: "Retail Cashier",
  },
  {
    src: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=85",
    alt: "Industrial pressure cleaning specialist",
    label: "Industrial Cleaner",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=85",
    alt: "Carpentry and storefront repair",
    label: "Storefront Handyman",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=85",
    alt: "Logistics truck freight cross-dock",
    label: "Cross-Dock Unloader",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=85",
    alt: "Coffee bar and beverage station worker",
    label: "Beverage & Food Server",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85",
    alt: "Commercial HVAC and facilities maintenance",
    label: "Facility Maintenance",
  },
  {
    src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=85",
    alt: "Fleet vehicle detailing and wash attendant",
    label: "Fleet Detailer",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
    alt: "Venue usher and crowd guidance steward",
    label: "Venue Steward",
  },
];

const testimonials = [
  {
    quote: "Laboura filled our overnight grocery stocking crew within 4 hours. The workers were punctual, pre-screened, and dependable. Essential service for our store.",
    name: "Marcus Rivera",
    role: "Store Manager, FreshMart Grocery Hub",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "We needed 6 prep cooks and dishwashers for a weekend rush. Laboura had them on site before lunch. No agency markup, direct employer relationship.",
    name: "Sarah Chen",
    role: "Operations Director, Dining Ventures",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "As a worker, Laboura matched me with a distribution warehouse 10 minutes from my home. Zero deductions, steady weekly pay directly from my employer.",
    name: "James Okafor",
    role: "Warehouse Associate, Intermodal Freight",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

/* ── Custom Corridor Geometry for Mobile vs Desktop Cinematic Scale ── */
// Portrait phones run the rails vertically: landscape photos stream up and down
// out of the title, spaced so each card shows roughly half its photo in flight.
const MOBILE_PATH: CorridorPath = {
  perspective: 60,
  cardWidth: 78,
  cardHeight: 52,
  cardRadius: 2.4,
  birthHeight: 6,
  exitHeight: 150,
  railBirth: 8,
  railExit: 50,
  fan: 1.8,
  turnBirth: 0,
  turnExit: 4,
  stops: 32,
};

// Squat viewports (short phones, small tablets) have less height to travel, so
// cards get smaller and the rails spread wider to keep the same reveal.
const MOBILE_COMPACT_PATH: CorridorPath = {
  ...MOBILE_PATH,
  birthHeight: 4.5,
  exitHeight: 115,
  railBirth: 10,
  railExit: 70,
};

const DESKTOP_PATH: CorridorPath = {
  perspective: 24,
  cardWidth: 26,
  cardHeight: 36,
  cardRadius: 0.8,
  birthHeight: 2.6,
  exitHeight: 74,
  railBirth: -10,
  railExit: 60,
  fan: 3.0,
  turnBirth: 4,
  turnExit: 32,
  stops: 24,
};

export function HomePage({ onNavigate, onOpenCallModal }: HomePageProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [compactCorridor, setCompactCorridor] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-aspect-ratio: 10/18)");
    const update = () => setCompactCorridor(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hide again near the bottom so the bar never covers the footer, which has its own actions.
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.75 && !nearBottom);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full font-['Plus_Jakarta_Sans'] text-gray-800 bg-white overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO — UNIFIED SINGLE-SCREEN CINEMATIC EXPERIENCE
          - Fits 100% in ONE SCREEN on both mobile and desktop (NO SCROLL NEEDED)
          - NO white box / NO card container behind text
          - DESKTOP: Full-bleed 3D corridor spanning full screen, text in lower/middle
          - MOBILE: Full-screen height & width coverage, text on top layer
          - Two Buttons: 1) Call Dispatch 2) Know More (directs to About)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-auto md:h-[100svh] md:min-h-[600px] overflow-hidden bg-white flex flex-col justify-between border-b border-gray-100">
        
        {/* ── DESKTOP LAYOUT (md:flex) ── */}
        <div className="hidden md:flex relative w-full h-full flex-col justify-between overflow-hidden">
          {/* Full-Bleed 3D Corridor spanning the ENTIRE hero backdrop */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <ImageStreamHero
              leftImages={LEFT_SERVICE_IMAGES}
              rightImages={RIGHT_SERVICE_IMAGES}
              cards={10}
              speed={16}
              axis={40}
              path={DESKTOP_PATH}
              className="w-full h-full"
            />
          </div>

          {/* Heading & Two Buttons placed in the lower/middle section in same screen (NO SCROLL, NO WHITE BOX) */}
          <div className="relative z-10 w-full px-6 text-center flex flex-col items-center mt-auto pb-8 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span>On-Demand Frontline Workforce Network</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] text-[#0A1628] font-['Montserrat'] select-none drop-shadow-[0_2px_14px_rgba(255,255,255,1)]">
              Future is built on Laboura.
            </h1>

            <p className="mt-2 text-base lg:text-lg text-gray-700 font-semibold max-w-2xl mx-auto leading-relaxed text-balance drop-shadow-[0_1px_8px_rgba(255,255,255,1)]">
              The dedicated frontline workforce network connecting local businesses with verified staff living in the same community across 10 essential physical industries.
            </p>

            <div className="mt-4 flex flex-row items-center justify-center gap-4 w-full max-w-sm mx-auto">
              <button
                onClick={() => onOpenCallModal("general")}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-sm text-white bg-[#0A1628] hover:bg-[#0066FF] shadow-lg shadow-black/15 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-[#00D4FF]" />
                <span>Call Dispatch</span>
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="flex-1 py-3.5 px-6 rounded-full font-bold text-sm text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 shadow-xs hover:border-[#0066FF] hover:text-[#0066FF] transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 text-[#0066FF]" />
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (< md) ── */}
        {/* The section sits under the fixed 5rem navbar, so 100svh fills exactly one screen. */}
        <div className="md:hidden relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-[#0A1628]">
          <div className="absolute inset-x-0 top-20 bottom-0 pointer-events-none">
            <ImageStreamHero
              leftImages={LEFT_SERVICE_IMAGES}
              rightImages={RIGHT_SERVICE_IMAGES}
              orientation="vertical"
              cards={compactCorridor ? 9 : 10}
              speed={16}
              axis={50}
              path={compactCorridor ? MOBILE_COMPACT_PATH : MOBILE_PATH}
              className="absolute inset-0"
            />

            {/* Title-card glow: darkens only the band behind the copy so photos stay vivid above and below. */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_34%_at_50%_50%,rgba(10,22,40,0.94)_0%,rgba(10,22,40,0.8)_45%,rgba(10,22,40,0)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A1628]/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A1628]/80 to-transparent" />
          </div>

          <div className="relative z-10 h-full pt-20 flex flex-col items-center justify-center text-center px-5">
            <div
              className="animate-text-reveal [@media(max-height:700px)]:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-[0.18em] text-[#00D4FF]"
              style={{ animationFillMode: "both", animationDelay: "150ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              <span>On-Demand Frontline Network</span>
            </div>

            <h1
              className="animate-text-reveal mt-4 text-[2.55rem] sm:text-5xl font-black tracking-tight leading-[1.04] text-white font-['Montserrat'] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              style={{ animationFillMode: "both", animationDelay: "350ms" }}
            >
              Future is<br />
              built on <span className="text-gradient-blue">Laboura.</span>
            </h1>

            <p
              className="animate-text-reveal mt-3 text-[15px] text-slate-200 font-medium max-w-[20rem] leading-relaxed text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
              style={{ animationFillMode: "both", animationDelay: "600ms" }}
            >
              Verified frontline staff from your own neighbourhood, across 10 essential industries.
            </p>

            <div
              className="animate-text-reveal mt-6 w-full max-w-sm grid grid-cols-2 gap-2.5"
              style={{ animationFillMode: "both", animationDelay: "850ms" }}
            >
              <button
                onClick={() => onOpenCallModal("general")}
                className="py-3.5 px-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#0066FF] to-[#00B4FF] shadow-lg shadow-[#0066FF]/40 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Dispatch</span>
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="py-3.5 px-4 rounded-full font-bold text-sm text-white bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 text-[#00D4FF]" />
              </button>
            </div>
          </div>
        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 1: THE VISUAL STORYBOARD (EMPTY SHIFT VS FILLED SHIFT)
          Even a person who cannot read sees the red panic vs green success!
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-[#FAFAFC] w-full border-b border-gray-100">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
                The Frontline Reality
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
                The Shift Story: Before & After Laboura
              </h2>
            </div>
          </Reveal>

          {/* High-Contrast Visual Comparison (Red Crisis vs Green Victory) */}
          <div className="rail grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* Visual Problem Card (Red Alert) */}
            <Reveal delay="delay-0">
              <div className="rounded-3xl bg-white border-2 border-rose-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                <div className="relative h-44 md:h-52 xl:h-64 overflow-hidden bg-rose-950">
                  <img
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
                    alt="Empty closed store shelves"
                    className="w-full h-full object-cover filter grayscale contrast-125 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/40 to-transparent" />
                  
                  {/* Visual Stamp Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <X className="w-4 h-4 stroke-[3]" />
                    <span>WITHOUT LABOURA</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-black text-xl sm:text-2xl font-['Montserrat'] flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                      <span>The Empty Shift Nightmare</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                      <div className="text-xl sm:text-2xl font-black text-rose-600 font-mono">0</div>
                      <div className="text-[11px] font-bold text-rose-950">Workers Arrived</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                      <div className="text-xl sm:text-2xl font-black text-rose-600 font-mono">-$1.4k</div>
                      <div className="text-[11px] font-bold text-rose-950">Lost Store Sales</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                      <div className="text-xl sm:text-2xl font-black text-rose-600 font-mono">38%</div>
                      <div className="text-[11px] font-bold text-rose-950">Temp Agency Cut</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    Worker calls in sick at 6:00 AM. Temp agencies demand 2-week notice or exorbitant markups. Doors stay closed, customers leave frustrated.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Visual Solution Card (Green Victory) */}
            <Reveal delay="delay-1">
              <div className="rounded-3xl bg-white border-2 border-emerald-300 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                <div className="relative h-44 md:h-52 xl:h-64 overflow-hidden bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80"
                    alt="Busy thriving supermarket store"
                    className="w-full h-full object-cover filter brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
                  
                  {/* Visual Stamp Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>WITH LABOURA</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-black text-xl sm:text-2xl font-['Montserrat'] flex items-center gap-2">
                      <ThumbsUp className="w-6 h-6 text-emerald-400" />
                      <span>Full Verified Crew on Site</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">100%</div>
                      <div className="text-[11px] font-bold text-emerald-950">Shift Fulfilled</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">1.8 mi</div>
                      <div className="text-[11px] font-bold text-emerald-950">Local Distance</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">30 Days</div>
                      <div className="text-[11px] font-bold text-emerald-950">Free Replacement</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    One tap to dispatch. Verified neighborhood crew mobilizes immediately. Shelves are stocked, registers ring, store runs without missing a beat.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 2: THE 5 PICTURE-STEPS JOURNEY ("HOW IT WORKS")
          Visual comic/infographic strip: 1 to 5. Pure visual storytelling.
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-white w-full border-b border-gray-100">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
                Rapid On-Demand Workflow
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
                From Call to Crew: 5 Visual Steps
              </h2>
            </div>
          </Reveal>

          {/* 5 Step Visual Picture Strip (Mobile-first swipeable / responsive grid) */}
          <div className="rail grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full">
            {[
              {
                num: "1",
                title: "One-Tap Call",
                sub: "Tell us the role & count",
                icon: PhoneCall,
                img: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=500&q=80",
                badge: "Dial Hotline",
                color: "bg-blue-600",
              },
              {
                num: "2",
                title: "Local Geofence",
                sub: "Matched within 3 miles",
                icon: Navigation,
                img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80",
                badge: "Neighborhood Scan",
                color: "bg-cyan-600",
              },
              {
                num: "3",
                title: "Identity Vetted",
                sub: "ID & background cleared",
                icon: ShieldCheck,
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
                badge: "100% Verified",
                color: "bg-emerald-600",
              },
              {
                num: "4",
                title: "On-Site Arrival",
                sub: "Crew checks in with badge",
                icon: UserCheck,
                img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=500&q=80",
                badge: "Verified Arrival",
                color: "bg-purple-600",
              },
              {
                num: "5",
                title: "Direct Pay",
                sub: "Direct pay upon verified placement",
                icon: DollarSign,
                img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=500&q=80",
                badge: "Fair Compensation",
                color: "bg-amber-600",
              },
            ].map((step) => (
              <Reveal key={step.num}>
                <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full group">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Big Step Number */}
                    <div className={`absolute top-3 left-3 w-8 h-8 rounded-full ${step.color} text-white font-black text-sm flex items-center justify-center shadow-md font-mono`}>
                      {step.num}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/20">
                        {step.badge}
                      </span>
                      <h4 className="font-bold text-base mt-1 text-white">{step.title}</h4>
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <p className="text-xs text-gray-500 font-medium">{step.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <IndustryReel onNavigate={onNavigate} />


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 4: THE FAIR PAY VISUALIZER ($20 BILL COMPARISON)
          Visual comparison showing scissors taking 38% vs 100% to worker
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-white w-full border-b border-gray-100">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
                Success-Based Ecosystem
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
                Transparent Terms for Businesses & Job Seekers
              </h2>
              <p className="hidden md:block mt-3 text-base text-gray-500 font-medium">
                A performance-driven platform where businesses get guaranteed shift coverage and job seekers secure verified employment.
              </p>
            </div>
          </Reveal>

          <div className="rail grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* For Businesses Value Card */}
            <div className="p-8 rounded-3xl bg-blue-50/60 border-2 border-blue-200 space-y-4 md:space-y-6 max-md:p-5">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0066FF] text-white">
                  For Store Operators
                </span>
                <span className="text-xs font-bold text-[#0066FF]">30-Day Replacement Promise</span>
              </div>

              {/* Graphic Representation */}
              <div className="p-4 md:p-6 rounded-2xl bg-white border border-blue-200 text-center space-y-3">
                <div className="text-2xl md:text-3xl font-black text-[#0066FF] font-mono">100% Verified Crew</div>
                <div className="text-xs text-gray-500">Pay for confirmed workforce attendance and reliability</div>
                <div className="w-full h-3 rounded-full bg-blue-100 overflow-hidden">
                  <div className="h-full bg-[#0066FF] w-full" />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-600 pt-1">
                  <span>Pre-screened candidates</span>
                  <span className="text-[#0066FF]">30-Day Free Replacement</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0066FF]" />
                  <span>Same-day dispatch for sudden vacancies & rush hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0066FF]" />
                  <span>Free replacement if a worker leaves within 30 days of the position being filled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0066FF]" />
                  <span>Direct employer terms with zero operational disruption</span>
                </div>
              </div>
            </div>

            {/* For Job Seekers Value Card */}
            <div className="p-8 rounded-3xl bg-emerald-50/60 border-2 border-emerald-300 space-y-4 md:space-y-6 max-md:p-5">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white">
                  For Job Seekers
                </span>
                <span className="text-xs font-bold text-emerald-700">Job or Your Money Back</span>
              </div>

              {/* Graphic Representation */}
              <div className="p-4 md:p-6 rounded-2xl bg-white border border-emerald-200 text-center space-y-3">
                <div className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">Guaranteed Job Placement</div>
                <div className="text-xs text-gray-500">Get placed in a job, or get your money refunded</div>
                <div className="w-full h-3 rounded-full bg-emerald-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full" />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-600 pt-1">
                  <span>Steady weekly payroll</span>
                  <span className="text-emerald-700">Local shifts near home</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Full refund if we can't place you in a job</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Work right in your neighborhood with short travel times</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Direct employment relationship with steady shift schedules</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 5: VISUAL NEIGHBORHOOD MAP (ILLUSTRATED CONNECTIONS)
          A graphic SVG map showing homes connected to local businesses
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-[#FAFAFC] w-full border-b border-gray-100">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
                Hyperlocal Neighborhood Grid
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
                Workers Located Directly in Your Neighborhood
              </h2>
            </div>
          </Reveal>

          {/* Visual Metro Map Graphic */}
          <div className="p-4 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-sm w-full relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 items-center">
              
              {/* Home Node */}
              <div className="p-4 md:p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-2 md:space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md max-md:w-11 max-md:h-11">
                  <Users className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="font-bold text-gray-900 text-lg">Local Community Homes</div>
                <p className="text-xs text-gray-500">Verified workers living right in the neighborhood</p>
                <span className="inline-block text-[11px] font-bold text-[#0066FF] bg-white px-3 py-1 rounded-full border border-blue-200">
                  Origin: 0.5 – 2.0 Miles
                </span>
              </div>

              {/* Connection Highway Graphic */}
              <div className="text-center space-y-3 py-1 md:py-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Short Neighborhood Commute
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-[#0A1628] rounded-full relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-600 shadow-sm">
                    ⚡
                  </div>
                </div>
                <div className="hidden md:block text-xs text-gray-400 font-medium">Zero transit delays • High attendance</div>
              </div>

              {/* Storefront Node */}
              <div className="p-4 md:p-6 rounded-2xl bg-slate-900 text-white text-center space-y-2 md:space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center mx-auto shadow-md font-bold max-md:w-11 max-md:h-11">
                  <Store className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="font-bold text-white text-lg">Your Storefront Doors</div>
                <p className="text-xs text-slate-300">Supermarket, dining, fuel, warehouse, salon</p>
                <span className="inline-block text-[11px] font-bold text-emerald-400 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Guaranteed 30-Day Fit
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 6: REAL PEOPLE & STOREFRONTS (VISUAL SOCIAL PROOF)
          Photos of real humans, real stores, 5-star badges
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-white w-full border-b border-gray-100">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2 block">
                Real Community Stories
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A1628] font-['Montserrat']">
                Trusted by Local Store Owners & Workers
              </h2>
            </div>
          </Reveal>

          <div className="rail grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} delay={`delay-${idx}`}>
                <div className="p-8 rounded-3xl bg-[#FAFAFC] border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium italic">
                      "{t.quote}"
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-gray-200/60 mt-6">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 7: DIRECT DIAL CONSOLE (MOBILE-FIRST 1-TAP ACTION)
          Simple, bold, big buttons so anyone can call in 1 tap
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-14 bg-[#0A1628] text-white w-full relative overflow-hidden">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-20 text-center relative z-10">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-400/40 text-[#00D4FF] flex items-center justify-center mx-auto mb-6">
              <PhoneCall className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-['Montserrat']">
              One Number. Immediate Crew.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
              No complicated logins or forms. Speak directly with real local placement coordinators available 24/7.
            </p>

            {/* Big Prominent 1-Tap Calling Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:18005226872"
                className="w-full sm:w-auto px-9 py-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white font-black text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                <span>Call Dispatch: 1 (800) 522-6872</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Press 1: Hire Staff (Business)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Press 2: Find Work (Job Seeker)
              </span>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          MOBILE-FIRST STICKY ACTION BAR (VISIBLE ON MOBILE ONLY)
          Guarantees mobile users always have 1-tap dispatch access
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2 shadow-2xl transition-all duration-300 ${
          scrolledPastHero ? "translate-y-0 visible" : "translate-y-full invisible"
        }`}
      >
        <a
          href="tel:18005226872"
          className="flex-1 py-3 px-4 rounded-xl bg-[#0A1628] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <PhoneCall className="w-4 h-4 text-[#00D4FF]" />
          <span>Call Dispatch</span>
        </a>
        <button
          onClick={() => onOpenCallModal("general")}
          className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95"
        >
          <Zap className="w-4 h-4" />
          <span>Request Crew</span>
        </button>
      </div>

    </div>
  );
}

export default HomePage;
