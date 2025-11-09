"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  // Get current state to display for demonstration purposes
  const { theme } = useTheme();
  const { lang } = useLanguage();

  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
      {/* Left side of the header */}
      <div>
        <h1 className="text-lg font-semibold">Hospital Wait Times</h1>
      </div>

      {/* Right side of the header */}
      <div className="ml-auto flex items-center gap-4">
        {/* Demonstration Text */}
        <div className="hidden flex-col items-end text-sm text-muted-foreground md:flex">
          <span>Language: <strong>{lang.toUpperCase()}</strong></span>
          <span>Theme: <strong>{theme}</strong></span>
        </div>

        {/* Switcher Components */}
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}