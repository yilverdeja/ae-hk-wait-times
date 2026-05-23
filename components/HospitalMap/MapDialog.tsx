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
import { LocateFixed, Map } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useGeolocated } from "react-geolocated"

export function MapDialog() {
    const [open, setOpen] = useState(false)
    const { lang } = useLanguage()
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition,
    } = useGeolocated({
        suppressLocationOnMount: true,
        isOptimisticGeolocationEnabled: false,
        watchLocationPermissionChange: true,
    })

    const rawCoords = useMemo(() => {
        if (isGeolocationEnabled && coords) {
            return {
                longitude: coords.longitude,
                latitude: coords.latitude,
            }
        }
        return null
    }, [isGeolocationEnabled, coords])

    const isUserOutsideHongKong = useMemo(() => {
        return rawCoords != null && !isUserInHongKong(rawCoords)
    }, [rawCoords])

    const userCoords =
        rawCoords && !isUserOutsideHongKong ? rawCoords : null

    const locationFeaturesEnabled =
        isGeolocationEnabled && !isUserOutsideHongKong

    const showLocateButton =
        isGeolocationAvailable &&
        !isUserOutsideHongKong &&
        (!coords || !isGeolocationEnabled)

    useEffect(() => {
        if (open && isGeolocationAvailable && !coords) {
            getPosition()
        }
    }, [open, isGeolocationAvailable, coords, getPosition])

    const handleClick = () => {
        sendGAEvent("event", "map_button_clicked")
        if (isGeolocationAvailable && !coords) {
            getPosition()
        }
    }

    const handleLocateMe = useCallback(() => {
        sendGAEvent("event", "map_locate_me_clicked")
        getPosition()
    }, [getPosition])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClick}
                    className="cursor-pointer gap-2 flex-1 min-w-0 md:flex-initial"
                >
                    <Map className="h-[1.2rem] w-[1.2rem] flex-shrink-0" />
                    <span className="inline">
                        {getLocalizedText(
                            mapDialogTranslations.buttonLabel,
                            lang
                        )}
                    </span>
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
                        {!locationFeaturesEnabled &&
                            isGeolocationAvailable &&
                            !isUserOutsideHongKong && (
                                <span className="block mt-1 text-xs">
                                    {getLocalizedText(
                                        mapDialogTranslations.noGeolocation,
                                        lang
                                    )}
                                </span>
                            )}
                        {isUserOutsideHongKong && (
                            <span className="block mt-1 text-xs text-amber-600 dark:text-amber-500">
                                {getLocalizedText(
                                    mapDialogTranslations.outsideHongKong,
                                    lang
                                )}
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 w-full overflow-hidden px-6 pb-4">
                    <HospitalMap userCoords={userCoords} isOpen={open} />
                </div>
                <DialogFooter className="px-6 pb-6 flex-row justify-between sm:justify-between">
                    {showLocateButton ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLocateMe}
                            className="gap-2"
                        >
                            <LocateFixed className="h-4 w-4" />
                            {getLocalizedText(
                                mapDialogTranslations.locateMe,
                                lang
                            )}
                        </Button>
                    ) : (
                        <span />
                    )}
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
