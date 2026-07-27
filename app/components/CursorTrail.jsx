'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let points = [];
    const TRAIL_LIFETIME = 350; // ms

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      points.unshift({ x: e.clientX, y: e.clientY, time: Date.now() });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Read dynamic accent RGB color for trail
      const trailRgb = getComputedStyle(document.documentElement).getPropertyValue('--trail-rgb').trim() || '255, 102, 0';

      points = points.filter(p => now - p.time < TRAIL_LIFETIME);

      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const age = now - p1.time;
          const ratio = Math.max(0, 1 - age / TRAIL_LIFETIME);
          if (ratio <= 0) continue;

          const alpha = 0.65 * Math.pow(ratio, 1.8);
          const strokeWidth = Math.max(0.5, 6.5 * ratio);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${trailRgb}, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.shadowColor = `rgba(${trailRgb}, ${alpha * 0.6})`;
          ctx.shadowBlur = 6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
