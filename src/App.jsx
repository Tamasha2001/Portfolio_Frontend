import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminProjects from "./pages/AdminProjects";
import ProjectsPage from "./pages/ProjectsPage.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/AdminProjects" element={<AdminProjects />} />
      </Routes>
    </Router>
  );
}