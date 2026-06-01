# Claude Code prompt — Kanea (paste this into Claude Code)

> Open this repo locally first, copy the `design_handoff_kanea/` folder into it, then paste the prompt below.

---

You are building **Kanea**, a solar-subscription utility for the Ghana market. The product has three surfaces: a **Customer** mobile app, a **Field** mobile app (offline-first), and an **Ops** web dashboard. Your job is to scaffold a monorepo, implement a working v1 from the attached designs, push to GitHub, and deploy the web surfaces to Vercel.

## Sources of truth (read these first, in order)
1. `design_handoff_kanea/solar-utility-product-spec.md` — full product spec: scope, data model (§4.2), cross-cutting requirements (§4.3), per-app MVPs (§5–§7), API surface (§8), build sequence (§9). **Do not build anything marked "Later" or in an "out of scope" list.**
2. `design_handoff_kanea/README.md` — the design handoff: **design tokens (port verbatim)**, screen-by-screen map, interactions, status system.
3. `design_handoff_kanea/design_files/` — the HTML/JSX prototypes. These are **design references, not production code** — recreate the look & behavior; do not copy the Babel/CDN setup or the device-frame scaffolding (`frames/*`).

## Repository
Target repo: **https://github.com/GeraldBonsu/Kanea** (already created, push to `main`). If it's empty, initialize it here.

## Recommended stack & structure
Optimize for shipping all three surfaces to Vercel quickly while keeping the spec's later RN path open.

- **Monorepo:** pnpm workspaces + Turborepo.
- **Shared package `packages/design-system`:** port `styles/kanea.css` tokens into CSS custom properties + a small Tailwind preset (or CSS-vars + utility classes). Export the status `Chip`, `Button`, `Card`, and the Space Grotesk / Hanken Grotesk font setup. **This is the backbone — every app imports it.** Keep the oklch values and the rule that the sun/brand color is never used for status.
- **`apps/ops`** — React + TypeScript + **Vite**. Desktop-first dashboard. Use **MapLibre GL** (or Leaflet) for the fleet map and lightweight SVG/Recharts for the small charts.
- **`apps/customer`** — React + TypeScript + Vite, **mobile-web / responsive** (PWA-friendly). Structure components so they can later port to React Native / Expo (keep view logic separate from web chrome). Include the USSD `*123#` menu as an in-app simulator screen for the demo.
- **`apps/field`** — React + TypeScript + Vite, mobile-web, **offline-first**: use a local store (IndexedDB via Dexie) with an **outbox sync queue**; the UI must work fully offline and reconcile when online.
- **`packages/mock-api`** — a typed mock data layer implementing the spec's entities (Customer, Site, Device, Meter, Plan, Subscription, Wallet, LedgerEntry, Payment, TelemetryReading, Ticket, Technician, DisconnectEvent) and the §8 endpoints as in-memory/MSW handlers. **No real backend in v1** — but put metering behind a `MeterAdapter` interface and payments behind a `PaymentProvider` interface so they can be swapped later. Seed it with the illustrative data shown in the prototypes (Ghanaian names, GHS ₵, GH-site IDs).

## What to build (v1 = the prototypes, working)
Implement every screen described in the README "Screens / Views" section. Specifically the must-haves:
- **Customer:** Home (pick **variant A · Balance-first** as the default; keep B and C behind a feature flag for later A/B testing), the full **top-up bottom-sheet flow** (amount → MoMo/Hubtel → optimistic success → balance update), Usage, Savings/Reliability, Report-a-fault → ticket status, Notifications, Profile (EN/Twi i18n scaffolding), and the **USSD parity** screen.
- **Field:** Work-orders list with **sync outbox** banner, the **5-step onboarding wizard** (KYC → survey → serial capture → commissioning checklist that gates activation → activate), and ticket resolve-with-photo. Everything queues offline.
- **Ops:** **Exceptions** (default landing) + **Collections** (hardship hold + manual reconnect + manual wallet adjustment, all audit-logged with a toast) + **Fleet map** + **Ticket queue** (assign technician) + **Site 360** slide-over (devices, telemetry, wallet + append-only ledger) + Analytics (CSV export) + Users & roles.

## Hard requirements (from spec §4.3 / §10)
- **Status system everywhere:** green = on/healthy, amber = low/attention, red = off/fault, always color **+ icon + label**. Reuse the shared `Chip`.
- **Disconnect policy:** low-balance warning *before* cutoff; grace period + partial keep-alive; hardship-hold flag blocks auto-disconnect; never silent-cut. Surface these states in Customer + Ops.
- **Prepaid-metered wallet:** balance in kWh, depletes with consumption, zero → disconnect after grace. Wallet balance is **derived from the append-only ledger**.
- **Offline-first** mobile apps; **last-known state + timestamp**, never blank. **Localization** (EN + Twi) and **large tap targets / big numerals** from day one.
- Money = integer minor units + currency code (GHS). IDs = UUID.

## Quality bar
- TypeScript strict, ESLint + Prettier, sensible component structure, accessible (labels, focus states, ≥44px targets).
- Match the prototype's spacing, radii, type scale and the warm palette. Use real icons (e.g. **Lucide**) at matching stroke weight — don't hand-draw SVGs.
- A short `README.md` at repo root: what each app is, how to run (`pnpm i`, `pnpm dev`), and the deployed URLs.

## Deploy to Vercel
- Add a Vercel project per app (monorepo: set each app's **Root Directory** to `apps/ops`, `apps/customer`, `apps/field`; framework preset = Vite; build = `pnpm build`, output = `dist`).
- Use **Turborepo remote caching**-friendly settings; ensure `pnpm-workspace.yaml` and `vercel.json` (if needed) are committed.
- Suggested production domains: `ops.kanea.*`, `app.kanea.*` (customer), `field.kanea.*` — or Vercel preview URLs for now. Print the three URLs when done.
- Commit in logical chunks with clear messages; open the work on `main` (or a PR if you prefer).

## Build sequence (per spec §9 — thin vertical slice first)
1. Monorepo + `design-system` package + fonts/tokens + shared `Chip`/`Button`/`Card`.
2. `mock-api` package with entities, seed data, `MeterAdapter`/`PaymentProvider` interfaces.
3. **Vertical slice:** Customer Home (variant A) → top-up → balance updates → simulate consumption → low-balance warning → disconnect → reconnect. Get this end-to-end before broadening.
4. Finish Customer (incl. USSD), then Field (onboarding → activation so "sites" exist), then Ops (exceptions, collections, site 360, tickets, analytics).
5. Wire Vercel, deploy, verify all three load and the core flows work. Report the URLs + anything you stubbed.

## Open decision to honor
Pricing model is assumed **prepaid metered** (spec §2.1). Keep the billing logic isolated so a switch to flat-tier or hybrid only touches the wallet/billing module.

When you finish, give me: the repo state, the three Vercel URLs, and a short list of what's mocked vs. real so I know what to wire to a backend next.
