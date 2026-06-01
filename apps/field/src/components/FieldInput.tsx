import React from 'react';
import { FIcon, FI } from '../icons';

interface Props {
  label: string;
  value?: string;
  placeholder: string;
  onClick: () => void;
  icon?: React.ReactNode;
  done?: boolean;
}

export default function FieldInput({ label, value, placeholder, onClick, icon, done }: Props) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', background: 'var(--surface)', border: `1.5px solid ${done ? 'var(--on)' : 'var(--line-2)'}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
      {icon && <span style={{ color: done ? 'var(--on)' : 'var(--ink-3)' }}><FIcon d={done ? FI.check : icon} s={22} /></span>}
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</span>
        <span style={{ display: 'block', fontSize: 15.5, fontWeight: 600, color: value ? 'var(--ink)' : 'var(--ink-3)', marginTop: 2 }}>{value || placeholder}</span>
      </span>
    </button>
  );
}
