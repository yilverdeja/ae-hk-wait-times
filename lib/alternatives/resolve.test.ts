import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { getPrimaryChannel, isChannelOpenNow, resolveCurrentPrice } from "@/lib/alternatives/resolve"
import { scheduleContext } from "@/lib/alternatives/time"
import { alternatives } from "@/data/alternatives"

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
        assert.equal(price?.amount, 50)
    })

    it("resolves GOPC non-eligible tier", () => {
        const gopc = alternatives.find((a) => a.slug === "gopc-central")!
        const price = resolveCurrentPrice(
            gopc.channels[0],
            scheduleContext(hkDate("2026-05-20T10:00:00+08:00")),
            "hk_resident_non_eligible"
        )
        assert.equal(price?.amount, 445)
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
