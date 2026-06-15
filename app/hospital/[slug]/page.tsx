import { getWaitTimes } from "@/app/actions/waits"
import HospitalPageContent from "@/components/HospitalPage/HospitalPageContent"
import { hospitals } from "@/data/hospitals"
import {
    hospitalPageDescription,
    hospitalPageTitle,
    hospitalPageUrl,
} from "@/lib/seo-metadata"
import { EnrichedHospitalData, ManagementStatus } from "@/types"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return Object.keys(hospitals).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug: rawSlug } = await params
    const slug = rawSlug.toUpperCase()
    const hospital = hospitals[slug]
    if (!hospital) return {}
    const pageUrl = hospitalPageUrl(slug)
    const description = hospitalPageDescription(hospital, slug)
    return {
        title: { absolute: hospitalPageTitle(hospital) },
        description,
        keywords: [
            hospital.name.en,
            hospital.name.zh,
            hospital.name.cn,
            hospital.region,
            "A&E",
            "accident and emergency",
            "wait time",
            "waiting time",
            "Hong Kong",
            "emergency room",
            "hospital",
        ],
        alternates: { canonical: pageUrl },
        openGraph: {
            title: { absolute: hospitalPageTitle(hospital) },
            description,
            url: pageUrl,
            images: [
                {
                    url: "https://ae.wait.hk/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: `${hospital.name.en} A&E Wait Times`,
                },
            ],
            type: "website",
        },
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
    const { slug: rawSlug } = await params
    const slug = rawSlug.toUpperCase()
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

    let lastUpdated: string | null = null

    try {
        const { waitTimes, lastUpdated: updated } = await getWaitTimes()
        lastUpdated = updated
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

    const pageUrl = hospitalPageUrl(slug)
    const haProfileUrl = `https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=${hospital.linkId}`

    const hospitalSchema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        name: hospital.name.en,
        telephone: hospital.telephone,
        email: hospital.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: hospital.address.en,
            addressRegion: hospital.region,
            addressCountry: "HK",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: hospital.coordinates.latitude,
            longitude: hospital.coordinates.longitude,
        },
        hasMap: hospital.googleMapsLink,
        url: hospital.website ?? haProfileUrl,
        sameAs: [haProfileUrl, ...(hospital.website ? [hospital.website] : [])],
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ae.wait.hk" },
            {
                "@type": "ListItem",
                position: 2,
                name: "All Hospitals",
                item: "https://ae.wait.hk/hospitals",
            },
            { "@type": "ListItem", position: 3, name: hospital.name.en, item: pageUrl },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <HospitalPageContent
                hospital={enrichedHospital}
                lastUpdated={lastUpdated}
            />
        </>
    )
}
