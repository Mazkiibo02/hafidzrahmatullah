
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code, Smartphone, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import DecorativeAnimations from '../components/DecorativeAnimations';
import ProfileCard from '../components/animations/ProfileCard';
import TrueFocus from '../components/animations/TrueFocus';
import EducationalGallery from '../components/EducationalGallery';
import { useProfile } from '../hooks/useProfile';
import { useDataCounts } from '../hooks/useDataCounts';
import { downloadCV } from '../hooks/useCV';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated counter hook ─────────────────────────────────── */
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

/* ─── Stat item ─────────────────────────────────────────────── */
const StatItem = ({
  target, label, color, inView,
}: { target: number; label: string; color: string; inView: boolean }) => {
  const count = useCounter(target, inView);
  return (
    <div className="text-center stat-item">
      <div className={`text-4xl font-bold counter-value ${color}`}>{count}+</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</div>
    </div>
  );
};

/* ─── Interest card ─────────────────────────────────────────── */
const InterestCard = ({
  icon: Icon, title, description, gradient, delay,
}: {
  icon: React.ElementType; title: string; description: string;
  gradient: string; delay: number;
}) => (
  <motion.div
    className="interest-card glass-card glow-border rounded-2xl p-8 group relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
  >
    {/* Gradient blob on hover */}
    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

    <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
      <Icon className="text-white" size={26} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

/* ─── Home page ─────────────────────────────────────────────── */
const Home = () => {
  const { profile, loading } = useProfile();
  const { projectsCount, certificatesCount, skillsCount } = useDataCounts();

  const heroLeftRef  = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroLeftRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(heroRightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  /* Trigger counter when stats section enters viewport */
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = async () => {
    try { await downloadCV(); } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen mesh-bg relative">
      <DecorativeAnimations fullBackground={true} />

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div ref={heroLeftRef} className="space-y-8">
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for opportunities
              </motion.div>

              <div className="space-y-4">
                <TrueFocus
                  text="Hafidz Rahmatullah"
                  className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white"
                  enableHover={true}
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Teknik Informatika student passionate about{' '}
                  <span className="gradient-text font-semibold">Web</span>,{' '}
                  <span className="gradient-text font-semibold">Mobile</span>, and{' '}
                  <span className="gradient-text font-semibold">Cybersecurity</span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-base text-gray-500 dark:text-gray-400"
                >
                  D4 Teknik Informatika • Politeknik Harapan Bersama
                </motion.p>
              </div>

              {/* CTA Buttons */}
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
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <Download className="mr-2" size={20} />
                  Download CV
                </button>
              </motion.div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-4">
                <StatItem target={projectsCount}    label="Projects"     color="text-indigo-600 dark:text-indigo-400"  inView={statsInView} />
                <StatItem target={certificatesCount} label="Certificates" color="text-purple-600 dark:text-purple-400"  inView={statsInView} />
                <StatItem target={skillsCount}       label="Skills"       color="text-pink-600 dark:text-pink-400"      inView={statsInView} />
              </div>
            </div>

            {/* Right — Profile Card */}
            <div ref={heroRightRef} className="relative flex justify-center lg:justify-end">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full border border-indigo-200/30 dark:border-indigo-800/30 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-96 h-96 rounded-full border border-purple-200/20 dark:border-purple-800/20 animate-[spin_30s_linear_infinite_reverse]" />
              </div>

              {loading ? (
                <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                  </div>
                </div>
              ) : (
                <div className="animate-float">
                  <ProfileCard
                    imageUrl="https://eiotqtgmyswcalxbinkr.supabase.co/storage/v1/object/public/profile-images//profile-20240819.JPG"
                    name={profile?.full_name || 'Hafidz Rahmatullah'}
                    role="Teknik Informatika Student"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interest Areas ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <TrueFocus
              text="Area of Interest"
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300"
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
              delay={0.1}
            />
            <InterestCard
              icon={Smartphone}
              title="AI & Data Analysis"
              description="Exploring artificial intelligence, machine learning, and data analysis to extract meaningful insights from data."
              gradient="bg-gradient-to-br from-pink-500 to-rose-600"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ── Educational Gallery ── */}
      <EducationalGallery />
    </div>
  );
};

export default Home;
