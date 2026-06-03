"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Clock, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const recommendations = [
  {
    id: 1,
    title: "Advanced React Patterns",
    description: "Master compound components, render props, and custom hooks.",
    duration: "4h 30m",
    rating: 4.9,
    tag: "Recommended",
    tagVariant: "primary" as const,
  },
  {
    id: 2,
    title: "System Design Fundamentals",
    description: "Learn to design scalable distributed systems from scratch.",
    duration: "6h 15m",
    rating: 4.8,
    tag: "Trending",
    tagVariant: "accent" as const,
  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    description: "Advanced type-level programming and generic patterns.",
    duration: "3h 45m",
    rating: 4.7,
    tag: "Popular",
    tagVariant: "secondary" as const,
  },
];

export default function AIRecommendations({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              AI Recommendations
            </h3>
            <p className="text-xs text-[#52525B]">Personalized for you</p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + i * 0.08 }}
              whileHover={{ x: 4 }}
              className="group flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#262626] hover:border-[#404040] transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-[#A1A1AA]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {rec.title}
                  </h4>
                  <Badge variant={rec.tagVariant} size="sm">
                    {rec.tag}
                  </Badge>
                </div>
                <p className="text-xs text-[#A1A1AA] mb-2 line-clamp-1">
                  {rec.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-[#52525B]">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {rec.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-[#F59E0B]" />
                    {rec.rating}
                  </span>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-[#52525B] group-hover:text-[#6366F1] transition-colors mt-1 flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
