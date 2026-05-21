import type { Alternative, PhysicalAlternative } from "@/types/alternatives"

import { adventistHospitalStubbsRoad } from "./entries/adventist-hospital-stubbs-road"
import { adventistHospitalTsuenWan } from "./entries/adventist-hospital-tsuen-wan"
import { axaTelehealth } from "./entries/axa-telehealth"
import { baptistHospital } from "./entries/baptist-hospital"
import { bupaTelehealth } from "./entries/bupa-telehealth"
import { canossaHospital } from "./entries/canossa-hospital"
import { cuhkMedicalCentre } from "./entries/cuhk-medical-centre"
import { drgoTelehealth } from "./entries/drgo-telehealth"
import { gleneaglesHospitalHk } from "./entries/gleneagles-hospital-hk"
import { gopcCentral } from "./entries/gopc-central"
import { hkSanatorium } from "./entries/hk-sanatorium"
import { matildaHospital } from "./entries/matilda-hospital"
import { preciousBloodHospital } from "./entries/precious-blood-hospital"
import { stPaulsHospital } from "./entries/st-pauls-hospital"
import { stTeresasHospital } from "./entries/st-teresas-hospital"
import { unionHospital } from "./entries/union-hospital"

// --- Auto-generated (needs review) ---
import { bowtiegoTelehealth } from "./entries/bowtiego-telehealth"
import { cignaTelehealth } from "./entries/cigna-telehealth"
import { cuhkmcTelehealth } from "./entries/cuhkmc-telehealth"
import { doctornowTelehealth } from "./entries/doctornow-telehealth"
import { evangelHospital } from "./entries/evangel-hospital"
import { evangelPsychCentre } from "./entries/evangel-psych-centre"
import { evangelShaTin } from "./entries/evangel-sha-tin"
import { gleneaglesHospitalTelehealth } from "./entries/gleneagles-hospital-telehealth"
import { gopcAberdeen } from "./entries/gopc-aberdeen"
import { gopcAnneBlack } from "./entries/gopc-anne-black"
import { gopcApLeiChau } from "./entries/gopc-ap-lei-chau"
import { gopcChaiWan } from "./entries/gopc-chai-wan"
import { gopcLekYuen } from "./entries/gopc-lek-yuen"
import { gopcMaOnShan } from "./entries/gopc-ma-on-shan"
import { gopcMonaFong } from "./entries/gopc-mona-fong"
import { gopcSaiWanHo } from "./entries/gopc-sai-wan-ho"
import { gopcShauKeiWanJockeyClub } from "./entries/gopc-shau-kei-wan-jockey-club"
import { gopcStanley } from "./entries/gopc-stanley"
import { gopcTaiWai } from "./entries/gopc-tai-wai"
import { gopcTkoJockeyClub } from "./entries/gopc-tko-jockey-club"
import { gopcTkoPoNingRoad } from "./entries/gopc-tko-po-ning-road"
import { gopcWanTsuiEstate } from "./entries/gopc-wan-tsui-estate"
import { haGoTelehealth } from "./entries/ha-go-telehealth"
import { hkahTelehealth } from "./entries/hkah-telehealth"
import { hkshTelehealth } from "./entries/hksh-telehealth"
import { nightClinicNgauTauKok } from "./entries/night-clinic-ngau-tau-kok"
import { nightClinicTaiPo } from "./entries/night-clinic-tai-po"
import { otandpTelehealth } from "./entries/otandp-telehealth"
import { otpHealthcareCentral } from "./entries/otp-healthcare-central"
import { otpHealthcareClearwaterBay } from "./entries/otp-healthcare-clearwater-bay"
import { otpHealthcareRepulseBay } from "./entries/otp-healthcare-repulse-bay"
import { pbhTelehealth } from "./entries/pbh-telehealth"
import { qhmsTelehealth } from "./entries/qhms-telehealth"
import { townHealthTaiWai } from "./entries/town-health-tai-wai"
import { umpTelehealth } from "./entries/ump-telehealth"
import { watsonsEdrTelehealth } from "./entries/watsons-edr-telehealth"

// --- Reviewed ---
const reviewedAlternatives: Alternative[] = [
    adventistHospitalStubbsRoad,
    adventistHospitalTsuenWan,
    axaTelehealth,
    bupaTelehealth,
    baptistHospital,
    canossaHospital,
    cuhkMedicalCentre,
    drgoTelehealth,
    gleneaglesHospitalHk,
    gopcCentral,
    hkSanatorium,
    matildaHospital,
    preciousBloodHospital,
    stPaulsHospital,
    stTeresasHospital,
    unionHospital,
]

// --- Auto-generated (needs review) ---
const generatedAlternatives: Alternative[] = [
    bowtiegoTelehealth,
    cignaTelehealth,
    cuhkmcTelehealth,
    doctornowTelehealth,
    evangelHospital,
    evangelPsychCentre,
    evangelShaTin,
    gleneaglesHospitalTelehealth,
    gopcAberdeen,
    gopcAnneBlack,
    gopcApLeiChau,
    gopcChaiWan,
    gopcLekYuen,
    gopcMaOnShan,
    gopcMonaFong,
    gopcSaiWanHo,
    gopcShauKeiWanJockeyClub,
    gopcStanley,
    gopcTaiWai,
    gopcTkoJockeyClub,
    gopcTkoPoNingRoad,
    gopcWanTsuiEstate,
    haGoTelehealth,
    hkahTelehealth,
    hkshTelehealth,
    nightClinicNgauTauKok,
    nightClinicTaiPo,
    otandpTelehealth,
    otpHealthcareCentral,
    otpHealthcareClearwaterBay,
    otpHealthcareRepulseBay,
    pbhTelehealth,
    qhmsTelehealth,
    townHealthTaiWai,
    umpTelehealth,
    watsonsEdrTelehealth,
]

export const alternatives: Alternative[] = [...reviewedAlternatives, ...generatedAlternatives]

export const alternativesBySlug: Record<string, Alternative> = Object.fromEntries(
    alternatives.map((a) => [a.slug, a])
)

export const alternatives24Hour: PhysicalAlternative[] = alternatives.filter(
    (a): a is PhysicalAlternative => a.category === "24hour"
)

export function getAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug)
}
