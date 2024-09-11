import { useState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { HospitalWithWait, useHospitals } from "@/app/hooks/use-hospitals";
import { useHospitalWaitTimes } from "@/app/hooks/use-hospital-wait-times";
import moment from "moment";
import { HospitalAcronyms } from "@/app/lib/types";

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
					hospitalWaitTimes.hospitals[
						hospital.slug as HospitalAcronyms
					];
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

			// sends an analytics event if the update time was updated automatically without the page reloading
			if (
				updateTime &&
				newUpdateTime.getTime() !== updateTime.getTime()
			) {
				sendGAEvent("event", "updated_update_time", {
					value: newUpdateTime,
				});
			}

			setUpdateTime(newUpdateTime);
			setCombinedData(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hospitals, hospitalWaitTimes, isLoadingHospitals, isLoadingWaitTimes]);

	return {
		combinedData,
		updateTime,
		isLoading: isLoadingHospitals || isLoadingWaitTimes,
	};
};

export default useHospitalData;
