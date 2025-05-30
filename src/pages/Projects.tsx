
import React from 'react';
import { ExternalLink, Github, Code, Smartphone, Globe, Shield } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      description: "A full-featured mobile e-commerce application built with Flutter and Laravel backend. Features include user authentication, product catalog, shopping cart, and payment integration.",
      techStack: ["Flutter", "Laravel", "MySQL", "Stripe API"],
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Smartphone,
      status: "Completed"
    },
    {
      id: 2,
      title: "Cybersecurity Dashboard",
      description: "A real-time cybersecurity monitoring dashboard that tracks network threats, analyzes logs, and provides security insights. Built with Python Flask and integrated with various security tools.",
      techStack: ["Python", "Flask", "MongoDB", "Chart.js", "WebSocket"],
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Shield,
      status: "In Progress"
    },
    {
      id: 3,
      title: "University Portal System",
      description: "A comprehensive web-based portal for university students and faculty. Features academic records, course management, and communication tools built with modern web technologies.",
      techStack: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Globe,
      status: "Completed"
    },
    {
      id: 4,
      title: "IoT Smart Home System",
      description: "An Arduino-based smart home automation system with mobile app control. Includes sensors for temperature, humidity, and security monitoring with real-time notifications.",
      techStack: ["Arduino", "ESP32", "Flutter", "Firebase", "C++"],
      category: "IoT",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Code,
      status: "Completed"
    },
    {
      id: 5,
      title: "Data Analysis Platform",
      description: "A web-based platform for data visualization and analysis using Streamlit. Supports various data formats and provides interactive charts and statistical insights.",
      techStack: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-learn"],
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Code,
      status: "Completed"
    },
    {
      id: 6,
      title: "Web Scraping Tool",
      description: "An automated web scraping tool built with Python that collects and analyzes data from various sources. Features scheduling, data cleaning, and export capabilities.",
      techStack: ["Python", "Selenium", "BeautifulSoup", "SQLite", "Cron"],
      category: "Automation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      githubUrl: "#",
      demoUrl: "#",
      icon: Code,
      status: "Completed"
    }
  ];

  const categories = ["All", "Mobile Development", "Web Development", "Cybersecurity", "IoT", "Data Science", "Automation"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my technical projects spanning web development, mobile apps, cybersecurity, and more
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-lg flex items-center justify-center">
                      <IconComponent className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                    <a
                      href={project.demoUrl}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
