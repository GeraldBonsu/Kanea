import React from 'react';
import { Icon, I } from '../icons';
import { ScreenHeader } from './UsageScreen';

const items = [
  { tone: 'on',  ic: I.check,  t: 'Payment confirmed',    s: '₵20.00 added · power restored',      time: 'Just now' },
  { tone: 'off', ic: I.bolt,   t: 'Power disconnected',   s: 'Balance reached zero after grace',    time: '2:14 PM' },
  { tone: 'low', ic: I.bell,   t: 'Low balance warning',  s: '≈ 20 hours of power left',            time: '11:05 AM' },
  { tone: 'on',  ic: I.shield, t: 'Maintenance complete', s: 'Inverter check passed',               time: 'Yesterday' },
  { tone: 'low', ic: I.clock,  t: 'Maintenance scheduled',s: 'Technician visit, Thu 9am',           time: 'Mon' },
] as const;

export default function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <ScreenHeader title="Notifications" onBack={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((n, i) => (
          <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `var(--${n.tone}-bg)`, color: `var(--${n.tone})` }}>
              <Icon d={n.ic} s={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{n.t}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 1 }}>{n.s}</div>
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)', flex: 'none' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
