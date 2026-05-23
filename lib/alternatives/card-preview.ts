import { LanguageCode, type LocalizedString } from "@/types"
import type {
    Pricing,
    Schedule,
    ScheduleContext,
    ViewerEligibility,
} from "@/types/alternatives"
import { isScheduleOpen, resolvePricing, type OpenStatus, type ResolvedPrice } from "@/lib/alternatives/resolve"

export interface UpcomingPriceChange {
    price: ResolvedPrice
    minutesUntil: number
}

export interface ScheduleTransition {
    kind: "closes" | "opens"
    minutesUntil: number
    atLabel: LocalizedString
}

const HK_TIMEZONE = "Asia/Hong_Kong"

function enZh(en: string, zh: string): LocalizedString {
    return {
        [LanguageCode.EN]: en,
        [LanguageCode.ZH]: zh,
        [LanguageCode.CN]: zh,
    }
}

function priceComparisonKey(price: ResolvedPrice): string {
    return `${price.kind}:${price.amount ?? ""}:${price.amountMax ?? ""}`
}

/** Card-facing price string (starting price with + suffix). */
export function formatCardPrice(price: ResolvedPrice, lang: LanguageCode): string {
    if (
        price.kind === "variable" ||
        price.kind === "member_covered" ||
        price.kind === "unavailable"
    ) {
        return price.label[lang]
    }
    if (price.kind === "range" && price.amount != null && price.amountMax != null) {
        return `HK$${price.amount}–${price.amountMax}+`
    }
    if (price.amount != null) {
        return `HK$${price.amount}+`
    }
    return price.label[lang]
}

export function resolveUpcomingPriceChange(
    pricing: Pricing,
    ctx: ScheduleContext,
    viewerEligibility?: ViewerEligibility,
    withinMinutes = 60
): UpcomingPriceChange | null {
    const current = resolvePricing(pricing, ctx, viewerEligibility)
    if (!current) return null

    const currentKey = priceComparisonKey(current)

    for (let delta = 1; delta <= withinMinutes; delta++) {
        const futureCtx: ScheduleContext = {
            ...ctx,
            at: new Date(ctx.at.getTime() + delta * 60_000),
        }
        const future = resolvePricing(pricing, futureCtx, viewerEligibility)
        if (!future) continue
        if (priceComparisonKey(future) !== currentKey) {
            return { price: future, minutesUntil: delta }
        }
    }

    return null
}

function formatHkTimeLabel(at: Date): LocalizedString {
    const en = new Intl.DateTimeFormat("en-HK", {
        timeZone: HK_TIMEZONE,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(at)
    const zh = new Intl.DateTimeFormat("zh-HK", {
        timeZone: HK_TIMEZONE,
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
    }).format(at)
    return {
        [LanguageCode.EN]: en,
        [LanguageCode.ZH]: zh,
        [LanguageCode.CN]: zh,
    }
}

const MAX_TRANSITION_SCAN_MINUTES = 7 * 24 * 60

/** Next open/close transition for weekly schedules (any horizon up to 7 days). */
export function resolveScheduleTransition(
    schedule: Schedule,
    ctx: ScheduleContext
): ScheduleTransition | null {
    if (schedule.kind !== "weekly") return null

    const status = isScheduleOpen(schedule, ctx)
    if (status.kind !== "open" && status.kind !== "closed") return null

    const currentKind = status.kind

    for (let delta = 1; delta <= MAX_TRANSITION_SCAN_MINUTES; delta++) {
        const futureAt = new Date(ctx.at.getTime() + delta * 60_000)
        const futureCtx: ScheduleContext = { ...ctx, at: futureAt }
        const futureStatus = isScheduleOpen(schedule, futureCtx)

        if (futureStatus.kind === currentKind) continue
        if (futureStatus.kind !== "open" && futureStatus.kind !== "closed") continue

        return {
            kind: currentKind === "open" ? "closes" : "opens",
            minutesUntil: delta,
            atLabel: formatHkTimeLabel(futureAt),
        }
    }

    return null
}

/** Attach `nextChangeMinutes` when the next weekly transition is within the window. */
export function enrichOpenStatusWithTransition(
    schedule: Schedule,
    status: OpenStatus,
    ctx: ScheduleContext,
    withinMinutes = 60
): OpenStatus {
    const transition = resolveScheduleTransition(schedule, ctx)
    if (
        transition &&
        transition.minutesUntil <= withinMinutes &&
        ((status.kind === "open" && transition.kind === "closes") ||
            (status.kind === "closed" && transition.kind === "opens"))
    ) {
        return { ...status, nextChangeMinutes: transition.minutesUntil }
    }
    return status
}
