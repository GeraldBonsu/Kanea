import React, { useState } from 'react';
import { Icon, I } from '../icons';

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px 14px' }}>
      <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}>
        <Icon d={I.back} s={20} />
      </button>
      <h2 style={{ fontSize: 21, flex: 1 }}>{title}</h2>
    </div>
  );
}

export default function UsageScreen({ onBack }: { onBack: () => void }) {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week');

  const data = {
    week:  [3.1, 4.2, 2.8, 5.0, 4.4, 3.6, 4.0],
    month: [22, 26, 19, 24],
    day:   [0.2, 0.1, 0.3, 0.9, 1.1, 0.7, 0.5, 0.4],
  };
  const labels = {
    week:  ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    month: ['W1', 'W2', 'W3', 'W4'],
    day:   ['6a', '9a', '12p', '3p', '6p', '9p', '12a', '3a'],
  };

  const series = data[range];
  const max = Math.max(...series) * 1.15;
  const total = series.reduce((a, b) => a + b, 0).toFixed(1);

  return (
    <div>
      <ScreenHeader title="Usage" onBack={onBack} />
      <div style={{ display: 'flex', gap: 6, background: 'var(--bg-2)', padding: 4, borderRadius: 12, marginBottom: 18 }}>
        {(['day', 'week', 'month'] as const).map(id => (
          <button key={id} onClick={() => setRange(id)} style={{
            flex: 1, padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            fontFamily: 'var(--sans)', background: range === id ? 'var(--surface)' : 'transparent',
            color: range === id ? 'var(--ink)' : 'var(--ink-3)', boxShadow: range === id ? 'var(--shadow-sm)' : 'none',
          }}>{id.charAt(0).toUpperCase() + id.slice(1)}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Consumed this {range}</span>
          <span className="num" style={{ fontSize: 26, fontWeight: 600 }}>{total} <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>kWh</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 140, marginTop: 18 }}>
          {series.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', maxWidth: 30, height: (v / max * 100) + '%', background: 'linear-gradient(180deg, var(--sun), var(--sun-deep))', borderRadius: '6px 6px 3px 3px', minHeight: 4 }} />
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{labels[range][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 16, marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <Icon d={I.sun} s={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Your panels generated 31.4 kWh</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>This week · more than you used</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 16 }}>Showing last-known data · syncs when online</p>
    </div>
  );
}

export { ScreenHeader };
