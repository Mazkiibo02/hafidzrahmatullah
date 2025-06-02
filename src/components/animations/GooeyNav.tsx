
import React from 'react';
import { motion } from 'framer-motion';

interface GooeyNavProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const GooeyNav: React.FC<GooeyNavProps> = ({ children, className = "", isActive = false }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
      animate={isActive ? "active" : "initial"}
    >
      {/* Gooey blob background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
        variants={{
          initial: { 
            scale: 0,
            borderRadius: "12px",
            opacity: 0,
          },
          hover: { 
            scale: 1,
            borderRadius: ["12px", "25px", "12px"],
            opacity: 0.1,
            transition: {
              duration: 0.4,
              ease: "easeOut",
              borderRadius: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }
          },
          active: {
            scale: 1,
            borderRadius: ["12px", "20px", "12px"],
            opacity: 0.2,
            transition: {
              duration: 0.3,
              borderRadius: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }
          }
        }}
        style={{
          filter: "blur(2px)",
        }}
      />
      
      {/* Gooey drip effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        variants={{
          initial: { 
            scale: 0,
            y: 0,
            x: "-50%",
          },
          hover: { 
            scale: 1,
            y: [0, 8, 0],
            transition: {
              scale: { duration: 0.2 },
              y: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }
          },
          active: {
            scale: 1,
            y: [0, 6, 0],
            transition: {
              y: { 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }
          }
        }}
        style={{
          filter: "blur(1px)",
        }}
      />
      
      {/* Content */}
      <motion.div
        className="relative z-10"
        variants={{
          initial: { scale: 1 },
          hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
          },
          active: { scale: 1.02 }
        }}
      >
        {children}
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-400/30 rounded-lg"
        variants={{
          initial: { scale: 1, opacity: 0 },
          hover: { 
            scale: [1, 1.2],
            opacity: [0, 0.6, 0],
            transition: {
              duration: 0.6,
              ease: "easeOut"
            }
          }
        }}
      />
    </motion.div>
  );
};

export default GooeyNav;
