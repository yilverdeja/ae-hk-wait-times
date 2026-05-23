import { alternatives24Hour } from "@/data/alternatives"
import { formatCardPrice } from "@/lib/alternatives/card-preview"
import { getPrimaryChannel, resolveCurrentPrice } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import type { NearbyAlternativePreview } from "@/types/alternatives-nearby"
import { LanguageCode } from "@/types"
import { distance } from "@turf/turf"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const lat = Number(searchParams.get("lat"))
    const lng = Number(searchParams.get("lng"))
    const limit = Math.min(Number(searchParams.get("limit") ?? 3), 10)

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
        return NextResponse.json({ error: "lat and lng are required" }, { status: 400 })
    }

    const origin: [number, number] = [lng, lat]
    const ctx = scheduleContext()

    const nearby: NearbyAlternativePreview[] = alternatives24Hour
        .map((facility) => {
            const ch = getPrimaryChannel(facility, ctx)
            const price = ch ? resolveCurrentPrice(ch, ctx) : null
            const priceLabel = price
                ? {
                      [LanguageCode.EN]: formatCardPrice(price, LanguageCode.EN),
                      [LanguageCode.ZH]: formatCardPrice(price, LanguageCode.ZH),
                      [LanguageCode.CN]: formatCardPrice(price, LanguageCode.CN),
                  }
                : {
                      [LanguageCode.EN]: "",
                      [LanguageCode.ZH]: "",
                      [LanguageCode.CN]: "",
                  }

            return {
                slug: facility.slug,
                name: facility.name,
                distanceKm: distance(
                    origin,
                    [
                        facility.location.coordinates.longitude,
                        facility.location.coordinates.latitude,
                    ],
                    { units: "kilometers" }
                ),
                priceLabel,
            }
        })
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, limit)

    return NextResponse.json(nearby, {
        headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
    })
}
