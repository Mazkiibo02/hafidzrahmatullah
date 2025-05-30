
import React, { useEffect, useState } from 'react';

interface DecorativeAnimationsProps {
  fullBackground?: boolean;
  className?: string;
}

const DecorativeAnimations: React.FC<DecorativeAnimationsProps> = ({ 
  fullBackground = false, 
  className = "" 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') ||
                    window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  // Generate random positions for stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      size: Math.random() * 2 + 1,
    }));
  };

  // Generate random positions for birds
  const generateBirds = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 60 + 10, // Keep birds in upper portion
      animationDelay: Math.random() * 10,
      animationDuration: Math.random() * 15 + 20, // 20-35 seconds
    }));
  };

  // Generate floating particles for light mode
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 10 + 8, // 8-18 seconds
      size: Math.random() * 4 + 2,
    }));
  };

  const stars = generateStars(fullBackground ? 50 : 20);
  const birds = generateBirds(fullBackground ? 4 : 2);
  const particles = generateParticles(fullBackground ? 15 : 8);

  const containerClass = fullBackground 
    ? "fixed inset-0 pointer-events-none z-0" 
    : "absolute inset-0 pointer-events-none overflow-hidden";

  return (
    <div className={`${containerClass} ${className}`}>
      {isDarkMode ? (
        // Dark Mode Animations
        <>
          {/* Twinkling Stars */}
          {stars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="absolute animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: '2s',
              }}
            >
              <div
                className="bg-white rounded-full opacity-60"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            </div>
          ))}

          {/* Satellites */}
          <div className="satellite-container">
            <div className="satellite-orbit animate-spin" style={{ animationDuration: '30s' }}>
              <div className="satellite w-2 h-2 bg-blue-300 rounded-full opacity-70" />
            </div>
          </div>
          <div className="satellite-container-2">
            <div className="satellite-orbit-2 animate-spin" style={{ animationDuration: '45s' }}>
              <div className="satellite w-1.5 h-1.5 bg-purple-300 rounded-full opacity-60" />
            </div>
          </div>

          {/* Meteors */}
          <div className="meteor meteor-1">
            <div className="meteor-trail" />
          </div>
          <div className="meteor meteor-2">
            <div className="meteor-trail" />
          </div>
        </>
      ) : (
        // Light Mode Animations
        <>
          {/* Flying Birds */}
          {birds.map((bird) => (
            <div
              key={`bird-${bird.id}`}
              className="bird"
              style={{
                top: `${bird.top}%`,
                animationDelay: `${bird.animationDelay}s`,
                animationDuration: `${bird.animationDuration}s`,
              }}
            >
              <div className="bird-body">
                <div className="wing wing-left" />
                <div className="wing wing-right" />
              </div>
            </div>
          ))}

          {/* Floating Particles */}
          {particles.map((particle) => (
            <div
              key={`particle-${particle.id}`}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}

          {/* Sun */}
          <div className="sun">
            <div className="sun-glow" />
          </div>
        </>
      )}
    </div>
  );
};

export default DecorativeAnimations;
