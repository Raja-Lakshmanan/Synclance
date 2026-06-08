import { useEffect, useState } from 'react'
import '../styles/projects.css'
import ScrollRevealText from '../components/ScrollRevealText'
import { GrServices } from "react-icons/gr";
import { FaPenRuler, FaUikit } from "react-icons/fa6";
import { GiTargetPoster } from "react-icons/gi";
import { SiTransportforlondon } from "react-icons/si";
import { FaInternetExplorer } from "react-icons/fa";
import { SiArduino } from "react-icons/si";
import { SiRobotframework } from "react-icons/si";
import { SiLibreofficecalc } from "react-icons/si";
import { LuCircuitBoard } from "react-icons/lu";
import { MdWebStories } from "react-icons/md";
import { MdOutlineSlideshow } from "react-icons/md";
import { FaPager } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoLogoCodepen } from "react-icons/io";
import { BsCameraReels } from "react-icons/bs";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import { playUiSound } from '../utils/sound'

const servicesData = [
  { id: 1, icon:<FaUikit/>,title: "UI/UX Design", category: "Design", description:"Create modern, user-friendly interfaces with clean layouts, smooth navigation, and a great user experience tailored to your business needs." },
  { id: 2, icon:<GiTargetPoster/> , title: "Poster Design", category: "Design", description:"High-quality posters for social media, events, promotions, and branding with attractive visuals and clear messaging."  },
  { id: 3, icon:<SiTransportforlondon/> , title: "Portfolio Website Design", category: "Design" , description:"Professional portfolio designs built to showcase your skills, work, and creativity with a clean, minimal, and responsive layout." },

  { id: 4, icon:<FaInternetExplorer/>,title: "IoT Projects (ESP32, ESP8266)", category: "Projects", description:"Smart IoT solutions using Wi-Fi, sensors, Blynk, and cloud systems for automation, monitoring, and real-time control."  },
  { id: 5, icon:<SiArduino/>,title: "Arduino Projects", category: "Projects" , description:"Custom Arduino-based electronics projects for automation, sensors, robotics, and student academic projects." },
  { id: 6, icon:<SiRobotframework/>,title: "Robotics Projects", category: "Projects", description:"Robots designed for navigation, obstacle avoidance, line following, automation, and real-world applications."  },
  { id: 7, icon:<LuCircuitBoard/>,title: "PCB Design & Fabrication", category: "Projects" , description:"Professional PCB design for IoT, embedded systems, and electronics circuits, including schematic design and fabrication support." },
  { id: 14, icon:<MdOutlineSlideshow/>,title: "PPT", category: "Projects", description:"Professional PowerPoint presentation design for college projects, business ideas, seminars, and reports with clean layouts and premium visuals." },
  { id: 15, icon:<SiLibreofficecalc/>,title: "Data Management using Excel", category: "Projects", description:"Organized Excel sheets, data entry, formatting, tables, charts, formulas, and report-ready data management for academic and business needs." },
  { id: 16, icon:<FaPenRuler/>,title: "Assignment Writing and EG Drawing", category: "Projects", description:"Neat assignment writing support and Engineering Graphics drawing assistance with clean presentation and accurate formatting." },

  { id: 8, icon:<MdWebStories/>,title: "Web Development (React + Django)", category: "Development", description:"Full-stack web development with powerful backend (Django) and modern frontend (React) for secure, scalable, and fast web applications."  },
  { id: 9,icon:<FaPager/>, title: "Landing Page Development", category: "Development", description:"Fast, responsive, and visually appealing landing pages optimized for conversions, business promotions, and product showcasing."  },
  { id: 10,icon:<FaReact/>, title: "Portfolio Website", category: "Development", description:"Beautiful personal portfolios with modern design, animations, and responsive layouts to highlight your skills and achievements."  },

  { id: 11,icon:<MdOutlineSlowMotionVideo/>, title: "Video Editing", category: "Editing", description:"Professional editing including cuts, transitions, effects, color correction, and sound enhancement for clean and engaging videos."  },
  { id: 12,icon:<IoLogoCodepen/>, title: "Logo Animation", category: "Editing", description:"High-quality 2D/3D logo animations suitable for intros, branding, and promotional videos."  },
  { id: 13, icon:<BsCameraReels/>,title: "Reels Editing", category: "Editing", description:"Fast, trendy, and aesthetic reel edits optimized for Instagram, YouTube Shorts, and TikTok growth."  },
];

const categories = ["All", "Design", "Projects", "Development", "Editing"];

const projectIntro =
  "At Luminotrix, we combine creativity, engineering, and technology to deliver high-quality solutions for students, creators, startups, and businesses. We help you turn ideas into reality with precision, professionalism, and powerful design.";

const sectionFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ServiceCard = ({ service, activeService, openService, closeService }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring settings for fluid 3D tilt
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-64, 64], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(x, [-180, 180], [-3, 3]), springConfig);

  // Mouse coords for spotlight border highlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { damping: 20, stiffness: 250 });
  const mouseYSpring = useSpring(mouseY, { damping: 20, stiffness: 250 });

  const borderBackground = useMotionTemplate`
    radial-gradient(
      120px circle at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(255, 255, 255, 0.35),
      transparent 80%
    )
  `;

  const handleMouseMove = (event) => {
    if (window.innerWidth <= 960) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position from center for 3D tilt
    const relativeX = event.clientX - rect.left - width / 2;
    const relativeY = event.clientY - rect.top - height / 2;
    x.set(relativeX);
    y.set(relativeY);

    // Spotlight cursor tracking relative to top-left
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isOpen = activeService === service.id;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openService(service);
    }
  };

  return (
    <motion.div
      layout
      className={`service-card ${isOpen ? "is-open" : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={() => openService(service)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isOpen ? 0 : rotateX,
        rotateY: isOpen ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={isOpen ? {} : "hover"}
      animate={isOpen ? "open" : "closed"}
      variants={{
        hidden: cardEntrance.hidden,
        visible: cardEntrance.visible,
        closed: {
          y: 0,
          height: 128,
          transition: {
            height: { delay: 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          },
        },
        open: {
          y: -12,
          height: window.innerWidth <= 620 ? "auto" : 255,
          transition: {
            height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          },
        },
        hover: {
          y: isOpen ? -12 : -8,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <motion.div
        className="service-card-border-glow"
        style={{
          background: borderBackground,
        }}
        variants={{
          hover: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />

      <button
        className="service-card-close"
        type="button"
        aria-label="Close service details"
        onClick={(event) => {
          event.stopPropagation();
          closeService();
        }}
      >
        &times;
      </button>

      <motion.h3 
        className='service-title'
        variants={{
          hover: { y: -2, transition: { duration: 0.25, ease: "easeOut" } }
        }}
      >
        {service.title}
      </motion.h3>

      <p className="service-card-hint">Click for more information.</p>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="service-card-details"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              transition: { delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] } 
            }}
            exit={{ 
              opacity: 0, 
              y: 10, 
              transition: { duration: 0.2, ease: "easeIn" } 
            }}
          >
            <motion.div 
              className='ico service-icon'
              initial={{ rotate: -180, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -180, scale: 0.8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              variants={{
                hover: { rotate: 3, y: -4, transition: { duration: 0.3 } }
              }}
            >
              {service.icon}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
              }}
              exit={{ 
                opacity: 0, 
                y: 5, 
                transition: { duration: 0.15 } 
              }}
            >
              {service.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ 
                opacity: 0.8, 
                y: 0, 
                transition: { delay: 0.18, duration: 0.32, ease: [0.22, 1, 0.36, 1] } 
              }}
              exit={{ 
                opacity: 0, 
                y: 8, 
                transition: { duration: 0.18 } 
              }}
              variants={{
                hover: { opacity: 1, transition: { duration: 0.25 } }
              }}
              style={{ opacity: 0.8 }}
            >
              {service.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService, setActiveService] = useState(null);

  const filteredServices =
    activeCategory === "All"
      ? servicesData
      : servicesData.filter((service) => service.category === activeCategory);

  const handleCategoryChange = (cat) => {
    playUiSound("click");
    setActiveCategory(cat);
    setActiveService(null);
  };

  const openService = (service) => {
    playUiSound("click");
    setActiveService((currentId) => (currentId === service.id ? null : service.id));
  };

  const closeService = () => {
    playUiSound("click");
    setActiveService(null);
  };

  const handleServiceKeyDown = (event, service) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openService(service);
    }
  };

  useEffect(() => {
    if (!activeService) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeService]);

  return (
    <motion.section
      className="projects reveal-section"
      id='projects'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <br />
      <div className='first'>
        <h2><GrServices className='sicon'/> Our Services</h2>
        <div className="scrollpar"><ScrollRevealText text={projectIntro} /></div>
      </div>
      <br />
      <h2 className='h'>What We Do</h2><br />
      <div className="category-buttons" aria-label="Services categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(cat)}
            style={{ position: 'relative' }}
            aria-pressed={activeCategory === cat}
            aria-label={`Filter services by ${cat}`}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>{cat}</span>
            {activeCategory === cat && (
              <motion.span
                layoutId="activeCategoryBg"
                className="active-category-bg"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #ffffff, #bdbdbd)',
                  zIndex: 1,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="services-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            activeService={activeService}
            openService={openService}
            closeService={closeService}
          />
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Projects