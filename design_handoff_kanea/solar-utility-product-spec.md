# Solar Subscription Utility — Product Specification (MVP)

**Version:** 0.1 (MVP scope)
**Purpose:** Developer-ready spec for three applications. Intended workflow: design screens in Claude Design, build in Claude Code.
**Status:** Draft for build. One product decision is still open (pricing model — see §2.1) and it affects the customer app wallet logic.

---

## How to use this document

- §3–§4 are **shared foundations** — read these first; all three apps depend on them.
- §5, §6, §7 are the three app MVPs. Each is self-contained enough to build on its own.
- Each app section ends with **acceptance criteria** (checkable) and **explicitly out of scope** (do not build for v1).
- "MVP" = build now. "Later" = deliberately deferred; note it but do not build it.

---

## 1. Product in one line

We sell **reliable electricity as a monthly service**. The customer never buys hardware. They pay (prepaid) for power; we own, monitor, and maintain the solar-plus-battery system; the apps make that promise visible, payable, and serviceable.

The three surfaces:

| App | User | Core job | Platform |
|---|---|---|---|
| **Customer app** | Households & small businesses | Pay, monitor usage, trust the service | Mobile (+ USSD/SMS parity) |
| **Field app** | Sales agents & technicians | Onboard customers, install, maintain | Mobile (offline-first) |
| **Ops dashboard** | Ops, customer success, finance | Run the fleet, collections, maintenance | Web |

---

## 2. The one open decision (blocks customer-app wallet)

### 2.1 Pricing model

Pick one before building the wallet. The recommended MVP choice is **prepaid metered**, because customers in target markets already understand prepaid grid meters (buy units → deplete → top up), and prepaid removes collections risk (no balance, no power).

| Option | Wallet logic | Revenue risk |
|---|---|---|
| **Prepaid metered** *(recommended MVP)* | Balance in units (kWh) or money; depletes with consumption; auto-disconnect at zero | Lowest — power follows payment |
| Flat tier | Fixed monthly fee per plan; due date; disconnect on non-payment | You carry usage risk |
| Hybrid | Base capacity fee + metered usage | Most complex; defer to post-MVP |

**Assumption for this spec:** prepaid metered. If this changes, the customer-app wallet (§5) and billing engine change; everything else holds.

---

## 3. System overview

Closed loop: the **smart meter** is both the metering instrument and the remote enable/disable switch. It is the spine of the business.

```
Customer site (solar + battery + smart meter)
   │  telemetry (usage, battery, faults)        ▲ remote enable / disable (control)
   ▼                                            │
                Cloud platform (metering · billing · monitoring)
   ▲                         │                          │
   │ payment confirmed       │ data                     │ fleet data
Mobile money  ◄── top-up ── Customer app          Ops dashboard + Field app
```

Key principle: **payment → unlock** and **zero balance → disconnect** are server-side decisions pushed to the meter; the apps observe and trigger, they do not enforce.

---

## 4. Shared foundations

### 4.1 Recommended tech stack

Optimised for a small team building with Claude Code (TypeScript end-to-end reduces context switching).

- **Customer app + Field app:** React Native (Expo). Cross-platform, shared components, strong Claude Code support. *(Flutter is an acceptable alternative if the team prefers Dart.)*
- **Offline storage (both mobile apps):** local SQLite via `expo-sqlite` or WatermelonDB, with a sync queue (outbox pattern).
- **Ops dashboard:** React + TypeScript (Vite), Recharts for charts, a map lib (MapLibre/Leaflet) for the fleet map.
- **Backend:** Node + TypeScript (NestJS or Fastify). Postgres as primary DB; **TimescaleDB** (Postgres extension) for telemetry time-series; Redis for job queues.
- **Auth:** phone-number + OTP (phone is the customer identity in these markets). Role-based access for field/ops.
- **Payments + USSD + SMS:** an aggregator that covers all three — e.g. Africa's Talking (USSD/SMS + payments), with Flutterwave/Paystack and Hubtel (Ghana) as payment options. Abstract behind a `PaymentProvider` interface.
- **Metering integration:** **buy, don't build, for v1.** Integrate a proven PAYGo/metering platform (Angaza, PaygOps, or Odyssey) or the device OEM's API behind a `MeterAdapter` interface so it can be swapped or brought in-house later. Do **not** implement the metering/lockout token protocol from scratch in the MVP.

### 4.2 Core data model (shared)

Minimum entities. Keep IDs as UUIDs. Money stored as integer minor units + currency code.

