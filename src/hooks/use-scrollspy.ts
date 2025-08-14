
'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(
  elements: (HTMLElement | null)[],
  options?: IntersectionObserverInit
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (elements.some(el => !el)) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [elements, options]);

  return activeId;
}
