import { AlternativesDirectoryView } from "@/components/Alternatives/AlternativesDirectoryView"
import { alternatives } from "@/data/alternatives"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Alternative Care Options in Hong Kong | ae.wait.hk",
    description:
        "Find 24-hour private hospitals, general outpatient clinics (GOPC), and telehealth services in Hong Kong as alternatives to public A&E departments. Compare fees, hours, and locations.",
    keywords: [
        "24 hour clinic Hong Kong",
        "private hospital Hong Kong",
        "telehealth Hong Kong",
        "GOPC Hong Kong",
        "general outpatient clinic Hong Kong",
        "online doctor Hong Kong",
        "alternative to A&E Hong Kong",
        "private outpatient Hong Kong",
        "video consultation Hong Kong",
    ],
    alternates: { canonical: "https://ae.wait.hk/alternatives" },
    openGraph: {
        title: "Alternative Care Options in Hong Kong",
        description:
            "Find 24-hour hospitals, outpatient clinics, and telehealth services instead of waiting at A&E.",
        url: "https://ae.wait.hk/alternatives",
        images: [{ url: "https://ae.wait.hk/og-image.png", width: 1200, height: 630 }],
        type: "website",
    },
}

export default function AlternativesPage() {
    const pageUrl = "https://ae.wait.hk/alternatives"

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Alternative Care Options in Hong Kong",
        description:
            "24-hour hospitals, outpatient clinics, and telehealth services as alternatives to public A&E in Hong Kong.",
        url: pageUrl,
        numberOfItems: alternatives.length,
        itemListElement: alternatives.map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.name.en,
            url: `https://ae.wait.hk/alternatives/${entry.slug}`,
        })),
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ae.wait.hk" },
            { "@type": "ListItem", position: 2, name: "Alternative Care Options", item: pageUrl },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Alternative Care Options
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Considering alternatives to A&amp;E? Browse 24-hour private hospitals,
                        government outpatient clinics (GOPC), and telehealth services available in
                        Hong Kong.
                    </p>
                </div>
                <AlternativesDirectoryView alternatives={alternatives} />
            </div>
        </>
    )
}
