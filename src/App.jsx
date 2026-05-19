import React from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Nav from './components/navcomp/Nav'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import FloatingContact from './components/FloatingContact/FloatingContact'
import Footer from './components/footer/Footer'
import CustomCursor from './components/cursor/CustomCursor'
import { MotionConfig } from 'framer-motion'
const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className='app'>
        <CustomCursor />
        <Nav />
        <main className='app-main'>
          <Home/>
          <Projects />
          <About />
          <Blog />
          <Contact/>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </MotionConfig>
  )
}

export default App
