import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code, Smartphone, Shield, MapPin, GraduationCap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import EducationalGallery from '../components/EducationalGallery';
import { useDataCounts } from '../hooks/useDataCounts';
import { downloadCV } from '../hooks/useCV';

gsap.registerPlugin(ScrollTrigger);

/* Animated counter */
const useCounter = (target: number, inView: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(obj.val)),
    });
  }, [inView, target]);
  return value;
};

/* Stat Card */
const StatCard = ({
  target, label, color, icon, inView,
}: {
  target: number;
  label: string;
  color: string;
  icon: string;
  inView: boolean;
}) => {
  const count = useCounter(target, inView);
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card glow-border rounded-2xl p-5 text-center"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-3xl font-bold counter-value ${color}`}>{count}+</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</div>
    </motion.div>
  );
};

/* Interest Card */
const InterestCard = ({
  icon: Icon, title, description, gradient, delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) => (
  <motion.div
    className="glass-card glow-border rounded-2xl p-8 group relative overflow-hidden cursor-default"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
  >
    <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-700`} />
    <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-white" size={26} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

/* Profile Image */
const ProfileImage = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer rotating ring */}
      <div className="absolute w-80 h-80 rounded-full border border-indigo-400/20 animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-96 h-96 rounded-full border border-purple-400/10 animate-[spin_30s_linear_infinite_reverse]" />

      {/* Glow blob */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />

      {/* Photo frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 animate-float"
      >
        {/* Gradient border */}
        <div className="w-64 h-64 rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/30">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
            <img
              src="/images/me.jpg"
              alt="Hafidz Rahmatullah"
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                // Fallback ke initials kalau foto tidak ada
                e.currentTarget.style.display = 'none';
              }}
            />
            {!loaded && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
                <span className="text-white text-4xl font-bold">HR</span>
              </div>
            )}
          </div>
        </div>

        {/* Floating badge — Available */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -top-2 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-green-400/30 text-green-400 text-xs font-semibold shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available
        </motion.div>

        {/* Floating badge — Location */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -bottom-2 -left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-indigo-400/30 text-indigo-400 text-xs font-semibold shadow-lg"
        >
          <MapPin size={11} />
          Tegal, Indonesia
        </motion.div>
      </motion.div>
    </div>
  );
};

/* Home Page */
const Home = () => {
  const { projectsCount, certificatesCount, skillsCount } = useDataCounts();
  const heroLeftRef  = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroLeftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = async () => {
    try { await downloadCV(); } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen mesh-bg relative overflow-x-hidden">
      <DecorativeAnimations fullBackground={true} />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div ref={heroLeftRef} className="space-y-8" style={{ opacity: 0 }}>

              {/* Meta info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                  <GraduationCap size={12} />
                  D4 Teknik Informatika
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium border border-purple-200 dark:border-purple-800">
                  <MapPin size={12} />
                  Tegal, Indonesia
                </span>
              </motion.div>

              {/* Name */}
              <div>
                <TrueFocus
                  text="Hafidz Rahmatullah"
                  className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                  enableHover={true}
                />
              </div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="space-y-2"
              >
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fullstack Developer passionate about{' '}
                  <span className="gradient-text font-semibold">Web</span>,{' '}
                  <span className="gradient-text font-semibold">Mobile</span>, and{' '}
                  <span className="gradient-text font-semibold">Cybersecurity</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Universitas Harkat Negeri · Currently open to work
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105"
                >
                  Lihat Portofolio
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center justify-center px-8 py-4 glass-card text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:scale-105"
                >
                  <Download className="mr-2" size={20} />
                  Download CV
                </button>
              </motion.div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-2">
                <StatCard target={projectsCount}     label="Projects"      color="text-indigo-500 dark:text-indigo-400"  icon="🚀" inView={statsInView} />
                <StatCard target={certificatesCount} label="Certificates"  color="text-purple-500 dark:text-purple-400"  icon="🏆" inView={statsInView} />
                <StatCard target={skillsCount}       label="Skills"        color="text-pink-500 dark:text-pink-400"       icon="⚡" inView={statsInView} />
              </div>
            </div>

            {/* Right Profile */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <ProfileImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interest Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <TrueFocus
              text="Area of Interest"
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={false}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-300 mt-3"
            >
              Exploring the frontiers of technology
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InterestCard
              icon={Code}
              title="Web & Mobile Development"
              description="Creating responsive web applications and mobile apps using modern frameworks like Flutter, Laravel, and React."
              gradient="bg-gradient-to-br from-indigo-500 to-blue-600"
              delay={0}
            />
            <InterestCard
              icon={Shield}
              title="Cybersecurity"
              description="Passionate about securing digital systems and understanding the latest security threats and countermeasures."
              gradient="bg-gradient-to-br from-purple-500 to-violet-600"
              delay={0.12}
            />
            <InterestCard
              icon={Smartphone}
              title="AI & Data Analysis"
              description="Exploring artificial intelligence, machine learning, and data analysis to extract meaningful insights from data."
              gradient="bg-gradient-to-br from-pink-500 to-rose-600"
              delay={0.24}
            />
          </div>
        </div>
      </section>

      <EducationalGallery />
    </div>
  );
};

export default Home;