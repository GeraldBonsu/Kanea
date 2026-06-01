/* ============================================================
   KANEA — Ops dashboard · shell + Exceptions + Site 360
   ============================================================ */
const { useState: useStateO } = React;

// ============================================================
//  EXCEPTIONS QUEUE (default landing)
// ============================================================
function ExceptionsView({ openSite }) {
  const [filter, setFilter] = useStateO('all');
  const rows = EXCEPTIONS.filter(e => filter === 'all' || e.sev === filter);
  return (
    <div>
      <ToolHeader title="Exceptions" desc="The “deal with this now” list — offline meters, abnormal usage, battery health, repeated faults."
        right={
          <div className="filter-seg">
            {[['all', 'All'], ['off', 'High'], ['low', 'Medium'], ['neutral', 'Watch']].map(([id, l]) => (
              <button key={id} className={filter === id ? 'on' : ''} onClick={() => setFilter(id)}>{l}</button>
            ))}
          </div>
        } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(e => (
          <div key={e.id} className="card exc-row" onClick={() => openSite(e)}>
            <div className={'exc-ic ' + e.sev}><OIcon d={e.icon} s={22} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 15.5, whiteSpace: 'nowrap' }}>{e.type}</span>
                <SevPill sev={e.sev} />
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 3 }}>{e.detail}</div>
            </div>
            <div style={{ textAlign: 'right', flex: 'none' }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{e.cust}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{e.site} · {e.age}</div>
            </div>
            <span style={{ color: 'var(--ink-3)' }}><OIcon d={OI.chevR} s={20} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
//  SITE 360 — slide-over detail
// ============================================================
function Site360({ site, onClose }) {
  if (!site) return null;
  const tele = [42, 38, 55, 61, 48, 30, 12, 5, 0, 0];
  const maxT = 64;
  const ledger = [
    { t: 'topup', label: 'Top-up · MTN MoMo', amt: '+20.0 kWh', when: 'today 14:22', tone: 'on' },
    { t: 'consumption', label: 'Consumption', amt: '−3.2 kWh', when: 'today', tone: 'neutral' },
    { t: 'disconnect', label: 'Auto-disconnect · zero balance', amt: '0.0 kWh', when: 'today 12:08', tone: 'off' },
    { t: 'grace_credit', label: 'Grace keep-alive credit', amt: '+0.5 kWh', when: 'today 10:30', tone: 'low' },
    { t: 'consumption', label: 'Consumption', amt: '−4.1 kWh', when: 'yesterday', tone: 'neutral' },
  ];
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

        <div style={{ padding: '4px 28px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
            <h1 style={{ fontSize: 24 }}>{site.cust || 'Customer'}</h1>
            <span className="chip off"><span className="dot"></span>Disconnected</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)' }}>{site.site} · Home 1.2kW · since Aug 2025</div>

          {/* device health */}
          <div className="s360-grid">
            {[
              { ic: OI.bolt, n: 'Inverter', s: 'Healthy', tone: 'on' },
              { ic: OI.battery, n: 'Battery', s: 'SoH 78%', tone: 'low' },
              { ic: OI.grid, n: 'Panels (4)', s: 'Healthy', tone: 'on' },
              { ic: OI.meter, n: 'Meter', s: 'Offline 9h', tone: 'off' },
            ].map((d, i) => (
              <div key={i} className="card" style={{ padding: 14 }}>
                <div className={'exc-ic ' + d.tone} style={{ width: 36, height: 36 }}><OIcon d={d.ic} s={18} /></div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>{d.n}</div>
                <div style={{ fontSize: 12.5, color: `var(--${d.tone}-ink)` }}>{d.s}</div>
              </div>
            ))}
          </div>

          {/* telemetry */}
          <div className="card" style={{ padding: 20, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)' }}>Battery state of charge · last 10 readings</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>last seen 14:22</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 110, marginTop: 16 }}>
              {tele.map((v, i) => (
                <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: Math.max(v / maxT * 100, 3) + '%', background: v === 0 ? 'var(--off)' : v < 20 ? 'var(--low)' : 'var(--on)', borderRadius: 4, opacity: 0.85 }}></div>
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
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--${l.tone === 'neutral' ? 'ink-3' : l.tone})`, flex: 'none' }}></span>
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

// ============================================================
//  SHELL
// ============================================================
function OpsShell() {
  const [view, setView] = useStateO('exceptions');
  const [site, setSite] = useStateO(null);

  const nav = [
    { id: 'exceptions', label: 'Exceptions', ic: OI.alert, badge: 6 },
    { id: 'collections', label: 'Collections', ic: OI.wallet, badge: 19 },
    { id: 'fleet', label: 'Fleet map', ic: OI.map },
    { id: 'tickets', label: 'Tickets', ic: OI.ticket, badge: 47 },
    { id: 'analytics', label: 'Analytics', ic: OI.chart },
    { id: 'users', label: 'Users & roles', ic: OI.users },
  ];

  const views = {
    exceptions: <ExceptionsView openSite={setSite} />,
    collections: <CollectionsView openSite={setSite} />,
    fleet: <FleetView openSite={setSite} />,
    tickets: <TicketsView openSite={setSite} />,
    analytics: <AnalyticsView />,
    users: <UsersView />,
  };

  return (
    <div className="ops-root">
      {/* sidebar */}
      <aside className="ops-side">
        <div className="ops-brand">
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="9" fill="var(--sun)"/>
            <g stroke="var(--sun)" strokeWidth="2.6" strokeLinecap="round">
              <line x1="20" y1="3.5" x2="20" y2="9"/><line x1="20" y1="31" x2="20" y2="36.5"/>
              <line x1="3.5" y1="20" x2="9" y2="20"/><line x1="31" y1="20" x2="36.5" y2="20"/>
              <line x1="8" y1="8" x2="11.8" y2="11.8"/><line x1="28.2" y1="28.2" x2="32" y2="32"/>
              <line x1="32" y1="8" x2="28.2" y2="11.8"/><line x1="11.8" y1="28.2" x2="8" y2="32"/>
            </g>
          </svg>
          <span className="ops-name">Kane<b>a</b> <span>Ops</span></span>
        </div>
        <nav>
          {nav.map(n => (
            <button key={n.id} className={'ops-navitem' + (view === n.id ? ' on' : '')} onClick={() => setView(n.id)}>
              <OIcon d={n.ic} s={19} />
              <span style={{ flex: 1, textAlign: 'left' }}>{n.label}</span>
              {n.badge && <span className={'nav-badge' + (n.id === 'exceptions' || n.id === 'collections' ? ' hot' : '')}>{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="ops-user">
          <span className="avatar">AS</span>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>Akua Sarpong</div><div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Ops manager</div></div>
        </div>
      </aside>

      {/* main */}
      <div className="ops-main">
        <div className="ops-topbar">
          <div className="ops-search"><OIcon d={OI.search} s={16} /><input placeholder="Search sites, customers, tickets…" /></div>
          <div className="ops-summary">
            <span><b className="num">{FLEET.online}%</b> online</span>
            <span className="div"></span>
            <span><b className="num" style={{ color: 'var(--low)' }}>{FLEET.lowBal}</b> low balance</span>
            <span className="div"></span>
            <span><b className="num" style={{ color: 'var(--off)' }}>{FLEET.atRisk}</b> at risk</span>
          </div>
        </div>
        <div className="ops-content">{views[view]}</div>
      </div>

      <Site360 site={site} onClose={() => setSite(null)} />
    </div>
  );
}

Object.assign(window, { OpsShell });
