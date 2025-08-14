
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

interface AnimatedSkillBarProps {
  name: string;
  level: number;
  animationDelay?: number;
}

export function AnimatedSkillBar({ name, level, animationDelay = 0 }: AnimatedSkillBarProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animationDuration = 1500; // ms

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setProgress(level);
          }, animationDelay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [level, animationDelay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-primary font-mono">{progress}%</p>
      </div>
      <Progress 
        value={progress} 
        className="h-3 bg-primary/20" 
        style={{ transitionDuration: `${animationDuration}ms`}} 
      />
    </div>
  );
}
