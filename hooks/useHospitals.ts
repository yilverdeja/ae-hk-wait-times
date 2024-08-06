import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface HospitalRegion {
    long: string;
    short: string;
}

interface HospitalInfo {
    name: string;
    region: HospitalRegion;
    linkId: string;
    cluster: string;
    address: string;
    telephone: string;
    fax: string;
    email: string;
    website?: string; // Optional because it might not be present for every hospital
    googleMapsLink: string;
}

interface HospitalInfo2 {
    slug: string;
    region: HospitalRegion;
}

interface Hospitals {
    [key: string]: HospitalInfo2; // Using an index signature to allow any string as a key
}

const getHospitals = async (): Promise<Hospitals> => {
    const url = "/api/hospitals";
    const response = await axios.get(url);
    return response.data; // Make sure to return just the data object
};

export const useHospitals = () => useQuery<Hospitals>({
    queryKey: ["hospitals"],
    queryFn: () => getHospitals(),
});