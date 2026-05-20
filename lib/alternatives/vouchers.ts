import { i18n } from "@/lib/i18n"
import type { LocalizedString } from "@/types"
import type { PaymentVoucherId } from "@/types/alternatives"

export interface VoucherDefinition {
    id: PaymentVoucherId
    name: LocalizedString
    summary: LocalizedString
    details?: LocalizedString
    officialUrl?: string
}

export const VOUCHER_CATALOG: Record<PaymentVoucherId, VoucherDefinition> = {
    hcvs: {
        id: "hcvs",
        name: i18n("Health Care Voucher Scheme", "醫療券計劃"),
        summary: i18n("HCVS accepted", "接受醫療券"),
        details: i18n(
            "Eligible elders may use Health Care Vouchers at this provider for approved services. Confirm balance and eligible services before visit.",
            "合資格長者可使用醫療券支付認可服務，請於求診前確認餘額及適用範圍。"
        ),
        officialUrl: "https://www.healthcarevoucher.gov.hk/en/",
    },
}

export function voucherSummary(id: PaymentVoucherId): LocalizedString {
    return VOUCHER_CATALOG[id].summary
}
