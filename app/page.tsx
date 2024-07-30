"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WaitTime {
  hospName: string;
  topWait: string;
}

interface Data {
  waitTime: WaitTime[];
  updateTime: string;
}

export default function Home() {
  const today = new Date();
  const { theme, setTheme } = useTheme();
  const [data, setData] = useState<null | Data>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState(
    today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // minutes / 15 -> floor

  const getData = async () => {
    const url = "https://www.ha.org.hk/opendata/aed/aedwtdata-en.json";

    const formatted_dt =
      date
        ?.toLocaleDateString("zh-Hans-CN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("") +
      "-" +
      time.split(":").join("");

    const endpoint = `https://api.data.gov.hk/v1/historical-archive/get-file?url=${url}&time=${formatted_dt}`;
    await axios
      .get(endpoint)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    // setDate("2024-07-24");
    setTheme("light");
    setDate(new Date("2024-07-24"));
    setTime("00:30");
  }, []);

  useEffect(() => {
    getData();
  }, [date, time]);

  console.log(data);
  return (
    <>
      <main className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <header className="">
          <h1 className="text-3xl text-center mb-4">A&E Wait Times</h1>
          <h2 className="text-xl text-center">
            Reference waiting times in Hong Kong’s A&E Departments
          </h2>
        </header>
        <section>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={{ after: new Date() }}
              />
            </PopoverContent>
          </Popover>
          <Input
            type="time"
            step={60 * 15}
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
          {data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital</TableHead>
                  <TableHead className="">Reference Wait Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.waitTime.map((wt) => (
                  <TableRow key={wt.hospName}>
                    <TableCell className="font-medium">{wt.hospName}</TableCell>
                    <TableCell>{wt.topWait}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
      <p className="text-xs text-center italic">
        *Priority will be accorded to patients triaged as critical, emergency
        and urgent.
      </p>
      <footer></footer>
    </>
  );
}
