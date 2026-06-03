"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
} from "lucide-react";
import HeroTile from "@/components/HeroTile";
import CourseTile from "@/components/CourseTile";
import ActivityTile from "@/components/ActivityTile";
import KPICard from "@/components/KPICard";
import ChartWidget from "@/components/ChartWidget";
import AIRecommendations from "@/components/AIRecommendations";
import { Course } from "@/db/schema";

interface DashboardContentProps {
  courses: Course[];
}

const weeklyData = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 65 },
  { label: "Sat", value: 35 },
  { label: "Sun", value: 50 },
];

const monthlyData = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 55 },
  { label: "May", value: 48 },
  { label: "Jun", value: 72 },
];

export default function DashboardContent({ courses }: DashboardContentProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[#A1A1AA] mt-0.5">
            Track your learning progress and achievements
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Hero Tile */}
        <HeroTile name="Alex" streak={12} />

        {/* KPI Cards */}
        <KPICard
          title="Courses in Progress"
          value="4"
          change={12}
          icon={<BookOpen size={20} />}
          iconBg="bg-[#6366F1]/10 text-[#6366F1]"
          delay={0.1}
        />
        <KPICard
          title="Hours Learned"
          value="127"
          change={8}
          icon={<Clock size={20} />}
          iconBg="bg-[#06B6D4]/10 text-[#06B6D4]"
          delay={0.15}
        />
        <KPICard
          title="Certificates"
          value="3"
          change={0}
          icon={<Trophy size={20} />}
          iconBg="bg-[#F59E0B]/10 text-[#F59E0B]"
          delay={0.2}
        />
        <KPICard
          title="Avg. Score"
          value="87%"
          change={5}
          icon={<TrendingUp size={20} />}
          iconBg="bg-[#10B981]/10 text-[#10B981]"
          delay={0.25}
        />

        {/* Charts */}
        <ChartWidget
          title="Weekly Learning Hours"
          subtitle="Hours spent learning this week"
          data={weeklyData}
          type="bar"
          delay={0.3}
        />
        <ChartWidget
          title="Monthly Progress"
          subtitle="Learning consistency over months"
          data={monthlyData}
          type="line"
          delay={0.35}
        />

        {/* Course Tiles */}
        {courses.map((course, i) => (
          <CourseTile key={course.id} course={course} delay={0.4 + i * 0.05} />
        ))}

        {/* Activity Tile */}
        <ActivityTile delay={0.6} />

        {/* AI Recommendations */}
        <AIRecommendations delay={0.65} />
      </div>
    </motion.section>
  );
}
