import React, { useEffect, useState } from 'react';

interface DecorativeAnimationsProps {
  fullBackground?: boolean;
  className?: string;
}

const DecorativeAnimations: React.FC<DecorativeAnimationsProps> = ({
  fullBackground = false,
  className = '',
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      if (!hasDarkClass) {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme === 'true') { setIsDarkMode(true); return; }
        if (storedTheme === 'false') { setIsDarkMode(false); return; }
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDarkMode(true);
      }
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleStorageChange = () => checkTheme();
    window.addEventListener('storage', handleStorageChange);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      if (!localStorage.getItem('darkMode')) setIsDarkMode(mediaQuery.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const stars = Array.from({ length: fullBackground ? 50 : 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 4,
    size: Math.random() * 1.5 + 0.5,
    brightness: Math.random() * 0.7 + 0.3,
  }));

  // FIX: overflow-hidden pada semua container agar meteor tidak sebabkan scrollbar
  const containerClass = fullBackground
    ? 'fixed inset-0 pointer-events-none z-0 overflow-hidden'
    : 'absolute inset-0 pointer-events-none overflow-hidden';

  return (
    <div className={`${containerClass} ${className}`}>
      {isDarkMode ? (
        <>
          {/* Starfield — dikurangi dari 100 ke 50 */}
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
                  boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.brightness * 0.5})`,
                }}
              />
            </div>
          ))}

          {/* Meteor — hanya 2, dihapus meteor-3 agar lebih ringan */}
          <div className="meteor meteor-1">
            <div className="meteor-head" />
            <div className="meteor-tail" />
          </div>
          <div className="meteor meteor-2">
            <div className="meteor-head" />
            <div className="meteor-tail" />
          </div>

          {/* Satellite */}
          <div className="satellite-orbit-container">
            <div className="satellite-orbit">
              <div className="satellite-dot" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Light Mode — grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-lines)" />
          </svg>
        </>
      )}
    </div>
  );
};

export default DecorativeAnimations;