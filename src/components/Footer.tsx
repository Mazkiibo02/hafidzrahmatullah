
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, MapPin, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const socialLinks = [
  { href: 'https://github.com/Mazkiibo02',                            Icon: Github,    label: 'GitHub',    color: 'hover:text-white hover:bg-gray-700' },
  { href: 'https://www.linkedin.com/in/hafidz-rahmatullah-a16700256', Icon: Linkedin,  label: 'LinkedIn',  color: 'hover:text-white hover:bg-blue-600' },
  { href: 'https://www.instagram.com/kiibo0202/',                    Icon: Instagram, label: 'Instagram', color: 'hover:text-white hover:bg-pink-600' },
  { href: 'mailto:vdz.rach02@gmail.com',                             Icon: Mail,      label: 'Email',     color: 'hover:text-white hover:bg-indigo-600' },
];

const quickLinks = [
  { path: '/about',        label: 'About Me' },
  { path: '/projects',     label: 'Projects' },
  { path: '/skills',       label: 'Skills' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/contact',      label: 'Contact' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Footer = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer ref={ref} className="relative bg-gray-950 dark:bg-black text-gray-300 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Hafidz Rahmatullah
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mahasiswa Teknik Informatika yang tertarik pada Web, Mobile, dan Cybersecurity. Selalu bersemangat untuk belajar dan berkolaborasi.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-200 ${color}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm animated-underline"
                  >
                    <span className="w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact Info
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:vdz.rach02@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-900/40 transition-colors">
                  <Mail size={14} />
                </div>
                vdz.rach02@gmail.com
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} />
                </div>
                Tegal City, Jawa Tengah, Indonesia
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ExternalLink size={14} />
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Politeknik Harapan Bersama</p>
                  <p className="text-gray-500 text-xs">D4 Teknik Informatika • 2021–Present</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8 origin-left"
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500"
        >
          <p>© {new Date().getFullYear()} Hafidz Rahmatullah. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with
            <span className="gradient-text font-semibold mx-1">React</span>
            &
            <span className="gradient-text font-semibold mx-1">TailwindCSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
