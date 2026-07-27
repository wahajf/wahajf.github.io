'use client';

export default function ProgressiveBlur() {
  return (
    <>
      {/* Top Progressive Blur Overlay (Behind Navbar at z-index: 900) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '90px',
          pointerEvents: 'none',
          zIndex: 900,
          background: 'linear-gradient(to top, transparent 0%, var(--bg) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
        }}
      />

      {/* Bottom Progressive Blur Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          pointerEvents: 'none',
          zIndex: 900,
          background: 'linear-gradient(to bottom, transparent 0%, var(--sub-bg) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
        }}
      />
    </>
  );
}
