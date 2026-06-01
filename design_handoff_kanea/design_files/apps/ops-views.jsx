/* ============================================================
   KANEA — Ops dashboard · data + shared primitives + views
   ============================================================ */

// ---------- icons (ops set) ----------
const OI = {
  alert: <g><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></g>,
  wallet: <g><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7V5a2 2 0 0 1 2-2h12"/><circle cx="16" cy="13" r="1.4" fill="currentColor" stroke="none"/></g>,
  map: <g><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></g>,
  ticket: <g><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-6z"/></g>,
  grid: <g><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></g>,
  chart: <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></g>,
  users: <g><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></g>,
  search: <g><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></g>,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>,
  battery: <g><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/></g>,
  meter: <g><circle cx="12" cy="12" r="9"/><path d="M12 12 16 9"/><path d="M12 3v2M21 12h-2"/></g>,
  chevR: <path d="m9 6 6 6-6 6"/>,
  back: <path d="M19 12H5M11 18l-6-6 6-6"/>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  pause: <g><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></g>,
  power: <g><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/><path d="M12 2v10"/></g>,
  download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></g>,
  dot: <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>,
  clock: <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
};
const OIcon = ({ d, s = 18, w = 2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const gh = (n) => '₵' + n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------- shared data ----------
const FLEET = {
  sites: 1284, online: 96.2, lowBal: 84, atRisk: 31, openTickets: 47, mrr: 41280,
};

const EXCEPTIONS = [
  { id: 'e1', sev: 'off', icon: OI.meter, type: 'Meter offline', site: 'GH-Kumasi-0421', cust: 'Yaw Boateng', detail: 'No telemetry for 9h 12m · last battery 38%', age: '9h' },
  { id: 'e2', sev: 'off', icon: OI.battery, type: 'Battery health critical', site: 'GH-Tamale-0188', cust: 'Adwoa Owusu', detail: 'SoH 61% · 3 deep-discharge cycles this week', age: '1d' },
  { id: 'e3', sev: 'low', icon: OI.bolt, type: 'Abnormal usage', site: 'GH-Accra-1043', cust: 'Kofi Asante (SME)', detail: 'Consumption 3.4× the 30-day baseline', age: '4h' },
  { id: 'e4', sev: 'low', icon: OI.battery, type: 'Battery health low', site: 'GH-Cape Coast-077', cust: 'Esi Mensah', detail: 'SoH 74% · trending down', age: '2d' },
  { id: 'e5', sev: 'low', icon: OI.ticket, type: 'Repeated faults', site: 'GH-Koforidua-0312', cust: 'Kwabena Osei', detail: '3rd inverter fault in 30 days', age: '6h' },
  { id: 'e6', sev: 'neutral', icon: OI.meter, type: 'Connectivity flapping', site: 'GH-Ho-0205', cust: 'Akua Sarpong', detail: 'Meter dropped 6× in 24h · GSM signal weak', age: '12h' },
];

const COLLECTIONS = [
  { id: 'c1', site: 'GH-Accra-0991', cust: 'Ama Darko', bal: 0, status: 'disconnected', grace: 'Grace expired', hold: false, since: '2h ago', plan: 'Home 1.2kW' },
  { id: 'c2', site: 'GH-Kumasi-0533', cust: 'Daniel Mensah', bal: 0.4, status: 'grace', grace: 'Grace · 14h left', hold: false, since: 'today', plan: 'Home 0.8kW' },
  { id: 'c3', site: 'GH-Tamale-0712', cust: 'Fatima Iddrisu', bal: 0, status: 'hold', grace: 'Hardship hold', hold: true, since: '3d ago', plan: 'Home 1.2kW' },
  { id: 'c4', site: 'GH-Accra-1102', cust: 'Joseph Tetteh (SME)', bal: 1.1, status: 'low', grace: 'Low balance', hold: false, since: 'today', plan: 'SME 3kW' },
  { id: 'c5', site: 'GH-Sunyani-0064', cust: 'Grace Aidoo', bal: 0, status: 'disconnected', grace: 'Grace expired', hold: false, since: '5h ago', plan: 'Home 0.8kW' },
];

const TICKETS = [
  { id: 'KNA-2841', type: 'fault', title: 'No power reported', site: 'GH-Accra-1043', pri: 'high', sla: '1h 40m', status: 'unassigned', tech: null },
  { id: 'KNA-2838', type: 'maintenance', title: 'Inverter check', site: 'GH-Koforidua-0312', pri: 'med', sla: '6h 10m', status: 'assigned', tech: 'Kwame A.' },
  { id: 'KNA-2835', type: 'fault', title: 'Meter offline', site: 'GH-Kumasi-0421', pri: 'high', sla: 'Overdue 22m', status: 'assigned', tech: 'Yaa B.' },
  { id: 'KNA-2829', type: 'install', title: 'Commissioning visit', site: 'GH-Ho-0240', pri: 'low', sla: '2d', status: 'assigned', tech: 'Kojo D.' },
  { id: 'KNA-2822', type: 'maintenance', title: 'Battery replacement', site: 'GH-Tamale-0188', pri: 'high', sla: '4h', status: 'in_progress', tech: 'Yaa B.' },
];

const TECHS = ['Kwame A.', 'Yaa B.', 'Kojo D.', 'Abena F.'];

// ---------- shared UI ----------
function SevPill({ sev }) {
  const map = { off: ['off', 'High'], low: ['low', 'Medium'], neutral: ['neutral', 'Watch'] };
  const [tone, label] = map[sev] || map.neutral;
  return <span className={'chip ' + tone}><span className="dot"></span>{label}</span>;
}

function StatTile({ label, value, sub, tone }) {
  return (
    <div className="card" style={{ padding: '16px 18px', flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span className="num" style={{ fontSize: 28, fontWeight: 700, color: tone ? `var(--${tone})` : 'var(--ink)' }}>{value}</span>
        {sub && <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function ToolHeader({ title, desc, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <h1 style={{ fontSize: 26 }}>{title}</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '5px 0 0' }}>{desc}</p>
      </div>
      {right}
    </div>
  );
}

// ============================================================
//  COLLECTIONS & ARREARS
// ============================================================
function CollectionsView({ openSite }) {
  const [rows, setRows] = React.useState(COLLECTIONS);
  const [toast, setToast] = React.useState(null);

  const setHold = (id) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, hold: !r.hold, status: !r.hold ? 'hold' : (r.bal === 0 ? 'disconnected' : 'low'), grace: !r.hold ? 'Hardship hold' : (r.bal === 0 ? 'Grace expired' : 'Low balance') } : r));
    setToast('Hardship hold updated · audit-logged to ops user');
    setTimeout(() => setToast(null), 2600);
  };
  const reconnect = (id) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, status: 'reconnected', grace: 'Manually reconnected' } : r));
    setToast('Manual reconnect sent to meter · audit-logged');
    setTimeout(() => setToast(null), 2600);
  };

  const stTone = { disconnected: 'off', grace: 'low', low: 'low', hold: 'neutral', reconnected: 'on' };

  return (
    <div>
      <ToolHeader title="Collections & arrears" desc="Sites at or near zero balance. Disconnect is a financeability necessity and a reputational live wire — handle humanely."
        right={<button className="btn btn-ghost"><OIcon d={OI.download} s={16} /> Export CSV</button>} />
      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        <StatTile label="Disconnected" value="19" sub="grace expired" tone="off" />
        <StatTile label="In grace period" value="23" sub="keep-alive active" tone="low" />
        <StatTile label="Hardship holds" value="7" sub="disconnect blocked" />
        <StatTile label="At-risk value" value={gh(2140)} sub="this week" />
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Customer / site</th><th>Balance</th><th>Status</th><th>Plan</th><th style={{ textAlign: 'right' }}>Action</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>
                  <button className="linkcell" onClick={() => openSite(r)}>
                    <div style={{ fontWeight: 600 }}>{r.cust}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{r.site} · {r.since}</div>
                  </button>
                </td>
                <td><span className="num" style={{ fontWeight: 600, color: r.bal === 0 ? 'var(--off)' : 'var(--ink)' }}>{r.bal.toFixed(1)} kWh</span></td>
                <td><span className={'chip ' + stTone[r.status]}><span className="dot"></span>{r.grace}</span></td>
                <td style={{ color: 'var(--ink-2)', fontSize: 13.5 }}>{r.plan}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className={'mini-btn' + (r.hold ? ' active' : '')} onClick={() => setHold(r.id)} title="Hardship hold">
                      <OIcon d={OI.pause} s={14} /> {r.hold ? 'Holding' : 'Hold'}
                    </button>
                    {r.status !== 'reconnected' && <button className="mini-btn primary" onClick={() => reconnect(r.id)}>
                      <OIcon d={OI.power} s={14} /> Reconnect
                    </button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className="toast"><OIcon d={OI.shield} s={16} /> {toast}</div>}
    </div>
  );
}

