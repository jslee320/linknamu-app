"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

const STORAGE_KEY = "linknamu_theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage can throw in private browsing; theme just won't persist.
    }
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="다크모드 전환"
      className="fixed top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_6px_18px_-6px_rgba(120,72,40,0.25)] backdrop-blur-xl transition-transform hover:scale-105"
    >
      {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}
