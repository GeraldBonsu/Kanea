/* ============================================================
   KANEA — Customer app · shared screens & components
   Exported to window for customer.jsx to consume.
   ============================================================ */

// ---------- tiny inline icon set ----------
const Icon = ({ d, s = 22, w = 2, fill = 'none' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const I = {
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
  chart: <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
  leaf: <g><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></g>,
  help: <g><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" /><path d="M12 17h.01" /></g>,
  battery: <g><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 11v2" /></g>,
  clock: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  bell: <g><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></g>,
  check: <path d="M20 6L9 17l-5-5" />,
  chevR: <path d="M9 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  camera: <g><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></g>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 .81 .37 1.6 .7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74 .33 1.53 .57 2.34 .7A2 2 0 0 1 22 16.92z" />,
  refresh: <g><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></g>,
  sun: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>,
  globe: <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></g>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

// ---------- money / format ----------
const cedi = (n) => '₵' + n.toFixed(2);

// ---------- service-state metadata ----------
const STATES = {
  healthy: {
    units: 31.0, money: 10.85, days: '≈ 8 days left', daysShort: '8 days',
    power: 'on', tone: 'on', powerLabel: 'Power on', battery: 86, backup: '~7 hrs backup',
    banner: null,
  },
  low: {
    units: 3.4, money: 1.20, days: '≈ 20 hours left', daysShort: '20 hrs',
    power: 'on', tone: 'low', powerLabel: 'Power on', battery: 41, backup: '~3 hrs backup',
    banner: { tone: 'low', title: 'Low balance', msg: 'Top up before you run out — we’ll keep essential lights on a little longer.' },
  },
  off: {
    units: 0, money: 0, days: 'Top up to restore power', daysShort: '0',
    power: 'off', tone: 'off', powerLabel: 'Power off', battery: 12, backup: 'Battery reserve only',
    banner: { tone: 'off', title: 'Power disconnected', msg: 'Your balance reached zero after the grace period. Top up to reconnect — power returns automatically.' },
  },
};

// ---------- status chip ----------
function Chip({ tone, children }) {
  return <span className={'chip ' + tone}><span className="dot"></span>{children}</span>;
}

// ---------- last-updated / connectivity strip ----------
function FreshStrip({ online, onRefresh }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontSize: 12.5, color: 'var(--ink-3)', padding: '2px 2px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: online ? 'var(--on)' : 'var(--ink-3)' }}></span>
        {online ? 'Updated just now' : 'Offline · last known 2:14 PM'}
      </span>
      <button onClick={onRefresh} style={{ background: 'none', border: 'none', color: 'var(--ink-3)',
        display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--sans)' }}>
        <Icon d={I.refresh} s={13} w={2.2} /> Refresh
      </button>
    </div>
  );
}

// ---------- screen header (sub-screens) ----------
function ScreenHeader({ title, onBack, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px 14px' }}>
      <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)',
        background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}>
        <Icon d={I.back} s={20} />
      </button>
      <h2 style={{ fontSize: 21, flex: 1 }}>{title}</h2>
      {right}
    </div>
  );
}

// ---------- bottom nav ----------
function BottomNav({ tab, setTab }) {
  const items = [
    { id: 'home', label: 'Home', ic: I.home },
    { id: 'usage', label: 'Usage', ic: I.chart },
    { id: 'savings', label: 'Savings', ic: I.leaf },
    { id: 'fault', label: 'Help', ic: I.help },
  ];
  return (
    <div style={{ display: 'flex', borderTop: '1px solid var(--line)', background: 'var(--surface)',
      padding: '8px 6px 6px' }}>
      {items.map(it => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: active ? 'var(--ink)' : 'var(--ink-3)', fontFamily: 'var(--sans)' }}>
            <div style={{ width: 56, height: 30, borderRadius: 999, display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: active ? 'var(--sun-soft)' : 'transparent', color: active ? 'var(--sun-deep)' : 'inherit' }}>
              <Icon d={it.ic} s={21} w={active ? 2.3 : 2} />
            </div>
            <span style={{ fontSize: 11.5, fontWeight: active ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
//  TOP-UP SHEET
// ============================================================
function TopUpSheet({ open, onClose, onComplete, autoTopUp, setAutoTopUp }) {
  const [step, setStep] = React.useState('amount'); // amount | method | processing | success
  const [amount, setAmount] = React.useState(20);
  const [method, setMethod] = React.useState('mtn');
  const presets = [10, 20, 50, 100];

  React.useEffect(() => { if (open) { setStep('amount'); setAmount(20); } }, [open]);

  if (!open) return null;

  const go = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 1600);
  };
  const finish = () => { onComplete(amount); onClose(); };

  // rough kWh estimate
  const kwh = (amount / 0.35).toFixed(0);

  return (
    <div onClick={step === 'processing' ? null : onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(30,22,12,0.45)', zIndex: 50,
      display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(2px)' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface)', width: '100%', borderRadius: '24px 24px 0 0',
        padding: '10px 20px 24px', boxShadow: '0 -10px 40px rgba(0,0,0,0.2)', animation: 'sheetUp .26s ease' }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '0 auto 16px' }}></div>

        {step === 'amount' && (
          <div>
            <h2 style={{ fontSize: 22 }}>Top up</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 18px' }}>Choose an amount to add to your balance.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {presets.map(p => (
                <button key={p} onClick={() => setAmount(p)} style={{
                  padding: '16px', borderRadius: 14, cursor: 'pointer', fontFamily: 'var(--display)',
                  fontSize: 22, fontWeight: 600,
                  border: amount === p ? '2px solid var(--sun)' : '1.5px solid var(--line-2)',
                  background: amount === p ? 'var(--sun-soft)' : 'var(--surface)',
                  color: 'var(--ink)' }}>
                  {cedi(p)}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 12,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span>≈ {kwh} kWh of power</span>
              <span className="num" style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 600 }}>{cedi(amount)}</span>
            </div>
            <button className="btn btn-sun" style={{ width: '100%', marginTop: 16, padding: 16, fontSize: 16 }}
              onClick={() => setStep('method')}>Continue</button>
          </div>
        )}

        {step === 'method' && (
          <div>
            <h2 style={{ fontSize: 22 }}>Pay with</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, margin: '6px 0 16px' }}>{cedi(amount)} · mobile money</p>
            {[
              { id: 'mtn', name: 'MTN MoMo', sub: '•••• 4821 · saved', c: '#ffcc00', t: 'MTN' },
              { id: 'hubtel', name: 'Hubtel', sub: 'Choose at checkout', c: 'var(--info)', t: 'H' },
            ].map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 13, padding: '14px',
                borderRadius: 14, marginBottom: 10, cursor: 'pointer', textAlign: 'left',
                border: method === m.id ? '2px solid var(--sun)' : '1.5px solid var(--line)',
                background: method === m.id ? 'var(--sun-soft)' : 'var(--surface)' }}>
                <span style={{ width: 42, height: 42, borderRadius: 10, background: m.c, color: '#1a1407',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flex: 'none', fontFamily: 'var(--display)' }}>{m.t}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15.5 }}>{m.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{m.sub}</div>
                </span>
                {method === m.id && <span style={{ color: 'var(--sun-deep)' }}><Icon d={I.check} s={20} /></span>}
              </button>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, padding: '10px 2px', cursor: 'pointer' }}>
              <input type="checkbox" checked={autoTopUp} onChange={e => setAutoTopUp(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: 'var(--sun-deep)' }} />
              <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>Auto top-up {cedi(amount)} when I hit low balance</span>
            </label>
            <button className="btn btn-sun" style={{ width: '100%', marginTop: 12, padding: 16, fontSize: 16 }}
              onClick={go}>Pay {cedi(amount)}</button>
          </div>
        )}

        {step === 'processing' && (
          <div style={{ padding: '40px 0 30px', textAlign: 'center' }}>
            <div className="spinner" style={{ width: 46, height: 46, margin: '0 auto 18px' }}></div>
            <h2 style={{ fontSize: 19 }}>Confirming payment…</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14, marginTop: 6 }}>Approve the prompt on your phone.</p>
          </div>
        )}

        {step === 'success' && (
          <div style={{ padding: '20px 0 8px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon d={I.check} s={34} w={3} />
            </div>
            <h2 style={{ fontSize: 22 }}>Top-up successful</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 14.5, margin: '8px 0 4px' }}>{cedi(amount)} added · ≈ {kwh} kWh</p>
            <p style={{ color: 'var(--on-ink)', fontSize: 13.5, fontWeight: 600 }}>Power restored automatically.</p>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 18, padding: 16, fontSize: 16 }}
              onClick={finish}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  USAGE
