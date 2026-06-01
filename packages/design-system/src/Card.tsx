import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, style, ...rest }: CardProps) {
  return (
    <div className="card" style={style} {...rest}>
      {children}
    </div>
  );
}
