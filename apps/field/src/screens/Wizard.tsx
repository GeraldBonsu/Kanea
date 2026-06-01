import React, { useState } from 'react';
import { FIcon, FI } from '../icons';
import StepHeader from '../components/StepHeader';
import FieldInput from '../components/FieldInput';

interface Props { online: boolean; onExit: () => void; queue: () => void; }

export default function Wizard({ online, onExit, queue }: Props) {
  const [step, setStep] = useState(1);
  const total = 5;

  const [kyc, setKyc] = useState({ name: false, phone: false, id: false, consent: false });
  const [survey, setSurvey] = useState({ geo: false, photo: false });
  const [serials, setSerials] = useState({ panel: false, battery: false, inverter: false, meter: false });
  const [checks, setChecks] = useState({ mount: false, wiring: false, pairing: false, poweron: false });

  const kycDone    = Object.values(kyc).every(Boolean);
  const surveyDone = survey.geo;
  const installDone = Object.values(serials).every(Boolean);
  const checksDone  = Object.values(checks).every(Boolean);

  const next = () => { queue(); setStep(s => Math.min(s + 1, total)); };
  const back = () => step === 1 ? onExit() : setStep(s => s - 1);

  const devices = [
    { k: 'panel'   as const, label: 'Solar panel ×4', ic: FI.panel,   sn: 'SP-4490-A' },
    { k: 'battery' as const, label: 'Battery',         ic: FI.battery, sn: 'BT-1182-K' },
    { k: 'inverter'as const, label: 'Inverter',         ic: FI.bolt,    sn: 'IN-7731-G' },
    { k: 'meter'   as const, label: 'Smart meter',      ic: FI.meter,   sn: 'MT-3320-Z' },
  ];

  const checkItems = [
    { k: 'mount'   as const, label: 'Mounting secure',  sub: 'Panels & enclosure fixed' },
    { k: 'wiring'  as const, label: 'Wiring & polarity', sub: 'Connections torqued, polarity correct' },
    { k: 'pairing' as const, label: 'Meter paired',      sub: 'Handshake with PAYGo platform' },
    { k: 'poweron' as const, label: 'Test power-on',     sub: 'Load test passes, telemetry flowing' },
  ];

  return (
    <div>
      {step < total && (
        <StepHeader
          title={['', 'Customer & KYC', 'Site survey', 'Install capture', 'Commissioning'][step]}
          onBack={back} step={step} total={total}
        />
      )}

      {/* STEP 1 — KYC */}
      {step === 1 && (
        <div>
          <FieldInput label="Full name" placeholder="Tap to enter" value={kyc.name ? 'Abena Owusu' : ''} done={kyc.name} icon={FI.user} onClick={() => setKyc(k => ({ ...k, name: true }))} />
          <FieldInput label="Phone (login identity)" placeholder="Tap to enter" value={kyc.phone ? '+233 20 •• •• 318' : ''} done={kyc.phone} icon={FI.phone} onClick={() => setKyc(k => ({ ...k, phone: true }))} />
          <FieldInput label="ID photo" placeholder="Tap to capture" value={kyc.id ? 'Ghana Card captured' : ''} done={kyc.id} icon={FI.camera} onClick={() => setKyc(k => ({ ...k, id: true }))} />
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
            <div style={{ height: 130, background: 'repeating-linear-gradient(135deg, var(--bg-2), var(--bg-2) 9px, var(--bg) 9px, var(--bg) 18px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: survey.geo ? 'var(--on)' : 'var(--sun-deep)' }}><FIcon d={FI.pin} s={36} w={2} /></span>
            </div>
            <div style={{ padding: 14, textAlign: 'left' }}>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{survey.geo ? 'Location captured' : 'Tap to geo-tag site'}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{survey.geo ? '6.6885° N, 1.6244° W · ±4m' : 'GPS fix needed'}</div>
            </div>
          </button>
          <FieldInput label="Site photos" placeholder="Tap to capture roof / location" value={survey.photo ? '3 photos captured' : ''} done={survey.photo} icon={FI.camera} onClick={() => setSurvey(s => ({ ...s, photo: true }))} />
          <p style={{ fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', marginTop: 8 }}>Works offline — saved to device</p>
        </div>
      )}

      {/* STEP 3 — Install capture */}
      {step === 3 && (
        <div>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 2px 14px' }}>Scan each device serial. Linking decrements your stock.</p>
          {devices.map(d => (
            <button key={d.k} onClick={() => setSerials(s => ({ ...s, [d.k]: true }))} style={{ width: '100%', textAlign: 'left', background: 'var(--surface)', border: `1.5px solid ${serials[d.k] ? 'var(--on)' : 'var(--line-2)'}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
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
            <button key={c.k} onClick={() => setChecks(s => ({ ...s, [c.k]: !s[c.k] }))} style={{ width: '100%', textAlign: 'left', background: checks[c.k] ? 'var(--on-bg)' : 'var(--surface)', border: `1.5px solid ${checks[c.k] ? 'var(--on)' : 'var(--line-2)'}`, borderRadius: 14, padding: '15px 16px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', border: checks[c.k] ? 'none' : '2px solid var(--line-2)', background: checks[c.k] ? 'var(--on)' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                {checks[c.k] && <FIcon d={FI.check} s={17} w={3} />}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: checks[c.k] ? 'var(--on-ink)' : 'var(--ink)' }}>{c.label}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-3)' }}>{c.sub}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* STEP 5 — Activated */}
      {step === total && (
        <div style={{ textAlign: 'center', padding: '30px 6px' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--on-bg)', color: 'var(--on)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <FIcon d={FI.checkCircle} s={48} w={2} />
          </div>
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
