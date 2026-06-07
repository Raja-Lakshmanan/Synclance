import { useRef, useState } from 'react'
import '../styles/contact.css'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { playUiSound } from '../utils/sound'

const emailJsConfig = {
  serviceId: 'service_qwhb1ur',
  templateId: 'template_4972c2a',
  publicKey: 'P4delT29XxokSszZU',
}

const contactCards = [
  {
    label: 'Phone',
    value: '+91 76390 77992',
    href: 'tel:+917639077992',
    icon: <FiPhone />,
  },
  {
    label: 'Email',
    value: 'rajalakshmanan807@gmail.com',
    href: 'mailto:rajalakshmanan807@gmail.com',
    icon: <FiMail />,
  },
  {
    label: 'WhatsApp',
    value: 'Message us directly',
    href: 'https://wa.me/917639077992',
    icon: <FaWhatsapp />,
  },
  {
    label: 'Location',
    value: 'Tamil Nadu, India',
    href: 'https://www.google.com/maps/search/?api=1&query=Tamil%20Nadu%2C%20India',
    icon: <FiMapPin />,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerWrap = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const Contact = () => {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    playUiSound('click')
    setIsSending(true)
    setStatus(null)

    try {
      await emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formRef.current,
        emailJsConfig.publicKey
      )

      setStatus({
        type: 'success',
        message: 'Message sent successfully.',
      })
      formRef.current?.reset()
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus({
        type: 'error',
        message: 'Message failed. Please check EmailJS details.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <motion.section
      className='contact reveal-section'
      id='contact'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.18 }}
      variants={staggerWrap}
    >
      <div className='contact-shell'>
        <motion.div className='contact-heading' variants={fadeUp}>
          <span className='contact-kicker'>Contact</span>
          <h1>GET IN TOUCH</h1>
          <p>
            Let us know what you want to build, design, edit, or present. We will help you shape it with clean execution and a professional finish.
          </p>
        </motion.div>

        <div className='contact-layout'>
          <motion.div
            className='contact-info-grid'
            variants={staggerWrap}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.18 }}
          >
            {contactCards.map((card) => (
              <motion.a
                key={card.label}
                className='contact-info-card shine-hover'
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.015 }}
                onClick={() => playUiSound('click')}
              >
                <span className='contact-card-icon'>{card.icon}</span>
                <span className='contact-card-label'>{card.label}</span>
                <strong>{card.value}</strong>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            ref={formRef}
            className='contact-form-shell glass-card'
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.16 }}
          >
            <div className='contact-form-head'>
              <span>Start a conversation</span>
              <h2>Tell us about your project</h2>
            </div>

            {status && (
              <motion.div
                className={`contact-toast ${status.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role='status'
              >
                {status.message}
              </motion.div>
            )}

            <div className='contact-fields'>
              <label>
                <span>Name</span>
                <input
                  type='text'
                  name='name'
                  placeholder='Your name'
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  placeholder='you@example.com'
                  required
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  type='tel'
                  name='phone'
                  placeholder='+91'
                />
              </label>
              <label className='message-field'>
                <span>Message</span>
                <textarea
                  name='message'
                  placeholder='Tell us what you need'
                  rows='5'
                  required
                />
              </label>
            </div>

            <input type='hidden' name='time' value={new Date().toLocaleString()} readOnly />

            <button className='contact-submit premium-btn' type='submit' disabled={isSending}>
              <span>{isSending ? 'Sending...' : 'SEND MESSAGE'}</span>
              <FiSend />
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
