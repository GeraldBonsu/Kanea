import React, { useState } from 'react';
import { OIcon, OI } from '../icons';
import { SevPill, ToolHeader } from '../components/shared';

const EXCEPTIONS = [
  { id: 'e1', sev: 'off',     icon: OI.meter,   type: 'Meter offline',          site: 'GH-Kumasi-0421',     cust: 'Yaw Boateng',         detail: 'No telemetry for 9h 12m · last battery 38%',            age: '9h' },
  { id: 'e2', sev: 'off',     icon: OI.battery, type: 'Battery health critical', site: 'GH-Tamale-0188',     cust: 'Adwoa Owusu',         detail: 'SoH 61% · 3 deep-discharge cycles this week',          age: '1d' },
  { id: 'e3', sev: 'low',     icon: OI.bolt,    type: 'Abnormal usage',          site: 'GH-Accra-1043',      cust: 'Kofi Asante (SME)',   detail: 'Consumption 3.4× the 30-day baseline',                  age: '4h' },
  { id: 'e4', sev: 'low',     icon: OI.battery, type: 'Battery health low',      site: 'GH-Cape-Coast-077',  cust: 'Esi Mensah',          detail: 'SoH 74% · trending down',                               age: '2d' },
  { id: 'e5', sev: 'low',     icon: OI.ticket,  type: 'Repeated faults',         site: 'GH-Koforidua-0312', cust: 'Kwabena Osei',        detail: '3rd inverter fault in 30 days',                         age: '6h' },
  { id: 'e6', sev: 'neutral', icon: OI.meter,   type: 'Connectivity flapping',   site: 'GH-Ho-0205',        cust: 'Akua Sarpong',        detail: 'Meter dropped 6× in 24h · GSM signal weak',             age: '12h' },
];

export default function ExceptionsView({ openSite }: { openSite: (s: Record<string, string>) => void }) {
  const [filter, setFilter] = useState('all');
  const rows = EXCEPTIONS.filter(e => filter === 'all' || e.sev === filter);

  return (
    <div>
      <ToolHeader
        title="Exceptions"
        desc='The "deal with this now" list — offline meters, abnormal usage, battery health, repeated faults.'
        right={
          <div className="filter-seg">
            {[['all', 'All'], ['off', 'High'], ['low', 'Medium'], ['neutral', 'Watch']].map(([id, l]) => (
              <button key={id} className={filter === id ? 'on' : ''} onClick={() => setFilter(id)}>{l}</button>
            ))}
          </div>
        }
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(e => (
          <div key={e.id} className="card exc-row" onClick={() => openSite({ site: e.site, cust: e.cust })}>
            <div className={`exc-ic ${e.sev}`}><OIcon d={e.icon} s={22} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 15.5 }}>{e.type}</span>
                <SevPill sev={e.sev} />
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 3 }}>{e.detail}</div>
            </div>
            <div style={{ textAlign: 'right', flex: 'none' }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{e.cust}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{e.site} · {e.age}</div>
            </div>
            <span style={{ color: 'var(--ink-3)' }}><OIcon d={OI.chevR} s={20} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
