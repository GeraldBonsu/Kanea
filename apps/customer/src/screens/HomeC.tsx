import React from 'react';
import { Icon, I } from '../icons';
import Chip from '../components/Chip';
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

export default function HomeC({ st, online, onTopUp, onRefresh, go }: Props) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="card" style={{ padding: 16, gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `var(--${st.tone}-bg)`, color: `var(--${st.tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={I.bolt} s={24} w={2.2} /></div>
            <div><div style={{ fontSize: 16, fontWeight: 700 }}>{st.powerLabel}</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{st.days}</div></div>
          </div>
          <Chip tone={st.tone}>{st.tone === 'on' ? 'Healthy' : st.tone === 'low' ? 'Low' : 'Off'}</Chip>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Balance</div>
          <div className="num" style={{ fontSize: 30, fontWeight: 700, marginTop: 4 }}>{st.units.toFixed(1)}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>kWh · ≈ {cedi(st.money)}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Battery</div>
          <div className="num" style={{ fontSize: 30, fontWeight: 700, marginTop: 4 }}>{st.battery}<span style={{ fontSize: 15 }}>%</span></div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{st.backup}</div>
        </div>
      </div>
      <button className="btn btn-sun" style={{ width: '100%', marginTop: 12, padding: 16, fontSize: 16 }} onClick={onTopUp}>
        <Icon d={I.bolt} s={20} w={2.4} /> Top up
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <button onClick={() => go('savings')} className="card" style={{ padding: 16, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
          <span style={{ color: 'var(--on)' }}><Icon d={I.leaf} s={22} /></span>
          <div className="num" style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>₵62</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>saved this month</div>
        </button>
        <button onClick={() => go('usage')} className="card" style={{ padding: 16, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
          <span style={{ color: 'var(--sun-deep)' }}><Icon d={I.chart} s={22} /></span>
          <div className="num" style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>26.1</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>kWh used this week</div>
        </button>
      </div>
      <div style={{ marginTop: 12 }}><FreshStrip online={online} onRefresh={onRefresh} /></div>
    </div>
  );
}
