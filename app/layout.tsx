import { cn } from "@/lib/utils"
import { DM_Sans } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { cookies } from "next/headers"
import "./globals.css"
import Providers from "@/providers/Providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LanguageCode } from "@/types"

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
    canonical: "https://ae.wait.hk",
    authors: [{ name: "Yil Verdeja", url: "https://yilverdeja.com" }],
    creator: "Yil Verdeja",
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
        card: "Hong Kong A&E Wait Times",
        title: "Hong Kong A&E Wait Times",
        description:
            "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
        creator: "@yilverdeja",
        images: "https://ae.wait.hk/og-image.png",
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
