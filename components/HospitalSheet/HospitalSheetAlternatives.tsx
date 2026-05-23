"use client"

import { localized } from "@/lib/alternatives/display"
import type { NearbyAlternativePreview } from "@/types/alternatives-nearby"
import { LanguageCode } from "@/types"
import type { Coordinates } from "@/types"
import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const WAIT_TIME_THRESHOLD_MINUTES = 120

const texts = {
    [LanguageCode.EN]: {
        title: "Consider Alternatives",
        subtitle: "Nearby 24-hour private facilities",
        viewAll: "View all options",
        km: "km away",
        loading: "Loading nearby options…",
        error: "Could not load nearby alternatives.",
    },
    [LanguageCode.ZH]: {
        title: "考慮其他選擇",
        subtitle: "附近24小時私家醫院",
        viewAll: "查看所有選項",
        km: "公里",
        loading: "正在載入附近選項…",
        error: "無法載入附近選項。",
    },
    [LanguageCode.CN]: {
        title: "考虑其他选择",
        subtitle: "附近24小时私家医院",
        viewAll: "查看所有选项",
        km: "公里",
        loading: "正在加载附近选项…",
        error: "无法加载附近选项。",
    },
}

interface HospitalSheetAlternativesProps {
    hospitalCoordinates: Coordinates
    waitTimeMinutes: number
    lang: LanguageCode
    isOpen: boolean
}

export function HospitalSheetAlternatives({
    hospitalCoordinates,
    waitTimeMinutes,
    lang,
    isOpen,
}: HospitalSheetAlternativesProps) {
    const [nearby, setNearby] = useState<NearbyAlternativePreview[] | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const shouldFetch = isOpen && waitTimeMinutes >= WAIT_TIME_THRESHOLD_MINUTES

    useEffect(() => {
        if (!shouldFetch) {
            setNearby(null)
            setError(false)
            setLoading(false)
            return
        }

        let cancelled = false
        setLoading(true)
        setError(false)

        const { latitude, longitude } = hospitalCoordinates
        const url = `/api/alternatives/nearby-24h?lat=${latitude}&lng=${longitude}&limit=3`

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("fetch failed")
                return res.json() as Promise<NearbyAlternativePreview[]>
            })
            .then((data) => {
                if (!cancelled) {
                    setNearby(data)
                    setLoading(false)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError(true)
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [shouldFetch, hospitalCoordinates.latitude, hospitalCoordinates.longitude])

    if (!shouldFetch) return null

    const t = texts[lang]

    if (loading) {
        return (
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
                <p className="text-xs text-amber-700 dark:text-amber-400 animate-pulse">
                    {t.loading}
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
                <p className="text-xs text-amber-700 dark:text-amber-400">{t.error}</p>
            </div>
        )
    }

    if (!nearby || nearby.length === 0) return null

    return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
            <div className="flex items-center gap-2 mb-1">
                <Building2 size={16} className="text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    {t.title}
                </h3>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">{t.subtitle}</p>
            <ul className="space-y-2">
                {nearby.map(({ slug, name, distanceKm, priceLabel }) => (
                    <li key={slug}>
                        <Link
                            href={`/alternatives/${slug}`}
                            target="_blank"
                            className="flex items-start justify-between gap-2 text-sm hover:underline"
                        >
                            <span className="font-medium leading-snug">
                                {localized(name, lang)}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                                {distanceKm.toFixed(1)} {t.km}
                            </span>
                        </Link>
                        {priceLabel[lang] && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {priceLabel[lang]}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            <Link
                href="/alternatives/category/24hour"
                target="_blank"
                className="mt-3 inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 hover:underline"
            >
                {t.viewAll}
                <ArrowRight size={12} />
            </Link>
        </div>
    )
}
