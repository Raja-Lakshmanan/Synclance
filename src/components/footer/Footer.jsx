import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import logo from "../navcomp/l1.png";
import "./footer.css";
import { playUiSound } from "../../utils/sound";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#projects" },
  { label: "About us", href: "#about" },
  { label: "Sample", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Poster Design",
  "Video Editing",
  "Website Development",
  "PCB Design",
  "Portfolio Design",
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/917639077992",
    icon: <FaWhatsapp />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/YOUR_USERNAME",
    icon: <FaInstagram />,
  },
  {
    label: "Gmail",
    href: "mailto:rajalakshmanan807@gmail.com",
    icon: <FiMail />,
  },
  {
    label: "Phone",
    href: "tel:+917639077992",
    icon: <FiPhone />,
  },
];

const Footer = () => {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#home" className="footer-logo" aria-label="Go to home" onClick={() => playUiSound("click")}>
            <img src={logo} alt="Luminotrix Logo" />
            <span>Luminotrix</span>
          </a>
          <p>Creative Tech & Design Solutions</p>
          <div className="footer-socials" aria-label="Social and contact links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => playUiSound("click")}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-column" aria-label="Footer quick links">
          <h3>Quick Links</h3>
          {quickLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => playUiSound("click")}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-column">
          <h3>Services</h3>
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>

        <address className="footer-column footer-contact">
          <h3>Contact</h3>
          <a href="tel:+917639077992" onClick={() => playUiSound("click")}>Phone</a>
          <a href="mailto:rajalakshmanan807@gmail.com" onClick={() => playUiSound("click")}>Email</a>
        </address>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Luminotrix. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
