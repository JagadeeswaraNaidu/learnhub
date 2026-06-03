"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  maxValue?: number;
  type?: "bar" | "line";
  delay?: number;
}

export default function ChartWidget({
  title,
  subtitle,
  data,
  maxValue,
  type = "bar",
  delay = 0,
}: ChartWidgetProps) {
  if (!data || data.length === 0) return null;
  const computedMax = maxValue || Math.max(...data.map((d) => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-[#A1A1AA] mt-0.5">{subtitle}</p>
          )}
        </div>

        {type === "bar" && (
          <div className="flex items-end gap-3 h-40">
            {data.map((point, i) => {
              const heightPercent = (point.value / computedMax) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{
                      delay: delay + i * 0.05,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="w-full rounded-t-lg relative group"
                    style={{
                      background: point.color
                        ? point.color
                        : "linear-gradient(180deg, #6366F1, #8B5CF6)",
                    }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#262626] text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none">
                      {point.value}
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-[#52525B] font-medium">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {type === "line" && (
          <div className="relative h-40">
            <svg
              viewBox={`0 0 ${data.length - 1} 100`}
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`M 0 ${100 - (data[0].value / computedMax) * 100} ${data
                  .slice(1)
                  .map(
                    (d, i) =>
                      `L ${i + 1} ${100 - (d.value / computedMax) * 100}`
                  )
                  .join(" ")} L ${data.length - 1} 100 L 0 100 Z`}
                fill="url(#lineGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
              />
              <motion.path
                d={`M 0 ${100 - (data[0].value / computedMax) * 100} ${data
                  .slice(1)
                  .map(
                    (d, i) =>
                      `L ${i + 1} ${100 - (d.value / computedMax) * 100}`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#6366F1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: delay, duration: 1.2, ease: "easeOut" }}
              />
              {data.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={i}
                  cy={100 - (d.value / computedMax) * 100}
                  r="2"
                  fill="#6366F1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + i * 0.08 }}
                />
              ))}
            </svg>
            <div className="flex justify-between mt-2">
              {data.map((d, i) => (
                <span key={i} className="text-[10px] text-[#52525B] font-medium">
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
