import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_PATH = '/cv/Hafidz-Rahmatullah-CV.pdf';

// Google Docs Viewer — reliable di semua browser termasuk mobile
const getGoogleDocsViewerUrl = (pdfUrl: string) => {
  const absolute = window.location.origin + pdfUrl;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(absolute)}&embedded=true`;
};

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewerUrl, setViewerUrl] = React.useState('');

  // Generate viewer URL saat modal dibuka
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setViewerUrl(getGoogleDocsViewerUrl(CV_PATH));
    }
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = CV_PATH;
    link.download = 'Hafidz-Rahmatullah-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-gray-950 shadow-2xl"
            style={{ height: '90vh' }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* macOS dots */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-400 text-xs font-mono ml-1">
                  Hafidz-Rahmatullah-CV.pdf
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open</span>
                </a>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Download size={13} />
                  Download
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 min-h-0 bg-gray-800 relative">
              {/* Loading skeleton */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-800 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs font-mono">Memuat CV...</p>
                  </div>
                </div>
              )}

              <iframe
                key={viewerUrl}
                src={viewerUrl}
                className="w-full h-full"
                title="CV Preview"
                style={{ border: 'none' }}
                onLoad={() => setIsLoading(false)}
              />
            </div>

            {/* Footer fallback */}
            <div className="flex items-center justify-center gap-3 px-5 py-3 border-t border-white/10 bg-gray-900/80 flex-shrink-0">
              <span className="text-gray-500 text-xs font-mono">Tidak bisa melihat PDF?</span>
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-xs font-medium underline underline-offset-2 transition-colors"
              >
                Buka di tab baru
              </a>
              <span className="text-gray-700 text-xs">·</span>
              <button
                onClick={handleDownload}
                className="text-indigo-400 hover:text-indigo-300 text-xs font-medium underline underline-offset-2 transition-colors"
              >
                Download langsung
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;