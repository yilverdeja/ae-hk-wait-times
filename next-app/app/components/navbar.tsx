"use client";
import { sendGAEvent } from "@next/third-parties/google";
import { useTheme } from "next-themes";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/components/shadcn/menubar";
import { Github, Loader, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/configs/site";
import { useEffect, useState } from "react";

const iconClassName = "w-5 h-5 md:w-6 md:h-6";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    sendGAEvent("event", "toggle_theme", { value: newTheme });
    setTheme(newTheme);
  };

  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl">A&E Wait Times</h1>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            className="px-2"
            onClick={() => sendGAEvent("event", "click_nav_github")}
          >
            <Link href={siteConfig.links.github} target="_blank">
              <Github className={iconClassName} />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          {mounted ? (
            <MenubarTrigger
              className="px-2 hover:cursor-pointer"
              onClick={() => toggleTheme()}
            >
              {theme === "light" ? (
                <Moon className={iconClassName} />
              ) : (
                <Sun className={iconClassName} />
              )}
            </MenubarTrigger>
          ) : (
            <MenubarTrigger className="px-2 hover:cursor-pointer">
              <Loader className={iconClassName} />
            </MenubarTrigger>
          )}
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
