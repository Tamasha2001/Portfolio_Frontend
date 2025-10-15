import React from "react";

// Updated ProjectCardModern component in your Home component
function ProjectCard({ project }) {
    const renderImage = () => {
        if (project.coverImage?.data) {
            return (
                <img
                    src={`data:${project.coverImage.contentType};base64,${project.coverImage.data}`}
                    alt={project.title}
                    className="project-image-modern"
                    loading="lazy"
                />
            );
        }
        return (
            <div className="project-image-modern placeholder" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                padding: '1rem'
            }}>
                {project.title}
            </div>
        );
    };

    return (
        <div className="project-card-modern" role="article">
            <div className="project-media-modern">
                {renderImage()}
                <div className="project-overlay">
                    <div className="overlay-content">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="overlay-btn"
                                onClick={(e) => e.stopPropagation()}
                            >
                                View Project
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-body-modern">
                <h3 className="project-title-modern">{project.title}</h3>
                <p className="project-desc-modern">{project.description}</p>

                <div className="project-footer">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-btn github-btn--outline"
                        >
                            View Code
                        </a>
                    )}
                    <span className="featured-badge">
                        ★ Featured
                    </span>
                </div>
            </div>
        </div>
    );
}
export default ProjectCard;