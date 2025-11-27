"use client"

import { Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { sendGAEvent } from "@next/third-parties/google"
import { useGeolocated } from "react-geolocated"
import { useState, useEffect } from "react"
import { HospitalMap } from "./HospitalMap"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"

const mapDialogTexts = {
    [LanguageCode.EN]: {
        title: "Hospital Map",
        description:
            "View all hospitals on the map. Markers are color-coded by wait times. Hover or click on markers for details.",
        noGeolocation:
            "Enable location services to see distances from your location.",
    },
    [LanguageCode.ZH]: {
        title: "醫院地圖",
        description:
            "在地圖上查看所有醫院。標記按等候時間以顏色編碼。懸停或點擊標記以查看詳情。",
        noGeolocation: "啟用定位服務以查看與您位置的距離。",
    },
    [LanguageCode.CN]: {
        title: "医院地图",
        description:
            "在地图上查看所有医院。标记按等候时间以颜色编码。悬停或点击标记以查看详情。",
        noGeolocation: "启用定位服务以查看与您位置的距离。",
    },
}

export function MapDialog() {
    const [open, setOpen] = useState(false)
    const { lang } = useLanguage()
    const { isGeolocationAvailable, isGeolocationEnabled, getPosition } =
        useGeolocated({ suppressLocationOnMount: true })

    const texts = mapDialogTexts[lang]

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
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{texts.title}</DialogTitle>
                    <DialogDescription>
                        {texts.description}
                        {!isGeolocationEnabled && isGeolocationAvailable && (
                            <span className="block mt-1 text-xs">
                                {texts.noGeolocation}
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <HospitalMap />
                </div>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
