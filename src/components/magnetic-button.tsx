
'use client';

import React, { useRef, useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MagneticButton({ children, className, variant, ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rippleStyle, setRippleStyle] = useState({});

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRippleStyle({
      top: y,
      left: x,
      width: button.offsetWidth * 2.5,
      height: button.offsetWidth * 2.5,
    });
  };

  return (
    <Button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      size="lg"
      className={cn(
        'relative overflow-hidden group',
        className
      )}
      variant={variant}
      {...props}
    >
      <span
        className="absolute bg-white/20 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
        style={rippleStyle}
      />
      <span className="relative z-10 inline-flex items-center justify-center">
        {children}
      </span>
    </Button>
  );
}

    