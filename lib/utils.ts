import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentYear = () => new Date().getFullYear();

export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const LANGUAGE = "ENG";

export const buildHospitalLink = (contentId: string): string =>
  `http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${contentId}&Lang=${LANGUAGE}`;
