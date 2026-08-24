'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let points = [];
    const TRAIL_LIFETIME = 90; // ms
    let animationFrameId;

    function resize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      points.unshift({ x: e.clientX, y: e.clientY, time: Date.now() });
    };

    window.addEventListener('mousemove', handleMouseMove);

    function render() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      const trailRgb = getComputedStyle(document.documentElement)
        .getPropertyValue('--trail-rgb')
        .trim() || '255, 102, 0';

      points = points.filter((p) => now - p.time < TRAIL_LIFETIME);

      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const age = now - p1.time;
          const ratio = Math.max(0, 1 - age / TRAIL_LIFETIME);
          if (ratio <= 0) continue;

          // Smooth quadratic falloff fading to complete 0% opacity at trailing tail
          const alpha = Math.max(0, 0.75 * Math.pow(ratio, 2.4));
          const strokeWidth = Math.max(0.1, 5.5 * ratio);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${trailRgb}, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.shadowColor = `rgba(${trailRgb}, ${alpha * 0.5})`;
          ctx.shadowBlur = 4 * ratio;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', resize);
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
        zIndex: 99999
      }}
    />
  );
}
