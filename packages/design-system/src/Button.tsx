import React from 'react';

type Variant = 'primary' | 'sun' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', fullWidth, style, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      style={{ width: fullWidth ? '100%' : undefined, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
