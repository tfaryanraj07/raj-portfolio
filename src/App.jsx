import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// --- DATA DEFINITIONS ---

const navItems = ['Home', 'About', 'Internships', 'Projects', 'Skills', 'Certificates', 'Contact'];

const projects = [
  {
    id: 1,
    title: "infinityrunn",
    description: "Runfinity (an endless runner demo) is a fun browser-based game created with pure HTML5, CSS, and JavaScript.The player controls a runner who must jump over obstacles and survive for as long as possible to achieve the highest score.",
    image: "https://placehold.co/600x400/10B981/ffffff?text=Infinityrun",
    techStack: ["Html" , "CSS" , "javascript"],
    externalLink: "https://tfaryanraj07.github.io/infintyrun/", 
    longDescription: "This project was born out of a desire to make environmental action accessible to everyone. My process included user research on habit formation, creating wireframes in Figma, and building the front-end with a focus on a clean, intuitive UI. The primary challenge was translating complex data (carbon emissions) into simple, actionable insights for the user."
  },
  {
    id: 2,
    title: "Better-City-resolution",
    description: "A data-driven platform to help citizens report and track community issues, improving city services.",
    image: "https://placehold.co/600x400/4F46E5/ffffff?text=Better-City-resolution",
    techStack: ["Html", "CSS", "Javascript", "MongoDB", "My-Sql" , "java" , "spring-boot"],
    externalLink: "https://tfaryanraj07.github.io/Better-city-resolution/", 
    longDescription: "This project was a collaborative effort to empower citizens and streamline municipal operations. I was responsible for the front-end architecture, creating an intuitive map-based interface for reporting issues like potholes or broken streetlights. The platform features real-time updates and a feedback loop, ensuring citizens feel heard and city departments can respond efficiently."
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "The very site you are viewing, built from the ground up to showcase my skills in UI/UX and React development.",
    image: "https://placehold.co/600x400/1E3A8A/ffffff?text=Portfolio+Website",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "UX Design"],
    externalLink: "https://raj-solanki-portfolio.netlify.app", 
    longDescription: "This project served as my personal sandbox to experiment with modern web design principles and animations. I focused on creating a visually appealing, responsive layout that prioritizes a seamless user journey. The subtle animations and use of whitespace are key components of the design."
  },
  // {
  //   id: 4,
  //   title: "Task Management Tool",
  //   description: "A productivity tool that uses gamification to make daily task completion more engaging and rewarding.",
  //   image: "https://placehold.co/600x400/A16207/ffffff?text=Task+Manager",
  //   techStack: ["React", "Redux", "Node.js", "UI Design"],
  //   externalLink: "https://task-manager-tool.netlify.app", 
  //   longDescription: "This project was a deep dive into combining playful design with serious functionality. My design process started with competitive analysis of existing productivity apps to identify what was missing. The final product features a clean dashboard, progress bars, and custom icons to create a unique and engaging experience."
  // }
];

const internshipData = {
  title: "Full Stack Development Internship",
  company: "Certed Technologies", 
  duration: "1 Month",
  role: "Full Stack Developer Intern",
  descriptionPoints: [
    "Developed and maintained features for a customer-facing portal using **React for the frontend** and **Java/Spring Boot for the backend**.",
    "Gained hands-on experience in building **RESTful APIs** and integrating them with the frontend, focusing on secure data exchange.",
    "Collaborated with senior developers on agile development cycles, utilizing **Git** for version control and participating in daily stand-ups.",
    "Successfully implemented **responsive design principles** to ensure cross-device compatibility and enhanced user experience."
  ],
  keyTechnologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "Spring Boot", "Postman", "Git"],
};

const skillsData = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Java', icon: '☕' },
  { name: 'Git', icon: '🌳' },
  { name: 'Spring Boot', icon: '🍃' },
  { name: 'MySQL', icon: '🐬' },
];

