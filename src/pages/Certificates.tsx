
import React from 'react';
import { Award, Calendar, ExternalLink, Download } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Advanced Cybersecurity Fundamentals",
      issuer: "NSHC Korea",
      date: "2024",
      category: "Cybersecurity",
      description: "Comprehensive cybersecurity training covering network security, threat analysis, and incident response.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      verified: true,
      skills: ["Network Security", "Threat Analysis", "Incident Response"]
    },
    {
      id: 2,
      title: "Mobile Development with Flutter",
      issuer: "SMT Program",
      date: "2023",
      category: "Mobile Development",
      description: "Intensive training program on Flutter development, covering advanced concepts and best practices.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      verified: true,
      skills: ["Flutter", "Dart", "Mobile UI/UX"]
    },
    {
      id: 3,
      title: "Web Development Mastery",
      issuer: "Beasiswa Skripsiku",
      date: "2023",
      category: "Web Development",
      description: "Comprehensive web development course covering frontend and backend technologies.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      verified: true,
      skills: ["React", "Laravel", "Database Design"]
    },
    {
      id: 4,
      title: "Data Science with Python",
      issuer: "Tech Academy",
      date: "2023",
      category: "Data Science",
      description: "Advanced course on data analysis, machine learning, and data visualization using Python.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      verified: true,
      skills: ["Python", "Pandas", "Machine Learning"]
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      issuer: "Cloud Institute",
      date: "2022",
      category: "Cloud Computing",
      description: "Introduction to cloud services, deployment strategies, and cloud security best practices.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      verified: true,
      skills: ["AWS", "Docker", "DevOps"]
    },
    {
      id: 6,
      title: "IoT Development Workshop",
      issuer: "Arduino Foundation",
      date: "2022",
      category: "IoT",
      description: "Hands-on workshop on IoT development using Arduino and sensor integration.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      verified: true,
      skills: ["Arduino", "C++", "Sensor Programming"]
    }
  ];

  const categories = ["All", "Cybersecurity", "Mobile Development", "Web Development", "Data Science", "Cloud Computing", "IoT"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredCertificates = selectedCategory === "All"
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

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
              {certificates.length}
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

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  {certificate.verified && (
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      <Award size={16} />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(certificate.category)}`}>
                    {certificate.category}
                  </span>
                </div>
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
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <ExternalLink size={16} className="mr-2" />
                    View
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
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
