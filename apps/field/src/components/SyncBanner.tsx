import React from 'react';
import { FIcon, FI } from '../icons';

interface Props { online: boolean; outbox: number; onSync: () => void; }

export default function SyncBanner({ online, outbox, onSync }: Props) {
  const synced = online && outbox === 0;
  const tone = synced ? 'on' : online ? 'low' : 'neutral';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 13, background: `var(--${tone}-bg)`, border: `1px solid color-mix(in oklch, var(--${tone === 'neutral' ? 'ink-3' : tone}) 30%, transparent)`, marginBottom: 16 }}>
      <span style={{ color: synced ? 'var(--on)' : online ? 'var(--low-ink)' : 'var(--ink-2)' }}>
        <FIcon d={online ? FI.cloud : FI.cloudOff} s={20} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: `var(--${tone === 'neutral' ? 'ink' : tone + '-ink'})` }}>
          {synced ? 'All synced' : online ? `Syncing · ${outbox} queued` : `Offline · ${outbox} change${outbox === 1 ? '' : 's'} queued`}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{online ? 'Connected to network' : 'Saved on device — will sync on reconnect'}</div>
      </div>
      {online && outbox > 0 && <button className="fld-mini" onClick={onSync}>Sync now</button>}
    </div>
  );
}
