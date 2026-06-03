import type { PredictionsDocument } from "@/types/gcs"
import { sendGAEvent } from "@next/third-parties/google"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

export const useHospitalPredictions = () => {
    const queryResult = useQuery({
        queryKey: ["hospital-predictions"],
        queryFn: async (): Promise<PredictionsDocument> => {
            const response = await fetch("/api/predictions")
            if (!response.ok) {
                throw new Error(`Failed to fetch predictions: ${response.status}`)
            }
            return response.json()
        },
        staleTime: 60 * 1000, // 60 seconds
    })

    useEffect(() => {
        if (queryResult.isError && queryResult.error) {
            sendGAEvent("event", "data_fetch_error", {
                fetchType: "predictions",
                errorMessage:
                    queryResult.error instanceof Error
                        ? queryResult.error.message
                        : "Unknown error",
            })
        }
    }, [queryResult.isError, queryResult.error])

    const getPredictions = useMemo(() => {
        return (
            slug: string
        ): {
            pred1h: number | null
            pred2h: number | null
            pred3h: number | null
        } | null => {
            const hospital = queryResult.data?.hospitals[slug]
            if (!hospital) return null
            return {
                pred1h: hospital.pred_1h ?? null,
                pred2h: hospital.pred_2h ?? null,
                pred3h: hospital.pred_3h ?? null,
            }
        }
    }, [queryResult.data])

    return {
        ...queryResult,
        getPredictions,
    }
}
