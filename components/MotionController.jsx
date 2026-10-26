import { useEffect } from 'react';

/**
 * Progressive enhancement: the page remains readable even when JS is off.
 * Scroll transforms update only visible media and are disabled for reduced motion.
 */
export default function MotionController() {
  useEffect(() => {
    const root = document.querySelector('[data-motion-root]');
    if (!root) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mq.matches;
    let raf = 0;
    let visible = true;

    const reveals = Array.from(root.querySelectorAll('[data-reveal]'));
    const media = Array.from(root.querySelectorAll('[data-parallax]'));
    const activeMedia = new Set();

    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.dataset.inView = 'true';
          revealObserver.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

    const mediaObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeMedia.add(entry.target);
        else activeMedia.delete(entry.target);
      }
      schedule();
    }, { rootMargin: '160px 0px 160px 0px' });

    function update() {
      raf = 0;
      if (reduced || !visible) return;
      const viewport = window.innerHeight || 1;
      const pageHeight = Math.max(1, document.documentElement.scrollHeight - viewport);
      root.style.setProperty('--scroll-progress', String(Math.min(1, window.scrollY / pageHeight)));

      for (const element of activeMedia) {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (center - viewport / 2) / (viewport / 2 + rect.height / 2)));
        const strength = Number(element.dataset.parallaxStrength || 26);
        element.style.setProperty('--parallax-offset', (progress * -strength).toFixed(2) + 'px');
      }
    }
    function schedule() {
      if (!raf && !reduced && visible) raf = window.requestAnimationFrame(update);
    }
    function motionChange(event) {
      reduced = event.matches;
      root.dataset.motionReady = reduced ? 'false' : 'true';
      if (reduced) {
        window.cancelAnimationFrame(raf);
        raf = 0;
        root.style.setProperty('--scroll-progress', '0');
        media.forEach(el => el.style.setProperty('--parallax-offset', '0px'));
      } else schedule();
    }
    function visibilityChange() {
      visible = document.visibilityState === 'visible';
      if (!visible) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else schedule();
    }

    root.dataset.motionReady = reduced ? 'false' : 'true';
    reveals.forEach(el => revealObserver.observe(el));
    media.forEach(el => mediaObserver.observe(el));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);
    if (mq.addEventListener) mq.addEventListener('change', motionChange);
    else mq.addListener(motionChange);
    schedule();

    return () => {
      window.cancelAnimationFrame(raf);
      revealObserver.disconnect();
      mediaObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', visibilityChange);
      if (mq.removeEventListener) mq.removeEventListener('change', motionChange);
      else mq.removeListener(motionChange);
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
