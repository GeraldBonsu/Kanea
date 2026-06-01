import React from 'react';
import { OIcon, OI } from '../icons';
import { StatTile, ToolHeader, gh } from '../components/shared';

const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
const topups = [22, 26, 29, 31, 35, 41];
const max = 44;

export default function AnalyticsView() {
  return (
    <div>
      <ToolHeader title="Analytics" desc="The basics for v1 — subscriptions, top-up volume, uptime, churn."
        right={<button className="btn btn-ghost"><OIcon d={OI.download} s={16} /> Export CSV</button>} />
      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <StatTile label="Active subscriptions" value="1,251" sub="+38 this month" tone="on" />
        <StatTile label="Top-up volume" value={gh(41280)} sub="May" />
        <StatTile label="Fleet uptime" value="99.1%" tone="on" />
        <StatTile label="Disconnects" value="19" sub="active" tone="off" />
      </div>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 18 }}>Monthly top-up volume (GHS, thousands)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 200 }}>
          {topups.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%', justifyContent: 'flex-end' }}>
              <span className="num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{v}</span>
              <div style={{ width: '100%', maxWidth: 54, height: (v / max * 100) + '%', background: 'linear-gradient(180deg, var(--sun), var(--sun-deep))', borderRadius: '8px 8px 4px 4px' }} />
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
