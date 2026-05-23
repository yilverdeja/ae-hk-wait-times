"use client"

import { AlternativeCard } from "@/components/Alternatives/AlternativeCard"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useUserLocationInHongKong } from "@/hooks/useUserLocationInHongKong"
import { useLanguage } from "@/hooks/useLanguage"
import { getPrimaryChannel, isChannelOpenNow } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import {
    ALTERNATIVE_CATEGORIES,
    type AlternativeCategory,
} from "@/types/alternatives"
import type { Alternative } from "@/types/alternatives"
import { LanguageCode } from "@/types"
import { Loader2, LocateFixed } from "lucide-react"
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

const locationBannerTexts = {
    [LanguageCode.EN]: {
        prompt: "Show distances from you",
        locating: "Getting your location…",
    },
    [LanguageCode.ZH]: {
        prompt: "顯示與您的距離",
        locating: "正在取得位置…",
    },
    [LanguageCode.CN]: {
        prompt: "显示与您的距离",
        locating: "正在取得位置…",
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
    const locationTexts = locationBannerTexts[lang]
    const router = useRouter()
    const pathname = usePathname()

    const {
        userCoords,
        isGeolocationAvailable,
        isDenied,
        isLocating,
        permissionState,
        requestLocation,
    } = useUserLocationInHongKong()

    const showLocationBanner =
        isGeolocationAvailable &&
        !userCoords &&
        !isDenied &&
        permissionState !== "granted"

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

            {(showLocationBanner || isLocating) && (
                <div className="mt-4">
                    {isLocating ? (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 size={14} className="animate-spin" aria-hidden />
                            {locationTexts.locating}
                        </p>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={requestLocation}
                        >
                            <LocateFixed size={14} className="mr-1.5" aria-hidden />
                            {locationTexts.prompt}
                        </Button>
                    )}
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((entry) => (
                    <AlternativeCard
                        key={entry.slug}
                        entry={entry}
                        lang={lang}
                        userCoords={userCoords}
                    />
                ))}
            </div>
        </>
    )
}
