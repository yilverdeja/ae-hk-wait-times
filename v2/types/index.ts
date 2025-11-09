// types/index.ts

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
   * @description Interface for the clean, transformed data for a single hospital.
   */
  export interface TransformedHospitalData {
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
  export interface ApiResponse {
    lastUpdated: string;
    waitTimes: TransformedHospitalData[];
  }