"use client"
import { siteConfig } from "@/configs/site"
import { useLanguage } from "@/hooks/useLanguage"
import dayjs from "@/lib/dayjs"
import { LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import { Separator } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"

const footerLinks = {
    [LanguageCode.EN]: {
        allHospitals: "All Hospitals",
        originalSite: "Original Site",
        openData: "Open Data",
        github: "Github",
    },
    [LanguageCode.ZH]: {
        allHospitals: "所有醫院",
        originalSite: "原始網站",
        openData: "開放數據",
        github: "Github",
    },
    [LanguageCode.CN]: {
        allHospitals: "所有医院",
        originalSite: "原始网站",
        openData: "开放数据",
        github: "Github",
    },
}

export default function Footer() {
    const { lang } = useLanguage()
    const links = footerLinks[lang]
    return (
        <footer>
            <Separator className="my-2" />
            <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between md:mx-8">
                {/* Copyright */}
                <span className="text-sm">
                    © {dayjs().year()}{" "}
                    <a href={siteConfig.url} className="hover:underline">
                        {siteConfig.name[lang]}
                    </a>
                </span>
                {/* Links */}
                <ul className="flex flex-row flex-wrap gap-4 justify-center">
                    <li className="text-sm underline underline-offset-2">
                        <Link
                            href="/hospitals"
                            onClick={() =>
                                sendGAEvent("event", "footer_link_clicked", {
                                    linkType: "hospitals_directory",
                                })
                            }
                        >
                            {links.allHospitals}
                        </Link>
                    </li>
                    <li className="text-sm underline underline-offset-2">
                        <Link
                            href={siteConfig.originalLink(lang)}
                            target="_blank"
                            onClick={() =>
                                sendGAEvent("event", "footer_link_clicked", {
                                    linkType: "original_site",
                                })
                            }
                        >
                            {links.originalSite}
                        </Link>
                    </li>
                    <li className="text-sm underline underline-offset-2">
                        <Link
                            href={siteConfig.openDataLink}
                            target="_blank"
                            onClick={() =>
                                sendGAEvent("event", "footer_link_clicked", {
                                    linkType: "open_data",
                                })
                            }
                        >
                            {links.openData}
                        </Link>
                    </li>
                    <li className="text-sm underline underline-offset-2">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            onClick={() =>
                                sendGAEvent("event", "footer_link_clicked", {
                                    linkType: "github",
                                })
                            }
                        >
                            {links.github}
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
