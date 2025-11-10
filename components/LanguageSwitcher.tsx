"use client";

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
import {BREAKPOINTS} from "@/lib/constants";
import { useBreakpoint } from "use-breakpoint";
import { useEffect, useState } from "react";

// A map to hold the display names for each language
const languageDisplayNames2: Record<LanguageCode, { long: string, short: string }> = {
  [LanguageCode.EN]: {
    long: "English",
    short: "EN"
  },
  [LanguageCode.ZH]: {
    long: "繁體中文",
    short: "繁體"
  },
  [LanguageCode.CN]: {
    long: "简体中文",
    short: "简体"
  },
};

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [langForm, setLangForm] = useState<"long" | "short">("long");

  useEffect(() => {
    if (breakpoint === "mobile") {
      setLangForm("short");
    } else {
      setLangForm("long");
    }
  }, [breakpoint])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages className="mr-2 h-4 w-4" />
          {languageDisplayNames2[lang][langForm]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Map over the available language codes to create menu items */}
        {(Object.keys(languageDisplayNames2) as LanguageCode[]).map((code) => (
          <DropdownMenuItem key={code} onClick={() => setLang(code)}>
            {languageDisplayNames2[code]["long"]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}