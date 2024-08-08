"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BREAKPOINTS } from "@/lib/utils";
import useBreakpoint from "use-breakpoint";

const dayOptions = [
  { value: "1", short: "Mon", long: "Monday" },
  { value: "2", short: "Tue", long: "Tuesday" },
  { value: "3", short: "Wed", long: "Wednesday" },
  { value: "4", short: "Thu", long: "Thursday" },
  { value: "5", short: "Fri", long: "Friday" },
  { value: "6", short: "Sat", long: "Saturday" },
  { value: "0", short: "Sun", long: "Sunday" },
];

interface Props {
  day: string;
  onChange: (newDay: string) => void;
}

export default function HospitalTrendSelector({ day, onChange }: Props) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  if (breakpoint === "mobile")
    return (
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
  return (
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
}
