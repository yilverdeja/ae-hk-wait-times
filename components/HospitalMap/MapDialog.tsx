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
import { isUserInHongKong } from "@/lib/map"
import { getLocalizedText, mapDialogTranslations } from "@/lib/map-translations"
import { sendGAEvent } from "@next/third-parties/google"
import { Map } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useGeolocated } from "react-geolocated"

export function MapDialog() {
    const [open, setOpen] = useState(false)
    const { lang } = useLanguage()
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition,
    } = useGeolocated({ suppressLocationOnMount: true })

    // Check if user is outside Hong Kong (Issue 8)
    const isUserOutsideHongKong = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            return !isUserInHongKong({
                longitude: coords.longitude,
                latitude: coords.latitude,
            })
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
                    <DialogTitle>
                        {getLocalizedText(mapDialogTranslations.title, lang)}
                    </DialogTitle>
                    <DialogDescription>
                        {getLocalizedText(
                            mapDialogTranslations.description,
                            lang
                        )}
                        {!isGeolocationEnabled && isGeolocationAvailable && (
                            <span className="block mt-1 text-xs">
                                {getLocalizedText(
                                    mapDialogTranslations.noGeolocation,
                                    lang
                                )}
                            </span>
                        )}
                        {isUserOutsideHongKong && (
                            <span className="block mt-1 text-xs text-amber-600">
                                {getLocalizedText(
                                    mapDialogTranslations.outsideHongKong,
                                    lang
                                )}
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
