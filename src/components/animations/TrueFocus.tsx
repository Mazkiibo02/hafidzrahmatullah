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
      y: 40,
      rotateX: -90,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

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