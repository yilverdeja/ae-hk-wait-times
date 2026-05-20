import { i18n } from "@/lib/i18n"
import { LanguageCode, type LocalizedString } from "@/types"
import type { FacilityId, FacilityTag } from "@/types/alternatives"

export const FACILITY_CATALOG: Record<FacilityId, LocalizedString> = {
    xray: i18n("X-Ray", "X光"),
    pharmacy: i18n("Pharmacy", "藥房"),
    laboratory: i18n("Laboratory", "化驗"),
    ecg: i18n("ECG", "心電圖"),
    ct_scanner: i18n("CT Scanner", "電腦掃描"),
    mri: i18n("MRI", "磁力共振"),
    ultrasound: i18n("Ultrasound", "超聲波"),
    endoscopy: i18n("Endoscopy", "內視鏡"),
    physiotherapy: i18n("Physiotherapy", "物理治療"),
    dietetics: i18n("Dietetics", "營養諮詢"),
    gp_consultation: i18n("General consultation", "普通科診症"),
    chronic_disease: i18n("Chronic disease management", "慢性疾病管理"),
    nursing: i18n("Nursing services", "護理服務"),
    patient_education: i18n("Patient education", "病人教育"),
    resuscitation: i18n("Resuscitation", "復甦設備"),
    observation_beds: i18n("Observation beds", "觀察病床"),
}

export function localizedFacilityTag(tag: FacilityTag, lang: LanguageCode): string {
    if ("id" in tag) {
        return FACILITY_CATALOG[tag.id][lang]
    }
    return tag.custom[lang]
}

export function facility(id: FacilityId): FacilityTag {
    return { id }
}

export function customFacility(en: string, zh: string, cn?: string): FacilityTag {
    return { custom: i18n(en, zh, cn) }
}