const certificatesData = [
  {
    id: 1,
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "July 2023",
    image: "https://placehold.co/400x300/F97316/ffffff?text=AWS+Certificate",
  },
  {
    id: 2,
    title: "Introduction to Front-End Development",
    issuer: "Coursera",
    date: "january 2025",
    image: "/images/frontend.jpg",
  },
  {
    id: 3,
    title: "Mastering JavaScript Fundamentals",
    issuer: "Geekster",
    date: "June 2024",
    image: "/images/geekster.jpg",
  },
  {
    id: 4,
    title: "Introduction to computer training",
    issuer: "Iit Bombay",
    date: "december 2023",
    image: "/images/WhatsAppImage_IITBombay.jpeg",
  },
  {
    id: 5,
    title: "Internal SIH participation",
    issuer: "Haridwar University",
    date: "September 2025",
    image: "/images/WhatsAppImage_IITBombay.jpeg",
  },
  {
    id: 5,
    title: "Advanced Relational Database and SQL",
    issuer: "Coursera",
    date: "july 2025",
    image: "/images/Advancedrelational.jpg",
  },
];


const socialLinks = [
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/rajkumar-solanki07?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9h4v12H4zM6 3.5A2.5 2.5 0 013.5 6A2.5 2.5 0 016 3.5z" />
      </svg>
    ), 
    color: 'text-indigo-400 hover:text-indigo-300' 
  },
  { 
    name: 'GitHub', 
    url: 'https://github.com/tfaryanraj07', 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12c0 5.308 3.435 9.8 8.205 11.385.6.11.82-.255.82-.557 0-.275-.01-1-.015-1.995-3.335.725-4.04-1.605-4.04-1.605-.545-1.38-1.33-1.745-1.33-1.745-1.085-.745.08-.73.08-.73 1.2.085 1.835 1.24 1.835 1.24 1.07 1.835 2.805 1.3 3.49.99.105-.77.415-1.3.76-1.59-2.65-.3-5.43-1.325-5.43-5.92 0-1.3.465-2.36 1.23-3.19-.12-.3-.53-1.51.12-3.15 0 0 1.01-.32 3.3.73.96-.265 1.98-.4 3-.405 1.02.005 2.04.14 3 .405 2.29-1.05 3.3-0.73 3.3-0.73.65 1.64.24 2.85.12 3.15.765.83 1.23 1.89 1.23 3.19 0 4.605-2.785 5.615-5.445 5.91.425.36.815 1.085.815 2.19 0 1.3-.01 2.34-.01 2.65 0 .305.215.67.825.555C20.57 21.8 24 17.308 24 12c0-6.628-5.372-12-12-12z" />
      </svg>
    ),
    color: 'text-gray-300 hover:text-white'
  },
  { 
    name: 'Email', 
    url: 'mailto:rsolanki9235@gmail.com', 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    color: 'text-red-400 hover:text-red-300'
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/rajjjjj.exe/', 
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.055 1.805.249 2.227.465.52.271.95.603 1.314.966.363.363.695.794.965 1.314.215.422.409 1.057.464 2.227.06 1.266.072 1.646.072 4.85s-.012 3.584-.071 4.85c-.055 1.17-.249 1.805-.465 2.227-.271.52-.603.95-.966 1.314-.363.363-.794.695-1.314-.965-.422-.215-1.057-.409-2.227-.464-1.266-.06-1.646-.072-4.85-.072zm0-2.163c-3.268 0-3.673.012-4.945.072-1.28.06-2.146.257-2.91.564-.785.319-1.442.756-2.1.1.658.658-.756 1.442-1.13 2.1-.307.764-.504 1.63-.564 2.91-.06 1.272-.072 1.677-.072 4.945s.012 3.673.072 4.945c.06 1.28.257 2.146.564 2.91.319.785.756 1.442 1.13 2.1.374.374.794.675 1.31.966.422.215 1.057.409 2.227.464 1.266.06 1.646.072 4.85.072s3.584-.012 4.85-.071c1.17-.055 1.805-.249 2.227-.465.52-.271.95-.603 1.314-.966.363-.363.695-.794 1.314-.965.422-.215 1.057-.409 2.227-.464 1.266-.06 1.646-.072 4.85-.072zm0 3.705a8.295 8.295 0 100 16.59 8.295 8.295 0 000-16.59zm0 13.92a5.625 5.625 0 110-11.25 5.625 5.625 0 010 11.25zm6.538-11.233a1.472 1.472 0 100-2.944 1.472 1.472 0 000 2.944z" />
      </svg>
    ),
    color: 'text-pink-400 hover:text-pink-300'
  },
];

// --- CUSTOM HOOKS ---

const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback, { threshold: 0.5, ...options });
    
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

