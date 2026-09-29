import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from "@emailjs/browser";

// --- DATA DEFINITIONS ---

const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certificates', 'Contact'];

const projectsData = [
  {
    id: 1,
    title: "AI Resume Reviewer",
    category: "Full Stack & AI",
    badge: "Featured Flagship",
    description: "An AI-powered resume analysis platform that evaluates CVs against job descriptions, extracts PDF content, generates ATS compatibility scores, pinpoint strengths & weaknesses, and provides custom interview questions using Google Gemini AI.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini AI", "JWT", "Multer"],
    liveLink: "https://resume-ai-analyzer-xi.vercel.app",
    githubLink: "https://github.com/tfaryanraj07/ResumeAi-Analyzer",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    points: [
      "Secure JWT authentication and comprehensive user session & analysis history management.",
      "Engineered PDF resume upload, text extraction, and storage pipeline using Multer and MongoDB.",
      "Integrated Google Gemini AI for instant ATS scoring, personalized critique, and tailor-made interview prep."
    ]
  },
  {
    id: 2,
    title: "Better City Resolution",
    category: "Full Stack & AI",
    badge: "Civic Tech",
    description: "A community-focused civic reporting platform empowering citizens to report municipal infrastructure issues (potholes, water leaks, broken streetlights), upload photographic evidence, and track real-time resolution status.",
    techStack: ["MySQL", "MongoDB", "Java", "Spring Boot", "HTML5", "CSS3", "JavaScript", "REST APIs"],
    liveLink: "https://tfaryanraj07.github.io/Better-city-resolution/",
    githubLink: "https://github.com/tfaryanraj07/Better-city-resolution",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    points: [
      "Enables public complaint logging and live tracking via intuitive REST API integration.",
      "Community upvoting algorithm that prioritizes critical municipal issues for municipal authorities.",
      "Dual database architecture utilizing MongoDB for complaint logs and MySQL for structured citizen records."
    ]
  },
  {
    id: 3,
    title: "Runfinity (Infinity Run)",
    category: "Frontend & Games",
    badge: "Interactive Game",
    description: "A high-performance browser-based endless runner fitness platform built with pure web technologies. Features dynamic obstacle collision physics, activity tracking, dynamic workout stats, and interactive leaderboards.",
    techStack: ["HTML5 Canvas", "CSS3", "JavaScript", "WebSockets"],
    liveLink: "https://tfaryanraj07.github.io/infintyrun/",
    githubLink: "https://github.com/tfaryanraj07/infintyrun",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    points: [
      "Custom physics and smooth 60fps canvas rendering for responsive runner navigation.",
      "Dynamic activity tracking simulating workout progress and runner stamina metrics.",
      "Real-time scoreboard and engaging gameplay mechanics optimized for both mobile and desktop."
    ]
  },
  {
    id: 4,
    title: "FitTrack AI",
    category: "Full Stack & AI",
    badge: "Health & Fitness",
    description: "An intelligent fitness and wellness tracking application designed to help users track workout routines, monitor nutritional metrics, and achieve personalized health milestones with AI-driven insights.",
    techStack: ["React.js", "Node.js", "AI Integration", "Tailwind CSS", "REST APIs"],
    liveLink: "https://fittrack-ai-xi.vercel.app",
    githubLink: "https://github.com/tfaryanraj07/fittrack-ai",
    gradient: "from-rose-500 via-pink-600 to-indigo-600",
    points: [
      "Personalized daily workout generation and adaptive exercise suggestions.",
      "Interactive data visualizations displaying weekly calories, active minutes, and fitness streaks.",
      "Clean modern UI with glassmorphic cards and instant mobile responsiveness."
    ]
  },
  {
    id: 5,
    title: "Task Manager Pro",
    category: "Full Stack & AI",
    badge: "Productivity",
    description: "A full-featured task and project management suite built for agile organization. Provides status boards, priority tagging, completion analytics, deadline alerts, and persistent cloud storage.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    liveLink: "https://task-manager-phi-indol-17.vercel.app",
    githubLink: "https://github.com/tfaryanraj07/Task-manager",
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    points: [
      "Kanban-style workflow with smooth task categorization, filtering, and priority states.",
      "Robust backend REST APIs for CRUD operations and user session tracking.",
      "Clean dashboard with real-time progress percentages and pending milestone indicators."
    ]
  },
  {
    id: 6,
    title: "Developer Portfolio Website",
    category: "Frontend & Games",
    badge: "Personal Showcase",
    description: "The very site you are viewing — engineered from the ground up to showcase skills, verified credentials, and full-stack projects with smooth animations, dark/light themes, and full mobile optimization.",
    techStack: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
    liveLink: "https://tfaryanraj07.github.io/raj-portfolio",
    githubLink: "https://github.com/tfaryanraj07/raj-portfolio",
    gradient: "from-violet-600 via-purple-600 to-indigo-800",
    points: [
      "Ultra-fast loading with Vite bundler and modular React component architecture.",
      "Framer Motion entrance, hover, and scroll-triggered animations.",
      "Interactive certificate lightbox modal and seamless resume PDF preview & download."
    ]
  }
];

