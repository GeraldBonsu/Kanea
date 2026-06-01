import React, { useState } from 'react';
import { SevPill, ToolHeader } from '../components/shared';

const INIT = [
  { id: 'KNA-2841', type: 'fault',       title: 'No power reported',  site: 'GH-Accra-1043',      pri: 'off', sla: '1h 40m',     status: 'unassigned', tech: '' },
  { id: 'KNA-2838', type: 'maintenance', title: 'Inverter check',     site: 'GH-Cape-Coast-077',  pri: 'low', sla: '6h 10m',     status: 'assigned',   tech: 'Kwame A.' },
  { id: 'KNA-2835', type: 'fault',       title: 'Meter offline',      site: 'GH-Kumasi-0421',     pri: 'off', sla: 'Overdue 22m',status: 'assigned',   tech: 'Yaa B.' },
  { id: 'KNA-2829', type: 'install',     title: 'Commissioning visit',site: 'GH-Ho-0240',         pri: 'neutral',sla: '2d',      status: 'assigned',   tech: 'Kojo D.' },
  { id: 'KNA-2822', type: 'maintenance', title: 'Battery replacement',site: 'GH-Tamale-0188',     pri: 'off', sla: '4h',         status: 'in_progress',tech: 'Yaa B.' },
];
const TECHS = ['Kwame A.', 'Yaa B.', 'Kojo D.', 'Abena F.'];

export default function TicketsView({ openSite }: { openSite: (s: Record<string, string>) => void }) {
  const [rows, setRows] = useState(INIT);
  const assign = (id: string, tech: string) =>
    setRows(rs => rs.map(r => r.id === id ? { ...r, tech, status: r.status === 'unassigned' ? 'assigned' : r.status } : r));

  return (
    <div>
      <ToolHeader title="Ticket queue" desc="Faults, maintenance and installs. Assign to technicians — they appear in the field app." />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Ticket</th><th>Site</th><th>Priority</th><th>SLA</th><th>Assignee</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className={`type-tag ${r.type}`}>{r.type}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{r.id}</div>
                    </div>
                  </div>
                </td>
                <td><button className="linkcell" onClick={() => openSite({ site: r.site, cust: '—' })} style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{r.site}</button></td>
                <td><SevPill sev={r.pri} /></td>
                <td><span style={{ fontSize: 13.5, fontWeight: 600, color: r.sla.startsWith('Overdue') ? 'var(--off)' : 'var(--ink-2)' }}>{r.sla}</span></td>
                <td>
                  <select className="assign-select" value={r.tech} onChange={e => assign(r.id, e.target.value)}>
                    <option value="">Unassigned</option>
                    {TECHS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
