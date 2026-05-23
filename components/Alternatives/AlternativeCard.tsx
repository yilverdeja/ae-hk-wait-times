"use client"

import { AlternativeCardFooter } from "@/components/Alternatives/AlternativeCardFooter"
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
import { AlternativeCardDistance } from "@/components/Alternatives/AlternativeCardDistance"
import { useScheduleContext } from "@/hooks/useScheduleContext"
import { cn } from "@/lib/utils"
import type { Alternative } from "@/types/alternatives"
import { isPhysicalAlternative } from "@/types/alternatives"
import { LanguageCode } from "@/types"
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
    },
}

type StatusTone = "open" | "warning" | "muted" | "neutral"

interface StatusDisplay {
    label: string
    tone: StatusTone
}

interface AlternativeCardProps {
    entry: Alternative
    lang: LanguageCode
    scheduleAt: string
}

function MetaDot({ tone }: { tone: StatusTone }) {
    return (
        <span
            className={cn(
                "size-1.5 shrink-0 rounded-full",
                tone === "open" && "bg-emerald-500",
                tone === "warning" && "bg-amber-500",
                tone === "muted" && "bg-muted-foreground/35",
                tone === "neutral" && "bg-muted-foreground/35"
            )}
            aria-hidden
        />
    )
}

function StatusLine({ label, tone }: StatusDisplay) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 font-normal",
                tone === "open" && "text-emerald-700/90 dark:text-emerald-400/90",
                tone === "warning" && "text-amber-700/90 dark:text-amber-400/90",
                tone === "muted" && "text-muted-foreground",
                tone === "neutral" && "text-muted-foreground"
            )}
        >
            <MetaDot tone={tone} />
            {label}
        </span>
    )
}

function MetaSeparator() {
    return (
        <span className="text-muted-foreground/40 select-none" aria-hidden>
            ·
        </span>
    )
}

function resolveStatusDisplay(
    openStatus: ReturnType<typeof isChannelOpenNow> | null,
    scheduleTransition: ReturnType<typeof resolveScheduleTransition>,
    t: (typeof texts)[LanguageCode.EN],
    lang: LanguageCode
): StatusDisplay | null {
    if (!openStatus) return null

    const transition = scheduleTransition
    const withinHour = transition && transition.minutesUntil <= 60

    if (openStatus.kind === "always_open") {
        return { label: t.open24h, tone: "open" }
    }

    if (openStatus.kind === "open") {
        if (withinHour && transition?.kind === "closes") {
            return { label: t.closesIn(transition.minutesUntil), tone: "warning" }
        }
        return { label: t.openNow, tone: "open" }
    }

    if (openStatus.kind === "closed") {
        if (withinHour && transition?.kind === "opens") {
            return { label: t.opensIn(transition.minutesUntil), tone: "muted" }
        }
        if (transition?.kind === "opens") {
            return { label: t.closedUntil(transition.atLabel[lang]), tone: "muted" }
        }
        return { label: t.closed, tone: "muted" }
    }

    if (openStatus.kind === "appointment_only") {
        return { label: t.appointmentOnly, tone: "neutral" }
    }

    return null
}

export function AlternativeCard({ entry, lang, scheduleAt }: AlternativeCardProps) {
    const t = texts[lang]
    const ctx = useScheduleContext(false, scheduleAt)

    const channel = useMemo(() => getPrimaryChannel(entry, ctx), [entry, ctx])

    /** Walk-in hours follow the primary channel schedule (not a secondary open service). */
    const statusChannel = useMemo(
        () => entry.channels.find((c) => c.primary) ?? entry.channels[0] ?? null,
        [entry]
    )

    const openStatus = useMemo(() => {
        if (!statusChannel) return null
        const status = isChannelOpenNow(statusChannel, ctx)
        return enrichOpenStatusWithTransition(statusChannel.schedule, status, ctx)
    }, [statusChannel, ctx])

    const scheduleTransition = useMemo(() => {
        if (!statusChannel) return null
        return resolveScheduleTransition(statusChannel.schedule, ctx)
    }, [statusChannel, ctx])

    const statusDisplay = useMemo(
        () => resolveStatusDisplay(openStatus, scheduleTransition, t, lang),
        [openStatus, scheduleTransition, t, lang]
    )

    const price = channel ? resolveCurrentPrice(channel, ctx) : null

    const upcomingPrice = useMemo(() => {
        if (!channel) return null
        return resolveUpcomingPriceChange(channel.pricing, ctx)
    }, [channel, ctx])

    const typeLabel = isPhysicalAlternative(entry) ? entry.providerType : t.telehealth

    const primaryPrice = price ? formatCardPrice(price, lang) : t.seeFee
    const upcomingPriceLine =
        upcomingPrice && price
            ? t.priceIn(formatCardPrice(upcomingPrice.price, lang), upcomingPrice.minutesUntil)
            : null

    const locationPrimary = isPhysicalAlternative(entry)
        ? entry.location.district
        : entry.providerType

    return (
        <Link href={`/alternatives/${entry.slug}`} className="block h-full">
            <Card className="h-full gap-0 py-0 transition-colors hover:bg-muted/50 cursor-pointer">
                <div className="flex flex-col gap-1.5 p-4">
                    {(typeLabel || statusDisplay) && (
                        <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-snug text-muted-foreground">
                            {typeLabel && <span>{typeLabel}</span>}
                            {typeLabel && statusDisplay && <MetaSeparator />}
                            {statusDisplay && <StatusLine {...statusDisplay} />}
                        </p>
                    )}

                    <h3 className="text-sm font-semibold leading-snug tracking-tight">
                        {alternativeName(entry, lang)}
                    </h3>

                    <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                        {isPhysicalAlternative(entry) ? (
                            <MapPin size={12} className="shrink-0 opacity-70" aria-hidden />
                        ) : (
                            <Smartphone size={12} className="shrink-0 opacity-70" aria-hidden />
                        )}
                        <span className="truncate">{locationPrimary}</span>
                        {isPhysicalAlternative(entry) && (
                            <AlternativeCardDistance entry={entry} lang={lang} />
                        )}
                    </p>

                    <div className="mt-1.5 flex items-baseline justify-between gap-3 border-t border-border/60 pt-2.5">
                        <span className="text-xs text-muted-foreground">{t.estCost}</span>
                        <div className="text-right min-w-0">
                            <p className="text-sm font-semibold tabular-nums tracking-tight">
                                {primaryPrice}
                            </p>
                            {upcomingPriceLine && (
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                    {upcomingPriceLine}
                                </p>
                            )}
                        </div>
                    </div>

                    {channel && openStatus?.kind === "unknown" && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground line-clamp-2">
                            <Clock size={11} className="shrink-0 opacity-70" aria-hidden />
                            {openStatus.label[lang]}
                        </p>
                    )}

                    <AlternativeCardFooter entry={entry} channel={channel} lang={lang} />
                </div>
            </Card>
        </Link>
    )
}
