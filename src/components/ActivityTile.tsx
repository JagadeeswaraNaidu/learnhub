"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

export default function ActivityTile({ delay = 0 }: { delay?: number }) {
  const weeks = 16;
  const days = 7;
  const activityData = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  );

  const getColor = (level: number) => {
    const colors = [
      "bg-[#262626]",
      "bg-[#6366F1]/20",
      "bg-[#6366F1]/40",
      "bg-[#6366F1]/60",
      "bg-[#6366F1]",
    ];
    return colors[level];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className="col-span-full lg:col-span-2"
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-white">
              Learning Activity
            </h3>
            <p className="text-sm text-[#A1A1AA] mt-0.5">
              Your daily engagement over the past 16 weeks
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#52525B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-[#6366F1]" />
              Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-[#262626]" />
              Inactive
            </span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-[3px]">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((dayLevel, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: delay + (weekIndex * days + dayIndex) * 0.005,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{ scale: 1.6, zIndex: 10 }}
                    className={`w-[10px] h-[10px] rounded-[2px] ${getColor(
                      dayLevel
                    )} transition-colors cursor-pointer`}
                    title={`Week ${weekIndex + 1}, Day ${dayIndex + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-[10px] text-[#52525B]">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[10px] h-[10px] rounded-[2px] ${getColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </Card>
    </motion.div>
  );
}
