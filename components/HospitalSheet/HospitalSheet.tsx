"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { HospitalSheetInformation } from "@/components/HospitalSheet/HospitalSheetInformation"
import { HospitalTrendChart } from "@/components/HospitalTrendChart"

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
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    if (!hospital) {
        return null
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent className="w-[90%] sm:max-w-2xl flex flex-col p-0">
                <SheetHeader className="px-6 pt-6">
                    <SheetTitle className="text-2xl font-bold">
                        {hospital.name[lang]}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        Detailed information for {hospital.name[lang]}.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-160px)]">
                    <div className="px-6 py-4 space-y-8">
                        <HospitalTrendChart
                            hospitalSlug={hospital.slug}
                            liveWaitTimeInMinutes={
                                hospital.waitTimes
                                    .semiUrgentNonUrgentP50Minutes ?? 0
                            }
                        />
                        <HospitalSheetInformation
                            hospital={hospital}
                            lang={lang}
                        />
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
