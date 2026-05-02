import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Loader2 } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import { useGoogleDriveCertificates, DriveCertificate } from '../hooks/useGoogleDriveCertificates';

/* Helpers */

const getThumbnailUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w400`;

const getEmbedUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

const getCategoryFromName = (name: string): 'internship' | 'course' => {
  const lower = name.toLowerCase();
  if (
    lower.includes('magang') ||
    lower.includes('internship') ||
    lower.includes('morbis') ||
    lower.includes('innolegalist')
  ) {
    return 'internship';
  }
  return 'course';
};

/* Modal Preview */

const CertModal = ({
  cert,
  onClose,
}: {
  cert: DriveCertificate;
  onClose: () => void;
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative glass-card rounded-2xl overflow-hidden w-full max-w-3xl z-10 flex flex-col"
          style={{ maxHeight: '90vh' }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex-1 pr-4">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                {cert.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {cert.issuer}
                {cert.dateDisplay ? ` · ${cert.dateDisplay}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={cert.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
              >
                <Download size={13} />
                Download
              </a>
              <a
                href={cert.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-gray-700 dark:text-gray-300 text-xs font-medium hover:border-indigo-400 transition-colors"
              >
                <ExternalLink size={13} />
                Open in Drive
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg glass-card text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Preview iframe */}
          <div
            className="relative flex-1 bg-gray-100 dark:bg-gray-900"
            style={{ minHeight: '500px' }}
          >
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={28} className="animate-spin text-indigo-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading preview...
                  </p>
                </div>
              </div>
            )}
            <iframe
              src={getEmbedUrl(cert.id)}
              className="w-full h-full border-0"
              style={{ minHeight: '500px' }}
              allow="autoplay"
              onLoad={() => setIframeLoading(false)}
              title={cert.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* Certificate Card */

const CertCard = ({
  cert,
  index,
  onClick,
}: {
  cert: DriveCertificate;
  index: number;
  onClick: () => void;
}) => {
  const [imgError, setImgError] = useState(false);
  const category = getCategoryFromName(cert.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onClick}
      className="glass-card glow-border rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
        {!imgError ? (
          <img
            src={getThumbnailUrl(cert.id)}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-indigo-400 p-4">
            <FileText size={36} />
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-snug">
              {cert.title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xs font-medium bg-indigo-600 px-3 py-1.5 rounded-full">
            Click to Preview
          </span>
        </div>

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
            category === 'internship' ? 'bg-emerald-600' : 'bg-indigo-600'
          }`}
        >
          {category === 'internship' ? 'Internship' : 'Course'}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-1.5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {cert.issuer}
        </p>
        {cert.dateDisplay && (
          <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
            {cert.dateDisplay}
          </p>
        )}
      </div>
    </motion.div>
  );
};

/* Skeleton */

const SkeletonCard = () => (
  <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
    </div>
  </div>
);

/* Main Page */

const Certificates: React.FC = () => {
  const { data: certs, isLoading, isError, error } = useGoogleDriveCertificates();
  const [selectedCert, setSelectedCert] = useState<DriveCertificate | null>(null);
  const [filter, setFilter] = useState<'all' | 'course' | 'internship'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filtered = (certs ?? [])
    .filter((c) => filter === 'all' || getCategoryFromName(c.name) === filter)
    .sort((a, b) =>
      sortOrder === 'newest'
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date)
    );

  const totalCount = certs?.length ?? 0;

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
              {isLoading
                ? 'Loading certificates...'
                : `${totalCount} certificates — courses and professional internships`}
            </motion.p>
          </div>
        </div>

        {/* Controls */}
        {!isLoading && !isError && (
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
                  {f === 'all' ? `All (${totalCount})` : f}
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
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-24 space-y-3">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Failed to load certificates from Google Drive.
            </p>
            <p className="text-red-400 text-sm font-mono">
              {(error as Error)?.message ?? 'Unknown error'}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs max-w-md mx-auto">
              Pastikan folder Drive sudah di-share sebagai "Anyone with the link"
              dan API key sudah benar di file .env
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};

export default Certificates;
