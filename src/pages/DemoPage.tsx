import React from "react";
import { ImageStreamHero } from "../components/ui/image-stream-hero";
import { ArrowLeft, Sparkles } from "lucide-react";

interface DemoPageProps {
  onBackToMain: () => void;
}

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";

const IMAGES = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: `${CDN}/gradients/crimson_aura/crimson-aura-02.png`,
    alt: "Crimson aura gradient",
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-01.png`,
    alt: "Flowing hue gradient",
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: "Moon-toned gradient",
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-03.png`,
    alt: "Layered hero gradient",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-02.png`,
    alt: "Second flowing hue gradient",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-05.png`,
    alt: "Deep moon-toned gradient",
  },
];

export function DemoPage({ onBackToMain }: DemoPageProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#040B17] font-['Montserrat'] flex flex-col justify-center items-center p-6">
      {/* Floating back button to return to Laboura site */}
      <div className="absolute top-6 left-6 z-30">
        <button
          onClick={onBackToMain}
          className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:border-[#0066FF] hover:text-[#00D4FF] shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Laboura Platform
        </button>
      </div>

      <div className="absolute top-6 right-6 z-30">
        <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-blue-500/20 border border-blue-400/30 text-[#00D4FF] shadow-xs">
          Component: /components/ui/image-stream-hero.tsx
        </span>
      </div>

      {/* Component Demo */}
      <div className="w-full max-w-5xl">
        <ImageStreamHero
          images={IMAGES}
          className="h-[560px] w-full rounded-2xl border border-white/10 bg-[#0A1B3D]/80 shadow-2xl"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
            <div className="px-6">
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-md">
                Your work,
                <br />
                <span className="text-[#00D4FF]">front and centre.</span>
              </h1>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="max-w-md text-balance px-6 text-sm text-slate-300">
                A hero that leads with the images instead of describing them. Swap in
                your own and the corridor rebuilds around them.
              </p>
              <button
                onClick={onBackToMain}
                className="px-8 py-3.5 rounded-xl font-bold text-xs text-white shadow-lg transition-all hover:scale-105"
                style={{
                  backgroundImage: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
                }}
              >
                Return to Laboura Platform
              </button>
            </div>
          </div>
        </ImageStreamHero>
      </div>
    </div>
  );
}

export default DemoPage;