const internshipsData = [
  {
    id: 1,
    role: "Full Stack Development Intern",
    company: "Khabai Tech",
    period: "1 Jun 2026 – 1 Aug 2026",
    badge: "Recent",
    type: "Internship",
    descriptionPoints: [
      "Created responsive web interfaces and integrated frontend components with backend services to deliver functional full-stack applications.",
      "Developed and consumed REST APIs for efficient data exchange between client-side interfaces and server-side application logic.",
      "Worked with database operations, API testing, debugging, and Git-based version control throughout the software development workflow.",
      "Applied full-stack best practices to build maintainable application features and improve overall user experience."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "REST APIs", "Git", "Database Operations"]
  },
  {
    id: 2,
    role: "Java Full Stack Intern",
    company: "EduSkills Academy",
    period: "Jan 2026 – Mar 2026",
    badge: "Java / Spring",
    type: "Virtual Internship",
    descriptionPoints: [
      "Gained hands-on experience building full-stack applications using HTML, CSS, Bootstrap, JavaScript, and jQuery.",
      "Engineered backend modules using Core Java, Advanced Java, Spring Framework, Spring Boot, and Hibernate ORM.",
      "Designed MySQL database schemas, built complex queries, and implemented secure CRUD operations using Hibernate."
    ],
    techStack: ["Core Java", "Advanced Java", "Spring Boot", "Hibernate ORM", "MySQL", "Bootstrap", "jQuery"]
  },
  {
    id: 3,
    role: "Full-Stack Developer Intern",
    company: "CertED Technologies, Haridwar University",
    period: "2 Jun 2025 – 3 Jul 2025",
    location: "Roorkee, Uttarakhand",
    badge: "Verified Certificate",
    type: "Internship",
    certificateImage: "/images/internship.jpg",
    descriptionPoints: [
      "Built responsive React components optimized for desktop and mobile devices, improving usability and maintainability.",
      "Developed reusable React components to improve UI consistency and simplify maintenance across multiple application pages.",
      "Used Git for version control, Postman for API testing, and VS Code to streamline development and debugging workflows."
    ],
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "Postman", "VS Code"]
  }
];

