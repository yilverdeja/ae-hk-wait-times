"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    footerGroups,
    footerTagline,
    FooterGroup,
    FooterLink,
    resolveFooterLinkHref,
} from "@/configs/footer"
import { siteConfig } from "@/configs/site"
import { useLanguage } from "@/hooks/useLanguage"
import dayjs from "@/lib/dayjs"
import { cn } from "@/lib/utils"
import { LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

function FooterLinkItem({
    link,
    lang,
    className,
}: {
    link: FooterLink
    lang: LanguageCode
    className?: string
}) {
    const href = resolveFooterLinkHref(link.href, lang)

    return (
        <li>
            <Link
                href={href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                    "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    link.external && "group",
                    className
                )}
                onClick={() =>
                    sendGAEvent("event", "footer_link_clicked", {
                        linkType: link.linkType,
                    })
                }
            >
                {link.label[lang]}
                {link.external && (
                    <ExternalLink
                        className="size-3 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                        aria-hidden
                    />
                )}
            </Link>
        </li>
    )
}

function FooterLinkList({
    group,
    lang,
    className,
}: {
    group: FooterGroup
    lang: LanguageCode
    className?: string
}) {
    return (
        <ul className={cn("space-y-2.5", className)}>
            {group.links.map((link) => (
                <FooterLinkItem key={link.id} link={link} lang={lang} />
            ))}
        </ul>
    )
}


function FooterBrand({
    lang,
    centered = false,
}: {
    lang: LanguageCode
    centered?: boolean
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2",
                centered ? "items-center text-center" : "items-start"
            )}
        >
            <Link
                href="/"
                className="text-base font-bold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
            >
                {siteConfig.title[lang]}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {footerTagline[lang]}
            </p>
        </div>
    )
}

function FooterNavGroup({
    group,
    lang,
}: {
    group: FooterGroup
    lang: LanguageCode
}) {
    const headingId = `footer-${group.id}-heading`

    return (
        <nav aria-labelledby={headingId} className="min-w-0">
            <h2
                id={headingId}
                className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
                {group.heading[lang]}
            </h2>
            <FooterLinkList group={group} lang={lang} />
        </nav>
    )
}

function FooterMobileAccordion({ lang }: { lang: LanguageCode }) {
    return (
        <Accordion type="multiple" className="w-full border-t border-border">
            {footerGroups.map((group) => (
                <AccordionItem
                    key={group.id}
                    value={group.id}
                    className="border-border px-0"
                >
                    <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline">
                        {group.heading[lang]}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                        <FooterLinkList group={group} lang={lang} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default function Footer() {
    const { lang } = useLanguage()

    return (
        <footer className="mt-8 border-t border-border pt-8 pb-4">
            <div
                className="hidden gap-10 lg:grid"
                style={{
                    gridTemplateColumns: `minmax(0, 1.4fr) repeat(${footerGroups.length}, minmax(0, 1fr))`,
                }}
            >
                <FooterBrand lang={lang} />
                {footerGroups.map((group) => (
                    <FooterNavGroup key={group.id} group={group} lang={lang} />
                ))}
            </div>

            <div className="lg:hidden">
                <FooterBrand lang={lang} centered />
                <div className="mt-6">
                    <FooterMobileAccordion lang={lang} />
                </div>
            </div>

            <div className="mt-8 pt-4 text-center text-sm text-muted-foreground lg:text-left">
                © {dayjs().year()}{" "}
                <a
                    href={siteConfig.url}
                    className="text-foreground transition-colors hover:text-muted-foreground"
                >
                    {siteConfig.name[lang]}
                </a>
            </div>
        </footer>
    )
}
