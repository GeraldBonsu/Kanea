import { http, HttpResponse } from 'msw';
import { store } from './store';

const BASE = '/api';

export const handlers = [
  // auth
  http.post(`${BASE}/auth/otp/request`, () => HttpResponse.json({ ok: true })),
  http.post(`${BASE}/auth/otp/verify`, () =>
    HttpResponse.json({ token: 'mock-jwt-token', customer_id: 'cust-001' })
  ),

  // me
  http.get(`${BASE}/me`, () => HttpResponse.json(store.getCustomer('cust-001'))),

  // sites
  http.get(`${BASE}/sites/:id`, ({ params }) => {
    const site = store.getSite(params.id as string);
    if (!site) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    const devices = store.getDevicesForSite(site.id);
    const tickets = store.getTicketsForSite(site.id);
    return HttpResponse.json({ site, devices, tickets });
  }),

  http.get(`${BASE}/sites/:id/telemetry`, () =>
    HttpResponse.json(store.telemetry())
  ),

  // wallets
  http.get(`${BASE}/wallets/:subId`, ({ params }) => {
    const wallet = store.getWalletBySubscription(params.subId as string);
    if (!wallet) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    const entries = store.getLedgerForWallet(wallet.id);
    return HttpResponse.json({ wallet, ledger: entries });
  }),

  // payments
  http.post(`${BASE}/payments/topup`, async ({ request }) => {
    const body = await request.json() as { walletId: string; amountGhs: number };
    const amountKwh = body.amountGhs / 35; // 35 pesewas/kWh
    const payRef = `mpay-${Date.now()}`;
    const entry = store.topup(body.walletId, amountKwh, payRef);
    return HttpResponse.json({ ok: true, entry, providerRef: payRef });
  }),

  http.post(`${BASE}/payments/webhook`, async ({ request }) => {
    const body = await request.json() as { providerRef: string; status: string };
    return HttpResponse.json({ ok: true, providerRef: body.providerRef, status: body.status });
  }),

  // tickets
  http.get(`${BASE}/tickets`, () => HttpResponse.json(store.tickets())),
  http.post(`${BASE}/tickets`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const ticket = store.createTicket(body);
    return HttpResponse.json(ticket, { status: 201 });
  }),
  http.patch(`${BASE}/tickets/:id`, async ({ params, request }) => {
    const body = await request.json() as { assigned_to?: string };
    if (body.assigned_to) store.assignTicket(params.id as string, body.assigned_to);
    return HttpResponse.json({ ok: true });
  }),

  // ops
  http.get(`${BASE}/ops/fleet/summary`, () => HttpResponse.json(store.fleet())),
  http.get(`${BASE}/ops/exceptions`, () => {
    return HttpResponse.json([
      { id: 'e1', sev: 'off', type: 'Meter offline', site: 'GH-Kumasi-0421', cust: 'Yaw Boateng', detail: 'No telemetry for 9h 12m · last battery 38%', age: '9h' },
      { id: 'e2', sev: 'off', type: 'Battery health critical', site: 'GH-Tamale-0188', cust: 'Adwoa Owusu', detail: 'SoH 61% · 3 deep-discharge cycles this week', age: '1d' },
      { id: 'e3', sev: 'low', type: 'Abnormal usage', site: 'GH-Accra-1043', cust: 'Kofi Asante (SME)', detail: 'Consumption 3.4× the 30-day baseline', age: '4h' },
      { id: 'e4', sev: 'low', type: 'Battery health low', site: 'GH-Cape-Coast-077', cust: 'Esi Mensah', detail: 'SoH 74% · trending down', age: '2d' },
      { id: 'e5', sev: 'low', type: 'Repeated faults', site: 'GH-Kumasi-0421', cust: 'Kwabena Osei', detail: '3rd inverter fault in 30 days', age: '6h' },
      { id: 'e6', sev: 'neutral', type: 'Connectivity flapping', site: 'GH-Ho-0205', cust: 'Akua Sarpong', detail: 'Meter dropped 6× in 24h · GSM signal weak', age: '12h' },
    ]);
  }),

  http.post(`${BASE}/ops/sites/:id/hold`, async ({ params, request }) => {
    const body = await request.json() as { hold: boolean; acting_user: string };
    store.setHold(params.id as string, body.hold, body.acting_user);
    return HttpResponse.json({ ok: true });
  }),

  http.post(`${BASE}/ops/sites/:id/reconnect`, async ({ params, request }) => {
    const body = await request.json() as { acting_user: string };
    store.reconnect(params.id as string, body.acting_user);
    return HttpResponse.json({ ok: true });
  }),

  http.post(`${BASE}/ops/wallets/:id/adjust`, async ({ params, request }) => {
    const body = await request.json() as { amount_kwh: number; acting_user: string };
    const entry = store.manualAdjust(params.id as string, body.amount_kwh, body.acting_user);
    return HttpResponse.json({ ok: true, entry });
  }),

  // field
  http.post(`${BASE}/field/onboard`, async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const customer = store.addCustomer(body as Parameters<typeof store.addCustomer>[0]);
    return HttpResponse.json(customer, { status: 201 });
  }),
  http.post(`${BASE}/field/install`, () => HttpResponse.json({ ok: true })),
  http.post(`${BASE}/field/commission`, () => HttpResponse.json({ ok: true })),
];
