import { useEffect, useRef } from 'react';

// Pixel trail adapted from the small interactive sample:
// scattered squares, no optical interference or cursor replacement.
export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let particles = [];
    let disposed = false;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(now) {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      if (disposed || document.hidden || motion.matches || !finePointer.matches) {
        particles = [];
        return;
      }
      particles = particles.filter(p => now - p.time < p.life);
      for (const p of particles) {
        const progress = (now - p.time) / p.life;
        const alpha = Math.pow(Math.max(0, 1 - progress), 1.6);
        ctx.globalAlpha = alpha * p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      if (particles.length) raf = requestAnimationFrame(draw);
    }

    function wake() {
      if (!raf) raf = requestAnimationFrame(draw);
    }
    function onMove(event) {
      if (event.pointerType === 'touch' || motion.matches || !finePointer.matches) return;
      const now = performance.now();
      if (now - last < 17) return;
      last = now;

      // A distinct geometric trace that is deliberately more graphic than a glow.
      const snap = 12;
      for (let i = 0; i < 9; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 30;
        const x = event.clientX + Math.cos(angle) * radius;
        const y = event.clientY + Math.sin(angle) * radius;
        particles.push({
          x: Math.floor(x / snap) * snap,
          y: Math.floor(y / snap) * snap,
          time: now - Math.random() * 110,
          life: 670 + Math.random() * 110,
          size: Math.random() > .85 ? 11 : 9,
          opacity: .64 + Math.random() * .34,
          color: Math.random() > .38 ? '#c8ff65' : '#8eaaa0'
        });
      }
      if (particles.length > 210) particles.splice(0, particles.length - 210);
      wake();
    }
    function clear() {
      particles = [];
      cancelAnimationFrame(raf);
      raf = 0;
      ctx.clearRect(0, 0, width, height);
    }
    function onVisibility() {
      if (document.hidden) clear();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (motion.addEventListener) motion.addEventListener('change', clear);
    else motion.addListener(clear);
    if (finePointer.addEventListener) finePointer.addEventListener('change', clear);
    else finePointer.addListener(clear);

    return () => {
      disposed = true;
      clear();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      if (motion.removeEventListener) motion.removeEventListener('change', clear);
      else motion.removeListener(clear);
      if (finePointer.removeEventListener) finePointer.removeEventListener('change', clear);
      else finePointer.removeListener(clear);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={{
    position: 'fixed', inset: 0, zIndex: 80, width: '100%', height: '100%',
    pointerEvents: 'none'
  }} />;
}
