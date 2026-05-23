"use client"

import { useMounted } from "@/hooks/useMounted"
import { useUserLocationInHongKong } from "@/hooks/useUserLocationInHongKong"
import type { Coordinates } from "@/types"
import { createContext, useContext, type ReactNode } from "react"

const AlternativesUserLocationContext = createContext<Coordinates | null>(null)

export function AlternativesUserLocationProvider({ children }: { children: ReactNode }) {
    const mounted = useMounted()
    const { userCoords } = useUserLocationInHongKong({ fetchOnMount: mounted })

    return (
        <AlternativesUserLocationContext.Provider value={userCoords}>
            {children}
        </AlternativesUserLocationContext.Provider>
    )
}

export function useAlternativesUserLocation(): Coordinates | null {
    return useContext(AlternativesUserLocationContext)
}
