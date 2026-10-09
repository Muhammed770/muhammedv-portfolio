"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

// Wraps its children (the whole dock icon) so the full circle is clickable.
// Props are spread so it can sit under a Radix `asChild` trigger.
export function ModeToggle({ children, onClick, ...props }: ComponentProps<"button">) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        // resolvedTheme, not theme: with "system" the first click would otherwise do nothing.
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {children}
    </button>
  );
}

export function ModeToggleIcon() {
  return (
    <>
      <SunIcon className="size-full dark:hidden" />
      <MoonIcon className="hidden size-full dark:block" />
    </>
  );
}
