import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  text: string;
  className?: string;
  enableHover?: boolean;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  text,
  className = '',
  enableHover = false,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)');
    setIsMobile(mq.matches);
    const handleMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handleMQ);
    return () => mq.removeEventListener('change', handleMQ);
  }, []);

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        {text}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '800px' }}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((word, wi) => (
          <motion.span
            key={wi}
            className={`inline-flex ${
              enableHover
                ? 'hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300'
                : ''
            }`}
            variants={wordVariants}
          >
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                variants={charVariants}
                style={{ transformOrigin: 'center bottom' }}
                whileHover={
                  enableHover
                    ? {
                        y: -4,
                        color: 'rgb(99 102 241)',
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }
                    : {}
                }
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </span>
    </motion.div>
  );
};

export default TrueFocus;