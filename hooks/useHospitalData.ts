import { useState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { HospitalInfo, useHospitals } from "@/hooks/useHospitals";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import moment from "moment";
import { HospitalAcronyms } from "@/lib/types";

const useHospitalData = () => {
  const [combinedData, setCombinedData] = useState<HospitalInfo[]>([]);
  const [updateTime, setUpdateTime] = useState<Date | null>(null);
  const { data: hospitals, isLoading: isLoadingHospitals } = useHospitals();
  const { data: hospitalWaitTimes, isLoading: isLoadingWaitTimes } =
    useHospitalWaitTimes();

  useEffect(() => {
    if (
      !isLoadingHospitals &&
      !isLoadingWaitTimes &&
      hospitals &&
      hospitalWaitTimes
    ) {
      const data = Object.keys(hospitals).map((slug) => {
        const hospital = hospitals[slug as HospitalAcronyms];
        const waitTime = hospitalWaitTimes.hospitals[slug as HospitalAcronyms];
        return {
          ...hospital,
          wait: waitTime,
          slug: slug as HospitalAcronyms,
        };
      });
      const newUpdateTime = moment(
        hospitalWaitTimes.updateTime,
        "D/M/YYYY h:mma"
      ).toDate();
      if (updateTime && newUpdateTime !== updateTime) {
        sendGAEvent("event", "updated_update_time", { value: newUpdateTime });
      }

      setUpdateTime(newUpdateTime);
      setCombinedData(data);
    }
  }, [hospitals, hospitalWaitTimes, isLoadingHospitals, isLoadingWaitTimes]);

  return {
    combinedData,
    updateTime,
    isLoading: isLoadingHospitals || isLoadingWaitTimes,
  };
};

export default useHospitalData;
