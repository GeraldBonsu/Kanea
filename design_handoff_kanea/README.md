# Handoff: Kanea — Solar Subscription Utility (3-app MVP)

## Overview
**Kanea** ("light/lamp" in Twi — a placeholder brand) is a solar-as-a-service utility for the Ghana market. Customers never buy hardware; they pay (prepaid) for power, and three apps make that promise **visible, payable and serviceable**:

| Surface | User | Platform | Core job |
|---|---|---|---|
| **Customer** | Households & SMEs | Mobile (+ USSD/SMS) | Pay, monitor, trust the service |
| **Field** | Agents & technicians | Mobile, offline-first | Onboard, install, maintain |
| **Ops** | Ops / success / finance | Web, desktop | Run the fleet, collections, support |

The full product requirements are in **`solar-utility-product-spec.md`** (in this folder) — read it first; it is the source of truth for scope, data model, API surface and acceptance criteria.

## About the Design Files
The files in `design_files/` are **design references created in HTML** — interactive prototypes showing intended look, layout and behavior. **They are not production code to copy directly.** The task is to **recreate these designs in a real codebase** using the recommended stack below (and the patterns in `solar-utility-product-spec.md` §4.1). All data in the prototypes is mock/illustrative.

- The HTML pages are React-via-Babel prototypes. `*.jsx` files hold the component logic; `styles/kanea.css` holds the **design tokens** (the important part — port these verbatim).
- The phone bezel (`frames/android-frame.jsx`) and browser chrome (`frames/browser-window.jsx`) are **prototype scaffolding only** — do not port them. Real apps run full-screen on device / in the browser.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, status language and interactions. Recreate the UI faithfully. Where a real component library is introduced, match these tokens and proportions rather than the library defaults.

---