// ============================================================
function UsageScreen({ onBack }) {
  const [range, setRange] = React.useState('week');
  const data = {
    week: [3.1, 4.2, 2.8, 5.0, 4.4, 3.6, 4.0],
    month: [22, 26, 19, 24],
    day: [0.2, 0.1, 0.3, 0.9, 1.1, 0.7, 0.5, 0.4],
  };
  const labels = {
    week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    month: ['W1', 'W2', 'W3', 'W4'],
    day: ['6a', '9a', '12p', '3p', '6p', '9p', '12a', '3a'],
  };
  const gen = { week: [4.0, 4.5, 3.2, 5.4, 5.0, 4.2, 4.6] };
  const series = data[range], max = Math.max(...series) * 1.15;
  const total = series.reduce((a, b) => a + b, 0).toFixed(1);

  return (
    <div>
      <ScreenHeader title="Usage" onBack={onBack} />
      <div style={{ display: 'flex', gap: 6, background: 'var(--bg-2)', padding: 4, borderRadius: 12, marginBottom: 18 }}>
        {[['day', 'Day'], ['week', 'Week'], ['month', 'Month']].map(([id, l]) => (
          <button key={id} onClick={() => setRange(id)} style={{
            flex: 1, padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            fontFamily: 'var(--sans)', background: range === id ? 'var(--surface)' : 'transparent',
            color: range === id ? 'var(--ink)' : 'var(--ink-3)', boxShadow: range === id ? 'var(--shadow-sm)' : 'none' }}>{l}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Consumed this {range}</span>
          <span className="num" style={{ fontSize: 26, fontWeight: 600 }}>{total} <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>kWh</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 140, marginTop: 18 }}>
          {series.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', maxWidth: 30, height: (v / max * 100) + '%', background: 'linear-gradient(180deg, var(--sun), var(--sun-deep))',
                borderRadius: '6px 6px 3px 3px', minHeight: 4 }}></div>
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{labels[range][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 16, marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <Icon d={I.sun} s={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Your panels generated 31.4 kWh</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>This week · more than you used</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 16 }}>Showing last-known data · syncs when online</p>
    </div>
  );
}

// ============================================================
//  SAVINGS & RELIABILITY
// ============================================================
function SavingsScreen({ onBack }) {
  return (
    <div>
      <ScreenHeader title="Savings & reliability" onBack={onBack} />
      <div className="card" style={{ padding: 22, background: 'linear-gradient(160deg, var(--on-bg), var(--surface))', borderColor: 'color-mix(in oklch, var(--on) 25%, var(--on-bg))' }}>
        <span className="chip on"><span className="dot"></span>This month</span>
        <div className="num" style={{ fontSize: 46, fontWeight: 700, margin: '14px 0 2px', color: 'var(--on-ink)' }}>₵62</div>
        <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>saved vs. running a diesel generator</div>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>Based on the fuel a generator would have burned for the power you used.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="num" style={{ fontSize: 30, fontWeight: 700 }}>99.4<span style={{ fontSize: 15 }}>%</span></div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>Power uptime</div>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="num" style={{ fontSize: 30, fontWeight: 700 }}>₵341</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>Saved this year</div>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 14 }}>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 12 }}>Uptime, last 6 months</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 9, height: 64 }}>
          {[99.1, 98.8, 99.6, 99.9, 99.2, 99.4].map((v, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: ((v - 98) / 2 * 56) + 'px', background: 'var(--on)', borderRadius: 4, opacity: 0.55 + i * 0.08 }}></div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 18, lineHeight: 1.5 }}>
        This is why the subscription is worth it — reliable power, no fuel runs, no upfront cost.</p>
    </div>
  );
}

