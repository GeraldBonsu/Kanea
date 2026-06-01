// Core entity types matching the spec §4.2 data model

export type CustomerSegment = 'residential' | 'sme' | 'ci';
export type KycStatus = 'pending' | 'approved' | 'rejected';
export type SiteStatus = 'prospect' | 'installed' | 'active' | 'suspended' | 'decommissioned';
export type DeviceType = 'panel' | 'battery' | 'inverter' | 'meter';
export type HealthStatus = 'healthy' | 'degraded' | 'fault' | 'offline';
export type ConnectivityStatus = 'online' | 'offline' | 'intermittent';
export type SubscriptionStatus = 'active' | 'suspended' | 'cancelled';
export type LedgerEntryType = 'topup' | 'consumption' | 'adjustment' | 'grace_credit';
export type PaymentStatus = 'pending' | 'success' | 'failed';
export type PaymentChannel = 'app' | 'ussd' | 'agent';
export type TicketType = 'fault' | 'maintenance' | 'install';
export type TicketStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'high' | 'med' | 'low';
export type DisconnectReason = 'zero_balance' | 'manual_ops' | 'maintenance';
export type DisconnectInitiator = 'system' | 'ops';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  language: 'en' | 'tw';
  segment: CustomerSegment;
  kyc_status: KycStatus;
  created_at: string;
}

export interface Site {
  id: string;
  customer_id: string;
  lat: number;
  lng: number;
  address_text: string;
  status: SiteStatus;
}

export interface Device {
  id: string;
  site_id: string;
  type: DeviceType;
  serial: string;
  oem: string;
  installed_at: string;
  health_status: HealthStatus;
  warranty_until: string;
}

export interface Meter {
  id: string;
  device_id: string;
  external_meter_ref: string;
  last_seen_at: string;
  connectivity_status: ConnectivityStatus;
}

export interface Plan {
  id: string;
  name: string;
  segment: CustomerSegment;
  capacity_kw: number;
  unit_price: number; // minor units (pesewas) per kWh
  base_fee: number | null;
  description: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  site_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  started_at: string;
}

export interface Wallet {
  id: string;
  subscription_id: string;
  balance_kwh: number;
  low_balance_threshold_kwh: number;
  hardship_hold: boolean;
}

export interface LedgerEntry {
  id: string;
  wallet_id: string;
  type: LedgerEntryType;
  amount_kwh: number;
  balance_after_kwh: number;
  source_ref: string;
  created_at: string;
  acting_user?: string;
}

export interface Payment {
  id: string;
  customer_id: string;
  provider: string;
  provider_ref: string;
  amount_ghs: number; // in pesewas
  status: PaymentStatus;
  channel: PaymentChannel;
  created_at: string;
}

export interface TelemetryReading {
  meter_id: string;
  ts: string;
  generation_wh: number;
  consumption_wh: number;
  battery_soc: number;
  voltage: number;
}

export interface Ticket {
  id: string;
  site_id: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  title: string;
  reported_by: string;
  assigned_to: string | null;
  sla_due_at: string;
  notes: string[];
  created_at: string;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  region: string;
  skills: string[];
}

export interface DisconnectEvent {
  id: string;
  meter_id: string;
  reason: DisconnectReason;
  initiated_by: DisconnectInitiator;
  grace_applied: boolean;
  ts: string;
}
