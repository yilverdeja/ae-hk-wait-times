export type HospitalAcronyms =
  | "AHMLNH"
  | "CMC"
  | "KWH"
  | "NDH"
  | "NLH"
  | "PMH"
  | "POH"
  | "POWH"
  | "PYNEH"
  | "QEH"
  | "QMH"
  | "RH"
  | "SJH"
  | "TKOH"
  | "TMH"
  | "TSWH"
  | "UCH"
  | "YCH";

interface WaitMapping {
  [key: string]: string;
}

export const waitMapping: WaitMapping = {
  "1": "Around 1 hour",
  "2": "Over 1 hour",
  "3": "Over 2 hours",
  "4": "Over 3 hours",
  "5": "Over 4 hours",
  "6": "Over 5 hours",
  "7": "Over 6 hours",
  "8": "Over 7 hours",
  "9": "Over 8 hours",
};

type WeekDayNames =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const dayNames: WeekDayNames[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const daySelectOptions = [
  { value: "1", short: "Mon", long: "Monday" },
  { value: "2", short: "Tue", long: "Tuesday" },
  { value: "3", short: "Wed", long: "Wednesday" },
  { value: "4", short: "Thu", long: "Thursday" },
  { value: "5", short: "Fri", long: "Friday" },
  { value: "6", short: "Sat", long: "Saturday" },
  { value: "0", short: "Sun", long: "Sunday" },
];

export interface RegionFilter {
  id: string;
  value: string[];
}
