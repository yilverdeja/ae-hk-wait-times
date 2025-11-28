"use client"

import { HospitalMap } from "@/components/HospitalMap/HospitalMap"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import * as turf from "@turf/turf"
import { Map } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useGeolocated } from "react-geolocated"

// Geofence for Hong Kong (same as in HospitalMap)
const GEOFENCE = turf.circle([114.176611, 22.311637], 30, {
    units: "kilometers",
})

const mapDialogTexts = {
    [LanguageCode.EN]: {
        title: "Hospital Map",
        description:
            "View all hospitals on the map. Markers are color-coded by wait times. Hover or click on markers for details.",
        noGeolocation:
            "Enable location services to see distances from your location.",
        outsideHongKong:
            "You appear to be outside Hong Kong. Showing default location.",
    },
    [LanguageCode.ZH]: {
        title: "醫院地圖",
        description:
            "在地圖上查看所有醫院。標記按等候時間以顏色編碼。懸停或點擊標記以查看詳情。",
        noGeolocation: "啟用定位服務以查看與您位置的距離。",
        outsideHongKong: "您似乎不在香港。顯示預設位置。",
    },
    [LanguageCode.CN]: {
        title: "医院地图",
        description:
            "在地图上查看所有医院。标记按等候时间以颜色编码。悬停或点击标记以查看详情。",
        noGeolocation: "启用定位服务以查看与您位置的距离。",
        outsideHongKong: "您似乎不在香港。显示预设位置。",
    },
}

export function MapDialog() {
    const [open, setOpen] = useState(false)
    const { lang } = useLanguage()
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition,
    } = useGeolocated({ suppressLocationOnMount: true })

    const texts = mapDialogTexts[lang]

    // Check if user is outside Hong Kong (Issue 8)
    const isUserOutsideHongKong = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            const point = [coords.longitude, coords.latitude]
            return !turf.booleanPointInPolygon(point, GEOFENCE)
        }
        return false
    }, [isGeolocationEnabled, coords])

    // Request geolocation when dialog opens
    useEffect(() => {
        if (open && isGeolocationAvailable && !isGeolocationEnabled) {
            // Try to get position when dialog opens
            getPosition()
        }
    }, [open, isGeolocationAvailable, isGeolocationEnabled, getPosition])

    const handleClick = () => {
        sendGAEvent("event", "map_button_clicked")
        // If geolocation is available but not enabled, try to get it
        if (isGeolocationAvailable && !isGeolocationEnabled) {
            getPosition()
        }
    }

    // Show button even if geolocation is not available (map still works with default location)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleClick}
                    className="cursor-pointer"
                >
                    <Map className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full h-full m-0 max-w-none max-h-none rounded-none sm:w-[90vw] sm:h-[85vh] sm:max-w-6xl sm:rounded-lg md:w-[85vw] md:h-[80vh] md:max-w-7xl flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{texts.title}</DialogTitle>
                    <DialogDescription>
                        {texts.description}
                        {!isGeolocationEnabled && isGeolocationAvailable && (
                            <span className="block mt-1 text-xs">
                                {texts.noGeolocation}
                            </span>
                        )}
                        {isUserOutsideHongKong && (
                            <span className="block mt-1 text-xs text-amber-600">
                                {texts.outsideHongKong}
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 w-full overflow-hidden px-6 pb-4">
                    <HospitalMap />
                </div>
                <DialogFooter className="px-6 pb-6">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
