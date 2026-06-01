import React, { useState } from 'react';
import { OIcon, OI, KaneaMark } from './icons';
import ExceptionsView from './views/ExceptionsView';
import CollectionsView from './views/CollectionsView';
import FleetView from './views/FleetView';
import TicketsView from './views/TicketsView';
import AnalyticsView from './views/AnalyticsView';
import UsersView from './views/UsersView';
import Site360 from './components/Site360';

type View = 'exceptions' | 'collections' | 'fleet' | 'tickets' | 'analytics' | 'users';

const nav: { id: View; label: string; ic: React.ReactNode; badge?: number }[] = [
  { id: 'exceptions',  label: 'Exceptions',  ic: OI.alert,  badge: 6 },
  { id: 'collections', label: 'Collections', ic: OI.wallet, badge: 19 },
  { id: 'fleet',       label: 'Fleet map',   ic: OI.map },
  { id: 'tickets',     label: 'Tickets',     ic: OI.ticket, badge: 47 },
  { id: 'analytics',   label: 'Analytics',   ic: OI.chart },
  { id: 'users',       label: 'Users & roles',ic: OI.users },
];

const FLEET_SUMMARY = { online: 96.2, lowBal: 84, atRisk: 31 };

export default function App() {
  const [view, setView] = useState<View>('exceptions');
  const [site, setSite] = useState<Record<string, string> | null>(null);

  const views: Record<View, React.ReactNode> = {
    exceptions:  <ExceptionsView  openSite={setSite} />,
    collections: <CollectionsView openSite={setSite} />,
    fleet:       <FleetView       openSite={setSite} />,
    tickets:     <TicketsView     openSite={setSite} />,
    analytics:   <AnalyticsView />,
    users:       <UsersView />,
  };

  return (
    <div className="ops-root">
      {/* sidebar */}
      <aside className="ops-side">
        <div className="ops-brand">
          <KaneaMark size={26} />
          <span>Kane<b>a</b> <span>Ops</span></span>
        </div>
        <nav>
          {nav.map(n => (
            <button key={n.id} className={`ops-navitem${view === n.id ? ' on' : ''}`} onClick={() => setView(n.id)}>
              <OIcon d={n.ic} s={19} />
              <span style={{ flex: 1, textAlign: 'left' }}>{n.label}</span>
              {n.badge && <span className={`nav-badge${n.id === 'exceptions' || n.id === 'collections' ? ' hot' : ''}`}>{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="ops-user">
          <span className="avatar">AS</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Akua Sarpong</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Ops manager</div>
          </div>
        </div>
      </aside>

      {/* main content */}
      <div className="ops-main">
        <div className="ops-topbar">
          <div className="ops-search">
            <OIcon d={OI.search} s={16} />
            <input placeholder="Search sites, customers, tickets…" />
          </div>
          <div className="ops-summary">
            <span><b className="num">{FLEET_SUMMARY.online}%</b> online</span>
            <span className="div" />
            <span><b className="num" style={{ color: 'var(--low)' }}>{FLEET_SUMMARY.lowBal}</b> low balance</span>
            <span className="div" />
            <span><b className="num" style={{ color: 'var(--off)' }}>{FLEET_SUMMARY.atRisk}</b> at risk</span>
          </div>
        </div>
        <div className="ops-content">{views[view]}</div>
      </div>

      <Site360 site={site} onClose={() => setSite(null)} />
    </div>
  );
}
