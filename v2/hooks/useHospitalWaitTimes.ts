import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ApiResponse } from '@/types';
import dayjs from '@/lib/dayjs';

/**
 * @description Fetches the hospital wait time data from our Next.js API route.
 * This function is passed to the `queryFn` option of `useQuery`.
 * @returns {Promise<ApiResponse>} A promise that resolves to the API response.
 */
const getHospitalWaitTimes = async (): Promise<ApiResponse> => {
  // We use a relative URL, which works for client-side fetching in Next.js.
  const { data } = await axios.get<ApiResponse>('/api/waits');
  return data;
};

/**
 * @description A custom React hook to fetch and manage hospital A&E wait time data.
 * It uses TanStack Query for caching, background updates, and smart polling.
 *
 * This implementation uses day.js, a modern and lightweight alternative to moment.js.
 *
 * Features:
 * - Caches data to avoid redundant fetches.
 * - Uses a local storage persister (as you've set up) for persistence.
 * - Implements a smart refetching interval:
 *   1. After a successful fetch, it calculates the time until the next 15-minute update window.
 *      It schedules the next refetch for ~14 minutes after the data's `lastUpdated` timestamp.
 *   2. If a refetch occurs and the `lastUpdated` timestamp has NOT changed (meaning the external API
 *      is late), it switches to a rapid 30-second polling mode.
 *   3. Once the rapid polling gets new data (a fresh `lastUpdated` timestamp), it reverts to the
 *      smarter, longer interval.
 */
export const useHospitalWaitTimes = () => {
  return useQuery({
    // A unique key for this query. TanStack Query uses this for caching.
    queryKey: ['hospitalWaitTimes'],

    // The function that will be called to fetch the data.
    queryFn: getHospitalWaitTimes,

    // staleTime: How long data is considered "fresh" (in ms).
    // Fresh data will not be refetched on component mounts or window focus.
    // We set it to 14 minutes, as the API updates every 15 minutes.
    // This prevents unnecessary API calls within the update window.
    staleTime: 14 * 60 * 1000, // 14 minutes

    // refetchInterval: The core of our smart polling logic.
    // This function is re-evaluated after every successful fetch.
    refetchInterval: (query) => {
      // The query object contains the current state, including the fetched data.
      const lastUpdated = query.state.data?.lastUpdated;

      // Case 1: No data yet (e.g., initial fetch failed).
      // We'll retry every 15 seconds until we get data.
      if (!lastUpdated) {
        return 15 * 1000;
      }

      // Parse the `lastUpdated` string from the API into a dayjs object.
      // The format from the API is "D/M/YYYY h:mmA", e.g., "7/11/2025 11:15PM".
      // We use the customParseFormat plugin for this.
      const lastUpdateTime = dayjs(lastUpdated, 'D/M/YYYY h:mmA');

      // Calculate the next time we should check for an update.
      // We add 14 minutes to the last update time. This is our "safe" interval
      // to ensure we try to refetch just before the next 15-minute mark.
      // dayjs objects are immutable, so .add() returns a new instance.
      const nextCheckTime = lastUpdateTime.add(14, 'minute');
      
      const currentTime = dayjs();

      // Case 2: The expected update time has passed, but our data is still old.
      // This means the external API hasn't published the new data yet.
      // We switch to a rapid 30-second polling mode to catch the update as soon as it's live.
      if (currentTime.isAfter(nextCheckTime)) {
        console.log(
          `[Wait Times] Expected update after ${nextCheckTime.format('h:mm:ss A')}, but data is still from ${lastUpdateTime.format('h:mm:ss A')}. Polling every 30s.`
        );
        return 30 * 1000; // 30 seconds
      }

      // Case 3: The data is fresh.
      // We calculate the exact duration (in milliseconds) until the next scheduled check.
      // This will be a value around 14 minutes for the first check, and will decrease over time.
      const timeUntilNextCheck = nextCheckTime.diff(currentTime);
      
      // For the log message, we convert milliseconds to minutes.
      const minutesUntilNextCheck = (timeUntilNextCheck / 60000).toFixed(1);

      console.log(
        `[Wait Times] Data is fresh (Updated: ${lastUpdateTime.format('h:mm:ss A')}). Next check scheduled in ${minutesUntilNextCheck} minutes.`
      );
      
      // Return the calculated time in milliseconds.
      // TanStack Query will wait this long before the next refetch.
      return timeUntilNextCheck;
    },
  });
};