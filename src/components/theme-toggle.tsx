"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-fg hover:bg-fg hover:text-bg transition-colors duration-300"
    >
      <span aria-hidden className="text-[15px] leading-none">
        {mounted ? (isDark ? "◑" : "◐") : "◐"}
      </span>
    </button>
  );
}
