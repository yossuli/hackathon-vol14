import { useEffect, useRef } from 'react';

export const usePreventDefault = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const handler = (e: Event) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    current.addEventListener('touchstart', handler, { passive: false });
    current.addEventListener('touchmove', handler, { passive: false });

    return () => {
      current.removeEventListener('touchstart', handler);
      current.removeEventListener('touchmove', handler);
    };
  }, []);

  return ref;
};
