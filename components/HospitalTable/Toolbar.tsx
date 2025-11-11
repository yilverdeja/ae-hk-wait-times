"use client"

import { Table } from "@tanstack/react-table"
import {
    AlertTriangle,
    Siren,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode, Region } from "@/types"
import { regionNames } from "@/data/regions"
import { sendGAEvent } from "@next/third-parties/google"
import { BREAKPOINTS } from "@/lib/constants"
import { useBreakpoint } from "use-breakpoint"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

const regionOptions = Object.values(Region)

const legendCopy = {
    [LanguageCode.EN]: {
        managing: "Managing Case",
        managingMultiple: "Multiple Cases",
        region: "Filter by region...",
        resuscitation: "Hide hospitals managing critical cases",
        allRegions: "All Regions",
        trendHigher: "Busier than usual",
        trendLower: "Less busy than usual",
        trendSame: "About average",
        legend: "Legend",
    },
    [LanguageCode.ZH]: {
        managing: "處理中",
        managingMultiple: "多宗處理中",
        region: "按地區篩選...",
        resuscitation: "隱藏正在處理危殆個案的醫院",
        allRegions: "所有地區",
        trendHigher: "較平時繁忙",
        trendLower: "較平時清閒",
        trendSame: "接近平均",
        legend: "圖例",
    },
    [LanguageCode.CN]: {
        managing: "处理中",
        managingMultiple: "多宗处理中",
        region: "按地区筛选...",
        resuscitation: "隐藏正在处理危殆个案的医院",
        allRegions: "所有地区",
        trendHigher: "较平时繁忙",
        trendLower: "较平时清闲",
        trendSame: "接近平均",
        legend: "图例",
    },
}

// Legend content component to be reused in both expanded and dialog views
function LegendContent({
    copy,
    isDialog = false,
}: {
    copy: (typeof legendCopy)[LanguageCode]
    isDialog?: boolean
}) {
    return (
        <>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>{copy.managing}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Siren className="h-4 w-4 text-red-600" />
                    <span>{copy.managingMultiple}</span>
                </div>
            </div>
            <div
                className={cn(
                    "flex flex-wrap items-center gap-2",
                    isDialog
                        ? "border-t pt-4"
                        : "border-t pt-2 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0"
                )}
            >
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <span>{copy.trendHigher}</span>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span>{copy.trendLower}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Minus className="h-4 w-4 text-muted-foreground" />
                    <span>{copy.trendSame}</span>
                </div>
            </div>
        </>
    )
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const { lang } = useLanguage()
    const copy = legendCopy[lang]
    const { breakpoint } = useBreakpoint(BREAKPOINTS)
    const isDesktop = breakpoint === "desktop"

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filter Controls */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Select
                    value={
                        (table
                            .getColumn("region")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onValueChange={(value) => {
                        const regionValue = value === "all" ? "all" : value
                        sendGAEvent("event", "region_filter_applied", {
                            region: regionValue,
                        })
                        table
                            .getColumn("region")
                            ?.setFilterValue(value === "all" ? "" : value)
                    }}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder={copy.region} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{copy.allRegions}</SelectItem>
                        {regionOptions.map((region) => (
                            <SelectItem key={region} value={region}>
                                {regionNames[region][lang]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                    <Switch
                        id="resuscitation-filter"
                        checked={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as boolean) ?? false
                        }
                        onCheckedChange={(value) => {
                            sendGAEvent(
                                "event",
                                "critical_cases_filter_toggled",
                                {
                                    isEnabled: value,
                                }
                            )
                            table.getColumn("name")?.setFilterValue(value)
                        }}
                    />
                    <Label htmlFor="resuscitation-filter">
                        {copy.resuscitation}
                    </Label>
                </div>
            </div>

            {/* Legend - Desktop: Expanded, Mobile/Tablet: Dialog Button */}
            {isDesktop ? (
                <div className="flex flex-col gap-2 rounded-md border bg-muted p-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                    <LegendContent copy={copy} isDialog={false} />
                </div>
            ) : (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            {copy.legend}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{copy.legend}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4 text-sm text-muted-foreground">
                            <LegendContent copy={copy} isDialog={true} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
