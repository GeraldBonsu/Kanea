import React, { useState } from 'react';

export default function UssdScreen({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [screen, setScreen] = useState<'menu' | 'topup' | 'sent'>('menu');

  if (!open) return null;

  const screens = {
    menu:  { title: 'Kanea *123#', body: ['Balance: 3.4 kWh', '≈ 20 hours left', '', '1. Balance & days', '2. Top up', '3. Report fault', '4. Help / contact'] },
    topup: { title: 'Top up', body: ['Enter amount (GHS):', '', '1. ₵10   2. ₵20', '3. ₵50   4. ₵100', '', 'Reply with number'] },
    sent:  { title: 'Top up', body: ['Request sent.', '', 'Approve the MTN MoMo', 'prompt on your phone.', '', 'SMS confirmation', 'will follow.'] },
  };

  const s = screens[screen];

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,16,10,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 230, background: '#11140f', borderRadius: 22, padding: 18, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', border: '3px solid #2a2e22' }}>
        <div style={{ background: '#bcd6a0', borderRadius: 8, padding: 14, minHeight: 200, fontFamily: 'var(--mono)', color: '#1e2814', fontSize: 13.5, lineHeight: 1.7 }}>
          <div style={{ fontWeight: 700, borderBottom: '1px solid rgba(30,40,20,0.3)', paddingBottom: 6, marginBottom: 8 }}>{s.title}</div>
          {s.body.map((l, i) => <div key={i}>{l || ' '}</div>)}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {screen === 'menu'  && <button style={btn} onClick={() => setScreen('topup')}>Reply "2"</button>}
          {screen === 'topup' && <button style={btn} onClick={() => setScreen('sent')}>Reply "2"</button>}
          {screen === 'sent'  && <button style={btn} onClick={() => setScreen('menu')}>Back to menu</button>}
          <button style={{ ...btn, background: 'transparent', border: '1px solid #3a4030', color: '#7d8870' }} onClick={onClose}>Close</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#7d8870', marginTop: 12, fontFamily: 'var(--sans)' }}>Works on any feature phone · no data</div>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  background: '#2f6d20', border: 'none', borderRadius: 8, color: '#d4edcc',
  padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--mono)',
};
