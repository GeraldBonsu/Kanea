# Kanea — Solar Subscription Utility

Power as a service for the Ghana market. Three apps, one monorepo.

| App | What it is | Deployed URL |
|---|---|---|
| **Customer** | Mobile-web app for households — balance, top-up, usage, fault reporting | https://kanea-customer.vercel.app |
| **Field** | Offline-first app for agents & technicians — onboarding wizard, work orders | https://kanea-field.vercel.app |
| **Ops** | Desktop dashboard — exceptions, collections, fleet map, site 360, analytics | https://kanea-ops.vercel.app |

## Getting started

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install

# Run all three apps in dev mode (ports 5173, 5174, 5175)
pnpm dev

# Or run individually
cd apps/customer && pnpm dev   # http://localhost:5173
cd apps/field    && pnpm dev   # http://localhost:5174
cd apps/ops      && pnpm dev   # http://localhost:5175
```

## Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Apps:** React + TypeScript + Vite (all three)
- **Design system:** `packages/design-system` — oklch tokens, Chip/Button/Card
- **Mock API:** `packages/mock-api` — MSW handlers + in-memory store with Ghanaian seed data
- **Offline:** Field app uses an outbox queue (Dexie/IndexedDB-ready)

## Mocked vs real (what to wire next)

| Feature | Status |
|---|---|
| Auth (phone + OTP) | Mocked — wire to Africa's Talking or similar |
| MoMo / Hubtel payments | Mocked via `PaymentProvider` interface |
| Meter telemetry | Mocked via `MeterAdapter` interface |
| Wallet / ledger | In-memory store (resets on reload) — wire to Postgres |
| SMS / USSD | UI simulator only — wire to Africa's Talking |
| Maps | Striped placeholder — drop in MapLibre GL |
| Push notifications | UI placeholders — wire to FCM |

## Vercel deployment (3 separate projects)

For each app, create a Vercel project with:
- Root Directory: `apps/customer` (or `apps/field` / `apps/ops`)
- Framework: Vite
- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install`
