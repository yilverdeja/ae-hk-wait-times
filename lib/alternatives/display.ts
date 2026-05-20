import { VOUCHER_CATALOG } from "@/lib/alternatives/vouchers"
import type { LanguageCode, LocalizedString } from "@/types"
import type { AcceptedPaymentVoucher, Alternative, LabeledContact } from "@/types/alternatives"

export function localized(text: LocalizedString, lang: LanguageCode): string {
    return text[lang]
}

export function alternativeName(alt: Alternative, lang: LanguageCode): string {
    return localized(alt.name, lang)
}

export function primaryPhone(contacts: LabeledContact[]): string | null {
    const phone = contacts.find((c) => c.kind === "phone")
    return phone?.value ?? null
}

export function primaryWebsite(contacts: LabeledContact[]): string | null {
    const url = contacts.find((c) => c.kind === "url")
    return url?.value ?? null
}

export function telHref(phone: string): string {
    const digits = phone.replace(/[^\d+]/g, "")
    return `tel:${digits.split(/\s/)[0] ?? digits}`
}

export function voucherLabel(voucher: AcceptedPaymentVoucher, lang: LanguageCode): string {
    const catalog = VOUCHER_CATALOG[voucher.id]
    return voucher.summary?.[lang] ?? catalog.summary[lang]
}

export function alternativeVoucherLabels(alt: Alternative, lang: LanguageCode): string[] {
    return (alt.acceptedVouchers ?? []).map((v) => voucherLabel(v, lang))
}
