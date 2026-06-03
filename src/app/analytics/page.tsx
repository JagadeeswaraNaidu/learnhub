"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Flame,
  Award,
  Calendar,
  BookOpen,
} from "lucide-react";
import KPICard from "@/components/KPICard";
import ChartWidget from "@/components/ChartWidget";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const weeklyData = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 65 },
  { label: "Sat", value: 35 },
  { label: "Sun", value: 50 },
];

const skillData = [
  { label: "React", value: 85, color: "#6366F1" },
  { label: "TS", value: 72, color: "#06B6D4" },
  { label: "Node", value: 68, color: "#10B981" },
  { label: "CSS", value: 90, color: "#F59E0B" },
  { label: "SQL", value: 55, color: "#8B5CF6" },
  { label: "Go", value: 40, color: "#EF4444" },
];

const monthlyData = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 55 },
  { label: "May", value: 48 },
  { label: "Jun", value: 72 },
];

const achievements = [
  {
    icon: <Flame size={16} />,
    title: "7-Day Streak",
    description: "Learned 7 days in a row",
    date: "Today",
    variant: "warning" as const,
  },
  {
    icon: <Award size={16} />,
    title: "Course Master",
    description: "Completed System Design Fundamentals",
    date: "2 weeks ago",
    variant: "success" as const,
  },
  {
    icon: <Target size={16} />,
    title: "Goal Crusher",
    description: "Reached 100 hours of learning",
    date: "1 month ago",
    variant: "primary" as const,
  },
  {
    icon: <Calendar size={16} />,
    title: "Consistent Learner",
    description: "30 days of active learning",
    date: "2 months ago",
    variant: "accent" as const,
  },
] as const;

export default function AnalyticsPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-[#A1A1AA] mt-0.5">
          Deep insights into your learning journey
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Hours"
          value="127"
          change={15}
          icon={<TrendingUp size={18} />}
          iconBg="bg-[#6366F1]/10 text-[#6366F1]"
          delay={0}
        />
        <KPICard
          title="Courses Completed"
          value="3"
          change={50}
          icon={<BookOpen size={18} />}
          iconBg="bg-[#10B981]/10 text-[#10B981]"
          delay={0.05}
        />
        <KPICard
          title="Current Streak"
          value="12 days"
          change={0}
          icon={<Flame size={18} />}
          iconBg="bg-[#F59E0B]/10 text-[#F59E0B]"
          delay={0.1}
        />
        <KPICard
          title="Avg. Completion"
          value="62%"
          change={8}
          icon={<Target size={18} />}
          iconBg="bg-[#06B6D4]/10 text-[#06B6D4]"
          delay={0.15}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Weekly Learning Hours"
          subtitle="Daily time spent learning"
          data={weeklyData}
          type="bar"
          delay={0.2}
        />
        <ChartWidget
          title="Monthly Trend"
          subtitle="Learning hours per month"
          data={monthlyData}
          type="line"
          delay={0.25}
        />
      </div>

      {/* Skills & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="p-6">
            <h3 className="text-base font-semibold text-white mb-1">
              Skill Proficiency
            </h3>
            <p className="text-sm text-[#A1A1AA] mb-6">
              Your current skill levels across technologies
            </p>
            <div className="space-y-4">
              {skillData.map((skill, i) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">
                      {skill.label}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">{skill.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#262626] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{
                        delay: 0.4 + i * 0.08,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="p-6">
            <h3 className="text-base font-semibold text-white mb-1">
              Recent Achievements
            </h3>
            <p className="text-sm text-[#A1A1AA] mb-6">
              Milestones you&apos;ve reached recently
            </p>
            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#111111] border border-[#262626]"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      achievement.variant === "warning"
                        ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                        : achievement.variant === "success"
                        ? "bg-[#10B981]/10 text-[#10B981]"
                        : achievement.variant === "primary"
                        ? "bg-[#6366F1]/10 text-[#6366F1]"
                        : "bg-[#06B6D4]/10 text-[#06B6D4]"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-white">
                        {achievement.title}
                      </h4>
                      <Badge variant={achievement.variant} size="sm">
                        {achievement.variant === "warning"
                          ? "Streak"
                          : achievement.variant === "success"
                          ? "Course"
                          : achievement.variant === "primary"
                          ? "Goal"
                          : "Milestone"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#A1A1AA]">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="text-xs text-[#52525B] flex-shrink-0">
                    {achievement.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
