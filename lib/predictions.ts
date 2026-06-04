import { PREDICTION_CAP_MINS, PREDICTION_SUPPRESS_MINS } from "@/lib/constants"

export type HospitalPredictionValues = {
    pred1h: number | null
    pred2h: number | null
    pred3h: number | null
}

export type PredictionDirection = "higher" | "lower" | "same"

export type PredictionPolicy = {
    suppress: boolean
    cap: boolean
}

export const PREDICTION_DIRECTION_THRESHOLD_MINS = 15

/** 15-min chart slots for +1h / +2h / +3h forecasts */
export const PREDICTION_CHART_SLOT_OFFSETS = [4, 8, 12] as const

export function getPredictionPolicy(liveWaitMinutes: number): PredictionPolicy {
    const suppress = liveWaitMinutes >= PREDICTION_SUPPRESS_MINS
    return {
        suppress,
        cap: !suppress && liveWaitMinutes >= PREDICTION_CAP_MINS,
    }
}

export function applyPredictionValue(
    raw: number,
    liveWaitMinutes: number,
    policy?: PredictionPolicy
): number {
    const { cap } = policy ?? getPredictionPolicy(liveWaitMinutes)
    const floored = Math.max(0, raw)
    return cap ? Math.max(floored, liveWaitMinutes) : floored
}

export function getAdjustedPredictionValues(
    preds: HospitalPredictionValues | null,
    liveWaitMinutes: number
): HospitalPredictionValues | null {
    const policy = getPredictionPolicy(liveWaitMinutes)
    if (policy.suppress || !preds) return null

    const safe = (v: number | null): number | null => {
        if (v == null) return null
        return applyPredictionValue(v, liveWaitMinutes, policy)
    }

    return {
        pred1h: safe(preds.pred1h),
        pred2h: safe(preds.pred2h),
        pred3h: safe(preds.pred3h),
    }
}

export function getPredictionDirection(
    preds: HospitalPredictionValues | null,
    liveWaitMinutes: number
): PredictionDirection | null {
    const policy = getPredictionPolicy(liveWaitMinutes)
    if (policy.suppress || !preds || preds.pred1h == null) return null

    const effective = applyPredictionValue(preds.pred1h, liveWaitMinutes, policy)
    const diff = effective - liveWaitMinutes
    if (Math.abs(diff) < PREDICTION_DIRECTION_THRESHOLD_MINS) return "same"
    return diff > 0 ? "higher" : "lower"
}

/** HKT labels for +1h / +2h / +3h from the nearest 15-min interval (UTC+8, no DST). */
export function getPredictionDisplayTimes(now: Date = new Date()): {
    plus1h: string
    plus2h: string
    plus3h: string
} {
    const hktTotalMinutes = Math.floor(now.getTime() / 60000) + 8 * 60
    const floorMs =
        now.getTime() -
        (hktTotalMinutes % 15) * 60000 -
        now.getSeconds() * 1000 -
        now.getMilliseconds()

    const fmt = (d: Date) =>
        d.toLocaleTimeString("en-US", {
            timeZone: "Asia/Hong_Kong",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })

    return {
        plus1h: fmt(new Date(floorMs + 60 * 60000)),
        plus2h: fmt(new Date(floorMs + 120 * 60000)),
        plus3h: fmt(new Date(floorMs + 180 * 60000)),
    }
}
