
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
    // Check initial theme more reliably
    const checkTheme = () => {
      // First check if dark class is explicitly set
      const hasDarkClass = document.documentElement.classList.contains('dark');
      
      // If no explicit dark class, check localStorage and system preference
      if (!hasDarkClass) {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme === 'true') {
          setIsDarkMode(true);
          return;
        } else if (storedTheme === 'false') {
          setIsDarkMode(false);
          return;
        }
        
        // Fall back to system preference only if no stored preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      } else {
        setIsDarkMode(true);
      }
    };

    // Set initial theme immediately
    checkTheme();

    // Listen for theme changes on document element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for localStorage changes (for when theme is changed in navbar)
    const handleStorageChange = () => {
      checkTheme();
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for system theme changes as backup
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      // Only use system preference if no explicit theme is set
      const storedTheme = localStorage.getItem('darkMode');
      if (!storedTheme) {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
      mediaQuery.removeEventListener('change', handleMediaChange);
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

  // Generate enhanced clouds for light mode
  const generateClouds = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 30 + 10, // Upper portion of screen
      animationDelay: Math.random() * 25,
      animationDuration: Math.random() * 50 + 80, // 80-130 seconds for slower movement
      size: Math.random() * 100 + 60, // 60-160px
      opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity
    }));
  };

  // Generate bird flocks with natural grouping
  const generateBirdFlocks = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 25 + 15, // Upper portion
      animationDelay: Math.random() * 20 + i * 8, // Stagger flocks more
      animationDuration: Math.random() * 15 + 30, // 30-45 seconds
      size: Math.random() * 0.3 + 0.9, // 0.9-1.2 scale
      flockOffset: Math.random() * 10 + 5, // Vertical spacing between birds
    }));
  };

  const stars = generateStars(fullBackground ? 100 : 40);
  const clouds = generateClouds(fullBackground ? 8 : 4);
  const birdFlocks = generateBirdFlocks(fullBackground ? 4 : 2);

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
        // Light Mode - Enhanced Daytime Sky Theme
        <>
          {/* Enhanced Floating Clouds */}
          {clouds.map((cloud) => (
            <div
              key={`cloud-${cloud.id}`}
              className="cloud-enhanced"
              style={{
                top: `${cloud.top}%`,
                animationDelay: `${cloud.animationDelay}s`,
                animationDuration: `${cloud.animationDuration}s`,
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.5}px`,
                opacity: cloud.opacity,
              }}
            />
          ))}

          {/* Enhanced Sun with natural glow */}
          <div className="sun-container-enhanced">
            <div className="sun-rays-outer" />
            <div className="sun-rays-inner" />
            <div className="sun-core-enhanced" />
          </div>

          {/* Natural Bird Flocks */}
          {birdFlocks.map((flock) => (
            <div
              key={`flock-${flock.id}`}
              className="bird-flock"
              style={{
                top: `${flock.top}%`,
                animationDelay: `${flock.animationDelay}s`,
                animationDuration: `${flock.animationDuration}s`,
                transform: `scale(${flock.size})`,
              }}
            >
              {/* Lead bird */}
              <div className="bird-natural bird-lead">
                <div className="wing-natural wing-left" />
                <div className="wing-natural wing-right" />
                <div className="bird-body" />
              </div>
              
              {/* Following birds in V formation */}
              <div 
                className="bird-natural bird-follow-1"
                style={{ top: `${flock.flockOffset}px` }}
              >
                <div className="wing-natural wing-left" />
                <div className="wing-natural wing-right" />
                <div className="bird-body" />
              </div>
              
              <div 
                className="bird-natural bird-follow-2"
                style={{ top: `-${flock.flockOffset}px` }}
              >
                <div className="wing-natural wing-left" />
                <div className="wing-natural wing-right" />
                <div className="bird-body" />
              </div>
              
              <div 
                className="bird-natural bird-follow-3"
                style={{ top: `${flock.flockOffset * 1.5}px` }}
              >
                <div className="wing-natural wing-left" />
                <div className="wing-natural wing-right" />
                <div className="bird-body" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DecorativeAnimations;
