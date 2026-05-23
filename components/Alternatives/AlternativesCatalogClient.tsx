"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { AlternativesCardGrid } from "@/components/Alternatives/AlternativesCardGrid"
import type { AlternativeCardModel } from "@/types/alternatives-card"

interface AlternativesCatalogClientProps {
    cards: AlternativeCardModel[]
    scheduleAt: string
}

const OPEN_KINDS = new Set(["always_open", "open"])

/**
 * Client wrapper for the alternatives directory.
 * Applies URL query filters without forcing the server page dynamic.
 *
 * Supported query params (future UI):
 * - open=1 — open now / always open
 * - walkIn=1 — walk-in allowed
 * - maxPrice=<number> — sortPriceHkd <= value
 */
export function AlternativesCatalogClient({ cards, scheduleAt }: AlternativesCatalogClientProps) {
    const searchParams = useSearchParams()

    const filtered = useMemo(() => {
        let result = cards

        if (searchParams.get("open") === "1") {
            result = result.filter((c) => OPEN_KINDS.has(c.filterMeta.openKind))
        }

        if (searchParams.get("walkIn") === "1") {
            result = result.filter((c) => c.filterMeta.walkInAllowed)
        }

        const maxPriceRaw = searchParams.get("maxPrice")
        if (maxPriceRaw) {
            const maxPrice = Number(maxPriceRaw)
            if (!Number.isNaN(maxPrice)) {
                result = result.filter(
                    (c) =>
                        c.filterMeta.sortPriceHkd != null &&
                        c.filterMeta.sortPriceHkd <= maxPrice
                )
            }
        }

        return result
    }, [cards, searchParams])

    return <AlternativesCardGrid cards={filtered} scheduleAt={scheduleAt} />
}
