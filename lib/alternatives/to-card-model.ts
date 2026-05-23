import {
    enrichOpenStatusWithTransition,
    formatCardPrice,
    resolveScheduleTransition,
    resolveUpcomingPriceChange,
} from "@/lib/alternatives/card-preview"
import {
    getPrimaryChannel,
    isChannelOpenNow,
    resolveCurrentPrice,
    type OpenStatus,
    type OpenStatusKind,
    type ResolvedPrice,
} from "@/lib/alternatives/resolve"
import { LanguageCode, type LocalizedString } from "@/types"
import type {
    Alternative,
    ScheduleContext,
    ServiceChannel,
    ViewerEligibility,
} from "@/types/alternatives"
import { isPhysicalAlternative } from "@/types/alternatives"
import type {
    AlternativeCardFilterMeta,
    AlternativeCardModel,
    AlternativeCardStatusDisplay,
} from "@/types/alternatives-card"

const SEE_FEE: LocalizedString = {
    [LanguageCode.EN]: "See details for pricing",
    [LanguageCode.ZH]: "詳情查看費用",
    [LanguageCode.CN]: "详情查看费用",
}

const STATUS_TEXT = {
    open24h: {
        [LanguageCode.EN]: "Open 24 hours",
        [LanguageCode.ZH]: "24小時開放",
        [LanguageCode.CN]: "24小时开放",
    },
    openNow: {
        [LanguageCode.EN]: "Open now",
        [LanguageCode.ZH]: "現正開放",
        [LanguageCode.CN]: "现正开放",
    },
    closed: {
        [LanguageCode.EN]: "Closed",
        [LanguageCode.ZH]: "已關閉",
        [LanguageCode.CN]: "已关闭",
    },
    appointmentOnly: {
        [LanguageCode.EN]: "By appointment",
        [LanguageCode.ZH]: "只限預約",
        [LanguageCode.CN]: "仅限预约",
    },
} satisfies Record<string, LocalizedString>

function closesIn(minutes: number): LocalizedString {
    return {
        [LanguageCode.EN]: `Closes in ${minutes} min`,
        [LanguageCode.ZH]: `${minutes}分鐘後關閉`,
        [LanguageCode.CN]: `${minutes}分钟后关闭`,
    }
}

function opensIn(minutes: number): LocalizedString {
    return {
        [LanguageCode.EN]: `Opens in ${minutes} min`,
        [LanguageCode.ZH]: `${minutes}分鐘後開放`,
        [LanguageCode.CN]: `${minutes}分钟后开放`,
    }
}

function closedUntil(atLabel: LocalizedString): LocalizedString {
    return {
        [LanguageCode.EN]: `Closed until ${atLabel[LanguageCode.EN]}`,
        [LanguageCode.ZH]: `${atLabel[LanguageCode.ZH]} 開放`,
        [LanguageCode.CN]: `${atLabel[LanguageCode.CN]} 开放`,
    }
}

function priceIn(price: ResolvedPrice, minutes: number): LocalizedString {
    return {
        [LanguageCode.EN]: `${formatCardPrice(price, LanguageCode.EN)} in ${minutes} min`,
        [LanguageCode.ZH]: `${minutes}分鐘後 ${formatCardPrice(price, LanguageCode.ZH)}`,
        [LanguageCode.CN]: `${minutes}分钟后 ${formatCardPrice(price, LanguageCode.CN)}`,
    }
}

function formatPriceLocalized(price: ResolvedPrice): LocalizedString {
    return {
        [LanguageCode.EN]: formatCardPrice(price, LanguageCode.EN),
        [LanguageCode.ZH]: formatCardPrice(price, LanguageCode.ZH),
        [LanguageCode.CN]: formatCardPrice(price, LanguageCode.CN),
    }
}

