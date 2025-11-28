import { Coordinates } from "@/types"
import { useQuery } from "@tanstack/react-query"

interface MapboxMatrixResponse {
    code: string
    distances: number[][] // distances in meters
    durations: number[][] // durations in seconds
    destinations: Array<{
        location: [number, number]
        name: string
    }>
    sources: Array<{
        location: [number, number]
        name: string
    }>
}

interface DistanceResult {
    distance: number // in kilometers
    duration: number // in minutes
}

interface UseMapboxDistanceResult {
    distances: Record<string, DistanceResult> // keyed by hospital slug
    isLoading: boolean
    isError: boolean
    error: Error | null
}

/**
 * Hook to calculate distances from origin to multiple hospital destinations
 * using Mapbox Matrix API
 */
export function useMapboxDistance(
    origin: Coordinates | null,
    hospitals: Array<{ slug: string; coordinates: Coordinates }>
): UseMapboxDistanceResult {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    const queryResult = useQuery<Record<string, DistanceResult>>({
        queryKey: [
            "mapboxDistance",
            origin,
            hospitals
                .map((h) => h.slug)
                .sort()
                .join(","),
        ],
        queryFn: async () => {
            if (!origin || !mapboxToken || hospitals.length === 0) {
                return {}
            }

            // Build coordinates string: origin;destination1;destination2;...
            const coordinates = [
                `${origin.longitude},${origin.latitude}`,
                ...hospitals.map(
                    (h) =>
                        `${h.coordinates.longitude},${h.coordinates.latitude}`
                ),
            ].join(";")

            const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?access_token=${mapboxToken}&annotations=distance,duration`

            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`Mapbox API error: ${response.statusText}`)
                }

                const data: MapboxMatrixResponse = await response.json()

                if (data.code !== "Ok") {
                    throw new Error(`Mapbox API returned error: ${data.code}`)
                }

                // Map results to hospital slugs
                const results: Record<string, DistanceResult> = {}
                hospitals.forEach((hospital, index) => {
                    // distances[0] is from origin to all destinations
                    // durations[0] is from origin to all destinations
                    const distanceMeters = data.distances[0]?.[index + 1] ?? 0
                    const durationSeconds = data.durations[0]?.[index + 1] ?? 0

                    results[hospital.slug] = {
                        distance: distanceMeters / 1000, // convert to km
                        duration: durationSeconds / 60, // convert to minutes
                    }
                })

                return results
            } catch (error) {
                console.error("Error fetching Mapbox distance matrix:", error)
                throw error
            }
        },
        enabled: !!origin && !!mapboxToken && hospitals.length > 0,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        retry: 2,
    })

    return {
        distances: queryResult.data ?? {},
        isLoading: queryResult.isLoading,
        isError: queryResult.isError,
        error: queryResult.error as Error | null,
    }
}
