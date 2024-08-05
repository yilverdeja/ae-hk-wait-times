"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CircleHelp, InfoIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DayNames, HospitalData, WeekDayNames } from "@/data/hospitalAverages";

import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

import useBreakpoint from "use-breakpoint";
const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

interface HourData {
  Day: string;
  Now: number | undefined;
  WaitTime: number;
}

interface Props {
  data: HospitalData;
  currentWaitTime: number;
  currentUpdateTime: Date;
}

const chartConfig: ChartConfig = {
  WaitTime: {
    label: "Wait Time",
    color: "#2563eb",
  },
  Now: {
    label: "Now",
    color: "#2033a9",
  },
};

const dayNames: WeekDayNames[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = [
  { value: "1", short: "Mon", long: "Monday" },
  { value: "2", short: "Tue", long: "Tuesday" },
  { value: "3", short: "Wed", long: "Wednesday" },
  { value: "4", short: "Thu", long: "Thursday" },
  { value: "5", short: "Fri", long: "Friday" },
  { value: "6", short: "Sat", long: "Saturday" },
  { value: "0", short: "Sun", long: "Sunday" },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const val = Math.round(payload[0].value);
    return (
      <div className="custom-tooltip bg-white px-2 py-1.5 dark:bg-slate-950">
        <p className="label">
          {val === 1
            ? "Around 1 Hour"
            : val === 2
            ? "Over 1 Hour"
            : `Over ${val - 1} Hours`}
        </p>
      </div>
    );
  }
  return null;
};

export default function HospitalWaitTimesCard({
  data,
  currentWaitTime,
  currentUpdateTime,
}: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [day, setDay] = useState<string>(new Date().getDay().toString());
  const [chartData, setChartData] = useState<HourData[]>([]);
  const [allFormattedData, setAllFormattedData] = useState<HourData[][]>([]);

  const getAvgDayHourWaitTime = useCallback(() => {
    const now = new Date();
    const dayNow = dayNames[now.getDay()];
    const hourNow = now.getHours().toString() as DayNames;
    return data[dayNow][hourNow];
  }, [data]);

  const getBusyness = () => {
    const trendWaitTime = Math.round(getAvgDayHourWaitTime());
    if (currentWaitTime > trendWaitTime) return "More busy than usual";
    if (currentWaitTime < trendWaitTime) return "Less busy than usual";
    return "Usual wait time";
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const formattedData: HourData[][] = dayNames.map((dayName) => {
        const dayData = data[dayName] || {};
        return Object.keys(dayData).map(
          (hour): HourData => ({
            Day: hour,
            Now:
              new Date().getHours() === parseInt(hour) &&
              dayNames[currentUpdateTime.getDay()] === dayName
                ? currentWaitTime - dayData[hour as DayNames]
                : undefined,
            WaitTime: dayData[hour as DayNames],
          })
        );
      });
      setAllFormattedData(formattedData);
      setChartData(formattedData[new Date().getDay()]);
    }
  }, [data, currentWaitTime, currentUpdateTime]);

  useEffect(() => {
    const dayIndex = parseInt(day);
    if (
      allFormattedData.length > 0 &&
      dayIndex >= 0 &&
      dayIndex < allFormattedData.length
    ) {
      setChartData(allFormattedData[dayIndex]);
    }
  }, [day, allFormattedData]);

  return (
    <>
      <header className="flex flex-row justify-start items-center gap-2">
        <h2>Popular Wait Times</h2>
      </header>
      <div className="my-4">
        {breakpoint === "mobile" ? (
          <Select defaultValue={day} onValueChange={setDay}>
            <SelectTrigger>
              <SelectValue defaultValue={day} placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {d.map(({ value, long }) => (
                <SelectItem key={value} value={value}>
                  {long}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Tabs defaultValue={day} className="w-[400px]" onValueChange={setDay}>
            <TabsList>
              {d.map(({ value, short }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="text-xs px-[5px] sm:text-sm sm:px-3"
                >
                  {short}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Day"
            tickFormatter={(value) =>
              `${parseInt(value) % 12 || 12}${
                parseInt(value) >= 12 ? "p" : "a"
              }`
            }
            type="number"
            ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
            domain={[-1, 24]}
          />
          <YAxis
            dataKey="WaitTime"
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
            dataKey="WaitTime"
            fill="#2563eb"
            stackId="a"
            isAnimationActive={false}
          />
          <Bar
            dataKey="Now"
            fill="#2033a9"
            stackId="a"
            isAnimationActive={false}
          />
          <ChartTooltip
            content={<CustomTooltip />}
            cursor={{ strokeWidth: 2, fill: "#0000ff22" }}
          />
        </BarChart>
      </ChartContainer>
      {new Date().getDay().toString() === day && (
        <div className="flex flex-row my-2 gap-2 items-center">
          <InfoIcon size={20} />
          <p className="text-sm">{getBusyness()}</p>
        </div>
      )}
    </>
  );
}
