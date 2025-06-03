
import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  imageUrl?: string;
  name: string;
  role: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  imageUrl, 
  name, 
  role, 
  className = "" 
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <motion.div
        className="relative group perspective-1000"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 3D Card Container */}
        <motion.div
          className="relative w-80 h-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform-gpu transition-all duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
          }}
          whileHover={{
            rotateY: 10,
            rotateX: 5,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Card Content */}
          <div className="relative z-10 h-full p-8 flex flex-col items-center justify-between bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-600 p-1 bg-gradient-to-r from-blue-400 to-purple-600">
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"}
                  alt={name}
                  className="w-full h-full object-cover rounded-full bg-gray-200 dark:bg-gray-700"
                />
              </div>
              
              {/* Floating Status Indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-2">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {name}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {role}
              </motion.p>
            </div>

            {/* Contact Button */}
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/contact"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Mail size={18} />
                <span>Contact</span>
              </Link>
            </motion.div>
          </div>

          {/* 3D Effect Layers */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-600/10 transform translate-z-[-10px] group-hover:translate-z-[-20px] transition-transform duration-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
