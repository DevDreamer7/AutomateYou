
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        const isButtonOrAnchor = target.tagName === 'BUTTON' || target.tagName === 'A';
        const hasPointerClass = target.classList.contains('cursor-pointer');
        
        setIsPointer(
          computedStyle.cursor === 'pointer' || isButtonOrAnchor || hasPointerClass
        );
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${position.x}px ${position.y}px, hsla(var(--primary) / 0.15), transparent 80%)`,
        }}
      />
      
      <div
        className={cn(
          'pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 ease-in-out',
          isPointer ? 'h-8 w-8 bg-primary/20' : 'h-3 w-3 bg-primary'
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
