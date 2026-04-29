
import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import SpotlightCard from '../components/animations/SpotlightCard';

const socialLinks = [
  { href: 'https://github.com/Mazkiibo02',                            Icon: Github,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/hafidz-rahmatullah-a16700256', Icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://www.instagram.com/kiibo0202/',                    Icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com',                                    Icon: Facebook,  label: 'Facebook' },
  { href: 'https://medium.com/@hafidzr.smkn3tgl',                   Icon: null,      label: 'Medium' },
  { href: 'https://www.youtube.com/channel/UChOAWmlq_FEY2w0RDkIi1HQ', Icon: Youtube, label: 'YouTube' },
  { href: 'https://x.com/hafidzpanca5',                              Icon: Twitter,   label: 'X / Twitter' },
];

const contactInfo = [
  { Icon: Mail,   color: 'from-indigo-500 to-blue-600',   label: 'Email',    value: 'vdz.rach02@gmail.com',                href: 'mailto:vdz.rach02@gmail.com' },
  { Icon: Phone,  color: 'from-purple-500 to-violet-600', label: 'Phone',    value: 'Contact via DM or Email',             href: undefined },
  { Icon: MapPin, color: 'from-pink-500 to-rose-600',     label: 'Location', value: 'Tegal City, Jawa Tengah, Indonesia',  href: undefined },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const formRef    = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000)); // simulate
    setSending(false);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen mesh-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative h-36 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10 pt-4">
            <TrueFocus
              text="Get In Touch"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card glow-border rounded-2xl p-6 space-y-5"
            >
              <TrueFocus
                text="Contact Information"
                className="text-xl font-bold text-gray-900 dark:text-white"
                enableHover={false}
              />
              {contactInfo.map(({ Icon, color, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-gray-800 dark:text-gray-200">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="glass-card glow-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Social Media</h3>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map(({ href, Icon, label }) => (
                  <SpotlightCard key={label} href={href}>
                    {Icon ? (
                      <Icon size={20} className="text-gray-700 dark:text-gray-300" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-800 dark:bg-gray-200 rounded-sm flex items-center justify-center">
                        <span className="text-white dark:text-gray-800 text-xs font-bold">M</span>
                      </div>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h3 className="text-lg font-bold mb-2 relative z-10">Let's Collaborate!</h3>
              <p className="text-indigo-100 text-sm leading-relaxed relative z-10">
                I'm always interested in exciting projects and learning opportunities. Don't hesitate to reach out!
              </p>
            </motion.div>
          </div>

          {/* ── Contact form ── */}
          <div ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card glow-border rounded-2xl p-8"
            >
              <TrueFocus
                text="Send me a message"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project or just say hello!" className={`${inputClass} resize-none`} />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Response time note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 glass-card rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                I typically respond within <span className="text-indigo-500 font-medium">24–48 hours</span>. For urgent matters, reach out via social media.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
