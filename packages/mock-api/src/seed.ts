import type {
  Customer, Site, Device, Meter, Plan, Subscription,
  Wallet, LedgerEntry, Payment, TelemetryReading, Ticket, Technician, DisconnectEvent,
} from './entities';

// ---- Plans ----
export const PLANS: Plan[] = [
  { id: 'plan-home-08', name: 'Home 0.8kW', segment: 'residential', capacity_kw: 0.8, unit_price: 35, base_fee: null, description: 'Ideal for small homes with basic lighting and phone charging.' },
  { id: 'plan-home-12', name: 'Home 1.2kW', segment: 'residential', capacity_kw: 1.2, unit_price: 35, base_fee: null, description: 'Comfortable home with fans, TV, and fridge.' },
  { id: 'plan-sme-3', name: 'SME 3kW', segment: 'sme', capacity_kw: 3, unit_price: 32, base_fee: 5000, description: 'For small businesses with larger load needs.' },
];

// ---- Customers ----
export const CUSTOMERS: Customer[] = [
  { id: 'cust-001', name: 'Akosua Mensah', phone: '+233240001234', language: 'en', segment: 'residential', kyc_status: 'approved', created_at: '2025-08-15T09:00:00Z' },
  { id: 'cust-002', name: 'Yaw Boateng', phone: '+233200002345', language: 'en', segment: 'residential', kyc_status: 'approved', created_at: '2025-07-01T10:30:00Z' },
  { id: 'cust-003', name: 'Adwoa Owusu', phone: '+233240003456', language: 'tw', segment: 'residential', kyc_status: 'approved', created_at: '2025-06-20T08:00:00Z' },
  { id: 'cust-004', name: 'Kofi Asante', phone: '+233200004567', language: 'en', segment: 'sme', kyc_status: 'approved', created_at: '2025-05-10T11:00:00Z' },
  { id: 'cust-005', name: 'Ama Darko', phone: '+233240005678', language: 'en', segment: 'residential', kyc_status: 'approved', created_at: '2025-09-01T14:00:00Z' },
  { id: 'cust-006', name: 'Daniel Mensah', phone: '+233200006789', language: 'en', segment: 'residential', kyc_status: 'approved', created_at: '2025-08-20T09:00:00Z' },
  { id: 'cust-007', name: 'Fatima Iddrisu', phone: '+233200007890', language: 'en', segment: 'residential', kyc_status: 'approved', created_at: '2025-07-15T10:00:00Z' },
  { id: 'cust-008', name: 'Esi Mensah', phone: '+233240008901', language: 'tw', segment: 'residential', kyc_status: 'approved', created_at: '2025-06-01T08:30:00Z' },
];

// ---- Sites ----
export const SITES: Site[] = [
  { id: 'GH-Accra-0112', customer_id: 'cust-001', lat: 5.6037, lng: -0.1870, address_text: 'Accra, Cantonments', status: 'active' },
  { id: 'GH-Kumasi-0421', customer_id: 'cust-002', lat: 6.6885, lng: -1.6244, address_text: 'Kumasi, Adum', status: 'active' },
  { id: 'GH-Tamale-0188', customer_id: 'cust-003', lat: 9.4075, lng: -0.8533, address_text: 'Tamale, Choggu', status: 'active' },
  { id: 'GH-Accra-1043', customer_id: 'cust-004', lat: 5.5913, lng: -0.2217, address_text: 'Accra, Dansoman', status: 'active' },
  { id: 'GH-Accra-0991', customer_id: 'cust-005', lat: 5.6145, lng: -0.2109, address_text: 'Accra, Achimota', status: 'suspended' },
  { id: 'GH-Kumasi-0533', customer_id: 'cust-006', lat: 6.7002, lng: -1.6182, address_text: 'Kumasi, Asante', status: 'active' },
  { id: 'GH-Tamale-0712', customer_id: 'cust-007', lat: 9.4022, lng: -0.8620, address_text: 'Tamale, Lamashegu', status: 'active' },
  { id: 'GH-Cape-Coast-077', customer_id: 'cust-008', lat: 5.1054, lng: -1.2470, address_text: 'Cape Coast, Pedu', status: 'active' },
];

