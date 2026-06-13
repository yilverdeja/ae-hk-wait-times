import FaqPageContent from "@/components/Faq/FaqPageContent"
import { getFaqJsonLd } from "@/lib/faq-schema"
import { Metadata } from "next"

const baseUrl = "https://ae.wait.hk"

export const metadata: Metadata = {
    title: "Hong Kong A&E FAQ | Wait Times, Triage & Fees (HK$400)",
    description:
        "Frequently asked questions about Hong Kong public hospital A&E wait times, triage categories, 95th percentile data, HK$400 fees (2026), and how this site uses Hospital Authority open data. 香港急症室常見問題",
    keywords: [
        "A&E FAQ",
        "Hong Kong emergency wait time",
        "A&E triage",
        "A&E fee HK$400",
        "香港急症室",
        "急症室收費",
        "急诊室收费",
    ],
    alternates: { canonical: `${baseUrl}/faq` },
    openGraph: {
        title: "Hong Kong A&E FAQ | Wait Times, Triage & Fees",
        description:
            "FAQ on Hong Kong public A&E wait times, triage, fees, and data sources.",
        url: `${baseUrl}/faq`,
        images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
        type: "website",
    },
}

export default function FaqPage() {
    const faqSchema = getFaqJsonLd()
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            {
                "@type": "ListItem",
                position: 2,
                name: "FAQ",
                item: `${baseUrl}/faq`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <FaqPageContent />
        </>
    )
}
