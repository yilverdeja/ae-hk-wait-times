"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { voucherLabelFromId } from "@/lib/alternatives/display"
import type { AlternativeCardFooterModel } from "@/types/alternatives-card"
import type { EligibilityAudience } from "@/types/alternatives"
import { LanguageCode } from "@/types"
import { IdCard, Shield, Ticket, User } from "lucide-react"

const ELIGIBILITY_SHORT: Record<
    Exclude<EligibilityAudience, "open">,
    { en: string; zh: string; cn: string }
> = {
    hk_resident_eligible: { en: "HKID", zh: "HKID", cn: "HKID" },
    hk_resident_non_eligible: { en: "HKID", zh: "HKID", cn: "HKID" },
    existing_patient: { en: "Patient", zh: "病人", cn: "病人" },
    insurance_member: { en: "Member", zh: "會員", cn: "会员" },
    employer_group: { en: "Group", zh: "團體", cn: "团体" },
    subscription: { en: "Sub", zh: "訂閱", cn: "订阅" },
}

function shortEligibilityLabel(audience: EligibilityAudience, lang: LanguageCode): string {
    if (audience === "open") return ""
    const labels = ELIGIBILITY_SHORT[audience]
    if (lang === LanguageCode.ZH) return labels.zh
    if (lang === LanguageCode.CN) return labels.cn
    return labels.en
}

interface AlternativeCardFooterProps {
    footer: AlternativeCardFooterModel
    lang: LanguageCode
}

export function AlternativeCardFooter({ footer, lang }: AlternativeCardFooterProps) {
    const { eligibility: restricted, voucherIds: vouchers } = footer

    if (restricted.length === 0 && vouchers.length === 0) {
        return null
    }

    return (
        <div className="flex flex-wrap items-center gap-1.5 border-t pt-2 mt-2">
            {restricted.map((rule) => (
                <Tooltip key={rule.audience}>
                    <TooltipTrigger asChild>
                        <span
                            className="inline-flex items-center gap-0.5 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                            tabIndex={0}
                        >
                            {rule.audience === "hk_resident_eligible" ||
                            rule.audience === "hk_resident_non_eligible" ? (
                                <IdCard size={10} aria-hidden />
                            ) : rule.audience === "existing_patient" ? (
                                <User size={10} aria-hidden />
                            ) : (
                                <Shield size={10} aria-hidden />
                            )}
                            {shortEligibilityLabel(rule.audience, lang)}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                        {rule.summary[lang]}
                    </TooltipContent>
                </Tooltip>
            ))}
            {vouchers.map((voucherId) => (
                <Tooltip key={voucherId}>
                    <TooltipTrigger asChild>
                        <span
                            className="inline-flex items-center gap-0.5 rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200"
                            tabIndex={0}
                        >
                            <Ticket size={10} aria-hidden />
                            HCVS
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                        {voucherLabelFromId(voucherId, lang)}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}
