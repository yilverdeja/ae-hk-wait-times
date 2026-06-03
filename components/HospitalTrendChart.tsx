"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
} from "@/components/ui/chart"
import { useHospitalPredictions } from "@/hooks/useHospitalPredictions"
import { useHospitalSnapshots } from "@/hooks/useHospitalSnapshots"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { DayOfWeek } from "@/types/trends"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useMemo, useRef, useState } from "react"
import {
    CartesianGrid,
    ComposedChart,
    Line,
    ReferenceDot,
    ReferenceLine,
    XAxis,
    YAxis,
    Area,
} from "recharts"
import { DayOfWeekSelector } from "./DayOfWeekSelector"

const DAY_ORDER: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const X_TICKS = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
]

function formatXTick(time: string): string {
    const hour = parseInt(time.split(":")[0], 10)
    const h12 = hour % 12 || 12
    return `${h12}${hour >= 12 ? "p" : "a"}`
}

const getChartConfig = (lang: LanguageCode) =>
    ({
        average: {
            label:
                lang === LanguageCode.EN
                    ? "Average Wait"
                    : lang === LanguageCode.ZH
                      ? "平均等候時間"
                      : "平均等候时间",
            theme: {
                light: "hsl(215 20% 65%)",
                dark: "hsl(215 20% 55%)",
            },
        },
        actual: {
            label:
                lang === LanguageCode.EN
                    ? "Actual Wait"
                    : lang === LanguageCode.ZH
                      ? "實際等候時間"
                      : "实际等候时间",
            theme: {
                light: "hsl(322.5 81.3% 56.5%)",
                dark: "hsl(314.3 89.5% 65.1%)",
            },
        },
        predicted: {
            label:
                lang === LanguageCode.EN
                    ? "Predicted Wait"
                    : lang === LanguageCode.ZH
                      ? "預測等候時間"
                      : "预测等候时间",
            theme: {
                light: "hsl(322.5 81.3% 56.5%)",
                dark: "hsl(314.3 89.5% 65.1%)",
            },
        },
    }) satisfies ChartConfig

const nowLabel: Record<LanguageCode, string> = {
    en: "NOW",
    zh: "現在",
    cn: "现在",
}

const loadingText: Record<LanguageCode, string> = {
    en: "Loading chart...",
    zh: "載入圖表中...",
    cn: "载入图表中...",
}

