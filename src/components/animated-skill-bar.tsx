
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
  const [percent, setPercent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [level, animationDelay]);

  useEffect(() => {
    if (progress > 0) {
      let start = 0;
      const end = level;
      if (start === end) return;

      const duration = 1500; // Slower animation
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setPercent(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [progress, level]);


  return (
    <div ref={ref}>
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-primary font-mono">{percent}%</p>
      </div>
      <Progress value={progress} className="h-3 bg-primary/20" />
    </div>
  );
}
