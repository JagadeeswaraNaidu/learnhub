import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  progress: integer("progress").notNull(),
  iconName: text("icon_name").notNull(),
  category: text("category").notNull().default("General"),
  hours: integer("hours").notNull().default(0),
  lastActive: text("last_active").notNull().default("Never"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