// ---- Subscriptions ----
export const SUBSCRIPTIONS: Subscription[] = [
  { id: 'sub-001', customer_id: 'cust-001', site_id: 'GH-Accra-0112', plan_id: 'plan-home-12', status: 'active', started_at: '2025-08-15T09:00:00Z' },
  { id: 'sub-002', customer_id: 'cust-002', site_id: 'GH-Kumasi-0421', plan_id: 'plan-home-12', status: 'active', started_at: '2025-07-01T10:30:00Z' },
  { id: 'sub-003', customer_id: 'cust-003', site_id: 'GH-Tamale-0188', plan_id: 'plan-home-12', status: 'active', started_at: '2025-06-20T08:00:00Z' },
  { id: 'sub-004', customer_id: 'cust-004', site_id: 'GH-Accra-1043', plan_id: 'plan-sme-3', status: 'active', started_at: '2025-05-10T11:00:00Z' },
  { id: 'sub-005', customer_id: 'cust-005', site_id: 'GH-Accra-0991', plan_id: 'plan-home-08', status: 'suspended', started_at: '2025-09-01T14:00:00Z' },
  { id: 'sub-006', customer_id: 'cust-006', site_id: 'GH-Kumasi-0533', plan_id: 'plan-home-08', status: 'active', started_at: '2025-08-20T09:00:00Z' },
  { id: 'sub-007', customer_id: 'cust-007', site_id: 'GH-Tamale-0712', plan_id: 'plan-home-12', status: 'active', started_at: '2025-07-15T10:00:00Z' },
  { id: 'sub-008', customer_id: 'cust-008', site_id: 'GH-Cape-Coast-077', plan_id: 'plan-home-08', status: 'active', started_at: '2025-06-01T08:30:00Z' },
];

// ---- Wallets ----
export const WALLETS: Wallet[] = [
  { id: 'wal-001', subscription_id: 'sub-001', balance_kwh: 31.0, low_balance_threshold_kwh: 5.0, hardship_hold: false },
  { id: 'wal-002', subscription_id: 'sub-002', balance_kwh: 0.0, low_balance_threshold_kwh: 5.0, hardship_hold: false },
  { id: 'wal-003', subscription_id: 'sub-003', balance_kwh: 0.0, low_balance_threshold_kwh: 5.0, hardship_hold: false },
  { id: 'wal-004', subscription_id: 'sub-004', balance_kwh: 1.1, low_balance_threshold_kwh: 10.0, hardship_hold: false },
  { id: 'wal-005', subscription_id: 'sub-005', balance_kwh: 0.0, low_balance_threshold_kwh: 5.0, hardship_hold: false },
  { id: 'wal-006', subscription_id: 'sub-006', balance_kwh: 0.4, low_balance_threshold_kwh: 5.0, hardship_hold: false },
  { id: 'wal-007', subscription_id: 'sub-007', balance_kwh: 0.0, low_balance_threshold_kwh: 5.0, hardship_hold: true },
  { id: 'wal-008', subscription_id: 'sub-008', balance_kwh: 8.2, low_balance_threshold_kwh: 5.0, hardship_hold: false },
];

// ---- Ledger entries for wallet 001 ----
export const LEDGER: LedgerEntry[] = [
  { id: 'led-001', wallet_id: 'wal-001', type: 'topup', amount_kwh: 20.0, balance_after_kwh: 31.0, source_ref: 'pay-001', created_at: '2026-06-01T14:22:00Z' },
  { id: 'led-002', wallet_id: 'wal-001', type: 'consumption', amount_kwh: -3.2, balance_after_kwh: 11.0, source_ref: 'meter-001', created_at: '2026-06-01T12:00:00Z' },
  { id: 'led-003', wallet_id: 'wal-001', type: 'grace_credit', amount_kwh: 0.5, balance_after_kwh: 14.2, source_ref: 'system', created_at: '2026-05-31T10:30:00Z' },
  { id: 'led-004', wallet_id: 'wal-001', type: 'consumption', amount_kwh: -4.1, balance_after_kwh: 13.7, source_ref: 'meter-001', created_at: '2026-05-31T00:00:00Z' },
  { id: 'led-005', wallet_id: 'wal-001', type: 'topup', amount_kwh: 17.8, balance_after_kwh: 17.8, source_ref: 'pay-000', created_at: '2026-05-30T09:00:00Z' },
];

