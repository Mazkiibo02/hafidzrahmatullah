import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Briefcase } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import { certificates, Certificate } from '../data/certificates';

const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: 'easeOut' }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="glass-card glow-border rounded-2xl overflow-hidden group"
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-indigo-500/20 to-purple-600/20">
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span
        className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
          cert.category === 'internship' ? 'bg-emerald-600' : 'bg-indigo-600'
        }`}
      >
        {cert.category === 'internship' ? (
          <>
            <Briefcase size={10} />
            Internship
          </>
        ) : (
          <>
            <Award size={10} />
            Course
          </>
        )}
      </span>
    </div>

    {/* Info */}
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
        {cert.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
          {cert.date}
        </span>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            <ExternalLink size={11} />
            Verify
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Certificates: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'course' | 'internship'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filtered = certificates
    .filter((c) => filter === 'all' || c.category === filter)
    .sort((a, b) =>
      sortOrder === 'newest'
        ? parseInt(b.date) - parseInt(a.date)
        : parseInt(a.date) - parseInt(b.date)
    );

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
              {certificates.length} certificates across courses and professional internships
            </motion.p>
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div className="flex gap-2">
            {(['all', 'course', 'internship'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  filter === f
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'glass-card text-gray-600 dark:text-gray-300 hover:border-indigo-400'
                }`}
              >
                {f === 'all' ? `All (${certificates.length})` : f}
              </button>
            ))}
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="px-3 py-1.5 rounded-xl glass-card text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
