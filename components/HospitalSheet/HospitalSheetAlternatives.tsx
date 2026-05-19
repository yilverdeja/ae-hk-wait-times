"use client"

import { alternatives24Hour } from "@/data/alternatives"
import { LanguageCode } from "@/types"
import type { Coordinates } from "@/types"
import { distance } from "@turf/turf"
import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

const WAIT_TIME_THRESHOLD_MINUTES = 120

const texts = {
    [LanguageCode.EN]: {
        title: "Consider Alternatives",
        subtitle: "Nearby 24-hour private facilities",
        viewAll: "View all options",
        km: "km away",
    },
    [LanguageCode.ZH]: {
        title: "考慮其他選擇",
        subtitle: "附近24小時私家醫院",
        viewAll: "查看所有選項",
        km: "公里",
    },
    [LanguageCode.CN]: {
        title: "考虑其他选择",
        subtitle: "附近24小时私家医院",
        viewAll: "查看所有选项",
        km: "公里",
    },
}

interface HospitalSheetAlternativesProps {
    hospitalCoordinates: Coordinates
    waitTimeMinutes: number
    lang: LanguageCode
}

export function HospitalSheetAlternatives({
    hospitalCoordinates,
    waitTimeMinutes,
    lang,
}: HospitalSheetAlternativesProps) {
    if (waitTimeMinutes < WAIT_TIME_THRESHOLD_MINUTES) return null

    const t = texts[lang]
    const origin = [hospitalCoordinates.longitude, hospitalCoordinates.latitude] as [number, number]

    const nearby = alternatives24Hour
        .map((facility) => ({
            facility,
            distanceKm: distance(
                origin,
                [facility.coordinates.longitude, facility.coordinates.latitude],
                { units: "kilometers" }
            ),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 3)

    if (nearby.length === 0) return null

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
                {nearby.map(({ facility, distanceKm }) => (
                    <li key={facility.slug}>
                        <Link
                            href={`/alternatives/${facility.slug}`}
                            className="flex items-start justify-between gap-2 text-sm hover:underline"
                        >
                            <span className="font-medium leading-snug">
                                {lang === LanguageCode.EN
                                    ? facility.name.en
                                    : (facility.name.zh ?? facility.name.en)}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                                {distanceKm.toFixed(1)} {t.km}
                            </span>
                        </Link>
                        {facility.baseConsultationFee && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {facility.baseConsultationFee}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            <Link
                href="/alternatives"
                className="mt-3 inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 hover:underline"
            >
                {t.viewAll}
                <ArrowRight size={12} />
            </Link>
        </div>
    )
}
