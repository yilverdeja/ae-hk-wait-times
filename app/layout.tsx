import { cn } from "@/lib/utils";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Providers from "./providers";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

const dm_sans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(dm_sans.className, "no-scrollbar dark")}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <div className="p-4">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-1BVWY7HH96" />
    </html>
  );
}
