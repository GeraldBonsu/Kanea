import React, { useState, useEffect } from 'react';
import WorkScreen from './screens/WorkScreen';
import Wizard from './screens/Wizard';
import TicketDetail from './screens/TicketDetail';
import { outbox } from './outbox';

type FieldView = 'work' | 'wizard' | 'ticket';

interface Ticket { id: string; title: string; site: string; pri: string; dist: string; type: string; tone: string; }

function DemoBar({ online, setOnline, role, setRole }: { online: boolean; setOnline: (v: boolean) => void; role: 'agent' | 'technician'; setRole: (r: 'agent' | 'technician') => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'var(--ink)', color: 'var(--bg)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--mono)', opacity: 0.6 }}>Demo:</span>
      <button onClick={() => setOnline(!online)} style={{ background: online ? 'var(--on)' : 'var(--off)', border: 'none', borderRadius: 6, padding: '3px 8px', color: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>{online ? 'Online' : 'Offline'}</button>
      <button onClick={() => setRole(role === 'agent' ? 'technician' : 'agent')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '3px 8px', color: 'var(--bg)', cursor: 'pointer', fontSize: 11 }}>Role: {role}</button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<FieldView>('work');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [online, setOnline] = useState(true);
  const [role, setRole] = useState<'agent' | 'technician'>('technician');
  const [outboxCount, setOutboxCount] = useState(2);

  const queue = () => { if (!online) { outbox.enqueue('sync', {}); setOutboxCount(c => c + 1); } };
  const sync = () => setOutboxCount(0);

  useEffect(() => { if (online) sync(); }, [online]);

  let body: React.ReactNode;
  if (view === 'wizard') {
    body = <Wizard online={online} queue={queue} onExit={() => setView('work')} />;
  } else if (view === 'ticket' && ticket) {
    body = <TicketDetail ticket={ticket} online={online} queue={queue} onExit={() => { setView('work'); setTicket(null); }} />;
  } else {
    body = <WorkScreen role={role} online={online} outbox={outboxCount} onSync={sync} startWizard={() => setView('wizard')} openTicket={(t) => { setTicket(t as Ticket); setView('ticket'); }} />;
  }

  return (
    <>
      <DemoBar online={online} setOnline={setOnline} role={role} setRole={setRole} />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', paddingTop: 30 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 22px' }}>{body}</div>
      </div>
    </>
  );
}
