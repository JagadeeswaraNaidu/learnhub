import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';


// Initialize client only if env vars are present
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at?: string;
}

export const FALLBACK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns', progress: 75, icon_name: 'Rocket' },
  { id: '2', title: 'TypeScript Masterclass', progress: 45, icon_name: 'Code2' },
  { id: '3', title: 'Next.js 14 Deep Dive', progress: 90, icon_name: 'Zap' },
  { id: '4', title: 'Framer Motion Animations', progress: 30, icon_name: 'Sparkles' },
];

export async function getSupabaseCourses(): Promise<Course[]> {
  if (!supabase) {
    console.warn("Supabase not configured. Using fallback data.");
    return FALLBACK_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || FALLBACK_COURSES;
  } catch (err) {
    console.error("Supabase fetch error:", err);
    return FALLBACK_COURSES;
  }
}
