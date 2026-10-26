import { useEffect, useRef } from 'react';

// Original interactive halftone / moire interpretation inspired by contemporary
// editorial cursor art. Canvas is click-through; supports reduced motion.
export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const SIZE = 360;
    const R = SIZE / 2;
    let w = 0;
    let h = 0;
    let frame = 0;
    let lastMark = 0;
    let lastMove = 0;
    let tracking = false;
    let destroyed = false;
    let traces = [];
    const target = { x: -500, y: -500 };
    const current = { x: -500, y: -500 };

    const makeCanvas = () => {
      const el = document.createElement('canvas');
      el.width = SIZE;
      el.height = SIZE;
      return el;
    };
    const first = makeCanvas();
    const second = makeCanvas();
    const firstCtx = first.getContext('2d');
    const secondCtx = second.getContext('2d');
    const brush = makeCanvas();
    const brushCtx = brush.getContext('2d');
    if (!firstCtx || !secondCtx || !brushCtx) return;

    function dotPattern(c, space, color, radius) {
      c.fillStyle = color;
      for (let y = -15; y < SIZE + 15; y += space) {
        for (let x = -15; x < SIZE + 15; x += space) {
          c.beginPath();
          c.arc(x, y, radius, 0, Math.PI * 2);
          c.fill();
        }
      }
    }
    dotPattern(firstCtx, 11.5, '#c8ff65', 2.15);
    dotPattern(secondCtx, 11.75, '#f4f1ea', 1.85);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function paintBrush(now) {
      brushCtx.clearRect(0, 0, SIZE, SIZE);
      brushCtx.save();
      brushCtx.translate(R, R);

      // Two nearly overlapping dot screens produce a genuine interference pattern.
      brushCtx.save();
      brushCtx.rotate(-0.047 + Math.sin(now * 0.00047) * 0.025);
      brushCtx.globalAlpha = 0.97;
      brushCtx.drawImage(first, -R, -R);
      brushCtx.restore();

      brushCtx.save();
      brushCtx.rotate(0.069 + Math.sin(now * 0.0009) * 0.03);
      brushCtx.translate(Math.sin(now * 0.00125) * 6, Math.cos(now * 0.001) * 6);
      brushCtx.globalAlpha = 0.66;
      brushCtx.globalCompositeOperation = 'screen';
      brushCtx.drawImage(second, -R, -R);
      brushCtx.restore();

      // Fine interference rings give the halftone a fluid, refractive feel.
      brushCtx.lineWidth = 0.8;
      for (let i = 0; i < 8; i += 1) {
        const radius = 20 + i * 14 + Math.sin(now * 0.0008 + i) * 3;
        brushCtx.beginPath();
        brushCtx.arc(0, 0, radius, 0, Math.PI * 2);
        brushCtx.strokeStyle = i % 2
          ? 'rgba(200,255,101,0.17)'
          : 'rgba(244,241,234,0.10)';
        brushCtx.stroke();
      }
      brushCtx.restore();

      const falloff = brushCtx.createRadialGradient(R, R, 26, R, R, 170);
      falloff.addColorStop(0, 'rgba(255,255,255,1)');
      falloff.addColorStop(0.4, 'rgba(255,255,255,.98)');
      falloff.addColorStop(0.78, 'rgba(255,255,255,.68)');
      falloff.addColorStop(1, 'rgba(255,255,255,0)');
      brushCtx.globalCompositeOperation = 'destination-in';
      brushCtx.fillStyle = falloff;
      brushCtx.fillRect(0, 0, SIZE, SIZE);
      brushCtx.globalCompositeOperation = 'source-over';
    }

    function draw(now) {
      frame = 0;
      ctx.clearRect(0, 0, w, h);
      if (destroyed || reduced.matches || !fine.matches || document.hidden) {
        traces = [];
        return;
      }
      const age = now - lastMove;
      const visible = tracking && age < 1100;
      if (!visible && traces.length === 0) return;

      current.x += (target.x - current.x) * 0.25;
      current.y += (target.y - current.y) * 0.25;
      paintBrush(now);
      traces = traces.filter(p => now - p.t < 610);

      // Soft lingering disturbance in the wake of the cursor.
      for (const t of traces) {
        const life = 1 - (now - t.t) / 610;
        ctx.globalAlpha = Math.max(0, life) * 0.23;
        ctx.drawImage(brush, t.x - R, t.y - R);
      }

      if (visible) {
        const fade = Math.min(1, (1100 - age) / 220);
        ctx.globalAlpha = fade * 0.96;
        ctx.drawImage(brush, current.x - R, current.y - R);
      }
      ctx.globalAlpha = 1;
      if (visible || traces.length) frame = requestAnimationFrame(draw);
    }

    function wake() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function onMove(e) {
      if (e.pointerType === 'touch' || reduced.matches || !fine.matches) return;
      tracking = true;
      target.x = e.clientX;
      target.y = e.clientY;
      if (current.x < -100) {
        current.x = target.x;
        current.y = target.y;
      }
      const now = performance.now();
      lastMove = now;
      if (now - lastMark > 58) {
        lastMark = now;
        traces.push({x: target.x, y: target.y, t: now});
        if (traces.length > 7) traces.shift();
      }
      wake();
    }
    function onLeave() {
      tracking = false;
      wake();
    }
    function preferenceChanged() {
      if (reduced.matches || !fine.matches) {
        tracking = false;
        traces = [];
        cancelAnimationFrame(frame);
        frame = 0;
        ctx.clearRect(0, 0, w, h);
      }
    }
    function onVisibility() {
      if (document.hidden) preferenceChanged();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    if (reduced.addEventListener) reduced.addEventListener('change', preferenceChanged);
    else reduced.addListener(preferenceChanged);
    if (fine.addEventListener) fine.addEventListener('change', preferenceChanged);
    else fine.addListener(preferenceChanged);
    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      if (reduced.removeEventListener) reduced.removeEventListener('change', preferenceChanged);
      else reduced.removeListener(preferenceChanged);
      if (fine.removeEventListener) fine.removeEventListener('change', preferenceChanged);
      else fine.removeListener(preferenceChanged);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
