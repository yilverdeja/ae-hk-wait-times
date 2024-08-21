import { dayNames, WeekDayNames } from "@/lib/types";
import axiosInstance from "@/services/api-client";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type TrendMapping = {
  week: { [key in WeekDayNames]: number[] };
  day: number[];
  hour: number;
};

export type HospitalTrendType =
  | TrendMapping["week"]
  | TrendMapping["day"]
  | TrendMapping["hour"];

interface GetHospitalTrendResponse {
  type: keyof TrendMapping;
  trend: HospitalTrendType;
}

const getHospitalTrend = async (
  id: number,
  day?: WeekDayNames,
  hour?: number
): Promise<GetHospitalTrendResponse> => {
  const endpoint = `/hospitals/${id}/trend`;
  const params = new URLSearchParams();
  if (day) params.append("day", day);
  if (day && hour !== undefined) params.append("hour", hour.toString());
  const response = await axiosInstance.get<GetHospitalTrendResponse>(endpoint, {
    params,
  });
  return response.data;
};

const calculateRefetchInterval = (
  day?: WeekDayNames,
  hour?: number
): number | false => {
  const currentTime = new Date();

  if (day && hour !== undefined) {
    // Refetch every hour
    const nextHour = new Date(currentTime);
    nextHour.setHours(currentTime.getHours() + 1);
    nextHour.setMinutes(0, 0, 0); // Set seconds and milliseconds to 0
    return nextHour.getTime() - currentTime.getTime();
  } else if (day) {
    // Refetch every day
    const nextDay = new Date(currentTime);
    nextDay.setDate(currentTime.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); // Start of the next day
    return nextDay.getTime() - currentTime.getTime();
  } else {
    // Refetch every week
    const nextWeek = new Date(currentTime);
    nextWeek.setDate(currentTime.getDate() + (7 - currentTime.getDay()));
    nextWeek.setHours(0, 0, 0, 0); // Start of the next week
    return nextWeek.getTime() - currentTime.getTime();
  }
};

export const usePrefetchHospitalTrend = (
  queryClient: QueryClient,
  id: number
) => {
  const now = new Date();
  const day = dayNames[now.getDay()];
  const hour = now.getHours();

  // prefetch all trend data from hospital
  queryClient.prefetchQuery({
    queryKey: ["hospital", id, "trend", undefined, undefined],
    queryFn: () => getHospitalTrend(id),
  });

  // prefetch current day hour value
  queryClient.prefetchQuery({
    queryKey: ["hospital", id, "trend", day, hour],
    queryFn: () => getHospitalTrend(id, day, hour),
  });
};

export const useHospitalTrend = (
  id: number,
  day?: WeekDayNames,
  hour?: number
) =>
  useQuery<GetHospitalTrendResponse>({
    queryKey: ["hospital", id, "trend", day, hour],
    queryFn: () => getHospitalTrend(id, day, hour),
    refetchInterval: calculateRefetchInterval(day, hour),
  });
