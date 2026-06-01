import React from 'react';
import type { Tone } from './types';

interface ChipProps {
  tone: Tone;
  children: React.ReactNode;
}

export default function Chip({ tone, children }: ChipProps) {
  return (
    <span className={`chip ${tone}`}>
      <span className="dot" />
      {children}
    </span>
  );
}
