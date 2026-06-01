import React from 'react';

export default function KaneaIcon({ size = 32 }: { size?: number }) {
  return (
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
}
