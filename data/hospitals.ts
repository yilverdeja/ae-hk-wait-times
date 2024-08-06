const Region = {
  HongKongIsland: {long: "Hong Kong Island", short: "HKI"},
  Kowloon: {long: "Kowloon", short: "KL"},
  NewTerritories: {long: "New Territories", short: "NT"}
} as const;

export enum ClusterType {
  HongKongEast = "Hong Kong East",
  HongKongWest = "Hong Kong West",
  KowloonCentral = "Kowloon Central",
  KowloonEast = "Kowloon East",
  KowloonWest = "Kowloon West",
  NewTerritoriesEast = "New Territories East",
  NewTerritoriesWest = "New Territories West"
}

export type RegionType = typeof Region[keyof typeof Region]

export interface HospitalInformationInterface {
  region: RegionType;
  cluster: ClusterType;
  address: string;
  telephone: string;
  fax: string;
  email: string;
  link: string;
  website?: string;
  googleMapsLink: string;
}

const LANGUAGE = "ENG"

const buildHospitalLink = (contentId: string): string => `http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${contentId}&Lang=${LANGUAGE}`;

  // Hospital names and their detailed information
const hospitalDetails: Record<string, HospitalInformationInterface> = {
  "Alice Ho Miu Ling Nethersole Hospital": {region: Region.NewTerritories,link: buildHospitalLink("100171"), cluster: ClusterType.NewTerritoriesEast, address: "11 Chuen On Road, Tai Po, NT", telephone: "2689 2000", fax: "2662 1690", email: "ahnh_enquiry@ha.org.hk", website: "https://www3.ha.org.hk/AHNH/index_e.asp", googleMapsLink: "https://maps.app.goo.gl/xWmgrNkN5PKd1GNB8"},
  "Caritas Medical Centre": {region: Region.Kowloon,link: buildHospitalLink("100163"), cluster: ClusterType.KowloonWest, address: "111 Wing Hong Street, Sham Shui Po, KLN", telephone: "3408 5678", fax: "2785 5755", email: "cmc.enq@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/RHspT8VfgdGJVffY7"},
  "Kwong Wah Hospital": {region: Region.Kowloon, link: buildHospitalLink("100153"), cluster: ClusterType.KowloonCentral, address: "25 Waterloo Road, KLN", telephone: "2332 2311", fax: "3517 5481", email: "kwh.enquiry@ha.org.hk", website: "https://www3.ha.org.hk/kwh/main/en/index.asp", googleMapsLink: "https://maps.app.goo.gl/v5nGqGXHwhSheXeY7"},
  "North District Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100178"), cluster: ClusterType.NewTerritoriesEast, address: "9 Po Kin Road, Sheung Shui, NT", telephone: "2683 8888", fax: "2683 8383", email: "ndh_enquiry@ha.org.hk", website: "https://www3.ha.org.hk/ndh/index_e.asp", googleMapsLink: "https://maps.app.goo.gl/bMecWjrymELPVzDD6"},
  "North Lantau Hospital": {region: Region.NewTerritories, link: buildHospitalLink("216546"), cluster: ClusterType.KowloonWest, address: "8 Chung Yan Road, Tung Chung, Lantau Island", telephone: "3467 7000", fax: "3467 7004", email: "nlth.enquiry@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/3AKWdxSKQrRH3kLR7"},
  "Princess Margaret Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100160"), cluster: ClusterType.KowloonWest, address: "2-10 Princess Margaret Hospital Road, Lai Chi Kok, Kowloon", telephone: "2990 1111", fax: "2786 3629", email: "pmh.enquiry@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/oahm76MqWJrz58aPA"},
  "Pok Oi Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100174"), cluster: ClusterType.NewTerritoriesWest, address: "Au Tau, Yuen Long, NT", telephone: "2486 8000", fax: "2443 9593", email: "poh.service@ha.org.hk", website: "https://www3.ha.org.hk/poh/en/Default.asp", googleMapsLink: "https://maps.app.goo.gl/9ddP2PsjarwjZRpw7"},
  "Prince of Wales Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100166"), cluster: ClusterType.NewTerritoriesEast, address: "30-32 Ngan Shing Street, Shatin, NT", telephone: "3505 2211", fax: "2637 8244", email: "pwh_enquiry@ha.org.hk", website: "https://www3.ha.org.hk/pwh/index_e.asp", googleMapsLink: "https://maps.app.goo.gl/oFaaRsSYuKTEGQtG7"},
  "Pamela Youde Nethersole Eastern Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100141"), cluster: ClusterType.HongKongEast, address: "3 Lok Man Road, Chai Wan, HK", telephone: "2595 6111", fax: "2515 0794", email: "pyneh_enquiry@ha.org.hk", website: "https://hkec.ha.org.hk/pyneh/internet/index.html", googleMapsLink: "https://maps.app.goo.gl/3YtnhmSvJBKjR9hXA"},
  "Queen Elizabeth Hospital": {region: Region.Kowloon, link: buildHospitalLink("100149"), cluster: ClusterType.KowloonCentral, address: "30 Gascoigne Road, KLN", telephone: "3506 8888", fax: "3506 8951", email: "qeh_webmaster@ha.org.hk", website: "https://www3.ha.org.hk/qeh/eng/main/index.htm", googleMapsLink: "https://maps.app.goo.gl/JsNZun7L3ouTaiU66"},
  "Queen Mary Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100131"), cluster: ClusterType.HongKongWest, address: "102 Pokfulam Road, HK", telephone: "2255 3838", fax: "2817 5496", email: "qmh_enquiry@ha.org.hk", website: "https://www8.ha.org.hk/qmh/", googleMapsLink: "https://maps.app.goo.gl/hpzFxt3hmGr7RDHQ7"},
  "Ruttonjee Hospital": {region: Region.HongKongIsland, link: buildHospitalLink("100144"), cluster: ClusterType.HongKongEast, address: "266 Queen's Road East, Wan Chai, HK", telephone: "2291 2000", fax: "2591 6886", email: "rtskh_enquiry@ha.org.hk", website: "https://www3.ha.org.hk/rtskh/eng/welcome_eng.html", googleMapsLink: "https://maps.app.goo.gl/LEFkUDTTk2cEY6YU9"},
  "St John Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100146"), cluster: ClusterType.HongKongEast, address: "Cheung Chau Hospital Road, Tung Wan, Cheung Chau", telephone: "2986 2100", fax: "2981 9050", email: "sjh_enquiry@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/8t2jw4ixHnY39Uw77"},
  "Tseung Kwan O Hospital": {region: Region.NewTerritories, link: buildHospitalLink("101326"), cluster: ClusterType.KowloonEast, address: "No. 2 Po Ning Lane, Hang Hau, Tseung Kwan O", telephone: "2208 0111", fax: "2177 0161", email: "tkoh.enquiry@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/yWfbcF4bKkMAWt8p7"},
  "Tuen Mun Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100173"), cluster: ClusterType.NewTerritoriesWest, address: "23 Tsing Chung Koon Road, Tuen Mun, NT", telephone: "2468 5111", fax: "2455 1911", email: "ntwc.pa@ha.org.hk", website: "https://www3.ha.org.hk/tmh/en/Default.asp", googleMapsLink: "https://maps.app.goo.gl/LPBHVjFb75Fzguwv8"},
  "Tin Shui Wai Hospital": {region: Region.NewTerritories, link: buildHospitalLink("235909"), cluster: ClusterType.NewTerritoriesWest, address: "11 Tin Tan Street, Tin Shui Wai, NT", telephone: "3513 5000", fax: "3514 9129", email: "tswh.service@ha.org.hk", website: "https://www3.ha.org.hk/tswh/en/Default.asp", googleMapsLink: "https://maps.app.goo.gl/R8bU1W6uLPyTqmqs6"},
  "United Christian Hospital": {region: Region.Kowloon, link: buildHospitalLink("100156"), cluster: ClusterType.KowloonEast, address: "130 Hip Wo Street, Kwun Tong, KLN", telephone: "2379 9611", fax: "2772 7098", email: "uch.enquiry@ha.org.hk", website: "https://kec.ha.org.hk/uch/en/index.html", googleMapsLink: "https://maps.app.goo.gl/vskcgrVTHMfMakd98"},
  "Yan Chai Hospital": {region: Region.NewTerritories, link: buildHospitalLink("100165"), cluster: ClusterType.KowloonWest, address: "7-11 Yan Chai Street, Tsuen Wan, NT", telephone: "2417 8383", fax: "2414 8562", email: "ych.enquiry@ha.org.hk", googleMapsLink: "https://maps.app.goo.gl/VHyiYm5DR1hxj77t8"},
};

export type HospitalNames = keyof typeof hospitalDetails;

// Hospital information using a Map for case-insensitive access
export const hospitals = new Map<string, HospitalInformationInterface>(
  Object.entries(hospitalDetails)
);

// Utility function to get hospital information by name, case-insensitively
export function getHospitalInformation(hospitalName: string): HospitalInformationInterface | undefined {
  const normalizedKey = Array.from(hospitals.keys()).find(key => key.toUpperCase() === hospitalName.toUpperCase());
  return normalizedKey ? hospitals.get(normalizedKey) : undefined;
}