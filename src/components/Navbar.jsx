// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to scroll to a section id smoothly (if exists)
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Call when clicking nav links
  const handleNavClick = (section, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu when a link is clicked

    // For Projects link we want to go to /projects route (not the home anchor)
    if (section === "projects") {
      if (location.pathname === "/projects") {
        setActiveSection("projects");
        return;
      }
      navigate("/projects");
      setActiveSection("projects");
      return;
    }

    // For other sections (home/about/contact) we navigate to home then scroll
    if (location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(section), 80);
    }
  };

  // Scroll listener only needed on home page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname !== "/") return;

      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Ensure active state reflects current route when mounted / route changed
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection((prev) => (prev ? prev : "home"));
    } else if (location.pathname.startsWith("/projects")) {
      setActiveSection("projects");
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.navbar') && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="container">
        <h1 style={{ cursor: "pointer" }} onClick={(e) => handleNavClick("home", e)}>
          Tamasha Kavindi
        </h1>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#home"
              className={activeSection === "home" ? "active" : ""}
              onClick={(e) => handleNavClick("home", e)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === "about" ? "active" : ""}
              onClick={(e) => handleNavClick("about", e)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className={activeSection === "projects" ? "active" : ""}
              onClick={(e) => handleNavClick("projects", e)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === "contact" ? "active" : ""}
              onClick={(e) => handleNavClick("contact", e)}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
      </div>
    </nav>
  );
}