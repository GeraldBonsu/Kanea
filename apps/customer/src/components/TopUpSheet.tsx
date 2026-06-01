import React, { useState, useEffect } from 'react';
import { Icon, I } from '../icons';
import { cedi } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: (amount: number) => void;
  autoTopUp: boolean;
  setAutoTopUp: (v: boolean) => void;
}

export default function TopUpSheet({ open, onClose, onComplete, autoTopUp, setAutoTopUp }: Props) {
  const [step, setStep] = useState<'amount' | 'method' | 'processing' | 'success'>('amount');
  const [amount, setAmount] = useState(20);
  const [method, setMethod] = useState<'mtn' | 'hubtel'>('mtn');
  const presets = [10, 20, 50, 100];

  useEffect(() => { if (open) { setStep('amount'); setAmount(20); } }, [open]);

  if (!open) return null;

  const kwh = (amount / 0.35).toFixed(0);

  const go = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 1600);
  };
  const finish = () => { onComplete(amount); onClose(); };

  return (
    <div onClick={step === 'processing' ? undefined : onClose}
      style={{ position: 'absolute', inset: 0, background: 'rgba(30,22,12,0.45)', zIndex: 50, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(2px)' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface)', width: '100%', borderRadius: '24px 24px 0 0',
        padding: '10px 20px 28px', boxShadow: '0 -10px 40px rgba(0,0,0,0.2)', animation: 'sheetUp .26s ease',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '0 auto 16px' }} />

        {step === 'amount' && (
          <div>
            <h2 style={{ fontSize: 22 }}>Top up</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 18px' }}>Choose an amount to add to your balance.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {presets.map(p => (
                <button key={p} onClick={() => setAmount(p)} style={{
                  padding: '16px', borderRadius: 14, cursor: 'pointer', fontFamily: 'var(--display)',
                  fontSize: 22, fontWeight: 600,
                  border: amount === p ? '2px solid var(--sun)' : '1.5px solid var(--line-2)',
                  background: amount === p ? 'var(--sun-soft)' : 'var(--surface)', color: 'var(--ink)',
                }}>{cedi(p)}</button>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span>≈ {kwh} kWh of power</span>
              <span className="num" style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>{cedi(amount)}</span>
            </div>
            <button className="btn btn-sun" style={{ width: '100%', marginTop: 16, padding: 16, fontSize: 16 }} onClick={() => setStep('method')}>Continue</button>
          </div>
        )}

        {step === 'method' && (
          <div>
            <h2 style={{ fontSize: 22 }}>Pay with</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 16px' }}>{cedi(amount)} · mobile money</p>
            {[
              { id: 'mtn' as const, name: 'MTN MoMo', sub: '•••• 4821 · saved', color: '#ffcc00', label: 'MTN' },
              { id: 'hubtel' as const, name: 'Hubtel', sub: 'Choose at checkout', color: 'var(--info)', label: 'H' },
            ].map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px',
                borderRadius: 14, marginBottom: 10, cursor: 'pointer', textAlign: 'left',
                border: method === m.id ? '2px solid var(--sun)' : '1.5px solid var(--line)',
                background: method === m.id ? 'var(--sun-soft)' : 'var(--surface)',
              }}>
                <span style={{ width: 42, height: 42, borderRadius: 10, background: m.color, color: '#1a1407', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flex: 'none', fontFamily: 'var(--display)' }}>{m.label}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15.5 }}>{m.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{m.sub}</div>
                </span>
                {method === m.id && <span style={{ color: 'var(--sun-deep)' }}><Icon d={I.check} s={20} /></span>}
              </button>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, padding: '10px 2px', cursor: 'pointer' }}>
              <input type="checkbox" checked={autoTopUp} onChange={e => setAutoTopUp(e.target.checked)} style={{ width: 20, height: 20, accentColor: 'var(--sun-deep)' }} />
              <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>Auto top-up {cedi(amount)} when I hit low balance</span>
            </label>
            <button className="btn btn-sun" style={{ width: '100%', marginTop: 12, padding: 16, fontSize: 16 }} onClick={go}>Pay {cedi(amount)}</button>
          </div>
        )}

        {step === 'processing' && (
          <div style={{ padding: '40px 0 30px', textAlign: 'center' }}>
            <div className="spinner" style={{ width: 46, height: 46, margin: '0 auto 18px' }} />
            <h2 style={{ fontSize: 19 }}>Confirming payment…</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, marginTop: 6 }}>Approve the prompt on your phone.</p>
          </div>
        )}

        {step === 'success' && (
          <div style={{ padding: '20px 0 8px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon d={I.check} s={34} w={3} />
            </div>
            <h2 style={{ fontSize: 22 }}>Top-up successful</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14.5, margin: '8px 0 4px' }}>{cedi(amount)} added · ≈ {kwh} kWh</p>
            <p style={{ color: 'var(--on-ink)', fontSize: 13.5, fontWeight: 600 }}>Power restored automatically.</p>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 18, padding: 16, fontSize: 16 }} onClick={finish}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
