import axios from "axios";
import { ValueOf } from "next/dist/shared/lib/constants";
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

const HospitalAcronymsMap = {
	"Alice Ho Miu Ling Nethersole Hospital": "AHMLNH",
	"Caritas Medical Centre": "CMC",
	"Kwong Wah Hospital": "KWH",
	"North District Hospital": "NDH",
	"North Lantau Hospital": "NLH",
	"Princess Margaret Hospital": "PMH",
	"Pok Oi Hospital": "POH",
	"Prince of Wales Hospital": "POWH",
	"Pamela Youde Nethersole Eastern Hospital": "PYNEH",
	"Queen Elizabeth Hospital": "QEH",
	"Queen Mary Hospital": "QMH",
	"Ruttonjee Hospital": "RH",
	"St John Hospital": "SJH",
	"Tseung Kwan O Hospital": "TKOH",
	"Tuen Mun Hospital": "TMH",
	"Tin Shui Wai Hospital": "TSWH",
	"United Christian Hospital": "UCH",
	"Yan Chai Hospital": "YCH",
};

type TopWaitStrings = keyof typeof WaitTimeToIndexMap;
type HospitalNames = keyof typeof HospitalAcronymsMap;
type HospitalAcronyms = ValueOf<typeof HospitalAcronymsMap>;

interface HospitalWaitTime {
	hospName: HospitalNames;
	topWait: TopWaitStrings;
}

interface HospitalWaitTimeRecord {
	waitTime: HospitalWaitTime[];
	updateTime: string;
}

interface HospitalWaitTimeResponse {
	[key: HospitalAcronyms]: number;
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
		if (hospName in HospitalAcronymsMap) {
			const acronym: HospitalAcronyms = HospitalAcronymsMap[hospName];
			hospitals[acronym] = WaitTimeToIndexMap[topWait];
		}
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
