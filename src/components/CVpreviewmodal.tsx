import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Wajib: set worker path (pakai CDN yang match versi react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_PATH = '/cv/Hafidz-Rahmatullah-CV.pdf';

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({ isOpen, onClose }) => {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(800);

  // Ukur lebar container untuk responsive page width
  React.useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isOpen]);

  // Reset state saat modal dibuka
  React.useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      setIsLoading(true);
      setError(false);
    }
  }, [isOpen]);

  // Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setPageNumber((p) => Math.min(p + 1, numPages));
      if (e.key === 'ArrowLeft') setPageNumber((p) => Math.max(p - 1, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, numPages]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = CV_PATH;
    link.download = 'Hafidz-Rahmatullah-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(false);
  };

  const onDocumentLoadError = () => {
    setIsLoading(false);
    setError(true);
  };

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-3xl flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-gray-950 shadow-2xl"
            style={{ height: '90vh' }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-400 text-xs font-mono ml-1 hidden sm:block">
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

            {/* ── PDF Viewer ── */}
            <div
              ref={containerRef}
              className="flex-1 min-h-0 overflow-y-auto bg-gray-800/50 flex flex-col items-center py-6 px-4 gap-4"
            >
              {/* Loading state */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs font-mono">Memuat CV...</p>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <p className="text-gray-400 text-sm">Gagal memuat PDF.</p>
                  <div className="flex gap-3">
                    <a
                      href={CV_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={14} /> Buka di tab baru
                    </a>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-colors"
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              )}

              {/* PDF Document */}
              <Document
                file={CV_PATH}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex flex-col items-center gap-4"
              >
                {/* Render semua page sekaligus agar bisa scroll */}
                {Array.from({ length: numPages }, (_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-2xl">
                    <Page
                      pageNumber={i + 1}
                      width={Math.min(containerWidth - 32, 760)}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                    />
                  </div>
                ))}
              </Document>
            </div>

            {/* ── Footer — page indicator ── */}
            {numPages > 1 && (
              <div className="flex items-center justify-center gap-4 px-5 py-3 border-t border-white/10 bg-gray-900/80 flex-shrink-0">
                <button
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-gray-400 text-xs font-mono">
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                  disabled={pageNumber >= numPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;