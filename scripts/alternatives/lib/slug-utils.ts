export function slugToExportName(slug: string): string {
    const parts = slug.split("-")
    return parts
        .map((part, index) =>
            index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join("")
}