- **Customer** — id, name, phone (unique, login), language, segment (`residential` | `sme` | `ci`), kyc_status, created_at.
- **Site** — id, customer_id, geo (lat/lng), address_text, status (`prospect`|`installed`|`active`|`suspended`|`decommissioned`).
- **Device** — id, site_id, type (`panel`|`battery`|`inverter`|`meter`), serial, oem, installed_at, health_status, warranty_until.
- **Meter** — id, device_id, external_meter_ref (the PAYGo platform's id), last_seen_at, connectivity_status.
- **Plan** — id, name, segment, capacity_kw, unit_price (minor units/kWh), base_fee (nullable), description.
- **Subscription** — id, customer_id, site_id, plan_id, status, started_at.
- **Wallet** — id, subscription_id, balance (kWh or money), low_balance_threshold.
- **LedgerEntry** — id, wallet_id, type (`topup`|`consumption`|`adjustment`|`grace_credit`), amount, balance_after, source_ref, created_at. *(Append-only; the wallet balance is derived/cached from this.)*
- **Payment** — id, customer_id, provider, provider_ref, amount, status, channel (`app`|`ussd`|`agent`), created_at.
- **TelemetryReading** — meter_id, ts, generation_wh, consumption_wh, battery_soc, voltage. *(TimescaleDB hypertable.)*
- **Ticket** — id, site_id, type (`fault`|`maintenance`|`install`), status, priority, reported_by, assigned_to, sla_due_at, notes[].
- **Technician** — id (user), name, phone, region, skills[].
- **DisconnectEvent** — id, meter_id, reason, initiated_by (`system`|`ops`), grace_applied (bool), ts.

### 4.3 Cross-cutting requirements (all apps)

1. **Offline-first (mobile apps).** Assume intermittent GSM. Apps must function and queue actions offline, sync on reconnect. Telemetry "real-time" is best-effort; design for last-known-state with a `last_seen` timestamp shown to the user.
2. **USSD/SMS parity (customer-critical actions).** Check balance, top up, get low-balance alerts, and payment confirmations **must** work on a feature phone with no data. The smartphone app is the premium layer; USSD is the mass-market layer. (See §5.6.)
3. **Mobile money is the default payment rail.** Save payment method; support auto-pay/auto-top-up opt-in.
4. **Localization.** Multi-language from day one (English + at least one local language per launch market). Currency per market. Avoid text-heavy screens; lead with icons + numbers for low-literacy accessibility.
5. **Low bandwidth.** Small payloads, cache aggressively, no large media on first load.
6. **Security & privacy.** Encrypt PII at rest and in transit; phone-OTP auth; role-based access on field/ops; align with local data-protection law (e.g. Ghana Data Protection Act, Kenya DPA, Nigeria NDPA). Audit-log every disconnect and every manual wallet adjustment.
7. **Remote-disconnect policy (mandatory in billing logic, surfaced in apps).** Disconnect is a financeability necessity *and* a reputational live wire. The MVP must implement: a configurable **grace period**, **partial-payment keep-alive** (small balance keeps essential load on), low-balance warnings *before* cutoff (app + SMS + USSD), and a **hardship hold** flag ops can set to prevent automated disconnect. Never silent-cut without prior warning.

### 4.4 MVP guardrails — explicitly OUT of scope for v1 (all apps)

- Appliance-level / circuit-level monitoring and disaggregation.
- Capacity upgrade/downgrade self-service (handle manually via ops for now).
- Referrals program, carbon-impact display, gamification.
- In-app chat/support bot (use phone + ticket only).
- Predictive-maintenance ML models (collect the data now; model later).
- Multi-currency consolidation / cross-market reporting.
- C&I-specific contract management and PPA billing (residential/SME prepaid first).

---

## 5. App 1 — Customer App (MVP)

### 5.1 Persona & primary jobs
Household or small-business owner, smartphone with intermittent data. Jobs: *"Do I have power / how much is left?"*, *"Top up fast,"* *"Is the service worth what I pay?"*, *"Something's broken — get help."*

### 5.2 MVP features
1. **Onboarding/login** — phone + OTP; link to existing subscription (created by agent in field app).
2. **Home / status screen** — current balance (units + "≈ N days left at your usage"), power status (on/off), battery state ("~6 hrs backup"), last-updated timestamp. This is the most-opened screen — make balance + top-up the hero.
3. **Top up** — one tap → mobile money → confirmation. Saved method + optional auto-top-up at threshold.
4. **Usage** — daily/weekly/monthly consumption and generation, simple bar chart. Last-known if offline.
5. **Savings & reliability** — "You saved ~$X vs. diesel/grid this month" and "Power uptime this month: 99.x%." *This is the emotional justification for a perpetual subscription — keep it prominent, not buried.*
6. **Report a fault** — pick category, optional photo, submit → creates a Ticket; show ticket status + technician ETA when assigned.
7. **Notifications** — low balance (before cutoff), payment confirmed, disconnect warning, maintenance scheduled, power restored.

### 5.3 Key screens
Home (status + balance), Top-up, Usage detail, Savings/Reliability, Report fault, Ticket status, Notifications, Profile/Language.

### 5.4 Core flows
- **Top-up:** Home → Top up → enter/confirm amount → mobile money → success → balance updates (optimistic, reconcile on webhook).
- **Low balance → cutoff:** threshold hit → warning (push + SMS + USSD) → grace/partial keep-alive → if still zero after grace, disconnect → "power off, top up to restore" with one-tap top-up → payment → auto-reconnect.
- **Fault:** Report fault → ticket created → push when assigned + ETA → push when resolved.

### 5.5 Acceptance criteria
- [ ] User logs in with phone + OTP and sees their live (or last-known + timestamp) balance and power status.
- [ ] User completes a mobile-money top-up end-to-end; balance reflects it within seconds of provider webhook.
- [ ] App opens and shows last-known state with no connectivity; queued actions sync on reconnect.
- [ ] Low-balance warning fires before any disconnect; disconnect never happens without a prior warning.
- [ ] Savings and uptime figures render for the current month.
- [ ] Fault report creates a ticket visible in the ops dashboard (§7).
- [ ] All customer-critical actions have a USSD equivalent (§5.6).

### 5.6 USSD/SMS parity (required)
Menu (e.g. `*XXX#`): 1) Balance & days left 2) Top up 3) Report fault 4) Help/contact. SMS triggers: low balance, payment confirmed, disconnect warning, power restored. Build this in parallel with the app, not after.

