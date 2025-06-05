
import React from 'react';
import { Award, Calendar, ExternalLink, Download } from 'lucide-react';
import TiltedCard from '../components/animations/TiltedCard';
import ClickSpark from '../components/animations/ClickSpark';
import { useCertificates } from '../hooks/useCertificates';

const Certificates = () => {
  const { data: certificates, isLoading } = useCertificates();

  const categories = ["All", "Cybersecurity", "Mobile Development", "Web Development", "Data Science", "Cloud Computing", "IoT"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredCertificates = certificates 
    ? selectedCategory === "All"
      ? certificates
      : certificates.filter(cert => cert.category === selectedCategory)
    : [];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Cybersecurity": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      "Mobile Development": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Web Development": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Data Science": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      "Cloud Computing": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      "IoT": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const isImageFile = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const handleView = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates & Achievements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications and recognitions that validate my technical expertise
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {certificates?.length || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Certificates</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Verified</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              2024
            </div>
            <div className="text-gray-600 dark:text-gray-400">Latest</div>
          </div>
        </div>

        {/* Certificates Grid with TiltedCard Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <TiltedCard key={certificate.id} className="h-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                {/* Certificate Header with Image or Fallback */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                  {isImageFile(certificate.file_url) ? (
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={certificate.file_url}
                        alt={certificate.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.classList.remove('hidden');
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  ) : null}
                  
                  {/* Fallback content - always rendered but hidden if image loads */}
                  <div className={`text-center text-white p-6 ${isImageFile(certificate.file_url) ? 'hidden' : ''}`}>
                    <Award size={48} className="mx-auto mb-4" />
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      {certificate.category}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      <Award size={16} />
                    </div>
                  </div>
                  
                  {/* Category badge for image certificates */}
                  {isImageFile(certificate.file_url) && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                        {certificate.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {certificate.title}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <Calendar size={16} className="mr-2" />
                      {certificate.date} • {certificate.issuer}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {certificate.description}
                    </p>
                  </div>

                  {/* Skills */}
                  {certificate.skills && certificate.skills.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons with Click Spark Animation */}
                  <div className="flex gap-3">
                    <ClickSpark className="flex-1">
                      <button 
                        onClick={() => handleView(certificate.file_url)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View
                      </button>
                    </ClickSpark>
                    <ClickSpark className="flex-1">
                      <button 
                        onClick={() => handleDownload(certificate.file_url, certificate.title)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </button>
                    </ClickSpark>
                  </div>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>

        {/* No Certificates Message */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No certificates found in this category.
            </p>
          </div>
        )}

        {/* Achievement Summary */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Continuous Learning Journey</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              These certifications represent my commitment to staying current with technology trends 
              and continuously improving my skills. Each certificate has contributed to my growth 
              as a developer and cybersecurity enthusiast.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
