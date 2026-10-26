import { useEffect, useRef } from 'react';

// Small, accessible pointer trail. No dependencies and never intercepts clicks.
export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: fine)');
    let particles = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let last = 0;
    let destroyed = false;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(time) {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      if (destroyed || motion.matches || !pointer.matches || document.hidden) {
        particles = [];
        return;
      }

      particles = particles.filter((p) => time - p.start < p.life);
      for (const p of particles) {
        const age = Math.max(0, (time - p.start) / p.life);
        const size = p.size * (1 - age * 0.42);
        ctx.globalAlpha = (1 - age) * (1 - age) * p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      if (particles.length) raf = requestAnimationFrame(draw);
    }

    function wake() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    function move(e) {
      if (motion.matches || !pointer.matches || document.hidden || e.pointerType === 'touch') return;
      const now = performance.now();
      if (now - last < 19) return;
      last = now;
      const x = e.clientX;
      const y = e.clientY;
      const grid = 11;
      const snapX = Math.round(x / grid) * grid;
      const snapY = Math.round(y / grid) * grid;

      particles.push({
        x: snapX, y: snapY, start: now, life: 530,
        size: 9, alpha: 0.82, color: '#c8ff65'
      });
      if (Math.random() > 0.45) {
        particles.push({
          x: snapX + (Math.random() > 0.5 ? grid : -grid),
          y: snapY + (Math.random() > 0.5 ? grid : -grid),
          start: now, life: 370,
          size: 6, alpha: 0.49, color: '#f4f1ea'
        });
      }
      if (particles.length > 85) particles.splice(0, particles.length - 85);
      wake();
    }

    function clearOnPreference() {
      if (motion.matches || !pointer.matches) {
        particles = [];
        ctx.clearRect(0, 0, width, height);
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    function onVisibility() {
      if (document.hidden) clearOnPreference();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (motion.addEventListener) motion.addEventListener('change', clearOnPreference);
    else motion.addListener(clearOnPreference);
    if (pointer.addEventListener) pointer.addEventListener('change', clearOnPreference);
    else pointer.addListener(clearOnPreference);

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', onVisibility);
      if (motion.removeEventListener) motion.removeEventListener('change', clearOnPreference);
      else motion.removeListener(clearOnPreference);
      if (pointer.removeEventListener) pointer.removeEventListener('change', clearOnPreference);
      else pointer.removeListener(clearOnPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 80,
        pointerEvents: 'none',
        touchAction: 'auto',
      }}
    />
  );
}
