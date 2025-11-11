"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { sendGAEvent } from "@next/third-parties/google"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const previousTheme = theme || "light"
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        sendGAEvent("event", "theme_changed", {
            newTheme: newTheme,
            previousTheme: previousTheme,
        })
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
