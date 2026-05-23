# Hospital Authority reference data

| File | Purpose |
|------|---------|
| [`public-charges.ts`](public-charges.ts) | FMC and public A&E attendance fees (2026 reform) |
| [`urls.ts`](urls.ts) | HA visitor URLs with `Lang=ENG` / `CHIB5` / `CHIGB` |
| [`facility-fmc.json`](facility-fmc.json) | All Family Medicine Clinics from [HA opendata](https://www.ha.org.hk/opendata/facility-fmc.json) |
| [`fmc-slug.ts`](fmc-slug.ts) | Slug derivation (`gopc-*`) and legacy slug overrides |

Regenerate clinic entries after updating opendata:

```bash
curl -fsSL "https://www.ha.org.hk/opendata/facility-fmc.json" -o data/ha/facility-fmc.json
npm run alternatives:generate-fmc -- --force
npm run alternatives:generate-registry
```
