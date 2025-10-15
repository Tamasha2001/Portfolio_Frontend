import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import TamashaImage from "../assets/images/Tamasha.jpg";
import TamashaKImage from "../assets/images/TamashaK.jpg";
import HutchImage from "../assets/images/HUTCH-logo.png";
import ContactForm from "../components/ContactForm";

// --- Modern Project Card Component ---
function ProjectCardModern({ project }) {
  const renderImage = () => {
    if (project.coverImage?.data) {
      return (
        <img
          src={`data:${project.coverImage.contentType};base64,${project.coverImage.data}`}
          alt={project.title}
          className="project-image-modern"
        />
      );
    }
    return (
      <div
        className="project-image-modern"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.2rem",
        }}
      >
        {project.title}
      </div>
    );
  };

  return (
    <div className="project-card-modern" role="article">
      <div className="project-media-modern">{renderImage()}</div>
      <div className="project-body-modern">
        <h3 className="project-title-modern">{project.title}</h3>
        <p className="project-desc-modern">{project.description}</p>
        <div className="project-footer">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn github-btn--outline"
          >
            View Code
          </a>
          <span
            style={{
              color: "var(--warm-gray)",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            ★ Featured
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Projects Section ---
function ProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const res = await API.get("/projects");
      setFeaturedProjects(res.data.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2>Featured Projects</h2>
          <p className="projects-subtitle">
            Some of my key academic and professional projects demonstrating my
            full-stack development and analytical skills.
          </p>
        </div>

        <div className="featured-projects">
          {featuredProjects.map((project) => (
            <ProjectCardModern key={project._id} project={project} />
          ))}
        </div>

        <div className="see-all-container">
          <Link to="/projects" className="see-all-btn">
            View All Projects <i>→</i>
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Education Data ---
const educationResults = [
  {
    title: "BSc (Hons) Software Engineering – First Class",
    institution: "Cardiff Metropolitan University (UK) | ICBT Campus, Nugegoda",
    year: "2023 – 2024",
    results: [
      { subject: "Advanced Programming", grade: "65" },
      { subject: "Professional and Ethical Issues in IT", grade: "76" },
      { subject: "Computational Intelligence", grade: "71" },
      { subject: "Analytics and Business Intelligence", grade: "56" },
      { subject: "Development Project", grade: "71" },
    ],
    status: "First Class Honours",
    transcriptFile: "/transcripts/BSc_Transcript.pdf",
  },
  {
    title: "Higher Diploma in Computing & Software Engineering – Merit",
    institution: "Cardiff Metropolitan University (UK) | ICBT Campus, Nugegoda",
    year: "2021 – 2023",
    results: [
      { subject: "Computer Networks", grade: "71" },
      { subject: "Computer Architecture", grade: "72" },
      { subject: "Fundamentals in Programming", grade: "70" },
      { subject: "Business Information Systems", grade: "67" },
      { subject: "System Analysis and Design", grade: "76" },
      { subject: "Database Design and Development", grade: "71" },
      { subject: "Object Oriented Programming", grade: "64" },
      { subject: "Professional Practice", grade: "77" },
      { subject: "Web Application Development", grade: "70" },
      { subject: "Data Structures and Algorithms", grade: "41" },
      { subject: "Mobile Application Development", grade: "63" },
      { subject: "Project Management", grade: "67" },
      { subject: "Service Oriented Computing", grade: "62" },
      { subject: "Business Analytics", grade: "84" },
      { subject: "Computing Project", grade: "68" },
    ],
    status: "Merit Classification",
    transcriptFile: "/transcripts/HD_Transcript.pdf",
  },
  {
    title: "Diploma in IT (International)",
    institution: "Esoft Metro Campus",
    year: "2018",
    results: [
      { subject: "IT Fundamentals", grade: "C" },
      { subject: "Working with MS Office 2013", grade: "B" },
      { subject: "Computer Hardware", grade: "C" },
      { subject: "Network Technology", grade: "B" },
      { subject: "Internet Email and Web Designing", grade: "B" },
      { subject: "Graphics and Multimedia", grade: "B" },
      { subject: "Software Engineering", grade: "C" },
      { subject: "Python Programming", grade: "B" },
      { subject: "Database Concepts", grade: "B" },
      { subject: "Programming with C#", grade: "C" },
      
    ],
    status: "Completed Successfully",
    transcriptFile: "/transcripts/DiplomaIT_Transcript.pdf",
  },
  {
    title: "Diploma in English",
    institution: "Esoft Metro Campus",
    year: "2020",
    results: [
      { subject: "Written Paper", grade: "67" },
      { subject: "Grammar Paper", grade: "59" },
      { subject: "Speaking", grade: "53" },
      { subject: "Assignment", grade: "73" },
      { subject: "Presentation", grade: "58" },
      { subject: "Grade", grade: "B" },
    ],
    
    status: "Completed Successfully",
    transcriptFile: "/transcripts/DipEnglish_Transcript.pdf",
  },
  {
    title: "AAT Examination (Level 1)",
    institution: "Institute of Accounting Studies",
    year: "2018",
    results: [
      { subject: "Financial Accounting Basics", grade: "D" },
      { subject: "Quantitative Methods for Business", grade: "B" },
      { subject: "Economics for Business and Accounting", grade: "C" },
      { subject: "Business Operations and Management", grade: "D" },
    ],
    status: "Completed Successfully",
    transcriptFile: "/transcripts/aat_Transcript.pdf",
  },
  {
    title: "G.C.E. Advanced Level (Commerce)",
    institution: "Rahula National School (Godakawela)",
    year: "2020",
    results: [
      { subject: "Accounting", grade: "C" },
      { subject: "Information and Communication Technology", grade: "C" },
      { subject: "Economics", grade: "B" },
      { subject: "General English", grade: "S" },
    ],
    status: "Advanced Level Passed",
    transcriptFile: "/transcripts/Al_Transcript.pdf",
  },
  {
    title: "G.C.E. Ordinary Level",
    institution: "Rahula National School (Godakawela)",
    year: "2017",
    results: [
      { subject: "Mathematics", grade: "B" },
      { subject: "Science", grade: "C" },
      { subject: "English", grade: "C" },
      { subject: "Sinhala", grade: "A" },
      { subject: "History", grade: "A" },
      { subject: "Buddhism", grade: "A" },
      { subject: "Civic", grade: "B" },
      { subject: "Art", grade: "B" },
      { subject: "Health", grade: "A" },
    ],
    status: "Ordinary Level Passed - 4A's, 3B's, 2C's",
    transcriptFile: "/transcripts/Ol_Transcript.pdf",
  },
];

// --- Main Home Page Component ---
export default function Home() {
  const [projects, setProjects] = useState([]);

  // Education Popup State
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  const toggleResultPopup = (index) => {
    setCurrentResultIndex(index);
    setShowResultPopup(true);
  };

  const closeResultPopup = () => {
    setShowResultPopup(false);
  };

  const handleDownloadResults = () => {
  const transcript =
    educationResults[currentResultIndex]?.transcriptFile;

  if (transcript) {
    const link = document.createElement("a");
    link.href = transcript;
    link.download = transcript.split("/").pop(); // file name
    link.click();
  } else {
    alert("Transcript not available for this qualification.");
  }
};


  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Tamasha Kavindi</h1>
              <p>
                Software Engineering Graduate passionate about full-stack
                development, business analysis, and IT project management with
                hands-on experience in telecommunications and system design.
              </p>
              <button
                className="btn"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
              </button>
            </div>
            <div className="hero-image">
              <img src={TamashaImage} alt="Tamasha Kavindi" />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <div className="container about-grid">
          {/* Left: photo */}
          <div className="about-photo" aria-hidden="true">
            <img src={TamashaKImage} alt="Tamasha Kavindi Portrait" />
          </div>

          {/* Right: content */}
          <div className="about-content">
            <h2>About Me</h2>

            <p className="lead">
              I’m a results-driven and analytical{" "}
              <strong>Software Engineering Graduate</strong> from
              <strong> Cardiff Metropolitan University (UK)</strong> via the
              International College of Business and Technology (ICBT), Nugegoda,
              achieving a <strong>First-Class Honours</strong>. I have
              professional experience at{" "}
              <strong>Hutchison Telecommunications Lanka (Pvt) Ltd</strong>
              in the{" "}
              <strong>
                Projects & Solutions (IT & Core Network Department)
              </strong>
              , where I contributed to system analysis, project management, and
              quality assurance.
            </p>

            <p>
              My expertise spans full-stack software development, backend
              integration, business analysis, and data-driven systems. I enjoy
              designing efficient, user-focused software solutions that align
              with both technical and business goals. I’m passionate about
              continuously learning new technologies and applying them to create
              impactful digital products.
            </p>

{/* Work Experience Section */}
<h3>Work Experience</h3>
<div className="experience-section">
  <div className="experience-card experience-card-premium">
    <div className="company-header">
      <div className="company-logo">
        <img src={HutchImage} alt="HUTCH-logo" />
      </div>

      <div className="company-info">
        <h4>Projects & Solutions | IT & Core Network Department</h4>
        <p>
          <strong>Hutchison Telecommunications Lanka (Pvt) Ltd</strong>
        </p>
        <p className="experience-duration">May 2024 – April 2025</p>
      </div>
    </div>

    <ul className="experience-list">
      <li>
        Performed business analysis, quality assurance, and project
        management for multiple IT projects.
      </li>
      <li>
        Coordinated the implementation of{" "}
        <strong>Retail Promotion Programs</strong>,{" "}
        <strong>Sales Analytics Dashboards</strong>, and{" "}
        <strong>Reporting Tools</strong> to improve operational efficiency.
      </li>
      <li>
        Prepared <strong>Product Concept Analysis Reports (PCARs)</strong> to
        support new product launches.
      </li>
      <li>
        Generated reports using backend systems (SQL & Linux) and conducted{" "}
        <strong>User Acceptance Testing (UAT)</strong> to ensure functionality
        and quality.
      </li>
      <li>
        Collaborated with internal teams and vendors to ensure smooth project
        delivery and version releases.
      </li>
    </ul>

    <div className="experience-skills">
      <span className="skill-badge">Business Analysis</span>
      <span className="skill-badge">Project Management</span>
      <span className="skill-badge">Quality Assurance</span>
      <span className="skill-badge">SQL</span>
      <span className="skill-badge">Linux</span>
      <span className="skill-badge">UAT</span>
    </div>

    {/* Service Letter Download Button */}
    <div className="popup-footer">
      <button
        className="download-btn"
        onClick={() => {
          const serviceLetter = "/documents/Hutch_Service_Letter.pdf"; // replace with your file path
          const link = document.createElement("a");
          link.href = serviceLetter;
          link.download = serviceLetter.split("/").pop();
          link.click();
        }}
      >
        📄 Download Service Letter
      </button>
    </div>
  </div>
</div>



            {/* Technical Skills */}
<div className="skills-section-enhanced">
  <div className="skill-category-card technical-skills">
    <h4>
      <span className="icon">💻</span>
      Technical Skills
    </h4>
    <ul className="skills-list">
      <li>JavaScript / React.js / Express.js</li>
      <li>Python (Flask) / Java / SpringBoot / C# / C++</li>
      <li>PHP / HTML / CSS / SQL</li>
      <li>MySQL / MongoDB / RESTful APIs</li>
      <li>Linux / Git / VS Code / Android Studio / XAMPP / MySQL Workbench</li>
    </ul>
  </div>

  {/* Professional Skills */}
  <div className="skill-category-card professional-skills">
    <h4>
      <span className="icon">🚀</span>
      Professional Skills
    </h4>
    <ul className="skills-list">
      <li>Project Management & Coordination</li>
      <li>Business Analysis & System Design</li>
      <li>Quality Assurance & Testing (UAT)</li>
      <li>Analytical & Critical Thinking</li>
      <li>Effective Communication & Teamwork</li>
      <li>Time Management & Problem Solving</li>
    </ul>
  </div>
</div>

            {/* Education Section */}
            <h3>Education</h3>
            <ul className="education-list">
              {educationResults.map((edu, index) => (
                <li
                  key={index}
                  onClick={() => toggleResultPopup(index)}
                  className="education-item"
                >
                  <div className="education-header">
                    <strong>{edu.title}</strong>
                    <span className="education-toggle">📊 View Results</span>
                  </div>
                  <div className="education-details">
                    {edu.institution}
                    <span className="education-year">({edu.year})</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Result Popup Modal */}
            {showResultPopup && (
              <div className="result-popup-overlay" onClick={closeResultPopup}>
                <div
                  className="result-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="popup-close-btn"
                    onClick={closeResultPopup}
                  >
                    ×
                  </button>

                  <div className="popup-header">
                    <h3>{educationResults[currentResultIndex]?.title}</h3>
                    <p className="popup-subtitle">
                      {educationResults[currentResultIndex]?.institution}
                    </p>
                  </div>

                  <div className="popup-content">
                    {educationResults[currentResultIndex]?.results ? (
                      <div className="results-table">
                        <div className="table-header">
                          <span>Subject/Module</span>
                          <span>Grade/Marks</span>
                        </div>
                        {educationResults[currentResultIndex].results.map(
                          (result, idx) => (
                            <div key={idx} className="table-row">
                              <span className="subject">{result.subject}</span>
                              <span className="grade">{result.grade}</span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="no-results">
                        <p>
                          Detailed results are not available for this
                          qualification.
                        </p>
                        <p className="result-status">
                          {educationResults[currentResultIndex]?.status}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="popup-footer">
                    <button
                      className="download-btn"
                      onClick={handleDownloadResults}
                    >
                      📥 Download Transcript
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <ContactForm />
        </div>
      </section>

      
        {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-icons">
            <a
              href="https://github.com/Tamasha2001"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tamasha-kavindi-7a9b94296?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BOhPr2AqqRiexmf9iLrzw3A%3D%3D"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:tamashakavindi674@gmail.com">
              <FaEnvelope />
            </a>
            <a href="tel:+94774243674">
              <FaPhoneAlt />
            </a>
            <a
              href="https://www.google.com/maps?q=Colombo,Sri+Lanka"
              target="_blank"
              rel="noreferrer"
            >
              <FaMapMarkerAlt />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Tamasha Kavindi — All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
  