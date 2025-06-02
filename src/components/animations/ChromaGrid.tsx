
import React from 'react';
import { motion } from 'framer-motion';

interface ChromaGridProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({ children, index, className = "" }) => {
  const colors = [
    'from-red-500 to-pink-500',
    'from-blue-500 to-cyan-500', 
    'from-green-500 to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-orange-500 to-yellow-500',
    'from-indigo-500 to-blue-500',
  ];

  const gradientColor = colors[index % colors.length];

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated border gradient */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColor} rounded-xl opacity-0 group-hover:opacity-100 blur-sm`}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Chroma effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(45deg, 
            rgba(255,0,0,0.1) 0%, 
            rgba(0,255,0,0.1) 33%, 
            rgba(0,0,255,0.1) 66%, 
            rgba(255,0,255,0.1) 100%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      {/* Prismatic light effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      </div>
      
      {/* Content container */}
      <motion.div
        className="relative z-10 h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl"
        whileHover={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      
      {/* Corner sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            top: i < 2 ? "10px" : "auto",
            bottom: i >= 2 ? "10px" : "auto",
            left: i % 2 === 0 ? "10px" : "auto",
            right: i % 2 === 1 ? "10px" : "auto",
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5 + index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default ChromaGrid;
