'use client';

import { useEffect } from 'react';

/**
 * Thin accent-colored bar at the very top of the viewport.
 * Tracks scroll progress through the <article> element.
 */
const ReadingProgress: React.FC = () => {
  useEffect(() => {
    const bar = document.getElementById('reading-progress-bar');
    if (!bar) return;

    const update = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const { top, height } = article.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when article top is at bottom of viewport, 1 when article bottom is at top
      const progress = Math.min(
        Math.max((-top + windowH) / (height), 0),
        1
      );
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      id="reading-progress-bar"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: 'var(--color-accent)',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        transition: 'transform 0.1s linear',
        zIndex: 'var(--z-fixed)' as string,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ReadingProgress;