const skillsCategories = [
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "Java", level: "Advanced", icon: "☕" },
      { name: "JavaScript", level: "Advanced", icon: "⚡" },
      { name: "Python", level: "Intermediate", icon: "🐍" },
      { name: "C", level: "Intermediate", icon: "⚙️" },
      { name: "SQL", level: "Advanced", icon: "🗄️" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: "🛠️",
    skills: [
      { name: "React.js", level: "Advanced", icon: "⚛️" },
      { name: "Node.js", level: "Advanced", icon: "🟢" },
      { name: "Express.js", level: "Advanced", icon: "🚂" },
      { name: "Spring Boot", level: "Intermediate", icon: "🍃" },
      { name: "Hibernate", level: "Intermediate", icon: "🔄" },
      { name: "Tailwind CSS", level: "Advanced", icon: "🎨" },
      { name: "Bootstrap", level: "Advanced", icon: "🅱️" }
    ]
  },
  {
    title: "Databases & Storage",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", level: "Advanced", icon: "🍃" },
      { name: "MySQL", level: "Advanced", icon: "🐬" }
    ]
  },
  {
    title: "Developer Tools & DevOps",
    icon: "🔧",
    skills: [
      { name: "Git", level: "Advanced", icon: "🌳" },
      { name: "GitHub", level: "Advanced", icon: "🐙" },
      { name: "Docker", level: "Intermediate", icon: "🐳" },
      { name: "Postman", level: "Advanced", icon: "📮" },
      { name: "VS Code", level: "Advanced", icon: "💻" },
      { name: "IntelliJ IDEA", level: "Intermediate", icon: "💡" },
      { name: "Vercel", level: "Advanced", icon: "▲" },
      { name: "Render", level: "Intermediate", icon: "🚀" }
    ]
  },
  {
    title: "Core Computer Science",
    icon: "🧠",
    skills: [
      { name: "Data Structures & Algorithms", level: "Strong", icon: "🧩" },
      { name: "Object-Oriented Programming (OOP)", level: "Strong", icon: "🏗️" },
      { name: "Database Management Systems (DBMS)", level: "Strong", icon: "💾" },
      { name: "Computer Networks", level: "Good", icon: "🌐" },
      { name: "Operating Systems", level: "Good", icon: "🖥️" }
    ]
  }
];

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "Haridwar University",
    location: "Roorkee, Uttarakhand",
    duration: "2023 – 2027",
    score: "74.21%",
    badge: "Current (3rd Year)",
    highlights: [
      "Focused on Data Structures, Algorithms, Software Engineering, and Database Architecture.",
      "Participated in Smart India Hackathon internal rounds and student technology initiatives.",
      "Consistently maintained strong academic standing with practical full-stack projects."
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary (Class XII)",
    field: "Science Stream (PCM)",
    institution: "Sahid Shakti Nath Mahto Smarak School",
    location: "Sijua, Jharkhand",
    duration: "Completed 2022",
    score: "72.2%",
    badge: "Class XII",
    highlights: [
      "Core focus on Physics, Chemistry, and Mathematics.",
      "Active participation in science exhibitions and computer clubs."
    ]
  },
  {
    id: 3,
    degree: "Secondary School Examination (Class X)",
    field: "General Curriculum",
    institution: "Sahid Shakti Nath Mahto Smarak School",
    location: "Sijua, Jharkhand",
    duration: "Completed 2020",
    score: "78.0%",
    badge: "Class X",
    highlights: [
      "Strong foundational performance in Mathematics and Science."
    ]
  }
];

const certificatesData = [
  {
    id: 1,
    title: "Mastering JavaScript Fundamentals",
    issuer: "Geekster",
    date: "June 2024",
    image: "/images/geekster.jpg",
    hasImage: true,
    tag: "Programming"
  },
  {
    id: 2,
    title: "Advanced Relational Database and SQL",
    issuer: "Coursera",
    date: "January 2025",
    image: "/images/Advancedrelational.jpg",
    hasImage: true,
    tag: "Database"
  },
  {
    id: 3,
    title: "Introduction to Front-End Development",
    issuer: "Coursera",
    date: "January 2025",
    image: "/images/frontend.jpg",
    hasImage: true,
    tag: "Frontend"
  },
  {
    id: 4,
    title: "Digital Productivity With AI",
    issuer: "YuWaah!",
    date: "January 2025",
    image: null,
    hasImage: false,
    tag: "AI & Tools"
  },
  {
    id: 5,
    title: "Data Analytics and Visualization Job Simulation",
    issuer: "Forage - Accenture",
    date: "January 2025",
    image: null,
    hasImage: false,
    tag: "Data Analytics"
  },
  {
    id: 6,
    title: "Internal Smart India Hackathon (SIH)",
    issuer: "Haridwar University",
    date: "September 2025",
    image: "/images/SIH certificate.jpg",
    hasImage: true,
    tag: "Hackathon"
  },
  {
    id: 7,
    title: "Introduction to Computer Training",
    issuer: "IIT Bombay",
    date: "December 2023",
    image: "/images/WhatsAppImage_IITBombay.jpeg",
    hasImage: true,
    tag: "Computer Science"
  },
  {
    id: 8,
    title: "IBM SkillsBuild",
    issuer: "IBM",
    date: "December 2023",
    image: "/images/IBM.jpg",
    hasImage: true,
    tag: "Cloud & Dev"
  },
  {
    id: 9,
    title: "Full Stack Developer Internship",
    issuer: "CertED Technologies",
    date: "July 2025",
    image: "/images/internship.jpg",
    hasImage: true,
    tag: "Internship"
  }
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rajkumar-solanki07",
    color: "hover:text-blue-400",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.02-3.28 1.64 1.64 0 0 0 .02 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
      </svg>
    )
  },
  {
    name: "GitHub",
    url: "https://github.com/tfaryanraj07",
    color: "hover:text-white",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    )
  },
  {
    name: "Email",
    url: "mailto:rsolanki9235@gmail.com",
    color: "hover:text-red-400",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    )
  },
  {
    name: "Phone",
    url: "tel:+917004339203",
    color: "hover:text-emerald-400",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    )
  }
];

