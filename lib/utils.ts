import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { LanguageCode } from '@/types';

/**
 * Maps our internal, clean language codes to the specific codes required
 * by the external HA (Hospital Authority) API URL. This decouples our app's
 * i18n logic from the external API's implementation details.
 */
const HA_LANGUAGE_MAP: Record<LanguageCode, string> = {
  [LanguageCode.EN]: 'ENG',
  [LanguageCode.ZH]: 'CHIB5',
  [LanguageCode.CN]: 'CHIGB',
};

/**
 * Constructs the specific URL for a hospital's page on the HA website.
 * @param contentId The unique ID for the hospital (from our hospital data).
 * @param lang The desired language for the page.
 * @returns A fully formed URL string.
 */
export const buildHospitalLink = (
  contentId: string,
  lang: LanguageCode = LanguageCode.EN
): string => {
  const apiLangCode = HA_LANGUAGE_MAP[lang];
  return `http://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${contentId}&Lang=${apiLangCode}`;
};