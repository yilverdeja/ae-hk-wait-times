"use client";

import dynamic from "next/dynamic";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Dynamically import the LanguageSwitcher and disable SSR
// The 'loading' option provides a fallback UI while the component is loading
const DynamicLanguageSwitcher = dynamic(
  () => import('@/components/LanguageSwitcher').then(mod => mod.LanguageSwitcher),
  { 
    ssr: false,
    loading: () => <div className="h-10 w-32 rounded-md bg-muted animate-pulse" /> // A skeleton loader
  }
);

export function Header() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
      {/* Left side of the header */}
      <div>
        <h1 className="text-lg font-semibold">Hospital Wait Times</h1>
      </div>

      {/* Right side of the header */}
      <div className="ml-auto flex items-center gap-4">
        {/* Switcher Components */}
        <DynamicLanguageSwitcher />        
        <ThemeSwitcher />
      </div>
    </header>
  );
}