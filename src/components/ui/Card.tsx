"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradientBorder?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  gradientBorder = false,
  onClick,
}: CardProps) {
  const baseClasses = `
    rounded-2xl border border-[#262626] 
    ${glass ? "glass" : "bg-[#171717]"}
    ${gradientBorder ? "gradient-border" : ""}
    ${className}
  `;

  if (hover) {
    return (
      <motion.div
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
        className={`${baseClasses} hover:border-[#404040] hover:shadow-xl hover:shadow-black/20 transition-all duration-300 cursor-default`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
