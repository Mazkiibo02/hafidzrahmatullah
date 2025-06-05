import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code, Smartphone, Shield } from 'lucide-react';
import DecorativeAnimations from '../components/DecorativeAnimations';
import ProfileCard from '../components/animations/ProfileCard';
import TrueFocus from '../components/animations/TrueFocus';
import EducationalGallery from '../components/EducationalGallery';
import { useProfile } from '../hooks/useProfile';
import { useDataCounts } from '../hooks/useDataCounts';
import { downloadCV } from '../hooks/useCV';

const Home = () => {
  const { profile, loading } = useProfile();
  const { projectsCount, certificatesCount, skillsCount } = useDataCounts();

  const handleDownloadCV = async () => {
    try {
      await downloadCV();
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Full Background Animations */}
      <DecorativeAnimations fullBackground={true} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <TrueFocus 
                  text="Hafidz Rahmatullah"
                  className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white"
                  enableHover={true}
                />
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Teknik Informatika students who are interested in Web, Mobile, and Cybersecurity
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  D4 Teknik Informatika • Politeknik Harapan Bersama
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Lihat Portofolio
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <button 
                  onClick={handleDownloadCV}
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-lg"
                >
                  <Download className="mr-2" size={20} />
                  Download CV
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{projectsCount}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{certificatesCount}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{skillsCount}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Skills</div>
                </div>
              </div>
            </div>

            {/* Right Content - Profile Card */}
            <div className="relative flex justify-center lg:justify-end">
              {loading ? (
                <div className="w-80 h-96 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                </div>
              ) : (
                <ProfileCard
                  imageUrl="https://eiotqtgmyswcalxbinkr.supabase.co/storage/v1/object/public/profile-images//profile-20240819.JPG"
                  name={profile?.full_name || "Hafidz Rahmatullah"}
                  role="Teknik Informatika Student"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interest Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <TrueFocus 
              text="Area of Interest"
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              enableHover={true}
            />
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Exploring the frontiers of technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <Code className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Web & Mobile Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating responsive web applications and mobile apps using modern frameworks like Flutter, Laravel, and React.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cybersecurity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Passionate about securing digital systems and understanding the latest security threats and countermeasures.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AI & Data Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Exploring artificial intelligence, machine learning, and data analysis to extract meaningful insights from data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Gallery Section */}
      <EducationalGallery />
    </div>
  );
};

export default Home;
