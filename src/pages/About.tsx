
import React, { useRef } from 'react';
import { GraduationCap, Users, Award, Calendar, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import ScrambledText from '../components/animations/ScrambledText';

/* ─── Sidebar card ──────────────────────────────────────────── */
const SideCard = ({
  icon: Icon, iconColor, title, children, delay = 0,
}: {
  icon: React.ElementType; iconColor: string; title: string;
  children: React.ReactNode; delay?: number;
}) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="glass-card glow-border rounded-2xl p-6"
    >
      <div className="flex items-center mb-4 gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

/* ─── Interest list item ────────────────────────────────────── */
const InterestItem = ({ text, color }: { text: string; color: string }) => (
  <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
    {text}
  </li>
);

const About = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef    = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16 relative h-36 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10 pt-4">
            <TrueFocus
              text="About Me"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get to know more about my journey, education, and experiences in the world of technology
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Main Biography ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Bio card */}
            <motion.div
              ref={bioRef}
              initial={{ opacity: 0, y: 40 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass-card glow-border rounded-2xl p-8"
            >
              <TrueFocus
                text="My Story"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              <div className="space-y-4">
                {[
                  { text: "Hello! I'm Hafidz Rahmatullah, a passionate Computer Science student currently pursuing my D4 degree in Teknik Informatika at Politeknik Harapan Bersama. My journey in technology began with a curiosity about how digital systems work and has evolved into a deep passion for creating innovative solutions.", speed: 100 },
                  { text: "I specialize in web and mobile development, with a particular interest in creating user-friendly applications that solve real-world problems. My technical expertise spans across multiple domains including frontend and backend development, mobile app creation, and cybersecurity.", speed: 200 },
                  { text: "Beyond coding, I'm fascinated by the intersection of technology and security. Cybersecurity has become one of my primary interests, as I believe in the importance of building secure and robust digital systems in our increasingly connected world.", speed: 300 },
                  { text: "I'm always eager to learn new technologies and collaborate on projects that challenge me to grow as a developer. Whether it's exploring AI and data analysis or diving deep into the latest web frameworks, I approach every learning opportunity with enthusiasm and dedication.", speed: 400 },
                ].map(({ text, speed }, i) => (
                  <ScrambledText
                    key={i}
                    text={text}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm"
                    scrambleSpeed={30}
                    revealSpeed={speed}
                  />
                ))}
              </div>
            </motion.div>

            {/* Interests card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass-card glow-border rounded-2xl p-8"
            >
              <TrueFocus
                text="Areas of Interest"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                      <Zap size={12} className="text-white" />
                    </span>
                    Development
                  </h3>
                  <ul className="space-y-2">
                    {['Web Development (Frontend & Backend)', 'Mobile App Development', 'Full-Stack Applications', 'API Design & Integration'].map(t => (
                      <InterestItem key={t} text={t} color="bg-indigo-500" />
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Zap size={12} className="text-white" />
                    </span>
                    Emerging Tech
                  </h3>
                  <ul className="space-y-2">
                    {['Artificial Intelligence', 'Cybersecurity', 'Data Analysis', 'IoT & Arduino Projects'].map(t => (
                      <InterestItem key={t} text={t} color="bg-purple-500" />
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <SideCard icon={GraduationCap} iconColor="bg-gradient-to-br from-blue-500 to-indigo-600" title="Education" delay={0}>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">D4 Teknik Informatika</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">Politeknik Harapan Bersama</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                  2021 – Present
                </span>
              </div>
            </SideCard>

            <SideCard icon={Users} iconColor="bg-gradient-to-br from-purple-500 to-violet-600" title="Organizations" delay={0.1}>
              <div className="space-y-4">
                {[
                  { title: 'Tech Community Member', desc: 'Active participant in various tech communities' },
                  { title: 'Study Group Leader',    desc: 'Leading programming study sessions' },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard icon={Award} iconColor="bg-gradient-to-br from-green-500 to-emerald-600" title="Achievements" delay={0.2}>
              <div className="space-y-3">
                {[
                  { text: 'Multiple Technical Certifications', color: 'bg-blue-500' },
                  { text: 'Scholarship Recipient',            color: 'bg-purple-500' },
                  { text: 'Competition Participant',          color: 'bg-green-500' },
                ].map(({ text, color }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard icon={Calendar} iconColor="bg-gradient-to-br from-pink-500 to-rose-600" title="Current Focus" delay={0.3}>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Currently focusing on advanced web development techniques, cybersecurity practices, and exploring AI/ML applications in software development.
              </p>
            </SideCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
