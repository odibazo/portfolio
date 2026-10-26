import { useEffect, useRef } from 'react';

// A lightweight, original interactive current: canvas only, no video or WebGL dependency.
export default function TidalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let visible = true;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.76, y: 0.45 };
    const mouseQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) draw(0);
    };

    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      pointer.y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
    };

    const onMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        draw(0);
      } else if (visible) {
        frame = requestAnimationFrame(tick);
      }
    };

    function draw(time) {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const compact = width < 670;
      const rows = compact ? 22 : 34;
      const steps = compact ? 42 : 76;
      const left = compact ? width * 0.07 : width * 0.31;
      const right = width * 1.09;
      const px = pointer.x * width;
      const py = pointer.y * height;

      // Faint diagonal beam provides depth without an image asset.
      const glow = ctx.createRadialGradient(width * 0.79, height * 0.49, 1, width * 0.79, height * 0.49, width * 0.65);
      glow.addColorStop(0, 'rgba(153, 235, 174, 0.10)');
      glow.addColorStop(0.46, 'rgba(65, 176, 157, 0.055)');
      glow.addColorStop(1, 'rgba(9, 15, 16, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let row = 0; row < rows; row += 1) {
        const depth = row / Math.max(1, rows - 1);
        const base = height * (compact ? 0.19 : 0.10) + depth * height * (compact ? 0.61 : 0.83);
        const opacity = (0.08 + depth * 0.35).toFixed(3);
        ctx.beginPath();
        ctx.lineWidth = depth > 0.55 ? 1.1 : 0.8;
        ctx.strokeStyle = `rgba(163, 237, 173, ${opacity})`;

        for (let col = 0; col <= steps; col += 1) {
          const progress = col / steps;
          const x = left + (right - left) * progress;
          const distance = ((x - px) ** 2) / (width * width * 0.056) + ((base - py) ** 2) / (height * height * 0.14);
          const interaction = Math.exp(-distance) * (compact ? 6 : 24);
          const wave = Math.sin(progress * 13 + row * 0.33 - time * 0.0005) * (6 + depth * 18);
          const swell = Math.sin(progress * 4.3 - row * 0.23 + time * 0.00025) * (7 + depth * 26);
          const perspective = Math.sin(progress * Math.PI) * (depth - 0.5) * 24;
          const y = base + wave + swell + perspective - interaction;
          if (col === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const nodes = compact ? 16 : 34;
      for (let j = 0; j < nodes; j += 1) {
        const u = (j * 0.61803398875) % 1;
        const v = (j * 0.41421356237) % 1;
        const x = left + (right - left) * u;
        const y = height * (0.12 + v * 0.72) + Math.sin(time * 0.0007 + j) * (reducedMotion ? 0 : 5);
        ctx.beginPath();
        ctx.arc(x, y, j % 5 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = j % 5 === 0 ? 'rgba(216,255,171,.76)' : 'rgba(174,242,203,.35)';
        ctx.fill();
      }
    }

    function tick(time) {
      if (!running || !visible || reducedMotion) return;
      draw(time);
      frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    }, { threshold: 0.01 });

    resize();
    observer.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    if (mouseQuery.addEventListener) mouseQuery.addEventListener('change', onMotionChange);
    else mouseQuery.addListener(onMotionChange);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      if (mouseQuery.removeEventListener) mouseQuery.removeEventListener('change', onMotionChange);
      else mouseQuery.removeListener(onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="tidal-field" aria-hidden="true" />;
}
