'use client';

import { useState, useEffect } from 'react';

export default function SectionSidebar() {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.querySelector(sections[i].href);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    setActiveSection(sectionId);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="Section Navigation"
      className="section-sidebar-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 900,
        backgroundColor: 'var(--nav-bg)',
        border: 'var(--nav-border)',
        borderRadius: '16px',
        padding: '6px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.25s ease'
      }}
    >
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted)',
          padding: '4px 10px 2px 10px'
        }}
      >
        Sections
      </div>

      {sections.map((item) => {
        const isActive = activeSection === item.href.substring(1);
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleSectionClick(e, item.href)}
            style={{
              fontSize: '0.8rem',
              fontWeight: '500',
              padding: '5px 12px',
              borderRadius: '10px',
              color: isActive ? 'var(--pill-active-text)' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--pill-active-bg)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <span>{item.label}</span>
            {isActive && (
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent, var(--text))'
                }}
              />
            )}
          </a>
        );
      })}
    </aside>
  );
}
