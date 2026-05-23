"use client"

import { AlternativeCardFooter } from "@/components/Alternatives/AlternativeCardFooter"
import { AlternativeCardDistance } from "@/components/Alternatives/AlternativeCardDistance"
import { Card } from "@/components/ui/card"
import { localized } from "@/lib/alternatives/display"
import { cn } from "@/lib/utils"
import type { AlternativeCardModel, AlternativeCardStatusTone } from "@/types/alternatives-card"
import { LanguageCode } from "@/types"
import { Clock, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"

const texts = {
    [LanguageCode.EN]: {
        telehealth: "Telehealth",
        estCost: "Est. cost",
    },
    [LanguageCode.ZH]: {
        telehealth: "遠程醫療",
        estCost: "預估費用",
    },
    [LanguageCode.CN]: {
        telehealth: "远程医疗",
        estCost: "预估费用",
    },
}

function MetaDot({ tone }: { tone: AlternativeCardStatusTone }) {
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

function StatusLine({ label, tone }: { label: string; tone: AlternativeCardStatusTone }) {
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

interface AlternativeCardProps {
    entry: AlternativeCardModel
    lang: LanguageCode
}

export function AlternativeCard({ entry, lang }: AlternativeCardProps) {
    const t = texts[lang]
    const typeLabel = entry.isPhysical ? entry.providerType : t.telehealth
    const statusDisplay = entry.statusDisplay
    const primaryPrice = entry.price.primary[lang]
    const upcomingPriceLine = entry.price.upcoming?.[lang]

    return (
        <Link href={`/alternatives/${entry.slug}`} className="block h-full">
            <Card className="h-full gap-0 py-0 transition-colors hover:bg-muted/50 cursor-pointer">
                <div className="flex flex-col gap-1.5 p-4">
                    {(typeLabel || statusDisplay) && (
                        <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-snug text-muted-foreground">
                            {typeLabel && <span>{typeLabel}</span>}
                            {typeLabel && statusDisplay && <MetaSeparator />}
                            {statusDisplay && (
                                <StatusLine
                                    label={statusDisplay.label[lang]}
                                    tone={statusDisplay.tone}
                                />
                            )}
                        </p>
                    )}

                    <h3 className="text-sm font-semibold leading-snug tracking-tight">
                        {localized(entry.name, lang)}
                    </h3>

                    <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                        {entry.isPhysical ? (
                            <MapPin size={12} className="shrink-0 opacity-70" aria-hidden />
                        ) : (
                            <Smartphone size={12} className="shrink-0 opacity-70" aria-hidden />
                        )}
                        <span className="truncate">{entry.locationLabel}</span>
                        {entry.coordinates && (
                            <AlternativeCardDistance coordinates={entry.coordinates} lang={lang} />
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

                    {entry.unknownStatusLabel && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground line-clamp-2">
                            <Clock size={11} className="shrink-0 opacity-70" aria-hidden />
                            {entry.unknownStatusLabel[lang]}
                        </p>
                    )}

                    {entry.footer && <AlternativeCardFooter footer={entry.footer} lang={lang} />}
                </div>
            </Card>
        </Link>
    )
}
