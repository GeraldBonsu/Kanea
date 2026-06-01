import React from 'react';

export const FIcon = ({ d, s = 22, w = 2, fill = 'none' }: { d: React.ReactNode; s?: number; w?: number; fill?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const FI = {
  back:        <path d="M19 12H5M11 18l-6-6 6-6" />,
  user:        <g><circle cx="12" cy="8" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></g>,
  camera:      <g><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></g>,
  scan:        <g><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M3 12h18" /></g>,
  pin:         <g><path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></g>,
  check:       <path d="M20 6 9 17l-5-5" />,
  checkCircle: <g><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></g>,
  chevR:       <path d="m9 6 6 6-6 6" />,
  plus:        <path d="M12 5v14M5 12h14" />,
  cloud:       <g><path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 16.9" /><path d="M12 12v8M9 17l3 3 3-3" /></g>,
  cloudOff:    <g><path d="M3 3l18 18" /><path d="M17.5 19a4.5 4.5 0 0 0 3.5-7.3M8.5 5.2A6 6 0 0 1 18 10a4.5 4.5 0 0 1 .9 0M6.3 9A4 4 0 0 0 6 16.9" /></g>,
  box:         <g><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></g>,
  bolt:        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  battery:     <g><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 11v2" /></g>,
  panel:       <g><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M3 10h18M9 4v12M15 4v12M12 16v4M8 20h8" /></g>,
  meter:       <g><circle cx="12" cy="12" r="9" /><path d="M12 12 16 9M12 3v2M21 12h-2" /></g>,
  nav:         <path d="M3 11l19-9-9 19-2-8-8-2z" />,
  wrench:      <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.5 2.5-2.5-2.5 2.5-2.5z" />,
  phone:       <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.4 1.6.7 2.3a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.7-1.3a2 2 0 0 1 2.1-.4c.7.3 1.5.6 2.3.7A2 2 0 0 1 22 16.9z" />,
};

export const KaneaMark = ({ size = 28 }: { size?: number }) => (
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
