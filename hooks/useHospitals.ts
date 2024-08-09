import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HospitalAcronyms } from "./useHospitalWaitTimes";

export interface HospitalInfo {
  name: string;
  region: string;
  linkId: string;
  cluster: string;
  address: string;
  telephone: string;
  fax: string;
  email: string;
  website?: string; // Optional because it might not be present for every hospital
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
  return response.data; // Make sure to return just the data object
};

export const useHospitals = () =>
  useQuery<Hospitals>({
    queryKey: ["hospitals"],
    queryFn: () => getHospitals(),
  });
