import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/otp/request', () => HttpResponse.json({ ok: true })),
  http.post('/api/auth/otp/verify', () => HttpResponse.json({ token: 'mock-jwt-token', customer_id: 'cust-001' })),
  http.get('/api/me', () => HttpResponse.json({ id: 'cust-001', name: 'Akosua Mensah', phone: '+233240001234', language: 'en', segment: 'residential', kyc_status: 'approved' })),
  http.get('/api/wallets/:subId', () => HttpResponse.json({ wallet: { id: 'wal-001', subscription_id: 'sub-001', balance_kwh: 31.0, low_balance_threshold_kwh: 5.0, hardship_hold: false }, ledger: [] })),
  http.post('/api/payments/topup', async ({ request }) => {
    const body = await request.json() as { amountGhs: number };
    return HttpResponse.json({ ok: true, providerRef: `mpay-${Date.now()}`, amountKwh: body.amountGhs / 35 });
  }),
  http.post('/api/tickets', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ id: `KNA-${Math.floor(Math.random() * 9000 + 1000)}`, ...body, status: 'open', created_at: new Date().toISOString() }, { status: 201 });
  }),
];
