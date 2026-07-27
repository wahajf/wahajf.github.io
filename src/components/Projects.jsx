import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Search, Filter, Sparkles, X } from 'lucide-react';

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web Development', 'Aviation Media', 'Side Project'];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <FolderGit2 size={18} style={{ color: 'var(--accent-color)' }} />
          <span>Projects</span>
          <sup>{filteredProjects.length}</sup>
        </h2>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="badge"
              style={{
                cursor: 'pointer',
                padding: '6px 12px',
                fontSize: '0.8rem',
                backgroundColor: activeCategory === cat ? 'var(--text-main)' : 'var(--badge-bg)',
                color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--badge-text)',
                borderColor: activeCategory === cat ? 'var(--text-main)' : 'var(--border-color)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px 6px 30px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="card"
            style={{ padding: '16px 20px', cursor: 'pointer' }}
            onClick={() => setSelectedProject(project)}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  {project.title}
                </span>
                {project.featured && (
                  <span className="badge badge-accent" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                    <Sparkles size={10} /> Featured
                  </span>
                )}
              </div>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {project.period}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="badge" style={{ fontSize: '0.72rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" title="GitHub Source" style={{ color: 'var(--text-muted)' }}>
                    <Github size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" title="Live Preview" style={{ color: 'var(--accent-color)' }}>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No projects found matching your search.
          </div>
        )}
      </div>

      {/* Selected Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-accent" style={{ marginBottom: '6px' }}>{selectedProject.category}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{selectedProject.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="btn" 
                style={{ padding: '6px', borderRadius: '50%' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '20px' }}>
              {selectedProject.description}
            </p>

            {selectedProject.youtubeId && (
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '20px',
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                background: '#000'
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=0`}
                  title={selectedProject.title}
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                ></iframe>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {selectedProject.tags.map((tag, idx) => (
                <span key={idx} className="badge" style={{ fontSize: '0.78rem' }}>{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="btn">
                  <Github size={15} /> View Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <ExternalLink size={15} /> Visit Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
