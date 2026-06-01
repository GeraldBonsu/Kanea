import React from 'react';
import type { Tone } from '../types';

export default function Chip({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`chip ${tone}`}><span className="dot" />{children}</span>;
}
