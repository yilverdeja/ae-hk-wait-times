"use client"

import { useGeolocated } from "react-geolocated"
import Map, { Marker, ViewState } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useCallback, useMemo } from "react"
import * as turf from "@turf/turf"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { useMapboxDistance } from "@/hooks/useMapboxDistance"
import {
    getWaitTimeColor,
    formatWaitTimeHoursMinutes,
} from "@/utils/waitTimeColors"
import { EnrichedHospitalData, ManagementStatus, Coordinates } from "@/types"
import { useLanguage } from "@/hooks/useLanguage"
import { AlertCircle, MapPin } from "lucide-react"

// Improved geofence: A larger circle covering Hong Kong (approximately 30km radius)
const GEOFENCE = turf.circle([114.176611, 22.311637], 30, {
    units: "kilometers",
})

// Zoom restrictions
const MIN_ZOOM = 8
const MAX_ZOOM = 18

// Default coordinates (central Hong Kong)
const DEFAULT_COORDINATES = {
    longitude: 114.176611,
    latitude: 22.311637,
}

/**
 * Check if user coordinates are within Hong Kong geofence
 */
function isUserInHongKong(coords: Coordinates | null): boolean {
    if (!coords) return false
    const point = [coords.longitude, coords.latitude]
    return turf.booleanPointInPolygon(point, GEOFENCE)
}

interface HospitalMapWithFooterProps {
    onHospitalSelect?: (hospital: EnrichedHospitalData | null) => void
}

