/* ============================================================
   KANEA — Field app · agents & technicians · offline-first
   ============================================================ */
const { useState: useS } = React;

const FIcon = ({ d, s = 22, w = 2, fill = 'none' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const FI = {
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  user: <g><circle cx="12" cy="8" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></g>,
  camera: <g><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></g>,
  scan: <g><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M3 12h18" /></g>,
  pin: <g><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></g>,
  check: <path d="M20 6 9 17l-5-5" />,
  checkCircle: <g><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></g>,
  chevR: <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  cloud: <g><path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 16.9" /><path d="M12 12v8M9 17l3 3 3-3" /></g>,
  cloudOff: <g><path d="M3 3l18 18" /><path d="M17.5 19a4.5 4.5 0 0 0 3.5-7.3M8.5 5.2A6 6 0 0 1 18 10a4.5 4.5 0 0 1 .9 0M6.3 9A4 4 0 0 0 6 16.9" /></g>,
  box: <g><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></g>,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  battery: <g><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 11v2" /></g>,
  panel: <g><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M3 10h18M9 4v12M15 4v12M12 16v4M8 20h8" /></g>,
  meter: <g><circle cx="12" cy="12" r="9" /><path d="M12 12 16 9M12 3v2M21 12h-2" /></g>,
  nav: <path d="M3 11l19-9-9 19-2-8-8-2z" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.5 2.5-2.5-2.5 2.5-2.5z" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.4 1.6.7 2.3a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.7-1.3a2 2 0 0 1 2.1-.4c.7.3 1.5.6 2.3.7A2 2 0 0 1 22 16.9z" />,
  doc: <g><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /></g>,
};

// ---------- sync banner ----------
function SyncBanner({ online, outbox, onSync }) {
  const synced = online && outbox === 0;
  const tone = synced ? 'on' : online ? 'low' : 'neutral';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 13,
      background: `var(--${tone}-bg)`, border: `1px solid color-mix(in oklch, var(--${tone === 'neutral' ? 'ink-3' : tone}) 30%, transparent)`, marginBottom: 16 }}>
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

function StepHeader({ title, onBack, step, total }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 2px 12px' }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}><FIcon d={FI.back} s={20} /></button>
        <div style={{ flex: 1 }}>
          {step && <div style={{ fontSize: 11.5, fontFamily: 'var(--mono)', color: 'var(--sun-deep)', letterSpacing: '0.06em', fontWeight: 600 }}>STEP {step} OF {total}</div>}
          <h2 style={{ fontSize: 21 }}>{title}</h2>
        </div>
      </div>
      {step && <div style={{ display: 'flex', gap: 5, marginBottom: 18 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < step ? 'var(--sun)' : 'var(--line)' }}></div>
        ))}
      </div>}
    </div>
  );
}

// ---------- big tap field ----------
function Field({ label, value, placeholder, onClick, icon, done }) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', background: 'var(--surface)', border: `1.5px solid ${done ? 'var(--on)' : 'var(--line-2)'}`,
      borderRadius: 14, padding: '14px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
      {icon && <span style={{ color: done ? 'var(--on)' : 'var(--ink-3)' }}><FIcon d={done ? FI.check : icon} s={22} /></span>}
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>{label}</span>
        <span style={{ display: 'block', fontSize: 15.5, fontWeight: 600, color: value ? 'var(--ink)' : 'var(--ink-3)', marginTop: 2 }}>{value || placeholder}</span>
      </span>
    </button>
  );
}

