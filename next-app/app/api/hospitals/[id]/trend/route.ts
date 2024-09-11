import axiosInstance from "@/app/lib/services/api-client";
import { WeekDayNames } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export type TrendMapping = {
	week: { [key in WeekDayNames]: number[] };
	day: number[];
	hour: number;
};

export type HospitalTrendType =
	| TrendMapping["week"]
	| TrendMapping["day"]
	| TrendMapping["hour"];

interface GetHospitalTrendResponse {
	type: keyof TrendMapping;
	trend: HospitalTrendType;
}

const getHospitalTrend = async (
	id: number,
	day?: WeekDayNames,
	hour?: number
): Promise<GetHospitalTrendResponse> => {
	const endpoint = `/hospitals/${id}/trend`;
	const params = new URLSearchParams();
	if (day) params.append("day", day);
	if (day && hour !== undefined) params.append("hour", hour.toString());
	const response = await axiosInstance.get<GetHospitalTrendResponse>(
		endpoint,
		{
			params,
		}
	);
	return response.data;
};

const isValidWeekDay = (day: string | null): boolean => {
	const validDays: WeekDayNames[] = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	return (
		day !== null &&
		validDays.map((d) => d.toLowerCase()).includes(day.toLowerCase())
	);
};

const isValidHour = (hour: string | null): boolean => {
	try {
		return hour !== null && parseInt(hour) >= 0 && parseInt(hour) <= 23;
	} catch (err) {
		return false;
	}
};

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	const hospitalId = params.id;

	const searchParams = request.nextUrl.searchParams;
	const query: { day?: WeekDayNames; hour?: number } = {
		day: undefined,
		hour: undefined,
	};
	const dayQuery = searchParams.get("day");
	if (dayQuery && isValidWeekDay(dayQuery)) {
		query.day = dayQuery as WeekDayNames;
	}
	const hourQuery = searchParams.get("hour");
	if (hourQuery && isValidHour(hourQuery)) {
		query.hour = parseInt(hourQuery);
	}

	try {
		const response = await getHospitalTrend(
			hospitalId,
			query.day,
			query.hour
		);
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

// if node env is dev, then use dummy data
