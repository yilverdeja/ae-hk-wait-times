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
        {
            url: `${baseUrl}/hospitals`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: "monthly" as const,
            priority: 0.9,
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
    ]
}
