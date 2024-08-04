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

interface DayData {
  [key: string]: number;
}

interface HourData {
  Day: string;
  Now: number | undefined;
  WaitTime: number;
}

interface Props {
  data: Record<string, DayData>;
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

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = [
  { value: "1", text: "Mon" },
  { value: "2", text: "Tue" },
  { value: "3", text: "Wed" },
  { value: "4", text: "Thu" },
  { value: "5", text: "Fri" },
  { value: "6", text: "Sat" },
  { value: "0", text: "Sun" },
];

export default function HospitalWaitTimesCard({
  data,
  currentWaitTime,
  currentUpdateTime,
}: Props) {
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
                ? currentWaitTime - dayData[hour]
                : undefined,
            WaitTime: dayData[hour],
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
    <div>
      <header className="flex flex-row justify-start items-center gap-2">
        <h2>Wait Times</h2>
        <CircleHelp size={18} />
      </header>
      <Tabs defaultValue={day} className="w-[400px]" onValueChange={setDay}>
        <TabsList>
          {d.map(({ value, text }) => (
            <TabsTrigger key={value} value={value}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
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
          <Bar dataKey="WaitTime" fill="#2563eb" stackId="a" />
          <Bar dataKey="Now" fill="#2033a9" stackId="a" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      <div className="flex flex-row items-center gap-2">
        <InfoIcon size={20} />
        <p>Note:</p>
      </div>
    </div>
  );
}
