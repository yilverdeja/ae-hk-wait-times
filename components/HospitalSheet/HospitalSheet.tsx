"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { HospitalSheetInformation } from "./HospitalSheetInformation"

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
    // This handler connects the shadcn Sheet's internal state change
    // to our parent component's state management.
    // When the sheet is closed (via 'x' or overlay click), `onOpenChange` is called with `false`.
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    // We add a safety check. If for some reason the sheet is open but there's no hospital data,
    // we can render a loading/empty state. Because of our new logic, the data will persist
    // during the closing animation, so this check is mostly for the initial render.
    if (!hospital) {
        return null // Or a loading spinner if you prefer
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent className="w-[90%] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">
                        {hospital.name[lang]}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        Detailed information for {hospital.name[lang]}.
                    </SheetDescription>
                </SheetHeader>
                <div className="px-6">
                    <HospitalSheetInformation hospital={hospital} lang={lang} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
