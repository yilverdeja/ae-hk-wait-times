import myData from "@/data/hospital_averages.json";

export type HospitalNames = "Alice Ho Miu Ling Nethersole Hospital"|"Caritas Medical Centre"|"Kwong Wah Hospital"|"North District Hospital"|"North Lantau Hospital"|"Princess Margaret Hospital"|"Pok Oi Hospital"|"Prince of Wales Hospital"|"Pamela Youde Nethersole Eastern Hospital"|"Queen Elizabeth Hospital"|"Queen Mary Hospital"|"Ruttonjee Hospital"|"St John Hospital"|"Tseung Kwan O Hospital"|"Tuen Mun Hospital"|"Tin Shui Wai Hospital"|"United Christian Hospital"|"Yan Chai Hospital"

export type DayNames = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23"

type DaySchedule = Record<DayNames, number>

export type WeekDayNames = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

export type WeekDayData = Record<WeekDayNames, number>

export interface HospitalData {
  Days: WeekDayData;
  Hours: DaySchedule;
  Monday: DaySchedule;
  Tuesday: DaySchedule;
  Wednesday: DaySchedule;
  Thursday: DaySchedule;
  Friday: DaySchedule;
  Saturday: DaySchedule;
  Sunday: DaySchedule;
}

export type HospitalAveragesData = Record<HospitalNames, HospitalData>;

const hospitalData: HospitalAveragesData = myData as HospitalAveragesData;

export default hospitalData