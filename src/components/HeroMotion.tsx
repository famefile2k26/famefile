'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Pausa as animações do hero quando ele sai da tela (bateria/CPU no mobile). */
export function HeroMotion({ children, labelledBy }: { children: ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry && entry.isIntersecting ? 'false' : 'true';
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="hero" aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
