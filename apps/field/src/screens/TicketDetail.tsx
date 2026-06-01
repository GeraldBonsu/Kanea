import React, { useState } from 'react';
import { FIcon, FI } from '../icons';
import StepHeader from '../components/StepHeader';
import FieldInput from '../components/FieldInput';

interface Ticket { id: string; title: string; site: string; pri: string; dist: string; }
interface Props { ticket: Ticket; online: boolean; onExit: () => void; queue: () => void; }

export default function TicketDetail({ ticket, online, onExit, queue }: Props) {
  const [stage, setStage] = useState<'detail' | 'resolve' | 'done'>('detail');
  const [parts, setParts] = useState(false);
  const [photo, setPhoto] = useState(false);

  if (stage === 'done') {
    return (
      <div>
        <StepHeader title="Resolved" onBack={onExit} />
        <div style={{ textAlign: 'center', padding: '24px 6px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><FIcon d={FI.checkCircle} s={46} w={2} /></div>
          <h2 style={{ fontSize: 23 }}>{ticket.title} resolved</h2>
          <p style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 8 }}>{ticket.site} · site health updated</p>
          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <FIcon d={online ? FI.cloud : FI.cloudOff} s={16} />
            {online ? 'Synced to ops dashboard' : 'Queued — syncs on reconnect'}
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 18, padding: 16 }} onClick={onExit}>Back to work orders</button>
      </div>
    );
  }

  if (stage === 'resolve') {
    return (
      <div>
        <StepHeader title="Resolve ticket" onBack={() => setStage('detail')} />
        <div className="card" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 8 }}>DIAGNOSIS</div>
          <div style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>Loose meter antenna — re-seated, GSM signal restored.</div>
        </div>
        <FieldInput label="Parts used" placeholder="Tap to log parts" value={parts ? 'Antenna pigtail ×1' : ''} done={parts} icon={FI.box} onClick={() => setParts(true)} />
        <FieldInput label="Photo evidence (required)" placeholder="Tap to capture" value={photo ? 'Resolution photo captured' : ''} done={photo} icon={FI.camera} onClick={() => setPhoto(true)} />
        <button className="btn btn-sun" style={{ width: '100%', marginTop: 6, padding: 16, fontSize: 16, opacity: photo ? 1 : 0.4 }} disabled={!photo} onClick={() => { queue(); setStage('done'); }}>Close with evidence</button>
      </div>
    );
  }

  return (
    <div>
      <StepHeader title={ticket.id} onBack={onExit} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <h2 style={{ fontSize: 22, flex: 1 }}>{ticket.title}</h2>
        <span className={`chip ${ticket.pri === 'High' ? 'off' : 'neutral'}`}><span className="dot" />{ticket.pri}</span>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ height: 120, background: 'repeating-linear-gradient(135deg, var(--bg-2), var(--bg-2) 9px, var(--bg) 9px, var(--bg) 18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sun-deep)' }}>
          <FIcon d={FI.pin} s={34} />
        </div>
        <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--mono)' }}>{ticket.site}</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{ticket.dist} away</div></div>
          <button className="fld-mini"><FIcon d={FI.nav} s={15} /> Navigate</button>
        </div>
      </div>
      <div className="card" style={{ padding: 16, marginBottom: 18 }}>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 6 }}>REPORTED</div>
        <div style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>Customer reports no telemetry for 9h. Last battery reading 38%. Meter connectivity flapping.</div>
      </div>
      <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16 }} onClick={() => setStage('resolve')}>Start resolution</button>
    </div>
  );
}
