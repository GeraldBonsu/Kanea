export type ServiceState = 'healthy' | 'low' | 'off';
export type Tone = 'on' | 'low' | 'off' | 'neutral';
export type HomeVariant = 'A' | 'B' | 'C';
export type Lang = 'en' | 'tw';

export interface StateData {
  units: number;
  money: number;
  days: string;
  tone: Tone;
  powerLabel: string;
  battery: number;
  backup: string;
  banner: null | { tone: Tone; title: string; msg: string };
}

export const STATES: Record<ServiceState, StateData> = {
  healthy: {
    units: 31.0, money: 10.85, days: '≈ 8 days left',
    tone: 'on', powerLabel: 'Power on', battery: 86, backup: '~7 hrs backup',
    banner: null,
  },
  low: {
    units: 3.4, money: 1.20, days: '≈ 20 hours left',
    tone: 'low', powerLabel: 'Power on', battery: 41, backup: '~3 hrs backup',
    banner: { tone: 'low', title: 'Low balance', msg: "Top up before you run out — we'll keep essential lights on a little longer." },
  },
  off: {
    units: 0, money: 0, days: 'Top up to restore power',
    tone: 'off', powerLabel: 'Power off', battery: 12, backup: 'Battery reserve only',
    banner: { tone: 'off', title: 'Power disconnected', msg: 'Your balance reached zero after the grace period. Top up to reconnect — power returns automatically.' },
  },
};

export const cedi = (n: number) => '₵' + n.toFixed(2);
