import React, { useEffect, useState } from 'react'
import { PiMailboxFill } from "react-icons/pi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import './nav.css'
import logo from './l1.png'
import MobileOverlayMenu from './MobileOverlayMenu'
import { playUiSound } from '../../utils/sound'

const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#projects", label: "Services", id: "projects" },
  { href: "#about", label: "About us", id: "about" },
  { href: "#blog", label: "Blog", id: "blog" },
  { href: "#contact", label: "Contact", id: "contact" },
]

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen((open) => {
      playUiSound(open ? 'close' : 'open')
      return !open
    })
  }

  const handleMenuClose = (soundType = 'close') => {
    playUiSound(soundType)
    setMenuOpen(false)
  }

  return (
    <header className="main-nav">
      <img src={logo} alt="Logo" className='img'/>
      <button className='menu-toggle' onClick={handleMenuToggle} aria-label='Toggle navigation'>
        {menuOpen ? <IoClose /> : <HiMenuAlt3 />}
      </button>
      <nav className='desktop-nav'>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={activeSection === link.id ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <MobileOverlayMenu
        links={navLinks}
        activeSection={activeSection}
        open={menuOpen}
        onClose={handleMenuClose}
      />
      <div className='details'>
        <a href="tel:+917639077992">(+91) 76390 77992</a>
        <a href="mailto:rajalakshmanan807@gmail.com" className='icon'><PiMailboxFill /></a>
      </div>
    </header>
  )
}

export default Nav
