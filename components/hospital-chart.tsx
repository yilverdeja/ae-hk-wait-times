"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useHospitalTrend } from "../hooks/useHospitalTrend";
import { HospitalAcronyms } from "@/hooks/useHospitalWaitTimes";
import HospitalTrendSelector from "./hospital-trend-selector";

type WeekDayNames =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const dayNames: WeekDayNames[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  slug: HospitalAcronyms;
  wait: number;
  updateTime: Date;
}

export default function HospitalChart({ slug, wait, updateTime }: Props) {
  const [day, setDay] = useState<string>(new Date().getDay().toString());
  const [chartData, setChartData] = useState<ChartInterface[]>([]);
  const { data: trend, isLoading, error } = useHospitalTrend(slug);

  useEffect(() => {
    const currentDayName = dayNames[parseInt(day)];

    if (trend && trend[currentDayName]) {
      const formattedData = Object.entries(trend[currentDayName]).map(
        ([hour, waitTime]) => ({
          day: hour,
          wait: waitTime,
        })
      );
      setChartData(formattedData);
    }
  }, [trend, day]);

  return (
    <div>
      <div className="my-4">
        <HospitalTrendSelector day={day} onChange={setDay} />
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
          />
          <YAxis
            dataKey="wait"
            type="number"
            hide
            domain={([dataMin, dataMax]) => {
              return [
                Math.max(Math.floor(dataMin) - 0.5, 0),
                Math.min(Math.ceil(dataMax), 9),
              ];
            }}
          />
          <Bar
            dataKey="wait"
            fill="#2563eb"
            stackId="a"
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
