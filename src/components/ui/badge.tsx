import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "neon" | "warning" | "success";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-700 border border-transparent",
    secondary: "bg-gray-200 text-gray-800 border border-transparent",
    outline: "text-gray-700 border border-gray-300",
    neon: "bg-blue-50 text-blue-600 border border-blue-200 shadow-[0_0_10px_rgba(0,102,255,0.1)]",
    warning: "bg-amber-50 text-amber-600 border border-amber-200",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
