/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    AlertTriangle,
    ArrowUpDown,
    Siren,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react"
import { EnrichedHospitalData, LanguageCode, ManagementStatus } from "@/types"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { regionNames } from "@/data/regions"
import { sendGAEvent } from "@next/third-parties/google"
import { WaitTimeTrendIcon } from "@/components/HospitalTable/WaitTimeTrendIcon"

// Helper to format minutes into a readable string (e.g., 75 -> "1 hr 15 min")
const formatMinutes = (minutes: number | null, lang: LanguageCode): string => {
    if (minutes === null || minutes < 0) {
        return lang === LanguageCode.EN
            ? "N/A"
            : lang === LanguageCode.ZH
              ? "不適用"
              : "不适用"
    }
    if (minutes === 0) {
        return lang === LanguageCode.EN
            ? "No Wait Time"
            : lang === LanguageCode.ZH
              ? "無等候時間"
              : "无等候时间"
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const hrText =
        lang === LanguageCode.EN
            ? "hr"
            : lang === LanguageCode.ZH
              ? "小時"
              : "小时"
    const minText =
        lang === LanguageCode.EN
            ? "min"
            : lang === LanguageCode.ZH
              ? "分鐘"
              : "分钟"

    let result = ""
    if (hours > 0) {
        result += `${hours} ${hrText} `
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} ${minText}`
    }

    return result.trim()
}

// Localized display names for ManagementStatus
const managementStatusCopy: Record<
    ManagementStatus,
    Record<LanguageCode, string>
> = {
    [ManagementStatus.Managing]: {
        [LanguageCode.EN]: "Managing at least one critical case",
        [LanguageCode.ZH]: "正在處理至少一宗危殆個案",
        [LanguageCode.CN]: "正在处理至少一宗危殆个案",
    },
    [ManagementStatus.ManagingMultiple]: {
        [LanguageCode.EN]: "Managing multiple critical cases",
        [LanguageCode.ZH]: "正在處理多宗危殆個案",
        [LanguageCode.CN]: "正在处理多宗危殆个案",
    },
    [ManagementStatus.NotManaging]: {
        [LanguageCode.EN]: "No critical cases being managed",
        [LanguageCode.ZH]: "沒有處理危殆個案",
        [LanguageCode.CN]: "没有处理危殆个案",
    },
}

export const getColumns = (
    lang: LanguageCode,
    breakpoint: string,
    lastUpdated?: string
): ColumnDef<EnrichedHospitalData>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            const headerText = { en: "Hospital", zh: "醫院", cn: "医院" }[lang]
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const newSortDirection =
                            column.getIsSorted() === "asc" ? "desc" : "asc"
                        sendGAEvent("event", "table_column_sorted", {
                            columnName: "name",
                            sortDirection: newSortDirection,
                        })
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }}
                >
                    {headerText}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            // REMOVED: 'table' prop is no longer needed
            const hospital = row.original
            const hospitalName = hospital.name[lang]
            const { criticalManagementStatus, emergencyManagementStatus } =
                hospital

            const isManagingMultiple =
                criticalManagementStatus ===
                    ManagementStatus.ManagingMultiple ||
                emergencyManagementStatus === ManagementStatus.ManagingMultiple
            const isManaging =
                criticalManagementStatus === ManagementStatus.Managing ||
                emergencyManagementStatus === ManagementStatus.Managing

            let icon = null
            if (isManagingMultiple) {
                icon = (
                    <Tooltip>
                        <TooltipTrigger>
                            <Siren className="h-5 w-5 text-red-600 animate-pulse" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {
                                    managementStatusCopy[
                                        ManagementStatus.ManagingMultiple
                                    ][lang]
                                }
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
            } else if (isManaging) {
                icon = (
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {
                                    managementStatusCopy[
                                        ManagementStatus.Managing
                                    ][lang]
                                }
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
            }

            return (
                <TooltipProvider delayDuration={100}>
                    <div className="flex items-center gap-3 flex-wrap">
                        {icon}
                        <span className="font-medium break-words">
                            {hospitalName}
                        </span>
                    </div>
                </TooltipProvider>
            )
        },
        sortingFn: (rowA, rowB, columnId) => {
            const lang =
                (document.documentElement.lang as LanguageCode) ||
                LanguageCode.EN
            const nameA = rowA.original.name[lang]
            const nameB = rowB.original.name[lang]
            return nameA.localeCompare(nameB)
        },
        filterFn: (row, id, value: boolean) => {
            const { criticalManagementStatus, emergencyManagementStatus } =
                row.original
            if (!value) return true
            return (
                criticalManagementStatus === ManagementStatus.NotManaging &&
                emergencyManagementStatus === ManagementStatus.NotManaging
            )
        },
    },
    {
        accessorKey: "region",
        header: ({ column }) => {
            const headerText = { en: "Region", zh: "地區", cn: "地区" }[lang]
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        const newSortDirection =
                            column.getIsSorted() === "asc" ? "desc" : "asc"
                        sendGAEvent("event", "table_column_sorted", {
                            columnName: "region",
                            sortDirection: newSortDirection,
                        })
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }}
                >
                    {headerText}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            // REMOVED: 'table' prop
            const region = regionNames[row.original.region]
            // REMOVED: onClick handler from the div
            return <div>{region[lang]}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        sortingFn: (rowA, rowB, columnId) => {
            const lang =
                (document.documentElement.lang as LanguageCode) ||
                LanguageCode.EN
            const regionA = regionNames[rowA.original.region][lang]
            const regionB = regionNames[rowB.original.region][lang]
            return regionA.localeCompare(regionB)
        },
    },
    {
        accessorKey: "waitTimes",
        header: ({ column }) => {
            const longHeaderText = {
                en: "Wait Time (Semi-Urgent)",
                zh: "等候時間 (半緊急)",
                cn: "等候时间 (半紧急)",
            }[lang]
            const shortHeaderText = {
                en: "Wait Time",
                zh: "等候時間",
                cn: "等候时间",
            }[lang]
            const headerText =
                breakpoint === "mobile" ? shortHeaderText : longHeaderText
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            const newSortDirection =
                                column.getIsSorted() === "asc" ? "desc" : "asc"
                            sendGAEvent("event", "table_column_sorted", {
                                columnName: "waitTimes",
                                sortDirection: newSortDirection,
                            })
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }}
                    >
                        {headerText}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const waitTime =
                row.original.waitTimes.semiUrgentNonUrgentP50Minutes
            const hospitalSlug = row.original.slug

            return (
                <div className="text-right font-semibold flex items-center justify-end">
                    <span>{formatMinutes(waitTime, lang)}</span>
                    {lastUpdated && (
                        <WaitTimeTrendIcon
                            hospitalSlug={hospitalSlug}
                            liveWaitTime={waitTime}
                            lastUpdated={lastUpdated}
                        />
                    )}
                </div>
            )
        },
        sortingFn: (rowA, rowB) => {
            const timeA =
                rowA.original.waitTimes.semiUrgentNonUrgentP50Minutes ??
                Infinity
            const timeB =
                rowB.original.waitTimes.semiUrgentNonUrgentP50Minutes ??
                Infinity
            return timeA < timeB ? -1 : timeA > timeB ? 1 : 0
        },
    },
]
