import { LanguageCode, LocalizedString } from '@/types';

/**
 * A helper function to create a LocalizedString object more concisely.
 * It reduces repetition by defaulting the Simplified Chinese ('cn') translation
 * to the Traditional Chinese ('zh') value if it's not explicitly provided.
 *
 * @param en The English translation.
 * @param zh The Traditional Chinese translation.
 * @param cn The optional Simplified Chinese translation.
 * @returns A complete LocalizedString object.
 *
 * @example
 * // When 'cn' is the same as 'zh'
 * i18n('Hospital', '醫院')
 * // Returns: { en: 'Hospital', zh: '醫院', cn: '醫院' }
 *
 * // When 'cn' is different
 * i18n('Queen', '皇后', '女王')
 * // Returns: { en: 'Queen', zh: '皇后', cn: '女王' }
 */
export const i18n = (en: string, zh: string, cn?: string): LocalizedString => {
  return {
    [LanguageCode.EN]: en,
    [LanguageCode.ZH]: zh,
    [LanguageCode.CN]: cn ?? zh, // Use 'cn' if provided, otherwise default to 'zh'
  };
};