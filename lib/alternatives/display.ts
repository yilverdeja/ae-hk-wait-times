import { VOUCHER_CATALOG } from "@/lib/alternatives/vouchers"
import { LanguageCode, type LocalizedString } from "@/types"
import type { AcceptedPaymentVoucher, Alternative, LabeledContact, PaymentVoucherId } from "@/types/alternatives"

/** Resolves a plain string or `i18n()` object for the active locale. */
export function pickLocalized(value: string | LocalizedString, lang: LanguageCode): string {
    return typeof value === "string" ? value : value[lang]
}

export function localized(text: LocalizedString, lang: LanguageCode): string {
    return text[lang]
}

export function alternativeName(alt: Alternative, lang: LanguageCode): string {
    return localized(alt.name, lang)
}

export function primaryPhone(contacts: LabeledContact[]): string | null {
    const phone = contacts.find((c) => c.kind === "phone")
    if (!phone) return null
    return pickLocalized(phone.value, LanguageCode.EN)
}

export function primaryWebsite(contacts: LabeledContact[]): string | null {
    const url = contacts.find((c) => c.kind === "url")
    if (!url) return null
    return pickLocalized(url.value, LanguageCode.EN)
}

export function telHref(phone: string): string {
    const digits = phone.replace(/[^\d+]/g, "")
    return `tel:${digits.split(/\s/)[0] ?? digits}`
}

/** Build https://wa.me/ number; assumes HK local 8-digit if no country code. */
export function whatsappHref(raw: string): string {
    const digits = raw.replace(/\D/g, "")
    if (digits.startsWith("852")) {
        return `https://wa.me/${digits}`
    }
    if (digits.length === 8) {
        return `https://wa.me/852${digits}`
    }
    return `https://wa.me/${digits}`
}

export function voucherLabel(voucher: AcceptedPaymentVoucher, lang: LanguageCode): string {
    const catalog = VOUCHER_CATALOG[voucher.id]
    return voucher.summary?.[lang] ?? catalog.summary[lang]
}

export function voucherLabelFromId(id: PaymentVoucherId, lang: LanguageCode): string {
    return VOUCHER_CATALOG[id].summary[lang]
}

export function alternativeVoucherLabels(alt: Alternative, lang: LanguageCode): string[] {
    return (alt.acceptedVouchers ?? []).map((v) => voucherLabel(v, lang))
}
