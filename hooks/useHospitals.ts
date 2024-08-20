import { HospitalAcronyms } from "@/lib/types";
import axiosInstance from "@/services/api-client";
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

interface GetHospitalsResponse {
  hospitals: Hospital[];
}

const getHospitals = async (): Promise<Hospital[]> => {
  const response = await axiosInstance.get<GetHospitalsResponse>("/hospitals");
  return response.data.hospitals;
};

export const useHospitals = () =>
  useQuery<Hospital[]>({
    queryKey: ["hospitals"],
    queryFn: () => getHospitals(),
  });
