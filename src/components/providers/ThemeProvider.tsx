"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--bg", "#FAFAFA");
      root.style.setProperty("--surface", "#FFFFFF");
      root.style.setProperty("--card", "#F4F4F5");
      root.style.setProperty("--border", "#E4E4E7");
      root.style.setProperty("--text-primary", "#18181B");
      root.style.setProperty("--text-secondary", "#71717A");
      root.style.setProperty("--text-muted", "#A1A1AA");
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.style.setProperty("--bg", "#0A0A0A");
      root.style.setProperty("--surface", "#111111");
      root.style.setProperty("--card", "#171717");
      root.style.setProperty("--border", "#262626");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#A1A1AA");
      root.style.setProperty("--text-muted", "#52525B");
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted ? "" : "invisible"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
