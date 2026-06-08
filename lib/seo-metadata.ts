import { Hospital } from "@/types"

const baseUrl = "https://ae.wait.hk"

export function hospitalPageTitle(hospital: Hospital) {
    return `${hospital.name.en} A&E Wait Times | ${hospital.name.zh} | Hong Kong`
}

export function hospitalPageDescription(hospital: Hospital, slug: string) {
    return `Real-time A&E wait times for ${hospital.name.en} (${hospital.name.zh}) in ${hospital.region}, Hong Kong. Updated every 15 minutes. ${baseUrl}/hospital/${slug}`
}

export function hospitalPageUrl(slug: string) {
    return `${baseUrl}/hospital/${slug}`
}
