import { LanguageCode, type LocalizedString } from "@/types"
import type {
    Alternative,
    ConsultationPrice,
    FeeTier,
    PriceAppliesWhen,
    Pricing,
    Schedule,
    ScheduleContext,
    ServiceChannel,
    ViewerEligibility,
} from "@/types/alternatives"
import { getHongKongParts, isDayInRules, isMinutesInRange } from "@/lib/alternatives/time"

export type OpenStatusKind =
    | "open"
    | "closed"
    | "always_open"
    | "appointment_only"
    | "unknown"

export interface OpenStatus {
    kind: OpenStatusKind
    label: LocalizedString
    nextChangeMinutes?: number
}

export type ResolvedPriceKind = "exact" | "range" | "from" | "variable" | "member_covered" | "unavailable"

export interface ResolvedPrice {
    kind: ResolvedPriceKind
    label: LocalizedString
    amount?: number
    amountMax?: number
    currency?: "HKD"
    tierId?: string
}

const OPEN_PUBLIC: import("@/types/alternatives").EligibilityRule[] = [
    {
        audience: "open",
        summary: {
            [LanguageCode.EN]: "Open to public",
            [LanguageCode.ZH]: "開放予公眾",
            [LanguageCode.CN]: "开放予公众",
        },
    },
]

export { OPEN_PUBLIC }

function enZh(en: string, zh: string): LocalizedString {
    return {
        [LanguageCode.EN]: en,
        [LanguageCode.ZH]: zh,
        [LanguageCode.CN]: zh,
    }
}

export function isChannelOpenNow(channel: ServiceChannel, ctx: ScheduleContext): OpenStatus {
    return isScheduleOpen(channel.schedule, ctx)
}

export function isScheduleOpen(schedule: Schedule, ctx: ScheduleContext): OpenStatus {
    switch (schedule.kind) {
        case "always_open":
            return { kind: "always_open", label: enZh("Open 24 hours", "24小時開放") }
        case "appointment_only":
            return {
                kind: "appointment_only",
                label: enZh("By appointment only", "只限預約"),
            }
        case "variable":
        case "external":
            return {
                kind: "unknown",
                label: schedule.notes,
            }
        case "weekly": {
            const { day, minutes } = getHongKongParts(ctx.at)
            if (schedule.closedOnPublicHolidays && ctx.isPublicHoliday) {
                return {
                    kind: "closed",
                    label: schedule.notes ?? enZh("Closed now", "現已關閉"),
                }
            }
            for (const rule of schedule.rules) {
                if (!isDayInRules(day, rule.days)) continue
                for (const range of rule.ranges) {
                    if (isMinutesInRange(minutes, range)) {
                        return { kind: "open", label: enZh("Open now", "現正開放") }
                    }
                }
            }
            const closedLabel = schedule.notes
                ? schedule.notes
                : enZh("Closed now", "現已關閉")
            return { kind: "closed", label: closedLabel }
        }
    }
}

function appliesWhenScore(when: PriceAppliesWhen, ctx: ScheduleContext): number {
    const { day, minutes } = getHongKongParts(ctx.at)

    switch (when.type) {
        case "default":
            return 0
        case "days":
            return isDayInRules(day, when.days) ? 10 : -1
        case "public_holiday":
            return ctx.isPublicHoliday ? 20 : -1
        case "not_public_holiday":
            return ctx.isPublicHoliday ? -1 : 8
        case "tier":
            return 5
        case "time": {
            if (when.days && !isDayInRules(day, when.days)) return -1
            const inRange = when.ranges.some((r) => isMinutesInRange(minutes, r))
            return inRange ? 30 : -1
        }
    }
}

function tierMatchesContext(tier: FeeTier, ctx: ScheduleContext): boolean {
    return tier.appliesWhen.every((when) => appliesWhenScore(when, ctx) >= 0)
}

function tierSpecificity(tier: FeeTier, ctx: ScheduleContext): number {
    return tier.appliesWhen.reduce((sum, when) => {
        const score = appliesWhenScore(when, ctx)
        return score >= 0 ? sum + score : sum
    }, 0)
}

