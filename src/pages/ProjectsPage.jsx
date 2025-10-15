// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProjectCardModern from "../components/ProjectCard";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const res = await API.get("/projects");
      setAllProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="projects-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <Link to="/" className="back-btn">
        ← Back to Home
      </Link>

      <div className="projects-page-header">
        <h1>All Projects</h1>
        <p className="projects-subtitle">
          Explore my complete portfolio of work and personal projects
        </p>
      </div>

      <div className="projects-grid-full">
        {allProjects.map(project => (
          <ProjectCardModern key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}