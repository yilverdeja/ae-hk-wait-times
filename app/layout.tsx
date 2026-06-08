import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { cn } from "@/lib/utils"
import Providers from "@/providers/Providers"
import { LanguageCode } from "@/types"
import { GoogleAnalytics } from "@next/third-parties/google"
import { DM_Sans } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"

const dm_sans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] })

export const metadata = {
    metadataBase: new URL("https://ae.wait.hk"),
    title: "Hong Kong A&E Wait Times",
    description:
        "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
    generator: "A&E Wait Times",
    application: "A&E Wait Times",
    referrer: "origin-when-cross-origin",
    keywords: ["Accident", "Emergency", "A&E", "Hong Kong", "Wait", "Times"],
    authors: [{ name: "Yil Verdeja", url: "https://yilverdeja.com" }],
    creator: "Yil Verdeja",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        title: "Hong Kong A&E Wait Times",
        description:
            "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
        url: "https://ae.wait.hk",
        siteName: "A&E Wait Times",
        images: [
            {
                url: "https://ae.wait.hk/og-image.png",
                width: 1200,
                height: 630,
                alt: "A&E Wait Times",
            },
        ],
        locales: ["en_US", "zh_Hant_HK", "zh_Hans_HK"],
        type: "website",
        authors: ["Yil Verdeja"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hong Kong A&E Wait Times",
        description:
            "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
        creator: "@yilverdeja",
        images: ["https://ae.wait.hk/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://ae.wait.hk",
    },
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Read language preference from cookie on the server
    const cookieStore = await cookies()
    const languageCookie = cookieStore.get("app-language")
    const initialLang =
        languageCookie?.value &&
        Object.values(LanguageCode).includes(
            languageCookie.value as LanguageCode
        )
            ? (languageCookie.value as LanguageCode)
            : LanguageCode.EN

    return (
        <html
            lang={initialLang}
            className={cn(dm_sans.className, "no-scrollbar")}
            suppressHydrationWarning
        >
            <body>
                <Providers initialLang={initialLang}>
                    <div className="p-4">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </Providers>
            </body>
            <GoogleAnalytics gaId="G-1BVWY7HH96" />
        </html>
    )
}
