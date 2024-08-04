"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import myData from "@/data/hospital_averages.json";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import { useEffect, useState } from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  WaitTime: {
    label: "Wait Time",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function HospitalPage({
  params,
}: {
  params: { hospital: string };
}) {
  const { data, isLoading, error } = useHospitalWaitTimes();
  const [currentWaitTime, setCurrentWaitTime] = useState<string | null>(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const days = myData["Caritas Medical Centre"]["Sunday"];
    const formattedData = Object.keys(days).map((day) => ({
      Day: day,
      WaitTime: days[day],
    }));

    setChartData(formattedData);
  }, []);

  useEffect(() => {
    if (data) {
      const wt = data.waitTime;
      const tw = wt.find(
        (w) => w.hospName === "Caritas Medical Centre"
      )?.topWait;
      setCurrentWaitTime(tw!);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <NavBar />
      <main className="flex flex-col gap-4 justify-between items-start my-4 sm:gap-2">
        <h1 className="text-3xl">Caritas Medical Centre</h1>
        <h2>Current Wait: {currentWaitTime}</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis type="number" domain={["auto", "auto"]} />
            <Bar dataKey="WaitTime" fill="var(--color-WaitTime)" radius={4} />
          </BarChart>
        </ChartContainer>
      </main>
      <Footer />
    </div>
  );
}
