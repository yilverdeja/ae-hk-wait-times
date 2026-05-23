import { AlternativesCatalogClient } from "@/components/Alternatives/AlternativesCatalogClient"
import { AlternativesCategoryNav } from "@/components/Alternatives/AlternativesCategoryNav"
import { AlternativesCategorySelect } from "@/components/Alternatives/AlternativesCategorySelect"
import { alternatives } from "@/data/alternatives"
import { alternativeToCardModel } from "@/lib/alternatives/to-card-model"
import { scheduleContext } from "@/lib/alternatives/time"
import { LanguageCode } from "@/types"
import {
    ALTERNATIVE_CATEGORIES,
    type AlternativeCategory,
} from "@/types/alternatives"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { Suspense } from "react"

interface PageProps {
    params: Promise<{ category: string }>
}

function parseCategoryParam(value: string): AlternativeCategory | null {
    if (ALTERNATIVE_CATEGORIES.includes(value as AlternativeCategory)) {
        return value as AlternativeCategory
    }
    return null
}

export function generateStaticParams() {
    return ALTERNATIVE_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: raw } = await params
    const category = parseCategoryParam(raw)
    if (!category) return {}

    const pageUrl = `https://ae.wait.hk/alternatives/category/${category}`

    return {
        alternates: { canonical: pageUrl },
        openGraph: { url: pageUrl },
    }
}

export default async function AlternativesCategoryPage({ params }: PageProps) {
    const { category: rawCategory } = await params
    const category = parseCategoryParam(rawCategory)
    if (!category) {
        notFound()
    }

    const scheduleAt = new Date().toISOString()
    const ctx = scheduleContext(new Date(scheduleAt))
    const entries = alternatives.filter((e) => e.category === category)
    const cards = entries.map((entry) => alternativeToCardModel(entry, ctx))
    const pageUrl = `https://ae.wait.hk/alternatives/category/${category}`

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Alternative Care Options in Hong Kong",
        description:
            "24-hour hospitals, outpatient clinics, and telehealth services as alternatives to public A&E in Hong Kong.",
        url: pageUrl,
        numberOfItems: entries.length,
        itemListElement: entries.map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.name[LanguageCode.EN],
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
            <Script
                id="alternatives-item-list-ld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <Script
                id="alternatives-breadcrumb-ld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AlternativesCategoryNav category={category} />
            <div className="mb-4 hidden sm:block">
                <Suspense fallback={null}>
                    <AlternativesCategorySelect category={category} />
                </Suspense>
            </div>
            <Suspense
                fallback={
                    <div className="mt-6 h-48 animate-pulse rounded-lg bg-muted" aria-hidden />
                }
            >
                <AlternativesCatalogClient cards={cards} scheduleAt={scheduleAt} />
            </Suspense>
        </>
    )
}
