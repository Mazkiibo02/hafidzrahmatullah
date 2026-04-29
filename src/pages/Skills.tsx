
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import CircularGallery from '../components/animations/CircularGallery';
import { useDataCounts } from '../hooks/useDataCounts';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated counter ──────────────────────────────────────── */
const useCounter = (target: number, inView: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, { val: target, duration: 1.8, ease: 'power2.out', onUpdate: () => setValue(Math.round(obj.val)) });
  }, [inView, target]);
  return value;
};

const StatCard = ({ target, label, inView }: { target: number; label: string; inView: boolean }) => {
  const count = useCounter(target, inView);
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white counter-value">{count}+</div>
      <div className="text-indigo-200 text-sm mt-1">{label}</div>
    </div>
  );
};

const skillCategories = [
  {
    category: 'Frontend Development', direction: 'left' as const,
    skills: [
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
    ],
  },
  {
    category: 'Backend Development', direction: 'right' as const,
    skills: [
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
      { name: 'Python',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'PHP',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Flask',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    ],
  },
  {
    category: 'Mobile Development', direction: 'left' as const,
    skills: [
      { name: 'Flutter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Dart',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Android',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    ],
  },
  {
    category: 'Database & Storage', direction: 'right' as const,
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Firebase',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'SQLite',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
  },
  {
    category: 'Tools & Technologies', direction: 'left' as const,
    skills: [
      { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Unity',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    ],
  },
  {
    category: 'Programming Languages', direction: 'right' as const,
    skills: [
      { name: 'C++',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C#',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    ],
  },
];

const Skills = () => {
  const { projectsCount, skillsCount } = useDataCounts();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const frameworksCount = skillCategories
    .filter(c => ['Backend Development', 'Mobile Development', 'Database & Storage'].includes(c.category))
    .reduce((t, c) => t + c.skills.length, 0);

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative h-36 overflow-hidden">
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

        {/* Skill galleries */}
        <div className="space-y-12">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
            >
              <CircularGallery
                title={cat.category}
                skills={cat.skills}
                direction={cat.direction}
                speed={30}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 relative overflow-hidden rounded-3xl p-10 text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <TrueFocus
              text="Technical Proficiency"
              className="text-2xl font-bold mb-8 text-center text-white"
              enableHover={true}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard target={skillsCount}      label="Technologies"  inView={statsInView} />
              <StatCard target={frameworksCount}  label="Frameworks"    inView={statsInView} />
              <StatCard target={projectsCount}    label="Projects"      inView={statsInView} />
              <StatCard target={3}                label="Years Learning" inView={statsInView} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
