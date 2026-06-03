"use client"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { useHospitalPredictions } from "@/hooks/useHospitalPredictions"
import { useHospitalSnapshots } from "@/hooks/useHospitalSnapshots"
import { useHospitalTrends } from "@/hooks/useHospitalTrends"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { DayOfWeek } from "@/types/trends"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useMemo, useRef, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
                light: "hsl(221.2 83.2% 53.3%)",
                dark: "hsl(217.2 91.2% 59.8%)",
            },
        },
        // historicalWait is excluded from the legend via legendType="none" on the Bar
        historicalWait: {
            label: "",
            theme: {
                light: "hsl(322.5 81.3% 35%)",
                dark: "hsl(314.3 89.5% 40%)",
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
                light: "hsl(322.5 81.3% 56.5%)",
                dark: "hsl(314.3 89.5% 65.1%)",
            },
        },
        predWait: {
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

function OutlineBar(props: {
    x?: number
    y?: number
    width?: number
    height?: number
    fill?: string
}) {
    const { x = 0, y = 0, width = 0, height = 0, fill } = props
    if (!height || height <= 0) return null
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="transparent"
            stroke={fill}
            strokeWidth={2}
            rx={4}
            ry={4}
        />
    )
}

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
    const { getHourlyWait } = useHospitalSnapshots(hospitalSlug)
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

        const now = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })
        )
        const currentHour = now.getHours()
        const isTodaySelected = selectedDay === today
        const isTomorrowSelected = selectedDay === tomorrow

        const predictions = getPredictions(hospitalSlug)

        return Array.from({ length: 24 }).map((_, hour) => {
            const dataPoint: {
                hour: string
                averageWait: number | null
                historicalWait?: number | null
                liveWait?: number
                predWait?: number | null
            } = {
                hour: `${hour}`,
                averageWait: dataForSelectedDay[hour] ?? null,
            }

            if (isTodaySelected) {
                if (hour < currentHour) {
                    dataPoint.historicalWait = getHourlyWait(hospitalSlug, hour)
                } else if (hour === currentHour) {
                    dataPoint.liveWait = liveWaitTimeInMinutes
                } else {
                    const offset = hour - currentHour
                    if (offset === 1) dataPoint.predWait = predictions?.pred1h ?? null
                    else if (offset === 2) dataPoint.predWait = predictions?.pred2h ?? null
                    else if (offset === 3) dataPoint.predWait = predictions?.pred3h ?? null
                }
            }

            if (isTomorrowSelected && predictions) {
                // Show predictions that crossed midnight into tomorrow
                for (const offset of [1, 2, 3] as const) {
                    const targetHour = currentHour + offset
                    if (targetHour >= 24 && targetHour - 24 === hour) {
                        const predValue =
                            offset === 1
                                ? predictions.pred1h
                                : offset === 2
                                  ? predictions.pred2h
                                  : predictions.pred3h
                        dataPoint.predWait = predValue ?? null
                    }
                }
            }

            return dataPoint
        })
    }, [
        trendData,
        selectedDay,
        liveWaitTimeInMinutes,
        today,
        tomorrow,
        hospitalSlug,
        getHourlyWait,
        getPredictions,
    ])

    const yAxisDomain = useMemo((): [number, "auto"] => {
        if (!chartData || chartData.length === 0) {
            return [0, "auto"]
        }

        const allWaitTimes = chartData
            .flatMap((d) => [
                d.averageWait,
                d.historicalWait,
                d.liveWait,
                d.predWait,
            ])
            .filter((v): v is number => v !== null && v !== undefined)

        if (allWaitTimes.length === 0) {
            return [0, "auto"]
        }

        const minWait = Math.min(...allWaitTimes)

        if (minWait > 240) return [240, "auto"]
        if (minWait > 120) return [120, "auto"]
        if (minWait > 60) return [60, "auto"]

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
                    <XAxis
                        dataKey="hour"
                        type="number"
                        domain={[-1, 24]}
                        xAxisId={2}
                        hide
                    />
                    <XAxis
                        dataKey="hour"
                        type="number"
                        domain={[-1, 24]}
                        xAxisId={3}
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
                        dataKey="historicalWait"
                        fill="var(--color-historicalWait)"
                        xAxisId={1}
                        barSize={8}
                        radius={[4, 4, 0, 0]}
                        legendType="none"
                    />
                    <Bar
                        dataKey="liveWait"
                        fill="var(--color-liveWait)"
                        xAxisId={2}
                        barSize={8}
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="predWait"
                        fill="var(--color-predWait)"
                        xAxisId={3}
                        barSize={8}
                        shape={<OutlineBar />}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
