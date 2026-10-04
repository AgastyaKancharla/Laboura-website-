import React, { useRef, useState } from "react";
import { PageId } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { FAQ, FaqItem } from "../components/FAQ";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Rocket,
  Send,
  UserPlus,
  Users,
} from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenCallModal: (role?: "general" | "contractor" | "worker" | "investor") => void;
}

type Side = "business" | "worker";

const SIDE_COPY: Record<Side, { label: string; hint: string; accent: string; ring: string }> = {
  business: {
    label: "I need staff",
    hint: "e.g. 2 cashiers for evening shifts, starting Monday",
    accent: "bg-[#0066FF]",
    ring: "focus:ring-[#0066FF]/30 focus:border-[#0066FF]",
  },
  worker: {
    label: "I need work",
    hint: "e.g. I worked in a supermarket for a year and can start this week",
    accent: "bg-emerald-600",
    ring: "focus:ring-emerald-500/30 focus:border-emerald-500",
  },
};

const NEXT_STEPS = [
  { icon: Headphones, title: "We call you back", body: "A real person from our team calls the number you shared." },
  { icon: MessageSquareText, title: "We understand your need", body: "The role and shift you need filled, or the work you're looking for." },
  { icon: Rocket, title: "We get to work", body: "We start matching right away and keep you updated until it's done." },
];

const FAQS: FaqItem[] = [
  {
    q: "I'm a business owner. What should I have ready?",
    a: "The role you need, how many people, the shift timings and your business address. That's enough for us to start.",
  },
  {
    q: "I'm looking for work. What should I have ready?",
    a: "A government photo ID, such as Aadhaar, a phone number we can reach you on, and the area where you live.",
  },
  {
    q: "Can I ask about a role that isn't on your list?",
    a: "Yes. Tell us what you need and we'll let you know honestly whether we can help.",
  },
];

