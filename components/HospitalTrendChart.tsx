"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { DayOfWeek } from "@/types/trends"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useMemo, useRef, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { DayOfWeekSelector } from "./DayOfWeekSelector"

// Chart configuration with labels for the legend and light/dark mode colors.
const getChartConfig = (lang: LanguageCode) =>
    ({
        averageWait: {
            label:
                lang === LanguageCode.EN
                    ? "Average Wait"
                    : lang === LanguageCode.ZH
                      ? "平均等候時間"
                      : "平均等候时间",
            theme: {
                light: "hsl(221.2 83.2% 53.3%)", // blue-600
                dark: "hsl(217.2 91.2% 59.8%)", // blue-500
            },
        },
        liveWait: {
            label:
                lang === LanguageCode.EN
                    ? "Current Wait"
                    : lang === LanguageCode.ZH
                      ? "目前等候時間"
                      : "目前等候时间",
            theme: {
                light: "hsl(322.5 81.3% 56.5%)", // pink-600
                dark: "hsl(314.3 89.5% 65.1%)", // pink-500
            },
        },
    }) satisfies ChartConfig

const loadingText = {
    en: "Loading chart...",
    zh: "載入圖表中...",
    cn: "载入图表中...",
}

const errorText = {
    en: "Error loading chart data.",
    zh: "載入圖表數據時發生錯誤。",
    cn: "载入图表数据时发生错误。",
}

interface HospitalTrendChartProps {
    hospitalSlug: string
    liveWaitTimeInMinutes: number
}

export function HospitalTrendChart({
    hospitalSlug,
    liveWaitTimeInMinutes,
}: HospitalTrendChartProps) {
    const { lang } = useLanguage()
    const {
        data: trendData,
        isLoading,
        isError,
    } = useHospitalTrends(hospitalSlug)
    const chartConfig = getChartConfig(lang)
    const today = useMemo(
        () =>
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
            }) as DayOfWeek,
        []
    )
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>(today)
    const previousDayRef = useRef<DayOfWeek>(today)
    const isInitialMount = useRef(true)

    // Track day change events (skip initial mount)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            previousDayRef.current = selectedDay
            return
        }

        if (previousDayRef.current !== selectedDay) {
            sendGAEvent("event", "trend_day_changed", {
                hospitalSlug: hospitalSlug,
                selectedDay: selectedDay,
                previousDay: previousDayRef.current,
            })
            previousDayRef.current = selectedDay
        }
    }, [selectedDay, hospitalSlug])

    const chartData = useMemo(() => {
        if (!trendData) return []
        const dataForSelectedDay = trendData.byHourOfDay[selectedDay]
        if (!dataForSelectedDay) return []

        const now = new Date()
        const currentHour = now.getHours()
        const isTodaySelected = selectedDay === today

        return Array.from({ length: 24 }).map((_, hour) => {
            const dataPoint: {
                hour: string
                averageWait: number | null
                liveWait?: number
            } = {
                hour: `${hour}`,
                averageWait: dataForSelectedDay[hour] ?? null, // Use null for missing data
            }

            if (isTodaySelected && hour === currentHour) {
                // The liveWait bar will render on top of the averageWait bar
                dataPoint.liveWait = liveWaitTimeInMinutes
            }

            return dataPoint
        })
    }, [trendData, selectedDay, liveWaitTimeInMinutes, today])

    // --- NEW: Memoized calculation for the dynamic Y-axis domain ---
    const yAxisDomain = useMemo((): [number, "auto"] => {
        if (!chartData || chartData.length === 0) {
            return [0, "auto"]
        }

        const allWaitTimes = chartData
            .flatMap((d) => [d.averageWait, d.liveWait])
            .filter((v): v is number => v !== null && v !== undefined)

        if (allWaitTimes.length === 0) {
            return [0, "auto"]
        }

        const minWait = Math.min(...allWaitTimes)

        // Determine the floor of the Y-axis based on the minimum wait time.
        if (minWait > 240) return [240, "auto"] // 4 hours
        if (minWait > 120) return [120, "auto"] // 2 hours
        if (minWait > 60) return [60, "auto"] // 1 hour

        return [0, "auto"]
    }, [chartData])

    if (isLoading) {
        return <div className="h-[298px]">{loadingText[lang]}</div>
    }

    if (isError) {
        return <div className="h-[298px]">{errorText[lang]}</div>
    }

    return (
        <div className="space-y-4">
            <DayOfWeekSelector
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
            />
            <ChartContainer config={chartConfig} className="w-full">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 10,
                        left: lang === LanguageCode.EN ? 0 : 20,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="hour"
                        tickFormatter={(value) =>
                            `${parseInt(value, 10) % 12 || 12}${
                                parseInt(value, 10) >= 12 ? "p" : "a"
                            }`
                        }
                        type="number"
                        ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                        domain={[-1, 24]}
                        xAxisId={0}
                    />
                    <XAxis
                        dataKey="hour"
                        type="number"
                        domain={[-1, 24]}
                        xAxisId={1}
                        hide
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => {
                            const hours = Math.round(Number(value) / 60)
                            if (lang === LanguageCode.EN) {
                                return `${hours}h`
                            } else if (lang === LanguageCode.ZH) {
                                return `${hours}小時`
                            } else {
                                return `${hours}小时`
                            }
                        }}
                        domain={yAxisDomain}
                        width={30}
                    />
                    <ChartLegend content={<ChartLegendContent />} />

                    <Bar
                        dataKey="averageWait"
                        fill="var(--color-averageWait)"
                        xAxisId={0}
                        barSize={30}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="liveWait"
                        fill="var(--color-liveWait)"
                        xAxisId={1}
                        barSize={8}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
