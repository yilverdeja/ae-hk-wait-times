interface HospitalInformation {
    region: "HONG KONG ISLAND" | "KOWLOON" | "NEW TERRITORIES";
    link: string;
}

export const hospitalNames = [
    "Alice Ho Miu Ling Nethersole Hospital",
    "Caritas Medical Centre",
    "Kwong Wah Hospital",
    "North District Hospital",
    "North Lantau Hospital",
    "Princess Margaret Hospital",
    "Pok Oi Hospital",
    "Prince of Wales Hospital",
    "Pamela Youde Nethersole Eastern Hospital",
    "Queen Elizabeth Hospital",
    "Queen Mary Hospital",
    "Ruttonjee Hospital",
    "St John Hospital",
    "Tseung Kwan O Hospital",
    "Tuen Mun Hospital",
    "Tin Shui Wai Hospital",
    "United Christian Hospital",
    "Yan Chai Hospital",
  ];

export const hospitals: Record<string, HospitalInformation> = {
    "ALICE HO MIU LING NETHERSOLE HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100171&Lang=ENG&Dimension=100&Parent_ID=10180",
    },
    "CARITAS MEDICAL CENTRE": {
      region: "KOWLOON",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100163&Lang=ENG&Dimension=100&Parent_ID=10179",
    },
    "KWONG WAH HOSPITAL": {
      region: "KOWLOON",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100153&Lang=ENG&Dimension=100&Parent_ID=10179",
    },
    "NORTH DISTRICT HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100178&Lang=ENG&Dimension=100&Parent_ID=10180",
    },
    "NORTH LANTAU HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=216546&Lang=ENG&Dimension=100&Parent_ID=10179",
    },
    "PRINCESS MARGARET HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100160&Lang=ENG&Dimension=100&Parent_ID=10179",
    },
    "POK OI HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100174&Lang=ENG&Dimension=100&Parent_ID=10181",
    },
    "PRINCE OF WALES HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100166&Lang=ENG&Dimension=100&Parent_ID=10180",
    },
    "PAMELA YOUDE NETHERSOLE EASTERN HOSPITAL": {
      region: "HONG KONG ISLAND",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100141&Lang=ENG&Dimension=100&Parent_ID=10175",
    },
    "QUEEN ELIZABETH HOSPITAL": {
      region: "KOWLOON",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100149&Lang=ENG&Dimension=100&Parent_ID=10177",
    },
    "QUEEN MARY HOSPITAL": {
      region: "HONG KONG ISLAND",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100131&Lang=ENG&Dimension=100&Parent_ID=10176",
    },
    "RUTTONJEE HOSPITAL": {
      region: "HONG KONG ISLAND",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100144&Lang=ENG&Dimension=100&Parent_ID=10175",
    },
    "ST JOHN HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100146&Lang=ENG&Dimension=100&Parent_ID=10175",
    },
    "TSEUNG KWAN O HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=101326&Lang=ENG&Dimension=100&Parent_ID=10178",
    },
    "TUEN MUN HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100173&Lang=ENG&Dimension=100&Parent_ID=10181",
    },
    "TIN SHUI WAI HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=235909&Lang=ENG&Dimension=100&Parent_ID=10181",
    },
    "UNITED CHRISTIAN HOSPITAL": {
      region: "KOWLOON",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100156&Lang=ENG&Dimension=100&Parent_ID=10178",
    },
    "YAN CHAI HOSPITAL": {
      region: "NEW TERRITORIES",
      link: "http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=100165&Lang=ENG&Dimension=100&Parent_ID=10179",
    },
  };