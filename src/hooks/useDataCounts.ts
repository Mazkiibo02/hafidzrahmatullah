
export const useDataCounts = () => {
  // Project data from Projects page
  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      category: "Mobile Development",
      status: "Completed"
    },
    {
      id: 2,
      title: "Cybersecurity Dashboard",
      category: "Cybersecurity",
      status: "In Progress"
    },
    {
      id: 3,
      title: "University Portal System",
      category: "Web Development",
      status: "Completed"
    },
    {
      id: 4,
      title: "IoT Smart Home System",
      category: "IoT",
      status: "Completed"
    },
    {
      id: 5,
      title: "Data Analysis Platform",
      category: "Data Science",
      status: "Completed"
    },
    {
      id: 6,
      title: "Web Scraping Tool",
      category: "Automation",
      status: "Completed"
    }
  ];

  // Certificate data from Certificates page
  const certificates = [
    {
      id: 1,
      title: "Advanced Cybersecurity Fundamentals",
      issuer: "NSHC Korea",
      date: "2024",
      category: "Cybersecurity"
    },
    {
      id: 2,
      title: "Mobile Development with Flutter",
      issuer: "SMT Program",
      date: "2023",
      category: "Mobile Development"
    },
    {
      id: 3,
      title: "Web Development Mastery",
      issuer: "Beasiswa Skripsiku",
      date: "2023",
      category: "Web Development"
    },
    {
      id: 4,
      title: "Data Science with Python",
      issuer: "Tech Academy",
      date: "2023",
      category: "Data Science"
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      issuer: "Cloud Institute",
      date: "2022",
      category: "Cloud Computing"
    },
    {
      id: 6,
      title: "IoT Development Workshop",
      issuer: "Arduino Foundation",
      date: "2022",
      category: "IoT"
    }
  ];

  // Skills data from Skills page
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: ["React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind", "Vue.js"]
    },
    {
      category: "Backend Development", 
      skills: ["Laravel", "Python", "Node.js", "PHP", "Flask", "Express"]
    },
    {
      category: "Mobile Development",
      skills: ["Flutter", "Dart", "React Native", "Android", "iOS"]
    },
    {
      category: "Database & Storage",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "SQLite", "Redis"]
    },
    {
      category: "Tools & Technologies",
      skills: ["Git", "GitHub", "Docker", "VS Code", "Unity", "Arduino"]
    },
    {
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "PHP", "Dart", "C++", "Java"]
    }
  ];

  const totalSkills = skillCategories.reduce((total, category) => {
    // Use Set to get unique skills across categories
    return total + category.skills.length;
  }, 0);

  // Remove duplicates for actual unique count
  const allSkills = skillCategories.flatMap(category => category.skills);
  const uniqueSkills = [...new Set(allSkills)];

  return {
    projectsCount: projects.length,
    certificatesCount: certificates.length,
    skillsCount: uniqueSkills.length
  };
};
