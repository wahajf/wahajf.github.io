import React from 'react';
import { Sun, Moon, Zap, Edit3, Compass } from 'lucide-react';

export default function Navbar({ theme, setTheme, onOpenEditor }) {
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('neon');
    else setTheme('light');
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      align-items: 'center',
      justify-content: 'center',
      padding: '0 24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        display: 'flex',
        align-items: 'center',
        justify-content: 'space-between'
      }}>
        {/* Brand Logo & Location */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--text-main)',
            color: 'var(--bg-primary)',
            display: 'flex',
            align-items: 'center',
            justify-content: 'center',
            fontWeight: '700',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-heading)'
          }}>
            WF
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
              Wahaj Farooq
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass size={11} /> YVR • Vancouver
            </div>
          </div>
        </a>

        {/* Navigation Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Live Profile Editor Trigger */}
          <button 
            onClick={onOpenEditor}
            title="Edit Profile Content (Live)"
            className="btn"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Edit3 size={14} />
            <span style={{ display: 'none', minWidth: '400px' }}>Edit</span>
          </button>

          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="btn"
            style={{
              padding: '6px 12px',
              display: 'flex',
              align-items: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' && (
              <>
                <Sun size={14} style={{ color: '#eab308' }} />
                <span>Light</span>
              </>
            )}
            {theme === 'dark' && (
              <>
                <Moon size={14} style={{ color: '#a855f7' }} />
                <span>Dark</span>
              </>
            )}
            {theme === 'neon' && (
              <>
                <Zap size={14} style={{ color: '#06b6d4' }} />
                <span>Aviation</span>
              </>
            )}

            {/* Geometric Circle & Square signature icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-main)' }}></span>
              <span style={{ width: '7px', height: '7px', background: 'var(--text-main)' }}></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
