import React from 'react';
import { Icon, I } from '../icons';
import FreshStrip from '../components/FreshStrip';
import type { StateData } from '../types';
import { cedi } from '../types';

interface Props {
  st: StateData;
  online: boolean;
  onTopUp: () => void;
  onRefresh: () => void;
  go: (tab: string) => void;
}

export default function HomeB({ st, online, onTopUp, onRefresh }: Props) {
  const ring = `var(--${st.tone})`;
  return (
    <div>
      <div style={{ background: `var(--${st.tone}-bg)`, borderRadius: 24, padding: '28px 22px 24px', textAlign: 'center', border: `1px solid color-mix(in oklch, ${ring} 25%, transparent)` }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', margin: '0 auto', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 8px color-mix(in oklch, ${ring} 18%, transparent)` }}>
          <span style={{ color: ring }}><Icon d={st.tone === 'off' ? I.bolt : I.sun} s={52} w={2} /></span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--display)', marginTop: 18, color: `var(--${st.tone}-ink)` }}>{st.powerLabel}</div>
        <div style={{ fontSize: 15, color: `var(--${st.tone}-ink)`, marginTop: 4, fontWeight: 600 }}>{st.days}</div>
      </div>
      {st.banner && <p style={{ fontSize: 13.5, color: `var(--${st.tone}-ink)`, textAlign: 'center', margin: '14px 8px 0', lineHeight: 1.5 }}>{st.banner.msg}</p>}
      <div className="card" style={{ padding: 18, marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Balance</div>
          <div className="num" style={{ fontSize: 28, fontWeight: 700 }}>{st.units.toFixed(1)} <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>kWh</span></div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>≈ {cedi(st.money)}</div>
        </div>
        <button className="btn btn-sun" style={{ padding: '15px 26px', fontSize: 16 }} onClick={onTopUp}>
          <Icon d={I.bolt} s={19} w={2.4} /> Top up
        </button>
      </div>
      <div style={{ marginTop: 12 }}><FreshStrip online={online} onRefresh={onRefresh} /></div>
    </div>
  );
}
