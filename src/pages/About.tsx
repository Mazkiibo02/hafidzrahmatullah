import React from 'react';
import { GraduationCap, Users, Award, Calendar } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Animations */}
        <div className="text-center mb-16 relative h-32 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10">
            <TrueFocus 
              text="About Me"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get to know more about my journey, education, and experiences in the world of technology
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Biography */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <TrueFocus 
                text="My Story"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Hello! I'm Rachmaninov, a passionate Computer Science student currently pursuing 
                  my D4 degree in Teknik Informatika at Politeknik Harapan Bersama. My journey in 
                  technology began with a curiosity about how digital systems work and has evolved 
                  into a deep passion for creating innovative solutions.
                </p>
                <p>
                  I specialize in web and mobile development, with a particular interest in creating 
                  user-friendly applications that solve real-world problems. My technical expertise 
                  spans across multiple domains including frontend and backend development, mobile 
                  app creation, and cybersecurity.
                </p>
                <p>
                  Beyond coding, I'm fascinated by the intersection of technology and security. 
                  Cybersecurity has become one of my primary interests, as I believe in the 
                  importance of building secure and robust digital systems in our increasingly 
                  connected world.
                </p>
                <p>
                  I'm always eager to learn new technologies and collaborate on projects that 
                  challenge me to grow as a developer. Whether it's exploring AI and data analysis 
                  or diving deep into the latest web frameworks, I approach every learning 
                  opportunity with enthusiasm and dedication.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <TrueFocus 
                text="Areas of Interest"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                enableHover={true}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Development
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Web Development (Frontend & Backend)</li>
                    <li>• Mobile App Development</li>
                    <li>• Full-Stack Applications</li>
                    <li>• API Design & Integration</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Emerging Tech
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Artificial Intelligence</li>
                    <li>• Cybersecurity</li>
                    <li>• Data Analysis</li>
                    <li>• IoT & Arduino Projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    D4 Teknik Informatika
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Politeknik Harapan Bersama
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2021 - Present
                  </p>
                </div>
              </div>
            </div>

            {/* Organizational Experience */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="text-purple-600 dark:text-purple-400 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Organizations</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Tech Community Member
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Active participant in various tech communities
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Study Group Leader
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Leading programming study sessions
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Award className="text-green-600 dark:text-green-400 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Multiple Technical Certifications
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Scholarship Recipient
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Competition Participant
                  </span>
                </div>
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Calendar className="mr-3" size={24} />
                <h3 className="text-xl font-bold">Current Focus</h3>
              </div>
              <p className="text-blue-100">
                Currently focusing on advanced web development techniques, 
                cybersecurity practices, and exploring AI/ML applications 
                in software development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