## Design Tokens
Ported directly from `design_files/styles/kanea.css`. Colors are authored in **oklch** — keep them in oklch (or convert to the codebase's format, preserving values). The sun/brand color is **never** used for status.

### Color — neutral foundation (warm)
| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.984 0.006 80)` | warm paper background |
| `--bg-2` | `oklch(0.965 0.008 78)` | sunk panels, segmented controls |
| `--surface` | `oklch(1 0 0)` | cards |
| `--ink` | `oklch(0.235 0.012 60)` | primary text + primary buttons |
| `--ink-2` | `oklch(0.44 0.012 58)` | secondary text |
| `--ink-3` | `oklch(0.60 0.010 58)` | muted / captions |
| `--line` | `oklch(0.905 0.008 72)` | hairline borders |
| `--line-2` | `oklch(0.85 0.010 72)` | stronger borders |

### Color — brand (sun). Identity & hero only, NEVER status
| Token | Value |
|---|---|
| `--sun` | `oklch(0.745 0.155 58)` |
| `--sun-deep` | `oklch(0.62 0.145 48)` |
| `--sun-soft` | `oklch(0.95 0.035 70)` |
| `--sun-ink` | `oklch(0.40 0.10 50)` |

### Color — status system (MANDATORY, consistent across all 3 apps)
Always pair color with an **icon + text label** — never color alone.
| Meaning | Fg | Bg | Ink (text) |
|---|---|---|---|
| **On / healthy** (green) | `--on: oklch(0.58 0.115 152)` | `--on-bg: oklch(0.945 0.045 152)` | `--on-ink: oklch(0.40 0.09 152)` |
| **Low / attention** (amber) | `--low: oklch(0.74 0.135 78)` | `--low-bg: oklch(0.955 0.055 84)` | `--low-ink: oklch(0.48 0.10 70)` |
| **Off / fault** (red) | `--off: oklch(0.555 0.195 27)` | `--off-bg: oklch(0.955 0.038 27)` | `--off-ink: oklch(0.46 0.16 27)` |
| **Info** (charts/links, non-status) | `--info: oklch(0.55 0.10 245)` | `--info-bg: oklch(0.95 0.03 245)` | — |

### Typography
- **Display / numerals:** `Space Grotesk` (weights 400–700). Used for headings, balances and all data. Apply `font-feature-settings: 'tnum' 1` and `letter-spacing: -0.02em` to money/numbers (`.num`).
- **UI / body:** `Hanken Grotesk` (400–800). Legible at mixed literacy.
- Both from Google Fonts. Scale guidance: hero balance 56–60px; screen titles 21–26px; body 14–15px; captions 12–13px. Mobile tap targets ≥ 44px.

### Radius / shadow
- Radii: `--r-sm 8`, `--r 14`, `--r-lg 20`, `--r-xl 28` (px).
- Shadows: `--shadow-sm`, `--shadow`, `--shadow-lg` — soft, warm-tinted (`rgba(40,30,15,…)`). See CSS for exact values.

### Components (port the patterns from `kanea.css`)
- **`.chip`** — pill, 8px dot + label, in `on`/`low`/`off`/`neutral` variants.
- **`.btn`** — `btn-primary` (ink bg), `btn-sun` (sun bg, dark text), `btn-ghost` (surface + border). Radius `--r`, `white-space: nowrap`.
- **`.card`** — surface, 1px `--line` border, `--r-lg`, `--shadow-sm`.

---

## Screens / Views

> Detailed copy and structure live in the prototype `.jsx` files; this is the implementation map. Recreate each screen's layout and the status-driven states.

### Customer app (`design_files/apps/customer*.jsx`)
Phone, single-column, bottom tab nav (Home · Usage · Savings · Help). A persistent "last updated / offline" freshness strip. Top-up button is always one tap from Home.

- **Home** — built in **3 explored variants** (ship one, or A/B test):
  - **A · Balance-first:** hero balance (kWh, ~60px) + "≈ N days left" + ≈₵ + power chip + full-width **Top up** + battery row + savings teaser.
  - **B · Status-first:** large traffic-light status disc (green/amber/red) reading "Power on/off" you can see across a room; balance is secondary. Lowest-literacy.
  - **C · Glance:** modular cards — power, balance, battery, savings/usage.
  - All three respond to **service state**: `healthy` (green), `low` (amber low-balance warning *before* cutoff), `off` (red, disconnected after grace → "Top up to restore"). A successful top-up reconnects.
- **Top-up flow** — bottom sheet: amount presets (₵10/20/50/100) + ≈kWh → method (MTN MoMo saved / Hubtel) + optional auto-top-up → processing → success (optimistic balance update; reconcile on provider webhook).
- **Usage** — day/week/month bar chart, consumption + generation, last-known if offline.
- **Savings & reliability** — "saved ₵X vs. diesel this month", uptime 99.x%, 6-month uptime bars. *Emotional justification — keep prominent.*
- **Report a fault** — category grid (icon-first) + optional photo → creates Ticket → ticket status timeline with technician ETA.
- **Notifications** — low balance, payment confirmed, disconnect warning, maintenance, power restored.
- **Profile** — language (English / Twi), plan, encrypted-data note.
- **USSD/SMS parity (required)** — `*123#` menu: 1) Balance & days 2) Top up 3) Report fault 4) Help. SMS triggers for the key events. Build in parallel, not after.

### Field app (`design_files/apps/field.jsx`)
Phone, offline-first, large controls (built for sun glare / gloves / one hand). Persistent **sync outbox** banner (synced = green / queued = amber / offline = neutral).
- **Work / My day** — role (agent/technician), stock count, sync banner, big **New customer** CTA, assigned work-orders list with priority + distance.
- **Onboarding wizard (5 steps, progress bar):** ① Customer & KYC (name, phone=login, ID photo, DPA consent) → ② Site survey (geo-tag + photos) → ③ Install capture (scan panel/battery/inverter/meter serials; decrements stock) → ④ Commissioning checklist (mounting, wiring, meter pairing, test power-on — **all must pass** to activate) → ⑤ Site activated + queued-to-sync summary.
- **Ticket detail / resolve** — map + navigate, reported detail, diagnosis → log parts → **photo evidence (required)** → close → site health updates; syncs to Ops.

