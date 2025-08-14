
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';

const CustomCursor = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="hsl(var(--primary))"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("transform -rotate-12", className)}
    style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}
  >
    <path d="M4.5 4.5L20.5 10.5L13.5 13.5L10.5 20.5L4.5 4.5Z" />
  </svg>
);


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
          'pointer-events-none fixed z-[9999] transition-transform duration-200 ease-in-out',
           isPointer ? 'scale-150 -translate-x-1 -translate-y-1' : ''
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <CustomCursor className={cn(isPointer ? 'rotate-0' : '')}/>
      </div>
    </>
  );
}
