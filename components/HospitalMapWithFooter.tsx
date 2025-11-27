"use client"

import { useGeolocated } from "react-geolocated"
import Map, { Marker, ViewState, MapRef } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import * as turf from "@turf/turf"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { useMapboxDistance } from "@/hooks/useMapboxDistance"
import { getWaitTimeColor } from "@/utils/waitTimeColors"
import {
    EnrichedHospitalData,
    ManagementStatus,
    Coordinates,
    LanguageCode,
} from "@/types"
import { useLanguage } from "@/hooks/useLanguage"
import { AlertCircle } from "lucide-react"
import { HospitalMapOverlay } from "@/components/HospitalMapOverlay"
import MapboxLanguage from "@mapbox/mapbox-gl-language"

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
    const languageControlRef = useRef<MapboxLanguage | null>(null)

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

    // Get wait time for display (for marker color)
    const getDisplayWaitTime = (hospital: EnrichedHospitalData) => {
        return (
            hospital.waitTimes.semiUrgentNonUrgentP50Minutes ??
            hospital.waitTimes.urgentP50Minutes ??
            null
        )
    }

    // Map LanguageCode to Mapbox language code
    const getMapboxLanguageCode = (langCode: LanguageCode): string => {
        switch (langCode) {
            case LanguageCode.EN:
                return "en"
            case LanguageCode.ZH:
                return "zh-Hant" // Traditional Chinese
            case LanguageCode.CN:
                return "zh-Hans" // Simplified Chinese
            default:
                return "en"
        }
    }

    // Create language control instance early with current language
    const languageControl = useMemo(() => {
        const mapboxLangCode = getMapboxLanguageCode(lang)
        return new MapboxLanguage({
            defaultLanguage: mapboxLangCode,
        })
    }, [lang])

    // Add language control as early as possible to prevent English flash
    // Use onStyleData which fires when style data is loaded (before rendering)
    const handleStyleData = useCallback(() => {
        if (!mapRef.current || languageControlRef.current) return

        const map = mapRef.current.getMap()
        const mapboxLangCode = getMapboxLanguageCode(lang)

        // Add control immediately - it will automatically handle style.load
        map.addControl(languageControl)
        languageControlRef.current = languageControl

        // If style is already loaded, apply language immediately
        if (map.isStyleLoaded()) {
            try {
                const currentStyle = map.getStyle()
                if (currentStyle) {
                    const updatedStyle = languageControl.setLanguage(
                        currentStyle,
                        mapboxLangCode
                    )
                    map.setStyle(updatedStyle)
                }
            } catch (error) {
                console.error("Error applying map language:", error)
            }
        }
    }, [lang, languageControl])

    // Cleanup language control on unmount
    useEffect(() => {
        const currentMapRef = mapRef.current
        return () => {
            if (languageControlRef.current && currentMapRef) {
                try {
                    currentMapRef
                        .getMap()
                        .removeControl(languageControlRef.current)
                } catch {
                    // Map might be unmounted, ignore error
                }
                languageControlRef.current = null
            }
        }
    }, [])

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
                onStyleData={handleStyleData}
                onLoad={() => {
                    // Resize map after it loads to ensure proper fit
                    if (mapRef.current) {
                        setTimeout(() => {
                            mapRef.current?.resize()
                        }, 50)
                    }

                    // Fallback: ensure language control is added if onStyleData didn't fire
                    if (mapRef.current && !languageControlRef.current) {
                        handleStyleData()
                    }
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
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
                <HospitalMapOverlay
                    hospital={selectedHospital}
                    lang={lang}
                    distance={distanceData[selectedHospital.slug]}
                    lastUpdated={waitTimesData?.lastUpdated}
                />
            )}
        </div>
    )
}
