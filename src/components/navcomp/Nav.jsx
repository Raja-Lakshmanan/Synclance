import React, { useEffect, useState } from "react";
import { PiMailboxFill } from "react-icons/pi";
import "./nav.css";
import logo from "./l1.png";
import design1 from "../../assets/design/design1.png";

const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#projects", label: "Services", id: "projects" },
  { href: "#about", label: "About us", id: "about" },
  { href: "#blog", label: "Blog", id: "blog" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="aixor-nav">
        <a href="#home" className="aixor-logo" aria-label="Go to home">
          <img src={logo} alt="Tamiztron Logo" />
        </a>

        <nav className="aixor-desktop-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? "active" : ""}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="aixor-right">
          <a href="tel:+917639077992" className="aixor-phone">
            (+91) 76390 77992
          </a>

          <a
            href="mailto:rajalakshmanan807@gmail.com"
            className="aixor-mail"
            aria-label="Send email"
          >
            <PiMailboxFill />
          </a>

          <button
            className={`aixor-menu-btn ${isOpen ? "open" : ""}`}
            onClick={openMenu}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="agency-mobile-menu" role="dialog" aria-modal="true">
          <div className="agency-mobile-top">
            <img src={logo} alt="Tamiztron Logo" />
            <button
              className="agency-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <img src={design1} className="agency-menu-visual" alt="Design visual" />

          <div className="agency-mobile-links">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                onClick={closeMenu}
                style={{ "--delay": `${0.14 + index * 0.08}s` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
