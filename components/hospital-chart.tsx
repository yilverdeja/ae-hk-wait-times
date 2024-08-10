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
          now:
            updateTime.getDay().toString() === day &&
            updateTime.getHours().toString() === hour
              ? wait
              : undefined,
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
            ticks={[1, 3, 6, 8]}
            tickFormatter={(value) => `>${parseInt(value, 10)}hr`}
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
