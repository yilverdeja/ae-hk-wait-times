"use client"

import { Button } from "@/components/ui/button"
import { sendGAEvent } from "@next/third-parties/google"
import { Map } from "lucide-react"
import { useGeolocated } from "react-geolocated"

export function MapButton() {
    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        getPosition,
    } = useGeolocated({ suppressLocationOnMount: true })

    if (!isGeolocationAvailable) {
        return null
    }

    const handleClick = () => {
        if (!isGeolocationEnabled) return

        sendGAEvent("event", "map_button_clicked")
        if (
            !isGeolocationAvailable ||
            coords === undefined ||
            coords === null
        ) {
            getPosition()
        }
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleClick}
            className="cursor-pointer"
        >
            <Map className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
}