// ============================================================
//  REPORT A FAULT
// ============================================================
function FaultScreen({ onBack, ticket, setTicket }) {
  const [cat, setCat] = React.useState(null);
  const cats = [
    { id: 'nopower', label: 'No power', ic: I.bolt },
    { id: 'flicker', label: 'Power flickers', ic: I.sun },
    { id: 'meter', label: 'Meter issue', ic: I.battery },
    { id: 'other', label: 'Something else', ic: I.help },
  ];
  const submit = () => {
    setTicket({ id: 'KNA-2841', cat: cats.find(c => c.id === cat).label, status: 'open', eta: null });
  };

  if (ticket) {
    return (
      <div>
        <ScreenHeader title="Your report" onBack={() => { setTicket(null); onBack(); }} />
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)' }}>#{ticket.id}</span>
            <Chip tone="low">In progress</Chip>
          </div>
          <h2 style={{ fontSize: 20, marginTop: 12 }}>{ticket.cat}</h2>
          <div style={{ marginTop: 18, position: 'relative', paddingLeft: 26 }}>
            {[
              { t: 'Report received', s: 'Just now', done: true },
              { t: 'Technician assigned', s: 'Kwame A. · arriving ~2 hrs', done: true },
              { t: 'On the way', s: 'Pending', done: false },
              { t: 'Resolved', s: 'Pending', done: false },
            ].map((st, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < arr.length - 1 ? 20 : 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -18, top: 2, width: 14, height: 14, borderRadius: '50%',
                  background: st.done ? 'var(--on)' : 'var(--surface)', border: st.done ? 'none' : '2px solid var(--line-2)', zIndex: 2 }}></div>
                {i < arr.length - 1 && <div style={{ position: 'absolute', left: -12, top: 14, width: 2, height: '100%', background: st.done ? 'var(--on)' : 'var(--line)' }}></div>}
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: st.done ? 'var(--ink)' : 'var(--ink-3)' }}>{st.t}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{st.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16, padding: 14 }}>
          <Icon d={I.phone} s={18} /> Call support
        </button>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader title="Report a fault" onBack={onBack} />
      <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 2px 16px' }}>What's happening? Pick the closest one.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            padding: '22px 14px', borderRadius: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
            border: cat === c.id ? '2px solid var(--sun)' : '1.5px solid var(--line)',
            background: cat === c.id ? 'var(--sun-soft)' : 'var(--surface)', color: 'var(--ink)' }}>
            <span style={{ color: cat === c.id ? 'var(--sun-deep)' : 'var(--ink-2)' }}><Icon d={c.ic} s={26} /></span>
            <span style={{ fontSize: 15, fontWeight: 600, textAlign: 'left' }}>{c.label}</span>
          </button>
        ))}
      </div>
      <button style={{ width: '100%', marginTop: 14, padding: 16, borderRadius: 14, border: '1.5px dashed var(--line-2)',
        background: 'var(--bg-2)', color: 'var(--ink-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14.5, fontFamily: 'var(--sans)', fontWeight: 500 }}>
        <Icon d={I.camera} s={20} /> Add a photo (optional)
      </button>
      <button className="btn btn-primary" disabled={!cat} style={{ width: '100%', marginTop: 14, padding: 16, fontSize: 16,
        opacity: cat ? 1 : 0.4, cursor: cat ? 'pointer' : 'not-allowed' }} onClick={submit}>Submit report</button>
    </div>
  );
}

