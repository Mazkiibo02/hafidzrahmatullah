import React, { useRef, useEffect, useState } from 'react';
import { loadGsap } from '@/lib/loadGsap';
import { Calendar, BookOpen, Cpu, Code2, GraduationCap } from 'lucide-react';
import { educationalActivities, type EducationalActivity } from '../data/EducationalActivities';

/* ─── Category config ───────────────────────────────────────── */
const CATEGORY_CONFIG = {
  seminar:   { label: 'Seminar',   color: '#6366f1', Icon: GraduationCap },
  workshop:  { label: 'Workshop',  color: '#06b6d4', Icon: Code2         },
  course:    { label: 'Course',    color: '#a855f7', Icon: BookOpen      },
  pelatihan: { label: 'Pelatihan', color: '#22c55e', Icon: Cpu           },
};

/* ─── Placeholder image (SVG data URI) ──────────────────────── */
const makePlaceholder = (color: string, index: number) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <rect width="800" height="500" fill="${color}18"/>
      <rect x="0" y="0" width="800" height="2" fill="${color}60"/>
      <text x="400" y="250" text-anchor="middle" dominant-baseline="middle"
        font-family="monospace" font-size="48" fill="${color}40">
        ${index + 1}
      </text>
    </svg>
  `)}`;

/* ─── Photo Strip ───────────────────────────────────────────── */
const PhotoStrip = ({
  activity,
  color,
}: {
  activity: EducationalActivity;
  color: string;
}) => {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const imgRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const images = activity.images;
    if (images.length <= 1) return;

    let ctx: any;
    let canceled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (canceled) return;

      ctx = gsap.context(() => {
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.06 });
        });

        images.forEach((_, i) => {
          if (i === 0) return;
          const prev = imgRefs.current[i - 1];
          const curr = imgRefs.current[i];
          if (!prev || !curr) return;

          ScrollTrigger.create({
            trigger: strip,
            start: `top+=${(i / images.length) * 60}% center`,
            end:   `top+=${((i + 1) / images.length) * 60}% center`,
            onEnter: () => {
              gsap.to(prev, { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.inOut' });
              gsap.fromTo(curr,
                { opacity: 0, scale: 1.06 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' }
              );
              setActive(i);
            },
            onLeaveBack: () => {
              gsap.to(curr, { opacity: 0, scale: 1.06, duration: 0.4, ease: 'power2.inOut' });
              gsap.to(prev, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.inOut' });
              setActive(i - 1);
            },
          });
        });
      }, strip);
    });

    return () => {
      canceled = true;
      ctx?.revert();
    };
  }, [activity.images]);

  return (
    <div ref={stripRef} className="relative">
      {/* Main image frame */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          aspectRatio: '16/9',
          boxShadow: `0 0 0 1px ${color}30, 0 20px 60px rgba(0,0,0,0.3)`,
        }}
      >
        {activity.images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { imgRefs.current[i] = el; }}
            className="absolute inset-0"
          >
            <img
              src={src}
              alt={`${activity.title} ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = makePlaceholder(color, i);
              }}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent pointer-events-none" />

        {/* Counter badge */}
        <div
          className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.55)', color, border: `1px solid ${color}30` }}
        >
          {active + 1} / {activity.images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {activity.images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width:  active === i ? '20px' : '6px',
              height: '6px',
              background: active === i ? color : `${color}30`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Activity Card ─────────────────────────────────────────── */
const ActivityCard = ({
  activity,
  index,
}: {
  activity: EducationalActivity;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cfg     = CATEGORY_CONFIG[activity.category];
  const color   = cfg.color;

  const formattedDate = new Date(activity.date).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Card entrance animation
  useEffect(() => {
    let ctx: any;
    let canceled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (canceled) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    });

    return () => {
      canceled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-3xl overflow-hidden opacity-0"
      style={{
        background: 'rgba(15,15,26,0.7)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${color}25`,
        boxShadow: `0 4px 40px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }} />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2"
              style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
            >
              <cfg.Icon size={11} />
              {cfg.label}
            </div>
            <h3 className="text-white font-bold text-lg leading-snug">{activity.title}</h3>
          </div>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <span className="text-sm font-mono font-bold" style={{ color }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Photo strip */}
        <PhotoStrip activity={activity} color={color} />

        {/* Date */}
        <div className="flex items-center gap-2 text-sm" style={{ color: `${color}cc` }}>
          <Calendar size={13} />
          <span className="font-mono">{formattedDate}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">{activity.description}</p>
      </div>
    </div>
  );
};

/* ─── Main Section ──────────────────────────────────────────── */
const EducationalGallery: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    let canceled = false;

    loadGsap().then(({ gsap }) => {
      if (canceled) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
          }
        );
      });
    });

    return () => {
      canceled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-14 opacity-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-indigo-500" />
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">
              Learning Journey
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Educational Activities
          </h2>
          <p className="text-gray-500 text-base max-w-xl">
            Highlights from seminars, workshops, and training programs attended throughout my academic journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationalActivities.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalGallery;