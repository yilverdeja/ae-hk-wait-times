"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area" // Import the ScrollArea component
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { HospitalSheetInformation } from "@/components/HospitalSheet/HospitalSheetInformation"
import { HospitalTrendDisplay } from "@/components/HospitalTrendDisplay"

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
            {/* 
                We make the SheetContent a flex container that lays out its children in a column.
                This allows the header to be a fixed size and the ScrollArea to fill the rest of the space.
            */}
            <SheetContent className="w-[90%] sm:w-[540px] flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">
                        {hospital.name[lang]}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        Detailed information for {hospital.name[lang]}.
                    </SheetDescription>
                </SheetHeader>

                {/* 
                    The ScrollArea will take up the remaining vertical space (`flex-1`).
                    Any content that overflows inside this area will now be scrollable.
                */}
                <ScrollArea className="flex-1">
                    {/* We add padding and spacing to this inner div for better layout */}
                    <div className="px-6 py-4 space-y-4">
                        <HospitalTrendDisplay
                            hospitalSlug={hospital.slug}
                            // Pass the wait time directly in minutes, as the component now expects.
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
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
