import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadGsap } from '@/lib/loadGsap';
import { Calendar, ChevronRight } from 'lucide-react';
import { experiences, type Experience as ExperienceData } from '@/data/experiences';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

/* ─── Detect touch ──────────────────────────────────────────── */
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

/* ─── Scramble Title ─────────────────────────────────────────── */
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
    <h1 ref={ref} className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-mono tracking-tight">
      {text}
    </h1>
  );
};

/* ─── Scramble Text ─────────────────────────────────────────── */
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

/* ─── Mobile Image Gallery (scroll-based via GSAP) ─────────── */
const MobileImageGallery = ({
  images,
  color,
  isActive,
}: {
  images: ExperienceData['images'];
  color: ExperienceData['color'];
  isActive: boolean;
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle images when card becomes active (mobile scroll-based)
  useEffect(() => {
    if (!isActive || images.length <= 1) return;

    // Reset to first image
    setActiveImg(0);
    let canceled = false;
    let timeline: any;

    loadGsap().then(({ gsap }) => {
      if (canceled) return;
      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 });
      });

      // Cycle through images with timeline
      timeline = gsap.timeline({ repeat: -1 });
      images.forEach((_, i) => {
        const next = (i + 1) % images.length;
        timeline.add(() => {
          const curr = imgRefs.current[i];
          const nextEl = imgRefs.current[next];
          if (!curr || !nextEl) return;
          gsap.to(curr,   { opacity: 0, scale: 0.97, duration: 0.5, ease: 'power2.inOut' });
          gsap.fromTo(nextEl,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1,    duration: 0.5, ease: 'power2.inOut',
              onStart: () => setActiveImg(next) }
          );
        }).addPause(`+=${i === 0 ? 2.5 : 2}`);
      });
    });

    return () => {
      canceled = true;
      timeline?.kill();
    };
  }, [isActive, images]);

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/9', boxShadow: `0 0 0 1px ${color.primary}30` }}>
      {images.map((src, i) => (
        <div key={i} ref={(el) => { imgRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm"
        style={{ background: 'rgba(0,0,0,0.55)', color: color.primary, border: `1px solid ${color.primary}30` }}>
        {activeImg + 1} / {images.length}
      </div>
    </div>
  );
};

/* ─── Desktop Image Gallery (thumbnail + click) ─────────────── */
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
      <div className="relative rounded-2xl overflow-hidden flex-1 min-h-0"
        style={{ boxShadow: `inset 0 0 0 1px ${color.primary}30` }}>
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
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.55)', color: color.primary, border: `1px solid ${color.primary}30` }}>
          {active + 1} / {images.length}
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="flex-1 rounded-xl overflow-hidden h-16 sm:h-20 transition-all duration-300"
            style={{
              opacity: active === i ? 1 : 0.38,
              outline: active === i ? `2px solid ${color.primary}` : '2px solid transparent',
              outlineOffset: '2px',
            }}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Type badge colors ─────────────────────────────────────── */
const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Magang:      { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30'   },
  Freelance:   { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Full-time': { bg: 'bg-sky-500/10',     text: 'text-sky-400',     border: 'border-sky-500/30'     },
  Organisasi:  { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/30'    },
};

/* ─── Experience Card ───────────────────────────────────────── */
interface ExperienceCardProps {
  experience: ExperienceData;
  index: number;
  total: number;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}

const ExperienceCard = ({ experience: exp, index, total, isActive, setRef }: ExperienceCardProps) => {
  const { color } = exp;
  const tc = TYPE_COLORS[exp.type] ?? TYPE_COLORS.Freelance;
  const isTouch = isTouchDevice();

  return (
    <div ref={setRef} data-no-transition=""
      className="absolute inset-0 rounded-3xl"
      style={{ zIndex: index, willChange: 'transform, opacity' }}>

      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl" style={{
        boxShadow: isActive
          ? `0 0 100px ${color.glow}, 0 8px 80px rgba(0,0,0,0.7), inset 0 0 0 1px ${color.primary}35`
          : `0 4px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
        transition: 'box-shadow 0.7s ease',
      }} />

      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10" style={{
          background: `linear-gradient(90deg, transparent, ${color.primary}70, ${color.primary}, ${color.primary}70, transparent)`,
          opacity: isActive ? 1 : 0.35, transition: 'opacity 0.6s ease',
        }} />

        {/* BG number */}
        <div className="absolute -right-8 -bottom-12 font-black text-gray-900 dark:text-white select-none pointer-events-none leading-none"
          style={{ fontSize: '240px', opacity: 0.028 }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* BG bloom */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
            transform: 'translate(35%, -35%)',
            opacity: isActive ? 1 : 0.25, transition: 'opacity 0.7s ease',
          }} />

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden relative z-10 h-full overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Type badge + counter */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${tc.bg} ${tc.text} border ${tc.border}`}>
              {exp.type}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Mobile image — full width */}
          <MobileImageGallery images={exp.images} color={color} isActive={isActive} />

          {/* Company + role + period */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
              <ScrambleText text={exp.company} trigger={isActive} />
            </h2>
            <p className={`text-base font-medium mb-2 ${color.text}`}>{exp.role}</p>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={13} style={{ color: color.primary }} />
              <span>{exp.period}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: `linear-gradient(90deg, ${color.primary}45, rgba(255,255,255,0.03))` }} />

          {/* Description */}
          <ul className="space-y-2.5">
            {exp.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: color.primary }} />
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
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
        <div className="hidden lg:grid relative z-10 h-full p-8 xl:p-10 grid-cols-2 gap-8 xl:gap-10 overflow-hidden">
          {/* Left: Image */}
          <DesktopImageGallery images={exp.images} color={color} />

          {/* Right: Details */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${tc.bg} ${tc.text} border ${tc.border}`}>
                {exp.type}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-mono tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
            <h2 className="text-2xl xl:text-[1.65rem] font-bold text-gray-900 dark:text-white leading-tight mb-1 flex-shrink-0">
              <ScrambleText text={exp.company} trigger={isActive} />
            </h2>
            <p className={`text-lg font-medium mb-2 flex-shrink-0 ${color.text}`}>{exp.role}</p>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-5 flex-shrink-0">
              <Calendar size={13} style={{ color: color.primary }} />
              <span>{exp.period}</span>
            </div>
            <div className="h-px mb-5 flex-shrink-0"
              style={{ background: `linear-gradient(90deg, ${color.primary}45, rgba(255,255,255,0.03))` }} />
            <ul className="space-y-2.5 mb-5 flex-1">
              {exp.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: color.primary }} />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <div className="flex-shrink-0">
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
      </div>
    </div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────── */
const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const N = experiences.length;

  useEffect(() => {
    if (!sectionRef.current) return;
    let cleanup: (() => void) | undefined;
    let canceled = false;

    loadGsap().then(({ gsap }) => {
      if (canceled || !sectionRef.current) return;
      const ctx = gsap.context(() => {
        cardRefs.current.forEach((card, i) => {
          if (i > 0 && card) gsap.set(card, { y: '110vh' });
        });
        experiences.forEach((_, i) => {
          if (i === 0) return;
          const card     = cardRefs.current[i];
          const prevCard = cardRefs.current[i - 1];
          if (!card || !prevCard) return;
          const pct    = Math.round((i / N) * 100);
          const pctEnd = Math.round(((i + 0.65) / N) * 100);
          gsap.fromTo(card, { y: '110vh' }, {
            y: 0, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${pct}% top`, end: `${pctEnd}% top`,
              scrub: 1.4,
              onEnter:     () => setActiveIndex(i),
              onLeaveBack: () => setActiveIndex(i - 1),
            },
          });
          gsap.fromTo(prevCard, { scale: 1, opacity: 1 }, {
            scale: 0.93, opacity: 0.55, ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${pct}% top`, end: `${pctEnd}% top`,
              scrub: 1.4,
            },
          });
        });
      }, sectionRef);
      cleanup = () => ctx.revert();
    });

    return () => {
      canceled = true;
      cleanup?.();
    };
  }, [N]);

  const magang    = experiences.filter((e) => e.type === 'Magang').length;
  const freelance = experiences.filter((e) => e.type === 'Freelance').length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-indigo-500" />
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Career · Experience</span>
          </motion.div>
          <ScrambleHeroTitle text="Work Experience" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Setiap pengalaman adalah bab baru dalam perjalanan karir yang terus berkembang.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400 font-mono flex-wrap">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />{N} pengalaman</span>
            <span>·</span><span>{magang} magang</span>
            <span>·</span><span>{freelance} freelance</span>
          </motion.div>
        </div>
      </section>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }} className="text-center pb-8 sm:pb-10">
        <div className="inline-flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-mono">
          <span>scroll untuk menjelajahi</span>
          <motion.div animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-8 border border-gray-700 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-gray-600 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Sticky Stack */}
      <div ref={sectionRef} style={{ height: `${N * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Progress dots */}
          <div className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end gap-3 sm:gap-4 pointer-events-none">
            {experiences.map((exp, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] font-mono hidden sm:block" style={{
                  color: exp.color.primary,
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? 'translateX(0)' : 'translateX(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="rounded-full" style={{
                  width:  activeIndex === i ? '12px' : '5px',
                  height: activeIndex === i ? '12px' : '5px',
                  background: activeIndex === i ? exp.color.primary : 'rgba(255,255,255,0.15)',
                  boxShadow: activeIndex === i ? `0 0 14px ${exp.color.primary}` : 'none',
                  transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                }} />
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-6 lg:px-14 py-16 sm:py-20 lg:py-24">
            <div className="relative w-full" style={{ maxWidth: '1200px', height: 'calc(100vh - 140px)' }}>
              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.id} experience={exp} index={i} total={N}
                  isActive={activeIndex === i}
                  setRef={(el) => { cardRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 sm:h-40" />
    </div>
  );
};

export default Experience;