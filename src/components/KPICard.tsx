"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  iconBg: string;
  delay?: number;
}

export default function KPICard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon,
  iconBg,
  delay = 0,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#A1A1AA]">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                    isPositive
                      ? "text-[#10B981]"
                      : isNegative
                      ? "text-[#EF4444]"
                      : "text-[#A1A1AA]"
                  }`}
                >
                  {isPositive && <TrendingUp size={12} />}
                  {isNegative && <TrendingDown size={12} />}
                  {isNeutral && <Minus size={12} />}
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
                <span className="text-xs text-[#52525B]">{changeLabel}</span>
              </div>
            )}
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
          >
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
