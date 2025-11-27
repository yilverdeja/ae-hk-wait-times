"use client"

import { useGeolocated } from "react-geolocated"
import Map, { Marker, ViewState, MapRef } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useCallback, useMemo, useRef, useEffect } from "react"
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
    const mapRef = useRef<MapRef>(null)

    // Resize map when container becomes visible (fixes dialog opening issue)
    useEffect(() => {
        const resizeMap = () => {
            if (mapRef.current) {
                mapRef.current.resize()
            }
        }

        // Initial resize with delay to ensure container is fully rendered
        const timer1 = setTimeout(resizeMap, 100)
        const timer2 = setTimeout(resizeMap, 300) // Second attempt for slower renders

        // Also resize when window resizes
        window.addEventListener("resize", resizeMap)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            window.removeEventListener("resize", resizeMap)
        }
    }, [])

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

    // Selected hospital - default to first hospital
    const defaultSelectedHospital = useMemo(() => {
        return enrichedHospitals.length > 0 ? enrichedHospitals[0] : null
    }, [enrichedHospitals])

    const [userSelectedHospital, setUserSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)

    // Use user selection if available, otherwise use default
    const selectedHospital = userSelectedHospital || defaultSelectedHospital

    // Handle hospital selection (click only, no hover)
    const handleHospitalClick = (hospital: EnrichedHospitalData) => {
        setUserSelectedHospital(hospital)
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
        <div className="w-full h-full relative overflow-hidden">
            {/* Map - full size */}
            <Map
                ref={mapRef}
                {...viewState}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={initialViewState}
                style={{ width: "100%", height: "100%" }}
                onMove={onMove}
                onLoad={() => {
                    // Resize map after it loads to ensure proper fit
                    if (mapRef.current) {
                        setTimeout(() => {
                            mapRef.current?.resize()
                        }, 50)
                    }
                }}
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
                    const isSelected = selectedHospital?.slug === hospital.slug
                    const hasCriticalCases =
                        hospital.criticalManagementStatus ===
                            ManagementStatus.Managing ||
                        hospital.criticalManagementStatus ===
                            ManagementStatus.ManagingMultiple ||
                        hospital.emergencyManagementStatus ===
                            ManagementStatus.Managing ||
                        hospital.emergencyManagementStatus ===
                            ManagementStatus.ManagingMultiple

                    return (
                        <Marker
                            key={hospital.slug}
                            longitude={hospital.coordinates.longitude}
                            latitude={hospital.coordinates.latitude}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation()
                                handleHospitalClick(hospital)
                            }}
                        >
                            <div className="cursor-pointer">
                                <div
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundColor: color,
                                        border: isSelected
                                            ? "3px solid #3b82f6"
                                            : "2px solid white",
                                        borderRadius: "50%",
                                        boxShadow: isSelected
                                            ? "0 0 0 2px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0,0,0,0.3)"
                                            : "0 2px 4px rgba(0,0,0,0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transform: "translate(-50%, -50%)",
                                        transition: "all 0.2s ease",
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

            {/* Overlay info panel - always visible, positioned above map */}
            {selectedHospital && (
                <div
                    className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto pointer-events-none z-10"
                    style={{ maxWidth: "calc(100% - 2rem)" }}
                >
                    <div
                        className="bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg p-3 sm:p-4 pointer-events-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        {/* Mobile: Vertical layout */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 space-y-2 sm:space-y-0">
                            {/* Left section: Hospital info and wait times */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1">
                                    {selectedHospital.name[lang]}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                                    {selectedHospital.address[lang]}
                                </p>

                                {/* Wait times - vertical on mobile, horizontal on larger screens */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 space-y-1.5 sm:space-y-0">
                                    {/* Primary wait time */}
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{
                                                backgroundColor:
                                                    getWaitTimeColor(
                                                        getDisplayWaitTime(
                                                            selectedHospital
                                                        )
                                                    ),
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm sm:text-base font-semibold">
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

                                    {/* Secondary wait times - horizontal on larger screens */}
                                    <div className="flex flex-col sm:flex-row sm:gap-3 pl-5 sm:pl-0 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                                        {selectedHospital.waitTimes
                                            .urgentP50Minutes !== null && (
                                            <div className="sm:border-l sm:pl-3">
                                                Urgent:{" "}
                                                {formatWaitTimeHoursMinutes(
                                                    selectedHospital.waitTimes
                                                        .urgentP50Minutes
                                                )}
                                            </div>
                                        )}
                                        {selectedHospital.waitTimes
                                            .criticalMinutes !== null && (
                                            <div className="sm:border-l sm:pl-3">
                                                Critical:{" "}
                                                {formatWaitTimeHoursMinutes(
                                                    selectedHospital.waitTimes
                                                        .criticalMinutes
                                                )}
                                            </div>
                                        )}
                                        {selectedHospital.waitTimes
                                            .emergencyMinutes !== null && (
                                            <div className="sm:border-l sm:pl-3">
                                                Emergency:{" "}
                                                {formatWaitTimeHoursMinutes(
                                                    selectedHospital.waitTimes
                                                        .emergencyMinutes
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Critical case status */}
                                {(selectedHospital.criticalManagementStatus ===
                                    ManagementStatus.Managing ||
                                    selectedHospital.criticalManagementStatus ===
                                        ManagementStatus.ManagingMultiple) && (
                                    <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1.5 sm:pt-2">
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

                            {/* Right section: Distance (if available) */}
                            {distanceData[selectedHospital.slug] && (
                                <div className="text-xs sm:text-sm text-muted-foreground border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4 sm:ml-0 flex-shrink-0">
                                    <div className="flex items-center gap-1 mb-1">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="font-medium">
                                            {formatDistance(
                                                distanceData[
                                                    selectedHospital.slug
                                                ].distance
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
                </div>
            )}
        </div>
    )
}
