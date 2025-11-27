"use client"

import { useGeolocated } from "react-geolocated"
import Map, { Marker, Popup, ViewState } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useCallback, useMemo } from "react"
import * as turf from "@turf/turf"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { useMapboxDistance } from "@/hooks/useMapboxDistance"
import { getWaitTimeColor, getWaitTimeCategory } from "@/utils/waitTimeColors"
import { EnrichedHospitalData, ManagementStatus } from "@/types"
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

export function HospitalMap() {
    const { coords, isGeolocationEnabled } = useGeolocated({
        suppressLocationOnMount: true,
    })
    const { data: waitTimesData } = useHospitalWaitTimes()
    const { lang } = useLanguage()

    // Determine user location (use geolocation if available, otherwise default)
    const userLocation = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            return {
                longitude: coords.longitude,
                latitude: coords.latitude,
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
        <div className="w-full h-full flex justify-center items-center">
            <Map
                {...viewState}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={initialViewState}
                style={{ width: "100%", height: 400 }}
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
                                anchor="bottom"
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
                                    style={{
                                        position: "relative",
                                        transform: "translate(-50%, -100%)",
                                    }}
                                >
                                    {/* Custom colored marker */}
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

                            {/* Popup on hover/click */}
                            {selectedHospital?.slug === hospital.slug && (
                                <Popup
                                    longitude={hospital.coordinates.longitude}
                                    latitude={hospital.coordinates.latitude}
                                    anchor="bottom"
                                    onClose={() => setSelectedHospital(null)}
                                    closeButton={true}
                                    closeOnClick={false}
                                    className="max-w-xs"
                                >
                                    <div className="p-2 space-y-2">
                                        <h3 className="font-semibold text-sm">
                                            {hospital.name[lang]}
                                        </h3>
                                        <div className="text-xs text-muted-foreground">
                                            <p>{hospital.address[lang]}</p>
                                        </div>

                                        {/* Wait times */}
                                        <div className="space-y-1 text-xs">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                />
                                                <span>
                                                    {getWaitTimeCategory(
                                                        waitTime
                                                    )}
                                                    :{" "}
                                                    {waitTime !== null
                                                        ? `${waitTime} min`
                                                        : "N/A"}
                                                </span>
                                            </div>

                                            {hospital.waitTimes
                                                .urgentP50Minutes !== null && (
                                                <div className="text-xs text-muted-foreground">
                                                    Urgent:{" "}
                                                    {
                                                        hospital.waitTimes
                                                            .urgentP50Minutes
                                                    }{" "}
                                                    min
                                                </div>
                                            )}

                                            {hasCriticalCases && (
                                                <div className="flex items-center gap-1 text-xs text-red-600">
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
                                </Popup>
                            )}
                        </div>
                    )
                })}
            </Map>
        </div>
    )
}