export function HospitalMapWithFooter({
    onHospitalSelect,
}: HospitalMapWithFooterProps) {
    const { coords, isGeolocationEnabled } = useGeolocated({
        suppressLocationOnMount: true,
    })
    const { data: waitTimesData } = useHospitalWaitTimes()
    const { lang } = useLanguage()

    // Determine user location (use geolocation if available and in Hong Kong, otherwise default)
    const userLocation = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            const userCoords = {
                longitude: coords.longitude,
                latitude: coords.latitude,
            }
            if (isUserInHongKong(userCoords)) {
                return userCoords
            }
        }
        return DEFAULT_COORDINATES
    }, [isGeolocationEnabled, coords])

    // Initial view state - computed from userLocation
    const initialViewState = useMemo(
        () => ({
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
            zoom: 11,
        }),
        [userLocation.longitude, userLocation.latitude]
    )

    const [viewState, setViewState] = useState(initialViewState)

    // Use enriched hospital data (already merged with wait times from the hook)
    const enrichedHospitals = useMemo(() => {
        return waitTimesData?.waitTimes ?? []
    }, [waitTimesData])

    // Calculate distances using Mapbox Matrix API
    const { distances: distanceData } = useMapboxDistance(
        isGeolocationEnabled && coords
            ? { longitude: coords.longitude, latitude: coords.latitude }
            : null,
        enrichedHospitals.map((h) => ({
            slug: h.slug,
            coordinates: h.coordinates,
        }))
    )

    // Selected hospital for footer display
    const [selectedHospital, setSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)

    // Handle hospital selection
    const handleHospitalHover = (hospital: EnrichedHospitalData | null) => {
        setSelectedHospital(hospital)
        if (onHospitalSelect) {
            onHospitalSelect(hospital)
        }
    }

    // Handle map movement with geofence and zoom restrictions
    const onMove = useCallback((evt: { viewState: ViewState }) => {
        const newViewState = evt.viewState
        const newCenter = [newViewState.longitude, newViewState.latitude]

        const isInsideGeofence = turf.booleanPointInPolygon(newCenter, GEOFENCE)
        const isZoomValid =
            newViewState.zoom >= MIN_ZOOM && newViewState.zoom <= MAX_ZOOM

        if (isInsideGeofence && isZoomValid) {
            setViewState(newViewState)
        }
    }, [])

    // Get wait time for display
    const getDisplayWaitTime = (hospital: EnrichedHospitalData) => {
        return (
            hospital.waitTimes.semiUrgentNonUrgentP50Minutes ??
            hospital.waitTimes.urgentP50Minutes ??
            null
        )
    }

    // Format distance for display
    const formatDistance = (km: number): string => {
        if (km < 1) {
            return `${Math.round(km * 1000)}m`
        }
        return `${km.toFixed(1)}km`
    }

    // Format duration for display
    const formatDuration = (minutes: number): string => {
        if (minutes < 60) {
            return `${Math.round(minutes)} min`
        }
        const hours = Math.floor(minutes / 60)
        const mins = Math.round(minutes % 60)
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex-1 w-full overflow-hidden">
                <Map
                    {...viewState}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    initialViewState={initialViewState}
                    style={{ width: "100%", height: "100%" }}
                    onMove={onMove}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    minZoom={MIN_ZOOM}
                    maxZoom={MAX_ZOOM}
                >
                    {/* User location marker (always shown) */}
                    <Marker
                        longitude={userLocation.longitude}
                        latitude={userLocation.latitude}
                        color="red"
                        anchor="center"
                    />

                    {/* Hospital markers */}
                    {enrichedHospitals.map((hospital) => {
                        const waitTime = getDisplayWaitTime(hospital)
                        const color = getWaitTimeColor(waitTime)
                        const hasCriticalCases =
                            hospital.criticalManagementStatus ===
                                ManagementStatus.Managing ||
                            hospital.criticalManagementStatus ===
                                ManagementStatus.ManagingMultiple

                        return (
                            <Marker
                                key={hospital.slug}
                                longitude={hospital.coordinates.longitude}
                                latitude={hospital.coordinates.latitude}
                                anchor="center"
                                onClick={(e) => {
                                    e.originalEvent.stopPropagation()
                                    handleHospitalHover(hospital)
                                }}
                            >
                                <div
                                    className="cursor-pointer"
                                    onMouseEnter={() =>
                                        handleHospitalHover(hospital)
                                    }
                                    onMouseLeave={() =>
                                        handleHospitalHover(null)
                                    }
                                >
                                    <div
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            backgroundColor: color,
                                            border: "2px solid white",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "0 2px 4px rgba(0,0,0,0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        {hasCriticalCases && (
                                            <AlertCircle
                                                className="h-3 w-3 text-white"
                                                style={{
                                                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Marker>
                        )
                    })}
                </Map>
            </div>

            {/* Footer info panel */}
            {selectedHospital && (
                <div className="border-t bg-background p-4 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base leading-tight mb-1">
                                {selectedHospital.name[lang]}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                {selectedHospital.address[lang]}
                            </p>

                            <div className="space-y-1.5">
                                {/* Primary wait time */}
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{
                                            backgroundColor: getWaitTimeColor(
                                                getDisplayWaitTime(
                                                    selectedHospital
                                                )
                                            ),
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">
                                            {formatWaitTimeHoursMinutes(
                                                getDisplayWaitTime(
                                                    selectedHospital
                                                )
                                            )}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Semi-urgent / Non-urgent
                                        </span>
                                    </div>
                                </div>

                                {/* Secondary wait times */}
                                <div className="pl-5 space-y-1 text-xs text-muted-foreground">
                                    {selectedHospital.waitTimes
                                        .urgentP50Minutes !== null && (
                                        <div>
                                            Urgent:{" "}
                                            {formatWaitTimeHoursMinutes(
                                                selectedHospital.waitTimes
                                                    .urgentP50Minutes
                                            )}
                                        </div>
                                    )}
                                    {selectedHospital.waitTimes
                                        .criticalMinutes !== null && (
                                        <div>
                                            Critical:{" "}
                                            {formatWaitTimeHoursMinutes(
                                                selectedHospital.waitTimes
                                                    .criticalMinutes
                                            )}
                                        </div>
                                    )}
                                    {selectedHospital.waitTimes
                                        .emergencyMinutes !== null && (
                                        <div>
                                            Emergency:{" "}
                                            {formatWaitTimeHoursMinutes(
                                                selectedHospital.waitTimes
                                                    .emergencyMinutes
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Critical case status */}
                                {(selectedHospital.criticalManagementStatus ===
                                    ManagementStatus.Managing ||
                                    selectedHospital.criticalManagementStatus ===
                                        ManagementStatus.ManagingMultiple) && (
                                    <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1">
                                        <AlertCircle className="h-3 w-3" />
                                        <span>
                                            {selectedHospital.criticalManagementStatus ===
                                            ManagementStatus.ManagingMultiple
                                                ? "Managing multiple critical cases"
                                                : "Managing critical case"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Distance (if available) */}
                        {distanceData[selectedHospital.slug] && (
                            <div className="text-sm text-muted-foreground border-l pl-4 flex-shrink-0">
                                <div className="flex items-center gap-1 mb-1">
                                    <MapPin className="h-4 w-4" />
                                    <span className="font-medium">
                                        {formatDistance(
                                            distanceData[selectedHospital.slug]
                                                .distance
                                        )}
                                    </span>
                                </div>
                                <div className="text-xs">
                                    {formatDuration(
                                        distanceData[selectedHospital.slug]
                                            .duration
                                    )}{" "}
                                    drive
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
