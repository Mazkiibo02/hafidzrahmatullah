import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Youtube, Star, GitFork, X, ArrowRight } from 'lucide-react';
import TrueFocus from '../components/animations/TrueFocus';
import { useGitHubRepos, GitHubRepo } from '../hooks/useGitHubRepos';

gsap.registerPlugin(ScrollTrigger);

/* ─── Language color map ────────────────────────────────────── */
const LANG_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  TypeScript: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', dot: '#3b82f6' },
  JavaScript: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: '#eab308' },
  PHP: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', dot: '#8b5cf6' },
  Python: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', dot: '#22c55e' },
  Dart: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', dot: '#06b6d4' },
  HTML: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', dot: '#f97316' },
  Java: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: '#ef4444' },
  ShaderLab: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', dot: '#ec4899' },
  default: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', dot: '#6366f1' },
};

const getLang = (lang: string | null) =>
  LANG_COLORS[lang ?? ''] ?? LANG_COLORS.default;

/* ─── Code background decoration ───────────────────────────── */
const CodeBg = ({ color }: { color: string }) => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.045] pointer-events-none select-none font-mono text-[10px] leading-4 p-3">
    {['const project = {', '  stack: ["React", "TS"],', '  deployed: true,', '  stars: 0,', '};', '', 'function build() {', '  return ship(project);', '}'].map((line, i) => (
      <div key={i} style={{ color }}>{line}</div>
    ))}
  </div>
);

/* ─── Magnetic Button ───────────────────────────────────────── */
const MagneticBtn = ({ href, children, className }: { href: string; children: React.ReactNode; className: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' });
  }, []);
  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
  }, []);
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={className}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  );
};

