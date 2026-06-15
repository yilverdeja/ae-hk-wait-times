import HospitalsDirectoryContent, {
    HospitalsByRegion,
} from "@/components/HospitalsDirectory/HospitalsDirectoryContent"
import { hospitals } from "@/data/hospitals"
import { Region } from "@/types"
import { Metadata } from "next"

const baseUrl = "https://ae.wait.hk"

export const metadata: Metadata = {
    title: "All Hong Kong A&E Hospitals | Wait Times Directory",
    description:
        "Directory of all 18 public Hospital Authority A&E departments in Hong Kong. Browse by region and view live wait times, trends, and contact details for each hospital.",
    alternates: { canonical: `${baseUrl}/hospitals` },
    openGraph: {
        title: "All Hong Kong A&E Hospitals | Wait Times Directory",
        description:
            "Directory of all 18 public Hospital Authority A&E departments in Hong Kong, grouped by region.",
        url: `${baseUrl}/hospitals`,
        images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
        type: "website",
    },
}

function buildHospitalsByRegion(): HospitalsByRegion {
    const grouped: HospitalsByRegion = {
        [Region.HongKongIsland]: [],
        [Region.Kowloon]: [],
        [Region.NewTerritories]: [],
    }

    for (const [slug, hospital] of Object.entries(hospitals)) {
        grouped[hospital.region].push({
            slug,
            name: hospital.name,
        })
    }

    for (const region of Object.values(Region)) {
        grouped[region].sort((a, b) => a.name.en.localeCompare(b.name.en))
    }

    return grouped
}

export default function HospitalsPage() {
    const hospitalsByRegion = buildHospitalsByRegion()

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Hong Kong A&E Hospitals",
        numberOfItems: Object.keys(hospitals).length,
        itemListElement: Object.entries(hospitals).map(([slug, hospital], index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: hospital.name.en,
            url: `${baseUrl}/hospital/${slug}`,
        })),
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            {
                "@type": "ListItem",
                position: 2,
                name: "All Hospitals",
                item: `${baseUrl}/hospitals`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <HospitalsDirectoryContent hospitalsByRegion={hospitalsByRegion} />
        </>
    )
}