// ============================================================
//  NOTIFICATIONS
// ============================================================
function NotificationsScreen({ onBack }) {
  const items = [
    { tone: 'on', ic: I.check, t: 'Payment confirmed', s: '₵20.00 added · power restored', time: 'Just now' },
    { tone: 'off', ic: I.bolt, t: 'Power disconnected', s: 'Balance reached zero after grace', time: '2:14 PM' },
    { tone: 'low', ic: I.bell, t: 'Low balance warning', s: '≈ 20 hours of power left', time: '11:05 AM' },
    { tone: 'on', ic: I.shield, t: 'Maintenance complete', s: 'Inverter check passed', time: 'Yesterday' },
    { tone: 'low', ic: I.clock, t: 'Maintenance scheduled', s: 'Technician visit, Thu 9am', time: 'Mon' },
  ];
  return (
    <div>
      <ScreenHeader title="Notifications" onBack={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((n, i) => (
          <div key={i} className="card" style={{ padding: 14, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `var(--${n.tone}-bg)`, color: `var(--${n.tone})` }}><Icon d={n.ic} s={20} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{n.t}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 1 }}>{n.s}</div>
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)', flex: 'none' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, I, cedi, STATES, Chip, FreshStrip, ScreenHeader, BottomNav,
  TopUpSheet, UsageScreen, SavingsScreen, FaultScreen, NotificationsScreen,
});
