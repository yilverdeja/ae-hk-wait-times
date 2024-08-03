import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

interface HospitalWaitTime {
    hospName: string;
    topWait: string;
  }
  
  interface HospitalWaitTimesData {
    waitTime: HospitalWaitTime[];
    updateTime: string;
  }

const getHospitalWaitTimes = async (): Promise<HospitalWaitTimesData> => {
    const url = "https://www.ha.org.hk/opendata/aed/aedwtdata-en.json";
    const response = await axios.get(url);
    return response.data; // Make sure to return just the data object
};

export const useHospitalWaitTimes = () => useQuery<HospitalWaitTimesData>({
  queryKey: ["data"],
  queryFn: () => getHospitalWaitTimes(),
  refetchInterval: (query) => {
    // refetch at 15 minute intervals
    const updateTime = query.state.data?.updateTime;
    if (!updateTime) return 1000;

    // retrieve the most recent data's update time and calculate fetch time 15 mins later
    const refetchTime = moment(updateTime, "D/M/YYYY h:mma")
      .add(15, "minutes")
      .toDate();
    const currentTime = new Date();

    // get the difference between refetch time and current time
    const diffTime = refetchTime.getTime() - currentTime.getTime();
    if (diffTime <= 0) return 1000 * 30; // if current time > refetch time then wait 30 seconds

    return diffTime;
  },
});