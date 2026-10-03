import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow" | "neon";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-[#0066FF] text-white hover:bg-[#0052CC] font-semibold shadow-sm",
      glow: "bg-[#0066FF] text-white font-bold tracking-wide shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:bg-[#0052CC] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] border border-[#0052CC]",
      neon: "border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-300 hover:shadow-[0_0_15px_rgba(0,102,255,0.2)]",
      outline:
        "border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent",
      destructive:
        "bg-red-600 text-white hover:bg-red-500 shadow-sm",
      ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
      link: "text-[#0066FF] underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded px-3 text-xs",
      lg: "h-12 rounded-md px-6 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