function resolveStatusDisplay(
    openStatus: OpenStatus | null,
    scheduleTransition: ReturnType<typeof resolveScheduleTransition>
): AlternativeCardStatusDisplay | null {
    if (!openStatus) return null

    const withinHour = scheduleTransition && scheduleTransition.minutesUntil <= 60

    if (openStatus.kind === "always_open") {
        return { label: STATUS_TEXT.open24h, tone: "open" }
    }

    if (openStatus.kind === "open") {
        if (withinHour && scheduleTransition?.kind === "closes") {
            return { label: closesIn(scheduleTransition.minutesUntil), tone: "warning" }
        }
        return { label: STATUS_TEXT.openNow, tone: "open" }
    }

    if (openStatus.kind === "closed") {
        if (withinHour && scheduleTransition?.kind === "opens") {
            return { label: opensIn(scheduleTransition.minutesUntil), tone: "muted" }
        }
        if (scheduleTransition?.kind === "opens") {
            return { label: closedUntil(scheduleTransition.atLabel), tone: "muted" }
        }
        return { label: STATUS_TEXT.closed, tone: "muted" }
    }

    if (openStatus.kind === "appointment_only") {
        return { label: STATUS_TEXT.appointmentOnly, tone: "neutral" }
    }

    return null
}

function sortPriceFromResolved(price: ReturnType<typeof resolveCurrentPrice>): number | null {
    if (!price) return null
    if (
        price.kind === "variable" ||
        price.kind === "member_covered" ||
        price.kind === "unavailable"
    ) {
        return null
    }
    return price.amount ?? null
}

function walkInAllowed(channel: ServiceChannel | null): boolean {
    if (!channel) return false
    if (channel.schedule.kind === "appointment_only") return false
    if (channel.booking?.appointmentRequired && !channel.booking?.walkIn) return false
    return channel.booking?.walkIn !== false
}

export function alternativeToCardModel(
    entry: Alternative,
    ctx: ScheduleContext,
    viewerEligibility?: ViewerEligibility
): AlternativeCardModel {
    const channel = getPrimaryChannel(entry, ctx)
    const statusChannel = entry.channels.find((c) => c.primary) ?? entry.channels[0] ?? null

    let openStatus: OpenStatus | null = null
    let scheduleTransition: ReturnType<typeof resolveScheduleTransition> = null

    if (statusChannel) {
        openStatus = isChannelOpenNow(statusChannel, ctx)
        openStatus = enrichOpenStatusWithTransition(statusChannel.schedule, openStatus, ctx)
        scheduleTransition = resolveScheduleTransition(statusChannel.schedule, ctx)
    }

    const openKind: OpenStatusKind = openStatus?.kind ?? "unknown"
    const statusDisplay = resolveStatusDisplay(openStatus, scheduleTransition)

    const resolvedPrice = channel ? resolveCurrentPrice(channel, ctx) : null
    const primary = resolvedPrice ? formatPriceLocalized(resolvedPrice) : SEE_FEE

    let upcoming: LocalizedString | undefined
    const upcomingChange =
        channel && resolvedPrice
            ? resolveUpcomingPriceChange(channel.pricing, ctx, viewerEligibility)
            : null
    if (upcomingChange && resolvedPrice) {
        upcoming = priceIn(upcomingChange.price, upcomingChange.minutesUntil)
    }

    const restricted = channel?.eligibility.filter((e) => e.audience !== "open") ?? []
    const voucherIds = (entry.acceptedVouchers ?? []).map((v) => v.id)
    const footer =
        restricted.length > 0 || voucherIds.length > 0
            ? {
                  eligibility: restricted.map((r) => ({
                      audience: r.audience,
                      summary: r.summary,
                  })),
                  voucherIds,
              }
            : undefined

    const filterMeta: AlternativeCardFilterMeta = {
        walkInAllowed: walkInAllowed(channel),
        acceptsHcvs: voucherIds.includes("hcvs"),
        sortPriceHkd: sortPriceFromResolved(resolvedPrice),
        openKind,
    }

    const isPhysical = isPhysicalAlternative(entry)

    return {
        slug: entry.slug,
        category: entry.category,
        name: entry.name,
        providerType: entry.providerType,
        locationLabel: isPhysical ? entry.location.district : entry.providerType,
        coordinates: isPhysical ? entry.location.coordinates : undefined,
        isPhysical,
        statusDisplay,
        unknownStatusLabel: openStatus?.kind === "unknown" ? openStatus.label : undefined,
        price: { primary, upcoming },
        footer,
        filterMeta,
    }
}
