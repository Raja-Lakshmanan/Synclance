import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoClose, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import './FloatingContact.css'

const contactLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/91YOURNUMBER",
    icon: <FaWhatsapp />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/YOURUSERNAME",
    icon: <FaInstagram />,
  },
  {
    label: "Gmail",
    href: "mailto:youremail@gmail.com",
    icon: <MdOutlineMail />,
  },
]

const FloatingContact = () => {
  const [open, setOpen] = useState(false)
  const contactRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className='floating-contact' ref={contactRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            className='floating-contact-menu'
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {contactLinks.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={item.href.startsWith('mailto:') ? undefined : "noreferrer"}
                className='floating-contact-item'
                aria-label={`Open ${item.label}`}
                title={item.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
                onClick={() => setOpen(false)}
              >
                <span className='floating-contact-icon'>{item.icon}</span>
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`floating-contact-main ${open ? "open" : ""}`}
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        title={open ? "Close contact options" : "Contact"}
      >
        {open ? <IoClose /> : <IoChatbubbleEllipsesOutline />}
        <span>Contact</span>
      </button>
    </div>
  )
}

export default FloatingContact
