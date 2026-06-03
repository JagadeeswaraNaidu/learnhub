import { Suspense } from "react";
import { getSupabaseCourses } from "@/lib/supabase";
import DashboardContent from "./DashboardContent";
import SkeletonLoader from "@/components/SkeletonLoader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function Dashboard() {
  // Use Supabase data layer
  const courses = await getSupabaseCourses();
  
  // Transform supabase icon_name to existing component iconName property
  const transformedCourses = courses.map(c => ({
    ...c,
    iconName: c.icon_name
  }));

  return <DashboardContent courses={transformedCourses as any} />;
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Dashboard />
    </Suspense>
  );
}
