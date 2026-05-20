import { AlternativeDetailContent } from "@/components/Alternatives/AlternativeDetailContent"
import {
    alternativesBySlug,
    getSlugs,
    isPhysicalFacility,
    isTelehealthFacility,
} from "@/data/alternatives"
import { primaryPhone, primaryWebsite } from "@/lib/alternatives/display"
import { getPrimaryChannel, resolveCurrentPrice } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import { LanguageCode } from "@/types"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const entry = alternativesBySlug[slug]
    if (!entry) return {}

    const pageUrl = `https://ae.wait.hk/alternatives/${slug}`
    const channel = getPrimaryChannel(entry, scheduleContext())
    const price = channel ? resolveCurrentPrice(channel, scheduleContext()) : null
    const priceSnippet = price?.label[LanguageCode.EN] ?? ""

    let description = ""
    if (isPhysicalFacility(entry)) {
        description = `${entry.name[LanguageCode.EN]} is a ${entry.providerType.toLowerCase()} in ${entry.location.district}, Hong Kong.${priceSnippet ? ` ${priceSnippet}.` : ""}`
    } else if (isTelehealthFacility(entry)) {
        description =
            entry.description?.[LanguageCode.EN]?.slice(0, 160) ??
            `${entry.name[LanguageCode.EN]} telehealth in Hong Kong.`
    }

    const keywords = [
        entry.name[LanguageCode.EN],
        entry.name[LanguageCode.ZH],
        isPhysicalFacility(entry) ? entry.location.district : undefined,
        isPhysicalFacility(entry) ? entry.providerType : "telehealth",
        "Hong Kong",
        "alternative care",
        "clinic",
    ].filter(Boolean) as string[]

    return {
        title: `${entry.name[LanguageCode.EN]} | Alternative Care in Hong Kong`,
        description,
        keywords,
        alternates: { canonical: pageUrl },
        openGraph: {
            title: `${entry.name[LanguageCode.EN]} | Alternative Care in Hong Kong`,
            description,
            url: pageUrl,
            images: [{ url: "https://ae.wait.hk/og-image.png", width: 1200, height: 630 }],
            type: "website",
        },
    }
}

export default async function AlternativeDetailPage({ params }: PageProps) {
    const { slug } = await params
    const entry = alternativesBySlug[slug]

    if (!entry) {
        notFound()
    }

    const pageUrl = `https://ae.wait.hk/alternatives/${slug}`
    const phone = primaryPhone(entry.contacts)
    const website = primaryWebsite(entry.contacts)

    const facilitySchema = isPhysicalFacility(entry)
        ? {
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: entry.name[LanguageCode.EN],
              alternateName: entry.name[LanguageCode.ZH],
              address: {
                  "@type": "PostalAddress",
                  streetAddress: entry.location.address[LanguageCode.EN],
                  addressLocality: entry.location.district,
                  addressCountry: "HK",
              },
              geo: {
                  "@type": "GeoCoordinates",
                  latitude: entry.location.coordinates.latitude,
                  longitude: entry.location.coordinates.longitude,
              },
              ...(phone ? { telephone: phone } : {}),
              ...(website ? { url: website } : {}),
              ...(entry.category === "24hour"
                  ? { openingHours: "Mo-Su 00:00-24:00" }
                  : {}),
              medicalSpecialty: "GeneralPractice",
          }
        : {
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: entry.name[LanguageCode.EN],
              alternateName: entry.name[LanguageCode.ZH],
              description: entry.description?.[LanguageCode.EN],
              ...(website ? { url: website } : {}),
              availableService: {
                  "@type": "MedicalTherapy",
                  name: "Video Consultation",
              },
          }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ae.wait.hk" },
            {
                "@type": "ListItem",
                position: 2,
                name: "Alternative Care Options",
                item: "https://ae.wait.hk/alternatives",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: entry.name[LanguageCode.EN],
                item: pageUrl,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitySchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AlternativeDetailContent entry={entry} />
        </>
    )
}
