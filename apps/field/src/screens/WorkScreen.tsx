import React from 'react';
import { FIcon, FI, KaneaMark } from '../icons';
import SyncBanner from '../components/SyncBanner';

const tickets = [
  { id: 'KNA-2835', type: 'fault',       title: 'Meter offline',        site: 'GH-Kumasi-0421',  pri: 'High', dist: '2.1 km', tone: 'off' },
  { id: 'KNA-2822', type: 'maintenance', title: 'Battery replacement',  site: 'GH-Tamale-0188',  pri: 'High', dist: '5.4 km', tone: 'low' },
  { id: 'KNA-2829', type: 'install',     title: 'Commissioning visit',  site: 'GH-Ho-0240',      pri: 'Low',  dist: '0.8 km', tone: 'neutral' },
] as const;

interface Props {
  role: 'agent' | 'technician';
  online: boolean;
  outbox: number;
  onSync: () => void;
  startWizard: () => void;
  openTicket: (t: typeof tickets[number]) => void;
}

export default function WorkScreen({ role, online, outbox, onSync, startWizard, openTicket }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 2px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <KaneaMark size={28} />
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{role === 'agent' ? 'Sales agent' : 'Technician'}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--display)', whiteSpace: 'nowrap' }}>Kwame Adjei</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-2)', borderRadius: 10, padding: '8px 12px', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>
          <FIcon d={FI.box} s={16} /> 6 in stock
        </div>
      </div>

      <SyncBanner online={online} outbox={outbox} onSync={onSync} />

      <button onClick={startWizard} style={{ width: '100%', background: 'var(--sun)', color: 'oklch(0.22 0.04 50)', border: 'none', borderRadius: 18, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow)', marginBottom: 20 }}>
        <span style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><FIcon d={FI.plus} s={26} w={2.6} /></span>
        <span style={{ textAlign: 'left' }}>
          <span style={{ display: 'block', fontSize: 18, fontWeight: 700 }}>New customer</span>
          <span style={{ display: 'block', fontSize: 13, opacity: 0.8 }}>Onboard → install → activate</span>
        </span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 12px' }}>
        <span style={{ fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em' }}>MY WORK ORDERS</span>
        <span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>{tickets.length} assigned</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tickets.map(t => (
          <button key={t.id} onClick={() => openTicket(t)} className="card" style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
            <span className={`fld-tic ${t.tone}`}>
              <FIcon d={t.type === 'fault' ? FI.bolt : t.type === 'install' ? FI.box : FI.wrench} s={20} />
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{t.title}</span>
                <span className={`chip ${t.pri === 'High' ? 'off' : 'neutral'}`} style={{ padding: '2px 7px', fontSize: 11 }}><span className="dot" />{t.pri}</span>
              </span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)', marginTop: 2 }}>{t.site} · {t.dist}</span>
            </span>
            <span style={{ color: 'var(--ink-3)' }}><FIcon d={FI.chevR} s={20} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export type { tickets };
