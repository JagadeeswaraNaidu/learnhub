"use client";

import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Hero Skeleton */}
      <div className="col-span-full lg:col-span-2 h-44 rounded-2xl shimmer" />

      {/* KPI Skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={`kpi-${i}`} className="h-28 rounded-2xl shimmer" />
      ))}

      {/* Course Skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={`course-${i}`} className="h-48 rounded-2xl shimmer" />
      ))}

      {/* Activity Skeleton */}
      <div className="col-span-full lg:col-span-2 h-64 rounded-2xl shimmer" />
    </div>
  );
}
