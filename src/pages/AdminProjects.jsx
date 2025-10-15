import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        repoUrl: "",
        coverImage: null
    });
    const [editingId, setEditingId] = useState(null);

    // Fetch projects from backend
    const fetchProjects = async () => {
        try {
            const res = await API.get("/projects");
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle form input changes
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("repoUrl", form.repoUrl);

            // Append file if selected
            if (form.coverImage instanceof File) {
                formData.append("coverImage", form.coverImage);
            }

            if (editingId) {
                await API.put(`/projects/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setEditingId(null);
            } else {
                await API.post("/projects", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setForm({ title: "", description: "", repoUrl: "", coverImage: null });
            fetchProjects();
        } catch (err) {
            console.error(err);
            alert("Failed to save project");
        }
    };

    // Delete project
    const handleDelete = async id => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await API.delete(`/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    // Edit project
    const handleEdit = project => {
        setForm({
            title: project.title,
            description: project.description,
            repoUrl: project.repoUrl,
            coverImage: null // Reset file input when editing
        });
        setEditingId(project._id);
    };

    // Function to render image in admin
    const renderImage = (project) => {
        if (project.coverImage && project.coverImage.data) {
            return (
                <img
                    src={`data:${project.coverImage.contentType};base64,${project.coverImage.data}`}
                    alt={project.title}
                    style={{ maxWidth: "300px", marginTop: "10px" }}
                />
            );
        }
        return null;
    };

    return (
        <div className="admin-projects">
            <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Project Title" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
                <input name="repoUrl" value={form.repoUrl} onChange={handleChange} placeholder="GitHub Repository URL" />
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={e => setForm({ ...form, coverImage: e.target.files[0] })}
                />
                <button type="submit">{editingId ? "Update Project" : "Add Project"}</button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ title: "", description: "", repoUrl: "", coverImage: null });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h2>Existing Projects</h2>
            <div className="projects-list">
                {projects.map(p => (
                    <div key={p._id} className="project-item">
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        {p.repoUrl && (
                            <div className="admin-github-row">
                                <a
                                    className="github-btn github-btn--outline"
                                    href={p.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${p.title} on GitHub`}
                                >
                                    Go to GitHub
                                </a>
                            </div>
                        )}
                        {renderImage(p)}
                        <div className="actions">
                            <button onClick={() => handleEdit(p)}>Edit</button>
                            <button onClick={() => handleDelete(p._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}