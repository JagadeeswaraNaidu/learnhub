import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCourses() {
  try {
    const data = await db.select().from(courses).orderBy(courses.createdAt);
    return data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export async function getCourseById(id: string) {
  const data = await db.select().from(courses).where(eq(courses.id, id));
  return data[0] || null;
}
