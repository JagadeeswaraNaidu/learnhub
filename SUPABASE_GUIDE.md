# Supabase Setup Guide

To set up the database for this project, run the following SQL in your Supabase SQL Editor:

```sql
-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON courses
  FOR SELECT
  TO public
  USING (true);

-- Insert seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Rocket'),
  ('TypeScript Masterclass', 45, 'Code2'),
  ('Next.js 14 Deep Dive', 90, 'Zap'),
  ('Framer Motion Animations', 30, 'Sparkles');
```

## Architecture Note: Server vs Client Components

This project leverages Next.js 14 App Router's hybrid architecture:

1. **Server Components (`app/page.tsx`, `app/courses/page.tsx`)**:
   - Data fetching occurs on the server via `getSupabaseCourses()`.
   - Fetches are directly from the database or API, reducing client-side bundle size.
   - Provides a fallback to mock data if the database is unreachable, ensuring high availability.
   - Utilizes `Suspense` for streaming content.

2. **Client Components (`components/*.tsx`)**:
   - Used for interactive elements (Sidebar toggles, Theme switching).
   - Handles all Framer Motion animations for high-performance visual feedback.
   - Manages local state (collapsible menus, form inputs).
