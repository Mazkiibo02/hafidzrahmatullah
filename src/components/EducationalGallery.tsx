
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import TrueFocus from './animations/TrueFocus';
import { useGallery } from '../hooks/useGallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationalGallery = () => {
  const { data: galleryItems, isLoading } = useGallery();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImgIndices, setActiveImgIndices] = useState<Record<string, number>>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Setup scroll-based image carousel for each card
  useLayoutEffect(() => {
    if (!galleryItems || galleryItems.length === 0) return;

    const ctx = gsap.context(() => {
      galleryItems.forEach((item, cardIdx) => {
        if (!item.images || item.images.length <= 1) return;

        const cardRef = cardRefs.current[cardIdx];
        if (!cardRef) return;

        const images = item.images;
        const imgContainers = Array.from(cardRef.querySelectorAll<HTMLElement>('[data-img-index]'));
        
        // Set initial states
        imgContainers.forEach((container, idx) => {
          gsap.set(container, {
            zIndex: idx === 0 ? 10 : 0,
            opacity: idx === 0 ? 1 : 0,
            scale: idx === 0 ? 1 : 0.97
          });
        });

        let lastIdx = 0;

        // Scroll-triggered image progression
        ScrollTrigger.create({
          trigger: cardRef,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIdx = Math.min(Math.floor(progress * images.length), images.length - 1);
            
            if (newIdx !== lastIdx) {
              const prevImg = imgContainers[lastIdx];
              const currImg = imgContainers[newIdx];
              
              if (prevImg && currImg) {
                // Animate previous out
                gsap.to(prevImg, {
                  opacity: 0,
                  scale: 0.97,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  onComplete: () => gsap.set(prevImg, { zIndex: 0 })
                });
                
                // Animate current in
                gsap.fromTo(currImg,
                  { opacity: 0, scale: 1.04 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onStart: () => gsap.set(currImg, { zIndex: 10 })
                  }
                );
                
                setActiveImgIndices(prev => ({ ...prev, [item.id]: newIdx }));
                lastIdx = newIdx;
              }
            }
          }
        });
      });
    }, cardRefs);

    return () => ctx.revert();
  }, [galleryItems]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <TrueFocus 
            text="Educational Activities"
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            enableHover={true}
          />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Highlights from my learning journey and educational experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {galleryItems?.map((item, index) => {
            const images = item.images || [];
            const activeIdx = activeImgIndices[item.id] ?? 0;
            
            return (
              <motion.div
                key={item.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image Container with Scroll-based Carousel */}
                <div className="relative h-64 overflow-hidden">
                  {images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      data-img-index={imgIdx}
                      className="absolute inset-0"
                      style={{
                        zIndex: imgIdx === activeIdx ? 10 : 0,
                        opacity: imgIdx === activeIdx ? 1 : 0,
                        transform: imgIdx === activeIdx ? 'scale(1)' : 'scale(0.97)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease'
                      }}
                    >
                      <img
                        src={img}
                        alt={`${item.title} ${imgIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Image counter */}
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm bg-black/60 text-white border border-white/20">
                    {activeIdx + 1} / {images.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(item.date)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {(!galleryItems || galleryItems.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No educational activities found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationalGallery;
