import {
    getAdjustedPredictionValues,
    getPredictionDirection,
    getPredictionDisplayTimes,
    getPredictionPolicy,
    type HospitalPredictionValues,
} from "@/lib/predictions"
import { useMemo } from "react"

export function useHospitalPredictionDisplay(
    slug: string | null | undefined,
    liveWaitMinutes: number,
    getPredictions: (slug: string) => HospitalPredictionValues | null
) {
    return useMemo(() => {
        const policy = getPredictionPolicy(liveWaitMinutes)
        const raw = slug ? getPredictions(slug) : null
        return {
            policy,
            values: getAdjustedPredictionValues(raw, liveWaitMinutes),
            direction: getPredictionDirection(raw, liveWaitMinutes),
            times: getPredictionDisplayTimes(),
        }
    }, [slug, liveWaitMinutes, getPredictions])
}
