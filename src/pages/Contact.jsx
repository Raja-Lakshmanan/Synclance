import React, { useState } from 'react'
import '../styles/contact.css'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { playUiSound } from '../utils/sound'

const emailJsConfig = {
  serviceId: 'service_qwhb1ur ',
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
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const staggerWrap = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const Contact = () => {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    playUiSound('click')
    setIsSending(true)
    setStatus(null)

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            reply_to: formData.email,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('EmailJS request failed')
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully. We will get back to you soon.',
      })
      setFormData(initialForm)
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Message could not be sent. Please try again or contact us directly.',
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
                onClick={() => playUiSound('click')}
              >
                <span className='contact-card-icon'>{card.icon}</span>
                <span className='contact-card-label'>{card.label}</span>
                <strong>{card.value}</strong>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
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
                  value={formData.name}
                  onChange={updateField}
                  placeholder='Your name'
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={updateField}
                  placeholder='you@example.com'
                  required
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={updateField}
                  placeholder='+91'
                />
              </label>
              <label className='message-field'>
                <span>Message</span>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={updateField}
                  placeholder='Tell us what you need'
                  rows='5'
                  required
                />
              </label>
            </div>

            <button className='contact-submit premium-btn' type='submit' disabled={isSending}>
              <span>{isSending ? 'SENDING...' : 'SEND MESSAGE'}</span>
              <FiSend />
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
