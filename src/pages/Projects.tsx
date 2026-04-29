import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Youtube, Star, GitFork, X } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import { useGitHubRepos, GitHubRepo } from '../hooks/useGitHubRepos';

/* ─── Project Modal ─────────────────────────────────────────── */
const ProjectModal = ({
  repo,
  onClose,
}: {
  repo: GitHubRepo;
  onClose: () => void;
}) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative glass-card glow-border rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Screenshot */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
          <img
            src={repo.screenshot}
            alt={repo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
              {repo.name.replace(/-/g, ' ')}
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              <span className="flex items-center gap-1">
                <Star size={14} />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={14} />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {repo.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {repo.description}
            </p>
          )}

          {repo.language && (
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
              {repo.language}
            </span>
          )}

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Github size={16} />
              View Repository
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            {repo.youtubeUrl && (
              <a
                href={repo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <Youtube size={16} />
                Demo Video
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ─── Project Card ──────────────────────────────────────────── */
const ProjectCard = ({
  repo,
  index,
  onClick,
}: {
  repo: GitHubRepo;
  index: number;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: 'easeOut' }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    onClick={onClick}
    className="glass-card glow-border rounded-2xl overflow-hidden group cursor-pointer"
  >
    {/* Screenshot */}
    <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-600/20">
      <img
        src={repo.screenshot}
        alt={repo.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-xs font-medium">Click to view details</span>
      </div>

      {repo.featured && (
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-semibold">
          Featured
        </span>
      )}

      {repo.youtubeUrl && (
        <span className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600 text-white">
          <Youtube size={12} />
        </span>
      )}
    </div>

    {/* Info */}
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm capitalize leading-snug">
        {repo.name.replace(/-/g, ' ')}
      </h3>

      {repo.description && (
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        {repo.language && (
          <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
            {repo.language}
          </span>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
          <span className="flex items-center gap-1">
            <Star size={11} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={11} />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Page ─────────────────────────────────────────────── */
const Projects: React.FC = () => {
  const { data: repos, isLoading, isError } = useGitHubRepos();
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const languages = [
    'All',
    ...Array.from(
      new Set((repos ?? []).map((r) => r.language).filter(Boolean) as string[])
    ),
  ];

  const filtered =
    filter === 'All'
      ? repos ?? []
      : (repos ?? []).filter((r) => r.language === filter);

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative h-36 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10 pt-4">
            <TrueFocus
              text="My Projects"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Public repositories from GitHub — click any project for details
            </motion.p>
          </div>
        </div>

        {/* Language filter */}
        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === lang
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'glass-card text-gray-600 dark:text-gray-300 hover:border-indigo-400'
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-24">
            <p className="text-gray-500 dark:text-gray-400">
              Failed to load repositories. Please try again later.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((repo, i) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={i}
                onClick={() => setSelectedRepo(repo)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRepo && (
        <ProjectModal
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
};

export default Projects;
