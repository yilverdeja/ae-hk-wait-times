"use client"

import { useEffect, useState } from "react"

/**
 * Reads the browser geolocation permission state when the Permissions API is available.
 * Complements Geolocation API errors (e.g. after deny, before the next getCurrentPosition call).
 */
export function useGeolocationPermissionState(enabled: boolean) {
    const [permissionState, setPermissionState] =
        useState<PermissionState | null>(null)

    useEffect(() => {
        if (!enabled || typeof navigator === "undefined") {
            return
        }
        if (!("permissions" in navigator)) {
            return
        }

        let status: PermissionStatus | undefined

        navigator.permissions
            .query({ name: "geolocation" })
            .then((result) => {
                status = result
                setPermissionState(result.state)
                result.onchange = () => {
                    setPermissionState(result.state)
                }
            })
            .catch(() => {
                // Permissions API unsupported or query failed (e.g. some Safari versions)
            })

        return () => {
            if (status) {
                status.onchange = null
            }
        }
    }, [enabled])

    return permissionState
}

/** GeolocationPositionError.PERMISSION_DENIED */
export const GEOLOCATION_PERMISSION_DENIED = 1

export function isGeolocationPermissionDenied(
    positionError: GeolocationPositionError | undefined,
    permissionState: PermissionState | null
): boolean {
    return (
        positionError?.code === GEOLOCATION_PERMISSION_DENIED ||
        permissionState === "denied"
    )
}
