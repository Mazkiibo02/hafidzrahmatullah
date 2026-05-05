import { useRef, useEffect } from 'react';
import { loadGsap } from '@/lib/loadGsap';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAngle?: number;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  tiltAngle = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useRef<any>(null);
  const rotateY = useRef<any>(null);
  const scale   = useRef<any>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    let canceled = false;

    loadGsap().then(({ gsap }) => {
      if (canceled || !cardRef.current) return;

      gsap.set(cardRef.current, { transformPerspective: 1000 });

      rotateX.current = gsap.quickTo(cardRef.current, 'rotateX', {
        duration: 0.4,
        ease: 'power3.out',
      });
      rotateY.current = gsap.quickTo(cardRef.current, 'rotateY', {
        duration: 0.4,
        ease: 'power3.out',
      });
      scale.current = gsap.quickTo(cardRef.current, 'scale', {
        duration: 0.4,
        ease: 'power3.out',
      });
    });

    return () => {
      canceled = true;
      rotateX.current = null;
      rotateY.current = null;
      scale.current   = null;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect    = cardRef.current.getBoundingClientRect();
    const percentX = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const percentY = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);

    rotateY.current?.(percentX  * tiltAngle);
    rotateX.current?.(-percentY * tiltAngle);
    scale.current?.(1.04);
  };

  const handleMouseLeave = () => {
    rotateX.current?.(0);
    rotateY.current?.(0);
    scale.current?.(1);
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default TiltedCard;