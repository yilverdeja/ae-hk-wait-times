import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
    formatCardPrice,
    resolveScheduleTransition,
    resolveUpcomingPriceChange,
} from "@/lib/alternatives/card-preview"
import { getPrimaryChannel, isChannelOpenNow, resolveCurrentPrice } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import { alternatives } from "@/data/alternatives"
import { LanguageCode } from "@/types"

function hkDate(iso: string): Date {
    return new Date(iso)
}

describe("isChannelOpenNow", () => {
    it("always_open is always open", () => {
        const canossa = alternatives.find((a) => a.slug === "canossa-hospital")!
        const ch = canossa.channels[0]
        const status = isChannelOpenNow(ch, scheduleContext(hkDate("2026-05-20T03:00:00+08:00")))
        assert.equal(status.kind, "always_open")
    })

    it("weekly open during business hours", () => {
        const pb = alternatives.find((a) => a.slug === "precious-blood-hospital")!
        const ch = pb.channels.find((c) => c.id === "general_opd")!
        const open = isChannelOpenNow(ch, scheduleContext(hkDate("2026-05-20T14:00:00+08:00")))
        assert.equal(open.kind, "open")
        const closed = isChannelOpenNow(ch, scheduleContext(hkDate("2026-05-20T23:00:00+08:00")))
        assert.equal(closed.kind, "closed")
    })

    it("appointment_only is not open for walk-in", () => {
        const gopc = alternatives.find((a) => a.slug === "gopc-central")!
        const status = isChannelOpenNow(gopc.channels[0], scheduleContext(hkDate("2026-05-20T10:00:00+08:00")))
        assert.equal(status.kind, "appointment_only")
    })
})

describe("resolveCurrentPrice", () => {
    it("resolves Canossa weekday day rate", () => {
        const canossa = alternatives.find((a) => a.slug === "canossa-hospital")!
        const price = resolveCurrentPrice(
            canossa.channels[0],
            scheduleContext(hkDate("2026-05-20T10:00:00+08:00"))
        )
        assert.equal(price?.amount, 388)
    })

    it("resolves GOPC eligible tier", () => {
        const gopc = alternatives.find((a) => a.slug === "gopc-central")!
        const price = resolveCurrentPrice(
            gopc.channels[0],
            scheduleContext(hkDate("2026-05-20T10:00:00+08:00")),
            "hk_resident_eligible"
        )
        assert.equal(price?.amount, 150)
    })

    it("resolves GOPC non-eligible tier", () => {
        const gopc = alternatives.find((a) => a.slug === "gopc-central")!
        const price = resolveCurrentPrice(
            gopc.channels[0],
            scheduleContext(hkDate("2026-05-20T10:00:00+08:00")),
            "hk_resident_non_eligible"
        )
        assert.equal(price?.amount, 500)
    })

    it("resolves DrGo from price", () => {
        const drgo = alternatives.find((a) => a.slug === "drgo-telehealth")!
        const price = resolveCurrentPrice(
            drgo.channels[0],
            scheduleContext(hkDate("2026-05-20T12:00:00+08:00"))
        )
        assert.equal(price?.kind, "from")
        assert.equal(price?.amount, 398)
    })
})

describe("Gleneagles structured pricing", () => {
    it("resolves weekday daytime outpatient fee", () => {
        const gleneagles = alternatives.find((a) => a.slug === "gleneagles-hospital-hk")!
        const price = resolveCurrentPrice(
            gleneagles.channels[0],
            scheduleContext(new Date("2026-05-20T10:00:00+08:00"))
        )
        assert.equal(price?.amount, 420)
        assert.equal(price?.kind, "exact")
    })

    it("resolves weekday evening outpatient fee", () => {
        const gleneagles = alternatives.find((a) => a.slug === "gleneagles-hospital-hk")!
        const price = resolveCurrentPrice(
            gleneagles.channels[0],
            scheduleContext(new Date("2026-05-20T21:00:00+08:00"))
        )
        assert.equal(price?.amount, 600)
    })
})

describe("getPrimaryChannel", () => {
    it("returns primary channel for Canossa", () => {
        const canossa = alternatives.find((a) => a.slug === "canossa-hospital")!
        const ch = getPrimaryChannel(canossa, scheduleContext())
        assert.equal(ch?.id, "24h_opd")
    })
})

