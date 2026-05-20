import type { LanguageCode, LocalizedString } from "@/types"
import type { Alternative, LabeledContact } from "@/types/alternatives"

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
