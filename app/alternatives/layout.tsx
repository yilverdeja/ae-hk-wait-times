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
    openGraph: {
        title: "Alternative Care Options in Hong Kong",
        description:
            "Find 24-hour hospitals, outpatient clinics, and telehealth services instead of waiting at A&E.",
        url: "https://ae.wait.hk/alternatives",
        images: [{ url: "https://ae.wait.hk/og-image.png", width: 1200, height: 630 }],
        type: "website",
    },
}

export default function AlternativesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Alternative Care Options</h1>
                <p className="text-muted-foreground">
                    Considering alternatives to A&amp;E? Browse 24-hour private hospitals,
                    government outpatient clinics (GOPC), and telehealth services available in Hong
                    Kong.
                </p>
            </div>
            {children}
        </div>
    )
}