// ---- Tickets ----
export const TICKETS: Ticket[] = [
  { id: 'KNA-2841', site_id: 'GH-Accra-1043', type: 'fault', status: 'open', priority: 'high', title: 'No power reported', reported_by: 'cust-004', assigned_to: null, sla_due_at: '2026-06-01T16:00:00Z', notes: [], created_at: '2026-06-01T14:00:00Z' },
  { id: 'KNA-2838', site_id: 'GH-Cape-Coast-077', type: 'maintenance', status: 'assigned', priority: 'med', title: 'Inverter check', reported_by: 'system', assigned_to: 'tech-001', sla_due_at: '2026-06-01T22:00:00Z', notes: [], created_at: '2026-06-01T10:00:00Z' },
  { id: 'KNA-2835', site_id: 'GH-Kumasi-0421', type: 'fault', status: 'assigned', priority: 'high', title: 'Meter offline', reported_by: 'system', assigned_to: 'tech-002', sla_due_at: '2026-06-01T13:38:00Z', notes: [], created_at: '2026-06-01T09:00:00Z' },
  { id: 'KNA-2829', site_id: 'GH-Accra-0112', type: 'install', status: 'assigned', priority: 'low', title: 'Commissioning visit', reported_by: 'agent-001', assigned_to: 'tech-003', sla_due_at: '2026-06-03T12:00:00Z', notes: [], created_at: '2026-05-31T15:00:00Z' },
  { id: 'KNA-2822', site_id: 'GH-Tamale-0188', type: 'maintenance', status: 'in_progress', priority: 'high', title: 'Battery replacement', reported_by: 'system', assigned_to: 'tech-002', sla_due_at: '2026-06-01T19:00:00Z', notes: [], created_at: '2026-05-31T08:00:00Z' },
];

// ---- Technicians ----
export const TECHNICIANS: Technician[] = [
  { id: 'tech-001', name: 'Kwame Adjei', phone: '+233200100001', region: 'Greater Accra', skills: ['inverter', 'battery'] },
  { id: 'tech-002', name: 'Yaa Boahen', phone: '+233200100002', region: 'Ashanti', skills: ['meter', 'panel'] },
  { id: 'tech-003', name: 'Kojo Danso', phone: '+233200100003', region: 'Volta', skills: ['install', 'commissioning'] },
  { id: 'tech-004', name: 'Abena Frimpong', phone: '+233200100004', region: 'Northern', skills: ['fault', 'battery'] },
];

// ---- Telemetry (last 10 readings for GH-Kumasi-0421) ----
export const TELEMETRY: TelemetryReading[] = [42, 38, 55, 61, 48, 30, 12, 5, 0, 0].map((soc, i) => ({
  meter_id: 'meter-002',
  ts: new Date(Date.now() - i * 3600_000).toISOString(),
  generation_wh: soc > 10 ? soc * 10 : 0,
  consumption_wh: soc > 0 ? 320 : 0,
  battery_soc: soc,
  voltage: soc > 5 ? 220 + Math.random() * 5 : 0,
}));

// ---- Fleet summary ----
export const FLEET = {
  sites: 1284,
  online: 96.2,
  lowBal: 84,
  atRisk: 31,
  openTickets: 47,
  mrr_pesewas: 41_280_00,
};

// ---- Devices ----
export const DEVICES: Device[] = [
  { id: 'dev-001', site_id: 'GH-Kumasi-0421', type: 'inverter', serial: 'IN-7731-G', oem: 'Victron', installed_at: '2025-07-01T10:30:00Z', health_status: 'healthy', warranty_until: '2028-07-01T00:00:00Z' },
  { id: 'dev-002', site_id: 'GH-Kumasi-0421', type: 'battery', serial: 'BT-1182-K', oem: 'BYD', installed_at: '2025-07-01T10:30:00Z', health_status: 'degraded', warranty_until: '2028-07-01T00:00:00Z' },
  { id: 'dev-003', site_id: 'GH-Kumasi-0421', type: 'panel', serial: 'SP-4490-A', oem: 'Jinko', installed_at: '2025-07-01T10:30:00Z', health_status: 'healthy', warranty_until: '2050-07-01T00:00:00Z' },
  { id: 'dev-004', site_id: 'GH-Kumasi-0421', type: 'meter', serial: 'MT-3320-Z', oem: 'Conlog', installed_at: '2025-07-01T10:30:00Z', health_status: 'offline', warranty_until: '2028-07-01T00:00:00Z' },
];
