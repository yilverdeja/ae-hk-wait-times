export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const LANGUAGE = "ENG";
export const buildHospitalLink = (contentId: string): string =>
  `http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${contentId}&Lang=${LANGUAGE}`;
