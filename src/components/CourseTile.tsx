"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Code2,
  Zap,
  Sparkles,
  BookOpen,
  Check,
  Play,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "./ProgressBar";
import { Course } from "@/db/schema";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Code2,
  Zap,
  Sparkles,
  BookOpen,
};

const iconBgMap: Record<string, string> = {
  Rocket: "bg-[#6366F1]/10 text-[#6366F1]",
  Code2: "bg-[#06B6D4]/10 text-[#06B6D4]",
  Zap: "bg-[#F59E0B]/10 text-[#F59E0B]",
  Sparkles: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  BookOpen: "bg-[#10B981]/10 text-[#10B981]",
};

interface CourseTileProps {
  course: Course;
  delay?: number;
}

export default function CourseTile({ course, delay = 0 }: CourseTileProps) {
  const IconComponent = iconMap[course.iconName] || BookOpen;
  const iconBg = iconBgMap[course.iconName] || iconBgMap.BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="p-5 relative overflow-hidden group">
        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
            >
              <IconComponent size={20} />
            </div>
            {course.progress === 100 ? (
              <Badge variant="success">Completed</Badge>
            ) : course.progress >= 75 ? (
              <Badge variant="warning">Almost Done</Badge>
            ) : (
              <Badge variant="default">In Progress</Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#6366F1] transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-[#52525B] mb-4">
            {course.progress === 100
              ? "Course completed"
              : `${course.progress}% complete`}
          </p>

          {/* Progress */}
          <ProgressBar progress={course.progress} delay={delay + 0.3} />

          {/* Action */}
          <div className="mt-4 pt-4 border-t border-[#262626]">
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#4F46E5] transition-colors"
            >
              {course.progress === 100 ? (
                <>
                  <Check size={14} />
                  Review
                </>
              ) : (
                <>
                  <Play size={14} />
                  Continue
                </>
              )}
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
