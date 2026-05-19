import React from 'react'
import '../styles/contact.css'
import { motion } from 'framer-motion'
const Contact = () => {
  return (
    <motion.section
      className='contact reveal-section'
      id='contact'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
        {/* <br /><br /> */}
        <motion.div
          className='fline'
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <h1>Let's <span>Connect</span></h1>
        </motion.div>
    </motion.section>
  )
}

export default Contact
