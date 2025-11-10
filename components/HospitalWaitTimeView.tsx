"use client"

import { useMemo, useState } from "react"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { getColumns } from "@/components/HospitalTable/Columns"
import { DataTable } from "@/components/HospitalTable/DataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import dayjs from "@/lib/dayjs"
import { useLanguage } from "@/hooks/useLanguage"
import { BREAKPOINTS } from "@/lib/constants"
import { useBreakpoint } from "use-breakpoint"
import { EnrichedHospitalData } from "@/types"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

function HospitalWaitTimeView() {
    const { data, isLoading, isError, error } = useHospitalWaitTimes()
    const { lang } = useLanguage()
    const { breakpoint } = useBreakpoint(BREAKPOINTS)

    // 1. State for the selected hospital
    const [selectedHospital, setSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)

    const columns = useMemo(
        () => getColumns(lang, breakpoint || "desktop"),
        [lang, breakpoint]
    )

    // 2. Handler to set the selected hospital when a row is clicked
    const handleRowSelect = (hospital: EnrichedHospitalData) => {
        console.log("Row selected, opening sheet for:", hospital.slug)
        setSelectedHospital(hospital)
    }

    // 3. Handler for when the sheet is closed (by 'x' button or overlay click)
    const handleSheetOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            console.log("Sheet closed, deselecting hospital.")
            setSelectedHospital(null)
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container mx-auto">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error?.message ||
                            "Failed to load hospital wait times."}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    Last Updated:{" "}
                    {data
                        ? dayjs(data.lastUpdated).format("MMM Do YYYY, h:mm A")
                        : ""}
                </p>
            </div>
            {/* 4. Pass the handler down to the DataTable */}
            <DataTable
                columns={columns}
                data={data?.waitTimes || []}
                onRowSelect={handleRowSelect}
            />

            {/* 5. Render the Sheet component, controlled by our state */}
            <Sheet
                open={!!selectedHospital}
                onOpenChange={handleSheetOpenChange}
            >
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {selectedHospital
                                ? selectedHospital.name[lang]
                                : "Hospital Details"}
                        </SheetTitle>
                        <SheetDescription>
                            Detailed information for the selected hospital will
                            be shown here.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                        {/* You can build a detailed view component here */}
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {JSON.stringify(selectedHospital, null, 2)}
                            </code>
                        </pre>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default HospitalWaitTimeView
