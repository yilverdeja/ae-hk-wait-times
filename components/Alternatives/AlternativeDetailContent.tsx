"use client"

import { Badge } from "@/components/ui/badge"
import { localizedFacilityTag } from "@/lib/alternatives/catalog"
import { alternativeName, localized, telHref, voucherLabel } from "@/lib/alternatives/display"
import { VOUCHER_CATALOG } from "@/lib/alternatives/vouchers"
import { isChannelOpenNow, resolveCurrentPrice } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import type { Alternative, FeeTier, Schedule, ServiceChannel } from "@/types/alternatives"
import { isPhysicalAlternative, isTelehealthAlternative } from "@/types/alternatives"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import {
    ArrowLeft,
    Clock,
    ExternalLink,
    MapPin,
    Phone,
    Smartphone,
    Stethoscope,
    Ticket,
    Truck,
} from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

const texts = {
    [LanguageCode.EN]: {
        back: "Alternative Care Options",
        address: "Address",
        phone: "Phone",
        hours: "Operating Hours",
        facilities: "Facilities & Services",
        website: "Official Website",
        additionalInfo: "Additional Information",
        iosApp: "iOS App",
        androidApp: "Android App",
        deliveryNotes: "Delivery Speed",
        features: "Features",
        telehealth: "Telehealth",
        pricing: "Pricing",
        channels: "Services",
        sources: "Sources",
        openNow: "Open now",
        closed: "Closed",
        appointmentOnly: "By appointment only",
        alwaysOpen: "Open 24 hours",
        vouchers: "Accepted vouchers",
    },
    [LanguageCode.ZH]: {
        back: "替代醫療選項",
        address: "地址",
        phone: "電話",
        hours: "服務時間",
        facilities: "設施及服務",
        website: "官方網站",
        additionalInfo: "其他資訊",
        iosApp: "iOS 應用程式",
        androidApp: "Android 應用程式",
        deliveryNotes: "配送速度",
        features: "功能",
        telehealth: "遠程醫療",
        pricing: "收費",
        channels: "服務",
        sources: "資料來源",
        openNow: "現正開放",
        closed: "已關閉",
        appointmentOnly: "只限預約",
        alwaysOpen: "24小時開放",
        vouchers: "接受的醫療券",
    },
    [LanguageCode.CN]: {
        back: "替代医疗选项",
        address: "地址",
        phone: "电话",
        hours: "服务时间",
        facilities: "设施及服务",
        website: "官方网站",
        additionalInfo: "其他资讯",
        iosApp: "iOS 应用程序",
        androidApp: "Android 应用程序",
        deliveryNotes: "配送速度",
        features: "功能",
        telehealth: "远程医疗",
        pricing: "收费",
        channels: "服务",
        sources: "资料来源",
        openNow: "现正开放",
        closed: "已关闭",
        appointmentOnly: "仅限预约",
        alwaysOpen: "24小时开放",
        vouchers: "接受的医疗券",
    },
}

const InfoRow = ({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode
    label: string
    children: React.ReactNode
}) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 text-muted-foreground">{icon}</div>
        <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                {label}
            </p>
            <div className="text-sm">{children}</div>
        </div>
    </div>
)

function scheduleSummary(
    schedule: Schedule,
    lang: LanguageCode,
    t: (typeof texts)[LanguageCode.EN]
): string {
    switch (schedule.kind) {
        case "always_open":
            return t.alwaysOpen
        case "appointment_only":
            return schedule.notes?.[lang] ?? t.appointmentOnly
        case "variable":
        case "external":
            return schedule.notes[lang]
        case "weekly": {
            const status = isChannelOpenNow(
                {
                    id: "_",
                    name: { en: "", zh: "", cn: "" },
                    channelType: "in_person",
                    schedule,
                    pricing: { tiers: [] },
                    eligibility: [],
                },
                scheduleContext()
            )
            const base = status.kind === "open" ? t.openNow : status.kind === "closed" ? t.closed : status.label[lang]
            return schedule.notes ? `${base}. ${schedule.notes[lang]}` : base
        }
    }
}

