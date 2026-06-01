import React from 'react';

export function SevPill({ sev }: { sev: string }) {
  const map: Record<string, [string, string]> = {
    off:     ['off',     'High'],
    low:     ['low',     'Medium'],
    neutral: ['neutral', 'Watch'],
    on:      ['on',      'Ok'],
  };
  const [tone, label] = map[sev] ?? map.neutral;
  return <span className={`chip ${tone}`}><span className="dot" />{label}</span>;
}

export function StatTile({ label, value, sub, tone }: { label: string; value: string | number; sub?: string; tone?: string }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span className="num" style={{ fontSize: 28, fontWeight: 700, color: tone ? `var(--${tone})` : 'var(--ink)' }}>{value}</span>
        {sub && <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

export function ToolHeader({ title, desc, right }: { title: string; desc?: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <h1 style={{ fontSize: 26 }}>{title}</h1>
        {desc && <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '5px 0 0' }}>{desc}</p>}
      </div>
      {right}
    </div>
  );
}

export const gh = (n: number) => '₵' + n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