function tierMatchesEligibility(
    tier: FeeTier,
    viewerEligibility: ViewerEligibility | undefined
): boolean {
    if (!tier.eligibility?.length) return true
    if (!viewerEligibility) return true
    return tier.eligibility.some((e) => e.audience === viewerEligibility)
}

function formatMoneyLabel(consultation: ConsultationPrice, tierLabel: LocalizedString): ResolvedPrice {
    if (consultation === "variable") {
        return { kind: "variable", label: enZh("Fees vary", "收費因人而異") }
    }
    if (consultation === "member_covered") {
        return {
            kind: "member_covered",
            label: enZh("Member pricing", "會員價格"),
        }
    }

    if (consultation.amountMax !== undefined) {
        return {
            kind: "range",
            label: enZh(
                `HK$${consultation.amount}–${consultation.amountMax}`,
                `HK$${consultation.amount}–${consultation.amountMax}`
            ),
            amount: consultation.amount,
            amountMax: consultation.amountMax,
            currency: consultation.currency,
        }
    }

    return {
        kind: "exact",
        label: enZh(`HK$${consultation.amount} now`, `現時 HK$${consultation.amount}`),
        amount: consultation.amount,
        currency: consultation.currency,
    }
}

export function resolveCurrentPrice(
    channel: ServiceChannel,
    ctx: ScheduleContext,
    viewerEligibility?: ViewerEligibility
): ResolvedPrice | null {
    return resolvePricing(channel.pricing, ctx, viewerEligibility)
}

export function resolvePricing(
    pricing: Pricing,
    ctx: ScheduleContext,
    viewerEligibility?: ViewerEligibility
): ResolvedPrice | null {
    const matching = pricing.tiers
        .filter((t) => tierMatchesContext(t, ctx) && tierMatchesEligibility(t, viewerEligibility))
        .sort((a, b) => tierSpecificity(b, ctx) - tierSpecificity(a, ctx))

    const priced = matching.filter(
        (t) => t.consultation !== "variable" && t.consultation !== "member_covered"
    )

    if (priced.length > 0) {
        return formatResolvedTier(priced[0])
    }

    if (matching.length > 0) {
        return formatResolvedTier(matching[0])
    }

    const fallback = pricing.tiers.find((t) => t.appliesWhen.some((w) => w.type === "default"))
    if (!fallback) return null
    return formatResolvedTier(fallback)
}

function formatResolvedTier(tier: FeeTier): ResolvedPrice {
    if (typeof tier.consultation === "object" && tier.displayAs === "from") {
        return {
            kind: "from",
            label: enZh(
                `From HK$${tier.consultation.amount}`,
                `HK$${tier.consultation.amount} 起`
            ),
            amount: tier.consultation.amount,
            amountMax: tier.consultation.amountMax,
            currency: tier.consultation.currency,
            tierId: tier.id,
        }
    }
    const base = formatMoneyLabel(tier.consultation, tier.label)
    return { ...base, tierId: tier.id }
}

export function getPrimaryChannel(alt: Alternative, ctx: ScheduleContext): ServiceChannel | null {
    if (alt.channels.length === 0) return null

    const marked = alt.channels.find((c) => c.primary)
    if (marked) {
        const status = isChannelOpenNow(marked, ctx)
        if (status.kind === "open" || status.kind === "always_open") return marked
    }

    const openChannel = alt.channels.find((c) => {
        const s = isChannelOpenNow(c, ctx)
        return s.kind === "open" || s.kind === "always_open"
    })
    if (openChannel) return openChannel

    return marked ?? alt.channels[0]
}

export function getEligibilityBadge(
    channel: ServiceChannel,
    lang: LanguageCode
): string | null {
    const restricted = channel.eligibility.filter((e) => e.audience !== "open")
    if (restricted.length === 0) return null
    return restricted[0].summary[lang]
}

export function isRestrictedEligibility(channel: ServiceChannel): boolean {
    return channel.eligibility.some((e) => e.audience !== "open")
}
