import React from 'react';
import { ScreenHeader } from './UsageScreen';

export default function SavingsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <ScreenHeader title="Savings & reliability" onBack={onBack} />
      <div className="card" style={{ padding: 22, background: 'linear-gradient(160deg, var(--on-bg), var(--surface))', borderColor: 'color-mix(in oklch, var(--on) 25%, var(--on-bg))' }}>
        <span className="chip on"><span className="dot" />This month</span>
        <div className="num" style={{ fontSize: 46, fontWeight: 700, margin: '14px 0 2px', color: 'var(--on-ink)' }}>₵62</div>
        <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>saved vs. running a diesel generator</div>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>Based on the fuel a generator would have burned for the power you used.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="num" style={{ fontSize: 30, fontWeight: 700 }}>99.4<span style={{ fontSize: 15 }}>%</span></div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>Power uptime</div>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="num" style={{ fontSize: 30, fontWeight: 700 }}>₵341</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>Saved this year</div>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 14 }}>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 12 }}>Uptime, last 6 months</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 9, height: 64 }}>
          {[99.1, 98.8, 99.6, 99.9, 99.2, 99.4].map((v, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: ((v - 98) / 2 * 56) + 'px', background: 'var(--on)', borderRadius: 4, opacity: 0.55 + i * 0.08 }} />
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 18, lineHeight: 1.5 }}>
        This is why the subscription is worth it — reliable power, no fuel runs, no upfront cost.
      </p>
    </div>
  );
}
