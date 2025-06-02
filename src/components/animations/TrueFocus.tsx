
import React from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  text: string;
  className?: string;
  enableHover?: boolean;
}

const TrueFocus: React.FC<TrueFocusProps> = ({ text, className = "", enableHover = false }) => {
  const words = text.split(' ');

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
      className={`relative inline-block group ${className}`}
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
      
      {/* Text with individual word animations */}
      <div className="relative z-10 perspective-1000">
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span
              variants={child}
              className={`inline-block transform-gpu transition-all duration-300 ${
                enableHover 
                  ? 'hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400 group-hover:blur-sm hover:!blur-none hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                  : ''
              }`}
              style={{
                transformOrigin: "center bottom",
              }}
              whileHover={enableHover ? {
                scale: 1.1,
                textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                transition: { duration: 0.2 }
              } : {}}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && <span className="inline-block w-2"></span>}
          </React.Fragment>
        ))}
      </div>
      
      {/* Animated target/aim effect - only visible on hover when enableHover is true */}
      {enableHover && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
        >
          {/* Crosshair lines */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500 transform -translate-y-1/2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 h-full bg-blue-500 transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          
          {/* Corner brackets */}
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          />
        </motion.div>
      )}
      
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
