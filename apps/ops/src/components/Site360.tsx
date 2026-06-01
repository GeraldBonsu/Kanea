import React from 'react';
import { OIcon, OI } from '../icons';
import { gh } from './shared';

interface SiteRef { site?: string; cust?: string; }

const tele = [42, 38, 55, 61, 48, 30, 12, 5, 0, 0];
const maxT = 64;

const ledger = [
  { label: 'Top-up · MTN MoMo', amt: '+20.0 kWh', when: 'today 14:22', tone: 'on' },
  { label: 'Consumption', amt: '−3.2 kWh', when: 'today', tone: 'neutral' },
  { label: 'Auto-disconnect · zero balance', amt: '0.0 kWh', when: 'today 12:08', tone: 'off' },
  { label: 'Grace keep-alive credit', amt: '+0.5 kWh', when: 'today 10:30', tone: 'low' },
  { label: 'Consumption', amt: '−4.1 kWh', when: 'yesterday', tone: 'neutral' },
];

export default function Site360({ site, onClose }: { site: SiteRef | null; onClose: () => void }) {
  if (!site) return null;
  return (
    <div className="drawer-scrim" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <button className="mini-btn" onClick={onClose}><OIcon d={OI.back} s={15} /> Back</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="mini-btn"><OIcon d={OI.pause} s={14} /> Hardship hold</button>
            <button className="mini-btn primary"><OIcon d={OI.power} s={14} /> Reconnect</button>
          </div>
        </div>

        <div style={{ padding: '18px 28px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
            <h1 style={{ fontSize: 24 }}>{site.cust || 'Customer'}</h1>
            <span className="chip off"><span className="dot" />Disconnected</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)' }}>{site.site || 'GH-Kumasi-0421'} · Home 1.2kW · since Aug 2025</div>

          {/* devices */}
          <div className="s360-grid">
            {[
              { ic: OI.bolt,    n: 'Inverter',    s: 'Healthy',      tone: 'on' },
              { ic: OI.battery, n: 'Battery',     s: 'SoH 78%',      tone: 'low' },
              { ic: OI.grid,    n: 'Panels (4)',  s: 'Healthy',      tone: 'on' },
              { ic: OI.meter,   n: 'Meter',       s: 'Offline 9h',   tone: 'off' },
            ].map((d, i) => (
              <div key={i} className="card" style={{ padding: 14 }}>
                <div className={`exc-ic ${d.tone}`} style={{ width: 36, height: 36 }}><OIcon d={d.ic} s={18} /></div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>{d.n}</div>
                <div style={{ fontSize: 12.5, color: `var(--${d.tone}-ink)` }}>{d.s}</div>
              </div>
            ))}
          </div>

          {/* telemetry chart */}
          <div className="card" style={{ padding: 20, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)' }}>Battery SoC · last 10 readings</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>last seen 14:22</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 110, marginTop: 16 }}>
              {tele.map((v, i) => (
                <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: Math.max(v / maxT * 100, 3) + '%', background: v === 0 ? 'var(--off)' : v < 20 ? 'var(--low)' : 'var(--on)', borderRadius: 4, opacity: 0.85 }} />
                </div>
              ))}
            </div>
          </div>

          {/* wallet + ledger */}
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr', gap: 16, marginTop: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>Wallet balance</div>
              <div className="num" style={{ fontSize: 34, fontWeight: 700, color: 'var(--off)', marginTop: 6 }}>0.0</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>kWh · ≈ ₵0.00</div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '14px 0' }} />
              <div style={{ fontSize: 13, color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span>This month top-ups</span><span className="num" style={{ fontWeight: 600 }}>₵48.00</span></div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between' }}><span>Lifetime</span><span className="num" style={{ fontWeight: 600 }}>₵612.50</span></div>
              <button className="mini-btn" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}><OIcon d={OI.wallet} s={14} /> Manual adjustment</button>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 8 }}>Recorded as a ledger entry with your name</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 12 }}>Ledger · append-only</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {ledger.map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < ledger.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--${l.tone === 'neutral' ? 'ink-3' : l.tone})`, flex: 'none' }} />
                    <span style={{ flex: 1, fontSize: 13.5 }}>{l.label}</span>
                    <span className="num" style={{ fontSize: 13.5, fontWeight: 600 }}>{l.amt}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)', width: 92, textAlign: 'right' }}>{l.when}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
