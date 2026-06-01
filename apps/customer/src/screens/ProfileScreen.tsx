import React from 'react';
import { Icon, I } from '../icons';
import type { Lang } from '../types';
import { ScreenHeader } from './UsageScreen';

interface Props {
  onBack: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function ProfileScreen({ onBack, lang, setLang }: Props) {
  return (
    <div>
      <ScreenHeader title="Profile" onBack={onBack} />
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 54, height: 54, borderRadius: 16, background: 'var(--sun-soft)', color: 'var(--sun-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, fontFamily: 'var(--display)' }}>A</div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Akosua Mensah</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>+233 24 •• •• 821 · Plan: Home 1.2kW</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'var(--ink-3)', margin: '20px 2px 10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>LANGUAGE</div>
      {([['en', 'English'], ['tw', 'Twi']] as const).map(([id, label]) => (
        <button key={id} onClick={() => setLang(id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 14, marginBottom: 10, cursor: 'pointer', border: lang === id ? '2px solid var(--sun)' : '1.5px solid var(--line)', background: lang === id ? 'var(--sun-soft)' : 'var(--surface)' }}>
          <Icon d={I.globe} s={20} />
          <span style={{ flex: 1, textAlign: 'left', fontSize: 15.5, fontWeight: 600 }}>{label}</span>
          {lang === id && <span style={{ color: 'var(--sun-deep)' }}><Icon d={I.check} s={20} /></span>}
        </button>
      ))}

      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Icon d={I.shield} s={14} /> Your data is encrypted · Ghana DPA compliant
      </div>
    </div>
  );
}
