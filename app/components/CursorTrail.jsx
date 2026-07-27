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
    const MAX_POINTS = 45; // Reduced point count for quicker fade out

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      points.unshift({ x: e.clientX, y: e.clientY });
      if (points.length > MAX_POINTS) {
        points.pop();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          const ratio = 1 - i / (points.length - 1);
          // Faster exponential decay so the trail dissipates quickly
          const alpha = 0.65 * Math.pow(ratio, 2.2);
          const strokeWidth = Math.max(0.5, 6.0 * ratio);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 102, 0, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.shadowColor = `rgba(255, 120, 0, ${alpha * 0.6})`;
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
