'use client';

export default function ProgressiveBlur() {
  return (
    <>
      {/* Top Progressive Blur Overlay (Solid var(--bg) behind navbar 0-60px, blur gradient 60-110px) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '110px',
          pointerEvents: 'none',
          zIndex: 900,
          background: 'linear-gradient(to bottom, var(--bg) 0px, var(--bg) 60px, transparent 110px)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(to bottom, black 0px, black 60px, transparent 110px)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0px, black 60px, transparent 110px)'
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
