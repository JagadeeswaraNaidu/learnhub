import { getSupabaseCourses } from "@/lib/supabase";

export async function getCourses() {
  return await getSupabaseCourses();
}

export async function getCourseById(id: string) {
  const courses = await getSupabaseCourses();

  return courses.find((course) => course.id === id) || null;
}