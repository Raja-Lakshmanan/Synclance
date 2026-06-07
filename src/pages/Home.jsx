import '../styles/home.css'
import TypingText from '../components/typecomp/type'
import { GoArrowUpRight } from "react-icons/go";
import vid from '../components/navcomp/hero-video.mp4'
import { motion } from 'framer-motion'
import { playUiSound } from '../utils/sound'

const paragraph1 = "Luminotrix is a creative-tech studio offering everything from engineering project development to modern design services. We combine technical expertise with artistic creativity to deliver professional posters, PCB design, video edits, portfolios, and responsive websites.";
const paragraph2 = "Whether you're a student, startup, creator, or business—Luminotrix helps you build your brand, elevate your visuals, and bring your ideas to life.";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.016,
      delayChildren: 0.35,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // premium easeOutExpo
    },
  },
};

const bottomContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.75,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Home = () => {
  return (
    <motion.section
      className="home reveal-section"
      id='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <video src={vid} autoPlay loop muted playsInline className='vi'></video>
      
      <div className="home-top">
        <motion.h1 
          className="type"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <TypingText />
        </motion.h1>
        
        <motion.div 
          className='para' 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          <p style={{ display: "flex", flexWrap: "wrap", columnGap: "0.24em", rowGap: "0.15em", willChange: "transform, opacity" }}>
            {paragraph1.split(/\s+/).map((word, i) => (
              <motion.span key={i} variants={wordVariants} style={{ display: "inline-block", willChange: "transform, opacity" }}>
                {word}
              </motion.span>
            ))}
          </p>
          <br />
          <p style={{ display: "flex", flexWrap: "wrap", columnGap: "0.24em", rowGap: "0.15em", willChange: "transform, opacity" }}>
            {paragraph2.split(/\s+/).map((word, i) => (
              <motion.span key={i} variants={wordVariants} style={{ display: "inline-block", willChange: "transform, opacity" }}>
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </div>

      <div className='ceo'>
 
      </div>

      <motion.div 
        className='bottom' 
        variants={bottomContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className='quotes' variants={fadeUpVariant} style={{ willChange: "transform, opacity" }}>
          <h2 className='q1'>Technology</h2>
          <h2 className='q2'>Meets Creativity</h2>
        </motion.div>
        
        <motion.a 
          href="#contact" 
          className='btn shine-hover'
          onClick={() => playUiSound("click")}
          variants={fadeUpVariant}
          style={{ willChange: "transform, opacity" }}
        >
          Let's Connect<GoArrowUpRight className='arrow'/>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}

export default Home