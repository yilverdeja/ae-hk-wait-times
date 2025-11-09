"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageCode } from "@/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// A map to hold the display names for each language
const languageDisplayNames: Record<LanguageCode, string> = {
  [LanguageCode.EN]: "English",
  [LanguageCode.ZH]: "繁體中文",
  [LanguageCode.CN]: "简体中文",
};

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages className="mr-2 h-4 w-4" />
          {languageDisplayNames[lang]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Map over the available language codes to create menu items */}
        {(Object.keys(languageDisplayNames) as LanguageCode[]).map((code) => (
          <DropdownMenuItem key={code} onClick={() => setLang(code)}>
            {languageDisplayNames[code]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}