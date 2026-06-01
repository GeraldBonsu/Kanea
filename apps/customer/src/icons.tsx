import React from 'react';

export const Icon = ({ d, s = 22, w = 2, fill = 'none' }: { d: React.ReactNode; s?: number; w?: number; fill?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const I = {
  bolt:    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  home:    <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
  chart:   <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
  leaf:    <g><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></g>,
  help:    <g><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" /><path d="M12 17h.01" /></g>,
  battery: <g><rect x="2" y="7" width="18" height="10" rx="2" /><path d="M22 11v2" /></g>,
  bell:    <g><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></g>,
  check:   <path d="M20 6L9 17l-5-5" />,
  chevR:   <path d="M9 6l6 6-6 6" />,
  back:    <path d="M19 12H5M11 18l-6-6 6-6" />,
  camera:  <g><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></g>,
  phone:   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.37 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.33 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />,
  refresh: <g><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></g>,
  sun:     <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>,
  globe:   <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></g>,
  shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  clock:   <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
};

export const KaneaMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="9" fill="var(--sun)" />
    <g stroke="var(--sun)" strokeWidth="2.6" strokeLinecap="round">
      <line x1="20" y1="3.5" x2="20" y2="9" />
      <line x1="20" y1="31" x2="20" y2="36.5" />
      <line x1="3.5" y1="20" x2="9" y2="20" />
      <line x1="31" y1="20" x2="36.5" y2="20" />
      <line x1="8" y1="8" x2="11.8" y2="11.8" />
      <line x1="28.2" y1="28.2" x2="32" y2="32" />
      <line x1="32" y1="8" x2="28.2" y2="11.8" />
      <line x1="11.8" y1="28.2" x2="8" y2="32" />
    </g>
  </svg>
);
