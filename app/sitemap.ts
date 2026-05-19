import { alternatives } from "@/data/alternatives"
import { hospitals } from "@/data/hospitals"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ae.wait.hk"
    const currentDate = new Date().toISOString()

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "always", // updated every 15 minutes
            priority: 1,
        },
        ...Object.keys(hospitals).map((slug) => ({
            url: `${baseUrl}/hospital/${slug}`,
            lastModified: currentDate,
            changeFrequency: "daily" as const,
            priority: 0.8,
        })),
        {
            url: `${baseUrl}/faq.jsonld`,
        },
        {
            url: `${baseUrl}/press.jsonld`,
        },
        {
            url: `${baseUrl}/llms.txt`,
        },
        {
            url: `${baseUrl}/alternatives`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        ...alternatives.map((e) => ({
            url: `${baseUrl}/alternatives/${e.slug}`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ]
}
