import React , {useEffect, useState}from 'react'
import '../styles/projects.css'
import ScrollRevealText from '../components/scrollcomp/ScrollRevealText'
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
import { motion } from 'framer-motion'
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
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <br />
      <div className='first'>
        <h2><GrServices className='sicon'/> Our Services</h2>
        <div className="scrollpar"><ScrollRevealText>At Tamiztron, we combine creativity, engineering, and technology to deliver high-quality solutions for students, creators, startups, and businesses. We help you turn ideas into reality with precision, professionalism, and powerful design.</ScrollRevealText></div>
      </div>
      <br />
      <h1 className='h'>What We Do</h1><br />
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="services-grid">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            className={`service-card ${activeService === service.id ? "is-open" : ""}`}
            role="button"
            tabIndex={0}
            aria-expanded={activeService === service.id}
            onClick={() => openService(service)}
            onKeyDown={(event) => handleServiceKeyDown(event, service)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.04, ease: "easeOut" }}
          >
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
            <h3 className='service-title'>{service.title}</h3>
            <p className="service-card-hint">Click for more information.</p>
            <div className="service-card-details">
              <div className='ico service-icon'>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Projects
