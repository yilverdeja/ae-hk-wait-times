"use client"

import { HospitalSheetDescriptionBusyness } from "@/components/HospitalSheet/HospitalSheetDescriptionBusyness"
import { HospitalSheetInformation } from "@/components/HospitalSheet/HospitalSheetInformation"
import { HospitalTrendChart } from "@/components/HospitalTrendChart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useHospitalPredictions } from "@/hooks/useHospitalPredictions"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { PREDICTION_CAP_MINS, PREDICTION_SUPPRESS_MINS } from "@/lib/constants"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"

interface HospitalSheetProps {
    hospital: EnrichedHospitalData | null
    isOpen: boolean
    onClose: () => void
    lang: LanguageCode
}

export function HospitalSheet({
    hospital,
    isOpen,
    onClose,
    lang,
}: HospitalSheetProps) {
    const { isLoading, isError, compareWithLiveTime } = useHospitalTrends(
        hospital?.slug ?? null
    )
    const { getPredictions } = useHospitalPredictions()
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Track sheet closed event
            if (hospital) {
                sendGAEvent("event", "hospital_sheet_closed", {
                    hospitalSlug: hospital.slug,
                })
            }
            onClose()
        }
    }

    if (!hospital) {
        return null
    }

    // Get the live wait time, ensuring it's a number (default to 0)
    const liveWaitTime = hospital.waitTimes.semiUrgentNonUrgentP95Minutes ?? 0

    // Get the comparison data from the hook
    const comparison = compareWithLiveTime(liveWaitTime)

    const predictionDirection = (() => {
        if (liveWaitTime >= PREDICTION_SUPPRESS_MINS) return null
        const preds = getPredictions(hospital.slug)
        if (!preds || preds.pred1h == null) return null
        const effective = liveWaitTime >= PREDICTION_CAP_MINS
            ? Math.max(Math.max(0, preds.pred1h), liveWaitTime)
            : Math.max(0, preds.pred1h)
        const diff = effective - liveWaitTime
        if (Math.abs(diff) < 15) return "same" as const
        return diff > 0 ? "higher" as const : "lower" as const
    })()

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent className="w-[90%] sm:max-w-2xl flex flex-col p-0">
                <SheetHeader className="px-6 pt-6">
                    <SheetTitle className="text-2xl font-bold">
                        {hospital.name[lang]}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        <HospitalSheetDescriptionBusyness
                            isLoading={isLoading}
                            isError={isError}
                            liveWaitTimeInMinutes={liveWaitTime}
                            comparison={comparison}
                            predictionDirection={predictionDirection}
                        />
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-160px)]">
                    <div className="px-6 py-4 space-y-8">
                        <HospitalTrendChart
                            hospitalSlug={hospital.slug}
                            liveWaitTimeInMinutes={
                                hospital.waitTimes
                                    .semiUrgentNonUrgentP95Minutes ?? 0
                            }
                        />
                        <HospitalSheetInformation
                            hospital={hospital}
                            lang={lang}
                            showHospitalLink
                        />
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
