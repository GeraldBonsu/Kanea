import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/ops/fleet/summary', () => HttpResponse.json({ sites: 1284, online: 96.2, lowBal: 84, atRisk: 31, openTickets: 47 })),
  http.get('/api/ops/exceptions', () => HttpResponse.json([])),
  http.post('/api/ops/sites/:id/hold', () => HttpResponse.json({ ok: true })),
  http.post('/api/ops/sites/:id/reconnect', () => HttpResponse.json({ ok: true })),
  http.post('/api/ops/wallets/:id/adjust', () => HttpResponse.json({ ok: true })),
  http.get('/api/tickets', () => HttpResponse.json([])),
  http.patch('/api/tickets/:id', () => HttpResponse.json({ ok: true })),
];
