'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { profileData } from '../data/profileData';

export default function PillNavbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const syncTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
      setTheme(currentTheme);
    };

    syncTheme();

    const observer = new MutationObserver(() => {
      syncTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-accent']
    });

    window.addEventListener('storage', syncTheme);
    window.addEventListener('themechange', syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('themechange'));
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  const handleNavClick = (e, item) => {
    setIsMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname.includes('/wahajfarooq')) {
      e.preventDefault();
      const targetPath = item.href === '/' ? '/wahajfarooq/' : `/wahajfarooq${item.href}`;
      window.location.href = targetPath;
    }
  };

  const iconStyle = {
    color: 'var(--muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    background: 'transparent',
    border: 'none',
    padding: '4px',
    opacity: 0.75,
    transition: 'opacity 0.15s ease, color 0.15s ease'
  };

  return (
    <>
      {/* Top Progressive Blur Overlay (Hides on scroll down, shows on scroll up) */}
      <div
        className="progressive-blur-top"
        aria-hidden="true"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
          pointerEvents: 'none'
        }}
      />

      {/* DESKTOP NAV (> 768px) */}
      <div
        className="desktop-nav"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-120%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
          width: 'calc(100% - 48px)',
          maxWidth: '620px',
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none'
        }}
      >
        {/* Left Aligned: Main Navbar + Circle Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
          {/* Desktop Navigation Links Container */}
          <nav style={{
            position: 'relative',
            backgroundColor: 'var(--nav-bg)',
            border: 'var(--nav-border)',
            borderRadius: '9999px',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            boxShadow: 'none'
          }}>
            {/* Sliding Active Pill Background */}
            <div
              style={{
                position: 'absolute',
                top: '3px',
                bottom: '3px',
                left: (pathname?.startsWith('/blog')) ? 'calc(50% + 1.5px)' : '3px',
                width: 'calc(50% - 4.5px)',
                backgroundColor: 'var(--pill-active-bg)',
                borderRadius: '9999px',
                transition: 'left 0.28s cubic-bezier(0.16, 1, 0.3, 1), width 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? (!pathname || pathname === '/' || pathname === '')
                : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    color: isActive ? 'var(--pill-active-text)' : 'var(--nav-text)',
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '500',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    transition: 'color 0.22s ease',
                    cursor: 'pointer',
                    lineHeight: '1.2',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle Pill (0% Opacity Background in Light Mode on Desktop) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: theme === 'light' ? 'transparent' : 'var(--nav-bg)',
              border: 'var(--nav-border)',
              color: 'var(--nav-icon-color)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              outline: 'none',
              boxShadow: 'none'
            }}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Right Aligned Flush: Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: 'auto' }}>
          <a
            href={`mailto:${profileData.socialLinks.email}`}
            aria-label="Email"
            title="Email"
            style={iconStyle}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>

          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={iconStyle}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            style={{ ...iconStyle, padding: '4px 0 4px 4px' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* MOBILE HEADER (≤ 768px) */}
      <div
        className="mobile-header"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: isVisible ? 'translateY(0)' : 'translateY(-120%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Mobile-only Logo */}
        <span style={{
          fontSize: '0.98rem',
          fontWeight: '500',
          color: 'var(--text)',
          pointerEvents: 'auto',
          letterSpacing: '-0.01em'
        }}>
          Wahaj Farooq
        </span>

        {/* Right: Hamburger Trigger Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Navigation Menu"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            outline: 'none',
            padding: '4px'
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* FULLSCREEN MOBILE OVERLAY MENU */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--menu-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 2000,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1)',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        {/* Top Right Close Icon (X) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Vertically Arranged Menu Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: 'auto 0' }}>
          {navItems.map((item) => {
            const isActive = item.href === '/'
              ? (pathname === '/' || pathname === '')
              : pathname?.startsWith(item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                style={{
                  fontSize: '1.6rem',
                  fontWeight: '500',
                  color: isActive ? 'var(--pill-active-text)' : 'var(--text)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Bottom Bar inside Menu: Icon-only Theme Toggle & Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingTop: '12px' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
            style={iconStyle}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href={`mailto:${profileData.socialLinks.email}`} aria-label="Email" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
