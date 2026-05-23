"use client"

import { HospitalMapOverlay } from "@/components/HospitalMap/HospitalMapOverlay"
import { MapLanguageControl } from "@/components/HospitalMap/MapLanguageControl"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { useLanguage } from "@/hooks/useLanguage"
import { useMapboxDistance } from "@/hooks/useMapboxDistance"
import {
    DEFAULT_COORDINATES,
    findClosestHospital,
    getDisplayWaitTime,
    getWaitTimeColor,
    hasCriticalCases,
    HONG_KONG_GEOFENCE,
    MAX_ZOOM,
    MIN_ZOOM,
} from "@/lib/map"
import { Coordinates, EnrichedHospitalData } from "@/types"
import * as turf from "@turf/turf"
import { AlertCircle, User } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Map, { MapRef, Marker, ViewState } from "react-map-gl/mapbox"

interface HospitalMapProps {
    onHospitalSelect?: (hospital: EnrichedHospitalData | null) => void
    userCoords?: Coordinates | null
    isOpen?: boolean
}

export function HospitalMap({
    onHospitalSelect,
    userCoords = null,
    isOpen = true,
}: HospitalMapProps) {
    const { data: waitTimesData } = useHospitalWaitTimes()
    const { lang } = useLanguage()
    const { theme, resolvedTheme } = useTheme()

    const currentTheme = (resolvedTheme || theme || "light") as "light" | "dark"

    const mapStyle = useMemo(() => {
        const currentTheme = resolvedTheme || theme || "light"
        return currentTheme === "dark"
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/light-v11"
    }, [theme, resolvedTheme])

    const userLocation = useMemo(() => {
        return userCoords ?? DEFAULT_COORDINATES
    }, [userCoords])

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
    const hasCenteredOnUser = useRef(false)

    useEffect(() => {
        if (!isOpen) {
            hasCenteredOnUser.current = false
        }
    }, [isOpen])

    const flyToUser = useCallback(() => {
        if (!userCoords || !mapRef.current || hasCenteredOnUser.current) {
            return false
        }
        hasCenteredOnUser.current = true
        mapRef.current.flyTo({
            center: [userCoords.longitude, userCoords.latitude],
            zoom: 12,
            duration: 800,
        })
        return true
    }, [userCoords])

    useEffect(() => {
        if (!userCoords || hasCenteredOnUser.current) {
            return
        }
        if (flyToUser()) {
            return
        }
        const timer = setTimeout(flyToUser, 150)
        return () => clearTimeout(timer)
    }, [userCoords, flyToUser])

    useEffect(() => {
        const resizeMap = () => {
            if (mapRef.current) {
                mapRef.current.resize()
            }
        }

        const timer1 = setTimeout(resizeMap, 100)
        const timer2 = setTimeout(resizeMap, 300)

        window.addEventListener("resize", resizeMap)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            window.removeEventListener("resize", resizeMap)
        }
    }, [])

    const enrichedHospitals = useMemo(() => {
        return waitTimesData?.waitTimes ?? []
    }, [waitTimesData])

    const { distances: distanceData } = useMapboxDistance(
        userCoords,
        enrichedHospitals.map((h) => ({
            slug: h.slug,
            coordinates: h.coordinates,
        }))
    )

    const defaultSelectedHospital = useMemo(() => {
        return findClosestHospital(userLocation, enrichedHospitals)
    }, [userLocation, enrichedHospitals])

    const [userSelectedHospital, setUserSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)

    const selectedHospital = userSelectedHospital || defaultSelectedHospital

    const handleHospitalClick = (hospital: EnrichedHospitalData) => {
        setUserSelectedHospital(hospital)
        if (onHospitalSelect) {
            onHospitalSelect(hospital)
        }
    }

    const onMove = useCallback((evt: { viewState: ViewState }) => {
        const newViewState = evt.viewState
        const newCenter = [newViewState.longitude, newViewState.latitude]

        const isInsideGeofence = turf.booleanPointInPolygon(
            newCenter,
            HONG_KONG_GEOFENCE
        )
        const isZoomValid =
            newViewState.zoom >= MIN_ZOOM && newViewState.zoom <= MAX_ZOOM

        if (isInsideGeofence && isZoomValid) {
            setViewState(newViewState)
        }
    }, [])

    return (
        <div className="w-full h-full relative overflow-hidden">
            <Map
                reuseMaps
                ref={mapRef}
                {...viewState}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={initialViewState}
                style={{ width: "100%", height: "100%" }}
                onMove={onMove}
                onLoad={() => {
                    if (mapRef.current) {
                        setTimeout(() => {
                            mapRef.current?.resize()
                            flyToUser()
                        }, 50)
                    }
                }}
                mapStyle={mapStyle}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
            >
                <MapLanguageControl lang={lang} />

                {userCoords && (
                    <Marker
                        longitude={userCoords.longitude}
                        latitude={userCoords.latitude}
                        anchor="center"
                    >
                        <div
                            style={{
                                width: "28px",
                                height: "28px",
                                backgroundColor: "#3b82f6",
                                border: "2px solid white",
                                borderRadius: "50%",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <User
                                className="h-4 w-4 text-white"
                                style={{
                                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))",
                                }}
                            />
                        </div>
                    </Marker>
                )}

                {enrichedHospitals.map((hospital) => {
                    const waitTime = getDisplayWaitTime(hospital)
                    const color = getWaitTimeColor(waitTime, currentTheme)
                    const isSelected = selectedHospital?.slug === hospital.slug
                    const hasCritical = hasCriticalCases(hospital)

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
                                    {hasCritical && (
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
