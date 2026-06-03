"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "default";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  primary: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
  secondary: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
  accent: "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20",
  success: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
  warning: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  error: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
  default: "bg-[#262626] text-[#A1A1AA] border-[#404040]",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-lg border font-semibold
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
