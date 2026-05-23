"use client"

import { AlternativeCard } from "@/components/Alternatives/AlternativeCard"
import { AlternativesUserLocationProvider } from "@/components/Alternatives/AlternativesUserLocationContext"
import { useScheduleContext } from "@/hooks/useScheduleContext"
import { useLanguage } from "@/hooks/useLanguage"
import { getPrimaryChannel, isChannelOpenNow } from "@/lib/alternatives/resolve"
import type { ScheduleContext } from "@/types/alternatives"
import type { Alternative } from "@/types/alternatives"
import { useMemo } from "react"

const OPEN_SORT_RANK: Record<string, number> = {
    always_open: 0,
    open: 1,
    appointment_only: 2,
    unknown: 3,
    closed: 4,
}

function openSortRank(entry: Alternative, ctx: ScheduleContext): number {
    const channel = getPrimaryChannel(entry, ctx)
    if (!channel) return 5
    return OPEN_SORT_RANK[isChannelOpenNow(channel, ctx).kind] ?? 5
}

interface AlternativesCardGridProps {
    entries: Alternative[]
    scheduleAt: string
}

function AlternativesCardGridInner({ entries, scheduleAt }: AlternativesCardGridProps) {
    const { lang } = useLanguage()
    const ctx = useScheduleContext(false, scheduleAt)

    const sorted = useMemo(() => {
        return [...entries].sort((a, b) => openSortRank(a, ctx) - openSortRank(b, ctx))
    }, [entries, ctx])

    return (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((entry) => (
                <AlternativeCard key={entry.slug} entry={entry} lang={lang} scheduleAt={scheduleAt} />
            ))}
        </div>
    )
}

export function AlternativesCardGrid({ entries, scheduleAt }: AlternativesCardGridProps) {
    return (
        <AlternativesUserLocationProvider>
            <AlternativesCardGridInner entries={entries} scheduleAt={scheduleAt} />
        </AlternativesUserLocationProvider>
    )
}