// ============================================================
//  FLEET MAP
// ============================================================
function FleetView({ openSite }) {
  return (
    <div>
      <ToolHeader title="Fleet overview" desc="Live status across the deployed fleet. Refreshes from meter telemetry." />
      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <StatTile label="Total sites" value={FLEET.sites.toLocaleString()} />
        <StatTile label="Online" value={FLEET.online + '%'} sub="meters reporting" tone="on" />
        <StatTile label="Low balance" value={FLEET.lowBal} sub="warned" tone="low" />
        <StatTile label="At risk" value={FLEET.atRisk} sub="of disconnect" tone="off" />
        <StatTile label="Open tickets" value={FLEET.openTickets} />
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: 420 }}>
        <div className="map-placeholder">
          <div className="map-grid"></div>
          {/* scattered site dots */}
          {[['28%','34%','on'],['42%','22%','on'],['55%','40%','low'],['37%','58%','on'],['62%','62%','off'],['48%','70%','on'],['70%','30%','on'],['33%','45%','on'],['58%','52%','low'],['44%','38%','on'],['66%','46%','on'],['52%','28%','on'],['39%','66%','off'],['72%','55%','on'],['46%','50%','on']].map((p,i)=>(
            <span key={i} className="site-dot" style={{ left: p[0], top: p[1], background: `var(--${p[2]})`, boxShadow: `0 0 0 4px color-mix(in oklch, var(--${p[2]}) 22%, transparent)` }}></span>
          ))}
          <div className="map-tag">GHANA · live fleet — drop in MapLibre / Leaflet here</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--surface)', borderRadius: 12, padding: '10px 14px', boxShadow: 'var(--shadow)', fontSize: 12.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--on)' }}></span> Online &amp; healthy</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--low)' }}></span> Low balance / battery</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--off)' }}></span> Offline / disconnected</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  TICKETS