### Ops dashboard (`design_files/apps/ops*.jsx`)
Desktop, left sidebar nav + top bar with global summary (% online, low-balance, at-risk). Default landing = **Exceptions**.
- **Exceptions** — "deal with this now" list: offline meters, abnormal usage, battery-health, repeated faults, connectivity flapping; severity filter; row → Site 360.
- **Collections & arrears** — sites at/near zero, grace status; **set hardship hold** (blocks auto-disconnect), **manual reconnect**, **manual wallet adjustment** — all **audit-logged** with the acting user (show a confirmation toast).
- **Fleet map** — map (use MapLibre/Leaflet) with status-colored site dots + summary tiles + legend.
- **Ticket queue** — type tag, priority, SLA timer (overdue in red), assign to technician (→ appears in field app).
- **Site 360 (slide-over)** — devices + health, telemetry chart (battery SoC), wallet balance + **append-only ledger** (topup/consumption/adjustment/grace_credit), payments, disconnect history, hold/reconnect actions.
- **Analytics** — active subs, top-up volume, uptime, disconnects; export CSV.
- **Users & roles** — manage agents/technicians/ops; role-based access.

---

## Interactions & Behavior
- **Status drives the screen.** A single `serviceState` (healthy/low/off) recolors Home, banners and chips. Disconnect **never** happens without a prior low-balance warning (app + SMS + USSD); a grace period + partial keep-alive precede cutoff; a **hardship hold** blocks automated disconnect.
- **Optimistic top-up:** balance updates immediately, reconciles on `POST /payments/webhook`.
- **Offline-first (both mobile apps):** show last-known state with a timestamp — never a blank screen. Queue actions in a local outbox (SQLite via expo-sqlite / WatermelonDB) and sync on reconnect.
- **Transitions:** bottom sheet slides up (~260ms ease); Ops drawer slides in from right (~280ms). Buttons depress 1px on `:active`. Keep motion subtle.
- **Audit:** every disconnect and every manual wallet adjustment is logged.

## State Management
- Customer: `serviceState`, wallet balance (derived from ledger), tickets, language, auto-top-up flag, connectivity.
- Field: current wizard step + captured KYC/survey/serials/checklist, outbox queue + count, online flag, assigned tickets.
- Ops: selected view, selected site (for 360), collections rows (hold/reconnect mutations), ticket assignments.
- Data fetching per the API surface in spec §8 (`/auth/otp`, `/me`, `/sites/:id`, `/sites/:id/telemetry`, `/wallets/:subId`, `/payments/topup`, `/payments/webhook`, `/tickets`, `/field/*`, `/ops/*`). Abstract metering behind `MeterAdapter` and payments behind `PaymentProvider` (spec §4.1).

## Assets
- **Fonts:** Space Grotesk + Hanken Grotesk (Google Fonts).
- **Icons:** inline stroke SVGs in the prototypes (1.5–2.4px stroke). Replace with an open icon set of equivalent weight (e.g. Lucide) — match the line weight, don't hand-draw.
- **Logo:** simple geometric sun mark (filled disc + 8 rays) — see the `<svg class="mark">` in `Kanea — Framework.html`. No raster brand assets exist; "Kanea" is a placeholder name to confirm/replace.
- No photographic assets; striped placeholders stand in for maps/site photos.

## Files (in `design_files/`)
- `Kanea — Framework.html` — brand hub, design-system snapshot, app launcher.
- `apps/Customer App.html` + `customer.jsx` + `customer-screens.jsx` — customer app + 3 Home variants + USSD mock.
- `apps/Ops Dashboard.html` + `ops.jsx` + `ops-views.jsx` — ops dashboard + Site 360.
- `apps/Field App.html` + `field.jsx` — field app + onboarding wizard.
- `styles/kanea.css` — **design tokens & component primitives (port these).**
- `frames/*.jsx` — prototype-only device/browser chrome (do not port).
- `../solar-utility-product-spec.md` — full product spec (source of truth).

> See **`CLAUDE_CODE_PROMPT.md`** in this folder for a ready-to-paste prompt that sets up the monorepo, wires the design tokens, builds each app, and deploys to Vercel.
