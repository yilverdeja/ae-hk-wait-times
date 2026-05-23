"use client"

import { AlternativeCardFooter } from "@/components/Alternatives/AlternativeCardFooter"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    enrichOpenStatusWithTransition,
    formatCardPrice,
    resolveScheduleTransition,
    resolveUpcomingPriceChange,
} from "@/lib/alternatives/card-preview"
import { alternativeName } from "@/lib/alternatives/display"
import {
    getPrimaryChannel,
    isChannelOpenNow,
    resolveCurrentPrice,
} from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import { formatDistance } from "@/lib/map"
import type { Alternative } from "@/types/alternatives"
import { isPhysicalAlternative } from "@/types/alternatives"
import type { Coordinates } from "@/types"
import { LanguageCode } from "@/types"
import { distance } from "@turf/turf"
import { Clock, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

const texts = {
    [LanguageCode.EN]: {
        telehealth: "Telehealth",
        seeFee: "See details for pricing",
        estCost: "Est. cost",
        open24h: "Open 24 hours",
        openNow: "Open now",
        closed: "Closed",
        appointmentOnly: "By appointment",
        closesIn: (m: number) => `Closes in ${m} min`,
        opensIn: (m: number) => `Opens in ${m} min`,
        closedUntil: (time: string) => `Closed until ${time}`,
        priceIn: (price: string, m: number) => `${price} in ${m} min`,
        away: "away",
    },
    [LanguageCode.ZH]: {
        telehealth: "遠程醫療",
        seeFee: "詳情查看費用",
        estCost: "預估費用",
        open24h: "24小時開放",
        openNow: "現正開放",
        closed: "已關閉",
        appointmentOnly: "只限預約",
        closesIn: (m: number) => `${m}分鐘後關閉`,
        opensIn: (m: number) => `${m}分鐘後開放`,
        closedUntil: (time: string) => `${time} 開放`,
        priceIn: (price: string, m: number) => `${m}分鐘後 ${price}`,
        away: "距離",
    },
    [LanguageCode.CN]: {
        telehealth: "远程医疗",
        seeFee: "详情查看费用",
        estCost: "预估费用",
        open24h: "24小时开放",
        openNow: "现正开放",
        closed: "已关闭",
        appointmentOnly: "仅限预约",
        closesIn: (m: number) => `${m}分钟后关闭`,
        opensIn: (m: number) => `${m}分钟后开放`,
        closedUntil: (time: string) => `${time} 开放`,
        priceIn: (price: string, m: number) => `${m}分钟后 ${price}`,
        away: "距离",
    },
}

interface AlternativeCardProps {
    entry: Alternative
    lang: LanguageCode
    userCoords?: Coordinates | null
}

function formatDistanceWithAway(km: number, lang: LanguageCode, t: (typeof texts)[LanguageCode.EN]): string {
    const dist = formatDistance(km)
    if (lang === LanguageCode.EN) {
        return `${dist} ${t.away}`.trim()
    }
    return `${t.away} ${dist}`
}

export function AlternativeCard({ entry, lang, userCoords = null }: AlternativeCardProps) {
    const t = texts[lang]
    const ctx = useMemo(() => scheduleContext(), [])

    const channel = useMemo(() => getPrimaryChannel(entry, ctx), [entry, ctx])

    const openStatus = useMemo(() => {
        if (!channel) return null
        const status = isChannelOpenNow(channel, ctx)
        return enrichOpenStatusWithTransition(channel.schedule, status, ctx)
    }, [channel, ctx])

    const scheduleTransition = useMemo(() => {
        if (!channel) return null
        return resolveScheduleTransition(channel.schedule, ctx)
    }, [channel, ctx])

    const price = channel ? resolveCurrentPrice(channel, ctx) : null

    const upcomingPrice = useMemo(() => {
        if (!channel) return null
        return resolveUpcomingPriceChange(channel.pricing, ctx)
    }, [channel, ctx])

    const distanceKm = useMemo(() => {
        if (!userCoords || !isPhysicalAlternative(entry)) return null
        return distance(
            [userCoords.longitude, userCoords.latitude],
            [
                entry.location.coordinates.longitude,
                entry.location.coordinates.latitude,
            ],
            { units: "kilometers" }
        )
    }, [userCoords, entry])

    const typeLabel = isPhysicalAlternative(entry) ? entry.providerType : t.telehealth

    const statusBadge = (() => {
        if (!openStatus) return null

        const transition = scheduleTransition
        const withinHour = transition && transition.minutesUntil <= 60

        if (openStatus.kind === "always_open") {
            return (
                <Badge className="text-[10px] px-1.5 py-0 bg-emerald-600 hover:bg-emerald-600">
                    {t.open24h}
                </Badge>
            )
        }

        if (openStatus.kind === "open") {
            if (withinHour && transition?.kind === "closes") {
                return (
                    <Badge className="text-[10px] px-1.5 py-0 bg-emerald-600 hover:bg-emerald-600">
                        {t.closesIn(transition.minutesUntil)}
                    </Badge>
                )
            }
            return (
                <Badge className="text-[10px] px-1.5 py-0 bg-emerald-600 hover:bg-emerald-600">
                    {t.openNow}
                </Badge>
            )
        }

        if (openStatus.kind === "closed") {
            if (withinHour && transition?.kind === "opens") {
                return (
                    <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 text-muted-foreground border-dashed"
                    >
                        {t.opensIn(transition.minutesUntil)}
                    </Badge>
                )
            }
            if (transition?.kind === "opens") {
                return (
                    <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 text-muted-foreground border-dashed"
                    >
                        {t.closedUntil(transition.atLabel[lang])}
                    </Badge>
                )
            }
            return (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    {t.closed}
                </Badge>
            )
        }

        if (openStatus.kind === "appointment_only") {
            return (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {t.appointmentOnly}
                </Badge>
            )
        }

        return null
    })()

    const primaryPrice = price ? formatCardPrice(price, lang) : t.seeFee
    const upcomingPriceLine =
        upcomingPrice && price
            ? t.priceIn(formatCardPrice(upcomingPrice.price, lang), upcomingPrice.minutesUntil)
            : null

    return (
        <Link href={`/alternatives/${entry.slug}`} className="block h-full">
            <Card className="h-full gap-0 py-0 transition-colors hover:bg-muted/50 cursor-pointer">
                <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-sm font-semibold leading-snug">
                        {alternativeName(entry, lang)}
                    </h3>

                    <div className="flex items-start justify-between gap-3">
                        {/* Location first: stable when distance is unavailable */}
                        <div className="min-w-0 flex flex-col gap-0.5">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                {isPhysicalAlternative(entry) ? (
                                    <>
                                        <MapPin size={12} className="shrink-0" aria-hidden />
                                        <span className="truncate">{entry.location.district}</span>
                                    </>
                                ) : (
                                    <>
                                        <Smartphone size={12} className="shrink-0" aria-hidden />
                                        <span className="truncate">{entry.providerType}</span>
                                    </>
                                )}
                            </div>
                            {distanceKm != null && (
                                <span className="text-[11px] text-muted-foreground/80 tabular-nums pl-[18px]">
                                    {formatDistanceWithAway(distanceKm, lang, t)}
                                </span>
                            )}
                        </div>

                        {/* Status + type: decision-oriented, right-aligned */}
                        <div className="flex shrink-0 flex-col items-end gap-1">
                            {statusBadge}
                            <span className="text-[11px] text-muted-foreground leading-none">
                                {typeLabel}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 border-t pt-2">
                        <span className="text-xs text-muted-foreground">{t.estCost}</span>
                        <div className="text-right min-w-0">
                            <p className="text-sm font-semibold tabular-nums">{primaryPrice}</p>
                            {upcomingPriceLine && (
                                <p className="text-xs text-muted-foreground">{upcomingPriceLine}</p>
                            )}
                        </div>
                    </div>

                    {channel && openStatus?.kind === "unknown" && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground line-clamp-2">
                            <Clock size={11} className="shrink-0" aria-hidden />
                            {openStatus.label[lang]}
                        </p>
                    )}

                    <AlternativeCardFooter entry={entry} channel={channel} lang={lang} />
                </div>
            </Card>
        </Link>
    )
}
