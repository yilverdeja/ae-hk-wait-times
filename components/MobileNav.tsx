"use client"

import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks, navUiLabels } from "@/configs/nav"
import { useLanguage } from "@/hooks/useLanguage"
import { sendGAEvent } from "@next/third-parties/google"
import { HelpCircle, HomeIcon, HospitalIcon, LucideIcon, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navLinkIcons: Record<string, LucideIcon> = {
    faq: HelpCircle,
    'all-hospitals': HospitalIcon,
    'home': HomeIcon,
}

export default function MobileNav() {
    const { lang } = useLanguage()
    const [open, setOpen] = useState(false)

    const handleOpenChange = (next: boolean) => {
        setOpen(next)
        if (next) {
            sendGAEvent("event", "mobile_menu_opened")
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label={navUiLabels.menu[lang]}
                >
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{navUiLabels.menu[lang]}</SheetTitle>
                    <SheetDescription className="sr-only">
                        {navUiLabels.menu[lang]}
                    </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-1 px-4">
                    {navLinks.map((link) => {
                        const Icon = navLinkIcons[link.id] ?? HelpCircle
                        return (
                            <SheetClose asChild key={link.id}>
                                <Link
                                    href={link.href}
                                    onClick={() =>
                                        sendGAEvent("event", "nav_link_clicked", {
                                            linkType: link.id,
                                        })
                                    }
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                                >
                                    <Icon size={16} className="shrink-0" />
                                    <span>{link.label[lang]}</span>
                                </Link>
                            </SheetClose>
                        )
                    })}
                </nav>

                <SheetFooter className="mt-auto border-t">
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {navUiLabels.language[lang]}
                        </p>
                        <LanguageSwitcher />
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {navUiLabels.theme[lang]}
                        </p>
                        <ThemeSwitcher />
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
