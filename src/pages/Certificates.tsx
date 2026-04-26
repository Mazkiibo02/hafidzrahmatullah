
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Award } from 'lucide-react';
import { useCertificates } from '@/hooks/useCertificates';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';

const Certificates: React.FC = () => {
  const { data: certificates, isLoading: loading } = useCertificates();
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sorted = [...(certificates || [])].sort((a, b) => {
    const dA = new Date(a.created_at || 0).getTime();
    const dB = new Date(b.created_at || 0).getTime();
    return sortOrder === 'newest' ? dB - dA : dA - dB;
  });

  if (loading) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          <p className="text-gray-500 dark:text-gray-400">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative h-36 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10 pt-4">
            <TrueFocus
              text="Certificates"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Credentials and certifications I've earned throughout my learning journey
            </motion.p>
          </div>
        </div>

        {/* Sort bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Award size={16} />
            <span>{sorted.length} certificate{sorted.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2">
            <ArrowUpDown size={16} className="text-gray-500 dark:text-gray-400" />
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="bg-transparent text-sm text-gray-700 dark:text-gray-300 font-medium focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </motion.div>

        {/* Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No certificates found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card glow-border rounded-2xl overflow-hidden group shimmer-overlay relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cert.file_url}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
                      {cert.issuer}
                    </p>
                  )}
                  {cert.date && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(cert.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
