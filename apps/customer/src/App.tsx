import React, { useState, useEffect } from 'react';
import { Icon, I, KaneaMark } from './icons';
import BottomNav from './components/BottomNav';
import TopUpSheet from './components/TopUpSheet';
import HomeA from './screens/HomeA';
import HomeB from './screens/HomeB';
import HomeC from './screens/HomeC';
import UsageScreen from './screens/UsageScreen';
import SavingsScreen from './screens/SavingsScreen';
import FaultScreen from './screens/FaultScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UssdScreen from './screens/UssdScreen';
import { STATES } from './types';
import type { ServiceState, HomeVariant, Lang } from './types';

// Demo state-cycle toggle bar (top of page for demo purposes)
function DemoBar({ stateKey, setStateKey, variant, setVariant, showUssd }: {
  stateKey: ServiceState; setStateKey: (k: ServiceState) => void;
  variant: HomeVariant; setVariant: (v: HomeVariant) => void;
  showUssd: () => void;
}) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'var(--ink)', color: 'var(--bg)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--mono)', opacity: 0.6 }}>Demo:</span>
      {(['healthy', 'low', 'off'] as ServiceState[]).map(k => (
        <button key={k} onClick={() => setStateKey(k)} style={{ background: stateKey === k ? 'var(--sun)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '3px 8px', color: stateKey === k ? '#1a1407' : 'var(--bg)', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>{k}</button>
      ))}
      <span style={{ opacity: 0.3 }}>|</span>
      {(['A', 'B', 'C'] as HomeVariant[]).map(v => (
        <button key={v} onClick={() => setVariant(v)} style={{ background: variant === v ? 'var(--sun)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '3px 8px', color: variant === v ? '#1a1407' : 'var(--bg)', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Home {v}</button>
      ))}
      <span style={{ opacity: 0.3 }}>|</span>
      <button onClick={showUssd} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '3px 8px', color: 'var(--bg)', cursor: 'pointer', fontSize: 11 }}>*123# USSD</button>
    </div>
  );
}

function AppTopBar({ name, onBell, onProfile, unread }: { name: string; onBell: () => void; onProfile: () => void; unread: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 2px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <KaneaMark size={28} />
        <div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Akwaaba,</div>
          <div style={{ fontSize: 19, fontWeight: 700, fontFamily: 'var(--display)' }}>{name}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onBell} style={{ position: 'relative', width: 42, height: 42, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink)' }}>
          <Icon d={I.bell} s={20} />
          {unread && <span style={{ position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: '50%', background: 'var(--off)', border: '2px solid var(--surface)' }} />}
        </button>
        <button onClick={onProfile} style={{ width: 42, height: 42, borderRadius: 12, border: 'none', background: 'var(--sun-soft)', color: 'var(--sun-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--display)' }}>A</button>
      </div>
    </div>
  );
}

export default function App() {
  const [stateKey, setStateKey] = useState<ServiceState>('healthy');
  const [variant, setVariant] = useState<HomeVariant>('A');
  const [tab, setTab] = useState('home');
  const [overlay, setOverlay] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [ussd, setUssd] = useState(false);
  const [ticket, setTicket] = useState<{ id: string; cat: string; status: string } | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [topped, setTopped] = useState(false);
  const [online] = useState(true);

  const effKey: ServiceState = topped ? 'healthy' : stateKey;
  const st = STATES[effKey];

  useEffect(() => { setTopped(false); }, [stateKey]);

  const go = (t: string) => { setOverlay(null); setTab(t); };
  const HomeVariantComp = { A: HomeA, B: HomeB, C: HomeC }[variant];

  let body: React.ReactNode;
  if (overlay === 'notifications') {
    body = <NotificationsScreen onBack={() => setOverlay(null)} />;
  } else if (overlay === 'profile') {
    body = <ProfileScreen onBack={() => setOverlay(null)} lang={lang} setLang={setLang} />;
  } else if (tab === 'home') {
    body = (
      <>
        <AppTopBar name="Akosua" unread onBell={() => setOverlay('notifications')} onProfile={() => setOverlay('profile')} />
        <HomeVariantComp st={st} online={online} onTopUp={() => setSheet(true)} onRefresh={() => {}} go={go} />
      </>
    );
  } else if (tab === 'usage') {
    body = <UsageScreen onBack={() => setTab('home')} />;
  } else if (tab === 'savings') {
    body = <SavingsScreen onBack={() => setTab('home')} />;
  } else if (tab === 'fault') {
    body = <FaultScreen onBack={() => setTab('home')} ticket={ticket} setTicket={setTicket} />;
  }

  return (
    <>
      <DemoBar stateKey={stateKey} setStateKey={setStateKey} variant={variant} setVariant={setVariant} showUssd={() => setUssd(true)} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', paddingTop: 30 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 18px' }}>{body}</div>
        <BottomNav tab={overlay ? '' : tab} setTab={go} />
        <TopUpSheet open={sheet} onClose={() => setSheet(false)} onComplete={() => setTopped(true)} autoTopUp={autoTopUp} setAutoTopUp={setAutoTopUp} />
      </div>
      <UssdScreen open={ussd} onClose={() => setUssd(false)} />
    </>
  );
}
