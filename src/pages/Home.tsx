import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Shield, BrainCircuit } from 'lucide-react';
import CVPreviewModal from '../components/CVpreviewmodal';
import DecorativeAnimations from '../components/DecorativeAnimations';
const EducationalGallery = React.lazy(() => import('../components/EducationalGallery'));
import { useDataCounts } from '../hooks/useDataCounts';

/* ─── Magnetic Button ────────────────────────────────────── */
const MagneticButton = ({ children, className, onClick, isLink, to }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const inner = (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`relative cursor-pointer ${className}`}
    >
      {isLink ? (
        <Link to={to} className="w-full h-full block" onClick={onClick}>{inner}</Link>
      ) : (
        <button className="w-full h-full block" onClick={onClick}>{inner}</button>
      )}
    </div>
  );
};

/* ─── Kinetic Marquee ────────────────────────────────────── */
const Marquee = ({ text }: { text: string }) => (
  <div className="relative w-full overflow-hidden whitespace-nowrap bg-indigo-600 dark:bg-indigo-500 py-4 flex items-center -rotate-2 scale-105 my-24">
    <motion.div
      className="flex whitespace-nowrap text-white font-mono text-xl uppercase tracking-[0.1em]"
      animate={{ x: [0, -1035] }}
      transition={{ ease: "linear", duration: 10, repeat: Infinity }}
    >
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="mx-4">{text}</span>
          <span className="mx-4">•</span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

/* ─── Asymmetric Stat Card ───────────────────────────────── */
const StatCard = ({ label, value, delay }: { label: string; value: number, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col border-t-2 border-zinc-900 dark:border-white pt-4"
  >
    <span className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white">
      {value}
    </span>
    <span className="text-sm font-mono uppercase tracking-widest text-zinc-500 mt-2">
      {label}
    </span>
  </motion.div>
);

const Home = () => {
  const { projectsCount, certificatesCount, skillsCount } = useDataCounts();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      <DecorativeAnimations fullBackground={true} />
      
      {/* ─── Hero Section (Awwwards Style) ─── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-16">
        
        {/* Floating Badge */}
        <motion.div 
          className="absolute top-32 left-6 md:left-12 lg:left-24 z-20 flex gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open to work
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
          
          {/* Left: Giant Typography */}
          <div className="lg:col-span-8 flex flex-col gap-2 relative z-20">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14vw] lg:text-[9vw] font-bold tracking-tighter leading-[0.85] uppercase"
              >
                HAFIDZ
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-center gap-6">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10vw] lg:text-[7vw] font-bold tracking-tighter leading-[0.85] uppercase italic text-indigo-600 dark:text-indigo-400"
              >
                RAHMATULLAH
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 text-xl md:text-2xl font-medium max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              Fullstack Developer engineering high-performance web, mobile, and secure digital experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-6 mt-12"
            >
              <MagneticButton 
                isLink to="/projects"
                className="h-16 px-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-lg overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Work <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </MagneticButton>

              <MagneticButton 
                onClick={() => setIsCVOpen(true)}
                className="h-16 px-8 rounded-full border-2 border-zinc-200 dark:border-zinc-800 font-semibold text-lg hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
              >
                Review CV
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Parallax Image */}
          <div className="lg:col-span-4 relative h-[45vh] md:h-[60vh] lg:h-[80vh] w-full mt-12 lg:mt-0 block">
            <motion.div 
              style={{ y: yParallax }}
              className="absolute top-0 right-0 w-full h-full rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair origin-bottom border border-zinc-200 dark:border-zinc-800"
            >
              <img 
                src="/images/me.jpeg" 
                alt="Hafidz"
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Marquee Break ─── */}
      <Marquee text="Web Development • Cybersecurity • Mobile Apps • UI/UX Design • Fullstack Engineering" />

      {/* ─── Stats Section (Brutalist) ─── */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <StatCard label="Completed Projects" value={projectsCount} delay={0} />
          <StatCard label="Certifications" value={certificatesCount} delay={0.1} />
          <StatCard label="Technical Skills" value={skillsCount} delay={0.2} />
        </div>
      </section>

      {/* ─── Area of Interest (Bento Layout) ─── */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] mx-4 md:mx-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">Disciplines</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Bento 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="relative z-10">
                <Code size={40} className="text-indigo-500 mb-6" />
                <h3 className="text-3xl font-bold tracking-tight mb-3">Web & Mobile</h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-lg">
                  Engineering fluid, responsive applications with React, Tailwind, and scalable backends.
                </p>
              </div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
            </motion.div>

            {/* Bento 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-4 bg-zinc-50 dark:bg-zinc-950 rounded-3xl p-10 flex flex-col justify-between group"
            >
              <Shield size={40} className="text-emerald-500 mb-6" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Cybersecurity</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Implementing robust security architectures and threat mitigation.
                </p>
              </div>
            </motion.div>

            {/* Bento 3 (Wide Parallax) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-12 bg-indigo-600 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-start md:items-end text-white overflow-hidden relative group"
            >
              <div className="relative z-10 max-w-xl">
                <BrainCircuit size={40} className="text-indigo-200 mb-6" />
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">AI & Data</h3>
                <p className="text-indigo-100 text-lg leading-relaxed">
                  Leveraging machine learning models and data pipelines to extract actionable insights and automate workflows.
                </p>
              </div>
              <motion.div 
                style={{ y: yParallaxSlow }}
                className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <React.Suspense fallback={<div className="h-[60vh] bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />}>
          <EducationalGallery />
        </React.Suspense>
      </section>

      <CVPreviewModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
};

export default Home;