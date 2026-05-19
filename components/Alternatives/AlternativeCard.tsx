"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type AlternativeEntry, isPhysicalFacility } from "@/data/alternatives"
import { LanguageCode } from "@/types"
import { Clock, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"

const texts = {
    [LanguageCode.EN]: {
        telehealth: "Telehealth",
        seeFee: "See details for pricing",
    },
    [LanguageCode.ZH]: {
        telehealth: "遠程醫療",
        seeFee: "詳情查看費用",
    },
    [LanguageCode.CN]: {
        telehealth: "远程医疗",
        seeFee: "详情查看费用",
    },
}

function localizedName(entry: AlternativeEntry, lang: LanguageCode): string {
    if (lang === LanguageCode.EN) return entry.name.en
    return entry.name.zh ?? entry.name.en
}

interface AlternativeCardProps {
    entry: AlternativeEntry
    lang: LanguageCode
}

export function AlternativeCard({ entry, lang }: AlternativeCardProps) {
    const t = texts[lang]

    let subtitle: React.ReactNode
    let feeText: string | null = null

    if (isPhysicalFacility(entry)) {
        subtitle = (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} />
                {entry.district}
            </span>
        )
        feeText = entry.baseConsultationFee
    } else {
        subtitle = (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Smartphone size={12} />
                {entry.providerType}
            </span>
        )
        if (entry.operatingHours) {
            subtitle = (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {entry.operatingHours.length > 50
                        ? entry.operatingHours.slice(0, 50) + "…"
                        : entry.operatingHours}
                </span>
            )
        }
        feeText = entry.pricing.baseConsultation
    }

    const typeLabel = isPhysicalFacility(entry) ? entry.type : t.telehealth

    return (
        <Link href={`/alternatives/${entry.slug}`}>
            <Card className="h-full transition-colors hover:bg-muted/50 cursor-pointer">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold leading-snug">
                            {localizedName(entry, lang)}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                            {typeLabel}
                        </Badge>
                    </div>
                    {subtitle}
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {feeText ?? t.seeFee}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
