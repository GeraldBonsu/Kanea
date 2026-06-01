import React from 'react';
import { Icon, I } from '../icons';
import Chip from '../components/Chip';
import FreshStrip from '../components/FreshStrip';
import type { StateData } from '../types';
import { cedi } from '../types';

function Banner({ st, onTopUp }: { st: StateData; onTopUp: () => void }) {
  if (!st.banner) return null;
  const b = st.banner;
  return (
    <div style={{ background: `var(--${b.tone}-bg)`, border: `1px solid color-mix(in oklch, var(--${b.tone}) 35%, transparent)`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: `var(--${b.tone})` }}><Icon d={b.tone === 'off' ? I.bolt : I.bell} s={19} w={2.4} /></span>
        <span style={{ fontWeight: 700, fontSize: 15, color: `var(--${b.tone}-ink)` }}>{b.title}</span>
      </div>
      <p style={{ fontSize: 13.5, color: `var(--${b.tone}-ink)`, margin: '8px 0 0', lineHeight: 1.5 }}>{b.msg}</p>
      <button className="btn btn-sun" style={{ width: '100%', marginTop: 12, padding: 13 }} onClick={onTopUp}>Top up now</button>
    </div>
  );
}

interface Props {
  st: StateData;
  online: boolean;
  onTopUp: () => void;
  onRefresh: () => void;
  go: (tab: string) => void;
}

export default function HomeA({ st, online, onTopUp, onRefresh, go }: Props) {
  return (
    <div>
      <Banner st={st} onTopUp={onTopUp} />
      <div className="card" style={{ padding: '24px 22px', textAlign: 'center', background: st.tone === 'off' ? 'var(--surface)' : 'linear-gradient(165deg, var(--sun-soft), var(--surface) 75%)' }}>
        <Chip tone={st.tone}>{st.powerLabel}</Chip>
        <div className="num" style={{ fontSize: 60, fontWeight: 700, margin: '14px 0 0', lineHeight: 1, color: st.tone === 'off' ? 'var(--off)' : 'var(--ink)' }}>
          {st.units.toFixed(1)}<span style={{ fontSize: 22, color: 'var(--ink-3)', fontWeight: 500 }}> kWh</span>
        </div>
        <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8, fontWeight: 600 }}>{st.days}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>balance ≈ {cedi(st.money)}</div>
        <button className="btn btn-sun" style={{ width: '100%', marginTop: 20, padding: 17, fontSize: 17 }} onClick={onTopUp}>
          <Icon d={I.bolt} s={20} w={2.4} /> Top up
        </button>
      </div>

      <div style={{ marginTop: 14 }}>
        <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: `var(--${st.tone}-bg)`, color: `var(--${st.tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <Icon d={I.battery} s={21} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Battery {st.battery}%</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{st.backup}</div>
          </div>
          <div style={{ width: 64, height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
            <div style={{ width: st.battery + '%', height: '100%', background: `var(--${st.tone})` }} />
          </div>
        </div>
        <FreshStrip online={online} onRefresh={onRefresh} />
      </div>

      <button onClick={() => go('savings')} className="card" style={{ width: '100%', marginTop: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon d={I.leaf} s={20} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 600 }}>You saved ₵62 this month</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>vs. diesel · 99.4% uptime</div></div>
        <span style={{ color: 'var(--ink-3)' }}><Icon d={I.chevR} s={20} /></span>
      </button>
    </div>
  );
}
