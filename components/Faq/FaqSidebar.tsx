"use client"

import { faqGroups, faqPageMeta } from "@/data/faq"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"

const SCROLL_SPY_OFFSET = 96 // matches scroll-mt-24 / sticky top-24
const PROGRAMMATIC_SCROLL_FALLBACK_MS = 1500
const POST_PROGRAMMATIC_GRACE_MS = 150

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

export function useFaqGroupNav(groupIds: string[]) {
    const [activeGroupId, setActiveGroupId] = useState(groupIds[0] ?? "")

    const isProgrammaticScrollRef = useRef(false)
    const spyLockedRef = useRef(false)
    const lastScrollYRef = useRef(0)
    const ignoreScrollUntilRef = useRef(0)
    const programmaticScrollTimerRef = useRef<ReturnType<
        typeof setTimeout
    > | null>(null)

    const getVisibleGroupFromScroll = useCallback(() => {
        let active = groupIds[0] ?? ""
        for (const id of groupIds) {
            const el = document.getElementById(id)
            if (!el) continue
            if (el.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) {
                active = id
            } else {
                break
            }
        }
        return active
    }, [groupIds])

    const clearProgrammaticScrollTimer = useCallback(() => {
        if (programmaticScrollTimerRef.current) {
            clearTimeout(programmaticScrollTimerRef.current)
            programmaticScrollTimerRef.current = null
        }
    }, [])

    const endProgrammaticScroll = useCallback(() => {
        isProgrammaticScrollRef.current = false
        lastScrollYRef.current = window.scrollY
        ignoreScrollUntilRef.current = Date.now() + POST_PROGRAMMATIC_GRACE_MS
        clearProgrammaticScrollTimer()
    }, [clearProgrammaticScrollTimer])

    const startProgrammaticScroll = useCallback(() => {
        isProgrammaticScrollRef.current = true
        clearProgrammaticScrollTimer()
        programmaticScrollTimerRef.current = setTimeout(
            endProgrammaticScroll,
            PROGRAMMATIC_SCROLL_FALLBACK_MS
        )
    }, [clearProgrammaticScrollTimer, endProgrammaticScroll])

    const scrollToElement = useCallback(
        (elementId: string) => {
            const el = document.getElementById(elementId)
            if (!el) return

            startProgrammaticScroll()
            const top = Math.max(
                0,
                el.getBoundingClientRect().top +
                    window.scrollY -
                    SCROLL_SPY_OFFSET
            )
            window.scrollTo({ top, behavior: "smooth" })
        },
        [startProgrammaticScroll]
    )

    const selectGroup = useCallback(
        (groupId: string) => {
            spyLockedRef.current = true
            setActiveGroupId(groupId)
            scrollToElement(groupId)
        },
        [scrollToElement]
    )

    const selectGroupAndScrollTo = useCallback(
        (groupId: string, elementId: string) => {
            spyLockedRef.current = true
            setActiveGroupId(groupId)
            scrollToElement(elementId)
        },
        [scrollToElement]
    )

    useEffect(() => {
        let rafId = 0

        lastScrollYRef.current = window.scrollY
        setActiveGroupId(getVisibleGroupFromScroll())

        const handleScroll = () => {
            if (isProgrammaticScrollRef.current) return
            if (Date.now() < ignoreScrollUntilRef.current) return

            const scrollY = window.scrollY
            if (scrollY === lastScrollYRef.current) return
            lastScrollYRef.current = scrollY

            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                spyLockedRef.current = false
                setActiveGroupId(getVisibleGroupFromScroll())
            })
        }

        const handleScrollEnd = () => {
            if (!isProgrammaticScrollRef.current) return
            endProgrammaticScroll()
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("scrollend", handleScrollEnd)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("scrollend", handleScrollEnd)
            cancelAnimationFrame(rafId)
            clearProgrammaticScrollTimer()
            isProgrammaticScrollRef.current = false
        }
    }, [
        getVisibleGroupFromScroll,
        endProgrammaticScroll,
        clearProgrammaticScrollTimer,
    ])

    return {
        activeGroupId,
        selectGroup,
        selectGroupAndScrollTo,
    }
}
