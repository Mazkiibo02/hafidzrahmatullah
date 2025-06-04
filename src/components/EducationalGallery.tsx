
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import TrueFocus from './animations/TrueFocus';
import { useGallery } from '../hooks/useGallery';

const EducationalGallery = () => {
  const { data: galleryItems, isLoading } = useGallery();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageLayout = (images: string[]) => {
    if (images.length === 1) {
      return 'single';
    } else if (images.length === 2) {
      return 'double';
    } else {
      return 'triple';
    }
  };

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
          {galleryItems?.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                {getImageLayout(item.images) === 'single' && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                
                {getImageLayout(item.images) === 'double' && (
                  <div className="grid grid-rows-2 h-full gap-1">
                    <img
                      src={item.images[0]}
                      alt={`${item.title} 1`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <img
                      src={item.images[1]}
                      alt={`${item.title} 2`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {getImageLayout(item.images) === 'triple' && (
                  <div className="grid grid-rows-2 h-full gap-1">
                    <img
                      src={item.images[0]}
                      alt={`${item.title} 1`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="grid grid-cols-2 gap-1 h-full">
                      <img
                        src={item.images[1]}
                        alt={`${item.title} 2`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <img
                        src={item.images[2]}
                        alt={`${item.title} 3`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="text-white" size={24} />
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
          ))}
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
