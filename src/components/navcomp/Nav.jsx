import { useEffect, useState } from "react";
import { PiMailboxFill } from "react-icons/pi";
import "./nav.css";
import logo from "./l1.png";
import design1 from "../../assets/design/design1.png";
import SoundToggle from "../sound/SoundToggle";
import { playUiSound } from "../../utils/sound";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#projects", label: "Services", id: "projects" },
  { href: "#about", label: "About us", id: "about" },
  { href: "#blog", label: "Sample", id: "blog" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    const intersectionStates = new Map();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        intersectionStates.set(entry.target.id, {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect,
        });
      });

      // Check if we are at the very bottom of the page
      const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      if (pageBottom) {
        setActiveSection(navLinks[navLinks.length - 1].id);
        return;
      }

      let dominantSectionId = null;
      let maxIntersectionRatio = -1;
      let minTopDistance = Infinity;

      for (const [id, state] of intersectionStates.entries()) {
        if (state.isIntersecting) {
          const topDist = Math.abs(state.boundingClientRect.top);
          if (
            state.intersectionRatio > maxIntersectionRatio ||
            (state.intersectionRatio === maxIntersectionRatio &&
              topDist < minTopDistance)
          ) {
            maxIntersectionRatio = state.intersectionRatio;
            minTopDistance = topDist;
            dominantSectionId = id;
          }
        }
      }

      if (dominantSectionId) {
        setActiveSection(dominantSectionId);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -25% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach((el) => observer.observe(el));

    const handleScrollForBottom = () => {
      const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      if (pageBottom) {
        setActiveSection(navLinks[navLinks.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScrollForBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollForBottom);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openMenu = () => {
    playUiSound("open");
    setIsOpen(true);
  };

  const closeMenu = () => {
    playUiSound("close");
    setIsOpen(false);
  };

  return (
    <>
      <header className={`aixor-nav ${isScrolled ? "is-scrolled" : ""}`}>
        <a href="#home" className="aixor-logo" aria-label="Go to home" onClick={() => playUiSound("click")}>
          <img src={logo} alt="Luminotrix Logo - Creative Tech & Design Solutions" height="1000"/>
        </a>

        <nav 
          className="aixor-desktop-links"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;
            const showUnderline = isHovered || (hoveredSection === null && isActive);

            return (
              <a
                key={link.id}
                href={link.href}
                className={isActive ? "active" : ""}
                onMouseEnter={() => setHoveredSection(link.id)}
                onClick={() => playUiSound("click")}
              >
                {link.label}
                {showUnderline && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav-underline-line"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="aixor-right">
          <a href="tel:+917639077992" className="aixor-phone" onClick={() => playUiSound("click")}>
            (+91) 76390 77992
          </a>

          <a
            href="mailto:rajalakshmanan807@gmail.com"
            className="aixor-mail"
            aria-label="Send email"
            onClick={() => playUiSound("click")}
          >
            <PiMailboxFill />
          </a>

          <SoundToggle />

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
            <img src={logo} alt="Luminotrix Logo - Creative Tech & Design Solutions" />
            <button
              className="agency-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <img src={design1} className="agency-menu-visual" alt="Creative Tech Design Visual" />

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