import React from 'react';

export const OIcon = ({ d, s = 18, w = 2 }: { d: React.ReactNode; s?: number; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const OI = {
  alert:    <g><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></g>,
  wallet:   <g><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7V5a2 2 0 0 1 2-2h12"/><circle cx="16" cy="13" r="1.4" fill="currentColor" stroke="none"/></g>,
  map:      <g><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></g>,
  ticket:   <g><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-6z"/></g>,
  chart:    <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></g>,
  users:    <g><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></g>,
  search:   <g><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></g>,
  bolt:     <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>,
  battery:  <g><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/></g>,
  meter:    <g><circle cx="12" cy="12" r="9"/><path d="M12 12 16 9"/><path d="M12 3v2M21 12h-2"/></g>,
  chevR:    <path d="m9 6 6 6-6 6"/>,
  back:     <path d="M19 12H5M11 18l-6-6 6-6"/>,
  shield:   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  pause:    <g><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></g>,
  power:    <g><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/><path d="M12 2v10"/></g>,
  download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></g>,
  grid:     <g><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></g>,
  clock:    <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
  user:     <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
};

export const KaneaMark = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="9" fill="var(--sun)" />
    <g stroke="var(--sun)" strokeWidth="2.6" strokeLinecap="round">
      <line x1="20" y1="3.5" x2="20" y2="9" /><line x1="20" y1="31" x2="20" y2="36.5" />
      <line x1="3.5" y1="20" x2="9" y2="20" /><line x1="31" y1="20" x2="36.5" y2="20" />
      <line x1="8" y1="8" x2="11.8" y2="11.8" /><line x1="28.2" y1="28.2" x2="32" y2="32" />
      <line x1="32" y1="8" x2="28.2" y2="11.8" /><line x1="11.8" y1="28.2" x2="8" y2="32" />
    </g>
  </svg>
);
