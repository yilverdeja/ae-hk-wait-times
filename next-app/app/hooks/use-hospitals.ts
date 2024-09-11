import { HospitalAcronyms } from "@/app/lib/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Hospital {
	id: number;
	name: string;
	slug: HospitalAcronyms;
	email: string;
	cluster: string;
	region: string;
	address: string;
	phone: string;
	fax: string;
	ha_id: string;
	website?: string;
	google_maps_link: string;
}

export interface HospitalWithWait extends Hospital {
	wait: number;
}

const getHospitals = async (): Promise<Hospital[]> => {
	const response = await axios.get<Hospital[]>("/api/hospitals");
	return response.data;
};

export const useHospitals = () =>
	useQuery<Hospital[]>({
		queryKey: ["hospitals"],
		queryFn: () => getHospitals(),
	});
