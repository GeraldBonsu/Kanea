import React from 'react';
import { StatTile, ToolHeader } from '../components/shared';

const FLEET = { sites: 1284, online: 96.2, lowBal: 84, atRisk: 31, openTickets: 47 };

const dots: [string, string, string][] = [
  ['28%','34%','on'],['42%','22%','on'],['55%','40%','low'],['37%','58%','on'],
  ['62%','62%','off'],['48%','70%','on'],['70%','30%','on'],['33%','45%','on'],
  ['58%','52%','low'],['44%','38%','on'],['66%','46%','on'],['52%','28%','on'],
  ['39%','66%','off'],['72%','55%','on'],['46%','50%','on'],
];

export default function FleetView({ openSite }: { openSite: (s: Record<string, string>) => void }) {
  return (
    <div>
      <ToolHeader title="Fleet overview" desc="Live status across the deployed fleet. Refreshes from meter telemetry." />
      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <StatTile label="Total sites"    value={FLEET.sites.toLocaleString()} />
        <StatTile label="Online"         value={FLEET.online + '%'} sub="meters reporting" tone="on" />
        <StatTile label="Low balance"    value={FLEET.lowBal}       sub="warned"            tone="low" />
        <StatTile label="At risk"        value={FLEET.atRisk}       sub="of disconnect"     tone="off" />
        <StatTile label="Open tickets"   value={FLEET.openTickets} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: 420 }}>
        <div className="map-placeholder">
          <div className="map-grid" />
          {dots.map(([left, top, tone], i) => (
            <span key={i} className="site-dot" onClick={() => openSite({ site: `GH-Site-${i}`, cust: 'Customer' })}
              style={{ left, top, background: `var(--${tone})`, boxShadow: `0 0 0 4px color-mix(in oklch, var(--${tone}) 22%, transparent)`, cursor: 'pointer' }}
            />
          ))}
          <div className="map-tag">GHANA · live fleet — MapLibre / Leaflet drop-in ready</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--surface)', borderRadius: 12, padding: '10px 14px', boxShadow: 'var(--shadow)', fontSize: 12.5 }}>
          {[['on','Online & healthy'],['low','Low balance / battery'],['off','Offline / disconnected']].map(([tone, label]) => (
            <div key={tone} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: `var(--${tone})` }} /> {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