export function ContactPage({ onNavigate, onOpenCallModal }: ContactPageProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState<Side>("business");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const digits = phone.replace(/\D/g, "");
  const phoneValid = digits.length >= 10 && digits.length <= 13;
  const copy = SIDE_COPY[side];

  const chooseSide = (s: Side) => {
    setSide(s);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !phoneValid) return;
    setSubmitted(true);
  };

  const inputClass = `w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-[#0A1628] text-[15px] placeholder-gray-400 outline-none focus:ring-4 transition-shadow ${copy.ring}`;

  return (
    <div className="w-full bg-[#FAFAFC] text-[#0A1628] font-['Plus_Jakarta_Sans']">

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div aria-hidden className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(10,22,40,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,22,40,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_30%_30%,black_10%,transparent_65%)]" />
        <div className="relative px-5 sm:px-8 md:px-14 lg:px-20 pt-32 pb-20 lg:pt-36 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div
              className="animate-text-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#0066FF]"
              style={{ animationFillMode: "both", animationDelay: "80ms" }}
            >
              <Headphones className="w-4 h-4" />
              Contact us
            </div>
            <h1
              className="animate-text-reveal mt-6 text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat']"
              style={{ animationFillMode: "both", animationDelay: "200ms" }}
            >
              Talk to a <span className="text-gradient-blue">real person.</span>
            </h1>
            <p
              className="animate-text-reveal mt-6 text-lg text-gray-600 leading-relaxed max-w-lg"
              style={{ animationFillMode: "both", animationDelay: "350ms" }}
            >
              No chatbots and no ticket numbers. Whether you need staff or need work, you speak to someone who can actually help.
            </p>

            <div
              className="animate-text-reveal mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl"
              style={{ animationFillMode: "both", animationDelay: "500ms" }}
            >
              <button
                onClick={() => chooseSide("business")}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0A1628] text-white text-left hover:bg-[#0066FF] transition-colors"
              >
                <Building2 className="w-7 h-7 text-[#00D4FF] group-hover:text-white shrink-0" />
                <span>
                  <span className="block font-black text-lg">I need staff</span>
                  <span className="block text-xs text-slate-300 group-hover:text-white/85">For business owners</span>
                </span>
              </button>
              <button
                onClick={() => chooseSide("worker")}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-emerald-600 text-white text-left hover:bg-emerald-700 transition-colors"
              >
                <Users className="w-7 h-7 text-emerald-100 shrink-0" />
                <span>
                  <span className="block font-black text-lg">I need work</span>
                  <span className="block text-xs text-emerald-100">For job seekers</span>
                </span>
              </button>
            </div>
          </div>

          <div className="animate-text-reveal" style={{ animationFillMode: "both", animationDelay: "450ms" }}>
            <a
              href="tel:18005226872"
              className="group relative block overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A1628] to-[#13284A] p-8 sm:p-12 text-white shadow-[0_40px_80px_-30px_rgba(10,22,40,0.6)]"
            >
              <div aria-hidden className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#0066FF]/40 blur-3xl" />
              <div className="relative flex items-center gap-5">
                <span className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
                  <span aria-hidden className="absolute inset-0 rounded-full border-2 border-[#00D4FF] animate-ripple" />
                  <span aria-hidden className="absolute inset-0 rounded-full border-2 border-[#00D4FF] animate-ripple [animation-delay:0.75s]" />
                  <Phone className="relative w-7 h-7 text-white" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D4FF]">Call us directly</span>
              </div>
              <div className="relative mt-8 text-4xl sm:text-5xl font-black font-['Montserrat'] tracking-tight tabular-nums">
                1 (800) 522-6872
              </div>
              <div className="relative mt-3 text-slate-300">Tap to call. You'll speak to our team, not a recording.</div>
              <div className="relative mt-8 inline-flex items-center gap-2 font-bold text-white">
                Call now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CALLBACK FORM ═══ */}
      <section ref={formRef} className="py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#FAFAFC] border-b border-gray-100 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Request a callback</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.08]">
              Prefer we call you?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Leave your details and a member of our team will call you back. The more you tell us, the faster we can help.
            </p>
            <ul className="mt-8 space-y-4">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="relative w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-[#0066FF]" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#0A1628] text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <div className="font-bold">{s.title}</div>
                    <div className="text-sm text-gray-500">{s.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay="delay-1">
            <div className="rounded-[28px] bg-white border border-gray-200 shadow-[0_30px_60px_-30px_rgba(10,22,40,0.25)] overflow-hidden">
              <div className={`h-1.5 transition-colors duration-500 ${copy.accent}`} />
              {submitted ? (
                <div className="p-8 sm:p-12 text-center">
                  <span className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center animate-bubble-in">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </span>
                  <h3 className="mt-6 text-2xl font-black font-['Montserrat']">Thanks, {name.trim().split(" ")[0]}.</h3>
                  <p className="mt-2 text-gray-600">We've got your request and will call you back on {phone}.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setTouched(false);
                      setName("");
                      setPhone("");
                      setArea("");
                      setMessage("");
                    }}
                    className="mt-8 px-6 py-3 rounded-full border border-gray-300 text-sm font-bold hover:border-[#0066FF] transition-colors"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-5">
                  <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-gray-100" role="radiogroup" aria-label="I am contacting you because">
                    {(Object.keys(SIDE_COPY) as Side[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={side === s}
                        onClick={() => setSide(s)}
                        className={`py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          side === s ? `${SIDE_COPY[s].accent} text-white shadow-md` : "text-gray-600 hover:text-[#0A1628]"
                        }`}
                      >
                        {s === "business" ? <Building2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                        {SIDE_COPY[s].label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-bold text-gray-700">Your name</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className={`mt-1.5 ${inputClass} ${touched && !name.trim() ? "border-rose-400" : ""}`}
                        placeholder="Full name"
                      />
                      {touched && !name.trim() && <span className="mt-1 block text-xs font-semibold text-rose-600">Please tell us your name.</span>}
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold text-gray-700">Phone number</span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`mt-1.5 ${inputClass} ${touched && !phoneValid ? "border-rose-400" : ""}`}
                        placeholder="10-digit mobile number"
                      />
                      {touched && !phoneValid && (
                        <span className="mt-1 block text-xs font-semibold text-rose-600">Please enter a valid phone number.</span>
                      )}
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-bold text-gray-700">
                      {side === "business" ? "Business area or address" : "The area where you live"}
                      <span className="ml-1 font-semibold text-gray-400">(optional)</span>
                    </span>
                    <input value={area} onChange={(e) => setArea(e.target.value)} className={`mt-1.5 ${inputClass}`} placeholder="Area, city" />
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold text-gray-700">
                      {side === "business" ? "Who do you need?" : "What work are you looking for?"}
                      <span className="ml-1 font-semibold text-gray-400">(optional)</span>
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className={`mt-1.5 resize-none ${inputClass}`}
                      placeholder={copy.hint}
                    />
                  </label>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110 ${copy.accent}`}
                  >
                    <Send className="w-4 h-4" />
                    Request a callback
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ OTHER WAYS + FAQ ═══ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 md:px-14 lg:px-20 bg-white border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Other ways to reach us</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight font-['Montserrat'] leading-[1.1]">
                Whatever's easiest for you.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {[
                { icon: Phone, label: "Call", value: "1 (800) 522-6872", href: "tel:18005226872" },
                { icon: Mail, label: "Email", value: "dispatch@laboura.com", href: "mailto:dispatch@laboura.com" },
                { icon: MapPin, label: "Where we are", value: "Born and based in India", href: undefined },
              ].map((c, i) => (
                <Reveal key={c.label} delay={`delay-${i}`}>
                  {c.href ? (
                    <a href={c.href} className="group flex items-center gap-4 p-5 rounded-2xl bg-[#FAFAFC] border border-gray-200 hover:border-[#0066FF] transition-colors">
                      <span className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-colors">
                        <c.icon className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">{c.label}</span>
                        <span className="block font-bold text-[#0A1628] truncate">{c.value}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FAFAFC] border border-gray-200">
                      <span className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                        <c.icon className="w-5 h-5 text-[#0066FF]" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">{c.label}</span>
                        <span className="flex items-center gap-2 font-bold text-[#0A1628]">
                          {c.value}
                          <span aria-hidden className="inline-flex h-1 w-6 rounded-full overflow-hidden">
                            <span className="flex-1 bg-[#FF9933]" />
                            <span className="flex-1 bg-gray-200" />
                            <span className="flex-1 bg-[#138808]" />
                          </span>
                        </span>
                      </span>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">Before you call</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight font-['Montserrat'] leading-[1.1]">
                Good to know.
              </h2>
            </Reveal>
            <Reveal className="mt-6" delay="delay-1">
              <FAQ items={FAQS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="relative overflow-hidden py-20 sm:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0A1628] text-white">
        <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[44rem] h-[24rem] rounded-full bg-[#0066FF]/25 blur-[130px]" />
        <Reveal className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-['Montserrat'] leading-[1.05] text-white">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-lg text-slate-300">Read how Laboura works for your side first, then reach out.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => onNavigate("businesses")}
              className="group px-7 py-4 rounded-full bg-white text-[#0A1628] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#00D4FF] transition-colors"
            >
              How it works for businesses
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate("workers")}
              className="group px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              How it works for job seekers
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <button
            onClick={() => onOpenCallModal("general")}
            className="mt-6 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Or request a quick callback
          </button>
        </Reveal>
      </section>
    </div>
  );
}

export default ContactPage;
