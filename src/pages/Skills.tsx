import React from 'react';
import { Code, Database, Smartphone, Shield, Globe, Cpu } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import TrueFocus from '../components/animations/TrueFocus';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Development",
      icon: Globe,
      color: "blue",
      skills: [
        { name: "React", level: 90 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 88 },
        { name: "TailwindCSS", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Vue.js", level: 70 }
      ]
    },
    {
      category: "Backend Development",
      icon: Database,
      color: "green",
      skills: [
        { name: "Laravel", level: 90 },
        { name: "Python Flask", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "PHP", level: 88 },
        { name: "API Development", level: 85 },
        { name: "RESTful Services", level: 90 }
      ]
    },
    {
      category: "Mobile Development",
      icon: Smartphone,
      color: "purple",
      skills: [
        { name: "Flutter", level: 90 },
        { name: "Dart", level: 85 },
        { name: "GetX", level: 80 },
        { name: "React Native", level: 70 },
        { name: "Android SDK", level: 75 },
        { name: "iOS Development", level: 65 }
      ]
    },
    {
      category: "Database & Storage",
      icon: Database,
      color: "orange",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "SQLite", level: 88 },
        { name: "Redis", level: 70 }
      ]
    },
    {
      category: "Cybersecurity",
      icon: Shield,
      color: "red",
      skills: [
        { name: "Network Security", level: 80 },
        { name: "Penetration Testing", level: 75 },
        { name: "Web Security", level: 85 },
        { name: "Cryptography", level: 70 },
        { name: "OWASP", level: 80 },
        { name: "Security Auditing", level: 75 }
      ]
    },
    {
      category: "Tools & Technologies",
      icon: Cpu,
      color: "indigo",
      skills: [
        { name: "Git/GitHub", level: 95 },
        { name: "Docker", level: 75 },
        { name: "Arduino", level: 85 },
        { name: "Unity", level: 70 },
        { name: "Streamlit", level: 85 },
        { name: "Web Scraping", level: 90 }
      ]
    }
  ];

  const languages = [
    { name: "Python", level: 90, color: "bg-yellow-500" },
    { name: "JavaScript", level: 88, color: "bg-yellow-400" },
    { name: "PHP", level: 85, color: "bg-blue-500" },
    { name: "Dart", level: 80, color: "bg-blue-400" },
    { name: "C++", level: 75, color: "bg-red-500" },
    { name: "Java", level: 70, color: "bg-orange-500" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700",
      green: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700",
      purple: "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700",
      orange: "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700",
      red: "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      purple: "text-purple-600 dark:text-purple-400",
      orange: "text-orange-600 dark:text-orange-400",
      red: "text-red-600 dark:text-red-400",
      indigo: "text-indigo-600 dark:text-indigo-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Animations */}
        <div className="text-center mb-16 relative h-32 overflow-hidden">
          <DecorativeAnimations />
          <div className="relative z-10">
            <TrueFocus 
              text="Technical Skills"
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across various domains
            </p>
          </div>
        </div>

        {/* Programming Languages */}
        <div className="mb-16">
          <TrueFocus 
            text="Programming Languages"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            enableHover={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <div key={language.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {language.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${language.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${language.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.category}
                className={`rounded-xl p-8 shadow-lg border-2 ${getColorClasses(category.color)}`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mr-4 shadow-md">
                    <IconComponent className={getIconColor(category.color)} size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white/50 dark:bg-gray-700/50 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <TrueFocus 
            text="Additional Competencies"
            className="text-2xl font-bold mb-6 text-center text-white"
            enableHover={true}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-blue-100">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold">6+</div>
              <div className="text-blue-100">Frameworks</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-blue-100">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">3+</div>
              <div className="text-blue-100">Years Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
