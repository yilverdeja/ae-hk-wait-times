// app/api/waits/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

// ============================================================================
// 1. DATA MODELING (TYPES & INTERFACES)
// ============================================================================

/**
 * @description Enum to represent the different management statuses for triage cases.
 * This provides a clearer, more descriptive state than a simple boolean.
 */
export enum ManagementStatus {
  Managing = "MANAGING",
  NotManaging = "NOT_MANAGING",
  ManagingMultiple = "MANAGING_MULTIPLE_CASES", // Corresponds to 'N/A'
}

/**
 * @description Interface for the raw hospital data as received from the external API.
 */
interface RawHospitalWaitTime {
  hospName: string;
  t1wt: string;
  manageT1case: 'Y' | 'N' | 'N/A' | string;
  t2wt: string;
  manageT2case: 'Y' | 'N' | 'N/A' | string;
  t3p50: string;
  t3p95: string;
  t45p50: string;
  t45p95: string;
}

/**
 * @description Interface for the top-level response from the external API.
 */
interface RawApiResponse {
  waitTime: RawHospitalWaitTime[];
  updateTime: string;
}

/**
 * @description Interface for the clean, transformed data for a single hospital.
 * This is the data structure our API will serve.
 */
interface TransformedHospitalData {
  hospitalName: string;
  hospitalSlug: string | null;
  criticalManagementStatus: ManagementStatus;
  emergencyManagementStatus: ManagementStatus;
  waitTimes: {
    criticalMinutes: number | null;
    emergencyMinutes: number | null;
    urgentP50Minutes: number | null;
    urgentP95Minutes: number | null;
    semiUrgentNonUrgentP50Minutes: number | null;
    semiUrgentNonUrgentP95Minutes: number | null;
  };
}

/**
 * @description Interface for the final response object from our /api/waits endpoint.
 */
interface ApiResponse {
  lastUpdated: string;
  waitTimes: TransformedHospitalData[];
}

// ============================================================================
// 2. CONSTANTS & MAPPINGS
// ============================================================================

const API_URL = "https://www.ha.org.hk/opendata/aed/aedwtdata2-en.json";

const hospitalAcronyms: { [key: string]: string } = {
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

// ============================================================================
// 3. UTILITY / HELPER FUNCTIONS
// ============================================================================

/**
 * @description Parses a time string (e.g., "2.5 hours", "30 minutes") into a total number of minutes.
 * Handles cases like "less than 15 minutes" by extracting the number.
 * Correctly returns null for non-numeric strings like "Managing multiple resuscitation cases".
 * @param timeString The string to parse.
 * @returns The total time in minutes as a number, or null if parsing fails.
 */
const parseWaitTime = (timeString: string): number | null => {
  if (!timeString) return null;

  // Regex to find the first numerical value (integer or float).
  const match = timeString.match(/(\d+\.?\d*)/);
  // If no number is found (e.g., for "Managing multiple..."), return null.
  if (!match) return null;

  let value = parseFloat(match[1]);

  // Convert hours to minutes if the string contains "hour".
  if (timeString.toLowerCase().includes('hour')) {
    value *= 60;
  }

  return Math.round(value);
};

/**
 * @description Parses the management status string ('Y', 'N', 'N/A') into a descriptive enum.
 * @param status The status string from the API.
 * @returns A ManagementStatus enum value.
 */
const parseManagementStatus = (status: 'Y' | 'N' | 'N/A' | string): ManagementStatus => {
  switch (status) {
    case 'Y':
      return ManagementStatus.Managing;
    case 'N/A':
      return ManagementStatus.ManagingMultiple;
    case 'N':
      return ManagementStatus.NotManaging;
    default:
      // A safe default in case of unexpected values.
      return ManagementStatus.NotManaging;
  }
};


// ============================================================================
// 4. API HANDLER (GET)
// ============================================================================

export async function GET(request: Request) {
  try {
    const response = await axios.get<RawApiResponse>(API_URL);
    const rawData = response.data;

    if (!rawData || !Array.isArray(rawData.waitTime)) {
      throw new Error("Invalid data structure received from the external API.");
    }

    const transformedData: TransformedHospitalData[] = rawData.waitTime.map((hospital) => {
      const slug = hospitalAcronyms[hospital.hospName] || null;

      return {
        hospitalName: hospital.hospName,
        hospitalSlug: slug,
        // Use the new, more descriptive status fields
        criticalManagementStatus: parseManagementStatus(hospital.manageT1case),
        emergencyManagementStatus: parseManagementStatus(hospital.manageT2case),
        waitTimes: {
          // The parseWaitTime function already handles the non-numeric string correctly
          criticalMinutes: parseWaitTime(hospital.t1wt),
          emergencyMinutes: parseWaitTime(hospital.t2wt),
          urgentP50Minutes: parseWaitTime(hospital.t3p50),
          urgentP95Minutes: parseWaitTime(hospital.t3p95),
          semiUrgentNonUrgentP50Minutes: parseWaitTime(hospital.t45p50),
          semiUrgentNonUrgentP95Minutes: parseWaitTime(hospital.t45p95),
        },
      };
    });

    const apiResponse: ApiResponse = {
      lastUpdated: rawData.updateTime,
      waitTimes: transformedData,
    };

    return NextResponse.json(apiResponse);

  } catch (error) {
    console.error("Error fetching or processing A&E wait time data:", error);
    
    return NextResponse.json(
      { message: "An error occurred while fetching A&E waiting times." },
      { status: 500 }
    );
  }
}