describe("resolveUpcomingPriceChange", () => {
    it("Canossa weekday day to evening within 30 min", () => {
        const canossa = alternatives.find((a) => a.slug === "canossa-hospital")!
        const ctx = scheduleContext(hkDate("2026-05-20T17:30:00+08:00"))
        const current = resolveCurrentPrice(canossa.channels[0], ctx)
        assert.equal(current?.amount, 388)

        const upcoming = resolveUpcomingPriceChange(canossa.channels[0].pricing, ctx)
        assert.ok(upcoming)
        assert.equal(upcoming.price.amount, 500)
        assert.equal(upcoming.minutesUntil, 30)
    })

    it("Gleneagles weekday day to evening within 30 min", () => {
        const gleneagles = alternatives.find((a) => a.slug === "gleneagles-hospital-hk")!
        const ctx = scheduleContext(hkDate("2026-05-20T19:30:00+08:00"))
        const current = resolveCurrentPrice(gleneagles.channels[0], ctx)
        assert.equal(current?.amount, 420)

        const upcoming = resolveUpcomingPriceChange(gleneagles.channels[0].pricing, ctx)
        assert.ok(upcoming)
        assert.equal(upcoming.price.amount, 600)
        assert.equal(upcoming.minutesUntil, 30)
    })
})

describe("formatCardPrice", () => {
    it("formats exact price with plus suffix", () => {
        const gleneagles = alternatives.find((a) => a.slug === "gleneagles-hospital-hk")!
        const price = resolveCurrentPrice(
            gleneagles.channels[0],
            scheduleContext(hkDate("2026-05-20T10:00:00+08:00"))
        )!
        assert.equal(formatCardPrice(price, LanguageCode.EN), "HK$420+")
    })
})

describe("precious blood general OPD hours", () => {
    it("is closed outside 08:00–22:00", () => {
        const pb = alternatives.find((a) => a.slug === "precious-blood-hospital")!
        const ch = getPrimaryChannel(pb, scheduleContext(hkDate("2026-05-23T23:00:00+08:00")))!
        assert.equal(ch.id, "general_opd")
        const status = isChannelOpenNow(ch, scheduleContext(hkDate("2026-05-23T23:00:00+08:00")))
        assert.equal(status.kind, "closed")
    })

    it("shows closes soon before 19:10 on Mon–Sat", () => {
        const pb = alternatives.find((a) => a.slug === "precious-blood-hospital")!
        const ctx = scheduleContext(hkDate("2026-05-23T18:50:00+08:00")) // Saturday
        const ch = pb.channels.find((c) => c.id === "general_opd")!
        assert.equal(isChannelOpenNow(ch, ctx).kind, "open")
        const transition = resolveScheduleTransition(ch.schedule, ctx)
        assert.equal(transition?.kind, "closes")
        assert.equal(transition?.minutesUntil, 20)
    })

    it("is closed after Mon–Sat evening slot (19:30)", () => {
        const pb = alternatives.find((a) => a.slug === "precious-blood-hospital")!
        const ch = pb.channels.find((c) => c.id === "general_opd")!
        const ctx = scheduleContext(hkDate("2026-05-23T19:30:00+08:00")) // Saturday
        assert.equal(isChannelOpenNow(ch, ctx).kind, "closed")
    })
})

describe("resolveScheduleTransition", () => {
    it("Precious Blood closes within 60 min before 19:10 on Mon–Sat", () => {
        const pb = alternatives.find((a) => a.slug === "precious-blood-hospital")!
        const ch = pb.channels.find((c) => c.id === "general_opd")!
        const ctx = scheduleContext(hkDate("2026-05-23T18:50:00+08:00"))
        const transition = resolveScheduleTransition(ch.schedule, ctx)
        assert.ok(transition)
        assert.equal(transition.kind, "closes")
        assert.equal(transition.minutesUntil, 20)
    })

    it("DrGo telehealth closes within 60 min before 20:00", () => {
        const drgo = alternatives.find((a) => a.slug === "drgo-telehealth")!
        const ctx = scheduleContext(hkDate("2026-05-20T19:30:00+08:00"))
        const transition = resolveScheduleTransition(drgo.channels[0].schedule, ctx)
        assert.ok(transition)
        assert.equal(transition.kind, "closes")
        assert.equal(transition.minutesUntil, 30)
    })
})
