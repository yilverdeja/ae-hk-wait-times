"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { alternativeName } from "@/lib/alternatives/display"
import {
    getEligibilityBadge,
    getPrimaryChannel,
    isChannelOpenNow,
    resolveCurrentPrice,
} from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
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
        open24h: "Open 24 hours",
        openNow: "Open now",
        closed: "Closed",
        appointmentOnly: "By appointment",
    },
    [LanguageCode.ZH]: {
        telehealth: "遠程醫療",
        seeFee: "詳情查看費用",
        open24h: "24小時開放",
        openNow: "現正開放",
        closed: "已關閉",
        appointmentOnly: "只限預約",
    },
    [LanguageCode.CN]: {
        telehealth: "远程医疗",
        seeFee: "详情查看费用",
        open24h: "24小时开放",
        openNow: "现正开放",
        closed: "已关闭",
        appointmentOnly: "仅限预约",
    },
}

interface AlternativeCardProps {
    entry: Alternative
    lang: LanguageCode
}

export function AlternativeCard({ entry, lang }: AlternativeCardProps) {
    const t = texts[lang]
    const ctx = useMemo(() => scheduleContext(), [])

    const channel = useMemo(() => getPrimaryChannel(entry, ctx), [entry, ctx])
    const openStatus = channel ? isChannelOpenNow(channel, ctx) : null
    const price = channel ? resolveCurrentPrice(channel, ctx) : null
    const eligibilityBadge = channel ? getEligibilityBadge(channel, lang) : null

    const typeLabel = isPhysicalAlternative(entry) ? entry.providerType : t.telehealth

    const statusBadge =
        openStatus &&
        (openStatus.kind === "open" || openStatus.kind === "always_open" ? (
            <Badge className="text-[10px] px-1.5 py-0 bg-emerald-600 hover:bg-emerald-600">
                {openStatus.kind === "always_open" ? t.open24h : t.openNow}
            </Badge>
        ) : openStatus.kind === "appointment_only" ? (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {t.appointmentOnly}
            </Badge>
        ) : openStatus.kind === "closed" ? (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                {t.closed}
            </Badge>
        ) : null)

    return (
        <Link href={`/alternatives/${entry.slug}`}>
            <Card className="h-full transition-colors hover:bg-muted/50 cursor-pointer">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold leading-snug">
                            {alternativeName(entry, lang)}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                            {typeLabel}
                        </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        {statusBadge}
                        {eligibilityBadge && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {eligibilityBadge}
                            </Badge>
                        )}
                    </div>
                    {isPhysicalAlternative(entry) ? (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={12} />
                            {entry.location.district}
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Smartphone size={12} />
                            {entry.providerType}
                        </span>
                    )}
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-medium tabular-nums">
                        {price?.label[lang] ?? t.seeFee}
                    </p>
                    {channel && openStatus?.kind === "unknown" && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground line-clamp-1">
                            <Clock size={11} />
                            {openStatus.label[lang]}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
