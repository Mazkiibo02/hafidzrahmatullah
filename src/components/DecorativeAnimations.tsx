
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

  // Generate realistic starfield
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
      size: Math.random() * 1.5 + 0.5,
      brightness: Math.random() * 0.7 + 0.3,
    }));
  };

  // Generate clouds for light mode
  const generateClouds = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 40 + 10, // Upper portion of screen
      animationDelay: Math.random() * 20,
      animationDuration: Math.random() * 40 + 60, // 60-100 seconds
      size: Math.random() * 80 + 40, // 40-120px
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
    }));
  };

  // Generate flying birds
  const generateBirds = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 30 + 15, // Upper portion
      animationDelay: Math.random() * 15,
      animationDuration: Math.random() * 20 + 25, // 25-45 seconds
      size: Math.random() * 0.5 + 0.8, // 0.8-1.3 scale
    }));
  };

  const stars = generateStars(fullBackground ? 100 : 40);
  const clouds = generateClouds(fullBackground ? 6 : 3);
  const birds = generateBirds(fullBackground ? 5 : 3);

  const containerClass = fullBackground 
    ? "fixed inset-0 pointer-events-none z-0" 
    : "absolute inset-0 pointer-events-none overflow-hidden";

  return (
    <div className={`${containerClass} ${className}`}>
      {isDarkMode ? (
        // Dark Mode - Space Theme
        <>
          {/* Realistic Starfield */}
          {stars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="absolute star-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.animationDelay}s`,
                opacity: star.brightness,
              }}
            >
              <div
                className="bg-white rounded-full"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
                }}
              />
            </div>
          ))}

          {/* Meteors with glowing tails */}
          <div className="meteor meteor-1">
            <div className="meteor-head" />
            <div className="meteor-tail" />
          </div>
          <div className="meteor meteor-2">
            <div className="meteor-head" />
            <div className="meteor-tail" />
          </div>
          <div className="meteor meteor-3">
            <div className="meteor-head" />
            <div className="meteor-tail" />
          </div>

          {/* Subtle orbiting satellite */}
          <div className="satellite-orbit-container">
            <div className="satellite-orbit">
              <div className="satellite-dot" />
            </div>
          </div>
        </>
      ) : (
        // Light Mode - Sky Theme
        <>
          {/* Floating Clouds */}
          {clouds.map((cloud) => (
            <div
              key={`cloud-${cloud.id}`}
              className="cloud"
              style={{
                top: `${cloud.top}%`,
                animationDelay: `${cloud.animationDelay}s`,
                animationDuration: `${cloud.animationDuration}s`,
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.6}px`,
                opacity: cloud.opacity,
              }}
            />
          ))}

          {/* Gentle Sun */}
          <div className="sun-container">
            <div className="sun-rays" />
            <div className="sun-core" />
          </div>

          {/* Flying Birds */}
          {birds.map((bird) => (
            <div
              key={`bird-${bird.id}`}
              className="bird-group"
              style={{
                top: `${bird.top}%`,
                animationDelay: `${bird.animationDelay}s`,
                animationDuration: `${bird.animationDuration}s`,
                transform: `scale(${bird.size})`,
              }}
            >
              <div className="bird bird-1">
                <div className="wing wing-left" />
                <div className="wing wing-right" />
              </div>
              <div className="bird bird-2">
                <div className="wing wing-left" />
                <div className="wing wing-right" />
              </div>
              <div className="bird bird-3">
                <div className="wing wing-left" />
                <div className="wing wing-right" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DecorativeAnimations;
