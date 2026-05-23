import { i18n } from "@/lib/i18n"
import type { LocalizedString } from "@/types"
import type { FmcScrapedDetail } from "./fmc-scraped-types"

function formatHoursSection(title: string, lines: string[]): string {
    const body = lines.map((l) => l.trim()).filter(Boolean).join("\n")
    return `${title}\n${body}`
}

export function formatFmcScheduleNotes(detail: FmcScrapedDetail): LocalizedString {
    const en = [
        formatHoursSection("Registration hours", detail.hours.registration),
        formatHoursSection("Consultation hours", detail.hours.consultation),
        "Appointment required. Walk-in not accepted. Book via HA telephone booking or HA Go.",
    ].join("\n\n")

    const zhSummary =
        "掛號及診症時間（英文，摘自醫管局網頁）。須預約，不接受即到。可透過醫管局電話預約或HA Go。"
    const cnSummary =
        "挂号及诊症时间（英文，摘自医管局网页）。须预约，不接受即到。可通过医管局电话预约或HA Go。"

    return i18n(en, `${zhSummary}\n\n${en}`, `${cnSummary}\n\n${en}`)
}

export function formatFmcBookingMethods(detail: FmcScrapedDetail): LocalizedString {
    const booking = detail.contacts.booking.join(", ")
    return i18n(
        `HA telephone booking (${booking}) or HA Go app`,
        `醫管局電話預約（${booking}）或HA Go`,
        `医管局电话预约（${booking}）或HA Go`
    )
}
