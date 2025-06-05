import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';
import SpotlightCard from '../components/animations/SpotlightCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented when Supabase is connected
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Animations */}
        <div className="text-center mb-16 relative h-32 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10">
            <TrueFocus 
              text="Get In Touch"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <TrueFocus 
                text="Contact Information"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">vdz.rach02@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+62... You can contact me via DM or Email</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Tegal City, Jawa Tengah, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media with Spotlight Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <TrueFocus 
                text="Social Media"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              
              <div className="grid grid-cols-3 gap-4">
                <SpotlightCard href="https://github.com/Mazkiibo02">
                  <Github className="text-gray-700 dark:text-gray-300" size={24} />
                </SpotlightCard>
                <SpotlightCard href="https://www.linkedin.com/in/hafidz-rahmatullah-a16700256">
                  <Linkedin className="text-blue-600 dark:text-blue-400" size={24} />
                </SpotlightCard>
                <SpotlightCard href="https://www.instagram.com/kiibo0202/">
                  <Instagram className="text-pink-600 dark:text-pink-400" size={24} />
                </SpotlightCard>
                <SpotlightCard href="https://facebook.com">
                  <Facebook className="text-blue-700 dark:text-blue-500" size={24} />
                </SpotlightCard>
                <SpotlightCard href="https://medium.com/@hafidzr.smkn3tgl">
                  <div className="w-6 h-6 bg-gray-800 dark:bg-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-white dark:text-gray-800 text-xs font-bold">M</span>
                  </div>
                </SpotlightCard>
                <SpotlightCard href="https://www.youtube.com/channel/UChOAWmlq_FEY2w0RDkIi1HQ">
                  <Youtube className="text-red-600 dark:text-red-400" size={24} />
                </SpotlightCard>
                <SpotlightCard href="https://x.com/hafidzpanca5">
                  <Twitter className="text-blue-500 dark:text-blue-400" size={24} />
                </SpotlightCard>
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Let's Collaborate!</h3>
              <p className="text-blue-100 text-sm">
                I'm always interested in exciting projects and learning opportunities. 
                Don't hesitate to reach out if you'd like to work together!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <TrueFocus 
                text="Send me a message"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Response Time
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I typically respond to messages within 24-48 hours. For urgent matters, 
                please feel free to reach out via phone or connect with me on social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
