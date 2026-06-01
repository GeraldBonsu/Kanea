/* ============================================================
   KANEA — Customer app · main shell + Home variants + USSD
   ============================================================ */
const { useState } = React;

// ---------- shared in-screen header ----------
function AppTopBar({ name, onBell, onProfile, unread }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 2px 16px' }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Akwaaba,</div>
        <div style={{ fontSize: 19, fontWeight: 700, fontFamily: 'var(--display)' }}>{name}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onBell} style={{ position: 'relative', width: 42, height: 42, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}>
          <Icon d={I.bell} s={20} />
          {unread && <span style={{ position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: '50%', background: 'var(--off)', border: '2px solid var(--surface)' }}></span>}
        </button>
        <button onClick={onProfile} style={{ width: 42, height: 42, borderRadius: 12, border: 'none', background: 'var(--sun-soft)', color: 'var(--sun-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--display)' }}>A</button>
      </div>
    </div>
  );
}

// ---------- banner (low / off warning) ----------
function Banner({ st, onTopUp }) {
  if (!st.banner) return null;
  const b = st.banner;
  return (
    <div style={{ background: `var(--${b.tone}-bg)`, border: `1px solid color-mix(in oklch, var(--${b.tone}) 35%, transparent)`,
      borderRadius: 16, padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: `var(--${b.tone})` }}><Icon d={b.tone === 'off' ? I.bolt : I.bell} s={19} w={2.4} /></span>
        <span style={{ fontWeight: 700, fontSize: 15, color: `var(--${b.tone}-ink)` }}>{b.title}</span>
      </div>
      <p style={{ fontSize: 13.5, color: `var(--${b.tone}-ink)`, margin: '8px 0 0', lineHeight: 1.5 }}>{b.msg}</p>
      <button className="btn btn-sun" style={{ width: '100%', marginTop: 12, padding: 13 }} onClick={onTopUp}>Top up now</button>
    </div>
  );
}

// ---------- battery + last-updated row ----------
function MetaRow({ st, online, onRefresh }) {
  return (
    <div>
      <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: `var(--${st.tone}-bg)`, color: `var(--${st.tone})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <Icon d={I.battery} s={21} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Battery {st.battery}%</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{st.backup}</div>
        </div>
        <div style={{ width: 64, height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
          <div style={{ width: st.battery + '%', height: '100%', background: `var(--${st.tone})` }}></div>
        </div>
      </div>
      <FreshStrip online={online} onRefresh={onRefresh} />
    </div>
  );
}

// ============================================================
//  HOME VARIANT A — Balance-first
// ============================================================
function HomeA({ st, online, onTopUp, onRefresh, go }) {
  return (
    <div>
      <Banner st={st} onTopUp={onTopUp} />
      <div className="card" style={{ padding: '24px 22px', textAlign: 'center',
        background: st.tone === 'off' ? 'var(--surface)' : 'linear-gradient(165deg, var(--sun-soft), var(--surface) 75%)' }}>
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
      <div style={{ marginTop: 14 }}><MetaRow st={st} online={online} onRefresh={onRefresh} /></div>
      <button onClick={() => go('savings')} className="card" style={{ width: '100%', marginTop: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon d={I.leaf} s={20} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 600 }}>You saved ₵62 this month</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>vs. diesel · 99.4% uptime</div></div>
        <span style={{ color: 'var(--ink-3)' }}><Icon d={I.chevR} s={20} /></span>
      </button>
    </div>
  );
}

// ============================================================
//  HOME VARIANT B — Status-first (traffic light)
// ============================================================
function HomeB({ st, online, onTopUp, onRefresh, go }) {
  const ring = { on: 'var(--on)', low: 'var(--low)', off: 'var(--off)' }[st.tone];
  return (
    <div>
      <div style={{ background: `var(--${st.tone}-bg)`, borderRadius: 24, padding: '28px 22px 24px', textAlign: 'center',
        border: `1px solid color-mix(in oklch, ${ring} 25%, transparent)` }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', margin: '0 auto', background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 8px color-mix(in oklch, ${ring} 18%, transparent)`, position: 'relative' }}>
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
      <div style={{ marginTop: 12 }}><MetaRow st={st} online={online} onRefresh={onRefresh} /></div>
    </div>
  );
}