// ============================================================
//  WORK / MY DAY  (landing)
// ============================================================
function WorkScreen({ role, online, outbox, onSync, startWizard, openTicket }) {
  const tickets = [
    { id: 'KNA-2835', type: 'fault', title: 'Meter offline', site: 'GH-Kumasi-0421', pri: 'High', dist: '2.1 km', tone: 'off' },
    { id: 'KNA-2822', type: 'maintenance', title: 'Battery replacement', site: 'GH-Tamale-0188', pri: 'High', dist: '5.4 km', tone: 'low' },
    { id: 'KNA-2829', type: 'install', title: 'Commissioning visit', site: 'GH-Ho-0240', pri: 'Low', dist: '0.8 km', tone: 'neutral' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 2px 16px' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{role === 'agent' ? 'Sales agent' : 'Technician'}</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--display)', whiteSpace: 'nowrap' }}>Kwame Adjei</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-2)', borderRadius: 10, padding: '8px 12px', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>
          <FIcon d={FI.box} s={16} /> 6 in stock
        </div>
      </div>

      <SyncBanner online={online} outbox={outbox} onSync={onSync} />

      <button onClick={startWizard} style={{ width: '100%', background: 'var(--sun)', color: 'oklch(0.22 0.04 50)', border: 'none', borderRadius: 18,
        padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow)', marginBottom: 20 }}>
        <span style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><FIcon d={FI.plus} s={26} w={2.6} /></span>
        <span style={{ textAlign: 'left' }}>
          <span style={{ display: 'block', fontSize: 18, fontWeight: 700 }}>New customer</span>
          <span style={{ display: 'block', fontSize: 13, opacity: 0.8 }}>Onboard → install → activate</span>
        </span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 12px' }}>
        <span style={{ fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em' }}>MY WORK ORDERS</span>
        <span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>{tickets.length} assigned</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tickets.map(t => (
          <button key={t.id} onClick={() => openTicket(t)} className="card" style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 13, cursor: 'pointer', textAlign: 'left', border: '1px solid var(--line)' }}>
            <span className={'fld-tic ' + t.tone}><FIcon d={t.type === 'fault' ? FI.bolt : t.type === 'install' ? FI.box : FI.wrench} s={20} /></span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{t.title}</span>
                <span className={'chip ' + (t.pri === 'High' ? 'off' : 'neutral')} style={{ padding: '2px 7px', fontSize: 11 }}><span className="dot"></span>{t.pri}</span>
              </span>
              <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)', marginTop: 2 }}>{t.site} · {t.dist}</span>
            </span>
            <span style={{ color: 'var(--ink-3)' }}><FIcon d={FI.chevR} s={20} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
//  ONBOARDING WIZARD
// ============================================================
function Wizard({ online, onExit, queue }) {
  const [step, setStep] = useS(1);
  const total = 5;

  // captured state
  const [kyc, setKyc] = useS({ name: false, phone: false, id: false, consent: false });
  const [survey, setSurvey] = useS({ geo: false, photo: false });
  const [serials, setSerials] = useS({ panel: false, battery: false, inverter: false, meter: false });
  const [checks, setChecks] = useS({ mount: false, wiring: false, pairing: false, poweron: false });

  const kycDone = Object.values(kyc).every(Boolean);
  const surveyDone = survey.geo;
  const installDone = Object.values(serials).every(Boolean);
  const checksDone = Object.values(checks).every(Boolean);

  const next = () => { queue(); setStep(s => Math.min(s + 1, total)); };
  const back = () => step === 1 ? onExit() : setStep(s => s - 1);

  const devices = [
    { k: 'panel', label: 'Solar panel ×4', ic: FI.panel, sn: 'SP-4490-A' },
    { k: 'battery', label: 'Battery', ic: FI.battery, sn: 'BT-1182-K' },
    { k: 'inverter', label: 'Inverter', ic: FI.bolt, sn: 'IN-7731-G' },
    { k: 'meter', label: 'Smart meter', ic: FI.meter, sn: 'MT-3320-Z' },
  ];
  const checkItems = [
    { k: 'mount', label: 'Mounting secure', sub: 'Panels & enclosure fixed' },
    { k: 'wiring', label: 'Wiring & polarity', sub: 'Connections torqued, polarity correct' },
    { k: 'pairing', label: 'Meter paired', sub: 'Handshake with PAYGo platform' },
    { k: 'poweron', label: 'Test power-on', sub: 'Load test passes, telemetry flowing' },
  ];

  return (
    <div>
      {step <= total && step !== total && <StepHeader title={['', 'Customer & KYC', 'Site survey', 'Install capture', 'Commissioning'][step]} onBack={back} step={step} total={total} />}

      {/* STEP 1 — KYC */}
      {step === 1 && (
        <div>
          <Field label="Full name" placeholder="Tap to enter" value={kyc.name ? 'Abena Owusu' : ''} done={kyc.name} icon={FI.user} onClick={() => setKyc(k => ({ ...k, name: true }))} />
          <Field label="Phone (login identity)" placeholder="Tap to enter" value={kyc.phone ? '+233 20 •• •• 318' : ''} done={kyc.phone} icon={FI.phone} onClick={() => setKyc(k => ({ ...k, phone: true }))} />
          <Field label="ID photo" placeholder="Tap to capture" value={kyc.id ? 'Ghana Card captured' : ''} done={kyc.id} icon={FI.camera} onClick={() => setKyc(k => ({ ...k, id: true }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 4px', cursor: 'pointer' }}>
            <input type="checkbox" checked={kyc.consent} onChange={e => setKyc(k => ({ ...k, consent: e.target.checked }))} style={{ width: 24, height: 24, accentColor: 'var(--sun-deep)' }} />
            <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.4 }}>Customer consents to data use (Ghana DPA)</span>
          </label>
        </div>
      )}

      {/* STEP 2 — Survey */}
      {step === 2 && (
        <div>
          <button onClick={() => setSurvey(s => ({ ...s, geo: true }))} className="card" style={{ width: '100%', padding: 0, overflow: 'hidden', cursor: 'pointer', marginBottom: 12, border: survey.geo ? '1.5px solid var(--on)' : '1px solid var(--line)' }}>
            <div style={{ height: 130, background: 'repeating-linear-gradient(135deg, var(--bg-2), var(--bg-2) 9px, var(--bg) 9px, var(--bg) 18px)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: survey.geo ? 'var(--on)' : 'var(--sun-deep)' }}><FIcon d={FI.pin} s={36} w={2} /></span>
            </div>
            <div style={{ padding: 14, textAlign: 'left' }}>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{survey.geo ? 'Location captured' : 'Tap to geo-tag site'}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{survey.geo ? '6.6885° N, 1.6244° W · ±4m' : 'GPS fix needed'}</div>
            </div>
          </button>
          <Field label="Site photos" placeholder="Tap to capture roof / location" value={survey.photo ? '3 photos captured' : ''} done={survey.photo} icon={FI.camera} onClick={() => setSurvey(s => ({ ...s, photo: true }))} />
          <p style={{ fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', marginTop: 8 }}>Works offline — saved to device</p>
        </div>
      )}

      {/* STEP 3 — Install capture */}
      {step === 3 && (
        <div>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 2px 14px' }}>Scan each device serial. Linking decrements your stock.</p>
          {devices.map(d => (
            <button key={d.k} onClick={() => setSerials(s => ({ ...s, [d.k]: true }))} style={{ width: '100%', textAlign: 'left', background: 'var(--surface)',
              border: `1.5px solid ${serials[d.k] ? 'var(--on)' : 'var(--line-2)'}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, background: serials[d.k] ? 'var(--on-bg)' : 'var(--bg-2)', color: serials[d.k] ? 'var(--on)' : 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><FIcon d={d.ic} s={22} /></span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{d.label}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{serials[d.k] ? d.sn : 'Not scanned'}</span>
              </span>
              <span style={{ color: serials[d.k] ? 'var(--on)' : 'var(--sun-deep)' }}><FIcon d={serials[d.k] ? FI.check : FI.scan} s={22} /></span>
            </button>
          ))}
        </div>
      )}

      {/* STEP 4 — Commissioning */}
      {step === 4 && (
        <div>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 2px 14px' }}>All steps must pass before the site can go active.</p>
          {checkItems.map(c => (
            <button key={c.k} onClick={() => setChecks(s => ({ ...s, [c.k]: !s[c.k] }))} style={{ width: '100%', textAlign: 'left', background: checks[c.k] ? 'var(--on-bg)' : 'var(--surface)',
              border: `1.5px solid ${checks[c.k] ? 'var(--on)' : 'var(--line-2)'}`, borderRadius: 14, padding: '15px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', border: checks[c.k] ? 'none' : '2px solid var(--line-2)', background: checks[c.k] ? 'var(--on)' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{checks[c.k] && <FIcon d={FI.check} s={17} w={3} />}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: checks[c.k] ? 'var(--on-ink)' : 'var(--ink)' }}>{c.label}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-3)' }}>{c.sub}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* STEP 5 — Activate / done */}
      {step === total && (
        <div style={{ textAlign: 'center', padding: '30px 6px' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><FIcon d={FI.checkCircle} s={48} w={2} /></div>
          <h2 style={{ fontSize: 25 }}>Site activated</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', margin: '10px 0 0', lineHeight: 1.5 }}>Abena Owusu's system is live. Subscription started on <b style={{ color: 'var(--ink)' }}>Home 1.2kW</b>.</p>
          <div className="card" style={{ padding: 16, marginTop: 22, textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 10 }}>QUEUED TO SYNC</div>
            {['Customer + KYC', 'Site survey', '4 device serials', 'Commissioning pass'].map((x, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 14 }}>
                <span style={{ color: online ? 'var(--on)' : 'var(--ink-3)' }}><FIcon d={online ? FI.check : FI.cloudOff} s={17} /></span>{x}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* footer action */}
      <div style={{ marginTop: 18 }}>
        {step === 1 && <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16, opacity: kycDone ? 1 : 0.4 }} disabled={!kycDone} onClick={next}>Save &amp; continue</button>}
        {step === 2 && <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16, opacity: surveyDone ? 1 : 0.4 }} disabled={!surveyDone} onClick={next}>Save &amp; continue</button>}
        {step === 3 && <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16, opacity: installDone ? 1 : 0.4 }} disabled={!installDone} onClick={next}>Save &amp; continue</button>}
        {step === 4 && <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16, opacity: checksDone ? 1 : 0.4 }} disabled={!checksDone} onClick={next}>Activate site</button>}
        {step === total && <button className="btn btn-primary" style={{ width: '100%', padding: 16, fontSize: 16 }} onClick={onExit}>Back to work orders</button>}
      </div>
    </div>
  );
}

// ============================================================
//  TICKET DETAIL / RESOLVE
// ============================================================
function TicketDetail({ ticket, online, onExit, queue }) {
  const [stage, setStage] = useS('detail'); // detail | resolve | done
  const [parts, setParts] = useS(false);
  const [photo, setPhoto] = useS(false);

  if (stage === 'done') {
    return (
      <div>
        <StepHeader title="Resolved" onBack={onExit} />
        <div style={{ textAlign: 'center', padding: '24px 6px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><FIcon d={FI.checkCircle} s={46} w={2} /></div>
          <h2 style={{ fontSize: 23 }}>{ticket.title} resolved</h2>
          <p style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 8 }}>{ticket.site} · site health updated</p>
          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <FIcon d={online ? FI.cloud : FI.cloudOff} s={16} /> {online ? 'Synced to ops dashboard' : 'Queued — syncs on reconnect'}
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 18, padding: 16 }} onClick={onExit}>Back to work orders</button>
      </div>
    );
  }

  if (stage === 'resolve') {
    return (
      <div>
        <StepHeader title="Resolve ticket" onBack={() => setStage('detail')} />
        <div className="card" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 8 }}>DIAGNOSIS</div>
          <div style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>Loose meter antenna — re-seated, GSM signal restored.</div>
        </div>
        <Field label="Parts used" placeholder="Tap to log parts" value={parts ? 'Antenna pigtail ×1' : ''} done={parts} icon={FI.box} onClick={() => setParts(true)} />
        <Field label="Photo evidence (required)" placeholder="Tap to capture" value={photo ? 'Resolution photo captured' : ''} done={photo} icon={FI.camera} onClick={() => setPhoto(true)} />
        <button className="btn btn-sun" style={{ width: '100%', marginTop: 6, padding: 16, fontSize: 16, opacity: photo ? 1 : 0.4 }} disabled={!photo} onClick={() => { queue(); setStage('done'); }}>Close with evidence</button>
      </div>
    );
  }

  return (
    <div>
      <StepHeader title={ticket.id} onBack={onExit} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <h2 style={{ fontSize: 22, flex: 1 }}>{ticket.title}</h2>
        <span className={'chip ' + (ticket.pri === 'High' ? 'off' : 'neutral')}><span className="dot"></span>{ticket.pri}</span>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ height: 120, background: 'repeating-linear-gradient(135deg, var(--bg-2), var(--bg-2) 9px, var(--bg) 9px, var(--bg) 18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sun-deep)' }}><FIcon d={FI.pin} s={34} /></div>
        <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--mono)' }}>{ticket.site}</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{ticket.dist} away</div></div>
          <button className="fld-mini"><FIcon d={FI.nav} s={15} /> Navigate</button>
        </div>
      </div>
      <div className="card" style={{ padding: 16, marginBottom: 18 }}>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 6 }}>REPORTED</div>
        <div style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>Customer reports no telemetry for 9h. Last battery reading 38%. Meter connectivity flapping.</div>
      </div>
      <button className="btn btn-sun" style={{ width: '100%', padding: 16, fontSize: 16 }} onClick={() => setStage('resolve')}>Start resolution</button>
    </div>
  );
}

// ============================================================
//  FIELD APP SHELL
// ============================================================
function FieldApp({ role, online, onToggleOnline }) {
  const [view, setView] = useS('work');
  const [ticket, setTicket] = useS(null);
  const [outbox, setOutbox] = useS(2);

  const queue = () => { if (!online) setOutbox(o => o + 1); };
  const sync = () => setOutbox(0);

  React.useEffect(() => { if (online) setOutbox(0); }, [online]);

  let body;
  if (view === 'wizard') body = <Wizard online={online} queue={queue} onExit={() => setView('work')} />;
  else if (view === 'ticket') body = <TicketDetail ticket={ticket} online={online} queue={queue} onExit={() => { setView('work'); setTicket(null); }} />;
  else body = <WorkScreen role={role} online={online} outbox={outbox} onSync={sync} startWizard={() => setView('wizard')} openTicket={(t) => { setTicket(t); setView('ticket'); }} />;

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 22px' }}>{body}</div>
    </div>
  );
}

Object.assign(window, { FieldApp });
