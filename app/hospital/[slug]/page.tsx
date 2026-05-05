import { getWaitTimes } from "@/app/actions/waits"
import HospitalPageContent from "@/components/HospitalPage/HospitalPageContent"
import { hospitals } from "@/data/hospitals"
import { EnrichedHospitalData, ManagementStatus } from "@/types"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return Object.keys(hospitals).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const hospital = hospitals[slug]
    if (!hospital) return {}
    return {
        title: `${hospital.name.en} | A&E Wait Times`,
        description: `Current A&E wait times and trend data for ${hospital.name.en} in Hong Kong.`,
    }
}

const nullWaitTimes: EnrichedHospitalData["waitTimes"] = {
    criticalMinutes: null,
    emergencyMinutes: null,
    urgentP50Minutes: null,
    urgentP95Minutes: null,
    semiUrgentNonUrgentP50Minutes: null,
    semiUrgentNonUrgentP95Minutes: null,
}

export default async function HospitalPage({ params }: PageProps) {
    const { slug } = await params
    const hospital = hospitals[slug]

    if (!hospital) {
        notFound()
    }

    let enrichedHospital: EnrichedHospitalData = {
        ...hospital,
        slug,
        criticalManagementStatus: ManagementStatus.NotManaging,
        emergencyManagementStatus: ManagementStatus.NotManaging,
        waitTimes: nullWaitTimes,
    }

    try {
        const { waitTimes } = await getWaitTimes()
        const liveData = waitTimes.find((h) => h.hospitalSlug === slug)
        if (liveData) {
            enrichedHospital = {
                ...hospital,
                slug,
                criticalManagementStatus: liveData.criticalManagementStatus,
                emergencyManagementStatus: liveData.emergencyManagementStatus,
                waitTimes: liveData.waitTimes,
            }
        }
    } catch {
        // Render with null wait times if API is unavailable
    }

    return <HospitalPageContent hospital={enrichedHospital} />
}
