import { Suspense } from "react";
import { getSupabaseCourses, Course } from "@/lib/supabase";
import CoursesClient from "./CoursesClient";
import SkeletonLoader from "@/components/SkeletonLoader";

export const dynamic = "force-dynamic";

export default async function Page() {
  const courses = await getSupabaseCourses();
  
  const transformedCourses = courses.map(c => ({
    ...c,
    iconName: c.icon_name
  }));

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <CoursesClient initialData={transformedCourses as any} />
    </Suspense>
  );
}
