"use client";
import { siteConfig } from "@/configs/site";
import dayjs from "@/lib/dayjs"
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";

export default function Footer() {
    const { lang } = useLanguage();
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
                <ul className="flex flex-row gap-4">
                    <li className="text-sm underline underline-offset-2">
                        <Link href={siteConfig.originalLink(lang)} target="_blank">
                            Original Site
                        </Link>
                    </li>
                    <li className="text-sm underline underline-offset-2">
                        <Link href={siteConfig.openDataLink} target="_blank">
                            Open Data
                        </Link>
                    </li>
                    <li className="text-sm underline underline-offset-2">
                        <Link href={siteConfig.links.github} target="_blank">
                            Github
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}