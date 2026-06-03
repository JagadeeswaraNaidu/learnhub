"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, BarChart3, Play, Check } from "lucide-react";
import DataTable from "@/components/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ProgressBar";
import { Course } from "@/db/schema";

interface CoursesClientProps {
  initialData: Course[];
}

export default function CoursesClient({ initialData }: CoursesClientProps) {
  const columns = [
    {
      key: "title",
      header: "Course",
      width: "35%",
      sortable: true,
      render: (row: Course) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#262626] flex items-center justify-center flex-shrink-0">
            <BookOpen size={16} className="text-[#A1A1AA]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{row.title}</p>
            <p className="text-xs text-[#52525B]">{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      width: "25%",
      sortable: true,
      render: (row: Course) => (
        <div className="w-full max-w-[180px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#A1A1AA]">{row.progress}%</span>
            <span className="text-[10px] text-[#52525B]">{row.hours}h</span>
          </div>
          <ProgressBar progress={row.progress} size="sm" />
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      sortable: true,
      render: (row: Course) => {
        const status = row.progress === 100 ? "Completed" : "In Progress";
        return (
          <Badge
            variant={status === "Completed" ? "success" : row.progress >= 75 ? "warning" : "primary"}
            size="sm"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: "lastActive",
      header: "Last Active",
      width: "15%",
      sortable: true,
      render: (row: Course) => (
        <span className="text-xs text-[#A1A1AA]">{row.lastActive}</span>
      ),
    },
    {
      key: "action",
      header: "",
      width: "10%",
      render: (row: Course) => (
        <Button
          variant="ghost"
          size="sm"
          icon={row.progress === 100 ? <Check size={14} /> : <Play size={14} />}
        >
          {row.progress === 100 ? "Review" : "Resume"}
        </Button>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 lg:p-8 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-sm text-[#A1A1AA] mt-0.5">
            Manage and track all your learning courses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] border border-[#262626]">
            <BookOpen size={16} className="text-[#6366F1]" />
            <span className="text-sm font-medium text-white">{initialData.length} Courses</span>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns as any}
        data={initialData}
        title="All Courses"
        subtitle="Browse, search, and filter your course library"
        searchKeys={["title", "category"]}
        pageSize={10}
        filterOptions={[
          {
            key: "category",
            label: "Category",
            options: Array.from(new Set(initialData.map(c => c.category))),
          },
        ]}
      />
    </motion.section>
  );
}
