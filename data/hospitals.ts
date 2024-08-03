const Region = {
  HongKongIsland: {long: "Hong Kong Island", short: "HKI"},
  Kowloon: {long: "Kowloon", short: "KL"},
  NewTerritories: {long: "New Territories", short: "NT"}
} as const;

export type RegionType = typeof Region[keyof typeof Region]

interface HospitalInformation {
  region: RegionType,
  link: string;
}

const LANGUAGE = "ENG"

const buildHospitalLink = (contentId: string): string => `http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${contentId}&Lang=${LANGUAGE}`;

  // Hospital names and their detailed information
const hospitalDetails: Record<string, HospitalInformation> = {
  "Alice Ho Miu Ling Nethersole Hospital": {region: Region.NewTerritories,link: buildHospitalLink("100171")},
  "Caritas Medical Centre": {region: Region.Kowloon,link: buildHospitalLink("100163")},
  "Kwong Wah Hospital": {region: Region.Kowloon, link: buildHospitalLink("100153")},
  "North District Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100178")},
  "North Lantau Hospital": {region: Region.NewTerritories, link: buildHospitalLink("216546")},
  "Princess Margaret Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100160")},
  "Pok Oi Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100174")},
  "Prince of Wales Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100166")},
  "Pamela Youde Nethersole Eastern Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100141")},
  "Queen Elizabeth Hospital": {region: Region.Kowloon, link: buildHospitalLink("100149")},
  "Queen Mary Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100131")},
  "Ruttonjee Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100144")},
  "St John Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100146")},
  "Tseung Kwan O Hospital": {region: Region.NewTerritories, link: buildHospitalLink("101326")},
  "Tuen Mun Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100173")},
  "Tin Shui Wai Hospital": {region: Region.NewTerritories, link: buildHospitalLink("235909")},
  "United Christian Hospital": {region: Region.Kowloon, link: buildHospitalLink("100156")},
  "Yan Chai Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100165")},
};

// Hospital information using a Map for case-insensitive access
export const hospitals = new Map<string, HospitalInformation>(
  Object.entries(hospitalDetails)
);

// Utility function to get hospital information by name, case-insensitively
export function getHospitalInformation(hospitalName: string): HospitalInformation | undefined {
  const normalizedKey = Array.from(hospitals.keys()).find(key => key.toUpperCase() === hospitalName.toUpperCase());
  return normalizedKey ? hospitals.get(normalizedKey) : undefined;
}