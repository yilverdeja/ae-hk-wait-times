import axiosInstance from "@/app/lib/services/api-client";
import { HospitalAcronyms } from "@/app/lib/types";
import { NextResponse } from "next/server";

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
	const data = await axiosInstance
		.get<GetHospitalsResponse>("/hospitals")
		.then((res) => res.data);
	return data.hospitals;
};

export async function GET() {
	try {
		const response = await getHospitals();
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

// if node env is dev, then use dummy data
