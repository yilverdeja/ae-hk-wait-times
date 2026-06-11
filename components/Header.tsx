"use client"

import MobileNav from "@/components/MobileNav"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { navLinks } from "@/configs/nav"
import { siteConfig } from "@/configs/site"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Dynamically import the LanguageSwitcher and disable SSR
// The 'loading' option provides a fallback UI while the component is loading
const DynamicLanguageSwitcher = dynamic(
    () =>
        import("@/components/LanguageSwitcher").then(
            (mod) => mod.LanguageSwitcher
        ),
    {
        ssr: false,
        loading: () => (
            <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
        ), // A skeleton loader
    }
)

export default function Header() {
    const { lang } = useLanguage()
    const pathname = usePathname()
    return (
        <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
            {/* Left side of the header */}
            <Link href="/">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {siteConfig.title[lang]}
                </p>
            </Link>

            {/* Right side of the header — desktop: inline nav + toggles */}
            <nav className="ml-auto hidden items-center gap-4 md:flex">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-foreground",
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                            onClick={() =>
                                sendGAEvent("event", "nav_link_clicked", {
                                    linkType: link.id,
                                })
                            }
                        >
                            {link.label[lang]}
                        </Link>
                    )
                })}
                <DynamicLanguageSwitcher />
                <ThemeSwitcher />
            </nav>

            {/* Right side of the header — mobile: hamburger menu */}
            <div className="ml-auto md:hidden">
                <MobileNav />
            </div>
        </header>
    )
}
