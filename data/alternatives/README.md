# Alternatives data

Live alternative care options (24-hour facilities, outpatient clinics, telehealth) for the app.

## Layout

| Path | Purpose |
|------|---------|
| [`index.ts`](index.ts) | Registry — imports all entries, exports `alternatives`, `alternativesBySlug`, `alternatives24Hour` |
| [`shared.ts`](shared.ts) | Shared constants (GOPC fees, exclusions, eligibility helpers) |
| [`gopc.ts`](gopc.ts) | `createGopcEntry()` factory for HA GOPC clinics (used by generator scripts) |
| [`entries/{slug}.ts`](entries/) | One file per facility — **source of truth** for the app |

## Review workflow

1. Open the matching row in [`data/archive/alternatives/`](../archive/alternatives/) JSON (reference only) and the provider’s official site.
2. Edit [`entries/{slug}.ts`](entries/) — add structured hours, fee tiers, vouchers (see Gleneagles example).
3. Move the import in [`index.ts`](index.ts) from the **Auto-generated** block to **Reviewed** (or run `npm run alternatives:generate-registry` after updating `REVIEWED_SLUGS` in `scripts/alternatives/lib/constants.ts`).
4. Set `lastUpdated` on the entry when fees/hours are verified.

**Priority:** 24-hour private hospitals → remaining GOPC → telehealth → other outpatient.

## Generator scripts (offline only)

These read **archive JSON** and write entry stubs. They are not used at runtime.

```bash
npm run alternatives:export-pilots      # one-time: pilots.ts → entries (already done)
npm run alternatives:generate-entry    # stubs from archive JSON (non-GOPC, non-reviewed)
npm run alternatives:generate-gopc       # GOPC stubs via createGopcEntry()
npm run alternatives:generate-registry # rebuild index.ts import lists
```

Hand-curated slugs are listed in [`scripts/alternatives/lib/constants.ts`](../../scripts/alternatives/lib/constants.ts) (`REVIEWED_SLUGS`).

## Entry file types

- **Reviewed** — header: `Reviewed — hand-curated entry`
- **Auto-generated** — header: `AUTO-GENERATED — needs manual review` (bootstrap from archive; replace prose/variable pricing with structured tiers when possible)
