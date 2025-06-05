
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

interface SkillsGalleryProps {
  title: string;
  skills: Skill[];
  direction?: 'left' | 'right';
  speed?: number;
}

const SkillsGallery: React.FC<SkillsGalleryProps> = ({ 
  title, 
  skills, 
  direction = 'left', 
  speed = 50 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(direction);
  const animationRef = useRef<number>();
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationSpeed = speed;

    const animate = () => {
      if (!isHovered && !isDragging && scrollContainer) {
        if (scrollDirection === 'left') {
          scrollContainer.scrollLeft += animationSpeed / 60;
          
          // Reset to beginning when reaching end
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        } else {
          scrollContainer.scrollLeft -= animationSpeed / 60;
          
          // Reset to end when reaching beginning
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.pageX - scrollContainer.offsetLeft,
        scrollLeft: scrollContainer.scrollLeft
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStart.current) return;
      e.preventDefault();
      
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - dragStart.current.x) * 3;
      const newScrollLeft = dragStart.current.scrollLeft - walk;
      
      scrollContainer.scrollLeft = newScrollLeft;
      
      // Determine scroll direction based on movement
      if (walk > 0) {
        setScrollDirection('left');
      } else if (walk < 0) {
        setScrollDirection('right');
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].pageX - scrollContainer.offsetLeft,
        scrollLeft: scrollContainer.scrollLeft
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !dragStart.current) return;
      
      const x = e.touches[0].pageX - scrollContainer.offsetLeft;
      const walk = (x - dragStart.current.x) * 2;
      const newScrollLeft = dragStart.current.scrollLeft - walk;
      
      scrollContainer.scrollLeft = newScrollLeft;
      
      // Determine scroll direction based on movement
      if (walk > 0) {
        setScrollDirection('left');
      } else if (walk < 0) {
        setScrollDirection('right');
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      dragStart.current = null;
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHovered, isDragging, scrollDirection, speed]);

  // Remove duplicates and create seamless loop
  const uniqueSkills = skills.filter((skill, index, self) => 
    index === self.findIndex(s => s.name === skill.name)
  );
  const duplicatedSkills = [...uniqueSkills, ...uniqueSkills];

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {title}
      </h3>
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className={`flex gap-8 overflow-x-hidden scrollbar-hide py-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            userSelect: 'none'
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % uniqueSkills.length) * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 mb-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    // Fallback to a simple text representation if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.textContent = skill.name.charAt(0).toUpperCase();
                  }}
                />
                <div className="w-10 h-10 hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg items-center justify-center text-white font-bold text-lg"></div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center max-w-20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Gradient overlays for seamless edge effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SkillsGallery;
