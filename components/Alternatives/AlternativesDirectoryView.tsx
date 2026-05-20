"use client"

import { AlternativeCard } from "@/components/Alternatives/AlternativeCard"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getPrimaryChannel, isChannelOpenNow } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import {
    ALTERNATIVE_CATEGORIES,
    type AlternativeCategory,
} from "@/types/alternatives"
import type { Alternative } from "@/types/alternatives"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

const categoryLabels = {
    [LanguageCode.EN]: {
        "24hour": "24-Hour Facilities",
        non24hour: "Outpatient Clinics",
        telehealth: "Telehealth",
    },
    [LanguageCode.ZH]: {
        "24hour": "24小時設施",
        non24hour: "普通科門診",
        telehealth: "遠程醫療",
    },
    [LanguageCode.CN]: {
        "24hour": "24小时设施",
        non24hour: "普通科门诊",
        telehealth: "远程医疗",
    },
}

const OPEN_SORT_RANK: Record<string, number> = {
    always_open: 0,
    open: 1,
    appointment_only: 2,
    unknown: 3,
    closed: 4,
}

function openSortRank(entry: Alternative): number {
    const ctx = scheduleContext()
    const channel = getPrimaryChannel(entry, ctx)
    if (!channel) return 5
    return OPEN_SORT_RANK[isChannelOpenNow(channel, ctx).kind] ?? 5
}

interface AlternativesDirectoryViewProps {
    alternatives: Alternative[]
    category: AlternativeCategory
}

export function AlternativesDirectoryView({
    alternatives,
    category,
}: AlternativesDirectoryViewProps) {
    const { lang } = useLanguage()
    const labels = categoryLabels[lang]
    const router = useRouter()
    const pathname = usePathname()

    const filtered = useMemo(() => {
        return alternatives
            .filter((e) => e.category === category)
            .sort((a, b) => openSortRank(a) - openSortRank(b))
    }, [alternatives, category])

    function handleCategoryChange(value: AlternativeCategory) {
        const params = new URLSearchParams()
        params.set("category", value)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <>
            <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:max-w-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {ALTERNATIVE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {labels[cat]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((entry) => (
                    <AlternativeCard key={entry.slug} entry={entry} lang={lang} />
                ))}
            </div>
        </>
    )
}
