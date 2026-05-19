import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from "react-icons/io5";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { isSoundEnabled, playUiSound, setSoundEnabled } from '../../utils/sound'
import './MobileOverlayMenu.css'

const MobileOverlayMenu = ({ links, activeSection, open, onClose }) => {
  const panelRef = useRef(null)
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled())

  useEffect(() => {
    if (!open) return

    const handleOutsideClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose('close')
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose('close')
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='mobile-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <motion.nav
            ref={panelRef}
            className='mobile-overlay-panel'
            role='navigation'
            aria-label='Mobile navigation'
            initial={{ opacity: 0, y: 26, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='mobile-overlay-controls'>
              <button
                className='mobile-sound-toggle'
                type='button'
                onClick={() => {
                  const nextValue = !soundOn
                  setSoundEnabled(nextValue)
                  setSoundOn(nextValue)
                  if (nextValue) playUiSound('click')
                }}
                aria-label={soundOn ? 'Mute menu sounds' : 'Unmute menu sounds'}
                title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
                aria-pressed={soundOn}
              >
                {soundOn ? <HiOutlineSpeakerWave /> : <HiOutlineSpeakerXMark />}
              </button>

              <button
                className='mobile-overlay-close'
                type='button'
                onClick={() => onClose('close')}
                aria-label='Close navigation menu'
                title='Close menu'
              >
                <IoClose />
              </button>
            </div>

            <div className='mobile-overlay-links'>
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={activeSection === link.id ? "active" : ""}
                  aria-label={`Go to ${link.label}`}
                  title={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.065, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onClose('click')}
                >
                  <strong>{link.label}</strong>
                </motion.a>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileOverlayMenu
