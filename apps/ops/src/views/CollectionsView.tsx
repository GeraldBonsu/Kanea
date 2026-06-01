import React, { useState } from 'react';
import { OIcon, OI } from '../icons';
import { StatTile, ToolHeader, gh } from '../components/shared';

const INIT = [
  { id: 'c1', site: 'GH-Accra-0991',  cust: 'Ama Darko',           bal: 0,   status: 'disconnected', grace: 'Grace expired',       hold: false, since: '2h ago',  plan: 'Home 1.2kW' },
  { id: 'c2', site: 'GH-Kumasi-0533', cust: 'Daniel Mensah',        bal: 0.4, status: 'grace',        grace: 'Grace · 14h left',    hold: false, since: 'today',   plan: 'Home 0.8kW' },
  { id: 'c3', site: 'GH-Tamale-0712', cust: 'Fatima Iddrisu',       bal: 0,   status: 'hold',         grace: 'Hardship hold',       hold: true,  since: '3d ago',  plan: 'Home 1.2kW' },
  { id: 'c4', site: 'GH-Accra-1102',  cust: 'Joseph Tetteh (SME)',  bal: 1.1, status: 'low',          grace: 'Low balance',         hold: false, since: 'today',   plan: 'SME 3kW' },
  { id: 'c5', site: 'GH-Sunyani-0064',cust: 'Grace Aidoo',          bal: 0,   status: 'disconnected', grace: 'Grace expired',       hold: false, since: '5h ago',  plan: 'Home 0.8kW' },
];

const stTone: Record<string, string> = { disconnected: 'off', grace: 'low', low: 'low', hold: 'neutral', reconnected: 'on' };

export default function CollectionsView({ openSite }: { openSite: (s: Record<string, string>) => void }) {
  const [rows, setRows] = useState(INIT);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const setHold = (id: string) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, hold: !r.hold, status: !r.hold ? 'hold' : (r.bal === 0 ? 'disconnected' : 'low'), grace: !r.hold ? 'Hardship hold' : (r.bal === 0 ? 'Grace expired' : 'Low balance') } : r));
    flash('Hardship hold updated · audit-logged to ops user');
  };

  const reconnect = (id: string) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status: 'reconnected', grace: 'Manually reconnected' } : r));
    flash('Manual reconnect sent to meter · audit-logged');
  };

  return (
    <div>
      <ToolHeader title="Collections & arrears" desc="Sites at or near zero balance. Handle humanely — hardship hold blocks auto-disconnect."
        right={<button className="btn btn-ghost"><OIcon d={OI.download} s={16} /> Export CSV</button>} />
      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <StatTile label="Disconnected"    value="19" sub="grace expired"        tone="off" />
        <StatTile label="In grace period" value="23" sub="keep-alive active"    tone="low" />
        <StatTile label="Hardship holds"  value="7"  sub="disconnect blocked" />
        <StatTile label="At-risk value"   value={gh(2140)} sub="this week" />
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Customer / site</th><th>Balance</th><th>Status</th><th>Plan</th><th style={{ textAlign: 'right' }}>Action</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>
                  <button className="linkcell" onClick={() => openSite({ site: r.site, cust: r.cust })}>
                    <div style={{ fontWeight: 600 }}>{r.cust}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{r.site} · {r.since}</div>
                  </button>
                </td>
                <td><span className="num" style={{ fontWeight: 600, color: r.bal === 0 ? 'var(--off)' : 'var(--ink)' }}>{r.bal.toFixed(1)} kWh</span></td>
                <td><span className={`chip ${stTone[r.status] ?? 'neutral'}`}><span className="dot" />{r.grace}</span></td>
                <td style={{ color: 'var(--ink-2)', fontSize: 13.5 }}>{r.plan}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className={`mini-btn${r.hold ? ' active' : ''}`} onClick={() => setHold(r.id)}>
                      <OIcon d={OI.pause} s={14} /> {r.hold ? 'Holding' : 'Hold'}
                    </button>
                    {r.status !== 'reconnected' && (
                      <button className="mini-btn primary" onClick={() => reconnect(r.id)}>
                        <OIcon d={OI.power} s={14} /> Reconnect
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className="toast"><OIcon d={OI.shield} s={16} /> {toast}</div>}
    </div>
  );
}
