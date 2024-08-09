import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type DayNames =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23";

type DaySchedule = Record<DayNames, number>;

interface HospitalTrend {
  Monday: DaySchedule;
  Tuesday: DaySchedule;
  Wednesday: DaySchedule;
  Thursday: DaySchedule;
  Friday: DaySchedule;
  Saturday: DaySchedule;
  Sunday: DaySchedule;
}

const getHospitalTrend = async (slug: string): Promise<HospitalTrend> => {
  const url = `/api/hospitals/${slug}/trend`;
  const response = await axios.get(url);
  return response.data; // Make sure to return just the data object
};

const getHospitalHourlyTrend = async (
  slug: string,
  day: number,
  hour: number
): Promise<number> => {
  const url = `/api/hospitals/${slug}/hourly-trend/${day}/${hour}`;
  const response = await axios.get(url);
  return response.data;
};

export const useHospitalTrend = (slug: string) =>
  useQuery<HospitalTrend>({
    queryKey: ["hospital", slug, "trend"],
    queryFn: () => getHospitalTrend(slug),
  });

export const useHospitalHourlyTrend = (
  slug: string,
  day: number,
  hour: number
) =>
  useQuery<number>({
    queryKey: ["hospital", slug, "hourly-trend", day, hour],
    queryFn: () => getHospitalHourlyTrend(slug, day, hour),
  });
