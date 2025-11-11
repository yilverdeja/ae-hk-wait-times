"use client"

import { useMemo, useState, useEffect } from "react"
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes"
import { getColumns } from "@/components/HospitalTable/Columns"
import { DataTable } from "@/components/HospitalTable/DataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import dayjs, { zhCN, zhHK } from "@/lib/dayjs"
import { useLanguage } from "@/hooks/useLanguage"
import { BREAKPOINTS } from "@/lib/constants"
import { useBreakpoint } from "use-breakpoint"
import { EnrichedHospitalData, LanguageCode } from "@/types"
import { HospitalSheet } from "@/components/HospitalSheet/HospitalSheet" // 1. Import the new component
import { sendGAEvent } from "@next/third-parties/google"

const errorTexts = {
    [LanguageCode.EN]: {
        title: "Error",
        message: "Failed to load hospital wait times.",
    },
    [LanguageCode.ZH]: {
        title: "錯誤",
        message: "載入醫院等候時間失敗。",
    },
    [LanguageCode.CN]: {
        title: "错误",
        message: "载入医院等候时间失败。",
    },
}

const lastUpdatedText = {
    [LanguageCode.EN]: "Last Updated:",
    [LanguageCode.ZH]: "最後更新：",
    [LanguageCode.CN]: "最后更新：",
}

function HospitalWaitTimeView() {
    const { data, isLoading, isError, error } = useHospitalWaitTimes()
    const { lang } = useLanguage()
    const { breakpoint } = useBreakpoint(BREAKPOINTS)

    // 2. We now have two pieces of state to manage the sheet
    const [selectedHospital, setSelectedHospital] =
        useState<EnrichedHospitalData | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    // Track sheet opened event
    useEffect(() => {
        if (isSheetOpen && selectedHospital) {
            sendGAEvent("event", "hospital_sheet_opened", {
                hospitalSlug: selectedHospital.slug,
                hospitalName: selectedHospital.name[lang],
                region: selectedHospital.region,
                waitTime:
                    selectedHospital.waitTimes.semiUrgentNonUrgentP50Minutes ??
                    null,
            })
        }
    }, [isSheetOpen, selectedHospital, lang])

    const columns = useMemo(
        () => getColumns(lang, breakpoint || "desktop", data?.lastUpdated),
        [lang, breakpoint, data?.lastUpdated]
    )

    // 3. Update the row select handler
    const handleRowSelect = (hospital: EnrichedHospitalData) => {
        console.log(
            "Row selected, setting data and opening sheet for:",
            hospital.slug
        )
        // Track sheet opened event (note: row click is tracked in DataTable)
        // We track sheet opened separately here to capture the actual sheet opening
        setSelectedHospital(hospital) // Set the data for the sheet
        setIsSheetOpen(true) // Open the sheet
    }

    // 4. Create a handler specifically for closing the sheet
    const handleSheetClose = () => {
        console.log(
            "Sheet close requested. Hiding sheet, but keeping data for animation."
        )
        setIsSheetOpen(false)
        // CRUCIALLY, we DO NOT set selectedHospital to null here.
    }

    if (isLoading) {
        return (
            <>
                <Skeleton className="h-8 w-1/4" />
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </>
        )
    }

    if (isError) {
        const errorCopy = errorTexts[lang]
        return (
            <>
                <Alert variant="destructive" className="mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{errorCopy.title}</AlertTitle>
                    <AlertDescription>
                        {error?.message || errorCopy.message}
                    </AlertDescription>
                </Alert>
            </>
        )
    }

    // Set dayjs locale based on language
    const formatDate = (dateString: string) => {
        let formattedDate = dayjs(dateString)
        if (lang === LanguageCode.ZH) {
            formattedDate = formattedDate.locale(zhHK)
            return formattedDate.format("YYYY年M月D日, h:mm A")
        } else if (lang === LanguageCode.CN) {
            formattedDate = formattedDate.locale(zhCN)
            return formattedDate.format("YYYY年M月D日, h:mm A")
        } else {
            return formattedDate.format("MMM Do YYYY, h:mm A")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center sm:justify-start">
                <p className="text-sm text-muted-foreground">
                    {lastUpdatedText[lang]}{" "}
                    {data ? formatDate(data.lastUpdated) : ""}
                </p>
            </div>
            <DataTable
                columns={columns}
                data={data?.waitTimes || []}
                onRowSelect={handleRowSelect}
            />

            {/* 5. Render the new controlled HospitalSheet component */}
            <HospitalSheet
                hospital={selectedHospital}
                isOpen={isSheetOpen}
                onClose={handleSheetClose}
                lang={lang}
            />
        </>
    )
}

export default HospitalWaitTimeView
