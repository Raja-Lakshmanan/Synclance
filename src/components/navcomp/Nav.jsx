import { useEffect, useState } from "react";
import { PiMailboxFill } from "react-icons/pi";
import "./nav.css";
import logo from "./l1.png";
import design1 from "../../assets/design/design1.png";
import SoundToggle from "../sound/SoundToggle";
import { playUiSound } from "../../utils/sound";

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

  useEffect(() => {
    const handleScroll = () => {
      const navHeight = window.innerWidth <= 980 ? 72 : 86;
      const offset = navHeight + 40;
      const scrollPosition = window.scrollY + offset;
      const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = "home";

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) return;

        if (scrollPosition >= section.offsetTop) {
          current = link.id;
        }
      });

      if (pageBottom) {
        current = navLinks[navLinks.length - 1].id;
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
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
      <header className="aixor-nav">
        <a href="#home" className="aixor-logo" aria-label="Go to home" onClick={() => playUiSound("click")}>
          <img src={logo} alt="Synclance Logo" height="1000"/>
        </a>

        <nav className="aixor-desktop-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? "active" : ""}
              onClick={() => playUiSound("click")}
            >
              {link.label}
            </a>
          ))}
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
            <img src={logo} alt="Synclance Logo" />
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
