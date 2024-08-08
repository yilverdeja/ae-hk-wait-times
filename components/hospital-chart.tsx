"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBreakpoint from "use-breakpoint";
import { useEffect, useState } from "react";
import { DayNames, useHospitalTrend } from "../hooks/useHospitalTrend";
import { HospitalAcronyms } from "@/hooks/useHospitalWaitTimes";
const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const dayOptions = [
  { value: "1", short: "Mon", long: "Monday" },
  { value: "2", short: "Tue", long: "Tuesday" },
  { value: "3", short: "Wed", long: "Wednesday" },
  { value: "4", short: "Thu", long: "Thursday" },
  { value: "5", short: "Fri", long: "Friday" },
  { value: "6", short: "Sat", long: "Saturday" },
  { value: "0", short: "Sun", long: "Sunday" },
];

interface DaySelectorProps {
  day: string;
  onChange: (newDay: string) => void;
}

const DaySelect = ({ day, onChange }: DaySelectorProps) => (
  <Select defaultValue={day} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue defaultValue={day} placeholder="Day" />
    </SelectTrigger>
    <SelectContent>
      {dayOptions.map(({ value, long }) => (
        <SelectItem key={value} value={value}>
          {long}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const DayTabs = ({ day, onChange }: DaySelectorProps) => (
  <Tabs defaultValue={day} className="w-[400px]" onValueChange={onChange}>
    <TabsList>
      {dayOptions.map(({ value, short }) => (
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
);

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
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div>
      <div className="my-4">
        {breakpoint === "mobile" ? (
          <DaySelect day={day} onChange={setDay} />
        ) : (
          <DayTabs day={day} onChange={setDay} />
        )}
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
