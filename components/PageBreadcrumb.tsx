"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

export const breadcrumbLabels = {
    nav: {
        [LanguageCode.EN]: "Breadcrumb",
        [LanguageCode.ZH]: "導覽路徑",
        [LanguageCode.CN]: "导航路径",
    },
    home: {
        [LanguageCode.EN]: "Home",
        [LanguageCode.ZH]: "主頁",
        [LanguageCode.CN]: "主页",
    },
    allHospitals: {
        [LanguageCode.EN]: "All Hospitals",
        [LanguageCode.ZH]: "所有醫院",
        [LanguageCode.CN]: "所有医院",
    },
    faq: {
        [LanguageCode.EN]: "FAQ",
        [LanguageCode.ZH]: "常見問題",
        [LanguageCode.CN]: "常见问题",
    },
} as const

export type BreadcrumbItem = {
    label: string
    href?: string
}

interface PageBreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function PageBreadcrumb({ items }: PageBreadcrumbProps) {
    const { lang } = useLanguage()

    return (
        <nav aria-label={breadcrumbLabels.nav[lang]} className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <Fragment key={`${item.label}-${index}`}>
                            {index > 0 && (
                                <li aria-hidden className="flex items-center">
                                    <ChevronRight size={14} className="shrink-0" />
                                </li>
                            )}
                            <li
                                className={
                                    isLast
                                        ? "font-medium text-foreground truncate max-w-[min(100%,20rem)] sm:max-w-none"
                                        : "shrink-0"
                                }
                            >
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span aria-current={isLast ? "page" : undefined}>
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        </Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}
