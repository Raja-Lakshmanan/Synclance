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
const App = () => {
  return (
    <div className='app'>
      <Nav />
      <Home/>
      <Projects />
      <About />
      <Blog />
      <Contact/>
      <Footer />
      <FloatingContact />
    </div>
  )
}

export default App
