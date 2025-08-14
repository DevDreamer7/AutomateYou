
'use client';

import { useEffect, RefObject } from 'react';

export function useScrollBlur(ref: RefObject<HTMLElement>, timeout = 100) {
  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      target.classList.add('scroll-blur');
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        target.classList.remove('scroll-blur');
      }, timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [ref, timeout]);
}

