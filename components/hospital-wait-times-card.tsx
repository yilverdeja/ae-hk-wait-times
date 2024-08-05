"use client";

import React, { useEffect, useState } from "react";
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

export default function HospitalWaitTimesCard({
  data,
  currentWaitTime,
  currentUpdateTime,
}: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [day, setDay] = useState<string>(new Date().getDay().toString());
  const [chartData, setChartData] = useState<HourData[]>([]);
  const [allFormattedData, setAllFormattedData] = useState<HourData[][]>([]);

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
        <h2>Wait Times</h2>
        <CircleHelp size={18} />
      </header>
      {breakpoint === "mobile" ? (
        <Select defaultValue={day} onValueChange={setDay}>
          <SelectTrigger className="w-[180px]">
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

      <div className="flex flex-row my-2">
        <p>
          Updated at <span>{moment(currentUpdateTime).format("h:mma")}</span> -
          Busier than usual
        </p>
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
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      <div className="flex flex-row items-center gap-2">
        <InfoIcon size={20} />
        <p>Note:</p>
      </div>
    </>
  );
}
