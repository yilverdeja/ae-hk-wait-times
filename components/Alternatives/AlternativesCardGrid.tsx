"use client"

import { AlternativeCard } from "@/components/Alternatives/AlternativeCard"
import { AlternativesUserLocationProvider } from "@/components/Alternatives/AlternativesUserLocationContext"
import { useLanguage } from "@/hooks/useLanguage"
import type { AlternativeCardModel } from "@/types/alternatives-card"
import { useMemo } from "react"

const OPEN_SORT_RANK: Record<string, number> = {
    always_open: 0,
    open: 1,
    appointment_only: 2,
    unknown: 3,
    closed: 4,
}

function openSortRank(card: AlternativeCardModel): number {
    return OPEN_SORT_RANK[card.filterMeta.openKind] ?? 5
}

interface AlternativesCardGridProps {
    cards: AlternativeCardModel[]
    scheduleAt: string
}

function AlternativesCardGridInner({ cards }: AlternativesCardGridProps) {
    const { lang } = useLanguage()

    const sorted = useMemo(() => {
        return [...cards].sort((a, b) => openSortRank(a) - openSortRank(b))
    }, [cards])

    return (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {sorted.map((card) => (
                <AlternativeCard key={card.slug} entry={card} lang={lang} />
            ))}
        </div>
    )
}

export function AlternativesCardGrid({ cards, scheduleAt }: AlternativesCardGridProps) {
    void scheduleAt
    return (
        <AlternativesUserLocationProvider>
            <AlternativesCardGridInner cards={cards} scheduleAt={scheduleAt} />
        </AlternativesUserLocationProvider>
    )
}
