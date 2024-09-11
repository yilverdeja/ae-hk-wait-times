"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/app/components/shadcn/chart";
import { useEffect, useState } from "react";
import { TrendMapping, useHospitalTrend } from "@/app/hooks/use-hospital-trend";
import HospitalTrendSelector from "@/app/components/hospital-trend-selector";
import { dayNames } from "@/app/lib/types";
import { sendGAEvent } from "@next/third-parties/google";

interface ChartInterface {
	day: string;
	wait: number;
}

const chartConfig: ChartConfig = {
	wait: {
		label: "Wait Time",
		color: "#2563eb",
	},
};

interface Props {
	hospitalId: number;
	slug: string;
	wait: number;
	updateTime: Date;
}

export default function HospitalChart({
	hospitalId,
	slug,
	wait,
	updateTime,
}: Props) {
	const [day, setDay] = useState<string>(new Date().getDay().toString());
	const [chartData, setChartData] = useState<ChartInterface[]>([]);
	const { data, isLoading, error } = useHospitalTrend(hospitalId);

	useEffect(() => {
		const currentDayName = dayNames[parseInt(day)];

		if (data && data.type === "week") {
			const trend = data.trend as TrendMapping["week"];
			if (trend[currentDayName]) {
				const buffer = 0.2;
				const formattedData = trend[currentDayName].map(
					(waitTime, hour) => ({
						day: hour.toString(),
						wait: waitTime,
						now:
							updateTime.getDay().toString() === day &&
							updateTime.getHours() === hour
								? wait + buffer
								: undefined,
					})
				);
				setChartData(formattedData);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, day]);

	if (isLoading)
		return (
			<div className="text-sm border-slate-200 dark:border-slate-600 border-2 p-2">
				Chart is loading...
			</div>
		);
	if (error)
		return (
			<div className="text-sm border-slate-200 dark:border-slate-600 border-2 p-2">
				The trend chart is currently unavailable
			</div>
		);

	return (
		<div>
			<div className="my-4">
				<HospitalTrendSelector
					day={day}
					onChange={(newDay) => {
						sendGAEvent("event", "select_chart_day", {
							setDay: dayNames[parseInt(newDay)],
							prevDay: dayNames[parseInt(day)],
							hospital_slug: slug,
						});
						setDay(newDay);
					}}
				/>
			</div>
			<ChartContainer
				config={chartConfig}
				className="min-h-[200px] w-full"
			>
				<BarChart width={730} height={250} data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="day"
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
						dataKey="day"
						type="number"
						domain={[-1, 24]}
						xAxisId={1}
						hide
					/>
					<YAxis
						dataKey="wait"
						type="number"
						domain={[0, 9]}
						ticks={[2, 4, 7, 9]}
						tickFormatter={(value) =>
							`>${parseInt(value, 10) - 1}hr`
						}
						width={30}
					/>
					<Bar
						dataKey="wait"
						fill="#2563eb"
						isAnimationActive={false}
						xAxisId={0}
						barSize={30}
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						dataKey="now"
						fill="#ff63eb"
						isAnimationActive={false}
						xAxisId={1}
						barSize={8}
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
