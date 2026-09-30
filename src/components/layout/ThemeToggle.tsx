"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

/**
 * Both icons are rendered and swapped with the `dark:` variant, so there is no
 * hydration mismatch and no need to wait for the client to mount.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-border bg-surface/70 text-muted backdrop-blur transition-colors hover:border-brand/50 hover:text-foreground"
    >
      <SunIcon className="size-5 scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-5 scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
