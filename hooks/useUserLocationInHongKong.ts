"use client"

import {
    isGeolocationPermissionDenied,
    useGeolocationPermissionState,
} from "@/hooks/useGeolocationPermissionState"
import { isUserInHongKong } from "@/lib/map"
import type { Coordinates } from "@/types"
import { useCallback, useEffect, useMemo } from "react"
import { useGeolocated } from "react-geolocated"

export function useUserLocationInHongKong(options?: { fetchOnMount?: boolean }) {
    const fetchOnMount = options?.fetchOnMount ?? true

    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
        getPosition,
    } = useGeolocated({
        suppressLocationOnMount: true,
        isOptimisticGeolocationEnabled: false,
        watchLocationPermissionChange: true,
        positionOptions: {
            enableHighAccuracy: false,
            maximumAge: 300_000,
            timeout: 15_000,
        },
    })

    const permissionState = useGeolocationPermissionState(isGeolocationAvailable)

    const isDenied = isGeolocationPermissionDenied(positionError, permissionState)

    const rawCoords = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            return {
                longitude: coords.longitude,
                latitude: coords.latitude,
            }
        }
        return null
    }, [isGeolocationEnabled, coords])

    const userCoords: Coordinates | null = useMemo(() => {
        if (rawCoords && isUserInHongKong(rawCoords)) {
            return rawCoords
        }
        return null
    }, [rawCoords])

    const isLocating =
        isGeolocationAvailable &&
        !userCoords &&
        !isDenied &&
        permissionState === "granted"

    const requestLocation = useCallback(() => {
        if (isGeolocationAvailable) {
            getPosition()
        }
    }, [isGeolocationAvailable, getPosition])

    useEffect(() => {
        if (
            fetchOnMount &&
            permissionState === "granted" &&
            !coords &&
            !isDenied
        ) {
            getPosition()
        }
    }, [fetchOnMount, permissionState, coords, isDenied, getPosition])

    return {
        userCoords,
        isGeolocationAvailable,
        isDenied,
        isLocating,
        permissionState,
        requestLocation,
    }
}
