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
import { gopcCaritasMedicalCentre } from "./entries/gopc-caritas-medical-centre"
import { gopcCentralKowloon } from "./entries/gopc-central-kowloon"
import { gopcChaiWan } from "./entries/gopc-chai-wan"
import { gopcCheungShaWanJockeyClub } from "./entries/gopc-cheung-sha-wan-jockey-club"
import { gopcEastKowloon } from "./entries/gopc-east-kowloon"
import { gopcFanling } from "./entries/gopc-fanling"
import { gopcHaKwaiChung } from "./entries/gopc-ha-kwai-chung"
import { gopcHongKongBuddhistHospital } from "./entries/gopc-hong-kong-buddhist-hospital"
import { gopcHungHom } from "./entries/gopc-hung-hom"
import { gopcKamTin } from "./entries/gopc-kam-tin"
import { gopcKennedyTownJockeyClub } from "./entries/gopc-kennedy-town-jockey-club"
import { gopcKowloonBay } from "./entries/gopc-kowloon-bay"
import { gopcKowloonCityLeeKeeMemorial } from "./entries/gopc-kowloon-city-lee-kee-memorial"
import { gopcKwaiChungMrsWuYorkYu } from "./entries/gopc-kwai-chung-mrs-wu-york-yu"
import { gopcKwongWahHospital } from "./entries/gopc-kwong-wah-hospital"
import { gopcKwunTong } from "./entries/gopc-kwun-tong"
import { gopcLamTin } from "./entries/gopc-lam-tin"
import { gopcLekYuen } from "./entries/gopc-lek-yuen"
import { gopcMaOnShan } from "./entries/gopc-ma-on-shan"
import { gopcMonaFong } from "./entries/gopc-mona-fong"
import { gopcMongKokLiPoChun } from "./entries/gopc-mong-kok-li-po-chun"
import { gopcMuiWo } from "./entries/gopc-mui-wo"
import { gopcNamCheong } from "./entries/gopc-nam-cheong"
import { gopcNamShan } from "./entries/gopc-nam-shan"
import { gopcNgauTauKokJockeyClub } from "./entries/gopc-ngau-tau-kok-jockey-club"
import { gopcNorthDistrict } from "./entries/gopc-north-district"
import { gopcNorthKwaiChung } from "./entries/gopc-north-kwai-chung"
import { gopcNorthLamma } from "./entries/gopc-north-lamma"
import { gopcNorthLantau } from "./entries/gopc-north-lantau"
import { gopcOurLadyOfMaryknollHospital } from "./entries/gopc-our-lady-of-maryknoll-hospital"
import { gopcPengChau } from "./entries/gopc-peng-chau"
import { gopcSaiWanHo } from "./entries/gopc-sai-wan-ho"
import { gopcSaiYingPunJockeyClub } from "./entries/gopc-sai-ying-pun-jockey-club"
import { gopcSanPoKongRobertBlack } from "./entries/gopc-san-po-kong-robert-black"
import { gopcShaTauKok } from "./entries/gopc-sha-tau-kok"
import { gopcShauKeiWanJockeyClub } from "./entries/gopc-shau-kei-wan-jockey-club"
import { gopcShekKipMei } from "./entries/gopc-shek-kip-mei"
import { gopcShunLee } from "./entries/gopc-shun-lee"
import { gopcSokKwuWan } from "./entries/gopc-sok-kwu-wan"
import { gopcSouthKwaiChungJockeyClub } from "./entries/gopc-south-kwai-chung-jockey-club"
import { gopcStJohnHospital } from "./entries/gopc-st-john-hospital"
import { gopcStanley } from "./entries/gopc-stanley"
import { gopcTaKwuLing } from "./entries/gopc-ta-kwu-ling"
import { gopcTaiOJockeyClub } from "./entries/gopc-tai-o-jockey-club"
import { gopcTaiPoJockeyClub } from "./entries/gopc-tai-po-jockey-club"
import { gopcTaiPoWongSiuChing } from "./entries/gopc-tai-po-wong-siu-ching"
import { gopcTaiWai } from "./entries/gopc-tai-wai"
import { gopcTinShuiWai } from "./entries/gopc-tin-shui-wai"
import { gopcTkoJockeyClub } from "./entries/gopc-tko-jockey-club"
import { gopcTkoPoNingRoad } from "./entries/gopc-tko-po-ning-road"
import { gopcToKwaWanShunTakFraternalAssociationLeungKauKui } from "./entries/gopc-to-kwa-wan-shun-tak-fraternal-association-leung-kau-kui"
import { gopcTseungKwanOSouth } from "./entries/gopc-tseung-kwan-o-south"
import { gopcTsingYiCheungHong } from "./entries/gopc-tsing-yi-cheung-hong"
import { gopcTsingYiTown } from "./entries/gopc-tsing-yi-town"
import { gopcTsuenWanLadyTrench } from "./entries/gopc-tsuen-wan-lady-trench"
import { gopcTszWanShanWuYorkYu } from "./entries/gopc-tsz-wan-shan-wu-york-yu"
import { gopcTuenMun } from "./entries/gopc-tuen-mun"
import { gopcTuenMunWuHong } from "./entries/gopc-tuen-mun-wu-hong"
import { gopcTuenMunYanOi } from "./entries/gopc-tuen-mun-yan-oi"
import { gopcTungWahEasternHospital } from "./entries/gopc-tung-wah-eastern-hospital"
import { gopcTungWahHospital } from "./entries/gopc-tung-wah-hospital"
import { gopcWanChaiVioletPeel } from "./entries/gopc-wan-chai-violet-peel"
import { gopcWanTsuiEstate } from "./entries/gopc-wan-tsui-estate"
import { gopcWangTauHomJockeyClub } from "./entries/gopc-wang-tau-hom-jockey-club"
import { gopcWestKowloon } from "./entries/gopc-west-kowloon"
import { gopcYanChaiHospital } from "./entries/gopc-yan-chai-hospital"
import { gopcYauMaTeiJockeyClub } from "./entries/gopc-yau-ma-tei-jockey-club"
import { gopcYuenChauKok } from "./entries/gopc-yuen-chau-kok"
import { gopcYuenLongJockeyClub } from "./entries/gopc-yuen-long-jockey-club"
import { gopcYuenLongMadamYungFungShee } from "./entries/gopc-yuen-long-madam-yung-fung-shee"
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
    baptistHospital,
    bupaTelehealth,
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
    gopcCaritasMedicalCentre,
    gopcCentralKowloon,
    gopcChaiWan,
    gopcCheungShaWanJockeyClub,
    gopcEastKowloon,
    gopcFanling,
    gopcHaKwaiChung,
    gopcHongKongBuddhistHospital,
    gopcHungHom,
    gopcKamTin,
    gopcKennedyTownJockeyClub,
    gopcKowloonBay,
    gopcKowloonCityLeeKeeMemorial,
    gopcKwaiChungMrsWuYorkYu,
    gopcKwongWahHospital,
    gopcKwunTong,
    gopcLamTin,
    gopcLekYuen,
    gopcMaOnShan,
    gopcMonaFong,
    gopcMongKokLiPoChun,
    gopcMuiWo,
    gopcNamCheong,
    gopcNamShan,
    gopcNgauTauKokJockeyClub,
    gopcNorthDistrict,
    gopcNorthKwaiChung,
    gopcNorthLamma,
    gopcNorthLantau,
    gopcOurLadyOfMaryknollHospital,
    gopcPengChau,
    gopcSaiWanHo,
    gopcSaiYingPunJockeyClub,
    gopcSanPoKongRobertBlack,
    gopcShaTauKok,
    gopcShauKeiWanJockeyClub,
    gopcShekKipMei,
    gopcShunLee,
    gopcSokKwuWan,
    gopcSouthKwaiChungJockeyClub,
    gopcStJohnHospital,
    gopcStanley,
    gopcTaKwuLing,
    gopcTaiOJockeyClub,
    gopcTaiPoJockeyClub,
    gopcTaiPoWongSiuChing,
    gopcTaiWai,
    gopcTinShuiWai,
    gopcTkoJockeyClub,
    gopcTkoPoNingRoad,
    gopcToKwaWanShunTakFraternalAssociationLeungKauKui,
    gopcTseungKwanOSouth,
    gopcTsingYiCheungHong,
    gopcTsingYiTown,
    gopcTsuenWanLadyTrench,
    gopcTszWanShanWuYorkYu,
    gopcTuenMun,
    gopcTuenMunWuHong,
    gopcTuenMunYanOi,
    gopcTungWahEasternHospital,
    gopcTungWahHospital,
    gopcWanChaiVioletPeel,
    gopcWanTsuiEstate,
    gopcWangTauHomJockeyClub,
    gopcWestKowloon,
    gopcYanChaiHospital,
    gopcYauMaTeiJockeyClub,
    gopcYuenChauKok,
    gopcYuenLongJockeyClub,
    gopcYuenLongMadamYungFungShee,
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
