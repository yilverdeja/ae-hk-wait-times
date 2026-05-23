import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { alternativeToCardModel } from "@/lib/alternatives/to-card-model"
import { scheduleContext } from "@/lib/alternatives/time"
import { LanguageCode } from "@/types"
import type { PhysicalAlternative } from "@/types/alternatives"
import { OPEN_PUBLIC } from "@/lib/alternatives/resolve"

const alwaysOpen24h: PhysicalAlternative = {
    slug: "test-24h",
    category: "24hour",
    name: {
        [LanguageCode.EN]: "Test 24h Hospital",
        [LanguageCode.ZH]: "測試24小時",
        [LanguageCode.CN]: "测试24小时",
    },
    providerType: "Private Hospital",
    location: {
        district: "Central",
        address: {
            [LanguageCode.EN]: "1 Test Road",
            [LanguageCode.ZH]: "測試路1號",
            [LanguageCode.CN]: "测试路1号",
        },
        coordinates: { latitude: 22.28, longitude: 114.15 },
    },
    contacts: [],
    channels: [
        {
            id: "urgent",
            name: {
                [LanguageCode.EN]: "Urgent care",
                [LanguageCode.ZH]: "急症",
                [LanguageCode.CN]: "急症",
            },
            channelType: "in_person",
            primary: true,
            schedule: { kind: "always_open" },
            eligibility: OPEN_PUBLIC,
            booking: { walkIn: true },
            pricing: {
                tiers: [
                    {
                        id: "default",
                        label: {
                            [LanguageCode.EN]: "Consultation",
                            [LanguageCode.ZH]: "診症",
                            [LanguageCode.CN]: "诊症",
                        },
                        consultation: { currency: "HKD", amount: 500 },
                        appliesWhen: [{ type: "default" }],
                    },
                ],
            },
        },
    ],
}

const gopcAppointment: PhysicalAlternative = {
    slug: "test-gopc",
    category: "non24hour",
    name: {
        [LanguageCode.EN]: "Test GOPC",
        [LanguageCode.ZH]: "測試門診",
        [LanguageCode.CN]: "测试门诊",
    },
    providerType: "Public Clinic",
    location: {
        district: "Wan Chai",
        address: {
            [LanguageCode.EN]: "2 Clinic Road",
            [LanguageCode.ZH]: "診所路2號",
            [LanguageCode.CN]: "诊所路2号",
        },
        coordinates: { latitude: 22.27, longitude: 114.17 },
    },
    contacts: [],
    channels: [
        {
            id: "opd",
            name: {
                [LanguageCode.EN]: "Clinic",
                [LanguageCode.ZH]: "診所",
                [LanguageCode.CN]: "诊所",
            },
            channelType: "in_person",
            primary: true,
            schedule: { kind: "appointment_only" },
            eligibility: OPEN_PUBLIC,
            pricing: {
                tiers: [
                    {
                        id: "default",
                        label: {
                            [LanguageCode.EN]: "Attendance",
                            [LanguageCode.ZH]: "診症",
                            [LanguageCode.CN]: "诊症",
                        },
                        consultation: { currency: "HKD", amount: 150 },
                        appliesWhen: [{ type: "default" }],
                    },
                ],
            },
        },
    ],
}

describe("alternativeToCardModel", () => {
    it("maps 24h always-open facility with price and walk-in", () => {
        const ctx = scheduleContext(new Date("2026-05-23T10:00:00+08:00"))
        const card = alternativeToCardModel(alwaysOpen24h, ctx)

        assert.equal(card.slug, "test-24h")
        assert.equal(card.isPhysical, true)
        assert.equal(card.filterMeta.openKind, "always_open")
        assert.equal(card.filterMeta.walkInAllowed, true)
        assert.equal(card.filterMeta.sortPriceHkd, 500)
        assert.equal(card.statusDisplay?.tone, "open")
        assert.match(card.price.primary[LanguageCode.EN], /500/)
    })

    it("maps GOPC appointment-only with no walk-in", () => {
        const ctx = scheduleContext(new Date("2026-05-23T10:00:00+08:00"))
        const card = alternativeToCardModel(gopcAppointment, ctx)

        assert.equal(card.filterMeta.openKind, "appointment_only")
        assert.equal(card.filterMeta.walkInAllowed, false)
        assert.equal(card.filterMeta.sortPriceHkd, 150)
        assert.equal(card.statusDisplay?.tone, "neutral")
    })
})