// ============================================================
//  HOME VARIANT C — Card glance / dashboard
// ============================================================
function HomeC({ st, online, onTopUp, onRefresh, go }) {
  return (
    <div>
      <Banner st={st} onTopUp={onTopUp} />
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

// ============================================================
//  PROFILE (language)
// ============================================================
function ProfileScreen({ onBack, lang, setLang }) {
  return (
    <div>
      <ScreenHeader title="Profile" onBack={onBack} />
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 54, height: 54, borderRadius: 16, background: 'var(--sun-soft)', color: 'var(--sun-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, fontFamily: 'var(--display)' }}>A</div>
        <div><div style={{ fontSize: 17, fontWeight: 700 }}>Akosua Mensah</div><div style={{ fontSize: 13, color: 'var(--ink-3)' }}>+233 24 •• •• 821 · Plan: Home 1.2kW</div></div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', margin: '20px 2px 10px', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>LANGUAGE</div>
      {[['en', 'English'], ['tw', 'Twi']].map(([id, l]) => (
        <button key={id} onClick={() => setLang(id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 14, marginBottom: 10, cursor: 'pointer',
          border: lang === id ? '2px solid var(--sun)' : '1.5px solid var(--line)', background: lang === id ? 'var(--sun-soft)' : 'var(--surface)' }}>
          <Icon d={I.globe} s={20} /><span style={{ flex: 1, textAlign: 'left', fontSize: 15.5, fontWeight: 600 }}>{l}</span>
          {lang === id && <span style={{ color: 'var(--sun-deep)' }}><Icon d={I.check} s={20} /></span>}
        </button>
      ))}
      <div style={{ fontSize: 12.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Icon d={I.shield} s={14} /> Your data is encrypted · Ghana DPA compliant
      </div>
    </div>
  );
}

// ============================================================
//  MAIN APP
// ============================================================
function CustomerApp({ variant, stateKey, online, onRefreshToggle }) {
  const [tab, setTab] = useState('home');
  const [overlay, setOverlay] = useState(null); // notifications | profile
  const [sheet, setSheet] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [lang, setLang] = useState('en');
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [topped, setTopped] = useState(false);

  // derived state — a successful top-up overrides 'off'/'low' to healthy
  const effKey = topped ? 'healthy' : stateKey;
  const st = STATES[effKey];

  React.useEffect(() => { setTopped(false); }, [stateKey]);

  const go = (t) => { setOverlay(null); setTab(t); };
  const HomeVariant = { A: HomeA, B: HomeB, C: HomeC }[variant];

  let body;
  if (overlay === 'notifications') body = <NotificationsScreen onBack={() => setOverlay(null)} />;
  else if (overlay === 'profile') body = <ProfileScreen onBack={() => setOverlay(null)} lang={lang} setLang={setLang} />;
  else if (tab === 'home') body = <><AppTopBar name="Akosua" unread onBell={() => setOverlay('notifications')} onProfile={() => setOverlay('profile')} /><HomeVariant st={st} online={online} onTopUp={() => setSheet(true)} onRefresh={onRefreshToggle} go={go} /></>;
  else if (tab === 'usage') body = <UsageScreen onBack={() => setTab('home')} />;
  else if (tab === 'savings') body = <SavingsScreen onBack={() => setTab('home')} />;
  else if (tab === 'fault') body = <FaultScreen onBack={() => setTab('home')} ticket={ticket} setTicket={setTicket} />;

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 18px' }}>{body}</div>
      <BottomNav tab={overlay ? '' : tab} setTab={go} />
      <TopUpSheet open={sheet} onClose={() => setSheet(false)} onComplete={() => setTopped(true)}
        autoTopUp={autoTopUp} setAutoTopUp={setAutoTopUp} />
    </div>
  );
}

// ============================================================
//  USSD feature-phone mock
// ============================================================
function UssdMock({ open, onClose }) {
  const [screen, setScreen] = useState('menu');
  React.useEffect(() => { if (open) setScreen('menu'); }, [open]);
  if (!open) return null;
  const screens = {
    menu: { title: 'Kanea *123#', body: ['Balance: 3.4 kWh', '≈ 20 hours left', '', '1. Balance & days', '2. Top up', '3. Report fault', '4. Help / contact'] },
    topup: { title: 'Top up', body: ['Enter amount (GHS):', '', '1. ₵10   2. ₵20', '3. ₵50   4. ₵100', '', 'Reply with number'] },
    sent: { title: 'Top up', body: ['Request sent.', '', 'Approve the MTN MoMo', 'prompt on your phone.', '', 'SMS confirmation', 'will follow.'] },
  };
  const s = screens[screen];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,16,10,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 230, background: '#11140f', borderRadius: 22, padding: 18, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', border: '3px solid #2a2e22' }}>
        <div style={{ background: '#bcd6a0', borderRadius: 8, padding: 14, minHeight: 200, fontFamily: 'var(--mono)', color: '#1e2814', fontSize: 13.5, lineHeight: 1.7 }}>
          <div style={{ fontWeight: 700, borderBottom: '1px solid rgba(30,40,20,0.3)', paddingBottom: 6, marginBottom: 8 }}>{s.title}</div>
          {s.body.map((l, i) => <div key={i}>{l || '\u00A0'}</div>)}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {screen === 'menu' && <button className="ussd-btn" onClick={() => setScreen('topup')}>Reply “2”</button>}
          {screen === 'topup' && <button className="ussd-btn" onClick={() => setScreen('sent')}>Reply “2”</button>}
          {screen === 'sent' && <button className="ussd-btn" onClick={() => setScreen('menu')}>Back to menu</button>}
          <button className="ussd-btn ghost" onClick={onClose}>Close</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#7d8870', marginTop: 12, fontFamily: 'var(--sans)' }}>Works on any feature phone · no data</div>
      </div>
    </div>
  );
}

Object.assign(window, { CustomerApp, UssdMock });
