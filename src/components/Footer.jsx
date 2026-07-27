import React from 'react';
import { Heart, Compass, ArrowUp } from 'lucide-react';

export default function Footer({ name }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '30px 24px',
      marginTop: '60px',
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        display: 'flex',
        align-items: 'center',
        justify-content: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          © {new Date().getFullYear()} {name}. Built with precision, performance & minimalism.
        </div>

        <button 
          onClick={scrollToTop} 
          className="btn"
          style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '4px' }}
        >
          <span>Back to top</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
