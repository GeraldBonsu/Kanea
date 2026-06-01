// In-memory store — survives the session, resets on reload
import {
  CUSTOMERS, SITES, DEVICES, PLANS, SUBSCRIPTIONS,
  WALLETS, LEDGER, TICKETS, TECHNICIANS, TELEMETRY, FLEET,
} from './seed';
import type {
  Customer, Site, Device, Plan, Subscription, Wallet,
  LedgerEntry, Ticket, Technician, DisconnectEvent,
} from './entities';

let customers = [...CUSTOMERS];
let sites = [...SITES];
let devices = [...DEVICES];
let plans = [...PLANS];
let subscriptions = [...SUBSCRIPTIONS];
let wallets = [...WALLETS];
let ledger = [...LEDGER];
let tickets = [...TICKETS];
let technicians = [...TECHNICIANS];
let disconnectEvents: DisconnectEvent[] = [];

function uuid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ---- read helpers ----
export const store = {
  fleet: () => FLEET,
  telemetry: () => TELEMETRY,
  customers: () => customers,
  sites: () => sites,
  devices: () => devices,
  plans: () => plans,
  subscriptions: () => subscriptions,
  wallets: () => wallets,
  ledger: () => ledger,
  tickets: () => tickets,
  technicians: () => technicians,
  disconnectEvents: () => disconnectEvents,

  getCustomer: (id: string) => customers.find(c => c.id === id),
  getSite: (id: string) => sites.find(s => s.id === id),
  getWalletBySubscription: (subId: string) => wallets.find(w => w.subscription_id === subId),
  getSubscriptionByCustomer: (customerId: string) => subscriptions.find(s => s.customer_id === customerId),
  getLedgerForWallet: (walletId: string) => ledger.filter(e => e.wallet_id === walletId).sort((a, b) => b.created_at.localeCompare(a.created_at)),
  getTicketsForSite: (siteId: string) => tickets.filter(t => t.site_id === siteId),
  getDevicesForSite: (siteId: string) => devices.filter(d => d.site_id === siteId),

  // ---- mutations ----
  topup(walletId: string, amountKwh: number, paymentRef: string) {
    const wallet = wallets.find(w => w.id === walletId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.balance_kwh += amountKwh;
    const entry: LedgerEntry = {
      id: uuid(), wallet_id: walletId, type: 'topup', amount_kwh: amountKwh,
      balance_after_kwh: wallet.balance_kwh, source_ref: paymentRef,
      created_at: new Date().toISOString(),
    };
    ledger.push(entry);
    return entry;
  },

  setHold(siteId: string, hold: boolean, actingUser: string) {
    const sub = subscriptions.find(s => s.site_id === siteId);
    if (!sub) return;
    const wallet = wallets.find(w => w.subscription_id === sub.id);
    if (!wallet) return;
    wallet.hardship_hold = hold;
    const entry: LedgerEntry = {
      id: uuid(), wallet_id: wallet.id, type: 'adjustment', amount_kwh: 0,
      balance_after_kwh: wallet.balance_kwh, source_ref: `hold:${hold}`,
      created_at: new Date().toISOString(), acting_user: actingUser,
    };
    ledger.push(entry);
  },

  manualAdjust(walletId: string, amountKwh: number, actingUser: string) {
    const wallet = wallets.find(w => w.id === walletId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.balance_kwh += amountKwh;
    const entry: LedgerEntry = {
      id: uuid(), wallet_id: walletId, type: 'adjustment', amount_kwh: amountKwh,
      balance_after_kwh: wallet.balance_kwh, source_ref: 'manual_ops',
      created_at: new Date().toISOString(), acting_user: actingUser,
    };
    ledger.push(entry);
    return entry;
  },

  reconnect(siteId: string, actingUser: string) {
    const site = sites.find(s => s.id === siteId);
    if (site) site.status = 'active';
    const entry: LedgerEntry = {
      id: uuid(), wallet_id: `manual-${siteId}`, type: 'adjustment', amount_kwh: 0,
      balance_after_kwh: 0, source_ref: `reconnect:${actingUser}`,
      created_at: new Date().toISOString(), acting_user: actingUser,
    };
    ledger.push(entry);
  },

  assignTicket(ticketId: string, techId: string) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) { ticket.assigned_to = techId; ticket.status = 'assigned'; }
  },

  createTicket(data: Partial<Ticket>) {
    const t: Ticket = {
      id: `KNA-${Math.floor(Math.random() * 9000 + 1000)}`,
      site_id: data.site_id ?? '',
      type: data.type ?? 'fault',
      status: 'open',
      priority: data.priority ?? 'high',
      title: data.title ?? 'Fault reported',
      reported_by: data.reported_by ?? 'customer',
      assigned_to: null,
      sla_due_at: new Date(Date.now() + 4 * 3600_000).toISOString(),
      notes: [],
      created_at: new Date().toISOString(),
    };
    tickets.push(t);
    return t;
  },

  addCustomer(data: Partial<Customer>) {
    const c: Customer = {
      id: uuid(),
      name: data.name ?? '',
      phone: data.phone ?? '',
      language: data.language ?? 'en',
      segment: data.segment ?? 'residential',
      kyc_status: 'pending',
      created_at: new Date().toISOString(),
    };
    customers.push(c);
    return c;
  },
};
