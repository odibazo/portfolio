import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Text is rasterized from a heavyweight sans serif, then rebuilt as tiny cubes.
// Unlike a hand-built bitmap, its outline tracks real typographic shapes.
const TYPEFACE = "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const MESSAGES = [
  'Congratulations. You broke an error.',
  'Technically, this is still a website.',
  'The pixels would like to speak to a manager.',
  'Nothing was found. Something was launched.',
  'Your chaos has been registered.',
  '404: restraint not found.',
];

export default function Play404() {
  const canvasRef = useRef(null);
  const shockRef = useRef(null);
  const resetRef = useRef(null);
  const [hits, setHits] = useState(0);
  const [message, setMessage] = useState('Touch the tiny cubes carefully. Only one falls at a time.');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const body = [];
    let width = 1;
    let height = 1;
    let raf = 0;
    let active = false;
    let destroyed = false;
    let previous = 0;
    let lastPreciseHit = -Infinity;

    function reset() {
      body.length = 0;
      lastPreciseHit = -Infinity;
      const maskCanvas = document.createElement('canvas');
      const pxWidth = Math.ceil(width);
      const pxHeight = Math.ceil(height);
      maskCanvas.width = pxWidth;
      maskCanvas.height = pxHeight;
      const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      if (!maskCtx) return;

      let fontSize = Math.min(width * .6, height * 1.2);
      const setFont = () => {
        maskCtx.font = '900 ' + fontSize + 'px ' + TYPEFACE;
      };
      setFont();
      const initial = maskCtx.measureText('404');
      const initialHeight = Math.max(1, (initial.actualBoundingBoxAscent || fontSize * .75) +
        (initial.actualBoundingBoxDescent || fontSize * .03));
      const scale = Math.min(
        width * .955 / Math.max(1, initial.width),
        height * .88 / initialHeight
      );
      fontSize *= scale;
      setFont();
      const measured = maskCtx.measureText('404');
      const ascent = measured.actualBoundingBoxAscent || fontSize * .75;
      const descent = measured.actualBoundingBoxDescent || fontSize * .03;
      const textX = width / 2;
      const textY = (height + ascent - descent) / 2;

      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'alphabetic';
      maskCtx.fillStyle = '#ffffff';
      maskCtx.strokeStyle = '#ffffff';
      maskCtx.lineJoin = 'round';
      // Thickens the font if the OS doesn't offer a real black/900 face.
      maskCtx.lineWidth = fontSize * .026;
      maskCtx.strokeText('404', textX, textY);
      maskCtx.fillText('404', textX, textY);

      const alpha = maskCtx.getImageData(0, 0, pxWidth, pxHeight).data;
      const step = Math.max(5, Math.min(12, width / 105));
      const cubeSize = step * .79;
      const left = (width - measured.width) / 2;
      const zeroLeft = left + maskCtx.measureText('4').width;
      const zeroRight = zeroLeft + maskCtx.measureText('0').width;

      for (let y = step / 2; y < height - step / 2; y += step) {
        for (let x = step / 2; x < width - step / 2; x += step) {
          const sampleX = Math.min(pxWidth - 1, Math.floor(x));
          const sampleY = Math.min(pxHeight - 1, Math.floor(y));
          const index = (sampleY * pxWidth + sampleX) * 4 + 3;
          if (alpha[index] < 160) continue;
          body.push({
            x: x - cubeSize / 2, y: y - cubeSize / 2,
            vx: 0, vy: 0, rotation: 0, spin: 0,
            size: cubeSize, loose: false,
            tone: x >= zeroLeft && x <= zeroRight ? '#c8ff65' : '#f4f1ea',
          });
        }
      }
      setHits(0);
      setMessage('Move across the 404 or launch an explosion.');
      render();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      reset();
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      const ground = height - 19;
      ctx.strokeStyle = 'rgba(244,241,234,.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(width, ground);
      ctx.stroke();

      // Fast flat draw for resting cubes; rotate only the scattered ones.
      for (const p of body) {
        ctx.fillStyle = p.tone;
        if (!p.loose || Math.abs(p.rotation) < .002) {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          ctx.save();
          ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
          ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      ctx.fillStyle = 'rgba(244,241,234,.25)';
      ctx.font = '12px monospace';
      ctx.fillText('ODI BAZÓ / PIXEL PLAYGROUND', 16, 25);
      ctx.textAlign = 'right';
      ctx.fillText('PRESS SPACE TO BREAK IT', width - 16, 25);
      ctx.textAlign = 'left';
    }

    function tick(time) {
      raf = 0;
      if (destroyed || document.hidden || !active) return;
      const scale = Math.min((time - (previous || time)) / 16.67, 2);
      previous = time;
      if (!reduce.matches) {
        for (const p of body) {
          if (!p.loose) continue;
          p.vy += 0.26 * scale;
          p.x += p.vx * scale;
          p.y += p.vy * scale;
          p.rotation += p.spin * scale;
          p.vx *= Math.pow(.994, scale);
          p.spin *= Math.pow(.985, scale);
          const ground = height - 19 - p.size;
          if (p.y > ground) {
            p.y = ground;
            p.vy *= -.56;
            if (Math.abs(p.vy) < .55) p.vy = 0;
            p.vx *= .93;
            p.spin *= .88;
          }
          if (p.x < 0) { p.x = 0; p.vx *= -.7; }
          if (p.x > width - p.size) { p.x = width - p.size; p.vx *= -.7; }
        }
      }
      render();
      raf = requestAnimationFrame(tick);
    }

    function wake() {
      if (!raf && active) raf = requestAnimationFrame(tick);
    }

    function repel(x, y, power, range) {
      if (reduce.matches) return;
      for (const p of body) {
        const dx = p.x + p.size / 2 - x;
        const dy = p.y + p.size / 2 - y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist >= range) continue;
        const kick = (1 - dist / range) * power;
        p.loose = true;
        p.vx += (dx / dist) * kick + (Math.random() - .5) * 1.2;
        p.vy += (dy / dist) * kick - 2.2;
        p.spin += (Math.random() - .5) * 0.13;
      }
      wake();
    }

    // Precision mode: the pointer must actually touch an intact cube.
    // One hover event can never release more than one block.
    function knockOne(x, y, now = performance.now()) {
      if (reduce.matches || now - lastPreciseHit < 140) return false;

      let selected = null;
      let bestDistance = Infinity;
      for (const p of body) {
        if (p.loose) continue;
        const cx = p.x + p.size / 2;
        const cy = p.y + p.size / 2;
        // The hitbox is smaller than one tile: no area-of-effect collisions.
        const hit = p.size * .45;
        if (Math.abs(x - cx) > hit || Math.abs(y - cy) > hit) continue;
        const distance = Math.hypot(x - cx, y - cy);
        if (distance < bestDistance) {
          selected = p;
          bestDistance = distance;
        }
      }
      if (!selected) return false;

      lastPreciseHit = now;
      selected.loose = true;
      selected.vx = (Math.random() - .5) * 2.2;
      selected.vy = -1.8 - Math.random() * 1.5;
      selected.spin = (Math.random() - .5) * .075;
      setHits(h => h + 1);
      setMessage('One cube at a time. How many can you knock down?');
      wake();
      return true;
    }

    function onMove(e) {
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      knockOne(e.clientX - rect.left, e.clientY - rect.top);
    }

    function burst(x, y) {
      if (reduce.matches) return;
      repel(x, y, 19, Math.max(430, width * .85));
      setHits(h => {
        const next = h + 1;
        setMessage(MESSAGES[(next - 1) % MESSAGES.length]);
        return next;
      });
    }
    function onDown(e) {
      const rect = canvas.getBoundingClientRect();
      // Click/tap is also precise; only the dedicated chaos button scatters all.
      knockOne(e.clientX - rect.left, e.clientY - rect.top);
    }
    function onKey(e) {
      if (e.code === 'Space' && !(e.target instanceof HTMLButtonElement) && !(e.target instanceof HTMLAnchorElement)) {
        e.preventDefault();
        burst(width / 2, height * .4);
      }
    }
    function changeVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    }
    function reduceChanged() {
      reset();
      wake();
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) wake();
      else { cancelAnimationFrame(raf); raf = 0; previous = 0; }
    }, { threshold: .01 });
    shockRef.current = () => burst(width / 2, height * .42);
    resetRef.current = () => reset();
    resize();
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', changeVisibility);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    if (reduce.addEventListener) reduce.addEventListener('change', reduceChanged);
    else reduce.addListener(reduceChanged);
    return () => {
      destroyed = true;
      shockRef.current = null;
      resetRef.current = null;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', changeVisibility);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      if (reduce.removeEventListener) reduce.removeEventListener('change', reduceChanged);
      else reduce.removeListener(reduceChanged);
    };
  }, []);

  return (
    <>
      <Head>
        <title>404 Playground — Odi Bazó</title>
        <meta name="description" content="An original little interactive error experiment by Odi Bazó. Scatter the 404." />
      </Head>
      <main className="play">
        <header className="top">
          <Link href="/#work" className="back">← BACK TO WORK</Link>
          <span>ODI BAZÓ / EXPERIMENT 009</span>
        </header>
        <div className="intro">
          <span>NOT FOUND / INTERACTIVE STUDY</span>
          <h1>Break the <em>404.</em></h1>
          <p>Nothing to see here. Catch the cubes one at a time.</p>
        </div>
        <div className="game">
          <canvas
            ref={canvasRef}
            aria-label="404 made of tiny squares. Touch a square with your pointer to release it individually. The buttons scatter all squares or reset."
            role="img"
          />
          <div className="controls">
            <div aria-live="polite" className="status">{message} <span>CHAOS: {String(hits).padStart(2, '0')}</span></div>
            <div className="buttons">
              <button type="button" onClick={() => shockRef.current?.()}>CHAOS MODE ↗</button>
              <button type="button" onClick={() => resetRef.current?.()}>RESET ↺</button>
            </div>
          </div>
        </div>
        <footer>DESIGNED TO BE USELESS. MADE TO MAKE YOU SMILE. <Link href="/#work">RETURN TO PROJECTS ↗</Link></footer>
      </main>
      <style jsx>{`
        .play{min-height:100vh;background:#0b0b0c;color:#f4f1ea;font-family:Arial,Helvetica,sans-serif;padding:0 clamp(20px,5vw,88px)}
        .top{min-height:84px;display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid #454545;font-size:12px;letter-spacing:.11em;color:#aaa8a3}
        .top :global(a),footer :global(a){color:#f4f1ea;text-decoration:none;transition:color .2s}
        .top :global(a):hover,footer :global(a):hover{color:#c8ff65}
        .intro{padding:60px 0 35px}
        .intro span{font-size:12px;color:#c8ff65;letter-spacing:.12em}
        h1{font-size:clamp(64px,11vw,174px);margin:8px 0 16px;line-height:.91;letter-spacing:-.08em;font-weight:900;font-family:'Arial Black',Helvetica,Arial,sans-serif}
        h1 em{font-style:normal;color:#c8ff65}
        p{margin:0;color:#aaa8a3;font-size:clamp(15px,1.8vw,20px);line-height:1.4}
        .game{position:relative;border:1px solid #3f4140;background:radial-gradient(ellipse at 50% 30%,#1b221a 0%,#111313 45%,#0b0b0c 85%);margin-bottom:40px}
        canvas{display:block;width:100%;height:min(57vw,660px);min-height:440px;touch-action:none;cursor:crosshair}
        .controls{border-top:1px solid #353535;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:18px 22px}
        .status{font:12px/1.5 monospace;color:#aaa8a3;display:flex;flex-wrap:wrap;gap:18px}
        .status span{color:#c8ff65;white-space:nowrap}
        .buttons{display:flex;flex-wrap:wrap;gap:8px}
        button{border:1px solid #71736d;background:transparent;color:#f4f1ea;font-size:11px;letter-spacing:.06em;padding:13px 15px;cursor:pointer;white-space:nowrap;transition:background .2s,color .2s}
        button:first-child{background:#c8ff65;color:#111;border-color:#c8ff65}
        button:hover{background:#f4f1ea;color:#111}
        button:focus-visible,.top :global(a):focus-visible{outline:2px solid #c8ff65;outline-offset:3px}
        footer{display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;padding:18px 0 60px;font-size:11px;letter-spacing:.09em;color:#888}
        @media(max-width:700px){canvas{height:390px;min-height:390px}.top{font-size:10px;min-height:70px}.top span{display:none}.intro{padding:42px 0 25px}.controls{align-items:stretch;flex-direction:column}.buttons button{flex:1}footer{font-size:10px}}
        @media(prefers-reduced-motion:reduce){button,.top :global(a),footer :global(a){transition:none}}
      `}</style>
    </>
  );
}
