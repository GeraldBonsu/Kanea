import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/otp/request', () => HttpResponse.json({ ok: true })),
  http.post('/api/auth/otp/verify', () => HttpResponse.json({ token: 'mock-jwt-token', user_id: 'tech-001' })),
  http.get('/api/me', () => HttpResponse.json({ id: 'tech-001', name: 'Kwame Adjei', role: 'technician', region: 'Greater Accra' })),
  http.post('/api/field/onboard', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ id: `cust-${Date.now()}`, ...body, kyc_status: 'pending', created_at: new Date().toISOString() }, { status: 201 });
  }),
  http.post('/api/field/install', () => HttpResponse.json({ ok: true })),
  http.post('/api/field/commission', () => HttpResponse.json({ ok: true })),
  http.get('/api/tickets', () => HttpResponse.json([])),
  http.patch('/api/tickets/:id', () => HttpResponse.json({ ok: true })),
];