### 5.7 Design notes (for Claude Design)
Trust + clarity for mixed literacy. Big numbers, status via colour + icon (green=on, amber=low, red=off), minimal text, large tap targets, the top-up button always one tap from home.

---

## 6. App 2 — Field App (MVP)

### 6.1 Persona & primary jobs
Sales agents and technicians, often rural, frequently offline, mid-range Android. Jobs: onboard a customer, install and commission a system correctly, resolve maintenance/faults. Install quality and O&M speed directly protect the uptime promise the customer is paying for.

### 6.2 MVP features
1. **Auth + role** — phone+OTP; roles `agent`, `technician`.
2. **Customer onboarding / KYC** — capture customer details, phone, ID photo, consent; create Customer + prospect Site. Works offline; syncs later.
3. **Site survey** — geo-tag location, basic site notes/photos.
4. **Installation capture** — scan/enter Device serials (panel, battery, inverter, meter), link to Site.
5. **Commissioning checklist** — guided steps (mounting, wiring, meter pairing, test power-on); must pass before Site → `active`.
6. **Work orders / tickets** — see assigned tickets, navigate to site, update status, log parts/notes, close with photo evidence.
7. **Offline sync** — everything above queues offline and syncs (outbox); conflict-safe.
8. **Inventory-lite** — technician's assigned stock (serials) decremented on install. *(Full warehouse inventory is Later.)*

### 6.3 Core flows
- **Onboard + install:** New customer → KYC → site survey → install capture (serials) → commissioning checklist → activate subscription/plan → Site `active`.
- **Resolve ticket:** My tickets → open → navigate → diagnose → update/parts → resolve with photo → Site health updates.

### 6.4 Acceptance criteria
- [ ] Agent onboards a customer fully offline; record syncs and appears in ops dashboard on reconnect.
- [ ] Technician captures all device serials and links them to a site.
- [ ] A site cannot be set `active` until the commissioning checklist passes.
- [ ] Assigned tickets appear, can be updated offline, and close with photo evidence.
- [ ] Installed serials decrement the technician's assigned inventory.

### 6.5 Out of scope (v1)
Route optimization, commissions/payroll, full warehouse inventory, in-app training modules.

### 6.6 Design notes
Built for sun glare, gloves, and one hand. Large controls, step-by-step wizards, obvious "saved offline / synced" states, camera-first capture.

---

## 7. App 3 — Ops & Fleet Dashboard (MVP)

