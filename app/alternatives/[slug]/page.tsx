import { AlternativeDetailContent } from "@/components/Alternatives/AlternativeDetailContent"
import { alternativesBySlug, getSlugs, isPhysicalFacility, isTelehealthFacility } from "@/data/alternatives"
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
    let description = ""

    if (isPhysicalFacility(entry)) {
        description = `${entry.name.en} is a ${entry.type.toLowerCase()} in ${entry.district}, Hong Kong.${entry.baseConsultationFee ? ` Consultation fee: ${entry.baseConsultationFee.slice(0, 80)}.` : ""}`
    } else if (isTelehealthFacility(entry)) {
        description = entry.description.en.slice(0, 160)
    }

    const keywords = [
        entry.name.en,
        entry.name.zh ?? undefined,
        isPhysicalFacility(entry) ? entry.district : undefined,
        isPhysicalFacility(entry) ? entry.type : "telehealth",
        "Hong Kong",
        "alternative care",
        "clinic",
    ].filter(Boolean) as string[]

    return {
        title: `${entry.name.en} | Alternative Care in Hong Kong`,
        description,
        keywords,
        alternates: { canonical: pageUrl },
        openGraph: {
            title: `${entry.name.en} | Alternative Care in Hong Kong`,
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

    const facilitySchema = isPhysicalFacility(entry)
        ? {
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: entry.name.en,
              ...(entry.name.zh ? { alternateName: entry.name.zh } : {}),
              address: {
                  "@type": "PostalAddress",
                  streetAddress: entry.address.en,
                  addressLocality: entry.district,
                  addressCountry: "HK",
              },
              geo: {
                  "@type": "GeoCoordinates",
                  latitude: entry.coordinates.latitude,
                  longitude: entry.coordinates.longitude,
              },
              ...(entry.phone ? { telephone: entry.phone.split(" ")[0] } : {}),
              ...(entry.url ? { url: entry.url } : {}),
              ...(entry.baseConsultationFee
                  ? { priceRange: entry.baseConsultationFee.slice(0, 50) }
                  : {}),
              ...(entry.category === "24hour"
                  ? { openingHours: "Mo-Su 00:00-24:00" }
                  : {}),
              medicalSpecialty: "GeneralPractice",
          }
        : {
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: entry.name.en,
              ...(entry.name.zh ? { alternateName: entry.name.zh } : {}),
              description: entry.description.en,
              ...(entry.urls.website ? { url: entry.urls.website } : {}),
              ...(entry.pricing.baseConsultation
                  ? { priceRange: entry.pricing.baseConsultation.slice(0, 50) }
                  : {}),
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
            { "@type": "ListItem", position: 3, name: entry.name.en, item: pageUrl },
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
