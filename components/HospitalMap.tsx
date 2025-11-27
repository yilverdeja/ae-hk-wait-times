"use client"

import { useGeolocated } from "react-geolocated"
import Map, { Marker, Popup, ViewState, MapRef } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import * as turf from "@turf/turf"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { useMapboxDistance } from "@/hooks/useMapboxDistance"
import {
    getWaitTimeColor,
    getWaitTimeCategory,
    formatWaitTimeHoursMinutes,
} from "@/utils/waitTimeColors"
import {
    EnrichedHospitalData,
    ManagementStatus,
    Coordinates,
    LanguageCode,
} from "@/types"
import { useLanguage } from "@/hooks/useLanguage"
import { AlertCircle, MapPin } from "lucide-react"

// Improved geofence: A larger circle covering Hong Kong (approximately 30km radius)
// This covers Hong Kong Island, Kowloon, and most of New Territories
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

export function HospitalMap() {
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
            // Check if user is in Hong Kong, otherwise use default
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

    // Selected hospital for popup
    const [selectedHospital, setSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)

    // Handle map movement with geofence and zoom restrictions
    const onMove = useCallback((evt: { viewState: ViewState }) => {
        const newViewState = evt.viewState
        const newCenter = [newViewState.longitude, newViewState.latitude]

        // Check if center is inside geofence
        const isInsideGeofence = turf.booleanPointInPolygon(newCenter, GEOFENCE)

        // Check zoom limits
        const isZoomValid =
            newViewState.zoom >= MIN_ZOOM && newViewState.zoom <= MAX_ZOOM

        // Only update if both conditions are met
        if (isInsideGeofence && isZoomValid) {
            setViewState(newViewState)
        }
    }, [])

    // Get wait time for display (prefer semi-urgent, fallback to urgent)
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
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
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
                    const distance = distanceData[hospital.slug]
                    const hasCriticalCases =
                        hospital.criticalManagementStatus ===
                            ManagementStatus.Managing ||
                        hospital.criticalManagementStatus ===
                            ManagementStatus.ManagingMultiple

                    return (
                        <div key={hospital.slug}>
                            <Marker
                                longitude={hospital.coordinates.longitude}
                                latitude={hospital.coordinates.latitude}
                                anchor="center"
                                onClick={(e) => {
                                    e.originalEvent.stopPropagation()
                                    setSelectedHospital(hospital)
                                }}
                            >
                                <div
                                    className="cursor-pointer"
                                    onMouseEnter={() =>
                                        setSelectedHospital(hospital)
                                    }
                                    onMouseLeave={() => {
                                        // Close popup when mouse leaves marker
                                        // Small delay to allow moving to popup
                                        setTimeout(() => {
                                            if (
                                                selectedHospital?.slug ===
                                                hospital.slug
                                            ) {
                                                setSelectedHospital(null)
                                            }
                                        }, 100)
                                    }}
                                >
                                    {/* Custom colored marker - Issue 5: Fixed anchor and removed transform */}
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
                                        {/* Issue 2: Icon shows for all hospitals with critical cases */}
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

                            {/* Popup on hover/click - Issue 1: Improved UX with hover-out */}
                            {selectedHospital?.slug === hospital.slug && (
                                <Popup
                                    longitude={hospital.coordinates.longitude}
                                    latitude={hospital.coordinates.latitude}
                                    anchor="bottom"
                                    onClose={() => setSelectedHospital(null)}
                                    closeButton={false}
                                    closeOnClick={false}
                                    className="max-w-xs"
                                >
                                    <div
                                        onMouseEnter={() => {
                                            // Keep popup open when hovering over it
                                            setSelectedHospital(hospital)
                                        }}
                                        onMouseLeave={() => {
                                            // Close popup when mouse leaves
                                            setSelectedHospital(null)
                                        }}
                                    >
                                        {/* Issue 1: Sleeker popup design with better typography */}
                                        <div className="p-3 space-y-2.5">
                                            <h3 className="font-semibold text-base leading-tight">
                                                {hospital.name[lang]}
                                            </h3>
                                            <div className="text-xs text-muted-foreground leading-relaxed">
                                                <p>{hospital.address[lang]}</p>
                                            </div>

                                            {/* Issue 3: Wait times with proper formatting */}
                                            <div className="space-y-1.5">
                                                {/* Primary: Semi-urgent/Non-urgent (most prominent) */}
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">
                                                            {formatWaitTimeHoursMinutes(
                                                                waitTime
                                                            )}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {getWaitTimeCategory(
                                                                waitTime
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Secondary: Urgent (subtext) */}
                                                {hospital.waitTimes
                                                    .urgentP50Minutes !==
                                                    null && (
                                                    <div className="text-xs text-muted-foreground pl-5">
                                                        Urgent:{" "}
                                                        {formatWaitTimeHoursMinutes(
                                                            hospital.waitTimes
                                                                .urgentP50Minutes
                                                        )}
                                                    </div>
                                                )}

                                                {/* Tertiary: Critical/Emergency (subtext) */}
                                                {hospital.waitTimes
                                                    .criticalMinutes !==
                                                    null && (
                                                    <div className="text-xs text-muted-foreground pl-5">
                                                        Critical:{" "}
                                                        {formatWaitTimeHoursMinutes(
                                                            hospital.waitTimes
                                                                .criticalMinutes
                                                        )}
                                                    </div>
                                                )}

                                                {hospital.waitTimes
                                                    .emergencyMinutes !==
                                                    null && (
                                                    <div className="text-xs text-muted-foreground pl-5">
                                                        Emergency:{" "}
                                                        {formatWaitTimeHoursMinutes(
                                                            hospital.waitTimes
                                                                .emergencyMinutes
                                                        )}
                                                    </div>
                                                )}

                                                {hasCriticalCases && (
                                                    <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1">
                                                        <AlertCircle className="h-3 w-3" />
                                                        <span>
                                                            {hospital.criticalManagementStatus ===
                                                            ManagementStatus.ManagingMultiple
                                                                ? "Managing multiple critical cases"
                                                                : "Managing critical case"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Distance (if available) */}
                                            {distance && (
                                                <div className="text-xs text-muted-foreground border-t pt-2">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>
                                                            {formatDistance(
                                                                distance.distance
                                                            )}{" "}
                                                            •{" "}
                                                            {formatDuration(
                                                                distance.duration
                                                            )}{" "}
                                                            drive
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Popup>
                            )}
                        </div>
                    )
                })}
            </Map>
        </div>
    )
}
