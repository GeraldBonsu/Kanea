// MeterAdapter interface — swap the PAYGo platform without touching app code
export interface MeterAdapter {
  enable(meterId: string): Promise<void>;
  disable(meterId: string): Promise<void>;
  readings(meterId: string, from: Date, to: Date): Promise<{ ts: Date; kwh: number; soc: number }[]>;
}

// PaymentProvider interface — swap MoMo aggregator without touching app code
export interface PaymentProvider {
  charge(params: { customerId: string; amountGhs: number; channel: string; phone: string }): Promise<{ providerRef: string; status: 'pending' | 'success' | 'failed' }>;
  verify(providerRef: string): Promise<{ status: 'pending' | 'success' | 'failed' }>;
}

// USSDProvider interface
export interface USSDProvider {
  menu(sessionId: string, phone: string, input: string): Promise<string>;
  sms(phone: string, message: string): Promise<void>;
}

// Mock implementations (in-memory)
export class MockMeterAdapter implements MeterAdapter {
  private states = new Map<string, 'enabled' | 'disabled'>();

  async enable(meterId: string) { this.states.set(meterId, 'enabled'); }
  async disable(meterId: string) { this.states.set(meterId, 'disabled'); }
  async readings(meterId: string, from: Date, to: Date) {
    const hours = Math.ceil((to.getTime() - from.getTime()) / 3_600_000);
    return Array.from({ length: Math.min(hours, 24) }, (_, i) => ({
      ts: new Date(from.getTime() + i * 3_600_000),
      kwh: 0.3 + Math.random() * 0.4,
      soc: 40 + Math.random() * 50,
    }));
  }
}

export class MockPaymentProvider implements PaymentProvider {
  async charge() {
    return { providerRef: `mpay-${Date.now()}`, status: 'pending' as const };
  }
  async verify() {
    return { status: 'success' as const };
  }
}
