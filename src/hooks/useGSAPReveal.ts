import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export const useGSAPReveal = (options: RevealOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('.gsap-reveal');
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        { y: options.y ?? 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? 'top 80%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};