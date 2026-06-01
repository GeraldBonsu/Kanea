import React from 'react';
import { Icon, I } from '../icons';

export default function FreshStrip({ online, onRefresh }: { online: boolean; onRefresh: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--ink-3)', padding: '2px 2px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: online ? 'var(--on)' : 'var(--ink-3)' }} />
        {online ? 'Updated just now' : 'Offline · last known 2:14 PM'}
      </span>
      <button onClick={onRefresh} style={{ background: 'none', border: 'none', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--sans)' }}>
        <Icon d={I.refresh} s={13} w={2.2} /> Refresh
      </button>
    </div>
  );
}
