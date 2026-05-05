import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadGsap } from '@/lib/loadGsap';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import { useDataCounts } from '../hooks/useDataCounts';

/* Data */

const skillCategories = [
  {
    category: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    featured: true,
    skills: [
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           level: 'Expert' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 'Advanced' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 'Expert' },
      { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',  level: 'Expert' },
      { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           level: 'Expert' },
      { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',             level: 'Expert' },
      { name: 'Vue.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',           level: 'Intermediate' },
    ],
  },
  {
    category: 'Backend',
    color: 'from-violet-500 to-purple-400',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-950/30',
    borderColor: 'border-violet-200 dark:border-violet-800',
    textColor: 'text-violet-600 dark:text-violet-400',
    featured: true,
    skills: [
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',   level: 'Expert' },
      { name: 'PHP',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',       level: 'Expert' },
      { name: 'Python',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 'Advanced' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 'Intermediate' },
      { name: 'Flask',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',   level: 'Intermediate' },
    ],
  },
  {
    category: 'Mobile',
    color: 'from-emerald-500 to-teal-400',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    featured: false,
    skills: [
      { name: 'Flutter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', level: 'Advanced' },
      { name: 'Dart',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',       level: 'Advanced' },
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',     level: 'Intermediate' },
      { name: 'Android',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', level: 'Beginner' },
    ],
  },
  {
    category: 'Database',
    color: 'from-orange-500 to-amber-400',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-600 dark:text-orange-400',
    featured: false,
    skills: [
      { name: 'MySQL',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',       level: 'Expert' },
      { name: 'MongoDB',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',   level: 'Advanced' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',    level: 'Intermediate' },
      { name: 'SQLite',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',     level: 'Intermediate' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 'Beginner' },
    ],
  },
  {
    category: 'Tools',
    color: 'from-pink-500 to-rose-400',
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950/30',
    borderColor: 'border-pink-200 dark:border-pink-800',
    textColor: 'text-pink-600 dark:text-pink-400',
    featured: false,
    skills: [
      { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',       level: 'Expert' },
      { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 'Expert' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 'Expert' },
      { name: 'Docker',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 'Beginner' },
      { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', level: 'Intermediate' },
    ],
  },
  {
    category: 'Languages',
    color: 'from-indigo-500 to-blue-400',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    featured: false,
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',       level: 'Advanced' },
      { name: 'C++',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', level: 'Intermediate' },
      { name: 'Java',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',           level: 'Intermediate' },
      { name: 'C#',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',       level: 'Beginner' },
      { name: 'Dart',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',           level: 'Advanced' },
    ],
  },
];

const levelConfig = {
  Expert:       { width: 'w-full',    color: 'bg-gradient-to-r from-indigo-500 to-purple-500', label: 'Expert' },
  Advanced:     { width: 'w-4/5',     color: 'bg-gradient-to-r from-blue-500 to-indigo-500',   label: 'Advanced' },
  Intermediate: { width: 'w-3/5',     color: 'bg-gradient-to-r from-cyan-500 to-blue-500',     label: 'Intermediate' },
  Beginner:     { width: 'w-2/5',     color: 'bg-gradient-to-r from-teal-400 to-cyan-500',     label: 'Beginner' },
};

/* Animated Counter */

const useCounter = (target: number, inView: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let canceled = false;
    let tween: any;
    const obj = { val: 0 };
    loadGsap().then(({ gsap }) => {
      if (canceled) return;
      tween = gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => setValue(Math.round(obj.val)),
      });
    });
    return () => {
      canceled = true;
      tween?.kill();
    };
  }, [inView, target]);
  return value;
};

const StatCard = ({
  target,
  label,
  inView,
}: {
  target: number;
  label: string;
  inView: boolean;
}) => {
  const count = useCounter(target, inView);
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white counter-value">{count}+</div>
      <div className="text-indigo-200 text-sm mt-1">{label}</div>
    </div>
  );
};

/* Skill Icon with fallback */

const SkillIcon = ({ skill, size = 'md' }: { skill: { name: string; icon: string }; size?: 'sm' | 'md' | 'lg' }) => {
  const [error, setError] = useState(false);
  const sizeClass = size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-7 h-7' : 'w-5 h-5';
  const wrapClass = size === 'lg' ? 'w-14 h-14' : size === 'md' ? 'w-10 h-10' : 'w-8 h-8';

  return (
    <div className={`${wrapClass} rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0`}>
      {!error ? (
        <img
          src={skill.icon}
          alt={skill.name}
          className={`${sizeClass} object-contain`}
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-xs font-bold text-indigo-500">
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
};

/* Featured Bento Card (large) */

const FeaturedCard = ({
  cat,
  index,
}: {
  cat: typeof skillCategories[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
      cleanup = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass-card glow-border rounded-3xl p-6 border ${cat.borderColor} ${cat.bgLight} ${cat.bgDark} opacity-0`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className={`text-xs font-semibold uppercase tracking-widest ${cat.textColor}`}>
            Primary Stack
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
            {cat.category}
          </h3>
        </div>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
          <span className="text-white text-xs font-bold">{cat.skills.length}</span>
        </div>
      </div>

      {/* Skill rows with progress */}
      <div className="space-y-4">
        {cat.skills.map((skill, i) => {
          const lvl = levelConfig[skill.level as keyof typeof levelConfig];
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <SkillIcon skill={skill} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {skill.name}
                  </span>
                  <span className={`text-xs font-medium ml-2 flex-shrink-0 ${cat.textColor}`}>
                    {lvl.label}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${lvl.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: lvl.width.replace('w-', '').replace('full', '100%').replace('4/5', '80%').replace('3/5', '60%').replace('2/5', '40%') }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* Regular Bento Card (small/medium) */

const RegularCard = ({
  cat,
  index,
}: {
  cat: typeof skillCategories[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
      cleanup = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass-card glow-border rounded-3xl p-5 border ${cat.borderColor} ${cat.bgLight} ${cat.bgDark} opacity-0`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md flex-shrink-0`}>
          <span className="text-white text-xs font-bold">{cat.skills.length}</span>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">{cat.category}</h3>
      </div>

      {/* Icon grid */}
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: 'backOut' }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="flex flex-col items-center gap-1 group"
            title={skill.name}
          >
            <SkillIcon skill={skill} size="sm" />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* Main Page */

const Skills = () => {
  const { projectsCount, skillsCount } = useDataCounts();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats observer
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const frameworksCount = skillCategories
    .filter((c) =>
      ['Backend', 'Mobile', 'Database'].includes(c.category)
    )
    .reduce((t, c) => t + c.skills.length, 0);

  const featuredCats  = skillCategories.filter((c) => c.featured);
  const regularCats   = skillCategories.filter((c) => !c.featured);

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 relative h-36 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10 pt-4">
            <TrueFocus
              text="Technical Skills"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              A comprehensive showcase of my technical expertise across various domains
            </motion.p>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="space-y-6">

          {/* Row 1: Two featured cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredCats.map((cat, i) => (
              <FeaturedCard key={cat.category} cat={cat} index={i} />
            ))}
          </div>

          {/* Row 2: Four regular cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {regularCats.map((cat, i) => (
              <RegularCard key={cat.category} cat={cat} index={i} />
            ))}
          </div>

        </div>

        {/* ── Stats Banner ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 relative overflow-hidden rounded-3xl p-10 text-white"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <TrueFocus
              text="Technical Proficiency"
              className="text-2xl font-bold mb-8 text-center text-white"
              enableHover={true}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard target={skillsCount}     label="Technologies"   inView={statsInView} />
              <StatCard target={frameworksCount} label="Frameworks"     inView={statsInView} />
              <StatCard target={projectsCount}   label="Projects"       inView={statsInView} />
              <StatCard target={3}               label="Years Learning" inView={statsInView} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Skills;