// ============================================================
function TicketsView({ openSite }) {
  const [rows, setRows] = React.useState(TICKETS);
  const priTone = { high: 'off', med: 'low', low: 'neutral' };
  const stLabel = { unassigned: 'Unassigned', assigned: 'Assigned', in_progress: 'In progress' };
  const assign = (id, tech) => setRows(rs => rs.map(r => r.id === id ? { ...r, tech, status: r.status === 'unassigned' ? 'assigned' : r.status } : r));

  return (
    <div>
      <ToolHeader title="Ticket queue" desc="Faults, maintenance and installs. Assign to technicians — they appear in the field app." />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Ticket</th><th>Site</th><th>Priority</th><th>SLA</th><th>Assignee</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className={'type-tag ' + r.type}>{r.type}</span>
                    <div><div style={{ fontWeight: 600 }}>{r.title}</div><div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{r.id}</div></div>
                  </div>
                </td>
                <td><button className="linkcell" onClick={() => openSite({ site: r.site, cust: '—' })} style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{r.site}</button></td>
                <td><SevPill sev={priTone[r.pri]} /></td>
                <td><span style={{ fontSize: 13.5, fontWeight: 600, color: r.sla.startsWith('Overdue') ? 'var(--off)' : 'var(--ink-2)' }}>{r.sla}</span></td>
                <td>
                  <select className="assign-select" value={r.tech || ''} onChange={e => assign(r.id, e.target.value)}>
                    <option value="">Unassigned</option>
                    {TECHS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
//  ANALYTICS
// ============================================================
function AnalyticsView() {
  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const topups = [22, 26, 29, 31, 35, 41];
  const max = 44;
  return (
    <div>
      <ToolHeader title="Analytics" desc="The basics for v1 — subscriptions, top-up volume, uptime, churn."
        right={<button className="btn btn-ghost"><OIcon d={OI.download} s={16} /> Export CSV</button>} />
      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <StatTile label="Active subscriptions" value="1,251" sub="+38 this month" tone="on" />
        <StatTile label="Top-up volume" value={gh(41280)} sub="May" />
        <StatTile label="Fleet uptime" value="99.1%" tone="on" />
        <StatTile label="Disconnects" value="19" sub="active" tone="off" />
      </div>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 18 }}>Monthly top-up volume (GHS, thousands)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 200 }}>
          {topups.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%', justifyContent: 'flex-end' }}>
              <span className="num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{v}</span>
              <div style={{ width: '100%', maxWidth: 54, height: (v / max * 100) + '%', background: 'linear-gradient(180deg, var(--sun), var(--sun-deep))', borderRadius: '8px 8px 4px 4px' }}></div>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  USERS & ROLES
// ============================================================
function UsersView() {
  const users = [
    { n: 'Akua Sarpong', r: 'Ops manager', p: 'Full access', on: true },
    { n: 'Kwame Adjei', r: 'Technician', p: 'Field app · tickets', on: true },
    { n: 'Yaa Boahen', r: 'Technician', p: 'Field app · tickets', on: true },
    { n: 'Emmanuel Osei', r: 'Customer success', p: 'Sites · tickets · holds', on: true },
    { n: 'Linda Mensah', r: 'Finance', p: 'Collections · analytics', on: false },
    { n: 'Kojo Danso', r: 'Sales agent', p: 'Field app · onboarding', on: true },
  ];
  return (
    <div>
      <ToolHeader title="Users & roles" desc="Manage agents, technicians and ops users. Role-based access on field and ops."
        right={<button className="btn btn-primary">+ Invite user</button>} />
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="ops-table">
          <thead><tr><th>Name</th><th>Role</th><th>Permissions</th><th>Status</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 11 }}><span className="avatar">{u.n.split(' ').map(x => x[0]).join('')}</span><span style={{ fontWeight: 600 }}>{u.n}</span></div></td>
                <td style={{ color: 'var(--ink-2)' }}>{u.r}</td>
                <td style={{ color: 'var(--ink-3)', fontSize: 13.5 }}>{u.p}</td>
                <td><span className={'chip ' + (u.on ? 'on' : 'neutral')}><span className="dot"></span>{u.on ? 'Active' : 'Invited'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, {
  OI, OIcon, gh, FLEET, EXCEPTIONS, COLLECTIONS, TICKETS, TECHS,
  SevPill, StatTile, ToolHeader,
  CollectionsView, FleetView, TicketsView, AnalyticsView, UsersView,
});
