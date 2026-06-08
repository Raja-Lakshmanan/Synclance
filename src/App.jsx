import Home from './pages/Home'
import Projects from './pages/Projects'
import Nav from './components/navcomp/Nav'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Sample from './pages/Sample'
import FloatingContact from './components/FloatingContact/FloatingContact'
import Footer from './components/footer/Footer'
import CustomCursor from './components/cursor/CustomCursor'
import SEO from './components/SEO'
import { MotionConfig } from 'framer-motion'

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className='app'>
        <SEO />
        <CustomCursor />
        <Nav />
        <main className='app-main'>
          <Home/>
          <Projects />
          <About />
          <Sample />
          <Contact/>
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </MotionConfig>
  )
}

export default App