import React from 'react'
import '../styles/about.css'
import { RiTeamLine } from "react-icons/ri";
import ScrollRevealText from '../components/scrollcomp/ScrollRevealText';
import { motion } from 'framer-motion';
const About = () => {
  return (
    <section className='about' id='about'>
      <motion.div
        className='first'
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2><RiTeamLine className='sicon'/> Our Members</h2>
        <div className='scrollpar'><ScrollRevealText>At Tamiztron, our team is a blend of creative designers, skilled developers, and passionate engineers who come together to deliver powerful solutions. We work with dedication, innovation, and attention to detail to turn ideas into reality.</ScrollRevealText></div>
      </motion.div>
    </section>
  )
}

export default About