// --- CUSTOM HOOKS ---

const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback, { threshold: 0.3, ...options });
    
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ids, options]);

  return activeId;
};

// --- REUSABLE COMPONENTS ---

const GlassPanel = ({ children, className = "" }) => (
  <motion.div 
    className={`bg-slate-800/60 dark:bg-slate-850/60 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    aria-label="Toggle dark/light theme"
    className="p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 hover:text-amber-300 dark:text-amber-400 transition-colors duration-300 shadow-md focus:outline-none"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  >
    {theme === 'dark' ? (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
      </svg>
    ) : (
      <svg className="w-5 h-5 fill-current text-indigo-400" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
);

// --- HEADER COMPONENT ---

const Header = ({ active, theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl py-3 border-b border-slate-800' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Raj Solanki<span className="text-emerald-400">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = active === id;
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-emerald-400 font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="/resume/Raj_Kumar_Solanki_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full border border-indigo-500/60 text-indigo-300 hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all shadow-sm"
            >
              Resume PDF
            </a>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  active === item.toLowerCase()
                    ? 'bg-indigo-600/30 text-emerald-400 font-semibold'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex justify-around">
              <a
                href="/resume/Raj_Kumar_Solanki_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
              >
                View Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- HERO SECTION ---

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Hero Text */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Available for Software Engineering Roles
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                Raj Kumar Solanki
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-medium text-gray-300">
              <span className="text-emerald-400 font-semibold">Full Stack Developer</span>
              <span className="text-gray-600">•</span>
              <span>Java & Spring Boot</span>
              <span className="text-gray-600">•</span>
              <span className="text-indigo-400">React & Node.js</span>
            </div>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Detail-oriented Full Stack Developer with hands-on internship experience in building responsive web applications using <strong className="text-gray-200">React.js, Node.js, Express.js, Spring Boot, Hibernate, MongoDB, and MySQL</strong>. Strong foundation in Java, REST APIs, database design, and Data Structures & Algorithms.
            </p>

            {/* Quick Contact & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-gray-400 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">📍</span> Aurangabad, Bihar, India
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400">✉️</span> Rsolanki9235@gmail.com
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-purple-400">📞</span> +91 7004339203
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.a
                href="/resume/Raj_Kumar_Solanki_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:opacity-95 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>View Full Resume</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>

              <motion.a
                href="/resume/Raj_Kumar_Solanki_Resume.pdf"
                download="Raj_Kumar_Solanki_Resume.pdf"
                className="px-7 py-3 rounded-full border border-slate-700 bg-slate-800/80 text-gray-200 font-semibold text-sm sm:text-base hover:bg-slate-700/80 hover:text-white transition-all shadow-md flex items-center gap-2"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Download CV</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>

              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-gray-400 hover:text-emerald-400 font-semibold text-sm sm:text-base transition-colors"
              >
                Explore Projects ↓
              </a>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800/80">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Connect:</span>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-slate-800/70 border border-slate-700/80 text-gray-400 ${s.color} transition-colors shadow-sm`}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Profile Visual */}
          <motion.div 
            className="flex-1 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer rotating decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 animate-spin" style={{ animationDuration: '25s' }} />
              
              {/* Glowing gradient background */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 opacity-60 blur-xl animate-pulse" />

              {/* Main Avatar Container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-slate-800/90 shadow-2xl bg-slate-900 z-10">
                <img
                  src="/images/raj.png"
                  alt="Raj Kumar Solanki"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating tech badge */}
              <motion.div 
                className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-2 bg-slate-900/90 border border-slate-700 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl">☕</span>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Core Stack</div>
                  <div className="text-xs font-bold text-white">Java & Spring Boot</div>
                </div>
              </motion.div>

              {/* Floating MERN badge */}
              <motion.div 
                className="absolute -top-2 -right-2 sm:top-4 sm:right-2 bg-slate-900/90 border border-slate-700 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-xl">⚛️</span>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Frontend & AI</div>
                  <div className="text-xs font-bold text-white">React.js & Node.js</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- ABOUT SECTION ---

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Profile Overview</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">About Raj Kumar Solanki</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Passionate about building resilient, user-centric distributed applications and solving real-world challenges through clean engineering.
          </p>
        </div>

        {/* Narrative & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <GlassPanel className="p-8 space-y-4">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Passionate Developer & Continuous Learner</span>
              </h4>
              <p className="text-gray-300 leading-relaxed text-base">
                I am a 3rd-year <strong className="text-emerald-400 font-semibold">Computer Science & Engineering student at Haridwar University (74.21%)</strong> with a keen interest in full-stack web architectures, enterprise Java microservices, and AI integrations.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                Through my internships at <strong className="text-indigo-400">Khabai Tech</strong>, <strong className="text-indigo-400">EduSkills Academy</strong>, and <strong className="text-indigo-400">CertED Technologies</strong>, I have built production-grade REST APIs, engineered database schemas with MySQL and MongoDB, and crafted fluid, responsive user interfaces in React.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                I love turning complex functional requirements into maintainable, elegant code. Whether building full-stack platforms like the <strong className="text-purple-400">AI Resume Reviewer</strong> with Gemini AI or civic utility platforms like <strong className="text-teal-400">Better City Resolution</strong>, my work is driven by quality, speed, and real user value.
              </p>
            </GlassPanel>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <GlassPanel className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">3+</div>
              <div className="text-sm font-semibold text-white mt-1">Internships</div>
              <p className="text-xs text-gray-400 mt-2">Khabai Tech, EduSkills & CertED</p>
            </GlassPanel>

            <GlassPanel className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-indigo-400">5+</div>
              <div className="text-sm font-semibold text-white mt-1">Full-Stack Projects</div>
              <p className="text-xs text-gray-400 mt-2">AI, Civic Tech & Games</p>
            </GlassPanel>

            <GlassPanel className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-purple-400">74.2%</div>
              <div className="text-sm font-semibold text-white mt-1">B.Tech Aggregate</div>
              <p className="text-xs text-gray-400 mt-2">Haridwar University CSE</p>
            </GlassPanel>

            <GlassPanel className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">8+</div>
              <div className="text-sm font-semibold text-white mt-1">Certifications</div>
              <p className="text-xs text-gray-400 mt-2">Geekster, Coursera, IBM & SIH</p>
            </GlassPanel>
          </div>

        </div>

      </div>
    </section>
  );
};

// --- INTERNSHIPS / EXPERIENCE SECTION ---

const InternshipsSection = ({ onSelectCertificate }) => {
  return (
    <section id="experience" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2">Work History</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Professional Internship Experience</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Hands-on industry engineering roles developing full-stack applications, REST APIs, and responsive React interfaces.
          </p>
        </div>

        <div className="space-y-8">
          {internshipsData.map((internship, index) => (
            <GlassPanel key={internship.id} className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/60 pb-6 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-2xl font-bold text-white">{internship.role}</h4>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                      {internship.badge}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-300">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      🏢 {internship.company}
                    </span>
                    {internship.location && (
                      <span className="text-gray-400 flex items-center gap-1">
                        📍 {internship.location}
                      </span>
                    )}
                    <span className="text-gray-400 flex items-center gap-1">
                      📅 {internship.period}
                    </span>
                  </div>
                </div>

                {internship.certificateImage && (
                  <button
                    onClick={() => onSelectCertificate({
                      title: `${internship.role} - ${internship.company}`,
                      image: internship.certificateImage,
                      issuer: internship.company,
                      date: internship.period
                    })}
                    className="self-start lg:self-center px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-indigo-300 border border-indigo-500/40 transition flex items-center gap-2"
                  >
                    <span>📜 View Certificate</span>
                  </button>
                )}
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider text-gray-400 font-bold">Key Responsibilities & Contributions:</h5>
                <ul className="space-y-2.5">
                  {internship.descriptionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <span className="text-emerald-400 mt-1 flex-shrink-0">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech used */}
              <div className="mt-6 pt-4 border-t border-slate-700/40 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 mr-2">Technologies:</span>
                {internship.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-indigo-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- PROJECTS SECTION ---

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Full Stack & AI", "Frontend & Games"];

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Portfolio Showcase</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects & Live Apps</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Real-world full-stack web platforms and interactive applications built with modern tools.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-gray-300 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-800/80 rounded-2xl border border-slate-700/60 overflow-hidden shadow-xl flex flex-col hover:border-slate-500/60 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Card Header with Project Gradient Banner */}
              <div className={`h-36 bg-gradient-to-tr ${project.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex justify-between items-center z-10">
                  <span className="px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                    {project.badge}
                  </span>
                  <span className="text-xs text-white/80 font-medium">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-white tracking-tight z-10 drop-shadow">
                  {project.title}
                </h4>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-1.5 text-xs text-gray-400">
                  {project.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-900 text-indigo-300 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-700/60 flex items-center gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center transition shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Live App</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-gray-200 font-semibold text-xs transition border border-slate-600 flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- SKILLS SECTION ---

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2">Technical Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Skills & Developer Toolkit</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Proficiencies across modern programming languages, enterprise frameworks, databases, and developer tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsCategories.map((cat, idx) => (
            <GlassPanel key={cat.title} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-700/60">
                  <span className="text-2xl p-2 rounded-lg bg-slate-800 border border-slate-700">{cat.icon}</span>
                  <h4 className="text-lg font-bold text-white">{cat.title}</h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all duration-200 group flex items-center gap-2.5"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">{skill.icon}</span>
                      <div className="overflow-hidden">
                        <div className="text-sm font-semibold text-gray-200 truncate">{skill.name}</div>
                        <div className="text-[10px] text-gray-500 font-medium">{skill.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- EDUCATION SECTION ---

const EducationSection = () => {
  return (
    <section id="education" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Academic Background</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Education & Qualifications</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Academic achievements in Computer Science and Engineering and secondary education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {educationData.map((edu) => (
            <GlassPanel key={edu.id} className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    {edu.badge}
                  </span>
                  <span className="text-2xl font-black text-indigo-400">{edu.score}</span>
                </div>

                <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                <div className="text-indigo-300 text-sm font-medium mt-1">{edu.field}</div>

                <div className="mt-4 pt-4 border-t border-slate-700/60 text-sm space-y-1 text-gray-300">
                  <div className="flex items-center gap-1.5 font-medium text-white">
                    <span>🏛️</span> {edu.institution}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>📍</span> {edu.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>📅</span> {edu.duration}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- CERTIFICATES SECTION ---

const CertificatesSection = ({ onSelectCertificate }) => {
  return (
    <section id="certificates" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2">Verified Credentials</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Certificates & Achievements</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Professional certifications, academic workshops, and hackathons. Click any card with an image to inspect full credential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.id}
              className={`rounded-2xl p-5 bg-slate-900/90 border border-slate-800 hover:border-slate-600 transition-all shadow-lg flex flex-col justify-between ${
                cert.hasImage ? 'cursor-pointer hover:scale-[1.02]' : ''
              }`}
              onClick={() => cert.hasImage && onSelectCertificate(cert)}
              whileHover={{ y: -4 }}
            >
              <div>
                {/* Image preview thumbnail if available */}
                {cert.hasImage ? (
                  <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 relative group">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-md flex items-center gap-1.5">
                        🔍 Enlarge
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 w-full rounded-xl bg-gradient-to-br from-slate-800 to-indigo-950 border border-slate-800 mb-4 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-4xl mb-2">📜</span>
                    <span className="text-xs font-semibold text-gray-400">{cert.issuer}</span>
                    <span className="text-xs font-medium text-emerald-400 mt-1">Verified Credential</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {cert.tag}
                  </span>
                  <span className="text-xs text-gray-400">{cert.date}</span>
                </div>

                <h4 className="text-base font-bold text-white line-clamp-2 mt-1">{cert.title}</h4>
                <p className="text-xs text-gray-400 mt-1">Issued by <strong className="text-gray-300">{cert.issuer}</strong></p>
              </div>

              {cert.hasImage && (
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                  <span>View High-Res Certificate</span>
                  <span>→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- CERTIFICATE MODAL COMPONENT ---

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition focus:outline-none"
          aria-label="Close Modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4 pr-10">
          <h3 className="text-xl font-bold text-white">{certificate.title}</h3>
          <p className="text-sm text-gray-400">
            Issued by <strong className="text-emerald-400">{certificate.issuer}</strong> • {certificate.date}
          </p>
        </div>

        <div className="max-h-[75vh] overflow-auto rounded-xl border border-slate-800 bg-black flex items-center justify-center">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <a
            href={certificate.image}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
          >
            Open Original File
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT SECTION ---

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(serviceId, templateId, {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }, publicKey)
        .then(() => {
          setStatusMessage({ type: 'success', text: "Thank you! Your message has been sent successfully." });
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
          setTimeout(() => setStatusMessage(null), 6000);
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          setStatusMessage({ type: 'error', text: "Failed to send via direct form. Feel free to email me directly at Rsolanki9235@gmail.com!" });
          setLoading(false);
        });
    } else {
      // Fallback direct mailto if keys aren't configured in environment
      window.location.href = `mailto:rsolanki9235@gmail.com?subject=Contact from Portfolio - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
      setStatusMessage({ type: 'success', text: "Opening your email client to send message to Rsolanki9235@gmail.com!" });
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Get In Touch</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Build Something Great Together</h3>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            Interested in hiring me, discussing project opportunities, or just having a chat about full-stack engineering? Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <GlassPanel className="p-8 space-y-6">
              <h4 className="text-2xl font-bold text-white">Contact Information</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                I am actively seeking software engineering and full-stack developer roles. Feel free to connect via phone, email, or social media!
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="mailto:rsolanki9235@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Email</div>
                    <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Rsolanki9235@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+917004339203"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Phone</div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      +91 7004339203
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Location</div>
                    <div className="text-sm font-bold text-white">
                      Aurangabad, Bihar, India
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Profiles & Handles:</div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white hover:border-slate-700 transition"
                      title={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <GlassPanel className="p-8">
              <h4 className="text-2xl font-bold text-white mb-6">Send a Direct Message</h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. John Doe"
                    className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message or inquiry here..."
                    className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl text-sm font-medium ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {statusMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>
          </div>

        </div>

      </div>
    </section>
  );
};

// --- FOOTER COMPONENT ---

const Footer = () => (
  <footer className="py-10 bg-slate-950 text-gray-400 text-sm border-t border-slate-800/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="font-medium text-gray-300">
          © {new Date().getFullYear()} Raj Kumar Solanki. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Crafted with React, Tailwind CSS, Framer Motion & Vite.
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <a href="#home" className="hover:text-emerald-400 transition text-xs font-semibold">Home</a>
        <a href="#experience" className="hover:text-emerald-400 transition text-xs font-semibold">Experience</a>
        <a href="#projects" className="hover:text-emerald-400 transition text-xs font-semibold">Projects</a>
        <a href="#education" className="hover:text-emerald-400 transition text-xs font-semibold">Education</a>
        <a href="#contact" className="hover:text-emerald-400 transition text-xs font-semibold">Contact</a>
      </div>
    </div>
  </footer>
);

// --- MAIN APP ROOT ---

export const App = () => {
  const [theme, setTheme] = useState('dark');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const sectionIds = navItems.map(item => item.toLowerCase());
  const activeNav = useScrollSpy(sectionIds, { rootMargin: '-20% 0px -60% 0px' });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} font-inter selection:bg-emerald-500 selection:text-white`}>
      <Header active={activeNav} theme={theme} setTheme={setTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <InternshipsSection onSelectCertificate={setSelectedCertificate} />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificatesSection onSelectCertificate={setSelectedCertificate} />
        <ContactSection />
      </main>
      <Footer />

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;