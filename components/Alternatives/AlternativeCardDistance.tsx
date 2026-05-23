"use client"

import { useAlternativesUserLocation } from "@/components/Alternatives/AlternativesUserLocationContext"
import { formatDistance, straightLineKm } from "@/lib/geo"
import type { Coordinates } from "@/types"
import { LanguageCode } from "@/types"
import { useMemo } from "react"

const awayLabels = {
    [LanguageCode.EN]: "away",
    [LanguageCode.ZH]: "距離",
    [LanguageCode.CN]: "距离",
}

interface AlternativeCardDistanceProps {
    coordinates: Coordinates
    lang: LanguageCode
}

/** Renders distance when user location is available; otherwise nothing. */
export function AlternativeCardDistance({ coordinates, lang }: AlternativeCardDistanceProps) {
    const userCoords = useAlternativesUserLocation()

    const label = useMemo(() => {
        if (!userCoords) return null
        const km = straightLineKm(userCoords, coordinates)
        const dist = formatDistance(km)
        const away = awayLabels[lang]
        if (lang === LanguageCode.EN) {
            return `${dist} ${away}`.trim()
        }
        return `${away} ${dist}`
    }, [userCoords, coordinates, lang])

    if (!label) return null

    return (
        <>
            <span className="text-muted-foreground/40 select-none" aria-hidden>
                ·
            </span>
            <span className="shrink-0 tabular-nums">{label}</span>
        </>
    )
}