const errorText: Record<LanguageCode, string> = {
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
    const { getReadingsMap } = useHospitalSnapshots(hospitalSlug)
    const { getPredictions } = useHospitalPredictions()

    const chartConfig = getChartConfig(lang)

    const today = useMemo(
        () =>
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                timeZone: "Asia/Hong_Kong",
            }) as DayOfWeek,
        []
    )
    const tomorrow = useMemo(() => {
        const idx = DAY_ORDER.indexOf(today)
        return DAY_ORDER[(idx + 1) % 7]
    }, [today])

    const [selectedDay, setSelectedDay] = useState<DayOfWeek>(today)
    const previousDayRef = useRef<DayOfWeek>(today)
    const isInitialMount = useRef(true)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            previousDayRef.current = selectedDay
            return
        }
        if (previousDayRef.current !== selectedDay) {
            sendGAEvent("event", "trend_day_changed", {
                hospitalSlug,
                selectedDay,
                previousDay: previousDayRef.current,
            })
            previousDayRef.current = selectedDay
        }
    }, [selectedDay, hospitalSlug])

    const { chartData, currentTimeStr, isTodaySelected } = useMemo(() => {
        const empty = { chartData: [], currentTimeStr: "", isTodaySelected: false }
        if (!trendData) return empty
        const dataForSelectedDay = trendData.byHourOfDay[selectedDay]
        if (!dataForSelectedDay) return empty

        const now = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })
        )
        const currentHour = now.getHours()
        const currentSlotMinute = Math.floor(now.getMinutes() / 15) * 15
        const currentIndex = currentHour * 4 + Math.floor(now.getMinutes() / 15)
        const timeStr = `${currentHour.toString().padStart(2, "0")}:${currentSlotMinute.toString().padStart(2, "0")}`

        const isToday = selectedDay === today
        const isTomorrow = selectedDay === tomorrow

        type ChartPoint = {
            time: string
            average: number | null
            actual: number | null
            predicted: number | null
        }

        const points: ChartPoint[] = Array.from({ length: 96 }, (_, i) => {
            const h = Math.floor(i / 4)
            const m = (i % 4) * 15
            return {
                time: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
                average: dataForSelectedDay[h] ?? null,
                actual: null,
                predicted: null,
            }
        })

        if (isToday) {
            const readingsMap = getReadingsMap(hospitalSlug)
            for (const [key, value] of readingsMap) {
                const pt = points.find((p) => p.time === key)
                if (pt) pt.actual = value
            }
            // Current live wait at current slot
            points[currentIndex].actual = liveWaitTimeInMinutes
            // Anchor dashed prediction line at current point
            points[currentIndex].predicted = liveWaitTimeInMinutes

            const predictions = getPredictions(hospitalSlug)
            if (predictions) {
                const slots = [
                    { offset: 4, value: predictions.pred1h },
                    { offset: 8, value: predictions.pred2h },
                    { offset: 12, value: predictions.pred3h },
                ]
                for (const { offset, value } of slots) {
                    const idx = currentIndex + offset
                    if (idx < 96 && value != null) points[idx].predicted = value
                }
            }
        }

        if (isTomorrow) {
            const predictions = getPredictions(hospitalSlug)
            if (predictions) {
                const slots = [
                    { offset: 4, value: predictions.pred1h },
                    { offset: 8, value: predictions.pred2h },
                    { offset: 12, value: predictions.pred3h },
                ]
                for (const { offset, value } of slots) {
                    const absIdx = currentIndex + offset
                    if (absIdx >= 96 && value != null) {
                        const tomorrowIdx = absIdx - 96
                        if (tomorrowIdx < 96) points[tomorrowIdx].predicted = value
                    }
                }
            }
        }

        return { chartData: points, currentTimeStr: timeStr, isTodaySelected: isToday }
    }, [
        trendData,
        selectedDay,
        today,
        tomorrow,
        hospitalSlug,
        liveWaitTimeInMinutes,
        getReadingsMap,
        getPredictions,
    ])

    const yAxisDomain = useMemo((): [number, "auto"] => {
        if (!chartData.length) return [0, "auto"]
        const allValues = chartData
            .flatMap((d) => [d.average, d.actual, d.predicted])
            .filter((v): v is number => v != null)
        if (!allValues.length) return [0, "auto"]
        const min = Math.min(...allValues)
        if (min > 240) return [240, "auto"]
        if (min > 120) return [120, "auto"]
        if (min > 60) return [60, "auto"]
        return [0, "auto"]
    }, [chartData])

    if (isLoading) return <div className="h-[298px]">{loadingText[lang]}</div>
    if (isError) return <div className="h-[298px]">{errorText[lang]}</div>

    return (
        <div className="space-y-4">
            <DayOfWeekSelector
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
            />
            <ChartContainer config={chartConfig} className="w-full">
                <ComposedChart
                    data={chartData}
                    margin={{
                        top: 16,
                        right: 10,
                        left: lang === LanguageCode.EN ? 0 : 20,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="time"
                        type="category"
                        ticks={X_TICKS}
                        tickFormatter={formatXTick}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => {
                            const hours = Math.round(Number(value) / 60)
                            if (lang === LanguageCode.EN) return `${hours}h`
                            if (lang === LanguageCode.ZH) return `${hours}小時`
                            return `${hours}小时`
                        }}
                        domain={yAxisDomain}
                        width={30}
                    />
                    <ChartLegend
                        content={() => (
                            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-1 text-[0.75rem] text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <svg width="24" height="12" viewBox="0 0 24 12">
                                        <rect x="0" y="6" width="24" height="6" fill="var(--color-average)" opacity="0.3" />
                                        <line x1="0" y1="6" x2="24" y2="6" stroke="var(--color-average)" strokeWidth="2" />
                                    </svg>
                                    {chartConfig.average.label}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg width="24" height="12" viewBox="0 0 24 12">
                                        <line x1="0" y1="6" x2="24" y2="6" stroke="var(--color-actual)" strokeWidth="3" />
                                    </svg>
                                    {chartConfig.actual.label}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg width="24" height="12" viewBox="0 0 24 12">
                                        <line x1="0" y1="6" x2="24" y2="6" stroke="var(--color-predicted)" strokeWidth="3" strokeDasharray="6 4" />
                                    </svg>
                                    {chartConfig.predicted.label}
                                </div>
                            </div>
                        )}
                    />

                    <Area
                        dataKey="average"
                        type="basis"
                        stroke="var(--color-average)"
                        fill="var(--color-average)"
                        strokeWidth={2}
                        dot={false}
                        connectNulls
                        activeDot={false}
                    />
                    <Line
                        dataKey="actual"
                        type="basis"
                        stroke="var(--color-actual)"
                        strokeWidth={3}
                        dot={false}
                        connectNulls
                        activeDot={false}
                    />
                    <Line
                        dataKey="predicted"
                        type="basis"
                        stroke="var(--color-predicted)"
                        strokeWidth={3}
                        dot={false}
                        connectNulls
                        strokeDasharray="8 6"
                        activeDot={false}
                    />

                    {isTodaySelected && currentTimeStr && (
                        <ReferenceLine
                            x={currentTimeStr}
                            stroke="var(--color-actual)"
                            strokeDasharray="3 3"
                            label={{
                                value: nowLabel[lang],
                                position: "top",
                                fill: "var(--color-actual)",
                                fontSize: 11,
                                fontWeight: "bold",
                            }}
                        />
                    )}
                    {isTodaySelected && currentTimeStr && (
                        <ReferenceDot
                            x={currentTimeStr}
                            y={liveWaitTimeInMinutes}
                            r={5}
                            fill="var(--color-actual)"
                            stroke="white"
                            strokeWidth={2}
                        />
                    )}
                </ComposedChart>
            </ChartContainer>
        </div>
    )
}
