"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaqEntry, FaqGroup } from "@/data/faq"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import { sendGAEvent } from "@next/third-parties/google"

interface FaqGroupSectionProps {
    group: FaqGroup
    entries: FaqEntry[]
    openEntryId: string
    isActive: boolean
    onOpenEntryChange: (entryId: string) => void
}

export default function FaqGroupSection({
    group,
    entries,
    openEntryId,
    isActive,
    onOpenEntryChange,
}: FaqGroupSectionProps) {
    const { lang } = useLanguage()
    const Icon = group.icon
    const valueInGroup = entries.some((e) => e.id === openEntryId)
        ? openEntryId
        : ""

    return (
        <section
            id={group.id}
            data-faq-group={group.id}
            className={cn(
                "scroll-mt-24 rounded-lg border bg-card transition-[border-color,box-shadow]",
                isActive && "border-primary ring-2 ring-primary/20"
            )}
        >
            <div className="flex items-center gap-2 border-b px-4 py-3 sm:px-5">
                <Icon
                    size={18}
                    className={cn(
                        "shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                    )}
                />
                <h2 className="text-base font-semibold tracking-tight">
                    {group.title[lang]}
                </h2>
            </div>

            <Accordion
                type="single"
                collapsible
                value={valueInGroup}
                onValueChange={(value) => {
                    if (value) {
                        sendGAEvent("event", "faq_accordion_expanded", {
                            groupId: group.id,
                            entryId: value,
                        })
                        onOpenEntryChange(value)
                    } else if (entries.some((e) => e.id === openEntryId)) {
                        onOpenEntryChange("")
                    }
                }}
                className="px-4 sm:px-5"
            >
                {entries.map((entry) => (
                    <AccordionItem key={entry.id} value={entry.id} id={entry.id}>
                        <AccordionTrigger className="text-left text-base hover:no-underline">
                            {entry.question[lang]}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            <p className="mb-2 leading-relaxed">
                                {entry.answerLead[lang]}
                            </p>
                            {entry.answerBody?.[lang] && (
                                <div>{entry.answerBody[lang]}</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
