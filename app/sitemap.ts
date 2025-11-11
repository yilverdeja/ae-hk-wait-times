import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ae.wait.hk"
    const currentDate = new Date().toISOString()

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "hourly", // updated every 15 minutes
            priority: 1,
        },
    ]
}
