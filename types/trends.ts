export type DayOfWeek =
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"

// An array of 24 numbers, index 0 = 00:00-00:59, index 23 = 23:00-23:59
export type HourlyAverages = number[]

// The structured trend data for a single hospital
export interface HospitalTrendData {
    // Average wait time for each day of the week (overall)
    averageByDay: Record<DayOfWeek, number>
    // Average wait time for each hour of the day, across all days
    averageByHourAcrossAllDays: HourlyAverages
    // Granular data: wait time for each hour, for each specific day
    byHourOfDay: Record<DayOfWeek, HourlyAverages>
}

// The complete data set, mapping a hospital slug to its trend data
export type AllHospitalTrends = Record<string, HospitalTrendData>
