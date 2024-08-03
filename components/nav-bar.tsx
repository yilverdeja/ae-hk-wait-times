"use client";
import { useTheme } from "next-themes";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Github, Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl">A&E Wait Times</h1>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="px-2">
            <Link href="https://github.com" target="_blank">
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className="px-2 hover:cursor-pointer"
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Sun className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
