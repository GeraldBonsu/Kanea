import React from 'react';
import { FIcon, FI } from '../icons';

interface Props { title: string; onBack: () => void; step?: number; total?: number; }

export default function StepHeader({ title, onBack, step, total }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 2px 12px' }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}>
          <FIcon d={FI.back} s={20} />
        </button>
        <div style={{ flex: 1 }}>
          {step && <div style={{ fontSize: 11.5, fontFamily: 'var(--mono)', color: 'var(--sun-deep)', letterSpacing: '0.06em', fontWeight: 600 }}>STEP {step} OF {total}</div>}
          <h2 style={{ fontSize: 21 }}>{title}</h2>
        </div>
      </div>
      {step && total && (
        <div style={{ display: 'flex', gap: 5, marginBottom: 18 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < step ? 'var(--sun)' : 'var(--line)' }} />
          ))}
        </div>
      )}
    </div>
  );
}