function formatTier(tier: FeeTier, lang: LanguageCode): string {
    if (tier.consultation === "variable" || tier.consultation === "member_covered") {
        return tier.notes?.[lang] ?? localized(tier.label, lang)
    }
    const c = tier.consultation
    const amount =
        c.amountMax !== undefined ? `HK$${c.amount}–${c.amountMax}` : `HK$${c.amount}`
    return `${localized(tier.label, lang)}: ${amount}`
}

function ChannelSection({
    channel,
    lang,
    t,
}: {
    channel: ServiceChannel
    lang: LanguageCode
    t: (typeof texts)[LanguageCode.EN]
}) {
    const ctx = useMemo(() => scheduleContext(), [])
    const open = isChannelOpenNow(channel, ctx)
    const price = resolveCurrentPrice(channel, ctx)

    return (
        <section className="rounded-lg border p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{localized(channel.name, lang)}</h2>
                {open.kind === "open" || open.kind === "always_open" ? (
                    <Badge className="bg-emerald-600 hover:bg-emerald-600 text-xs">
                        {open.kind === "always_open" ? t.alwaysOpen : t.openNow}
                    </Badge>
                ) : open.kind === "closed" ? (
                    <Badge variant="secondary" className="text-xs">
                        {t.closed}
                    </Badge>
                ) : null}
                {channel.eligibility
                    .filter((e) => e.audience !== "open")
                    .map((e) => (
                        <Badge key={e.audience} variant="outline" className="text-xs">
                            {e.summary[lang]}
                        </Badge>
                    ))}
            </div>

            <InfoRow icon={<Clock size={18} />} label={t.hours}>
                <p>{scheduleSummary(channel.schedule, lang, t)}</p>
            </InfoRow>

            <InfoRow icon={<Stethoscope size={18} />} label={t.pricing}>
                {price && <p className="font-medium">{price.label[lang]}</p>}
                <ul className="mt-2 space-y-1 text-muted-foreground">
                    {channel.pricing.tiers.map((tier) => (
                        <li key={tier.id}>{formatTier(tier, lang)}</li>
                    ))}
                </ul>
                {channel.pricing.displayNotes && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {localized(channel.pricing.displayNotes, lang)}
                    </p>
                )}
            </InfoRow>
        </section>
    )
}

interface AlternativeDetailContentProps {
    entry: Alternative
}

