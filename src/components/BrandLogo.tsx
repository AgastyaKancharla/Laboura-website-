import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSubtitle?: boolean;
  darkVariant?: boolean;
}

export function BrandLogo({ size = "md", className = "", showSubtitle = false, darkVariant = false }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-5xl sm:text-6xl",
  };

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className={`font-['Montserrat'] font-black tracking-tight flex items-baseline leading-none ${sizeClasses[size]}`}>
        {/* LAB in Blue-to-Cyan gradient */}
        <span className="relative">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
            }}
          >
            L
          </span>
          {/* First A with embedded Orange swoosh accent */}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
              }}
            >
              A
            </span>
            {/* Orange dynamic energy swoosh on the crossbar of A */}
            <span
              className="absolute left-[18%] bottom-[28%] w-[64%] h-[22%] rounded-full -rotate-6 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #FF8A00 0%, #FFC107 100%)",
                boxShadow: "0 0 6px rgba(255, 138, 0, 0.4)",
              }}
            />
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
            }}
          >
            B
          </span>
        </span>

        {/* OURA in Yellow-to-Orange gradient with blue arch on the second A */}
        <span className="relative">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFC107 0%, #FF8A00 100%)",
            }}
          >
            OUR
          </span>
          {/* Final A with blue base arch */}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FF8A00 0%, #FF3D00 100%)",
              }}
            >
              A
            </span>
            {/* Cyan/blue arch inside the bottom of the final A */}
            <span
              className="absolute left-[20%] bottom-[8%] w-[60%] h-[32%] rounded-t-full pointer-events-none"
              style={{
                background: "linear-gradient(180deg, #00D4FF 0%, #0066FF 100%)",
                boxShadow: "0 0 4px rgba(0, 212, 255, 0.4)",
              }}
            />
          </span>
        </span>
      </div>

      {showSubtitle && (
        <span className={`text-[10px] sm:text-[11px] font-['Montserrat'] font-bold uppercase tracking-widest mt-1 ${
          darkVariant ? "text-slate-300" : "text-[#0A1B3D]/70"
        }`}>
          On-Demand Local Workforce
        </span>
      )}
    </div>
  );
}

export default BrandLogo;
