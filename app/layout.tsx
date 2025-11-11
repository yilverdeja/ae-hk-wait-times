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
    title: "Hong Kong A&E Wait Times",
    description:
        "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
    generator: "A&E Wait Times",
    application: "A&E Wait Times",
    referrer: "origin-when-cross-origin",
    keywords: ["Accident", "Emergency", "A&E", "Hong Kong"],
    authors: [{ name: "Yil Verdeja", url: "https://yilverdeja.com" }],
    creator: "Yil Verdeja",
    openGraph: {
        title: "Hong Kong A&E Wait Times",
        description:
            "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
        url: "https://ae-hk-wait-times.vercel.app",
        siteName: "Next.js",
        images: "https://ae-hk-wait-times.vercel.app/og-image.png",
        locale: "zh_Hant_HK",
        type: "website",
        authors: ["Yil Verdeja"],
    },
    twitter: {
        card: "Hong Kong A&E Wait Times",
        title: "Hong Kong A&E Wait Times",
        description:
            "Check real-time accident and emergency department wait times across Hong Kong hospitals. Updated every 15 minutes to help you find the quickest service.",
        creator: "@yilverdeja",
        images: "https://ae-hk-wait-times.vercel.app/og-image.png",
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
