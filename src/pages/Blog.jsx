import React from 'react'
import { motion } from 'framer-motion'
import { BsJournalText } from "react-icons/bs";
import '../styles/blog.css'

const blogPosts = [
  {
    id: 1,
    category: "Business",
    title: "Building a Strong Digital Presence",
    description: "Insights on how modern design, consistent branding, and responsive websites help businesses build trust online.",
  },
  {
    id: 2,
    category: "Services",
    title: "Why Design and Engineering Work Better Together",
    description: "A look at how creative visuals and technical execution combine to turn ideas into polished real-world solutions.",
  },
  {
    id: 3,
    category: "Updates",
    title: "What We Are Exploring Next",
    description: "Upcoming service ideas, product improvements, and studio updates focused on better client experiences.",
  },
]

const Blog = () => {
  return (
    <motion.section
      className='blog reveal-section'
      id='blog'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <motion.div
        className='blog-head'
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2><BsJournalText className='sicon'/> Sample</h2>
        <p>Placeholder updates, business notes, service insights, and product ideas will appear here.</p>
      </motion.div>

      <div className='blog-grid'>
        {blogPosts.map((post, index) => (
          <motion.article
            className='blog-card'
            key={post.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <span>{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default Blog
