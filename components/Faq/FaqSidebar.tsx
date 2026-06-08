"use client"

import { faqGroups, faqPageMeta } from "@/data/faq"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface FaqSidebarProps {
    activeGroupId: string
    onGroupClick: (groupId: string) => void
}

export default function FaqSidebar({
    activeGroupId,
    onGroupClick,
}: FaqSidebarProps) {
    const { lang } = useLanguage()

    return (
        <nav
            aria-labelledby="faq-sidebar-heading"
            className="hidden lg:block sticky top-24 self-start"
        >
            <h2
                id="faq-sidebar-heading"
                className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
                {faqPageMeta.tocTitle[lang]}
            </h2>
            <ul className="space-y-1">
                {faqGroups.map((group) => {
                    const Icon = group.icon
                    const isActive = activeGroupId === group.id

                    return (
                        <li key={group.id}>
                            <button
                                type="button"
                                onClick={() => onGroupClick(group.id)}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(
                                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-medium"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <Icon size={16} className="shrink-0" />
                                <span>{group.title[lang]}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export function useFaqScrollSpy(groupIds: string[]) {
    const [activeGroupId, setActiveGroupId] = useState(groupIds[0] ?? "")

    useEffect(() => {
        const sections = groupIds
            .map((id) => document.querySelector(`[data-faq-group="${id}"]`))
            .filter(Boolean) as Element[]

        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                if (visible[0]?.target instanceof HTMLElement) {
                    const id = visible[0].target.dataset.faqGroup
                    if (id) setActiveGroupId(id)
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [groupIds])

    const scrollToGroup = (groupId: string) => {
        const el = document.getElementById(groupId)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            setActiveGroupId(groupId)
        }
    }

    return { activeGroupId, scrollToGroup, setActiveGroupId }
}
