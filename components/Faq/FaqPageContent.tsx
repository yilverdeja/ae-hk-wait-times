"use client"

import FaqGroupSection from "@/components/Faq/FaqGroupSection"
import FaqSidebar, { useFaqGroupNav } from "@/components/Faq/FaqSidebar"
import PageBreadcrumb, { breadcrumbLabels } from "@/components/PageBreadcrumb"
import {
    faqGroups,
    faqPageMeta,
    getFaqGroupForEntry,
    resolveFaqGroups,
} from "@/data/faq"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function FaqPageContent() {
    const { lang } = useLanguage()
    const groupedFaq = useMemo(() => resolveFaqGroups(), [])
    const groupIds = useMemo(() => faqGroups.map((g) => g.id), [])

    const { activeGroupId, selectGroup, selectGroupAndScrollTo } =
        useFaqGroupNav(groupIds)

    const [openEntryId, setOpenEntryId] = useState("")

    const handleOpenEntryChange = useCallback((entryId: string) => {
        setOpenEntryId(entryId)
    }, [])

    useEffect(() => {
        const applyHash = () => {
            const hash = window.location.hash.replace("#", "")
            if (!hash) return

            const group = getFaqGroupForEntry(hash)
            if (!group) return

            setOpenEntryId(hash)

            requestAnimationFrame(() => {
                const entryEl = document.getElementById(hash)
                if (entryEl) {
                    selectGroupAndScrollTo(group.id, hash)
                    return
                }

                selectGroup(group.id)
            })
        }

        applyHash()
        window.addEventListener("hashchange", applyHash)
        return () => window.removeEventListener("hashchange", applyHash)
    }, [selectGroup, selectGroupAndScrollTo])

    return (
        <main className="container mx-auto xl:max-w-none py-4 space-y-8">
            <PageBreadcrumb
                items={[
                    { label: breadcrumbLabels.home[lang], href: "/" },
                    { label: breadcrumbLabels.faq[lang] },
                ]}
            />

            <div className="space-y-3 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    {faqPageMeta.title[lang]}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                    {faqPageMeta.intro[lang]}
                </p>
            </div>

            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 lg:items-start">
                <FaqSidebar
                    activeGroupId={activeGroupId}
                    onGroupClick={selectGroup}
                />

                <div className="space-y-6 min-w-0">
                    {groupedFaq.map(({ group, entries }) => (
                        <FaqGroupSection
                            key={group.id}
                            group={group}
                            entries={entries}
                            openEntryId={openEntryId}
                            isActive={activeGroupId === group.id}
                            onOpenEntryChange={handleOpenEntryChange}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t max-w-3xl">
                <Link
                    href="/"
                    className="text-sm underline underline-offset-2 hover:text-foreground"
                >
                    {faqPageMeta.viewLiveWaitTimes[lang]}
                </Link>
                <Link
                    href="/hospitals"
                    className="text-sm underline underline-offset-2 hover:text-foreground"
                >
                    {faqPageMeta.browseHospitals[lang]}
                </Link>
            </div>
        </main>
    )
}
