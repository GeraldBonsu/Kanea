import React, { useState } from 'react';
import { Icon, I } from '../icons';
import Chip from '../components/Chip';
import { ScreenHeader } from './UsageScreen';

interface TicketInfo { id: string; cat: string; status: string; }

interface Props {
  onBack: () => void;
  ticket: TicketInfo | null;
  setTicket: (t: TicketInfo | null) => void;
}

const cats = [
  { id: 'nopower', label: 'No power',       ic: I.bolt },
  { id: 'flicker', label: 'Power flickers',  ic: I.sun },
  { id: 'meter',   label: 'Meter issue',     ic: I.battery },
  { id: 'other',   label: 'Something else',  ic: I.help },
];

export default function FaultScreen({ onBack, ticket, setTicket }: Props) {
  const [cat, setCat] = useState<string | null>(null);

  if (ticket) {
    return (
      <div>
        <ScreenHeader title="Your report" onBack={() => { setTicket(null); onBack(); }} />
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)' }}>#{ticket.id}</span>
            <Chip tone="low">In progress</Chip>
          </div>
          <h2 style={{ fontSize: 20, marginTop: 12 }}>{ticket.cat}</h2>
          <div style={{ marginTop: 18, position: 'relative', paddingLeft: 26 }}>
            {[
              { t: 'Report received',     s: 'Just now',                done: true },
              { t: 'Technician assigned', s: 'Kwame A. · arriving ~2 hrs', done: true },
              { t: 'On the way',          s: 'Pending',                 done: false },
              { t: 'Resolved',            s: 'Pending',                 done: false },
            ].map((st, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < arr.length - 1 ? 20 : 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -18, top: 2, width: 14, height: 14, borderRadius: '50%', background: st.done ? 'var(--on)' : 'var(--surface)', border: st.done ? 'none' : '2px solid var(--line-2)', zIndex: 2 }} />
                {i < arr.length - 1 && <div style={{ position: 'absolute', left: -12, top: 14, width: 2, height: '100%', background: st.done ? 'var(--on)' : 'var(--line)' }} />}
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: st.done ? 'var(--ink)' : 'var(--ink-3)' }}>{st.t}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{st.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16, padding: 14 }}>
          <Icon d={I.phone} s={18} /> Call support
        </button>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader title="Report a fault" onBack={onBack} />
      <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 2px 16px' }}>What's happening? Pick the closest one.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            padding: '22px 14px', borderRadius: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
            border: cat === c.id ? '2px solid var(--sun)' : '1.5px solid var(--line)',
            background: cat === c.id ? 'var(--sun-soft)' : 'var(--surface)', color: 'var(--ink)',
          }}>
            <span style={{ color: cat === c.id ? 'var(--sun-deep)' : 'var(--ink-2)' }}><Icon d={c.ic} s={26} /></span>
            <span style={{ fontSize: 15, fontWeight: 600, textAlign: 'left' }}>{c.label}</span>
          </button>
        ))}
      </div>
      <button style={{ width: '100%', marginTop: 14, padding: 16, borderRadius: 14, border: '1.5px dashed var(--line-2)', background: 'var(--bg-2)', color: 'var(--ink-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14.5, fontFamily: 'var(--sans)', fontWeight: 500 }}>
        <Icon d={I.camera} s={20} /> Add a photo (optional)
      </button>
      <button className="btn btn-primary" disabled={!cat} style={{ width: '100%', marginTop: 14, padding: 16, fontSize: 16, opacity: cat ? 1 : 0.4, cursor: cat ? 'pointer' : 'not-allowed' }}
        onClick={() => setTicket({ id: 'KNA-2841', cat: cats.find(c => c.id === cat)!.label, status: 'open' })}>
        Submit report
      </button>
    </div>
  );
}
