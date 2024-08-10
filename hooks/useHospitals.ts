import { HospitalAcronyms } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface HospitalInfo {
  name: string;
  region: string;
  linkId: string;
  cluster: string;
  address: string;
  telephone: string;
  fax: string;
  email: string;
  website?: string;
  googleMapsLink: string;
  wait?: number;
  slug?: HospitalAcronyms;
}

type Hospitals = {
  [key in HospitalAcronyms]: HospitalInfo;
};

const getHospitals = async (): Promise<Hospitals> => {
  const url = "/api/hospitals";
  const response = await axios.get(url);
  return response.data;
};

export const useHospitals = () =>
  useQuery<Hospitals>({
    queryKey: ["hospitals"],
    queryFn: () => getHospitals(),
  });
