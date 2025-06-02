
import React from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  text: string;
  className?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({ text, className = "" }) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Text with individual letter animations */}
      <div className="relative z-10 perspective-1000">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block transform-gpu"
            whileHover={{
              scale: 1.2,
              color: "#3b82f6",
              textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
              transition: { duration: 0.2 }
            }}
            style={{
              transformOrigin: "center bottom",
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
      
      {/* Underline animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default TrueFocus;
