import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';
import { experiences, type Experience as ExperienceData } from '@/data/experiences';
import DecorativeAnimations from '../components/DecorativeAnimations';

/* ─── Constants ──────────────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

/* ─── Scramble Hero Title ────────────────────────────────────── */
const ScrambleHeroTitle = ({ text }: { text: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0, raf: number;
    const original = text.split(''), totalFrames = 35;
    const animate = () => {
      frame++;
      const p = frame / totalFrames;
      el.textContent = original.map((c, i) => {
        if (c === ' ') return ' ';
        if (i / original.length < p) return c;
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
    <h1
      ref={ref}
      className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-mono tracking-tight"
    >
      {text}
    </h1>
  );
};

/* ─── Scramble Text ──────────────────────────────────────────── */
const ScrambleText = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    if (!trigger || triggered.current || !ref.current) return;
    triggered.current = true;
    const el = ref.current;
    let frame = 0, raf: number;
    const original = text.split(''), totalFrames = 40;
    const animate = () => {
      frame++;
      const p = frame / totalFrames;
      el.textContent = original.map((c, i) => {
        if ([' ', '(', ')'].includes(c)) return c;
        if (i / original.length < p) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      if (frame < totalFrames) { raf = requestAnimationFrame(animate); }
      else { el.textContent = text; }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trigger, text]);
  return <span ref={ref}>{text}</span>;
};

/* ─── Type badge colors ──────────────────────────────────────── */
const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Magang:      { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30'   },
  Freelance:   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Full-time': { bg: 'bg-sky-500/10',     text: 'text-sky-400',     border: 'border-sky-500/30'     },
  Organisasi:  { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/30'    },
};

const TYPE_LABELS: Record<ExperienceData['type'], string> = {
  Magang: 'Internship',
  Freelance: 'Freelance',
  'Full-time': 'Full-time',
  Organisasi: 'Organization',
};

/* ─── Desktop Image Gallery ──────────────────────────────────── */
const DesktopImageGallery = ({
  images,
  color,
}: {
  images: ExperienceData['images'];
  color: ExperienceData['color'];
}) => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      <div
        className="relative rounded-2xl overflow-hidden flex-1 min-h-0"
        style={{ boxShadow: `inset 0 0 0 1px ${color.primary}30` }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.55)', color: color.primary, border: `1px solid ${color.primary}30` }}
        >
          {active + 1} / {images.length}
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 flex-shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-1 rounded-xl overflow-hidden h-16 sm:h-20 transition-all duration-300"
              style={{
                opacity: active === i ? 1 : 0.38,
                outline: active === i ? `2px solid ${color.primary}` : '2px solid transparent',
                outlineOffset: '2px',
              }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Mobile Image Gallery ───────────────────────────────────── */
const MobileImageGallery = ({
  images,
  color,
}: {
  images: ExperienceData['images'];
  color: ExperienceData['color'];
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/9', boxShadow: `0 0 0 1px ${color.primary}30` }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={images[active]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent pointer-events-none" />
      <div
        className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm"
        style={{ background: 'rgba(0,0,0,0.55)', color: color.primary, border: `1px solid ${color.primary}30` }}
      >
        {active + 1} / {images.length}
      </div>
    </div>
  );
};

/* ─── Experience Card ────────────────────────────────────────── */
interface CardProps {
  experience: ExperienceData;
  index: number;
  total: number;
}

const ExperienceCard = ({ experience: exp, index, total }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' });
  const { color } = exp;
  const tc = TYPE_COLORS[exp.type] ?? TYPE_COLORS.Freelance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      /* Desktop sticky — each card sticks while scrolling through it */
      className="lg:sticky lg:top-[5vh] relative rounded-3xl overflow-hidden"
      style={{
        /* Desktop: fixed height so sticky works cleanly */
        height: undefined,
        boxShadow: `0 0 80px ${color.glow}, 0 8px 60px rgba(0,0,0,0.5), inset 0 0 0 1px ${color.primary}25`,
        willChange: 'transform',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${color.primary}70, ${color.primary}, ${color.primary}70, transparent)`,
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
          transform: 'translate(35%, -35%)',
          opacity: 0.7,
        }}
      />

      {/* Big index number watermark */}
      <div
        className="absolute -right-8 -bottom-12 font-black text-gray-900 dark:text-white select-none pointer-events-none leading-none"
        style={{ fontSize: '240px', opacity: 0.028 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Card background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl" />

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden relative z-10 p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${tc.bg} ${tc.text} border ${tc.border}`}>
            {TYPE_LABELS[exp.type]}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <MobileImageGallery images={exp.images} color={color} />

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
            <ScrambleText text={exp.company} trigger={isInView} />
          </h2>
          <p className={`text-base font-medium mb-2 ${color.text}`}>{exp.role}</p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={13} style={{ color: color.primary }} />
            <span>{exp.period}</span>
          </div>
        </div>

        <div className="h-px" style={{ background: `linear-gradient(90deg, ${color.primary}45, rgba(255,255,255,0.03))` }} />

        <ul className="space-y-2.5">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: color.primary }} />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-2.5">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {exp.techStack.map((tech) => (
              <span key={tech} className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${color.bg} ${color.text} border ${color.border}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div
        className="hidden lg:grid relative z-10 p-8 xl:p-10 grid-cols-2 gap-8 xl:gap-10"
        style={{ minHeight: '75vh', maxHeight: '85vh' }}
      >
        <DesktopImageGallery images={exp.images} color={color} />

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${tc.bg} ${tc.text} border ${tc.border}`}>
              {TYPE_LABELS[exp.type]}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-mono tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <h2 className="text-2xl xl:text-[1.65rem] font-bold text-gray-900 dark:text-white leading-tight mb-1">
            <ScrambleText text={exp.company} trigger={isInView} />
          </h2>
          <p className={`text-lg font-medium mb-2 ${color.text}`}>{exp.role}</p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-5">
            <Calendar size={13} style={{ color: color.primary }} />
            <span>{exp.period}</span>
          </div>

          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${color.primary}45, rgba(255,255,255,0.03))` }} />

          <ul className="space-y-2.5 mb-5 flex-1">
            {exp.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: color.primary }} />
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          <div>
            <p className="text-gray-600 dark:text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-2.5">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {exp.techStack.map((tech) => (
                <span key={tech} className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${color.bg} ${color.text} border ${color.border}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ──────────────────────────────────────────────── */
const Experience: React.FC = () => {
  const N = experiences.length;
  const magang    = experiences.filter((e) => e.type === 'Magang').length;
  const freelance = experiences.filter((e) => e.type === 'Freelance').length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-x-hidden">
      <DecorativeAnimations fullBackground={true} />

      {/* ── Hero ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-indigo-500" />
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Career · Experience</span>
          </motion.div>

          <ScrambleHeroTitle text="Work Experience" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mt-4 max-w-xl leading-relaxed"
          >
            Every experience is a new chapter in a career that keeps growing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400 font-mono flex-wrap"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {N} experiences
            </span>
            <span>·</span>
            <span>{magang} internships</span>
            <span>·</span>
            <span>{freelance} freelance</span>
          </motion.div>
        </div>
      </section>

      {/* ── Cards Section ── */}
      <section className="px-5 sm:px-8 lg:px-16 pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Desktop: sticky stack — each card has its own tall scroll container */}
          <div className="hidden lg:block space-y-0">
            {experiences.map((exp, i) => (
              /*
               * Each card wrapper is tall enough that the card "sticks"
               * for a comfortable reading window while scrolling.
               * The last card doesn't need extra height.
               */
              <div
                key={exp.id}
                style={{ paddingBottom: i < N - 1 ? '30vh' : '0' }}
              >
                <ExperienceCard experience={exp} index={i} total={N} />
              </div>
            ))}
          </div>

          {/* Mobile: normal vertical scroll with gap */}
          <div className="lg:hidden flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} total={N} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Experience;