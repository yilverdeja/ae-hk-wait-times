"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBreakpoint from "use-breakpoint";
import { useState } from "react";
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

interface Props {
  data: any;
  wait: number;
  updateTime: Date;
}

export default function HospitalChart({ data, wait, updateTime }: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [day, setDay] = useState<string>(new Date().getDay().toString());
  return (
    <>
      <div className="my-4">
        {breakpoint === "mobile" ? (
          <DaySelect day={day} onChange={setDay} />
        ) : (
          <DayTabs day={day} onChange={setDay} />
        )}
      </div>
      <p>Chart</p>
    </>
  );
}
