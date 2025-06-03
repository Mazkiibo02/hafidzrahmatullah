
import React from 'react';
import { motion } from 'framer-motion';

interface GlassIconProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const GlassIcon: React.FC<GlassIconProps> = ({ children, href, className = "" }) => {
  const Component = href ? motion.a : motion.div;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...props}
      className={`relative group cursor-pointer ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass background */}
      <motion.div
        className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-4 flex items-center justify-center">
        {children}
      </div>
    </Component>
  );
};

export default GlassIcon;
