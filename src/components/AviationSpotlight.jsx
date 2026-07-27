import React, { useState } from 'react';
import { Plane, Play, ChevronDown, ChevronUp, Youtube, Camera, ExternalLink } from 'lucide-react';

export default function AviationSpotlight({ projects }) {
  // Find @thatyvrspotter project from data or use default YouTube ID
  const aviationProj = projects.find(p => p.title.toLowerCase().includes('yvrspotter')) || projects[0];
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  return (
    <section style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <Plane size={18} style={{ color: 'var(--accent-color)' }} />
          <span>Aviation Spotlight: @thatyvrspotter</span>
          <sup>LIVE</sup>
        </h2>
        
        <a 
          href="https://youtube.com/@thatyvrspotter" 
          target="_blank" 
          rel="noreferrer"
          style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>Visit Channel</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background ambient plane vector */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          opacity: 0.05,
          pointerEvents: 'none',
          color: 'var(--text-main)'
        }}>
          <Plane size={140} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-accent">
                <Camera size={11} /> YVR Aviation Videography
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>2024 – Present</span>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: '6px 0' }}>
              Documenting commercial heavies, rare liveries, crosswind landings, and flight ops at Vancouver International Airport.
            </p>
          </div>

          <button 
            onClick={() => setIsVideoOpen(!isVideoOpen)}
            className="btn btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            {isVideoOpen ? <ChevronUp size={15} /> : <Play size={15} />}
            <span>{isVideoOpen ? 'Hide Video' : 'Watch Feature Video'}</span>
          </button>
        </div>

        {/* Embedded Responsive YouTube Player */}
        {isVideoOpen && (
          <div className="animate-fade-in" style={{
            marginTop: '16px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            background: '#000'
          }}>
            <iframe
              src={`https://www.youtube.com/embed/${aviationProj?.youtubeId || 'JSh_f35lJnQ'}?autoplay=0&rel=0`}
              title="thatyvrspotter Aviation Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}
