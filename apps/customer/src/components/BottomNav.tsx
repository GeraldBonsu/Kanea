import React from 'react';
import { Icon, I } from '../icons';

const items = [
  { id: 'home',    label: 'Home',    ic: I.home },
  { id: 'usage',   label: 'Usage',   ic: I.chart },
  { id: 'savings', label: 'Savings', ic: I.leaf },
  { id: 'fault',   label: 'Help',    ic: I.help },
];

export default function BottomNav({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  return (
    <div style={{ display: 'flex', borderTop: '1px solid var(--line)', background: 'var(--surface)', padding: '8px 6px 6px' }}>
      {items.map(it => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: active ? 'var(--ink)' : 'var(--ink-3)', fontFamily: 'var(--sans)',
          }}>
            <div style={{ width: 56, height: 30, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--sun-soft)' : 'transparent', color: active ? 'var(--sun-deep)' : 'inherit' }}>
              <Icon d={it.ic} s={21} w={active ? 2.3 : 2} />
            </div>
            <span style={{ fontSize: 11.5, fontWeight: active ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
