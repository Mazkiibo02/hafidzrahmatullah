import { useEffect } from 'react';

export const useLenis = () => {
  useEffect(() => {
    // Lenis smooth scroll is a desktop enhancement only.
    // On touch/mobile devices, native momentum scroll is faster and uses no extra JS.
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Dynamic import to avoid blocking initial render
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);

      // store for cleanup
      (window as any).__lenisCleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => {
      (window as any).__lenisCleanup?.();
    };
  }, []);
};