import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import DecorativeAnimations from '../components/DecorativeAnimations';

/* ─── Asymmetric Sidebar Card ──────────────────────────────── */
const SideCard = ({ icon, title, children, delay = 0 }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors duration-500 group"
    >
      <div className="flex items-center mb-6 gap-4">
        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h3>
      </div>
      <div className="pl-4 border-l-2 border-zinc-100 dark:border-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500 selection:text-white pt-32 pb-24 overflow-hidden">
      <DecorativeAnimations fullBackground={true} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

        {/* ── Header (Awwwards Style) ── */}
        <div className="mb-32 relative">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[8vw] font-bold tracking-tighter leading-[0.85] uppercase"
            >
              The Story
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[8vw] font-bold tracking-tighter leading-[0.85] uppercase italic text-indigo-600 dark:text-indigo-400"
            >
              Behind the Code
            </motion.h1>
          </div>
          <motion.div 
            style={{ y: yParallax }}
            className="absolute top-0 right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-24">

          {/* ── Main Biography (Brutalist Typography) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            <div className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Hello! I'm Hafidz Rahmatullah, a passionate Computer Science student currently pursuing my D4 degree in Informatics Engineering at Universitas Harkat Negeri. My journey in technology began with a curiosity about how digital systems work and has evolved into a deep passion for creating innovative solutions.
            </div>
            
            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
            
            <div className="text-lg text-zinc-500 dark:text-zinc-500 leading-relaxed">
              I specialize in web and mobile development, with a particular interest in creating user-friendly applications that solve real-world problems. My technical expertise spans across multiple domains including frontend and backend development, mobile app creation, and cybersecurity.
            </div>
            
            <div className="text-lg text-zinc-500 dark:text-zinc-500 leading-relaxed">
              Beyond coding, I'm fascinated by the intersection of technology and security. Cybersecurity has become one of my primary interests, as I believe in the importance of building secure and robust digital systems in our increasingly connected world.
            </div>
          </motion.div>

          {/* ── Sticky Sidebar ── */}
          <div className="relative">
            <div className="sticky top-32 flex flex-col gap-8">
              <SideCard icon="🎓" title="Education" delay={0.4}>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 text-lg">D4 Informatics Engineering</h4>
                  <p className="text-zinc-500">Universitas Harkat Negeri</p>
                  <div className="mt-2 text-indigo-500 font-mono text-sm uppercase tracking-widest">
                    2021 - Present
                  </div>
                </div>
              </SideCard>

              <SideCard icon="👥" title="Organizations" delay={0.5}>
                <div className="flex flex-col gap-6">
                  {[
                    { title: 'Tech Community Member', desc: 'Active participant in various tech communities' },
                    { title: 'Study Group Leader',    desc: 'Leading programming study sessions' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex flex-col gap-1">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</h4>
                      <p className="text-zinc-500">{desc}</p>
                    </div>
                  ))}
                </div>
              </SideCard>

              <SideCard icon="🏆" title="Achievements" delay={0.6}>
                <ul className="flex flex-col gap-4">
                  {[
                    'Multiple Technical Certifications',
                    'Scholarship Recipient',
                    'Competition Participant',
                  ].map(text => (
                    <li key={text} className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 font-medium">
                      <span className="w-8 h-[2px] bg-indigo-500 flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </SideCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