// --- COMPONENTS ---

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    aria-label="Toggle dark/light theme"
    className="fixed right-6 top-6 z-50 p-3 bg-white/20 dark:bg-slate-700/80 backdrop-blur rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  >
    {theme === 'dark' ? '🌙' : '☀'}
  </button>
);

const GlassPanel = ({ children, className }) => (
  <motion.div 
    className={`bg-white/10 dark:bg-slate-700/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-600/50 p-8 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const Header = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md shadow-xl transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="text-2xl font-bold text-white tracking-wider font-inter hover:text-indigo-400 transition-colors">
            RAJ SOLANKI
          </a>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-inter ${active === item.toLowerCase() ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold' : ''}`}
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-white focus:outline-none p-2 rounded-full hover:bg-slate-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-800 overflow-hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const HeroSection = () => {
  return (
    <motion.section 
      id="home" 
      className="relative pt-16 min-h-screen flex items-center justify-center text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{background: 'linear-gradient(120deg, #0F172A 60%, #4F46E5 100%)'}}
    >
      <div className="absolute inset-0 z-0">
         {/* Decorative Blobs for BG Effect (uses classes defined in tailwind.config.js and index.css) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-3/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <GlassPanel className="p-8 sm:p-12 md:p-16 w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 relative">
          <div className="md:w-3/5 text-center md:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight font-inter">
              Hi, I'm <span className="text-indigo-400">Raj Solanki</span>
            </h1>
            <h2 className="mt-3 text-2xl sm:text-4xl font-light text-gray-300 font-inter">
              <span className="font-medium text-emerald-400">Full Stack Developer</span>
            </h2>
            <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto md:mx-0 font-inter">
              I craft modern, high-performance web applications with a focus on user-centric design and clean, scalable code.
            </p>
            <motion.a
              href="#projects"
              className="mt-10 inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 shadow-xl transform hover:scale-[1.02] font-inter"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              View My Work
            </motion.a>
          </div>
          <div className="md:w-2/5 mt-10 md:mt-0 flex justify-center">
          <motion.div
           className="w-48 h-48 sm:w-64 sm:h-64 bg-slate-600/50 rounded-full shadow-2xl border-4 border-indigo-400/80 flex items-center justify-center overflow-hidden"
          animate={{ rotate: [10, 25, 5, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
          <img 
           src="/images/raj.png" 
           alt="My Avatar" 
           className="w-full h-full object-cover"
          />
          </motion.div>

          </div>
        </GlassPanel>
      </div>
    </motion.section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 font-inter text-indigo-400">About Me</h2>
        <div className="flex flex-col md:flex-row items-start gap-10 mt-12">
          <div className="md:w-1/3 flex justify-center">
            <motion.div
              className="w-48 h-48 bg-gray-700 rounded-full border-4 border-emerald-400 flex items-center justify-center text-7xl font-bold text-emerald-400 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              RS
            </motion.div>
          </div>
          <motion.div 
            className="md:w-2/3 text-left"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed font-inter">
              I’m a **3rd-year B.Tech CSE student at Haridwar University**, deeply passionate about **Full Stack Development**. I enjoy building scalable, user-friendly web applications using modern technologies like **React, Node.js, and Java/Spring Boot**. I'm always eager to learn and take on new challenges, driven by the goal of turning innovative ideas into real-world projects.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed font-inter">
              My focus is on creating solutions that are not only efficient and scalable but also user-centric. Alongside my core technical skills, I am passionate about **problem-solving**, maintaining **clean code practices**, and committing to **continuous learning** to stay ahead in the rapidly evolving tech landscape.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InternshipsSection = () => {
  return (
    <section id="internships" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-inter text-emerald-400">Internship Experience</h2>
        
        <GlassPanel className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Internship Details */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-white font-inter">{internshipData.title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 text-lg font-medium text-gray-300">
              <span className="text-indigo-400 flex items-center">
                <span className="mr-2 text-2xl">🏢</span> {internshipData.company}
              </span>
              <span className="text-gray-400 flex items-center mt-2 sm:mt-0">
                <span className="mr-2 text-2xl">📅</span> {internshipData.duration}
              </span>
            </div>

            <p className="text-xl font-semibold text-emerald-400 mt-4">{internshipData.role}</p>

            <ul className="list-disc list-inside space-y-3 text-gray-300 font-inter pl-4">
              {internshipData.descriptionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-indigo-300 mb-3">Key Technologies Used:</h4>
              <div className="flex flex-wrap gap-3">
                {internshipData.keyTechnologies.map(tech => (
                  <span key={tech} className="px-4 py-1 text-sm font-medium rounded-full bg-slate-700 border border-indigo-500/50 text-indigo-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificate Display - Static Placeholder */}
          <motion.div 
            className="lg:col-span-1 border-l border-slate-700/50 lg:pl-10 pt-6 lg:pt-0"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-2xl font-bold text-white mb-4 font-inter text-center">Internship Certificate</h4>
            
        {/* Internship certificate image (public/images/internship.jpg) */}
          <div className="mt-6 border border-slate-700 rounded-lg overflow-hidden shadow-lg bg-black h-64 flex items-center justify-center">
            <img
          src="/images/internship.jpg"
          alt="Internship certificate - Certed Technologies"
          className="w-full h-full object-cover"
           />
          </div>

          </motion.div>
        </GlassPanel>

      </div>
    </section>
  );
};


const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-inter text-emerald-400">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div 
              key={project.id}
              className="bg-slate-700 rounded-xl p-6 shadow-lg transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full"
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src={project.image} alt={project.title} className="rounded-lg mb-4 w-full h-48 object-cover shadow-md" />
              <h3 className="text-2xl font-bold text-white font-inter">{project.title}</h3>
              <p className="mt-2 text-gray-300 font-inter flex-grow">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-700/30 text-indigo-400 font-inter">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <a 
                  href={project.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full text-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors duration-300 block"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-inter text-indigo-400">My Skills & Toolkit</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              className="flex flex-col items-center p-4 sm:p-6 bg-slate-800 rounded-xl border-t-4 border-emerald-400/70 transition duration-300 shadow-lg cursor-pointer"
              whileHover={{ y: -5, scale: 1.05, boxShadow: "0 10px 15px rgba(6, 182, 212, 0.4)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <span className="text-4xl sm:text-5xl mb-3">{skill.icon}</span>
              <p className="font-semibold text-base sm:text-lg font-inter text-center">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-inter text-emerald-400">Certificates & Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert) => (
            <motion.div 
              key={cert.id} 
              className="bg-slate-700 rounded-xl p-6 shadow-lg transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer flex flex-col items-center"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="rounded-lg mb-4 w-full h-auto object-cover shadow-md border border-slate-600" 
              />
              <div className="text-center flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white font-inter mt-2">{cert.title}</h3>
                <p className="mt-1 text-gray-400 font-inter">{cert.issuer}</p>
                <p className="mt-1 text-gray-500 text-sm font-inter">Issued: {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionMessage, setSubmissionMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form Submitted:', formData);
    setSubmissionMessage("Thank you! Your message has been sent. I will get back to you shortly.");
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmissionMessage(null), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 font-inter text-indigo-400">Get In Touch</h2>
        <p className="text-center text-gray-400 mb-8 font-inter">
          I'm currently open to new opportunities. Feel free to reach out to me via the form below or connect on social media!
        </p>
        
        {/* --- Social Media Icons --- */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`p-4 rounded-full bg-slate-700/70 transition-all duration-300 transform hover:scale-110 shadow-lg ${link.color}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        {/* --- End Social Media Icons --- */}

        <GlassPanel className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold mb-2 font-inter" htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-inter"
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold mb-2 font-inter" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-inter"
                required 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 font-semibold mb-2 font-inter" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-inter"
                rows="5"
                required 
              />
            </div>
            <motion.button
              type="submit"
              className="w-full p-3 text-lg font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition duration-300 shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
          <AnimatePresence>
            {submissionMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center p-4 rounded-lg bg-emerald-500/20 text-emerald-400 font-inter"
              >
                {submissionMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-6 bg-slate-900 text-gray-500 text-center font-inter border-t border-slate-700/50">
    <p>&copy; 2025 Raj Solanki. Crafted with React & Tailwind CSS.</p>
  </footer>
);

// --- MAIN APP COMPONENT ---

export const App = () => {
  const [theme, setTheme] = useState('dark');
  const sectionIds = navItems.map(item => item.toLowerCase());
  const activeNav = useScrollSpy(sectionIds, { rootMargin: '-30% 0px -65% 0px' });
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} font-inter`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header active={activeNav} />
      <main>
        <HeroSection />
        <AboutSection />
        <InternshipsSection /> 
        <ProjectsSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;