
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

      <style jsx>{`
        /* Dark Mode Styles */
        .satellite-container {
          position: absolute;
          top: 20%;
          right: 15%;
          width: 100px;
          height: 100px;
        }
        
        .satellite-container-2 {
          position: absolute;
          top: 60%;
          left: 10%;
          width: 80px;
          height: 80px;
        }

        .satellite-orbit {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .satellite-orbit-2 {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
        }

        .satellite {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
        }

        .meteor {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
        }

        .meteor-1 {
          top: 10%;
          right: 20%;
          animation: meteor-fall 8s infinite;
          animation-delay: 2s;
        }

        .meteor-2 {
          top: 30%;
          right: 60%;
          animation: meteor-fall 12s infinite;
          animation-delay: 7s;
        }

        .meteor-trail {
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 100%);
          transform: rotate(45deg);
          transform-origin: 0 0;
        }

        @keyframes meteor-fall {
          0% { opacity: 0; transform: translate(0, 0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translate(-200px, 200px); }
        }

        /* Light Mode Styles */
        .bird {
          position: absolute;
          left: -20px;
          animation: fly-across linear infinite;
        }

        .bird-body {
          position: relative;
          width: 8px;
          height: 4px;
          background: #374151;
          border-radius: 50%;
        }

        .wing {
          position: absolute;
          width: 6px;
          height: 2px;
          background: #374151;
          border-radius: 50%;
          animation: flap 0.5s ease-in-out infinite alternate;
        }

        .wing-left {
          top: -1px;
          left: -3px;
          transform-origin: right center;
        }

        .wing-right {
          top: -1px;
          right: -3px;
          transform-origin: left center;
        }

        @keyframes fly-across {
          0% { left: -20px; }
          100% { left: calc(100% + 20px); }
        }

        @keyframes flap {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(45deg); }
        }

        .particle {
          position: absolute;
          background: rgba(34, 197, 94, 0.3);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
          0% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
          100% { 
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .sun {
          position: absolute;
          top: 5%;
          right: 8%;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, #fbbf24 0%, #f59e0b 70%);
          border-radius: 50%;
          animation: sun-pulse 4s ease-in-out infinite;
        }

        .sun-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow-pulse 4s ease-in-out infinite;
        }

        @keyframes sun-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default DecorativeAnimations;
