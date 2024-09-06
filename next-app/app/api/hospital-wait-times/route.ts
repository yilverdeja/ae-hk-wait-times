import axios from "axios";
import { NextResponse } from "next/server";

const WaitTimeToIndexMap = {
	"Around 1 hour": 1,
	"Over 1 hour": 2,
	"Over 2 hours": 3,
	"Over 3 hours": 4,
	"Over 4 hours": 5,
	"Over 5 hours": 6,
	"Over 6 hours": 7,
	"Over 7 hours": 8,
	"Over 8 hours": 9,
};

type TopWaitStrings = keyof typeof WaitTimeToIndexMap;

interface HospitalWaitTime {
	hospName: string;
	topWait: TopWaitStrings;
}

interface HospitalWaitTimeRecord {
	waitTime: HospitalWaitTime[];
	updateTime: string;
}

interface HospitalWaitTimeResponse {
	[key: string]: number;
}

interface HospitalWaitTimeRecordResponse {
	updateTime: string;
	hospitals: HospitalWaitTimeResponse;
}

const getHospitalWaitTimes = async () => {
	const data = await axios
		.get<HospitalWaitTimeRecord>(
			"https://www.ha.org.hk/opendata/aed/aedwtdata-en.json"
		)
		.then((res) => res.data);

	const hospitalWaitTimes = data.waitTime;
	const hospitals: HospitalWaitTimeResponse = {};
	hospitalWaitTimes.forEach(({ hospName, topWait }) => {
		hospitals[hospName] = WaitTimeToIndexMap[topWait];
	});

	const hospitalWaitTimesResponse: HospitalWaitTimeRecordResponse = {
		updateTime: data.updateTime,
		hospitals,
	};

	return hospitalWaitTimesResponse;
};

export async function GET() {
	try {
		const response = await getHospitalWaitTimes();
		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
