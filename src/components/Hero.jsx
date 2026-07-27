import React, { useState } from 'react';
import { Github, Linkedin, Youtube, Twitter, Mail, Copy, Check, ExternalLink, Plane, MapPin } from 'lucide-react';

export default function Hero({ data }) {
  const { personalInfo, stats } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="animate-fade-in" style={{ marginBottom: '40px' }}>
      {/* Availability Status Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }} className="badge badge-accent">
        <span className="glow-dot"></span>
        <span>{personalInfo.statusBadge}</span>
      </div>

      {/* Main Title & Role */}
      <h1 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '8px' }}>
        {personalInfo.name}
      </h1>
      
      <p style={{
        fontSize: '1.05rem',
        color: 'var(--accent-color)',
        fontWeight: '500',
        marginBottom: '20px',
        display: 'flex',
        align-items: 'center',
        gap: '6px'
      }}>
        <span>{personalInfo.title}</span>
        <span>•</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{personalInfo.location}</span>
      </p>

      {/* Bio Paragraphs */}
      <div style={{ fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '24px' }}>
        {personalInfo.bioParagraphs.map((para, idx) => (
          <p key={idx} style={{ marginBottom: '14px' }}>
            {para}
          </p>
        ))}
      </div>

      {/* Social & Contact Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
        {personalInfo.socialLinks.github && (
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="btn">
            <Github size={15} />
            <span>GitHub</span>
            <ExternalLink size={12} style={{ opacity: 0.5 }} />
          </a>
        )}

        {personalInfo.socialLinks.youtube && (
          <a href={personalInfo.socialLinks.youtube} target="_blank" rel="noreferrer" className="btn" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <Youtube size={15} style={{ color: '#ef4444' }} />
            <span>@thatyvrspotter</span>
            <ExternalLink size={12} style={{ opacity: 0.5 }} />
          </a>
        )}

        {personalInfo.socialLinks.linkedin && (
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="btn">
            <Linkedin size={15} style={{ color: '#0a66c2' }} />
            <span>LinkedIn</span>
          </a>
        )}

        {/* Copy Email Button */}
        <button onClick={handleCopyEmail} className="btn" style={{ cursor: 'pointer' }}>
          {copied ? <Check size={15} style={{ color: '#10b981' }} /> : <Mail size={15} />}
          <span>{copied ? 'Email Copied!' : personalInfo.email}</span>
          <Copy size={12} style={{ opacity: 0.5 }} />
        </button>
      </div>

      {/* Stats Counter Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px'
      }}>
        {stats.map((item, index) => (
          <div key={index} className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
