"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
  borderGlow?: 'purple' | 'cyan' | 'pink' | 'none';
}

export default function Card({
  children,
  className = '',
  glassEffect = false,
  hoverEffect = false,
  borderGlow = 'none',
}: CardProps) {
  const baseClasses = 'rounded-xl p-5 bg-card';
  
  const glassClasses = glassEffect ? 'glass-effect' : '';
  
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:translate-y-[-5px]' 
    : '';
  
  const glowClasses = {
    purple: 'neon-purple',
    cyan: 'neon-cyan',
    pink: 'neon-pink',
    none: '',
  };
  
  return (
    <div 
      className={`
        ${baseClasses}
        ${glassClasses}
        ${hoverClasses}
        ${borderGlow !== 'none' ? glowClasses[borderGlow] : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
} 