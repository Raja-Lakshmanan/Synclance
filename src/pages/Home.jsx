import React from 'react'
import '../styles/home.css'
import TypingText from '../components/typecomp/type'
import { GoArrowUpRight } from "react-icons/go";
import vid from '../components/navcomp/hero-video.mp4'
import {motion} from 'framer-motion'
const Home = () => {
  return (
    <motion.section
      className="home reveal-section"
      id='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <video src={vid} autoPlay loop muted className='vi'></video>
      <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.2}}><TypingText /></motion.h1>
      <motion.div className='para' initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.5}}>
        <p >Tamiztron is a creative-tech studio offering everything from engineering project development to modern design services. We combine technical expertise with artistic creativity to deliver professional posters, PCB design, video edits, portfolios, and responsive websites.</p><br />
        <p>Whether you're a student, startup, creator, or business—Tamiztron helps you build your brand, elevate your visuals, and bring your ideas to life.</p>
      </motion.div>
      <motion.div className='ceo'initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.5}}>
        <p className='c1'>XXXXXXXXX</p>
        <p  className='c2'>Chief Executive Officer</p>
        </motion.div>
        <motion.div className='bottom'initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8,delay:0.3}}>
          <div className='quotes'>
            <h2 className='q1'>Technology</h2>
            <h2 className='q2'>Meets Creativity</h2>
          </div>
          <a href="#contact"><button className='btn'>Let's Connect<GoArrowUpRight className='arrow'/></button></a>
        </motion.div>
    </motion.section>
  )
}

export default Home
