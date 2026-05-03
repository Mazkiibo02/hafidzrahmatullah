
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Github, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const navItems = [
  { path: '/',             label: 'Home' },
  { path: '/about',        label: 'About' },
  { path: '/projects',     label: 'Projects' },
  { path: '/experience',   label: 'Experience' },
  { path: '/skills',       label: 'Skills' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/contact',      label: 'Contact' },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [isDark,   setIsDark]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location   = useLocation();
  const navRef     = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  /* ── Dark mode init ── */
  useEffect(() => {
    const stored = localStorage.getItem('darkMode') === 'true';
    setIsDark(stored);
    if (stored) document.documentElement.classList.add('dark');
  }, []);

  /* ── GSAP scroll hide/show + scrolled state ── */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const dir = y > lastScrollY.current ? 'down' : 'up';

      if (y < 50) {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
      } else if (dir === 'down') {
        gsap.to(navRef.current, { y: '-100%', duration: 0.3, ease: 'power2.in' });
        setIsOpen(false);
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Reset on route change ── */
  useEffect(() => {
    gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('darkMode', String(next));
    document.documentElement.classList.toggle('dark', next);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20 dark:border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="relative group">
            <span className="font-bold text-xl gradient-text">
              Hafidz Rahmatullah
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} active={isActive(item.path)} />
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-1 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              {[
                { href: 'https://github.com/Mazkiibo02',                          Icon: Github    },
                { href: 'https://www.linkedin.com/in/hafidz-rahmatullah-a16700256', Icon: Linkedin  },
                { href: 'https://www.instagram.com/kiibo0202/',                   Icon: Instagram },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDark}
              whileTap={{ scale: 0.9 }}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button onClick={toggleDark} whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {isActive(item.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 flex-shrink-0" />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── Desktop NavLink with animated active pill ─────────────── */
const NavLink = ({ item, active }: { item: { path: string; label: string }; active: boolean }) => {
  return (
    <Link
      to={item.path}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        active
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-900/30"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </Link>
  );
};

export default Navbar;
