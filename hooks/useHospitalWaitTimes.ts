import dayjs from "@/lib/dayjs"
import { sendGAEvent } from "@next/third-parties/google"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useRef } from "react"

// Import our types and static data
import { hospitals } from "@/data/hospitals"
import type {
    ApiResponse,
    EnrichedApiResponse,
    EnrichedHospitalData,
} from "@/types"

/**
 * @description Fetches wait time data from the API and enriches it with static hospital data.
 * This function performs the critical merge operation.
 * 1. Fetches the dynamic wait time data from our Next.js API route.
 * 2. For each hospital in the API response, it looks up the corresponding static data
 *    (name, address, region, etc.) from `data/hospitals.ts` using the hospital's slug.
 * 3. It combines them into a single, "enriched" object.
 * @returns {Promise<EnrichedApiResponse>} A promise that resolves to the fully merged and enriched data.
 */
const getEnrichedHospitalWaitTimes = async (): Promise<EnrichedApiResponse> => {
    // Step 1: Fetch the dynamic data from the API
    const { data: apiResponse } = await axios.get<ApiResponse>("/api/waits")

    // Step 2: Merge the API data with our static hospital data
    const enrichedWaitTimes = apiResponse.waitTimes
        .map((apiHospital): EnrichedHospitalData | null => {
            const slug = apiHospital.hospitalSlug
            const staticData = hospitals[slug]

            // Defensive check: If for some reason the API returns a slug we don't
            // have in our static data, we log a warning and filter it out.
            if (!staticData) {
                console.warn(
                    `[Data Enrichment] No static data found for hospital slug: ${slug}. Skipping.`
                )
                return null
            }

            // Step 3: Combine the static data and the dynamic API data into one object.
            // We spread the `staticData` object to get all its properties (name, address, region, etc.)
            // and then add the dynamic properties from the `apiHospital` object.
            const enrichedHospital: EnrichedHospitalData = {
                ...staticData,
                slug: slug, // The slug is also part of the EnrichedHospitalData type
                criticalManagementStatus: apiHospital.criticalManagementStatus,
                emergencyManagementStatus:
                    apiHospital.emergencyManagementStatus,
                waitTimes: apiHospital.waitTimes,
            }

            return enrichedHospital
        })
        // Filter out any null values that resulted from the defensive check above.
        .filter(
            (hospital): hospital is EnrichedHospitalData => hospital !== null
        )

    // Return the final, enriched response structure
    return {
        lastUpdated: apiResponse.lastUpdated,
        waitTimes: enrichedWaitTimes,
    }
}

/**
 * @description A custom React hook to fetch and manage enriched hospital A&E wait time data.
 * It uses TanStack Query for caching, background updates, and smart polling.
 * The data returned from this hook is fully merged with static hospital details.
 *
 * Features:
 * - Caches data to avoid redundant fetches.
 * - Uses a local storage persister (as you've set up) for persistence.
 * - Implements a smart refetching interval.
 */
export const useHospitalWaitTimes = () => {
    // Track previous data to detect refetches
    const previousDataRef = useRef<EnrichedApiResponse | undefined>(undefined)
    const isInitialMount = useRef(true)

    // We provide the EnrichedApiResponse type to useQuery for full type safety.
    const queryResult = useQuery<EnrichedApiResponse>({
        // A unique key for this query. TanStack Query uses this for caching.
        queryKey: ["hospitalWaitTimes"],

        // The function that will be called to fetch and enrich the data.
        queryFn: getEnrichedHospitalWaitTimes,

        // staleTime: How long data is considered "fresh" (in ms).
        // Fresh data will not be refetched on component mounts or window focus.
        staleTime: 14 * 60 * 1000, // 14 minutes

        // refetchInterval: The core of our smart polling logic. This logic remains
        // unchanged as it only depends on the `lastUpdated` property, which is
        // present in our new EnrichedApiResponse type.
        refetchInterval: (query) => {
            const lastUpdated = query.state.data?.lastUpdated

            if (!lastUpdated) {
                return 15 * 1000
            }

            const lastUpdateTime = dayjs(lastUpdated, "D/M/YYYY h:mmA")
            const nextCheckTime = lastUpdateTime.add(14, "minute")
            const currentTime = dayjs()

            if (currentTime.isAfter(nextCheckTime)) {
                console.log(
                    `[Wait Times] Expected update after ${nextCheckTime.format("h:mm:ss A")}, but data is still from ${lastUpdateTime.format("h:mm:ss A")}. Polling every 30s.`
                )
                return 30 * 1000 // 30 seconds
            }

            const timeUntilNextCheck = nextCheckTime.diff(currentTime)
            const minutesUntilNextCheck = (timeUntilNextCheck / 60000).toFixed(
                1
            )

            console.log(
                `[Wait Times] Data is fresh (Updated: ${lastUpdateTime.format("h:mm:ss A")}). Next check scheduled in ${minutesUntilNextCheck} minutes.`
            )

            return timeUntilNextCheck
        },
    })

    // Track auto-fetch events when data changes (refetch)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            previousDataRef.current = queryResult.data
            return
        }

        // If we have new data and previous data existed, it's a refetch
        if (queryResult.data && previousDataRef.current) {
            const lastUpdated = previousDataRef.current.lastUpdated
            const lastUpdateTime = dayjs(lastUpdated, "D/M/YYYY h:mmA")
            const nextCheckTime = lastUpdateTime.add(14, "minute")
            const currentTime = dayjs()
            const isStale = currentTime.isAfter(nextCheckTime)

            sendGAEvent("event", "data_auto_fetch", {
                fetchType: "wait_times",
                lastUpdated: lastUpdated,
                isStale: isStale,
            })
        }

        previousDataRef.current = queryResult.data
    }, [queryResult.data])

    // Track fetch errors
    useEffect(() => {
        if (queryResult.isError && queryResult.error) {
            sendGAEvent("event", "data_fetch_error", {
                fetchType: "wait_times",
                errorMessage:
                    queryResult.error instanceof Error
                        ? queryResult.error.message
                        : "Unknown error",
            })
        }
    }, [queryResult.isError, queryResult.error])

    return queryResult
}