### 7.1 Persona & primary jobs
Ops manager, customer success, finance. **This is where the durable moat is** — fleet health, collections, and the data that prices risk. Jobs: see what's broken before customers do, manage arrears/disconnects humanely, run support, track the basics.

### 7.2 MVP features
1. **Fleet overview** — map + summary: total sites, % online, % low-balance, open tickets, sites at risk of disconnect.
2. **Site/customer 360** — one screen per customer/site: status, devices + health, telemetry charts, wallet + ledger, payment history, tickets, disconnect history.
3. **Alerts / exceptions queue** — offline meters, abnormal usage, low battery health, repeated faults. The "deal with this now" list.
4. **Collections & arrears** — sites at/near zero balance, grace status; **set hardship hold**; manual reconnect; manual wallet adjustment (audit-logged).
5. **Ticket queue** — all tickets, assign to technician, SLA timers, status.
6. **Basic analytics** — active subscriptions, top-up volume, uptime %, churn/disconnect counts. (Export CSV.)
7. **User & role management** — manage agents/technicians/ops users and permissions.

### 7.3 Acceptance criteria
- [ ] Map + summary loads with live fleet status and refreshes.
- [ ] Selecting a site shows devices, telemetry, wallet/ledger, payments, and tickets in one view.
- [ ] Exceptions queue surfaces offline meters and low battery-health sites.
- [ ] Ops can set a hardship hold that prevents automated disconnect, and can manually reconnect — both audit-logged.
- [ ] Tickets can be assigned to technicians and appear in the field app.
- [ ] Manual wallet adjustments are recorded as ledger entries with the acting user.

### 7.4 Out of scope (v1)
Predictive-maintenance ML, BI/cohort dashboards, securitization/portfolio reporting, automated technician routing, C&I/PPA contract management.

### 7.5 Design notes
Dense, scannable, desktop-first. Status colour-coding consistent with the customer app. The exceptions queue and collections views are the daily drivers — make them the default landing tabs.

---

## 8. Minimal API surface (illustrative)

```
POST /auth/otp/request            POST /auth/otp/verify
GET  /me                          GET  /sites/:id
GET  /sites/:id/telemetry?range=  GET  /wallets/:subId
POST /payments/topup              POST /payments/webhook   (provider callback)
POST /tickets                     PATCH /tickets/:id
POST /field/onboard               POST /field/install      POST /field/commission
GET  /ops/fleet/summary           GET  /ops/exceptions
POST /ops/sites/:id/hold          POST /ops/sites/:id/reconnect
POST /ops/wallets/:id/adjust
# MeterAdapter (internal): meter.enable(), meter.disable(), meter.readings()
# PaymentProvider (internal): charge(), verify(); USSDProvider: menu, sms()
```

---

## 9. Suggested build sequence (for Claude Code)

1. **Backend core + data model** (§4.2), auth (phone+OTP), `MeterAdapter` + `PaymentProvider` interfaces with one real implementation each.
2. **Billing engine**: wallet, ledger, top-up → unlock, zero-balance → disconnect, grace/partial/hardship logic. *Most business-critical; test hard.*
3. **Customer app** (§5) + **USSD/SMS parity** (§5.6) in parallel.
4. **Field app** (§6) — onboarding through activation, so real sites exist.
5. **Ops dashboard** (§7) — fleet, site 360, exceptions, collections, tickets.
6. Telemetry pipeline (meter → TimescaleDB) feeding charts in customer + ops apps.

Recommended: build a thin vertical slice end-to-end first (onboard one site → top up → consume → low balance → disconnect → reconnect) before broadening features.

---

## 10. Design direction (for Claude Design)

- **Principles:** trustworthy, clear, low-literacy friendly, fast on cheap phones.
- **Status system (consistent across all three apps):** green = on/healthy, amber = low/attention, red = off/fault. Pair colour with icon + label (never colour alone).
- **Hero moments:** customer app = balance + top-up + "you saved $X / uptime 99.x%"; ops = exceptions + collections.
- **Accessibility:** large tap targets, big numerals, minimal copy, multi-language, offline/synced state always visible.

---

## 11. Open decisions & assumptions

- **[OPEN]** Pricing model (§2.1) — assumed prepaid metered.
- **[ASSUMPTION]** Metering backend is bought (Angaza/PaygOps/Odyssey) for v1, abstracted behind `MeterAdapter`.
- **[ASSUMPTION]** First market drives currency, languages, payment providers, and data-protection specifics — confirm before §3 build.
- **[DEFER]** C&I segment apps/contract management — residential/SME prepaid first.
