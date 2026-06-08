"use client"
import { siteConfig } from "@/configs/site"
import type { ReactNode } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import dayjs from "@/lib/dayjs"
import { LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import { Separator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"

const footerLabels = {
    [LanguageCode.EN]: {
        siteHeading: "Site",
        resourcesHeading: "Resources",
        allHospitals: "All Hospitals",
        faq: "FAQ",
        originalSite: "Original Site",
        openData: "Open Data",
        github: "Github",
    },
    [LanguageCode.ZH]: {
        siteHeading: "網站",
        resourcesHeading: "資源",
        allHospitals: "所有醫院",
        faq: "常見問題",
        originalSite: "原始網站",
        openData: "開放數據",
        github: "Github",
    },
    [LanguageCode.CN]: {
        siteHeading: "网站",
        resourcesHeading: "资源",
        allHospitals: "所有医院",
        faq: "常见问题",
        originalSite: "原始网站",
        openData: "开放数据",
        github: "Github",
    },
}

function FooterLinkList({
    children,
}: {
    children: ReactNode
}) {
    return (
        <ul className="flex flex-row flex-wrap gap-x-4 gap-y-1 justify-center md:justify-end">
            {children}
        </ul>
    )
}

function FooterLinkItem({
    href,
    children,
    external,
    linkType,
}: {
    href: string
    children: ReactNode
    external?: boolean
    linkType: string
}) {
    return (
        <li className="text-sm underline underline-offset-2">
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() =>
                    sendGAEvent("event", "footer_link_clicked", { linkType })
                }
            >
                {children}
            </Link>
        </li>
    )
}

export default function Footer() {
    const { lang } = useLanguage()
    const labels = footerLabels[lang]

    return (
        <footer>
            <Separator className="my-2" />
            <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-between md:mx-8 md:items-start">
                <span className="text-sm">
                    © {dayjs().year()}{" "}
                    <a href={siteConfig.url} className="hover:underline">
                        {siteConfig.name[lang]}
                    </a>
                </span>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center md:items-end">
                    <div className="flex flex-col gap-1 items-center md:items-end">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {labels.siteHeading}
                        </span>
                        <FooterLinkList>
                            <FooterLinkItem
                                href="/hospitals"
                                linkType="hospitals_directory"
                            >
                                {labels.allHospitals}
                            </FooterLinkItem>
                            <FooterLinkItem href="/faq" linkType="faq">
                                {labels.faq}
                            </FooterLinkItem>
                        </FooterLinkList>
                    </div>

                    <div className="flex flex-col gap-1 items-center md:items-end">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {labels.resourcesHeading}
                        </span>
                        <FooterLinkList>
                            <FooterLinkItem
                                href={siteConfig.originalLink(lang)}
                                external
                                linkType="original_site"
                            >
                                {labels.originalSite}
                            </FooterLinkItem>
                            <FooterLinkItem
                                href={siteConfig.openDataLink}
                                external
                                linkType="open_data"
                            >
                                {labels.openData}
                            </FooterLinkItem>
                            <FooterLinkItem
                                href={siteConfig.links.github}
                                external
                                linkType="github"
                            >
                                {labels.github}
                            </FooterLinkItem>
                        </FooterLinkList>
                    </div>
                </div>
            </div>
        </footer>
    )
}
