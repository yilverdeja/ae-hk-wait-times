"use client"

import { useEffect, useRef } from "react"
import { useControl } from "react-map-gl/mapbox"
import MapboxLanguage from "@mapbox/mapbox-gl-language"
import { LanguageCode } from "@/types"
import type { MapRef } from "react-map-gl/mapbox"

interface MapLanguageControlProps {
    lang: LanguageCode
}

// Map LanguageCode to Mapbox language code
function getMapboxLanguageCode(langCode: LanguageCode): string {
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

/**
 * MapLanguageControl component that manages MapboxLanguage control
 * using react-map-gl's useControl hook for proper lifecycle management.
 * This works correctly with reuseMaps since the control persists.
 */
export function MapLanguageControl({ lang }: MapLanguageControlProps) {
    const mapboxLangCode = getMapboxLanguageCode(lang)
    const mapInstanceRef = useRef<ReturnType<MapRef["getMap"]> | null>(null)
    const controlRef = useRef<MapboxLanguage | null>(null)

    // Use useControl to manage the MapboxLanguage control lifecycle
    const control = useControl<MapboxLanguage>(
        () => {
            // Create control instance with current language as default
            const languageControl = new MapboxLanguage({
                defaultLanguage: mapboxLangCode,
            })
            controlRef.current = languageControl
            return languageControl
        },
        ({ map }) => {
            // onAdd callback - store the actual Mapbox map instance
            // map is a MapRef, we need to call getMap() to get the underlying Mapbox map
            mapInstanceRef.current = map.getMap()
        },
        {
            // No position needed - MapboxLanguage doesn't render a UI control
        }
    )

    // Update language when lang prop changes
    // This handles both initial load and dynamic language changes
    useEffect(() => {
        if (!control || !mapInstanceRef.current) return

        const map = mapInstanceRef.current
        const newMapboxLangCode = getMapboxLanguageCode(lang)

        // Update language dynamically using setLanguage
        const updateLanguage = () => {
            try {
                const currentStyle = map.getStyle()
                if (currentStyle) {
                    const updatedStyle = control.setLanguage(
                        currentStyle,
                        newMapboxLangCode
                    )
                    map.setStyle(updatedStyle)
                }
            } catch (error) {
                console.error("Error updating map language:", error)
            }
        }

        // If style is already loaded, update immediately
        if (map.isStyleLoaded()) {
            updateLanguage()
        } else {
            // Otherwise wait for style to load
            map.once("style.load", updateLanguage)
        }
    }, [lang, control])

    // This component doesn't render anything
    return null
}

