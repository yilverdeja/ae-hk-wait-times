import { useState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { HospitalWithWait, useHospitals } from "@/hooks/useHospitals";
import { useHospitalWaitTimes } from "@/hooks/useHospitalWaitTimes";
import moment from "moment";
import { HospitalAcronyms } from "@/lib/types";

const useHospitalData = () => {
  const [combinedData, setCombinedData] = useState<HospitalWithWait[]>([]);
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
      const data = hospitals.map((hospital) => {
        const waitTime =
          hospitalWaitTimes.hospitals[hospital.slug as HospitalAcronyms];
        return {
          ...hospital,
          website:
            hospital.website && hospital.website !== "null"
              ? hospital.website
              : undefined,
          wait: waitTime,
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
