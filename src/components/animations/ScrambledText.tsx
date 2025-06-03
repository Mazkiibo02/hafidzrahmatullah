
import React, { useState, useEffect, useRef } from 'react';

interface ScrambledTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  text,
  className = "",
  scrambleSpeed = 50,
  revealSpeed = 100,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  const scrambleText = (targetText: string) => {
    const textLength = targetText.length;
    let currentIndex = 0;
    
    const scrambleInterval = setInterval(() => {
      let scrambled = "";
      
      // Add revealed characters
      for (let i = 0; i < currentIndex; i++) {
        scrambled += targetText[i];
      }
      
      // Add scrambled characters for the rest
      for (let i = currentIndex; i < textLength; i++) {
        if (targetText[i] === " ") {
          scrambled += " ";
        } else {
          scrambled += characters[Math.floor(Math.random() * characters.length)];
        }
      }
      
      setDisplayText(scrambled);
      
      // Reveal next character
      if (Math.random() > 0.7) {
        currentIndex++;
      }
      
      if (currentIndex >= textLength) {
        clearInterval(scrambleInterval);
        setDisplayText(targetText);
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          setTimeout(() => {
            scrambleText(text);
          }, revealSpeed);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasAnimated, revealSpeed]);

  return (
    <p
      ref={elementRef}
      className={`font-mono ${className}`}
      style={{ minHeight: "1.5em" }}
    >
      {isVisible ? displayText : text}
    </p>
  );
};

export default ScrambledText;
