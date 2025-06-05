
import React, { useState, useRef } from 'react';

interface SparkProps {
  x: number;
  y: number;
  id: number;
}

const Spark: React.FC<SparkProps> = ({ x, y }) => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = 20 + Math.random() * 30;
  const duration = 0.6 + Math.random() * 0.4;
  
  const endX = x + Math.cos(angle) * distance;
  const endY = y + Math.sin(angle) * distance;

  return (
    <div
      className="absolute w-1 h-1 bg-yellow-400 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        animation: `sparkFly ${duration}s ease-out forwards`,
        '--end-x': `${endX - x}px`,
        '--end-y': `${endY - y}px`,
      } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
    />
  );
};

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  sparkCount?: number;
  disabled?: boolean;
}

const ClickSpark: React.FC<ClickSparkProps> = ({ 
  children, 
  className = '', 
  onClick,
  sparkCount = 6,
  disabled = false 
}) => {
  const [sparks, setSparks] = useState<SparkProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks: SparkProps[] = [];
    for (let i = 0; i < sparkCount; i++) {
      newSparks.push({
        x,
        y,
        id: sparkIdRef.current++,
      });
    }

    setSparks(prev => [...prev, ...newSparks]);

    // Remove sparks after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => !newSparks.some(newSpark => newSpark.id === spark.id)));
    }, 1000);

    // Call the original onClick handler
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes sparkFly {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative ${className}`}
        onClick={handleClick}
      >
        {children}
        {sparks.map((spark) => (
          <Spark key={spark.id} x={spark.x} y={spark.y} id={spark.id} />
        ))}
      </div>
    </>
  );
};

export default ClickSpark;