export function AlternativeDetailContent({ entry }: AlternativeDetailContentProps) {
    const { lang } = useLanguage()
    const t = texts[lang]

    return (
        <div className="mx-auto px-4 py-8 max-w-2xl">
            <Link
                href="/alternatives"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={14} />
                {t.back}
            </Link>

            <div className="mb-6 flex flex-wrap items-start gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{alternativeName(entry, lang)}</h1>
                <Badge variant="secondary" className="mt-1">
                    {isPhysicalAlternative(entry) ? entry.providerType : t.telehealth}
                </Badge>
            </div>

            {entry.description && (
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {localized(entry.description, lang)}
                </p>
            )}

            {entry.scope?.summary && (
                <p className="text-sm border-l-2 border-amber-500 pl-3 mb-6 text-muted-foreground">
                    {localized(entry.scope.summary, lang)}
                </p>
            )}

            <div className="space-y-6">
                {isPhysicalAlternative(entry) && (
                    <InfoRow icon={<MapPin size={18} />} label={t.address}>
                        <a
                            href={`https://www.google.com/maps?q=${entry.location.coordinates.latitude},${entry.location.coordinates.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {localized(entry.location.address, lang)}
                        </a>
                        <p className="text-xs text-muted-foreground mt-0.5">{entry.location.district}</p>
                    </InfoRow>
                )}

                {entry.contacts.some((c) => c.kind === "phone") && (
                    <InfoRow icon={<Phone size={18} />} label={t.phone}>
                        <ul className="space-y-1">
                            {entry.contacts
                                .filter((c) => c.kind === "phone")
                                .map((c) => (
                                    <li key={c.value}>
                                        <a href={telHref(c.value)} className="hover:underline">
                                            {c.value}
                                            {c.label && (
                                                <span className="text-muted-foreground">
                                                    {" "}
                                                    ({localized(c.label, lang)})
                                                </span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </InfoRow>
                )}

                {entry.acceptedVouchers && entry.acceptedVouchers.length > 0 && (
                    <InfoRow icon={<Ticket size={18} />} label={t.vouchers}>
                        <ul className="space-y-2">
                            {entry.acceptedVouchers.map((v) => {
                                const catalog = VOUCHER_CATALOG[v.id]
                                const details = v.details?.[lang] ?? catalog.details?.[lang]
                                const url = v.url ?? catalog.officialUrl
                                return (
                                    <li key={v.id}>
                                        <p className="font-medium">{voucherLabel(v, lang)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {localized(catalog.name, lang)}
                                        </p>
                                        {details && (
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {details}
                                            </p>
                                        )}
                                        {url && (
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs hover:underline mt-0.5 inline-block"
                                            >
                                                {url}
                                            </a>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </InfoRow>
                )}

                <div className="space-y-4">
                    <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {t.channels}
                    </h2>
                    {entry.channels.map((channel) => (
                        <ChannelSection key={channel.id} channel={channel} lang={lang} t={t} />
                    ))}
                </div>

                {entry.facilities && entry.facilities.length > 0 && (
                    <InfoRow icon={<Stethoscope size={18} />} label={t.facilities}>
                        <ul className="flex flex-wrap gap-1.5 mt-1">
                            {entry.facilities.map((f, i) => (
                                <li key={i}>
                                    <Badge variant="outline" className="text-xs font-normal">
                                        {localizedFacilityTag(f, lang)}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </InfoRow>
                )}

                {isTelehealthAlternative(entry) && entry.features && entry.features.length > 0 && (
                    <InfoRow icon={<Stethoscope size={18} />} label={t.features}>
                        <ul className="flex flex-wrap gap-1.5 mt-1">
                            {entry.features.map((f, i) => (
                                <li key={i}>
                                    <Badge variant="outline" className="text-xs font-normal">
                                        {localizedFacilityTag(f, lang)}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </InfoRow>
                )}

                {isTelehealthAlternative(entry) && entry.delivery?.speed && (
                    <InfoRow icon={<Truck size={18} />} label={t.deliveryNotes}>
                        <p>{localized(entry.delivery.speed, lang)}</p>
                    </InfoRow>
                )}

                {entry.contacts.some((c) => ["url", "app_ios", "app_android"].includes(c.kind)) && (
                    <div className="flex flex-wrap gap-3">
                        {entry.contacts.map((c) => {
                            if (c.kind === "url") {
                                return (
                                    <a
                                        key={c.value}
                                        href={c.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                    >
                                        <ExternalLink size={14} />
                                        {c.label ? localized(c.label, lang) : t.website}
                                    </a>
                                )
                            }
                            if (c.kind === "app_ios") {
                                return (
                                    <a
                                        key={c.value}
                                        href={c.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                    >
                                        <Smartphone size={14} />
                                        {t.iosApp}
                                    </a>
                                )
                            }
                            if (c.kind === "app_android") {
                                return (
                                    <a
                                        key={c.value}
                                        href={c.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm hover:underline"
                                    >
                                        <Smartphone size={14} />
                                        {t.androidApp}
                                    </a>
                                )
                            }
                            return null
                        })}
                    </div>
                )}

                {entry.additionalInfo && (
                    <InfoRow icon={<ExternalLink size={18} />} label={t.additionalInfo}>
                        <p className="text-muted-foreground leading-relaxed">
                            {localized(entry.additionalInfo, lang)}
                        </p>
                    </InfoRow>
                )}

                {entry.sourceUrls && entry.sourceUrls.length > 0 && (
                    <InfoRow icon={<ExternalLink size={18} />} label={t.sources}>
                        <ul className="space-y-1 text-xs break-all">
                            {entry.sourceUrls.map((s) => (
                                <li key={s.url}>
                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline text-muted-foreground"
                                    >
                                        {s.label ?? s.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </InfoRow>
                )}
            </div>
        </div>
    )
}
