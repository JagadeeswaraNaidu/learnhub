"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  delay?: number;
  size?: "sm" | "md";
}

export default function ProgressBar({
  progress,
  delay = 0,
  size = "sm",
}: ProgressBarProps) {
  const heightClass = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className={`w-full ${heightClass} bg-[#262626] rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay,
        }}
        className={`${heightClass} rounded-full relative overflow-hidden`}
        style={{
          background:
            progress === 100
              ? "linear-gradient(90deg, #10B981, #34D399)"
              : "linear-gradient(90deg, #6366F1, #8B5CF6)",
        }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
            delay: delay + 1,
          }}
        />
      </motion.div>
    </div>
  );
}