/* ─── Scramble Title ─────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

const ScrambleTitle = ({ text }: { text: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let raf: number;
    const original = text.split('');
    const totalFrames = 35;
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      el.textContent = original.map((char, i) => {
        if (char === ' ') return ' ';
        if (i / original.length < progress) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (frame < totalFrames) { raf = requestAnimationFrame(animate); }
      else { el.textContent = text; }
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { frame = 0; raf = requestAnimationFrame(animate); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [text]);
  return (
    <h1 ref={ref} className="text-5xl lg:text-7xl font-bold text-white font-mono tracking-tight">
      {text}
    </h1>
  );
};

/* ─── Filter Bar ─────────────────────────────────────────────── */
const FilterBar = ({ languages, active, onChange }: { languages: string[]; active: string; onChange: (l: string) => void }) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !indicatorRef.current) return;
    const btn = bar.querySelector(`[data-lang="${active}"]`) as HTMLElement;
    if (!btn) return;
    gsap.to(indicatorRef.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration: 0.4, ease: 'power3.out' });
  }, [active, languages]);
  return (
    <div ref={barRef} className="relative flex flex-wrap gap-1 p-1 rounded-2xl bg-white/5 border border-white/10 w-fit mx-auto">
      <div ref={indicatorRef} className="absolute top-1 bottom-1 rounded-xl bg-indigo-600/80 shadow-lg shadow-indigo-500/20 pointer-events-none" style={{ height: 'calc(100% - 8px)' }} />
      {languages.map((lang) => {
        const lc = LANG_COLORS[lang] ?? LANG_COLORS.default;
        return (
          <button key={lang} data-lang={lang} onClick={() => onChange(lang)}
            className={`relative z-10 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200 ${active === lang ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {lang !== 'All' && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: lc.dot }} />}
            {lang}
          </button>
        );
      })}
    </div>
  );
};

/* ─── Featured Card ─────────────────────────────────────────── */
const FeaturedCard = ({ repo, onClick }: { repo: GitHubRepo; onClick: () => void }) => {
  const lang = getLang(repo.language);
  return (
    <div onClick={onClick}
      className={`flex-shrink-0 w-80 rounded-3xl border ${lang.border} bg-gray-950/90 backdrop-blur-xl cursor-pointer group relative overflow-hidden hover:border-opacity-70 transition-all duration-500`}
      style={{ height: '420px' }}>
      <CodeBg color={lang.dot} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${lang.dot}60, transparent)` }} />
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${lang.bg} ${lang.text} border ${lang.border}`}>
            {repo.language ?? 'Code'}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
          </div>
        </div>
        <div className={`rounded-2xl overflow-hidden mb-4 ${lang.bg} border ${lang.border} relative`} style={{ height: '160px' }}>
          <img src={repo.screenshot} alt={repo.name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
        </div>
        <h3 className="text-white font-bold text-lg leading-tight capitalize mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {repo.name.replace(/-/g, ' ')}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {repo.description ?? 'No description available.'}
        </p>
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/10">#{t}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <MagneticBtn href={repo.html_url} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">
            <Github size={13} /> GitHub
          </MagneticBtn>
          <div className="flex items-center gap-3">
            {repo.homepage && (
              <MagneticBtn href={repo.homepage} className={`inline-flex items-center gap-1.5 text-xs font-medium ${lang.text} hover:opacity-80 transition-opacity`}>
                <ExternalLink size={13} /> Demo
              </MagneticBtn>
            )}
            {repo.youtubeUrl && (
              <MagneticBtn href={repo.youtubeUrl} className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors">
                <Youtube size={13} /> Video
              </MagneticBtn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Grid Card ─────────────────────────────────────────────── */
const GridCard = ({ repo, index, onClick }: { repo: GitHubRepo; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const lang = getLang(repo.language);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, delay: (index % 8) * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true }
        });
    });
    return () => ctx.revert();
  }, [index]);
  return (
    <div ref={ref} onClick={onClick}
      className={`rounded-2xl border ${lang.border} bg-gray-950/60 backdrop-blur-sm cursor-pointer group relative overflow-hidden opacity-0 hover:border-opacity-60 transition-all duration-400 hover:-translate-y-1`}>
      <CodeBg color={lang.dot} />
      <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-40" style={{ backgroundColor: lang.dot }} />
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-300 text-sm capitalize leading-snug group-hover:text-white transition-colors pr-2">
            {repo.name.replace(/-/g, ' ')}
          </h3>
          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: lang.dot }} />
        </div>
        {repo.description && (
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3">{repo.description}</p>
        )}
        <div className="flex items-center justify-between">
          {repo.language && <span className={`text-xs font-mono font-medium ${lang.text}`}>{repo.language}</span>}
          <div className="flex items-center gap-3 text-xs text-gray-700 ml-auto">
            <span className="flex items-center gap-1"><Star size={10} />{repo.stargazers_count}</span>
            <span className="flex items-center gap-1"><GitFork size={10} />{repo.forks_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Horizontal Scroll Section ─────────────────────────────── */
const HorizontalScroll = ({ repos, onSelect }: { repos: GitHubRepo[]; onSelect: (r: GitHubRepo) => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || repos.length === 0) return;
    const track = trackRef.current;

    // Wait for layout
    const timer = setTimeout(() => {
      const totalWidth = track.scrollWidth - window.innerWidth + 128;
      const ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
          });
        gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth + 200}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [repos]);

  if (repos.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 h-screen flex flex-col justify-center">
        <div ref={headerRef} className="px-8 lg:px-16 mb-10 opacity-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-indigo-500" />
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Featured Work</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Selected Projects</h2>
          <p className="text-gray-600 text-sm mt-2 flex items-center gap-2 font-mono">
            scroll to explore <ArrowRight size={14} className="animate-[pulse_1.5s_ease-in-out_infinite]" />
          </p>
        </div>
        <div ref={trackRef} className="flex gap-6 px-8 lg:px-16" style={{ width: 'max-content' }}>
          {repos.map((repo) => (
            <FeaturedCard key={repo.id} repo={repo} onClick={() => onSelect(repo)} />
          ))}
          <div className="w-24 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

/* ─── Modal ─────────────────────────────────────────────────── */
const ProjectModal = ({ repo, onClose }: { repo: GitHubRepo; onClose: () => void }) => {
  const lang = getLang(repo.language);
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
        <motion.div
          className={`relative rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 bg-gray-950 border ${lang.border}`}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${lang.dot}80, transparent)` }} />
          <div className={`aspect-video ${lang.bg} relative overflow-hidden`}>
            <img src={repo.screenshot} alt={repo.name} className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <CodeBg color={lang.dot} />
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-10">
              <X size={16} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-white capitalize">{repo.name.replace(/-/g, ' ')}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-600 flex-shrink-0">
                <span className="flex items-center gap-1"><Star size={13} />{repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={13} />{repo.forks_count}</span>
              </div>
            </div>
            {repo.description && <p className="text-gray-400 text-sm leading-relaxed">{repo.description}</p>}
            <div className="flex flex-wrap gap-2">
              {repo.language && (
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${lang.bg} ${lang.text} border ${lang.border}`}>{repo.language}</span>
              )}
              {repo.topics.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10 text-xs">#{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                <Github size={15} /> View Repository
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${lang.bg} border ${lang.border} ${lang.text} text-sm font-medium hover:opacity-80 transition-opacity`}>
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              {repo.youtubeUrl && (
                <a href={repo.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:opacity-80 transition-opacity">
                  <Youtube size={15} /> Demo Video
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Main Page ─────────────────────────────────────────────── */
const Projects: React.FC = () => {
  const { data: repos, isLoading, isError } = useGitHubRepos();
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = (repos ?? []).filter((r) => r.featured);
  const nonFeatured = (repos ?? []).filter((r) => !r.featured);
  const languages = ['All', ...Array.from(new Set(nonFeatured.map((r) => r.language).filter(Boolean) as string[]))];
  const filtered = filter === 'All' ? nonFeatured : nonFeatured.filter((r) => r.language === filter);

  useEffect(() => {
    if (!gridRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.grid-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true }
        });
    }, gridRef);
    return () => ctx.revert();
  }, [repos, isLoading]);

  // Update featured repos in projectsExtra
  // hafidzrahmatullah, rch-store, krandon-vote-sim, Morintern, innolegalist-web-studio

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero */}
      <section className="pt-32 pb-20 px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-indigo-500" />
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Portfolio · GitHub</span>
          </motion.div>
          <ScrambleTitle text="My Projects" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-500 text-lg mt-4 max-w-xl leading-relaxed">
            Public repositories from GitHub — each one a chapter of the journey.
          </motion.p>
          {!isLoading && !isError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mt-8 text-sm text-gray-700 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {(repos ?? []).length} repos
              </span>
              <span>·</span>
              <span>{featured.length} featured</span>
              <span>·</span>
              <span>{languages.length - 1} languages</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/5 animate-pulse p-5 space-y-3">
                <div className="h-3 bg-white/10 rounded w-1/3" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-24 text-gray-600 font-mono text-sm">
          Failed to load repositories from GitHub.
        </div>
      )}

      {/* Featured — Horizontal Scroll */}
      {!isLoading && !isError && featured.length > 0 && (
        <HorizontalScroll repos={featured} onSelect={setSelectedRepo} />
      )}

      {/* All Repos Grid */}
      {!isLoading && !isError && (
        <div ref={gridRef} className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
          <div className="grid-header opacity-0 mb-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-indigo-500" />
              <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">All Repositories</span>
            </div>
            <FilterBar languages={languages} active={filter} onChange={setFilter} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={filter}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((repo, i) => (
                <GridCard key={repo.id} repo={repo} index={i} onClick={() => setSelectedRepo(repo)} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center py-16 text-gray-700 font-mono text-sm">
              No repositories found for "{filter}"
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedRepo && (
        <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
      )}
    </div>
  );
};

export default Projects;